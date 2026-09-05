#!/usr/bin/env python3
"""
Measure Table Rock Dam structures from the lidar products written by process_lidar.py.
Outputs lidar_measurements.json (all values metres NAVD88 / UTM 15N unless noted, feet alongside).
Usage: python3 measure_structures.py lidar_products_dir dem_1m_5km.tif
"""
import sys, os, json, math, numpy as np, rasterio
from scipy import ndimage
P, DEMF = sys.argv[1], sys.argv[2]; FT = 3.28084
out = {}
def rd(name):
    with rasterio.open(os.path.join(P, name)) as d:
        a = d.read(1).astype("float32"); tr = d.transform; nod = d.nodata
    return a, tr, nod
dsm_u, tr, _ = rd("trd_dsm_0p5m_u16cm.tif"); dsm = np.where(dsm_u == 0, np.nan, dsm_u / 100.0 + 200.0)
nd_u, _, _ = rd("trd_ndsm_0p5m_u16cm.tif"); ndsm = np.where(nd_u == 0, np.nan, (nd_u - 1) / 100.0)
cl, _, _ = rd("trd_class_0p5m.tif")
RES = tr.a; L, T = tr.c, tr.f
def win(e0, n0, e1, n1):
    c0, c1 = int((e0 - L) / RES), int((e1 - L) / RES); r0, r1 = int((T - n1) / RES), int((T - n0) / RES)
    return slice(r0, r1), slice(c0, c1)
def bbox_of(mask, rs, cs):
    rr, cc = np.nonzero(mask)
    return {"E_min": round(L + (cs.start + cc.min()) * RES, 1), "E_max": round(L + (cs.start + cc.max() + 1) * RES, 1),
            "N_min": round(T - (rs.start + rr.max() + 1) * RES, 1), "N_max": round(T - (rs.start + rr.min()) * RES, 1),
            "footprint_m2": round(float(mask.sum() * RES * RES), 0)}

# 1. crest deck (class 17 = the concrete-section deck + Hwy 165 bridge at the auxiliary spillway)
lab, n = ndimage.label(cl == 17, structure=np.ones((3, 3)))
decks = []
for i in range(1, n + 1):
    m = lab == i
    if m.sum() < 200: continue
    rr, cc = np.nonzero(m); z = dsm[m]
    decks.append({"cells": int(m.sum()), "E_min": round(L + cc.min() * RES, 1), "E_max": round(L + (cc.max() + 1) * RES, 1),
                  "N_min": round(T - (rr.max() + 1) * RES, 1), "N_max": round(T - rr.min() * RES, 1),
                  "NS_extent_m": round((rr.max() - rr.min() + 1) * RES, 1), "deck_z_median_m": round(float(np.nanmedian(z)), 2),
                  "deck_z_median_ft": round(float(np.nanmedian(z)) * FT, 1), "deck_z_p95_m": round(float(np.nanpercentile(z, 95)), 2)})
out["class17_deck_clusters"] = sorted(decks, key=lambda d: -d["cells"])

# 2. spillway gate bays / piers from the unrolled 0.5 m DSM of the concrete section
with rasterio.open(os.path.join(P, "trd_dsm_unrolled_concrete_section_0p5m.tif")) as d:
    U = d.read(1); utr = d.transform
U = np.where(U < -9000, np.nan, U)
s_axis = utr.c + (np.arange(U.shape[1]) + 0.5) * utr.a           # station (m)
t_axis = utr.f + (np.arange(U.shape[0]) + 0.5) * utr.e           # cross (m), increases downward? utr.e negative -> t decreases with row
# rows where t in [-2, 12] (deck) and [12, 30] (downstream face / gate hoist zone)
def band(t0, t1): return (t_axis >= t0) & (t_axis <= t1)
deck_max = np.nanmax(U[band(-2, 12), :], axis=0)
face_max = np.nanmax(U[band(14, 30), :], axis=0)
face_min = np.nanmin(U[band(14, 30), :], axis=0)
# piers: local maxima of face_max above the running median
from scipy.signal import find_peaks
base = ndimage.median_filter(np.nan_to_num(face_max, nan=0), size=61)
prom = np.nan_to_num(face_max - base, nan=0)
pk, props = find_peaks(prom, prominence=3.0, distance=8)
piers = [{"station_m": round(float(s_axis[i]), 1), "peak_z_m": round(float(face_max[i]), 2), "prominence_m": round(float(props["prominences"][k]), 2)} for k, i in enumerate(pk)]
out["downstream_face_peaks_stations"] = piers
if len(pk) > 1:
    sp = np.diff(s_axis[pk]); out["peak_spacing_m"] = [round(float(v), 2) for v in sp]
out["deck_elevation_along_crest"] = {"station_m": [int(v) for v in s_axis[::20]], "deck_max_m": [None if np.isnan(v) else round(float(v), 2) for v in deck_max[::20]]}

