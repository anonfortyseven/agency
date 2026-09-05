#!/usr/bin/env python3
"""
Derive modelling products from the Table Rock Dam lidar point cloud (output of fetch_lidar_ept.py):
  rasters (0.5 m, EPSG:26915): DSM (all returns, max), DTM (ground min), nDSM (DSM - USGS 1 m DEM),
     first-return intensity, dominant class; PNG previews of each
  dam axis fit (PCA of crest cells), crest profile CSV, 'unrolled' DSM along the axis (axis station x
     cross distance), cross-section PNG+CSV every 100 m and at named stations, water-surface elevations,
     bridge-deck (class 17) clusters, and LAZ crops of the structures.
Usage: python3 process_lidar.py in.laz out_dir [--dem trd_dem_1m_5km.tif] [--res 0.5]
"""
import sys, os, json, math, numpy as np, laspy, rasterio
from rasterio.transform import from_origin
import matplotlib; matplotlib.use("Agg"); import matplotlib.pyplot as plt
from PIL import Image

IN, OUT = sys.argv[1], sys.argv[2]; os.makedirs(OUT, exist_ok=True)
RES = float(sys.argv[sys.argv.index("--res") + 1]) if "--res" in sys.argv else 0.5
DEM = sys.argv[sys.argv.index("--dem") + 1] if "--dem" in sys.argv else None
FT = 3.28084
report = {}

las = laspy.read(IN)
x, y, z = np.asarray(las.x), np.asarray(las.y), np.asarray(las.z)
cls = np.asarray(las.classification); rn = np.asarray(las.return_number); inten = np.asarray(las.intensity).astype("float32")
keep = ~np.isin(cls, (7, 18))
x, y, z, cls, rn, inten = x[keep], y[keep], z[keep], cls[keep], rn[keep], inten[keep]
print("points after noise removal:", len(x))

L, B = math.floor(x.min()), math.floor(y.min()); R, T = math.ceil(x.max()), math.ceil(y.max())
W, H = int((R - L) / RES), int((T - B) / RES)
col = np.clip(((x - L) / RES).astype(np.int64), 0, W - 1); row = np.clip(((T - y) / RES).astype(np.int64), 0, H - 1)
idx = row * W + col
transform = from_origin(L, T, RES, RES)

def gmax(mask):
    g = np.full(W * H, np.nan, dtype="float32"); np.fmax.at(g, idx[mask], z[mask].astype("float32")); return g.reshape(H, W)
def gmin(mask):
    g = np.full(W * H, np.nan, dtype="float32"); np.fmin.at(g, idx[mask], z[mask].astype("float32")); return g.reshape(H, W)
def gmean(vals, mask):
    s = np.zeros(W * H, "float64"); c = np.zeros(W * H, "float64")
    np.add.at(s, idx[mask], vals[mask]); np.add.at(c, idx[mask], 1)
    with np.errstate(invalid="ignore", divide="ignore"): m = (s / c).astype("float32")
    m[c == 0] = np.nan; return m.reshape(H, W)

dsm = gmax(np.ones(len(x), bool))
dtm = gmin(np.isin(cls, (2, 20)))
intensity = gmean(inten, rn == 1)
# dominant class with priority water > bridge > ground > other
cl = np.zeros(W * H, "uint8")
for c in (1, 2, 17, 9):  # later writes win
    m = cls == c; cl[idx[m]] = c
cl = cl.reshape(H, W)

def write_u16(path, arr, desc):
    a = np.where(np.isnan(arr), 0, np.clip((arr - 200.0) * 100.0, 1, 65535)).astype("uint16")
    prof = dict(driver="GTiff", dtype="uint16", count=1, width=W, height=H, crs="EPSG:26915", transform=transform,
                nodata=0, compress="deflate", predictor=2, zlevel=9, tiled=True)
    with rasterio.open(path, "w", **prof) as d:
        d.write(a, 1); d.update_tags(DESCRIPTION=desc, ENCODING="metres = value/100 + 200 ; 0 = nodata", SOURCE=os.path.basename(IN))
write_u16(os.path.join(OUT, "trd_dsm_0p5m_u16cm.tif"), dsm, "Digital surface model, max of all lidar returns (noise removed)")
write_u16(os.path.join(OUT, "trd_dtm_0p5m_u16cm.tif"), dtm, "Bare-earth minimum of ground-classified returns (gaps where no ground return)")

