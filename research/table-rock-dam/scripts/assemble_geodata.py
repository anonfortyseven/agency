#!/usr/bin/env python3
"""
Copy / crop / thin the processed products into the repository geodata folder with a size budget.
Usage: python3 assemble_geodata.py work_dir repo_geodata_dir
work_dir must contain: dem/, lidar/, lidar_products/, ortho/, s2/, topo_crops/, meta/ (see README)
"""
import sys, os, shutil, glob, json, numpy as np, rasterio, laspy
from rasterio.windows import from_bounds
from PIL import Image
W, G = sys.argv[1], sys.argv[2]
def mk(p): os.makedirs(p, exist_ok=True); return p
def cp(src, dst): shutil.copy2(src, dst); print("  %7.1f MB  %s" % (os.path.getsize(dst) / 1e6, os.path.relpath(dst, G)))

# 1 elevation
d = mk(f"{G}/elevation")
for f in ("trd_dem_1m_dam_crop.tif", "trd_dem_2m_5km.tif", "trd_hillshade_dam_crop.png"): cp(f"{W}/dem/{f}", f"{d}/{f}")
Image.open(f"{W}/dem/trd_hillshade_5km.png").resize((2500, 2500), Image.LANCZOS).save(f"{d}/trd_hillshade_5km_2m.png"); print("  hillshade 5 km downsampled to 2 m")
# 30 m context from the 20 m file
with rasterio.open(f"{W}/dem/trd_dem_20m_40km_context.tif") as s:
    a = s.read(1); prof = s.profile
a2 = a.reshape(a.shape[0] // 2, 2, a.shape[1] // 2, 2); a2 = np.where((a2 < -9000).any(axis=(1, 3)), -9999, a2.mean(axis=(1, 3))).astype("float32")
prof.update(width=a2.shape[1], height=a2.shape[0], transform=rasterio.Affine(40, 0, prof["transform"].c, 0, -40, prof["transform"].f))
with rasterio.open(f"{d}/trd_dem_40m_40km_context.tif", "w", **prof) as o:
    o.write(a2, 1); o.update_tags(SOURCE="USGS 3DEP 1/3 arc-second DEM (n37w094) resampled to 40 m, UTM 15N")
print("  40 m context DEM written")

# 2 lidar
d = mk(f"{G}/lidar")
for f in ("trd_lidar_2020_concrete_dam_powerhouse_hatchery.laz", "trd_lidar_2020_auxiliary_spillway.laz", "trd_lidar_2020_visitor_center.laz",
          "lidar_report.json", "lidar_measurements.json", "trd_crest_centreline.csv", "trd_crest_centreline_wgs84.geojson", "trd_crest_profile.csv",
          "trd_dsm_unrolled_along_crest.tif", "trd_dsm_unrolled_concrete_section_0p5m.tif"):
    cp(f"{W}/lidar_products/{f}", f"{d}/{f}")
for f in glob.glob(f"{W}/lidar/*.manifest.json"): cp(f, f"{d}/{os.path.basename(f)}")
# thinned clouds 1 of 16 (2020 AOI) and 1 of 8 (2021 west-side epoch)
for src, dst, step in ((f"{W}/lidar/trd_lidar_FEMANRCS_2020.laz", f"{d}/trd_lidar_2020_aoi_thinned_1of16.laz", 16),
                       (f"{W}/lidar/trd_lidar_Southwest_2021.laz", f"{d}/trd_lidar_2021_westside_thinned_1of8.laz", 8)):
    las = laspy.read(src); m = np.zeros(len(las), bool); m[::step] = True
    sub = las[m]; sub.write(dst); print("  %7.1f MB  %s (%d pts)" % (os.path.getsize(dst) / 1e6, os.path.relpath(dst, G), int(m.sum())))
# 0.5 m rasters cropped to the structures box
BOX = (471700, 4049600, 473100, 4051600)
for f in ("trd_dsm_0p5m_u16cm.tif", "trd_ndsm_0p5m_u16cm.tif", "trd_intensity_first_0p5m.tif", "trd_class_0p5m.tif"):
    with rasterio.open(f"{W}/lidar_products/{f}") as s:
        w = from_bounds(*BOX, s.transform).round_offsets().round_lengths(); a = s.read(window=w); prof = s.profile; tags = s.tags()
        prof.update(width=a.shape[2], height=a.shape[1], transform=s.window_transform(w))
    out = f"{d}/{f.replace('.tif', '_structures.tif')}"
    with rasterio.open(out, "w", **prof) as o:
        o.write(a); o.update_tags(**tags, CROP="structures box E471700-473100 N4049600-4051600 UTM15N")
    print("  %7.1f MB  %s" % (os.path.getsize(out) / 1e6, os.path.relpath(out, G)))
# sections
sd = mk(f"{d}/sections")
for f in glob.glob(f"{W}/lidar_products/section_*"): shutil.copy2(f, sd)
print("  sections:", len(os.listdir(sd)), "files")
# previews (downsampled jpg)
pd = mk(f"{d}/previews")
for f in glob.glob(f"{W}/lidar_products/preview_*.png"):
    im = Image.open(f).convert("RGB")
    if im.width > 3000: im = im.resize((3000, int(3000 * im.height / im.width)), Image.LANCZOS)
    im.save(f"{pd}/{os.path.basename(f).replace('.png', '.jpg')}", quality=85)
print("  previews:", len(os.listdir(pd)))

# 3 imagery
d = mk(f"{G}/imagery")
for f in sorted(glob.glob(f"{W}/ortho/*_ortho_1m.tif")):
    if "20171018" in f or "20210515" in f: continue          # those two sheets ignore layer toggles; use the strip-assembled files instead
    cp(f, f"{d}/{os.path.basename(f)}")
for f in glob.glob(f"{W}/ortho/*_ortho_strips_native.tif"): cp(f, f"{d}/{os.path.basename(f)}")
for f in glob.glob(f"{W}/s2/*.tif"): cp(f, f"{d}/{os.path.basename(f)}")

# 4 historical maps
d = mk(f"{G}/historical-maps")
keep = ["MO_Table_Rock_Dam_324283_1956_24000_geo", "MO_Table_Rock_Dam_324286_1956_24000_geo", "MO_Table_Rock_Dam_324287_1989_24000_geo", "MO_Table_Rock_Lake_325408_1985_100000_geo"]
for k in keep:
    cp(f"{W}/topo_crops/{k}_damcrop.tif", f"{d}/{k}_damcrop.tif"); cp(f"{W}/topo_crops/{k}_sheet_preview.jpg", f"{d}/{k}_sheet_preview.jpg")

# 5 metadata
d = mk(f"{G}/metadata")
for f in glob.glob(f"{W}/meta/*"): cp(f, f"{d}/{os.path.basename(f)}")
for f in glob.glob(f"{W}/../ept_*.json"): cp(f, f"{d}/{os.path.basename(f)}")
tot = sum(os.path.getsize(os.path.join(r, f)) for r, _, fs in os.walk(G) for f in fs)
print("TOTAL geodata: %.1f MB" % (tot / 1e6))