# 3. building blocks from nDSM (tall, compact objects), inside boxes
def blocks(e0, n0, e1, n1, hmin, minarea, label):
    rs, cs = win(e0, n0, e1, n1); sub = np.nan_to_num(ndsm[rs, cs], nan=0)
    m = ndimage.binary_opening(sub > hmin, structure=np.ones((3, 3)))
    lab, n = ndimage.label(m); res = []
    for i in range(1, n + 1):
        mm = lab == i
        if mm.sum() * RES * RES < minarea: continue
        b = bbox_of(mm, rs, cs); hz = dsm[rs, cs][mm]; hh = sub[mm]
        b.update({"top_z_p90_m": round(float(np.nanpercentile(hz, 90)), 2), "top_z_p90_ft": round(float(np.nanpercentile(hz, 90)) * FT, 1),
                  "height_above_ground_p90_m": round(float(np.percentile(hh, 90)), 2), "height_median_m": round(float(np.median(hh)), 2)})
        res.append(b)
    out[label] = sorted(res, key=lambda b: -b["footprint_m2"])[:6]
blocks(472200, 4050050, 472450, 4050350, 12.0, 300, "powerhouse_candidates_nDSM_gt12m")
blocks(471750, 4049650, 472050, 4049950, 5.0, 150, "visitor_center_candidates_nDSM_gt5m")
blocks(472400, 4050150, 473100, 4050450, 3.0, 100, "hatchery_and_switchyard_objects_nDSM_gt3m")
blocks(471850, 4051050, 472550, 4051400, 8.0, 100, "auxiliary_spillway_objects_nDSM_gt8m")

# 4. embankment geometry from the 1 m DEM cross sections at stations 600, 800, 1000 (perpendicular to local azimuth)
with rasterio.open(DEMF) as d: dem = d.read(1); dtr = d.transform
dem = np.where(dem < -9000, np.nan, dem)
cl_pts = np.loadtxt(os.path.join(P, "trd_crest_centreline.csv"), delimiter=",", skiprows=1)
def dem_at(e, n):
    r, c = int((n - dtr.f) / dtr.e), int((e - dtr.c) / dtr.a); return dem[r, c] if 0 <= r < dem.shape[0] and 0 <= c < dem.shape[1] else np.nan
emb = {}
for st in (500, 600, 700, 800, 900, 1000, 1100):
    i = int(st); e0, n0, azd = cl_pts[i, 1], cl_pts[i, 2], math.radians(cl_pts[i, 3])
    nE, nN = math.cos(azd), -math.sin(azd)            # right-hand normal (downstream)
    t = np.arange(-120, 200, 1.0); prof = np.array([dem_at(e0 + tt * nE, n0 + tt * nN) for tt in t])
    crest = np.nanmax(prof); flat = t[(prof > crest - 0.6)]
    cw = (flat.max() - flat.min() + 1) if len(flat) else None
    # downstream slope: between 3 m and 25 m below crest on the downstream side
    ds = (t > 0) & (prof < crest - 3) & (prof > crest - 25); us = (t < 0) & (prof < crest - 3) & (prof > crest - 9)
    def slope(mask):
        if mask.sum() < 5: return None
        k, b = np.polyfit(t[mask], prof[mask], 1); return round(abs(1 / k), 2)
    emb[f"station_{st}m"] = {"E": round(e0, 1), "N": round(n0, 1), "crest_max_m": round(float(crest), 2), "crest_max_ft": round(float(crest) * FT, 1),
                             "crest_flat_width_m_(within_0.6m_of_max)": cw, "downstream_slope_H_per_V": slope(ds), "upstream_slope_H_per_V_(above_water)": slope(us),
                             "profile_t_m": [int(v) for v in t[::10]], "profile_z_m": [None if np.isnan(v) else round(float(v), 2) for v in prof[::10]]}
out["embankment_sections_from_1m_DEM"] = emb

# 5. water surfaces and channel floors
def zstat(e0, n0, e1, n1, arr, fn=np.nanmedian):
    rs, cs = win(e0, n0, e1, n1); return round(float(fn(arr[rs, cs])), 2)
out["surfaces_m"] = {
    "lake_DSM_median_(hydro-flattened DEM value nearby)": zstat(471300, 4049900, 471900, 4051000, dsm),
    "tailrace_DSM_median": zstat(472500, 4050200, 473200, 4050500, dsm),
    "aux_spillway_approach_channel_DSM_median": zstat(472150, 4051180, 472260, 4051320, dsm),
    "aux_spillway_discharge_channel_DSM_min": zstat(472150, 4050950, 472230, 4051100, dsm, np.nanmin),
    "hatchery_raceway_area_DSM_median": zstat(472700, 4050280, 473000, 4050420, dsm),
}
json.dump(out, open(os.path.join(P, "lidar_measurements.json"), "w"), indent=1)
print(json.dumps({k: out[k] for k in out if k not in ("deck_elevation_along_crest", "embankment_sections_from_1m_DEM")}, indent=1))
print("embankment:", json.dumps({k: {kk: vv for kk, vv in v.items() if not kk.startswith("profile")} for k, v in emb.items()}, indent=1))