# nDSM against the USGS 1 m DEM (bare earth incl. hydro-flattened water)
if DEM:
    with rasterio.open(DEM) as d:
        dem = d.read(1); dt = d.transform
        cc = np.clip(((L + (np.arange(W) + 0.5) * RES) - dt.c) / dt.a, 0, dem.shape[1] - 1).astype(int)
        rr = np.clip(((T - (np.arange(H) + 0.5) * RES) - dt.f) / dt.e, 0, dem.shape[0] - 1).astype(int)
        demr = dem[rr][:, cc].astype("float32"); demr[demr < -9000] = np.nan
    ndsm = dsm - demr
    a = np.where(np.isnan(ndsm), 0, np.clip(ndsm * 100.0 + 1, 1, 65535)).astype("uint16")
    prof = dict(driver="GTiff", dtype="uint16", count=1, width=W, height=H, crs="EPSG:26915", transform=transform,
                nodata=0, compress="deflate", predictor=2, zlevel=9, tiled=True)
    with rasterio.open(os.path.join(OUT, "trd_ndsm_0p5m_u16cm.tif"), "w", **prof) as d:
        d.write(a, 1); d.update_tags(DESCRIPTION="Height above USGS 1 m bare-earth DEM (structures, vegetation, bridge decks)", ENCODING="metres = (value-1)/100 ; 0 = nodata; negatives clipped to 0")
else:
    ndsm = None

# intensity + class rasters
i8 = np.where(np.isnan(intensity), 0, np.clip(intensity / np.nanpercentile(intensity, 99) * 254 + 1, 1, 255)).astype("uint8")
prof = dict(driver="GTiff", dtype="uint8", count=1, width=W, height=H, crs="EPSG:26915", transform=transform, nodata=0, compress="deflate", zlevel=9, tiled=True)
with rasterio.open(os.path.join(OUT, "trd_intensity_first_0p5m.tif"), "w", **prof) as d:
    d.write(i8, 1); d.update_tags(DESCRIPTION="Mean first-return lidar intensity, stretched to 8-bit at the 99th percentile")
with rasterio.open(os.path.join(OUT, "trd_class_0p5m.tif"), "w", **prof) as d:
    d.write(cl, 1); d.update_tags(DESCRIPTION="ASPRS class per cell: 1 unclassified/above-ground, 2 ground, 9 water, 17 bridge deck (priority 9>17>2>1)")

# previews
def hillshade(zz, res, az=315, alt=45):
    g = np.where(np.isnan(zz), np.nanmin(zz), zz); gy, gx = np.gradient(g, res)
    slope = np.arctan(np.hypot(gx, gy)); aspect = np.arctan2(-gx, gy)
    hs = np.sin(math.radians(alt)) * np.cos(slope) + np.cos(math.radians(alt)) * np.sin(slope) * np.cos(math.radians(az) - aspect)
    return np.clip(hs, 0, 1)
def save_png(arr, name, mode="L"):
    Image.fromarray(arr).save(os.path.join(OUT, name))
save_png((hillshade(dsm, RES) * 255).astype("uint8"), "preview_dsm_hillshade.png")
save_png(i8, "preview_intensity.png")
if ndsm is not None:
    n = np.clip(np.nan_to_num(ndsm, nan=0) / 40.0, 0, 1); cm = plt.get_cmap("magma")(n)[:, :, :3]
    save_png((cm * 255).astype("uint8"), "preview_ndsm_0-40m_magma.png")
pal = {0: (0, 0, 0), 1: (120, 160, 90), 2: (200, 180, 140), 9: (40, 90, 200), 17: (255, 60, 60)}
rgb = np.zeros((H, W, 3), "uint8")
for k, v in pal.items(): rgb[cl == k] = v
save_png(rgb, "preview_classes.png")

# ---- water surfaces
def med(mask): return float(np.median(z[mask])) if mask.any() else None
lake = (cls == 9) & (x < 472050) & (y > 4049900) & (y < 4051000)
tail = (cls == 9) & (x > 472450) & (x < 473300) & (y > 4050150) & (y < 4050600)
report["lake_water_surface_m"] = med(lake); report["tailwater_surface_m"] = med(tail)
for k in ("lake_water_surface_m", "tailwater_surface_m"):
    if report[k]: report[k + "_ft"] = round(report[k] * FT, 2)
print("water surfaces:", {k: report[k] for k in report})

