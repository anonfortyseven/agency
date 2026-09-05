#!/usr/bin/env python3
"""
Extract the embedded NAIP orthoimage layer from USGS US Topo GeoPDFs of the 'Table Rock Dam, MO'
7.5-minute quadrangle and write georeferenced GeoTIFFs (EPSG:26915) of the dam area.
The GeoPDFs come from https://prd-tnm.s3.amazonaws.com/StagedProducts/Maps/USTopo/PDF/MO/
  MO_Table_Rock_Dam_20120105_TM_geo.pdf  (orthoimage ~2010 NAIP)
  MO_Table_Rock_Dam_20150129_TM_geo.pdf  (~2014 NAIP)
  MO_Table_Rock_Dam_20171018_TM_geo.pdf  (~2016 NAIP)
  MO_Table_Rock_Dam_20210515_TM_geo.pdf  (~2020 NAIP)
Usage: python3 extract_ustopo_ortho.py file.pdf out_dir [--box 471000 4048800 474000 4052300] [--gsd 1.0]
Requires pymupdf, numpy, rasterio, pyproj.
"""
import sys, os, re, numpy as np, pymupdf, rasterio
from rasterio.transform import Affine
from pyproj import Transformer

pdf, out = sys.argv[1], sys.argv[2]
def arg(name, default, n=1, cast=float):
    if name in sys.argv:
        i = sys.argv.index(name); v = [cast(x) for x in sys.argv[i+1:i+1+n]]; return v[0] if n == 1 else v
    return default
BOX = arg("--box", (471000, 4048800, 474000, 4052300), n=4)
GSD = arg("--gsd", 1.0)
os.makedirs(out, exist_ok=True)
doc = pymupdf.open(pdf); page = doc[0]; H = page.rect.height

def georef_from_pdf():
    """Return function f(x_pdf, y_pdf_up) -> (E, N) in EPSG:26915 and its inverse (affine fit)."""
    vp = doc.xref_get_key(page.xref, "VP")
    pts_page, pts_utm = [], []
    t = Transformer.from_crs("EPSG:4269", "EPSG:26915", always_xy=True)
    if vp[0] == "array":
        # ISO 32000 GeoPDF: find the 'Map Layers' viewport
        for m in re.finditer(r"/BBox\[([^\]]+)\](?:/LGIT:Info \d+ 0 R)?/Measure (\d+) 0 R/Name<([0-9A-Fa-f]+)>", vp[1]):
            name = bytes.fromhex(m.group(3)).decode("utf-16").strip("\x00")
            if "Map Layers" not in name: continue
            x0, y0, x1, y1 = map(float, m.group(1).split())
            meas = doc.xref_object(int(m.group(2)), compressed=False)
            g = list(map(float, re.search(r"/GPTS \[([^\]]+)\]", meas).group(1).split()))
            l = list(map(float, re.search(r"/LPTS \[([^\]]+)\]", meas).group(1).split()))
            for i in range(0, 8, 2):
                u, v = l[i], l[i+1]
                pts_page.append((x0 + u * (x1 - x0), y0 + v * (y1 - y0)))
                pts_utm.append(t.transform(g[i+1], g[i]))
            break
    if not pts_page:
        lg = doc.xref_get_key(page.xref, "LGIDict")[1]
        m = re.search(r"/CTM\[\(([^)]+)\)\(([^)]+)\)\(([^)]+)\)\(([^)]+)\)\(([^)]+)\)\(([^)]+)\)\]/Description\(Map Layers\)", lg)
        a, bb, c, d, e, f = map(float, m.groups())
        for x, y in [(0, 0), (1000, 0), (0, 1000), (1000, 1000)]:
            pts_page.append((x, y)); pts_utm.append((a * x + c * y + e, bb * x + d * y + f))
    # least-squares affine page(x, y_up) -> UTM
    A = np.array([[x, y, 1] for x, y in pts_page]); E = np.array([p[0] for p in pts_utm]); N = np.array([p[1] for p in pts_utm])
    ce, _, _, _ = np.linalg.lstsq(A, E, rcond=None); cn, _, _, _ = np.linalg.lstsq(A, N, rcond=None)
    fwd = lambda x, y: (ce[0]*x + ce[1]*y + ce[2], cn[0]*x + cn[1]*y + cn[2])
    M = np.array([[ce[0], ce[1]], [cn[0], cn[1]]]); Mi = np.linalg.inv(M)
    inv = lambda Ee, Nn: tuple(Mi @ np.array([Ee - ce[2], Nn - cn[2]]))
    return fwd, inv, ce, cn

fwd, inv, ce, cn = georef_from_pdf()
m_per_pt = math.hypot(ce[0], cn[0]) if (math := __import__("math")) else 8.4667
print(os.path.basename(pdf), "scale: %.4f m per PDF point" % m_per_pt)

# show only the orthoimage
for cfg in doc.layer_ui_configs():
    doc.set_layer_ui_config(cfg["number"], 0 if cfg["text"] in ("Images", "Orthoimage") else 2)

# page clip (pymupdf y-down) for the UTM box
corners = [inv(BOX[0], BOX[1]), inv(BOX[2], BOX[1]), inv(BOX[2], BOX[3]), inv(BOX[0], BOX[3])]
xs = [c[0] for c in corners]; ys = [H - c[1] for c in corners]
clip = pymupdf.Rect(min(xs), min(ys), max(xs), max(ys))
zoom = m_per_pt / GSD
pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), clip=clip, alpha=False)
img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, pix.n)[:, :, :3]
print("rendered", img.shape, "px at", GSD, "m")

