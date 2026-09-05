#!/usr/bin/env python3
"""
Download USGS 3DEP lidar POINTS (classified, with intensity and returns) for an area of interest
around Table Rock Dam from the public Entwine Point Tile (EPT) service on S3 -- no login needed.

  python3 fetch_lidar_ept.py out.laz [--project MO_FEMANRCS_1_2020] [--workers 16]
      [--aoi 471300 4049300 473300 4052000]     # UTM 15N NAD83 (EPSG:26915) left bottom right top

Projects known to cover the dam (see 05-gis-remote-sensing-sources.md):
  MO_FEMANRCS_1_2020   -- flown 8 Apr - 5 Dec 2020, covers the whole dam, powerhouse, hatchery
  MO_Southwest_1_2021  -- flown Dec 2021 - Jan 2022, covers the dam west of the Stone/Taney line
Output LAZ is written in EPSG:26915 (metres, NAVD88 heights as delivered), point format 6.
"""
import io, os, sys, ssl, json, time, math, urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
import numpy as np, laspy
from pyproj import Transformer

BASE = "https://usgs-lidar-public.s3.amazonaws.com"

def arg(name, default, n=1, cast=str):
    if name in sys.argv:
        i = sys.argv.index(name)
        vals = [cast(v) for v in sys.argv[i + 1:i + 1 + n]]
        return vals[0] if n == 1 else vals
    return default

OUT = sys.argv[1]
PROJECT = arg("--project", "MO_FEMANRCS_1_2020")
WORKERS = arg("--workers", 16, cast=int)
AOI_UTM = arg("--aoi", (471300, 4049300, 473300, 4052000), n=4, cast=float)

cafile = os.environ.get("CURL_CA_BUNDLE") or os.environ.get("SSL_CERT_FILE")
ctx = ssl.create_default_context(cafile=cafile if cafile and os.path.exists(cafile) else None)

def get(url, retries=5):
    for i in range(retries):
        try:
            with urllib.request.urlopen(url, context=ctx, timeout=180) as r:
                return r.read()
        except Exception as ex:
            if i == retries - 1: raise
            time.sleep(1.5 ** i)

ept = json.loads(get(f"{BASE}/{PROJECT}/ept.json"))
b = ept["bounds"]; cube = b[3] - b[0]
to3857 = Transformer.from_crs("EPSG:26915", "EPSG:3857", always_xy=True)
to_utm = Transformer.from_crs("EPSG:3857", "EPSG:26915", always_xy=True)
xs, ys = zip(*[to3857.transform(x, y) for x, y in
               [(AOI_UTM[0], AOI_UTM[1]), (AOI_UTM[2], AOI_UTM[1]), (AOI_UTM[2], AOI_UTM[3]), (AOI_UTM[0], AOI_UTM[3])]])
AOI = (min(xs), min(ys), max(xs), max(ys))
print("project", PROJECT, "AOI (3857):", [round(v, 1) for v in AOI], flush=True)

def node_bounds(key):
    d, x, y, z = map(int, key.split("-"))
    s = cube / 2 ** d
    return (b[0] + x * s, b[1] + y * s, b[0] + (x + 1) * s, b[1] + (y + 1) * s)

def intersects(nb):
    return not (nb[2] < AOI[0] or nb[0] > AOI[2] or nb[3] < AOI[1] or nb[1] > AOI[3])

nodes = {}
def load_hier(key):
    j = json.loads(get(f"{BASE}/{PROJECT}/ept-hierarchy/{key}.json"))
    for k, v in j.items():
        if not intersects(node_bounds(k)): continue
        if v == -1: load_hier(k)
        elif v > 0: nodes[k] = v
load_hier("0-0-0-0")
print("nodes intersecting AOI:", len(nodes), "points (upper bound):", sum(nodes.values()), flush=True)

# LAS writer (point format 6 = LAS 1.4 with GPS time, scan channel, class flags)
hdr = laspy.LasHeader(point_format=6, version="1.4")
hdr.scales = np.array([0.01, 0.01, 0.01]); hdr.offsets = np.array([AOI_UTM[0], AOI_UTM[1], 0.0])
hdr.add_crs = None
try:
    from pyproj import CRS
    hdr.add_crs(CRS.from_epsg(26915))
except Exception: pass

def fetch_node(key):
    data = get(f"{BASE}/{PROJECT}/ept-data/{key}.laz")
    las = laspy.read(io.BytesIO(data))
    x, y = np.asarray(las.x), np.asarray(las.y)
    m = (x >= AOI[0]) & (x <= AOI[2]) & (y >= AOI[1]) & (y <= AOI[3])
    if not m.any(): return key, None
    return key, las[m]

total = 0; manifest = {}
t0 = time.time()
with laspy.open(OUT, mode="w", header=hdr) as writer, ThreadPoolExecutor(WORKERS) as pool:
    futs = [pool.submit(fetch_node, k) for k in sorted(nodes)]
    for i, f in enumerate(as_completed(futs), 1):
        key, sub = f.result()
        if sub is None: continue
        ux, uy = to_utm.transform(np.asarray(sub.x), np.asarray(sub.y))
        pts = laspy.ScaleAwarePointRecord.zeros(len(sub), header=hdr)
        pts.x = ux; pts.y = uy; pts.z = np.asarray(sub.z)
        for dim in ("intensity", "return_number", "number_of_returns", "classification", "gps_time",
                    "scan_angle", "user_data", "point_source_id", "scanner_channel"):
            try:
                src = dim if dim != "scan_angle" else ("scan_angle" if "scan_angle" in sub.point_format.dimension_names else "scan_angle_rank")
                pts[dim] = np.asarray(sub[src]).astype(pts[dim].dtype)
            except Exception:
                pass
        writer.write_points(pts)
        total += len(sub); manifest[key] = int(len(sub))
        if i % 50 == 0 or i == len(futs):
            print(f"  {i}/{len(futs)} nodes, {total:,} pts, {time.time()-t0:.0f}s", flush=True)

json.dump({"project": PROJECT, "aoi_utm15n": AOI_UTM, "aoi_3857": AOI, "ept_json": f"{BASE}/{PROJECT}/ept.json",
           "nodes": manifest, "total_points": total}, open(OUT + ".manifest.json", "w"), indent=1)
print("DONE", total, "points ->", OUT, f"{time.time()-t0:.0f}s", flush=True)