# ---- dam crest centreline traced on the DSM (median-filtered to drop poles/vehicles)
from scipy import ndimage
dsm_med = ndimage.median_filter(np.nan_to_num(dsm, nan=0.0), size=5)
crest_mask = (dsm_med > 288.3) & (dsm_med < 290.4)          # 947-ft deck / 950-ft bridge band
def trace(start_e, start_n, n_stop, step, halfwin=25.0, max_gap=40.0):
    pts = []; e_prev = start_e; gap = 0.0; n = start_n
    while (step < 0 and n >= n_stop) or (step > 0 and n <= n_stop):
        r = int((T - n) / RES); c0 = int((e_prev - halfwin - L) / RES); c1 = int((e_prev + halfwin - L) / RES)
        if 0 <= r < H:
            rowm = crest_mask[r, max(0, c0):min(W, c1)]
            cc = np.nonzero(rowm)[0]
            if len(cc) >= 4:
                e_prev = L + (max(0, c0) + cc.mean() + 0.5) * RES; gap = 0.0; pts.append((e_prev, n))
            else:
                gap += abs(step)
                if gap > max_gap: break
        n += step
    return pts
south_pts = trace(472231.0, 4050300.0, 4049850.0, -1.0)
north_pts = trace(472231.0, 4050300.0, 4051300.0, +1.0)
line = np.array(sorted(south_pts + north_pts[1:], key=lambda p: p[1]))       # south -> north
# smooth E along N (15 m running mean) and resample to 1 m stations
from numpy.lib.stride_tricks import sliding_window_view
k = 15; Es = np.convolve(line[:, 0], np.ones(k) / k, mode="same"); Es[:k] = line[:k, 0]; Es[-k:] = line[-k:, 0]
line[:, 0] = Es
seg = np.hypot(np.diff(line[:, 0]), np.diff(line[:, 1])); cum = np.r_[0, np.cumsum(seg)]
S = np.arange(0, cum[-1], 1.0)
CE = np.interp(S, cum, line[:, 0]); CN = np.interp(S, cum, line[:, 1])
dE = np.gradient(CE); dN = np.gradient(CN); ln = np.hypot(dE, dN); dE /= ln; dN /= ln
nE, nN = dN, -dE                                    # right-hand normal = downstream (east) side
az_local = (np.degrees(np.arctan2(dE, dN)) + 360) % 360
south = np.array([CE[0], CN[0]]); north = np.array([CE[-1], CN[-1]])
chord = north - south; az = (math.degrees(math.atan2(chord[0], chord[1])) + 360) % 360
report["dam_axis"] = {"south_end_utm": [round(float(south[0]), 1), round(float(south[1]), 1)],
                      "north_end_utm": [round(float(north[0]), 1), round(float(north[1]), 1)],
                      "chord_azimuth_deg_true": round(az, 2), "chord_length_m": round(float(np.hypot(*chord)), 1),
                      "crest_length_along_centreline_m": round(float(S[-1]), 1), "crest_length_ft": round(float(S[-1]) * FT, 0),
                      "local_azimuth_deg_true_at_stations": {int(sv): round(float(az_local[int(sv)]), 1) for sv in range(0, int(S[-1]), 100)},
                      "note": "centreline traced on the 947-ft crest deck in the 2020 lidar DSM; station 0 = south (right) abutment"}
print("axis:", json.dumps(report["dam_axis"]))
with open(os.path.join(OUT, "trd_crest_centreline.csv"), "w") as f:
    f.write("station_m,E_utm15n,N_utm15n,local_azimuth_deg\n")
    for i, sv in enumerate(S): f.write(f"{sv:.0f},{CE[i]:.2f},{CN[i]:.2f},{az_local[i]:.2f}\n")
try:
    from pyproj import Transformer
    tw = Transformer.from_crs("EPSG:26915", "EPSG:4326", always_xy=True)
    lon, lat = tw.transform(CE[::5], CN[::5])
    gj = {"type": "FeatureCollection", "features": [{"type": "Feature", "properties": report["dam_axis"],
          "geometry": {"type": "LineString", "coordinates": [[round(float(a), 7), round(float(b), 7)] for a, b in zip(lon, lat)]}}]}
    json.dump(gj, open(os.path.join(OUT, "trd_crest_centreline_wgs84.geojson"), "w"))
except Exception as ex: print("geojson skipped", ex)

