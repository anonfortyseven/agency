#!/usr/bin/env python3
"""Annotated orientation figure: 2020 NAIP ortho (from the 2021 US Topo) + lidar crest centreline + measured features.
Usage: python3 make_site_figure.py ortho_1m.tif crest_centreline.csv lidar_measurements.json out.jpg feature_coords.json"""
import sys, json, numpy as np, rasterio, matplotlib; matplotlib.use("Agg"); import matplotlib.pyplot as plt
from pyproj import Transformer
ortho, cl_csv, meas_json, out_jpg, out_json = sys.argv[1:6]
cl = np.loadtxt(cl_csv, delimiter=",", skiprows=1); S, E, N, AZ = cl[:, 0], cl[:, 1], cl[:, 2], cl[:, 3]
def at(st, t=0.0):
    i = min(int(st), len(S) - 1); a = np.radians(AZ[i]); nE, nN = np.cos(a), -np.sin(a)
    return float(E[i] + t * nE), float(N[i] + t * nN)
m = json.load(open(meas_json))
ph = m.get("powerhouse_from_unrolled_dsm", {}); piers = m.get("spillway_pier_stations_from_unrolled_dsm_t6-13m", [])
feat = {
 "south_abutment_station_0": at(0),
 "spillway_gate_1_south_pier": at(piers[0]) if piers else None,
 "spillway_centre": at((piers[0] + piers[-1]) / 2) if piers else None,
 "spillway_gate_10_north_pier": at(piers[-1]) if piers else None,
 "powerhouse_roof_centre": at(np.mean(ph.get("station_range_m", [280, 350])), np.mean(ph.get("cross_t_range_m_downstream_of_crest_centreline", [48, 70]))) if ph else None,
 "concrete_embankment_junction_(class17_deck_north_end)": (472190.0, 4050337.0),
 "embankment_crest_midpoint_station_900": at(900),
 "north_end_of_traced_crest_at_aux_spillway_bridge": at(S[-1]),
 "auxiliary_spillway_hwy165_bridge_deck_centre": (472206.0, 4051182.0),
 "auxiliary_spillway_approach_channel_(lake_water)": (472205.0, 4051250.0),
 "auxiliary_spillway_discharge_channel_floor": (472190.0, 4051020.0),
 "dewey_short_visitor_center_(largest_roof_block)": (471825.0, 4049678.0),
 "switchyard_(nDSM_lattice_objects)": (472560.0, 4050300.0),
 "hatchery_raceways_centre": (472850.0, 4050350.0),
 "tailrace_water_sample": (472700.0, 4050200.0),
 "lake_water_sample": (471500.0, 4050400.0),
}
tw = Transformer.from_crs("EPSG:26915", "EPSG:4326", always_xy=True)
coords = {}
for k, v in feat.items():
    if v is None: continue
    lon, lat = tw.transform(v[0], v[1]); coords[k] = {"E_utm15n": round(v[0], 1), "N_utm15n": round(v[1], 1), "lat": round(lat, 6), "lon": round(lon, 6)}
json.dump({"crs": "EPSG:26915 (NAD83 / UTM 15N) and WGS84 lat/lon", "note": "positions measured on 2020 lidar DSM + 2020 NAIP ortho; +-2 m", "features": coords}, open(out_json, "w"), indent=1)
with rasterio.open(ortho) as d:
    img = np.moveaxis(d.read(), 0, -1); b = d.bounds
fig, ax = plt.subplots(figsize=(14, 16)); ax.imshow(img, extent=[b.left, b.right, b.bottom, b.top])
ax.plot(E, N, color="yellow", lw=1.2, alpha=0.9, label="lidar crest centreline (2020)")
for st in range(0, int(S[-1]) + 1, 100):
    e, n = at(st); ax.plot(e, n, "o", color="yellow", ms=3); ax.text(e - 15, n, f"{st}", color="yellow", fontsize=7, ha="right", va="center")
labels = {"spillway_centre": "10-bay gated spillway\n(stations 100-265 m)", "powerhouse_roof_centre": "powerhouse\n(roof ~246 m / 807 ft)",
          "dewey_short_visitor_center_(largest_roof_block)": "Dewey Short\nVisitor Center", "switchyard_(nDSM_lattice_objects)": "switchyard",
          "hatchery_raceways_centre": "Shepherd of the Hills\nFish Hatchery", "auxiliary_spillway_hwy165_bridge_deck_centre": "auxiliary spillway\n+ Hwy 165 bridge",
          "auxiliary_spillway_approach_channel_(lake_water)": "approach channel", "auxiliary_spillway_discharge_channel_floor": "discharge channel",
          "embankment_crest_midpoint_station_900": "earth embankment\n(crest 947 ft, Hwy 165)", "concrete_embankment_junction_(class17_deck_north_end)": "concrete / embankment\njunction (N 4,050,337)",
          "south_abutment_station_0": "south (right) abutment\nstation 0", "tailrace_water_sample": "Lake Taneycomo (tailwater)\n707.6 ft on 30 Nov 2020", "lake_water_sample": "Table Rock Lake\n917.3 ft on 30 Nov 2020"}
for k, txt in labels.items():
    if k not in coords: continue
    e, n = coords[k]["E_utm15n"], coords[k]["N_utm15n"]
    ax.annotate(txt, (e, n), xytext=(0, 0), textcoords="offset points", fontsize=8, color="white", ha="center",
                bbox=dict(boxstyle="round,pad=0.25", fc="black", alpha=0.55, ec="none"))
ax.set_xlim(471300, 473300); ax.set_ylim(4049300, 4052000); ax.set_xlabel("Easting (m, UTM 15N NAD83)"); ax.set_ylabel("Northing (m)")
ax.set_title("Table Rock Dam - measured site layout (2020 NAIP ortho, 2020 lidar). North is up.")
ax.legend(loc="lower left", fontsize=8); ax.grid(alpha=0.25, color="white")
fig.savefig(out_jpg, dpi=130, bbox_inches="tight", pil_kwargs={"quality": 88}); print("wrote", out_jpg, "and", out_json)
