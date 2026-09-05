#!/usr/bin/env python3
"""
Fetch USGS 3DEP 1 m bare-earth DEM windows for the Table Rock Dam area straight from the
USGS National Map S3 staging bucket (no API key needed), mosaic the tiles, and write:
  - <out>/trd_dem_1m_5km.tif      : 1 m DEM, 5 km x 5 km box centred on the dam (EPSG:26915)
  - <out>/trd_dem_1m_dam_crop.tif : 1 m DEM, 3.2 km x 2.0 km box tight around the structures
  - <out>/trd_dem_2m_5km.tif      : 2 m resampled DEM of the 5 km box (smaller file)
  - <out>/trd_hillshade_5km.png   : hillshade preview (for humans)
Usage: python3 fetch_dem.py [out_dir] [--project MO_FEMANRCS_2020_D20]
Requires: rasterio, numpy (pip install rasterio numpy). Uses GDAL /vsicurl range reads, so only
the requested window is downloaded (~ a few MB) instead of the ~270 MB tiles.
"""
import os, sys, math
import numpy as np
import rasterio
from rasterio.windows import from_bounds
from rasterio.transform import from_origin
from rasterio.merge import merge

BUCKET = "https://prd-tnm.s3.amazonaws.com/StagedProducts/Elevation/1m/Projects"
DAM_E, DAM_N = 472218.7, 4050179.4          # NAD83 / UTM 15N (EPSG:26915), from 36.5967N -93.3106W
BOX_5KM      = (469700, 4047700, 474700, 4052700)   # left, bottom, right, top
BOX_DAM      = (470600, 4049200, 473800, 4051200)   # tight box around dam + powerhouse + aux spillway + VC

