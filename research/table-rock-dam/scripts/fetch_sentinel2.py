#!/usr/bin/env python3
"""
Fetch Sentinel-2 L2A true-colour (TCI, 10 m) windows around Table Rock Dam from the public
Element84 'sentinel-cogs' bucket (Cloud-Optimised GeoTIFFs; only the window is downloaded).
Writes one JPEG-compressed GeoTIFF per scene (EPSG:32615) plus a PNG preview.
Usage: python3 fetch_sentinel2.py out_dir [--box small|wide]
"""
import os, sys, json, urllib.request
import numpy as np, rasterio
from rasterio.windows import from_bounds, Window
from PIL import Image

BUCKET = "https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/15/S/VA"
# scene id -> note (chosen for ~0 % cloud and full tile coverage; see 05-gis file)
SCENES = {
    "2026/8/S2A_15SVA_20260820_1_L2A": "late summer 2026, 0.007 % cloud",
    "2026/5/S2A_15SVA_20260512_2_L2A": "spring 2026 full leaf-on, 0.02 % cloud",
    "2026/4/S2C_15SVA_20260420_0_L2A": "early spring 2026 leaf-out, ~0 % cloud",
    "2026/3/S2B_15SVA_20260326_0_L2A": "late winter 2026 leaf-off (structures visible), ~0 % cloud",
    "2026/1/S2B_15SVA_20260105_0_L2A": "winter 2026 leaf-off, ~0 % cloud",
    "2025/10/S2C_15SVA_20251022_0_L2A": "autumn colour 2025, ~0 % cloud",
    "2025/6/S2B_15SVA_20250609_0_L2A": "9 Jun 2025: day USACE began spillway releases, 0.1 % cloud",
}
# UTM 15N (WGS84) boxes. dam ~ E 472,218 N 4,050,179
BOXES = {"small": (466000, 4044000, 478000, 4056000),    # 12 km
         "wide":  (452000, 4030000, 492000, 4070000)}    # 40 km (whole lower lake + Branson)

def fetch(scene, box, out):
    url = f"/vsicurl/{BUCKET}/{scene}/TCI.tif"
    with rasterio.open(url) as ds:
        w = from_bounds(*box, ds.transform).round_offsets().round_lengths()
        arr = ds.read(window=w)
        tr = ds.window_transform(w)
        prof = dict(driver="GTiff", dtype="uint8", count=3, width=arr.shape[2], height=arr.shape[1],
                    crs=ds.crs, transform=tr, compress="JPEG", jpeg_quality=90, photometric="YCBCR", tiled=True)
    name = scene.split("/")[-1]
    with rasterio.open(os.path.join(out, f"{name}_TCI_{int(box[2]-box[0])//1000}km.tif"), "w", **prof) as dst:
        dst.write(arr)
        dst.update_tags(SOURCE=f"Sentinel-2 L2A TCI via {BUCKET}/{scene}", NOTE=SCENES.get(scene, ""))
    Image.fromarray(np.moveaxis(arr, 0, -1)).save(os.path.join(out, f"{name}_TCI_{int(box[2]-box[0])//1000}km.jpg"), quality=88)
    print("wrote", name, arr.shape)

if __name__ == "__main__":
    out = sys.argv[1]; os.makedirs(out, exist_ok=True)
    which = sys.argv[sys.argv.index("--box") + 1] if "--box" in sys.argv else "small"
    os.environ.setdefault("GDAL_DISABLE_READDIR_ON_OPEN", "EMPTY_DIR")
    for s in SCENES:
        try: fetch(s, BOXES[which], out)
        except Exception as ex: print("FAILED", s, ex)