def unroll(tmin, tmax, res_t, s_from, s_to, res_s):
    Ss = np.arange(s_from, s_to, res_s); Tt = np.arange(tmin, tmax, res_t)
    si = np.clip(Ss.astype(int), 0, len(S) - 1)
    Ex = CE[si][None, :] + Tt[:, None] * nE[si][None, :]; Ny = CN[si][None, :] + Tt[:, None] * nN[si][None, :]
    cc = np.clip(((Ex - L) / RES).astype(int), 0, W - 1); rr = np.clip(((T - Ny) / RES).astype(int), 0, H - 1)
    return Ss, Tt, dsm[rr, cc]

def save_unrolled(name, Ss, Tt, arr, title, vmin, vmax, figsize):
    prof = dict(driver="GTiff", dtype="float32", count=1, width=arr.shape[1], height=arr.shape[0],
                transform=from_origin(Ss[0], Tt[0], Ss[1] - Ss[0], -(Tt[1] - Tt[0])), nodata=-9999, compress="deflate", predictor=3)
    with rasterio.open(os.path.join(OUT, name + ".tif"), "w", **prof) as dd:
        dd.write(np.nan_to_num(arr, nan=-9999).astype("float32"), 1)
        dd.update_tags(DESCRIPTION="DSM in crest-centreline coordinates: x = station (m from south abutment), y = cross distance (m; negative = lake side, positive = downstream)", AXIS=json.dumps(report["dam_axis"]))
    fig, ax = plt.subplots(figsize=figsize); im = ax.imshow(arr, extent=[Ss[0], Ss[-1], Tt[-1], Tt[0]], cmap="terrain", vmin=vmin, vmax=vmax, aspect="equal")
    ax.set_xlabel("station along crest centreline from south abutment (m)"); ax.set_ylabel("cross distance (m): lake <0, downstream >0"); ax.set_title(title)
    plt.colorbar(im, ax=ax, label="elevation m NAVD88", shrink=0.6); fig.savefig(os.path.join(OUT, "preview_" + name + ".png"), dpi=110, bbox_inches="tight"); plt.close(fig)

Ss, Tt, U = unroll(-250, 350, 1.0, 0, S[-1], 1.0); save_unrolled("trd_dsm_unrolled_along_crest", Ss, Tt, U, "Table Rock Dam - DSM unrolled along the crest centreline (lidar 30 Nov 2020)", 210, 300, (24, 12))
Ss2, Tt2, U2 = unroll(-60, 120, 0.5, 0, min(500, S[-1]), 0.5); save_unrolled("trd_dsm_unrolled_concrete_section_0p5m", Ss2, Tt2, U2, "Concrete section, spillway, intake & powerhouse - DSM at 0.5 m in crest coordinates", 215, 295, (24, 10))
crestp = np.nanmax(U[(Tt >= -15) & (Tt <= 15), :], axis=0)
with open(os.path.join(OUT, "trd_crest_profile.csv"), "w") as f:
    f.write("station_m,E,N,max_dsm_m,max_dsm_ft\n")
    for i, sv in enumerate(Ss): f.write(f"{sv:.0f},{CE[int(sv)]:.2f},{CN[int(sv)]:.2f},{crestp[i]:.2f},{crestp[i]*FT:.2f}\n")
fig, ax = plt.subplots(figsize=(24, 5)); ax.plot(Ss, crestp, lw=0.8); ax.set_xlabel("station (m)"); ax.set_ylabel("max DSM within +-15 m of centreline (m)")
ax.set_title("crest profile (piers, gate hoists, bridge rails and poles show as spikes)"); ax.grid(alpha=.3); fig.savefig(os.path.join(OUT, "preview_crest_profile.png"), dpi=110, bbox_inches="tight"); plt.close(fig)