def tile_names(box, project):
    """USGS 1 m tiles are 10 km squares named x{E/10km}y{(N/10km)+1}."""
    l, b, r, t = box
    names = set()
    for e in range(int(l // 10000), int(r // 10000) + 1):
        for n in range(int(b // 10000), int(t // 10000) + 1):
            names.add(f"USGS_1M_15_x{e}y{n+1}_{project}.tif")
    return sorted(names)

def read_window(url, box):
    with rasterio.open(url) as ds:
        w = from_bounds(*box, ds.transform)
        w = w.round_offsets().round_lengths()
        # clip window to dataset
        from rasterio.windows import Window
        col0 = max(0, int(w.col_off)); row0 = max(0, int(w.row_off))
        col1 = min(ds.width, int(w.col_off + w.width)); row1 = min(ds.height, int(w.row_off + w.height))
        if col1 <= col0 or row1 <= row0:
            return None
        win = Window(col0, row0, col1 - col0, row1 - row0)
        arr = ds.read(1, window=win)
        tr = ds.window_transform(win)
        prof = ds.profile.copy()
        prof.update(width=win.width, height=win.height, transform=tr)
        return arr, prof

def mosaic(project, box):
    parts = []
    for name in tile_names(box, project):
        url = f"/vsicurl/{BUCKET}/{project}/TIFF/{name}"
        try:
            r = read_window(url, box)
        except rasterio.errors.RasterioIOError as ex:
            print("  skip (missing tile)", name, "->", str(ex)[:80]); continue
        if r is None: continue
        arr, prof = r
        print("  got", name, arr.shape, "valid px:", int((arr > -9000).sum()))
        parts.append((arr, prof))
    if not parts:
        raise SystemExit("no tiles found")
    # assemble on a common 1 m grid
    l, b, r, t = box
    W, H = int(r - l), int(t - b)
    out = np.full((H, W), -999999.0, dtype="float32")
    for arr, prof in parts:
        tr = prof["transform"]
        x0 = int(round((tr.c - l) / 1.0)); y0 = int(round((t - tr.f) / 1.0))
        h, w = arr.shape
        ys, xs = slice(max(0, y0), min(H, y0 + h)), slice(max(0, x0), min(W, x0 + w))
        sub = arr[(ys.start - y0):(ys.stop - y0), (xs.start - x0):(xs.stop - x0)]
        dst = out[ys, xs]
        m = sub > -9000
        dst[m] = sub[m]
    transform = from_origin(l, t, 1.0, 1.0)
    return out, transform

def write_tif(path, arr, transform, crs="EPSG:26915", nodata=-999999.0):
    prof = dict(driver="GTiff", dtype="float32", count=1, width=arr.shape[1], height=arr.shape[0],
                crs=crs, transform=transform, nodata=nodata, compress="deflate", predictor=3,
                tiled=True, blockxsize=256, blockysize=256, zlevel=9)
    with rasterio.open(path, "w", **prof) as dst:
        dst.write(arr, 1)
        dst.update_tags(SOURCE="USGS 3DEP 1 m DEM, project MO_FEMANRCS_2020_D20 (prd-tnm S3)",
                        VERTICAL_DATUM="NAVD88 metres (GEOID18) per USGS 3DEP spec",
                        AREA="Table Rock Dam, Branson MO")

def hillshade(z, res=1.0, az=315, alt=45, z_factor=1.0):
    zz = np.where(z > -9000, z, np.nan)
    gy, gx = np.gradient(zz, res)
    slope = np.arctan(z_factor * np.hypot(gx, gy))
    aspect = np.arctan2(-gx, gy)
    azr, altr = math.radians(az), math.radians(alt)
    hs = np.sin(altr) * np.cos(slope) + np.cos(altr) * np.sin(slope) * np.cos(azr - aspect)
    hs = np.clip(hs, 0, 1)
    return np.nan_to_num(hs, nan=0.0)

if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith("--") else "."
    project = "MO_FEMANRCS_2020_D20"
    if "--project" in sys.argv: project = sys.argv[sys.argv.index("--project") + 1]
    os.makedirs(out, exist_ok=True)
    os.environ.setdefault("GDAL_DISABLE_READDIR_ON_OPEN", "EMPTY_DIR")
    print("fetching 5 km box from", project)
    dem, tr = mosaic(project, BOX_5KM)
    valid = dem > -9000
    # The 2020 FEMA/NRCS project stops at the Stone/Taney county line just west of the dam;
    # fill remaining holes from the 2021 Southwest Missouri project (acquired Dec 2021 - Jan 2022).
    if "--no-fill" not in sys.argv:
        fill_project = "MO_Southwest_2021_D21" if project != "MO_Southwest_2021_D21" else "MO_FEMANRCS_2020_D20"
        print("filling holes from", fill_project)
        try:
            dem2, _ = mosaic(fill_project, BOX_5KM)
            hole = (~valid) & (dem2 > -9000)
            dem[hole] = dem2[hole]
            print("  filled %d px" % int(hole.sum()))
            valid = dem > -9000
        except SystemExit:
            print("  no fill tiles")
    print("5 km box: valid %.1f%%  min %.2f  max %.2f m" % (100 * valid.mean(), dem[valid].min(), dem[valid].max()))
    write_tif(os.path.join(out, "trd_dem_1m_5km.tif"), dem, tr)
    # tight crop
    l, b, r, t = BOX_DAM
    L, B, R, T = BOX_5KM
    crop = dem[int(T - t):int(T - b), int(l - L):int(r - L)]
    write_tif(os.path.join(out, "trd_dem_1m_dam_crop.tif"), crop, from_origin(l, t, 1, 1))
    # 2 m version (mean of 2x2 valid cells)
    d = np.where(valid, dem, np.nan)
    d2 = np.nanmean(d.reshape(d.shape[0] // 2, 2, d.shape[1] // 2, 2), axis=(1, 3))
    d2 = np.where(np.isnan(d2), -999999.0, d2).astype("float32")
    write_tif(os.path.join(out, "trd_dem_2m_5km.tif"), d2, from_origin(L, T, 2, 2))
    # hillshade png
    from PIL import Image
    hs = hillshade(dem)
    Image.fromarray((hs * 255).astype("uint8")).save(os.path.join(out, "trd_hillshade_5km.png"))
    hs2 = hillshade(crop)
    Image.fromarray((hs2 * 255).astype("uint8")).save(os.path.join(out, "trd_hillshade_dam_crop.png"))
    print("done ->", out)
