#!/usr/bin/env python3
"""
Crop USGS historical topographic map GeoTIFFs (HTMC scans) to the Table Rock Dam area and write
JPEG-compressed GeoTIFFs + JPG previews, plus a reduced full-sheet preview of each map.
Source files: https://prd-tnm.s3.amazonaws.com/StagedProducts/Maps/HistoricalTopo/GeoTIFF/MO/
Usage: python3 crop_historical_topo.py in_dir out_dir [--box 469500 4047000 475500 4053500]
"""
import sys, os, glob, numpy as np, rasterio
from rasterio.warp import transform_bounds
from rasterio.windows import from_bounds
from PIL import Image
src, out = sys.argv[1], sys.argv[2]; os.makedirs(out, exist_ok=True)
BOX = (469500, 4047000, 475500, 4053500)
if "--box" in sys.argv:
    i = sys.argv.index("--box"); BOX = tuple(float(v) for v in sys.argv[i+1:i+5])
for f in sorted(glob.glob(os.path.join(src, "*.tif"))):
    with rasterio.open(f) as ds:
        print(os.path.basename(f), ds.crs.to_string()[:60], ds.width, ds.height, ds.res, ds.count, ds.dtypes[0], ds.colorinterp[0])
        bx = transform_bounds("EPSG:26915", ds.crs, *BOX)
        w = from_bounds(*bx, ds.transform).round_offsets().round_lengths()
        from rasterio.windows import Window
        c0, r0 = max(0, int(w.col_off)), max(0, int(w.row_off))
        c1, r1 = min(ds.width, int(w.col_off + w.width)), min(ds.height, int(w.row_off + w.height))
        win = Window(c0, r0, c1 - c0, r1 - r0)
        arr = ds.read(window=win)
        if ds.colorinterp[0].name == "palette" and ds.count == 1:
            cmap = ds.colormap(1); lut = np.array([cmap.get(i, (0, 0, 0, 255))[:3] for i in range(256)], dtype=np.uint8)
            rgb = lut[arr[0]]
        elif ds.count >= 3:
            rgb = np.moveaxis(arr[:3], 0, -1)
        else:
            rgb = np.repeat(arr[0][..., None], 3, axis=-1)
        name = os.path.splitext(os.path.basename(f))[0] + "_damcrop"
        prof = dict(driver="GTiff", dtype="uint8", count=3, width=rgb.shape[1], height=rgb.shape[0], crs=ds.crs,
                    transform=ds.window_transform(win), compress="JPEG", jpeg_quality=90, photometric="YCBCR", tiled=True)
        with rasterio.open(os.path.join(out, name + ".tif"), "w", **prof) as dst:
            dst.write(np.moveaxis(rgb, -1, 0)); dst.update_tags(SOURCE="USGS HTMC " + os.path.basename(f))
        Image.fromarray(rgb).save(os.path.join(out, name + ".jpg"), quality=88)
        # full-sheet reduced preview
        ov = ds.read(out_shape=(ds.count, ds.height // 4, ds.width // 4))
        if ds.colorinterp[0].name == "palette" and ds.count == 1: full = lut[ov[0]]
        elif ds.count >= 3: full = np.moveaxis(ov[:3], 0, -1)
        else: full = np.repeat(ov[0][..., None], 3, axis=-1)
        Image.fromarray(full).save(os.path.join(out, os.path.splitext(os.path.basename(f))[0] + "_sheet_preview.jpg"), quality=80)
        print("   crop", rgb.shape, "->", name)