# ---- cross sections from raw points
def section(p0, dvec, tmin, tmax, name, half=1.0):
    dvec = np.asarray(dvec, float); dvec /= np.linalg.norm(dvec); nv = np.array([-dvec[1], dvec[0]])
    px, py = x - p0[0], y - p0[1]; t = px * dvec[0] + py * dvec[1]; q = px * nv[0] + py * nv[1]
    m = (np.abs(q) <= half) & (t >= tmin) & (t <= tmax)
    fig, ax = plt.subplots(figsize=(18, 6))
    colors = {2: "#8c6d31", 1: "#3a7d44", 9: "#1f4fd1", 17: "#d62728", 20: "#c49c94"}
    for k, colr in colors.items():
        mm = m & (cls == k)
        if mm.any(): ax.scatter(t[mm], z[mm], s=1.5, c=colr, label=f"class {k}")
    ax.set_xlabel("distance along section (m)"); ax.set_ylabel("elevation (m NAVD88)"); ax.set_title(name); ax.grid(alpha=.3); ax.legend(markerscale=6)
    ax.set_aspect("equal", adjustable="datalim")
    fig.savefig(os.path.join(OUT, f"section_{name}.png"), dpi=110, bbox_inches="tight"); plt.close(fig)
    with open(os.path.join(OUT, f"section_{name}.csv"), "w") as f:
        f.write("t_m,E,N,z_m,z_ft,class,return\n")
        order = np.argsort(t[m])
        for i in np.nonzero(m)[0][order]:
            f.write(f"{t[i]:.2f},{x[i]:.2f},{y[i]:.2f},{z[i]:.2f},{z[i]*FT:.2f},{cls[i]},{rn[i]}\n")
    return int(m.sum())

sections = {}
for sv in list(range(0, int(S[-1]) + 1, 100)) + [25, 50, 75, 125, 150, 175, 225, 250, 275, 325, 350]:
    i = min(int(sv), len(S) - 1); p0 = np.array([CE[i], CN[i]]); sections[f"crest_station_{int(sv):04d}m"] = section(p0, (nE[i], nN[i]), -250, 350, f"crest_station_{int(sv):04d}m")
# named lines (UTM): auxiliary spillway (N-S along channel and E-W across), visitor centre, hatchery
named = {"aux_spillway_along_channel_E472180": ((472180, 4050950), (0, 1), 0, 700),
         "aux_spillway_across_N4051250": ((471850, 4051250), (1, 0), 0, 700),
         "aux_spillway_across_N4051350": ((471850, 4051350), (1, 0), 0, 700),
         "powerhouse_tailrace_EW_N4050200": ((472100, 4050200), (1, 0), 0, 900),
         "visitor_center_EW_N4049800": ((471700, 4049800), (1, 0), 0, 500)}
for name, (p0, dv, t0, t1) in named.items(): sections[name] = section(np.array(p0, float), dv, t0, t1, name)
report["sections_points"] = sections

# ---- bridge-deck clusters
from scipy import ndimage
bd = (cl == 17); lab, n = ndimage.label(bd, structure=np.ones((3, 3)))
clusters = []
for i in range(1, n + 1):
    m = lab == i
    if m.sum() < 40: continue
    rr_, cc_ = np.nonzero(m)
    clusters.append({"cells": int(m.sum()), "E_min": round(L + cc_.min() * RES, 1), "E_max": round(L + (cc_.max() + 1) * RES, 1),
                     "N_min": round(T - (rr_.max() + 1) * RES, 1), "N_max": round(T - rr_.min() * RES, 1),
                     "deck_z_median_m": round(float(np.nanmedian(dsm[m])), 2)})
report["bridge_deck_clusters"] = sorted(clusters, key=lambda c: -c["cells"])[:12]

# ---- LAZ crops of structures
def crop(name, box):
    l, b, r, t = box; m = (x >= l) & (x <= r) & (y >= b) & (y <= t)
    sub = las[keep][m]
    sub.write(os.path.join(OUT, name)); return int(m.sum())
report["laz_crops"] = {
    "trd_lidar_2020_concrete_dam_powerhouse_hatchery.laz": crop("trd_lidar_2020_concrete_dam_powerhouse_hatchery.laz", (472050, 4049850, 473000, 4050450)),
    "trd_lidar_2020_auxiliary_spillway.laz": crop("trd_lidar_2020_auxiliary_spillway.laz", (471850, 4051050, 472550, 4051550)),
    "trd_lidar_2020_visitor_center.laz": crop("trd_lidar_2020_visitor_center.laz", (471700, 4049600, 472100, 4049950)),
}
# thinned whole-AOI cloud (every 8th point)
tm = np.zeros(int(keep.sum()), bool); tm[::8] = True
thin = las[keep][tm]; thin.write(os.path.join(OUT, "trd_lidar_2020_aoi_thinned_1of8.laz")); report["laz_crops"]["trd_lidar_2020_aoi_thinned_1of8.laz"] = int(tm.sum())
json.dump(report, open(os.path.join(OUT, "lidar_report.json"), "w"), indent=1)
print(json.dumps(report, indent=1))