# georeference: pixel (col,row) -> page (x = clip.x0 + col/zoom, y_up = H - (clip.y0 + row/zoom)) -> UTM
def pix2utm(col, row):
    return fwd(clip.x0 + col / zoom, H - (clip.y0 + row / zoom))
E0, N0 = pix2utm(0, 0); E1, N1 = pix2utm(1, 0); E2, N2 = pix2utm(0, 1)
transform = Affine(E1 - E0, E2 - E0, E0, N1 - N0, N2 - N0, N0)
name = os.path.splitext(os.path.basename(pdf))[0].replace("_TM_geo", "") + "_ortho_%gm" % GSD
prof = dict(driver="GTiff", dtype="uint8", count=3, width=img.shape[1], height=img.shape[0], crs="EPSG:26915",
            transform=transform, compress="JPEG", jpeg_quality=92, photometric="YCBCR", tiled=True)
with rasterio.open(os.path.join(out, name + ".tif"), "w", **prof) as dst:
    dst.write(np.moveaxis(img, -1, 0))
    dst.update_tags(SOURCE="USGS US Topo GeoPDF orthoimage layer (NAIP) " + os.path.basename(pdf),
                    NOTE="rendered from the PDF's Orthoimage layer; georeferenced from the GeoPDF Map Layers viewport")
from PIL import Image
Image.fromarray(img).save(os.path.join(out, name + ".jpg"), quality=90)
print("wrote", name)

# ---------------------------------------------------------------------------------------------
# Alternative path for sheets whose optional-content toggles are ignored by the renderer
# (2017-10-18 and 2021-05-15 editions): rebuild the orthoimage from the embedded 9600-px-wide
# JPEG strips using their page placement rectangles (page.get_image_info). Native GSD ~1.52 m.
#   python3 extract_ustopo_ortho.py file.pdf out_dir --strips [--box ...]
# ---------------------------------------------------------------------------------------------
if "--strips" in sys.argv:
    import io, re
    from PIL import Image as _I
    # Placement matrices come from the page content stream itself ("a b c d e f cm /ImN Do"); the
    # library's name->xref association is unreliable for pages with >100 images, so map names
    # through the page's XObject resource dictionary explicitly.
    xo = doc.xref_get_key(page.xref, "Resources/XObject")[1]
    name2x = {m.group(1): int(m.group(2)) for m in re.finditer(r"/(Im\d+) (\d+) 0 R", xo)}
    txt = page.read_contents().decode("latin-1")
    pat = re.compile(r"([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+cm\s*/(Im\d+)\s+Do")
    scale = 9600.0 / page.rect.width                          # px per PDF point (strips are 9600 px wide)
    Hc = int(np.ceil(page.rect.height * scale)); canvas = np.zeros((Hc, 9600, 3), np.uint8); cache = {}; n = 0
    for m in pat.finditer(txt):
        a, b, c, d, e, f = map(float, m.groups()[:6]); name = m.group(7)
        x = name2x.get(name)
        if x is None: continue
        if x not in cache:
            raw = doc.extract_image(x)
            cache[x] = None if raw["ext"] != "jpeg" else np.asarray(_I.open(io.BytesIO(raw["image"])).convert("RGB"))
        im = cache[x]
        if im is None or im.shape[1] != 9600: continue         # skip PNG placeholder strips
        if d < 0: im = im[::-1]                                # negative d = image drawn flipped
        r0 = int(round((H - max(f, f + d)) * scale)); c0 = int(round(e * scale))
        h = min(im.shape[0], Hc - r0); w = min(im.shape[1], 9600 - c0)
        if h > 0 and w > 0: canvas[r0:r0 + h, c0:c0 + w] = im[:h, :w]; n += 1
    print("placed", n, "jpeg strips from the content stream")
    xs = [c[0] for c in corners]; ys = [H - c[1] for c in corners]
    c0, c1 = int(min(xs) * scale), int(np.ceil(max(xs) * scale)); r0, r1 = int(min(ys) * scale), int(np.ceil(max(ys) * scale))
    sub = canvas[r0:r1, c0:c1]
    def pix2utm_s(col, row): return fwd((c0 + col) / scale, H - (r0 + row) / scale)
    E0, N0 = pix2utm_s(0, 0); E1, N1 = pix2utm_s(1, 0); E2, N2 = pix2utm_s(0, 1)
    tr_s = Affine(E1 - E0, E2 - E0, E0, N1 - N0, N2 - N0, N0)
    name_s = os.path.splitext(os.path.basename(pdf))[0].replace("_TM_geo", "") + "_ortho_strips_native"
    prof = dict(driver="GTiff", dtype="uint8", count=3, width=sub.shape[1], height=sub.shape[0], crs="EPSG:26915",
                transform=tr_s, compress="JPEG", jpeg_quality=92, photometric="YCBCR", tiled=True)
    with rasterio.open(os.path.join(out, name_s + ".tif"), "w", **prof) as dst:
        dst.write(np.moveaxis(sub, -1, 0))
        dst.update_tags(SOURCE="USGS US Topo GeoPDF embedded orthoimage strips (NAIP) " + os.path.basename(pdf),
                        NOTE="assembled from the 9600-px JPEG strips using the content-stream placement matrices; native ~1.52 m GSD; no vector overlays; georeferenced from the GeoPDF Map Layers viewport")
    _I.fromarray(sub).save(os.path.join(out, name_s + ".jpg"), quality=90)
    print("wrote", name_s, sub.shape, "GSD ~%.2f m" % abs(tr_s.a))
