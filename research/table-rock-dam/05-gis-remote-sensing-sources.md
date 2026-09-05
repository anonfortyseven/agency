# Table Rock Dam — GIS, Mapping, Remote Sensing & 3-D Data Sources

> ## ⚠️ CORRECTION FROM MEASURED GEODATA (added 2026-09-05 by the consolidating agent)
>
> §1.7 / summary items derived from the bare-earth DEM state "spillway north, powerhouse south". The all-return lidar DSM unrolled along the crest (`geodata/lidar/trd_dsm_unrolled_concrete_section_0p5m.tif`, preview in `geodata/lidar/previews/`) shows the opposite: the **ten gated bays occupy stations 100–265 m from the SOUTH abutment** (N ≈ 4,049,944–4,050,107) and the **powerhouse roof block lies immediately NORTH of them** (stations 265–357). The bare-earth DEM cannot show the powerhouse (buildings are removed), which is why the DEM-only reading was ambiguous. The S3 paths, project names, dates and accuracy statements in this file are unaffected and were re-verified by the consolidating agent's own downloads (see `10-geodata-products.md`).



**Dimension 05 of the Table Rock Dam research database.** Target feature: Table Rock Dam, White River, Branson, Taney County, Missouri (USACE Little Rock District, SWL). Working coordinate supplied by the project: 36.5967 N, -93.3106 W.

Compiled 2026-09-05. Written for the team building a detailed 3-D model, so geospatial detail (elevation, LiDAR, bathymetry, imagery, vectors, coordinates) dominates.

## How this file was verified — read this first

The shared WebSearch budget for this session ran out after 15 queries (200/200 calls consumed across the eight parallel agents), and ordinary websites are blocked by the proxy. To keep the LiDAR/elevation section authoritative anyway, the public Amazon S3 buckets that *are* reachable were interrogated directly with plain HTTPS listing requests and small metadata reads:

* `prd-tnm.s3.amazonaws.com` — USGS The National Map staged products (3DEP LPC/DEM/OPR, HTMC historical topos, US Topo, NHD, WBD, Tran, GovtUnit, Struct).
* `s3-us-west-2.amazonaws.com/usgs-lidar-public` — USGS 3DEP Entwine Point Tile (EPT) point clouds.
* `noaa-nos-coastal-lidar-pds.s3.amazonaws.com` — NOAA Digital Coast lidar store.

Every URL, project name, tile name, date and accuracy figure tagged **[S3]** below was read from those buckets in this session. Figures tagged **[DEM]** were computed in this session from the USGS 1-m DEM (rasterio, HTTP range requests) and from EPT hierarchy files. Items tagged **[S]** come from the 15 WebSearch results (URLs copied exactly as returned). Items tagged **[U]** are background knowledge that could **not** be verified this session — treat as leads to confirm, not facts. Nothing is invented; inferred URLs are marked "(unverified)".

---

## 0. Recommended data stack for the 3-D model

| Layer | Best dataset | Resolution / accuracy | Year | URL | License | How to get it |
|---|---|---|---|---|---|---|
| Bare-earth terrain, whole dam + Branson/Taneycomo side | USGS 3DEP 1-m DEM, project **MO_FEMANRCS_2020_D20**, tiles `USGS_1M_15_x47y406` (dam, N 4050–4060 km) and `USGS_1M_15_x47y405` (hatchery, State Park, N 4040–4050 km) **[S3]** | 1 m; NAVD88 (Geoid18); produced to 10-cm RMSEz class **[S3]** | Flown 2020-04-15 → 2020-12-05; published 2023-01-16 **[S3]** | https://prd-tnm.s3.amazonaws.com/StagedProducts/Elevation/1m/Projects/MO_FEMANRCS_2020_D20/TIFF/USGS_1M_15_x47y406_MO_FEMANRCS_2020_D20.tif (281 MB) and `.../USGS_1M_15_x47y405_MO_FEMANRCS_2020_D20.tif` (268 MB) **[S3]** | US public domain (3DEP) | Direct HTTPS; files are tiled GeoTIFF with overviews, so windowed reads via `/vsicurl/` work (proven this session) |
| Classified point cloud, dam & downstream | 3DEP LPC **MO_FEMANRCS_2020_D20 / work unit MO_FEMANRCS_1_2020** (NV5 Geospatial, QL2, NPS 0.71 m, LAS 1.4) **[S3]** | ~2–6 pts/m² measured at powerhouse/hatchery **[DEM]** | 2020 | EPT: https://s3-us-west-2.amazonaws.com/usgs-lidar-public/MO_FEMANRCS_1_2020/ept.json ; LAZ tiles 15SVA46950500, 15SVA47100485, 15SVA47100500, 15SVA47250485, 15SVA47250500 under https://rockyweb.usgs.gov/vdelivery/Datasets/Staged/Elevation/LPC/Projects/MO_FEMANRCS_2020_D20/MO_FEMANRCS_1_2020/LAZ/ **[S3]** | Public domain | PDAL `readers.ept` with a bounds filter, or LAZ tile download |
| Point cloud, west abutment / Table Rock State Park / lake (Stone Co. side) | 3DEP LPC **MO_Southwest_2021_D21 / MO_Southwest_1_2021** (Digital Aerial Solutions, QL2, Leica sensor, leaf-off) **[S3]** | ~6–10 pts/m² measured (swath overlap) **[DEM]** | 2021-12-06 → 2022-01-31 **[S3]** | EPT: https://s3-us-west-2.amazonaws.com/usgs-lidar-public/MO_Southwest_1_2021/ept.json ; tiles 15SVA470049/470050/470052/471049/471050/471052 **[S3]** | Public domain | Same; note it stops 90 m west of the supplied dam coordinate (see §1.2) |
| Reservoir bathymetry | USGS Scientific Investigations Map 3499, *Bathymetric map and surface area and capacity table for Table Rock Lake near Branson, Missouri, 2020* (Huizinga, Rivers, Richards, 2022) + data release DOI 10.5066/P9FAFJZG **[S]** | Multibeam echosounder, Oct–Nov 2020, merged with 1/3-arc-second DEM and lidar **[S]** | 2020 | https://pubs.usgs.gov/publication/sim3499/full ; https://www.sciencebase.gov/catalog/item/62b4d245d34e8f4977cbd09f **[S]** | Public domain | Download the data-release rasters/points from ScienceBase (blocked from this sandbox; use a normal browser) |
| Pre-impoundment / construction-era topography | USGS HTMC 7.5' **"Table Rock Dam" 1956** (4 scans), "Branson" 1956, "Garber" **1950**, "Hollister" 1956, "Lampe" 1956, "Reeds Spring" 1956, "Galena" 1956, "Forsyth" 1956 and **1907 30' 1:125,000** **[S3]** | 1:24,000 (20-ft contours typical) / 1:125,000 | 1907–1956 | e.g. https://prd-tnm.s3.amazonaws.com/StagedProducts/Maps/HistoricalTopo/GeoTIFF/MO/MO_Table%20Rock%20Dam_324283_1956_24000_geo.tif **[S3]** | Public domain | Direct HTTPS (10–15 MB each), or topoView |
| Hydro-flattened water surfaces (for lake/tailwater planes) | Read from the DEMs: Table Rock pool **917.1 ft NAVD88** (2020 DEM), **912.9 ft** (2021/22 DEM); Lake Taneycomo tailwater **706.7 ft** (2020 DEM) **[DEM]** | flat planes | 2020 / 2021-22 | as above | — | Already extracted (§7) |
| Hydro breaklines (waterbody/stream edges at acquisition) | `MO_FEMANRCS_2020_D20_HydroBreaklines.gdb` (zip) and `MO_Southwest_2021_D21` `Breakline.gdb` **[S3]** | vector 3-D breaklines | 2020 / 2021-22 | https://prd-tnm.s3.amazonaws.com/StagedProducts/Elevation/metadata/MO_FEMANRCS_2020_D20/MO_FEMANRCS_1_2020/breaklines.zip ; https://prd-tnm.s3.amazonaws.com/StagedProducts/Elevation/metadata/MO_Southwest_2021_D21/MO_Southwest_1_2021/breaklines.zip **[S3]** | Public domain | Direct HTTPS |
| Seamless fallback DEM (lake-wide context) | USGS 1/3-arc-second `USGS_13_n37w094` (current edition 2023-12-26) **[S3]** | ~10 m | 2023 edition | https://prd-tnm.s3.amazonaws.com/StagedProducts/Elevation/13/TIFF/current/n37w094/USGS_13_n37w094.tif **[S3]** | Public domain | Direct HTTPS |
| Orthoimagery | USDA NAIP (Missouri) **[U]**; Missouri state imagery via MSDIS/moimagery image services **[S]** | 1 m → 60 cm (NAIP) **[U]**; state program higher **[U]** | multiple | https://www.flymoimagery.com/ **[S]**; https://msdis.missouri.edu/ **[S]** | NAIP public domain; state imagery per MSDIS terms | NAIP: USGS EarthExplorer / USDA GeoHub / AWS `naip-*` buckets (requester-pays) **[U]** |
| Hydrography vectors | NHD High Resolution, Missouri state GPKG; NHDPlus HR HU4 **1101** (Upper White) **[S3]** | 1:24,000-class | current | https://prd-tnm.s3.amazonaws.com/StagedProducts/Hydrography/NHD/State/GPKG/NHD_H_Missouri_State_GPKG.zip ; https://prd-tnm.s3.amazonaws.com/StagedProducts/Hydrography/NHDPlusHR/Beta/GDB/NHDPLUS_H_1101_HU4_GDB.zip **[S3]** | Public domain | Direct HTTPS |
| Roads, boundaries, structures | The National Map `TRAN_Missouri_State_GPKG.zip`, `GOVTUNIT_Missouri_State_GPKG.zip`, `STRUCT_Missouri_State_GPKG.zip` **[S3]** | 1:24,000-class | current | https://prd-tnm.s3.amazonaws.com/StagedProducts/Tran/GPKG/TRAN_Missouri_State_GPKG.zip etc. **[S3]** | Public domain | Direct HTTPS |
| Current topo sheet | US Topo "Table Rock Dam" quadrangle, editions 2012-01-05, 2015-01-29, 2017-10-18, 2021-05-15 **[S3]** | 1:24,000 GeoPDF | 2021 latest | https://prd-tnm.s3.amazonaws.com/StagedProducts/Maps/USTopo/PDF/MO/MO_Table_Rock_Dam_20210515_TM_geo.pdf **[S3]** | Public domain | Direct HTTPS |

---

## 1. LiDAR / elevation

### 1.1 The direct answer: which 3DEP projects cover the dam

Two USGS 3DEP lidar projects meet at Table Rock Dam. Their names, exactly as staged by USGS **[S3]**:

| USGS project (prd-tnm name) | Work unit / EPT name | Vendor | Acquisition dates | Spec / QL | Covers the dam? |
|---|---|---|---|---|---|
| **MO_FEMANRCS_2020_D20** | **MO_FEMANRCS_1_2020** (also `_2_` and `_3_` blocks elsewhere in the state) | NV5 Geospatial, Lexington KY (contract G16PC00016, task order 140G0220F0094, Work Unit 191884) | 2020-04-15 → 2020-12-05 (spring and fall 2020, no snow, rivers at/below normal) | USGS Lidar Base Spec v2.1; NPS 0.71 m (= QL2); 1500 m × 1500 m tiles; LAS 1.4 | **Yes — entire dam, powerhouse, hatchery, Lake Taneycomo, Branson.** Silhouette polygon spans E 470,328 → 521,329 m (UTM 15N) along the dam's northing. |
| **MO_Southwest_2021_D21** | **MO_Southwest_1_2021** (block 2 lies farther north-west) | Digital Aerial Solutions, LLC, Riverview FL (USGS/NRCS task order) | 2021-12-06 → 2022-01-31 (17 lifts, 227 flight lines, leaf-off; Leica "Terrian" sensor SN 90524, bases at Monett KHFJ and Nevada KNVD) | USGS NGP Lidar Base Spec 2022 rev. A; QL2; ANPS 0.71 m; 1500 m tiles; LAS 1.4 PDRF 6 | **Partly — west abutment, auxiliary-spillway approach, Table Rock State Park and the lake.** Its extent polygon ends at E 472,128 m on the dam's row, i.e. 90 m west of the supplied dam coordinate (E 472,219). |

Vendor/contract facts above are from the vendor-provided FGDC XMLs staged by USGS **[S3]**:
* https://prd-tnm.s3.amazonaws.com/StagedProducts/Elevation/metadata/MO_FEMANRCS_2020_D20/MO_FEMANRCS_1_2020/reports/vendor_provided_xml/MO_FEMANRCS_2020_D20_WU191884_ClassifiedPointCloud.xml
* https://prd-tnm.s3.amazonaws.com/StagedProducts/Elevation/metadata/MO_Southwest_2021_D21/MO_Southwest_1_2021/reports/vendor_provided_xml/MO_Southwest_2021_D21_Classified_LAS_D1.xml

MO_FEMANRCS_1_2020 placekeys (36 counties, ~4,028 sq mi) include **Stone County and Taney County** (plus Christian, Greene, Lawrence, Barton, Jasper, Newton, Dade, Dallas, Douglas, Ozark, Polk, Webster and others) **[S3]**. Accuracy statements **[S3]**: produced to ASPRS 2014 10-cm RMSEz vertical accuracy class; horizontal 14 cm RMSEx/y class (±25 cm at 95 %); relative swath accuracy ≤ 7 cm RMSEz. Horizontal datum NAD83(2011) UTM 15N (EPSG 6344), vertical NAVD88 Geoid18 (EPSG 5703) — this is the compound CRS recorded in the USGS LPC report (`COMPD_CS["NAD83(2011) / UTM zone 15N + NAVD88 height - Geoid18 (m)"]`) **[S3]**.

No older USGS-held lidar exists for Taney or Stone County: the complete `MO_` inventory (§1.6) contains no 2008–2019 project touching either county; the nearest legacy sets are `MO_BarryCo_2011` and `MO_GreeneCo_2011` **[S3]**. So 2020 is the first lidar epoch of the dam in federal holdings. (The MSDIS County LiDAR Index, §1.5, should still be checked for any county-funded flight.)

### 1.2 Coverage evidence at the dam (computed this session)

Extent polygons (`*_Silhouette.shp`, NAD83(2011) UTM 15N) were downloaded and tested against landmark points **[S3][DEM]**:

| Point (approx.) | UTM 15N E, N (m) | Inside MO_FEMANRCS_1_2020? | Inside MO_Southwest_1_2021? |
|---|---|---|---|
| Supplied dam coordinate 36.5967, -93.3106 | 472,219 / 4,050,179 | yes | **no** |
| West abutment / auxiliary spillway area (~36.5975, -93.3160 / 36.5985, -93.3195) | 471,736 / 4,050,270 ; 471,423 / 4,050,382 | yes | yes |
| Powerhouse / tailrace (~36.5955, -93.3080) | 472,451 / 4,050,046 | yes | no |
| Hatchery side (~36.5935, -93.3050) | 472,718 / 4,049,823 | yes | no |
| Coverage interval crossing N = 4,050,179 | — | E 470,328 → 521,329 | E 447,892 → 472,128 |

EPT octree walks (point counts per node, summed per column) gave these rough density estimates **[DEM]** — low values over open water are expected (near-IR lidar returns little from water):

| Location | MO_FEMANRCS_1_2020 | MO_Southwest_1_2021 |
|---|---|---|
| Hatchery grounds | ~6.1 pts/m² | none |
| Powerhouse / tailrace | ~2.5 | none |
| 500 m east of dam (land) | ~2.7 | outside bounds |
| Lake Taneycomo 1 km downstream | ~3.7 | outside bounds |
| Branson Landing | ~2.1 | outside bounds |
| Table Rock State Park (land) | ~3.1 | ~10.1 |
| Hwy 165 1 km west of dam | ~3.4 | ~10.2 |
| Indian Point (5 km W) | none | ~0.2 (water) |
| Kimberling City | none | ~7.8 |

The two projects overlap in a strip roughly lon -93.30 to -93.34; the FEMANRCS 2020 data are the only lidar over the concrete section, the powerhouse, the hatchery and Lake Taneycomo.

### 1.3 Exact files at the dam **[S3]**

Point-cloud tiles (1500 m, named `15SVA` + easting/100 m + northing/100 m minus 4,000 km; e.g. `47100500` = E 471.0–472.5 km, N 4050.0–4051.5 km):

| Tile (MO_FEMANRCS_1_2020) | Covers | LAZ URL (rockyweb) |
|---|---|---|
| 15SVA47100500 | main embankment crest, concrete section (N part), aux-spillway approach | https://rockyweb.usgs.gov/vdelivery/Datasets/Staged/Elevation/LPC/Projects/MO_FEMANRCS_2020_D20/MO_FEMANRCS_1_2020/LAZ/USGS_LPC_MO_FEMANRCS_2020_D20_15SVA47100500.laz |
| 15SVA47100485 | south embankment, south abutment bluff, powerhouse (S part) | `.../USGS_LPC_MO_FEMANRCS_2020_D20_15SVA47100485.laz` |
| 15SVA47250500 | tailrace, hatchery, Taneycomo north bank, aux-spillway chute | `.../USGS_LPC_MO_FEMANRCS_2020_D20_15SVA47250500.laz` |
| 15SVA47250485 | Taneycomo south bank, Hwy 165 east approach | `.../USGS_LPC_MO_FEMANRCS_2020_D20_15SVA47250485.laz` |
| 15SVA46950500, 15SVA46950485, 15SVA46950515, 15SVA47100515, 15SVA47250515 | lake side / north | same pattern |

Original-product-resolution DEMs (OPR, vendor 1-m hydro-flattened rasters, same tile scheme): `https://prd-tnm.s3.amazonaws.com/StagedProducts/Elevation/OPR/Projects/MO_FEMANRCS_2020_D20/MO_FEMANRCS_1_2020/TIFF/USGS_OPR_MO_FEMANRCS_2020_D20_15SVA47100500.tif` (1.9 MB), `..._15SVA47100485.tif` (3.6 MB), `..._15SVA47250500.tif` (7.3 MB), `..._15SVA47250485.tif` (7.6 MB), `..._15SVA46950500.tif` (0.8 MB) **[S3]**.

Southwest 2021 tiles nearest the dam (1500 m, named `15SVA` + rounded km): 15SVA470049, 470050, 470052, 471049, 471050, 471052 — LAZ at `https://rockyweb.usgs.gov/vdelivery/Datasets/Staged/Elevation/LPC/Projects/MO_Southwest_2021_D21/MO_Southwest_1_2021/LAZ/USGS_LPC_MO_Southwest_2021_D21_15SVA471050.laz`, OPR at `https://prd-tnm.s3.amazonaws.com/StagedProducts/Elevation/OPR/Projects/MO_Southwest_2021_D21/MO_Southwest_1_2021/TIFF/USGS_OPR_MO_Southwest_2021_D21_15SVA471050.tif` **[S3]**. Complete tile lists: `.../MO_Southwest_1_2021/0_file_download_links.txt` (2,200 tiles) and `.../MO_FEMANRCS_1_2020/0_file_download_links.txt` (5,019 tiles) under `https://prd-tnm.s3.amazonaws.com/StagedProducts/Elevation/LPC/Projects/<project>/<workunit>/` **[S3]**.

Standard 1-m DEM tiles (10 km, UTM 15N; note the y-index is the tile's *northern* edge in 10-km units — x47y405 spans N 4,040,000–4,050,006) **[S3]**:

| Tile | Project | Size | Notes |
|---|---|---|---|
| USGS_1M_15_x47y406 | MO_FEMANRCS_2020_D20 | 281 MB | dam, aux spillway, Taneycomo below dam, Branson south |
| USGS_1M_15_x47y405 | MO_FEMANRCS_2020_D20 | 268 MB | hatchery (S bank), Table Rock State Park, south abutment |
| USGS_1M_15_x48y406 | MO_FEMANRCS_2020_D20 | 322 MB | Branson, Taneycomo downstream |
| USGS_1M_15_x47y406 / x47y405 / x46y406 | MO_Southwest_2021_D21 | 56 / 47 / 263 MB | lake side; sparse in x47 (edge) |

Per-tile FGDC metadata: `https://prd-tnm.s3.amazonaws.com/StagedProducts/Elevation/1m/Projects/MO_FEMANRCS_2020_D20/metadata/USGS_1M_15_x47y406_MO_FEMANRCS_2020_D20.xml` (dates 2020-04-08 → 2020-12-05, published 2023-01-16) and `.../MO_Southwest_2021_D21/metadata/USGS_1M_15_x47y405_MO_Southwest_2021_D21.xml` (2021-12-06 → 2022-01-31, published 2022-11-02) **[S3]**.

Project reports and QA products **[S3]** (all under `https://prd-tnm.s3.amazonaws.com/StagedProducts/Elevation/metadata/`):
* `MO_FEMANRCS_2020_D20/MO_FEMANRCS_1_2020/reports/MO_FEMANRCS_2020_D20_WU19184_ProcessingReport.pdf`, `USGS_MO_FEMANRCS_1_2020_Summary_Report_03_01_2022_203420.pdf`, `USGS_MO_FEMANRCS_1_2020_FINAL_LPC_Report.txt`, `USGS_MO_FEMANRCS_1_2020_FINAL_DEM_Report.txt`; `spatial_metadata/USGS/USGS_MO_FEMANRCS_1_2020_TileIndex.zip`, `..._Swath_Poly.shp`, `..._FINAL_Silhouette.shp`, `USGS_Maximum_Surface_Height_Raster/` (per-tile DSM-like max-height rasters — useful for building/structure heights).
* `MO_Southwest_2021_D21/MO_Southwest_1_2021/reports/project_report/MO_Southwest_2021_D21_LidarMapping_Report_D1.pdf`, `acquisition_report/MO_Southwest_2021_D21_Ground_Survey_Report.pdf`, `USGS_MO_Southwest_1_2021_Summary_Report.pdf`, LPC/DEM report .txt; `spatial_metadata/USGS/USGS_MO_Southwest_1_2021_TileIndex/`, `..._Silhouette.gpkg`.

### 1.4 Seamless DEMs **[S3]**

| Product | File | Edition | Notes |
|---|---|---|---|
| 1/3 arc-second (~10 m) | https://prd-tnm.s3.amazonaws.com/StagedProducts/Elevation/13/TIFF/current/n37w094/USGS_13_n37w094.tif (+ .xml, .gpkg, .jpg) | 2023-12-26 (source dates 1964 → 2023-03-20) | 1°×1° tile 36–37 N, 93–94 W — covers the whole Missouri part of Table Rock Lake and Taneycomo |
| 1/3 arc-second, historical editions | `.../13/TIFF/historical/n37w094/USGS_13_n37w094_20120601.tif`, `_20191004.tif`, `_20221102.tif`, `_20230117.tif`, `_20231226.tif` | 2012, 2019, 2022, 2023 | The 2012-06-01 edition predates all lidar here (contour/photogrammetric NED) — a useful "pre-lidar" comparison surface |
| 1 arc-second (~30 m) | https://prd-tnm.s3.amazonaws.com/StagedProducts/Elevation/1/TIFF/current/n37w094/USGS_1_n37w094.tif | current | context only |

### 1.5 Missouri state / other access points

| Source | URL | Notes |
|---|---|---|
| MSDIS LiDAR image services (ArcGIS ImageServer, statewide by project) | https://lidar.msdis.missouri.edu/arcgis/rest/services/MO_Southwest_2021_D21_UTM/ImageServer **[S]** ; sibling services seen: `MO_SE11County_2024_B24_UTM`, `MO_Southern_2022_UTM`, `StLouis_2017_UTM` **[S]** ; mirror: https://moimagery.missouri.edu/arcgis/rest/services/LiDAR/MO_Southwest_2021_D21_UTM/ImageServer/histograms **[S]** | Serves the DEM as an image service; a `MO_FEMANRCS_2020_D20_UTM` service is likely to exist on the same host (unverified) |
| MSDIS LiDAR DEM download tool | https://www.msdis.missouri.edu/data/lidar/download/modem.html **[S]** ; help: https://www.msdis.missouri.edu/data/lidar/download/help.html **[S]** ; primer: https://msdis.missouri.edu/data/lidar/primer.html **[S]** ; index: https://msdis.missouri.edu/data/lidar/ **[S]** | County/tile DEM downloads |
| MSDIS "MO County LiDAR Index" (open data) | https://data-msdis.opendata.arcgis.com/datasets/mo-county-lidar-index-1 **[S]** ; https://data-msdis.opendata.arcgis.com/datasets/MSDIS::mo-county-lidar-index-1/about **[S]** ; LiDAR page https://data-msdis.opendata.arcgis.com/pages/lidar **[S]** | Which project/year covers each county — check Taney & Stone here for any non-federal flights |
| MSDIS elevation page / web services | https://www.msdis.missouri.edu/data/elevation/index.html **[S]** ; https://www.msdis.missouri.edu/webservices.html **[S]** | |
| Missouri DNR Imagery & LiDAR project page | https://dnr.mo.gov/land-geology/what-were-doing/imagery-light-detection-ranging-lidar **[S]** | States: new **QL1** lidar collected spring 2024 (replacing QL2), free to the public in **2027**; MoHIC applied to 3DEP in 2023 **[S]** |
| Missouri Hydrology Information Center (MoHIC) | https://dnr.mo.gov/water/hows-water/mo-hydrology-information-center-mohic **[S]** | |
| Fly Missouri Imagery (state imagery/lidar program) | https://www.flymoimagery.com/lidar/ **[S]** ; https://www.flymoimagery.com/lidar/federal-3dep-program/ **[S]** | Notes that with 2023–24 collections Missouri reaches complete QL2+ coverage **[S]** |
| USGS 3DEP DCA selections (future QL1) | https://www.usgs.gov/3d-national-topography-model/fy25-3dep-data-collaboration-announcement-dca-selected-projects **[S]** ; https://www.usgs.gov/3d-national-topography-model/fy26-3dep-data-collaboration-announcement-dca-selected-projects **[S]** | FY26 list includes a QL1 project for 2 counties in Southwest Missouri **[S]** — identity of the counties not confirmed |
| USGS fact sheet, 3DEP supporting Missouri's economy | https://pubs.usgs.gov/publication/fs20233042/full **[S]** | |
| 2011 "Missouri Counties LiDAR Project" (USACE St. Louis District / Surdex, >6,500 sq mi) | https://mgisac.org/2011/01/05/missouri-lidar-data/ **[S]** ; example processing summary https://rockyweb.usgs.gov/vdelivery/Datasets/Staged/Elevation/metadata/legacy/MO_RAYCO_2011/LiDAR_Acquistition-Processing_Summary_Livingston-Ray.pdf **[S]** | Did not include Taney/Stone per USGS inventory |
| Equator Studios county pages (commercial aggregator) | https://gis.equatorstudios.com/missouri_taney/ **[S]** ; https://gis.equatorstudios.com/missouri_stone/ **[S]** ; https://gis.equatorstudios.com/topographic-map/united-states/missouri/ **[S]** | Convenience viewer; data are the public 3DEP sets |

### 1.6 Complete USGS inventory of Missouri and Arkansas projects (for the whole lake) **[S3]**

EPT datasets in `usgs-lidar-public` with `MO_` prefix (47): MO_7Co_1_D23, MO_AR_CapeGirardeau_Stoddard_2013, MO_AR_CapeGirardeau_Stoddard_UTM15_2013, MO_AdairCo_2011, MO_BarryCo_2011, MO_BooneCo_2009, MO_Clay_County_2008, MO_Cole-Callaway-Osage_2010, MO_CooperCo_2011, MO_DuckCreek_2009, MO_DunklinCo_2012, MO_FEMANRCS_1_2020, MO_FEMANRCS_2_2020, MO_FEMANRCS_3_2020, MO_FranklinCo_2011, MO_GreeneCo_2011, MO_HowardCo_2011, MO_JasperCo_2010, MO_JeffersonGenevieve_2010, MO_LincolnCo_2011, MO_LivingstonCo_2011, MO_LivingstonCounty_2011, MO_MaconCo_2011, MO_MonroeAudrainMontgomeryCos_2011, MO_NSEMO_1_2021, MO_NSEMO_2_2021, MO_Platte_County_2008, MO_PutnamCo_2011, MO_RandolphCo_2012, MO_RayCo_2011, MO_Rolla_2011, MO_SE11County_1_B24, MO_SouthernMO_1_D22, MO_SouthernMO_2_D22, MO_Southwest_1_2021, MO_Southwest_2_2021, MO_StFrancoisCo_2011, MO_StFrancois_2012, MO_StLouis_2012, MO_Steelville_2011, MO_SullivanCo_2012, MO_UpperGrand_2011, MO_Washinton-IronCo_2011, MO_WestCentral_1_2018, MO_WestCentral_2_2018, MO_WestCentral_3_2018, MO_WestCentral_4_2018.

prd-tnm LPC projects `MO_`: MO_7County_D23, MO_AR_2014_Lidar (26 county work units, none near the dam), MO_FEMANRCS_2020_D20, MO_FEMA_R7_North_2017_D18, MO_FEMA_R7_South_2017_D18, MO_Northern_SEMO_2021_D21, MO_SE11County_B24, MO_Saint_Louis_Lidar_2017_B17, MO_SouthernMO_D22, MO_Southwest_2021_D21, MO_WestCentral_2018_D19. (`MO_SouthernMO_D22` = Christian, Wright, Wayne, Stoddard counties per its description **[S]** — adjacent to Taney on the north; `MO_7Co_1_D23` bounds start at lat 36.80 N, i.e. north of the dam **[DEM]**.)

Arkansas (for the Arkansas arm of Table Rock Lake, Carroll/Boone counties) — EPT: AR_BuffaloRiver_2009/2010, AR_Dardanelle_2011, AR_Eastern_1..10_D23, AR_FEMA-ChicotDesha_2011, AR_FEMA-VI-BayouMeto_2012, AR_LowerStFrancisRiver-FEMA_2012, AR_McKinneyPosten_2011, AR_NRCS_A2_2016, AR_NorthEast_1_D22, AR_PAgis_2010, AR_UpperBlackWatershed-FEMA_2012, AR_UpperWhiteVillage-FEMA_2012; prd-tnm LPC: AR_Benton_2015, AR_Eastern_D23, AR_NRCS_AR_LiDAR_2016_B16, AR_NorthEast_D22, AR_North_Corridor_FEMA_R6_Lidar_2016_D17, AR_Ouachita_FEMA_R6_Lidar_2016_D17, AR_Upper_Saline_Watershed_Lidar_14, AR_Western_B24; 1-m DEM projects include AR_North_Corridor_B1/B2/B3_2017 and AR_NRCS_A1..A5_2016 **[S3]**. Which of these covers the Arkansas shoreline of Table Rock Lake was **not** determined (likely AR_North_Corridor_FEMA_R6_Lidar_2016 — unverified).

### 1.7 Entwine / OpenTopography / other portals

* USGS EPT root: `https://s3-us-west-2.amazonaws.com/usgs-lidar-public/<dataset>/ept.json` (EPSG 3857, laszip, JSON hierarchy) — `MO_FEMANRCS_1_2020` holds 55.6 billion points, `MO_Southwest_1_2021` 50.0 billion **[S3]**. Map/index: https://usgs.entwine.io/ (found via https://www.usgs.gov/news/technical-announcement/usgs-3dep-lidar-point-cloud-now-available-amazon-public-dataset **[S]**; project site https://entwine.io/ **[S]**).
* OpenTopography 3DEP dataset pages: https://portal.opentopography.org/usgsDataset?dsid=MO_Southwest_2_2021 **[S]** (block 2; block 1 page presumably `?dsid=MO_Southwest_1_2021`, unverified) and https://portal.opentopography.org/usgsDataset?dsid=USGS_LPC_MO_StLouis_2017_LAS_2018 **[S]**; catalog https://portal.opentopography.org/dataCatalog **[S]**. OpenTopography also hosts an NCALM Ozarks (Arkansas) raster, https://portal.opentopography.org/raster?opentopoID=OTSDEM.072024.6344.2 **[S]** — not at the dam.
* USGS lidar FAQ / viewers: https://www.usgs.gov/faqs/what-lidar-data-and-where-can-i-download-it **[S]** (LidarExplorer, TNM Download Client, DEM Availability Viewer).

### 1.8 NOAA NGS topobathymetric lidar, Ozarks 2023–2024 — checked, does NOT reach the dam

* Dataset: *2023–2024 NOAA NGS Topobathy Lidar: Ozarks area (Missouri, Arkansas and Oklahoma Rivers)*, NV5 Geospatial under NOAA contract, flown Aug 2023 → Jul 2024, Leica Chiroptera 4X, ~745 sq mi in 29 river stretches; LAS 1.4 PDRF 6 with bathymetric classes (40 submerged topography, 41 water surface, 43 submerged feature, 45 water column, 64 SAV); NVA 0.031 m RMSE (56 pts), submerged topography 0.069 m RMSE (3,409 pts); 1-m COG DEMs on Geoid18 **[S3][S]**.
* InPort: https://www.fisheries.noaa.gov/inport/item/79263 (DEM) **[S]**, https://www.fisheries.noaa.gov/inport/item/79262 (class scheme) **[S]**, https://www.fisheries.noaa.gov/inport/item/79259 (LAZ) **[S3]**. Digital Coast IDs: LAZ **13981**, DEM **13982** (`dem/NGS_Ozarks_Topobathy_2023_13982/`) **[S3]**. Bucket index: https://noaa-nos-coastal-lidar-pds.s3.amazonaws.com/laz/geoid18/13981/index.html ; final report: https://noaa-nos-coastal-lidar-pds.s3.amazonaws.com/laz/geoid18/13981/supplemental/MO2301_NOAA_Ozarks_Topobathy_Final_Report.pdf ; tile index `tileindex_NGS_topobathyRiverineOzarksArea_m13981.gpkg`; extent `supplemental/extent_OzarksTopobathy_m13981.kmz` **[S3]**.
* Coverage test: all 10,785 tiles were bounded by block; **zero tiles fall within E 460–490 km / N 4045–4065 km** (dam → Powersite). The nearest footprint polygon is 26 km away (lon -93.665 to -93.570, lat 36.386–36.496, block01_A, flown 2023-08-19/21 — the White River / Kings River reach near the Arkansas line) **[DEM]**. Lake Taneycomo and the White River at the dam are therefore **not** covered by topobathy lidar.

### 1.9 Contours

The National Map stages contour GDBs per 1°×1° cell (`StagedProducts/Contours/GDB/ELEV_<name>_1X1_GDB.zip`, e.g. Aberdeen SD examples were listed) **[S3]**; the Missouri cell name for 36–37 N / 93–94 W was not resolved (unverified). For modeling, derive contours directly from the 1-m DEM instead.

---

## 2. Bathymetry

### 2.1 Table Rock Lake — USGS 2020 multibeam survey (primary) **[S]**

| Item | Detail |
|---|---|
| Publication | Huizinga, R.J., Rivers, B.C., Richards, J.M., 2022, *Bathymetric map and surface area and capacity table for Table Rock Lake near Branson, Missouri, 2020*: USGS Scientific Investigations Map **3499** — https://pubs.usgs.gov/publication/sim3499/full ; sheets https://pubs.usgs.gov/sim/3499/sim3499_sheet01.pdf , https://pubs.usgs.gov/sim/3499/sim3499_sheet03.pdf ; landing https://www.usgs.gov/maps/bathymetric-map-and-surface-area-and-capacity-table-table-rock-lake-near-branson-missouri-2020 |
| Data release | *Bathymetric and Supporting Data for Table Rock Lake near Branson, Missouri, 2020* — DOI https://doi.org/10.5066/P9FAFJZG ; ScienceBase https://www.sciencebase.gov/catalog/item/62b4d245d34e8f4977cbd09f ; https://www.usgs.gov/data/bathymetric-and-supporting-data-table-rock-lake-near-branson-missouri-2020 |
| Method | Multibeam echosounder (MBES) with inertial navigation system on marine mobile mapping units, Oct–Nov 2020; merged with USGS 1/3-arc-second DEM and lidar "where present" to make the bathymetric map and area/capacity table; cooperator USACE Little Rock District |
| Key numbers | Surface area ≈ 42,400 acres and ≈ 715 miles of shoreline at conservation pool **915 ft NAVD88**; lake max depth ~220 ft (Wikipedia, https://en.wikipedia.org/wiki/Table_Rock_Lake **[S]**) |
| Related USGS series | Missouri bathymetric-change work: https://pubs.usgs.gov/publication/sir20235046 and https://pubs.usgs.gov/sir/2023/5046/sir20235046.pdf **[S]**; Norfork Lake 2015 (same USGS unit): https://www.usgs.gov/data/bathymetry-and-storage-capacity-norfork-lake-arkansas-missouri-2015 **[S]** |

Modeling note: the MBES survey is the only public high-resolution bed surface near the upstream face of the dam (intake/spillway approach). Whether the data release includes the raw point cloud or only a gridded DEM must be checked on ScienceBase (blocked here).

### 2.2 Lake Taneycomo (tailwater)

No USGS bathymetric survey of Lake Taneycomo surfaced **[S]**. Check the *USGS Inland Bathymetric and Topobathymetric Survey Inventory, version 4* — https://www.sciencebase.gov/catalog/item/5fce600bd34e30b912396ad0 **[S]** — and https://www.usgs.gov/3d-elevation-program/inland-bathymetry **[S]**. NOAA topobathy lidar does not cover it (§1.8). The 2020 lidar DEM shows the water plane at 706.7 ft NAVD88 immediately below the powerhouse **[DEM]**; the bed under it is unknown from public data (see §9 workarounds).

### 2.3 USACE hydrographic surveys

USACE eHydro (national hydrographic survey portal) and any Little Rock District sedimentation/re-survey reports were **not** searchable this session **[U]**. The SIM 3499 cooperation implies USACE holds the 2020 MBES data as well.

### 2.4 Commercial / crowd-sourced fishing charts (1-ft contours) **[S]** general only

| Product | Notes | URL |
|---|---|---|
| Navionics (Garmin) SonarChart | "up to 1-foot contours" from community sonar logs | https://deepvrigs.com/products/navionics-lake-maps **[S]** |
| C-MAP Genesis (Lowrance/Simrad) | user-generated 1-ft contour + bottom-hardness maps | https://www.genesismaps.com/ **[S]** ; https://www.lowrance.com/lowrance/type/mapping/ **[S]** |
| Humminbird LakeMaster | water-level offset feature; exclusive to Humminbird | comparison https://www.wired2fish.com/electronic-tips/comparing-lakemaster-navionics-and-c-map **[S]** |
| Table Rock-specific coverage | not confirmed this session **[U]** (Table Rock is a major bass fishery, so all three almost certainly have coverage, but licensing forbids re-use in a model beyond personal viewing) | — |

### 2.5 Pre-impoundment / construction-era topography (best free proxy for the lake bed) **[S3]**

USGS Historical Topographic Map Collection GeoTIFFs (all at `https://prd-tnm.s3.amazonaws.com/StagedProducts/Maps/HistoricalTopo/GeoTIFF/MO/` + file name; encode spaces as `%20`):

| Quad | Scale | Edition year | File(s) | Size | Why it matters |
|---|---|---|---|---|---|
| **Table Rock Dam** | 1:24,000 | **1956** (dam under construction; lake not yet filled — mapping predates closure in 1958) | `MO_Table Rock Dam_324283_1956_24000_geo.tif`, `_324284_1956_`, `_324285_1956_`, `_324286_1956_`, `_472375_1956_` | 10.3–14.7 MB | Original White River channel, "Table Rock" bluff, valley contours right at the dam site |
| Table Rock Dam | 1:24,000 | 1989 | `MO_Table Rock Dam_324287_1989_24000_geo.tif` | 14.6 MB | Post-lake, pre-auxiliary-spillway |
| Table Rock Lake | 1:100,000 | 1985 | `MO_Table Rock Lake_325408_1985_100000_geo.tif` | 22 MB | whole-lake context |
| Branson | 1:24,000 | 1956 (×3), 1989 | `MO_Branson_322057/322058/322059_1956_24000_geo.tif`, `_322060_1989_` | — | Taneycomo below the dam |
| Garber | 1:24,000 | **1950**, 1956 (×3), 1989 | `MO_Garber_322747_1950_24000_geo.tif`, `_322744/322745/322746_1956_`, `_322748_1989_` | — | 1950 sheet is fully pre-construction |
| Hollister | 1:24,000 | 1956 (×3), 1989 | `MO_Hollister_322961/322962/322963_1956_`, `_322964_1989_` | — | |
| Lampe | 1:24,000 | 1956 (×3), 1989, 1999 | `MO_Lampe_323225/323226/323227_1956_`, `_323228_1989_`, `_323229_1999_`, `_472245_1989_` | — | lake arms SW of dam |
| Reeds Spring | 1:24,000 | 1956 (×2), 1989, 1999 | `MO_Reeds Spring_323972_1956_`, `_472328_1956_`, `_323973_1989_`, `_514839_1999_` | — | |
| Galena | 1:24,000 | 1956 (×2) | `MO_Galena_322732/322733_1956_24000_geo.tif` | — | James River arm |
| Forsyth | 1:24,000 / **1:125,000** | 1956 (×3), 1989 / **1907** (×3) | `MO_Forsyth_322697/322698/322699_1956_`, `_322700_1989_`; `MO_Forsyth_325447_1907_125000_geo.tif`, `_472164_1907_`, `_513728_1907_` | — | 1907 30-minute sheet is the oldest map of the site (coarse contours) |

Access alternatives: USGS topoView (GeoTIFF/GeoPDF/KMZ) via https://www.usgs.gov/programs/national-geospatial-program/historical-topographic-maps-preserving-past **[S]**; HTMC on data.gov https://catalog.data.gov/dataset/usgs-historical-topographic-map-collection **[S]**; access points https://www.usgs.gov/the-national-map-data-delivery/topographic-map-access-points **[S]**; MU Libraries topo guide https://libraryguides.missouri.edu/c.php?g=28017&p=172789 **[S]**.

Workflow: georeference is embedded; digitize the 1956 contours (and the river thalweg) inside the present shoreline, then splice with the USGS 2020 MBES surface — the 1956 sheet was compiled during construction, so the excavated foundation/cofferdam area near the dam will differ from the natural valley.

### 2.6 Water-surface elevations captured in the lidar DEMs **[DEM]**

| Surface | Value | Source DEM |
|---|---|---|
| Table Rock Lake pool (hydro-flattened) | 279.53 m = **917.1 ft NAVD88** | MO_FEMANRCS_2020_D20 (spring/fall 2020) |
| Table Rock Lake pool | 278.26 m = **912.9 ft NAVD88** | MO_Southwest_2021_D21 (Dec 2021–Jan 2022) |
| Lake Taneycomo at the powerhouse tailrace | 215.40 m = **706.7 ft NAVD88** (mode of 209,089 cells; 707.2–707.7 ft at sampled points) | MO_FEMANRCS_2020_D20 |

---

## 3. Aerial imagery

### 3.1 NAIP (USDA) — **[U]** unless noted

Missouri is flown on the NAIP cycle; typical epochs 2010, 2012, 2014, 2016 (1 m), 2018/2020/2022 (60 cm) and 2024 (60 cm or better) **[U — confirm on USDA/USGS]**. Access routes: USGS EarthExplorer "NAIP" collection; USDA GeoHub / APFO NAIP image services (the proxy log shows `gis.apfo.usda.gov` and `naip.imagery1.arcgis.com` blocked from this sandbox); AWS Registry of Open Data `naip-analytic` / `naip-visualization` (requester-pays) and Microsoft Planetary Computer `naip` STAC (also blocked here) **[U]**. MGRS/UTM tile for the dam: **15SVA** (derived from the coordinate; the NAIP quarter-quad naming uses the "Table Rock Dam" 7.5' quad) **[DEM/U]**.

### 3.2 Missouri state imagery **[S]**

* Fly Missouri Imagery program pages: https://www.flymoimagery.com/lidar/ and https://www.flymoimagery.com/lidar/federal-3dep-program/ (state imagery/lidar acquisition program) **[S]**.
* MSDIS image services host: `https://moimagery.missouri.edu/arcgis/rest/services/` (the LiDAR folder was confirmed **[S]**; orthoimagery folders on the same host are expected but unverified). MSDIS home https://msdis.missouri.edu/ ; partners https://www.msdis.missouri.edu/community/partners.html ; FIPS list https://www.msdis.missouri.edu/community/fips.html (Taney = 213, Stone = 209 **[U]**) **[S]**.
* DNR page (§1.5) mentions imagery collected spring 2024 alongside the QL1 lidar, public in 2027 **[S]**.

### 3.3 Historical aerial photography — leads **[U]** except where tagged

| Source | What to look for | URL |
|---|---|---|
| USGS EarthExplorer — Aerial Photo Single Frames | 1950s–1960s USGS/USDA frames over "Table Rock Dam" quad (construction era) | https://earthexplorer.usgs.gov/ (unverified) |
| EarthExplorer — NHAP (1980–89) and NAPP (1987–2007) | 1:58,000 / 1:40,000 CIR & B/W national programs; several epochs over Branson | same |
| EarthExplorer — DOQ/DOQQ | 1990s 1-m orthophoto quarter-quads ("Table Rock Dam" NE/NW/SE/SW) | same |
| EarthExplorer — Declass 1/2/3 (Corona KH-4/4A/4B, 1960–72; KH-7/9) | A Corona pass over SW Missouri in the early 1960s would show the newly filled lake; search by the dam coordinate | same |
| USDA APFO historical (county soil-survey photography, 1930s–1970s) | Taney & Stone County ASCS photography | https://www.fpacbc.usda.gov/ (unverified) |
| State Historical Society of Missouri — Southwest Missouri Map Collection (SP0047) | finding aid found | http://files.shsmo.org/manuscripts/springfield/SP0047.pdf **[S]** |
| University of Missouri Libraries (Ellis) — Missouri aerial photo indexes | statewide 1930s–1970s indexes | via https://libraryguides.missouri.edu/ (guide page above **[S]**) |
| HistoricAerials.com | typically 1950s/60s/70s/90s coverage for Branson | https://www.historicaerials.com/ (unverified) |
| USGS HTMC & US Topo | see §2.5 and §0 | **[S3]** |

---

## 4. Satellite and street-level / oblique imagery

| Source | Coverage notes | Status |
|---|---|---|
| Sentinel-2 (10 m) | MGRS tile **15SVA** (dam at E 472 km, N 4050 km) — derived from the coordinate | **[DEM]** derivation; imagery access via Copernicus/AWS/Planetary Computer (blocked here) |
| Landsat (30 m; MSS 15 m-class from 1972) | WRS-2 path 25 / row 35 (path 26 row 35 overlaps) | **[U]** — confirm; `landsatlook.usgs.gov` is blocked from the sandbox |
| Planet / Maxar (Vivid) | commercial; Maxar Vivid basemap ~50 cm | **[U]** |
| Google Earth Pro historical imagery slider | Branson area typically has many epochs (1990s DOQ, 2000s–2020s) | **[U]** — not searchable this session |
| Google Earth 3-D photogrammetric mesh | Branson is a tourist city; 3-D mesh status for Table Rock Dam unknown | **[U]** — run query "Google Earth 3D Branson" when budget allows |
| Bing Bird's Eye / Apple Look Around / Apple Flyover | unknown | **[U]** |
| Google Street View along MO-165 across the dam | almost certainly present (state highway), multiple years | **[U]** |
| Mapillary / KartaView on MO-165 | unknown | **[U]** |

---

## 5. Vector / GIS layers

### 5.1 Verified staged products (USGS The National Map) **[S3]**

| Dataset | URL |
|---|---|
| NHD High Resolution — Missouri (GPKG) | https://prd-tnm.s3.amazonaws.com/StagedProducts/Hydrography/NHD/State/GPKG/NHD_H_Missouri_State_GPKG.zip (+ .xml, .jpg) |
| NHDPlus HR Beta — HU4 **1101** (Upper White) GDB + rasters | https://prd-tnm.s3.amazonaws.com/StagedProducts/Hydrography/NHDPlusHR/Beta/GDB/NHDPLUS_H_1101_HU4_GDB.zip ; `.../NHDPLUS_H_1101_HU4_RASTER.7z` |
| Watershed Boundary Dataset — Region 11 | https://prd-tnm.s3.amazonaws.com/StagedProducts/Hydrography/WBD/HU2/GPKG/WBD_11_HU2_GPKG.zip |
| Transportation — Missouri | https://prd-tnm.s3.amazonaws.com/StagedProducts/Tran/GPKG/TRAN_Missouri_State_GPKG.zip |
| Government units (county/state boundaries) — Missouri | https://prd-tnm.s3.amazonaws.com/StagedProducts/GovtUnit/GPKG/GOVTUNIT_Missouri_State_GPKG.zip |
| Structures (National Structures Dataset) — Missouri | https://prd-tnm.s3.amazonaws.com/StagedProducts/Struct/GPKG/STRUCT_Missouri_State_GPKG.zip |
| Topo Map Vector (per state, incl. MO) | `https://prd-tnm.s3.amazonaws.com/StagedProducts/TopoMapVector/MO/...` (folder exists; file names not listed) |
| US Topo GeoPDF, "Table Rock Dam" quad | `.../Maps/USTopo/PDF/MO/MO_Table_Rock_Dam_20120105_TM_geo.pdf`, `_20150129_`, `_20171018_`, `_20210515_` |
| GNIS / Geographic Names | `StagedProducts/GeographicNames/DomesticNames/` (folder exists) |

### 5.2 Other layers — leads **[U]** unless tagged

| Layer | Where | Notes |
|---|---|---|
| OpenStreetMap | `waterway=dam` way for Table Rock Dam, `highway=primary` MO-165, powerhouse/hatchery buildings | Way/relation IDs not retrievable this session (Overpass blocked); use overpass-turbo with bbox 36.590–36.610, -93.320 to -93.300 |
| National Inventory of Dams (NID) | USACE NID record for Table Rock Dam (owner USACE SWL) | https://nid.sec.usace.army.mil/ (unverified); NID ID not confirmed |
| USACE geospatial open-data portal | Corps lake polygons, project boundaries, recreation areas, master-plan land classification | https://geospatial-usace.opendata.arcgis.com/ (unverified) |
| Table Rock Lake Master Plan GIS | land-classification layers accompany the 2017-era master plan revision | Little Rock District site (unverified) |
| MSDIS open data (parcels, roads, public lands, boundaries) | https://data-msdis.opendata.arcgis.com/ **[S]** ; county LiDAR index **[S]** | |
| MoDOT | state-system maps https://www.modot.org/state-system-maps **[S]** ; road centerlines / bridge inventory (unverified) | NBI record(s): MO-165 bridge over the **auxiliary spillway** channel (built with the 2005 spillway) and any structure on the dam — search NBI by route 165, Taney County |
| FEMA NFHL | Taney County (29213C panels) flood zones for Taneycomo | https://msc.fema.gov/ (unverified) |
| Missouri DNR Dam Safety inventory | state inventory (federal dams listed for reference) | unverified |
| USGS gauges | 07053600 *Lake Taneycomo at School of the Ozarks, MO* — https://waterdata.usgs.gov/monitoring-location/USGS-07053600/ **[S]**; others in §8 | |
| Microsoft Building Footprints (US) / Overture Maps buildings | powerhouse, hatchery buildings, visitor center | GitHub / Overture releases (unverified) |
| TIGER/Line 2024 | roads, county lines (Taney 213 / Stone 209) | census.gov (unverified) |

---

## 6. Existing 3-D assets — not searchable this session **[U]**

Queries planned but not executed (budget exhausted): Sketchfab "Table Rock Dam" / "Branson"; SketchUp 3D Warehouse "Table Rock Dam"; TurboSquid / CGTrader; Cesium ion / OSM Buildings coverage of Branson; Microsoft Flight Simulator add-ons (Orbx, freeware "Branson" or "Table Rock Dam" scenery; MSFS default photogrammetry cities list); Minecraft recreations; DroneDeploy / Pix4D / OpenAerialMap public drone maps of the dam (note: the dam is a USACE facility and much of the airspace/grounds restrict drone flight); university photogrammetry (Missouri State, College of the Ozarks, Missouri S&T) of the dam. Expect little; the high-value substitutes are the 2020 lidar (§1) plus the USGS "Maximum Surface Height" rasters (§1.3) for structure heights.

---

## 7. Coordinates & datums

### 7.1 Reference coordinates of the supplied point (36.5967 N, -93.3106 W) **[DEM]** (pyproj 3.7.2)

| CRS | EPSG | Easting / X | Northing / Y |
|---|---|---|---|
| NAD83 / UTM 15N | 26915 | 472,218.72 m | 4,050,179.40 m |
| NAD83(2011) / UTM 15N (lidar native) | 6344 | 472,218.72 m | 4,050,179.40 m |
| NAD83 / Missouri Central (SPCS83 zone 2402), metres | 26997 | 427,471.99 m | 85,005.69 m |
| … same in US survey feet | — | 1,402,464.3 ftUS | 278,889.5 ftUS |
| NAD83 / Missouri West | 26998 | 956,422.97 m | 48,374.91 m |
| WGS84 / Web Mercator | 3857 | -10,387,288.48 | 4,383,040.07 |
| USNG / MGRS | — | 15S VA 72219 50179 | |

Missouri Central zone parameters (from the EPSG registry via pyproj): Transverse Mercator, latitude of origin 35°50′ N, central meridian 92°30′ W, scale 0.999933333, false easting 500,000 m, false northing 0 **[DEM]**. Taney/Stone counties are in the Central zone **[U — confirm; EPSG 26997 is the conventional choice]**.

### 7.2 Dam geometry measured from the 2020 1-m DEM **[DEM]** (approximate; bare-earth DEM removes the concrete structure's top and bridge decks)

The supplied coordinate falls on the downstream face of the concrete section (DEM 260.8 m = 855.6 ft), not on the crest. The dam runs **NNW–SSE** with Table Rock Lake to the **west** and Lake Taneycomo to the **east**:

| Element | UTM 15N (E, N) | Lon / Lat (NAD83) | Elevation (NAVD88) | Notes |
|---|---|---|---|---|
| North (left) embankment crest — south end | 472,234 / 4,050,328 | -93.31043 / 36.59804 | crest 947.6 ft (288.84 m median along 817 m) | crest carries MO-165 |
| North embankment crest — north end | 472,054 / 4,051,146 | -93.31248 / 36.60541 | 945.0 ft | ties into ridge; embankment length ≈ 838 m, azimuth **347.6°** |
| Concrete gravity section (spillway + powerhouse) | E ≈ 472,190–472,240, N ≈ 4,049,890 → 4,050,325 | centre ≈ -93.3106 / 36.5960 | DEM shows pool 917.1 ft dropping to 706.7 ft within ~50 m | length ≈ 435 m (≈1,430 ft) between embankment crests |
| Spillway reach (dry apron/stilling basin east of face) | N ≈ 4,050,170 → 4,050,325 | ≈ -93.3106 / 36.5973 | apron floor 725–734 ft | north part of concrete section |
| Powerhouse / tailrace reach (707-ft water directly at the face) | N ≈ 4,049,930 → 4,050,150; face at E ≈ 472,170–472,210 | ≈ -93.3103 / 36.5956 | tailwater 706.7–707.7 ft | south part of concrete section; 4-unit powerhouse |
| South (right) embankment crest | 472,058 / 4,049,884 → 472,090 / 4,049,742 | -93.31239 / 36.59403 → -93.31202 / 36.59275 | 945–949 ft | short (~150 m), then natural bluff (950–1,000 ft) |
| Auxiliary spillway (2005) channel | approach at pool level to E ≈ 472,240; control section ≈ E 472,320–472,500, N ≈ 4,051,180–4,051,290; chute descends east to ≈ 836 ft at E 472,900 | control ≈ -93.3090 / 36.6062 | control-section floor 927–940 ft; approach cut 882–895 ft | just north of the embankment's north end; MO-165 bridge deck removed in DEM |
| Shepherd of the Hills Hatchery grounds (low flat, north bank) | ≈ 472,850 / 4,050,450 | -93.30355 / 36.59916 | ≈ 737 ft ground | position inferred from terrain, confirm with imagery |
| Lake pool near dam (2020) | — | — | 917.1 ft | hydro-flattened |
| Lake pool (Dec 2021–Jan 2022) | — | — | 912.9 ft | Southwest 2021 DEM |

Crest centre-line samples (north embankment, every 100 m, lon/lat): (-93.31046, 36.59824) → (-93.31025, 36.59914) → (-93.31011, 36.60004) → (-93.31037, 36.60094) → (-93.31087, 36.60184) → (-93.31131, 36.60274) → (-93.31183, 36.60364) → (-93.31212, 36.60454) → (-93.31258, 36.60544) **[DEM]**. Full 50-m polyline and the ASCII terrain map are saved in the scratchpad (`dam_geometry_derived.json`, `dam_ascii_map.txt`).

### 7.3 Vertical datums

* All 3DEP lidar/DEMs here: **NAVD88, Geoid18**, metres **[S3]**. USGS SIM 3499 quotes conservation pool as **915 ft NAVD88** **[S]**.
* USACE water-control pages and historical design elevations for Table Rock (e.g. top of conservation pool 915.0 ft, top of flood pool 931.0 ft, top of dam ≈ 947 ft) are traditionally **NGVD29** **[U]**. The DEM crest of 947.6 ft NAVD88 is consistent with a ~947-ft design crest plus a small datum shift and pavement build-up.
* NAVD88 − NGVD29 at Branson: small positive (NAVD88 higher), of order 0.1–0.4 ft **[U]** — compute with NGS VERTCON 3.0 / NCAT (https://geodesy.noaa.gov/NCAT/ , blocked here) before mixing USACE pool data with lidar.
* NOAA topobathy (not at the dam) is NAD83(2011) epoch 2010.00, Geoid18 **[S3]**.
* NGS benchmarks: datasheet search for "TABLE ROCK DAM" (PIDs) not possible this session **[U]**; USACE surely maintains project monuments on the dam.

---

## 8. Real-time & historical hydrologic data services

| Service | Identifier / URL | Status |
|---|---|---|
| USGS NWIS — Lake Taneycomo at School of the Ozarks, MO | **07053600** — https://waterdata.usgs.gov/monitoring-location/USGS-07053600/ | **[S]** |
| USGS NWIS — Table Rock Lake (reservoir stage) | 07053500 "Table Rock Lake near Branson, MO" | **[U]** |
| USGS NWIS — James River at Galena (main inflow) | 07052500 | **[U]** |
| USACE Little Rock District water control | https://www.swl-wc.usace.army.mil/pages/data/tabrock.htm (hourly/daily pool, tailwater, release, generation) | **[U]** — widely cited pattern, not fetched |
| USACE CWMS Data API | https://cwms-data.usace.army.mil/cwms-data/ (office `SWL`; location names for Table Rock to be discovered via `/locations?office=SWL`) | **[U]** |
| NWS AHPS / NWPS gauge | Branson / Table Rock IDs (e.g. "TBRM7"-style) | **[U]** — confirm on https://water.noaa.gov |
| Southwestern Power Administration generation schedules (Table Rock) | https://www.swpa.gov/ generation-schedule pages | **[U]** |
| lakelevels.info / lakesonline (Table Rock level history) | third-party charts | **[U]** |

---

## 9. Gaps & workarounds

1. **No lidar over the structure tops.** Bare-earth DEMs delete the concrete crest, gate piers, powerhouse and the MO-165 bridge; the classified LAS (classes 1/6/17) in tiles 15SVA47100500 / 47100485 / 47250500 retains those returns — build the structure model from first-return/all-class points, and use the USGS *Maximum Surface Height* rasters (§1.3) as a DSM.
2. **Reservoir bed at the dam face.** Use USGS SIM 3499 MBES (2020) for the bed; if only a grid is released, splice it with the lidar below 917 ft using the 2020 breaklines. Cross-check against the 1956 "Table Rock Dam" quad for the pre-excavation valley.
3. **Lake Taneycomo bed below the dam.** No public bathymetry and no topobathy lidar. Options: (a) request USACE/MDC survey data; (b) commercial 1-ft contour charts for visual reference only (licensed); (c) derive the channel from the 1956 Branson/Table Rock Dam quads (the Taneycomo pool of 1913 already existed, so the 1956 sheet shows the lake outline but not its bed); (d) approximate with a trapezoidal channel between the 706.7-ft plane and the tailrace apron elevations (725–734 ft) found in the DEM.
4. **Seam between the two lidar projects** at lon ≈ -93.31: pool level differs (917.1 vs 912.9 ft) and the Southwest 2021 set stops 90 m west of the supplied point — use MO_FEMANRCS_2020_D20 everywhere east of E 471,000 and blend within the overlap only where needed.
5. **Auxiliary spillway.** DEM captures the channel and approach but the bridge deck and fuse-plug/weir tops are ambiguous (control floor 927–940 ft); confirm from the 2005 design drawings (other agents' dimension) and imagery.
6. **NAIP/imagery epochs, Google Earth 3-D, Street View and all §6 3-D assets** are unverified — re-run the queries in §10 when a search budget is available.
7. **Datum mixing.** Convert USACE NGVD29 pool elevations to NAVD88 (VERTCON) before comparing with lidar-derived planes.
8. **Access from this sandbox.** USGS/NOAA S3 buckets work; `rockyweb.usgs.gov`, ScienceBase, OpenTopography, Planetary Computer, APFO and NWIS are blocked — download those items from a normal network.

---

## 10. Search log

WebSearch queries executed this session (15; shared budget then exhausted):

1. `USGS 3DEP lidar project Taney County Missouri "MO_" 2018 OR 2019 OR 2020 QL2`
2. `"MO_SouthWest" OR "MO_Ozarks" OR "MO_MoOzarks" lidar 3DEP project`
3. `site:msdis.missouri.edu lidar Taney County`
4. `usgs.entwine.io Missouri lidar EPT "MO_" Ozarks`
5. `Missouri LiDAR 2011 Taney County Stone County lidar acquisition`
6. `Missouri DNR lidar statewide coverage status map 3DEP Missouri counties complete`
7. `OpenTopography Missouri lidar dataset Ozarks Table Rock Lake`
8. `"MO_Southwest_2021" OR "MO_Southwest_2_2021" lidar counties Taney Stone Barry`
9. `NOAA NGS topobathy lidar "Ozarks" 2023 2024 Missouri Arkansas rivers White River Lake Taneycomo`
10. `"MO County LiDAR Index" MSDIS Taney "Stone" project year lidar`
11. `USGS bathymetric survey "Table Rock Lake" multibeam Scientific Investigations Report`
12. `USGS "Lake Taneycomo" bathymetry OR bathymetric survey`
13. `Table Rock Lake Navionics SonarChart OR "LakeMaster" OR "C-MAP Genesis" 1-foot contours Missouri`
14. `pre-impoundment topographic map "Table Rock" quadrangle 1930s OR 1940s USGS historical topo White River Missouri`
15. `"Table Rock Lake" sedimentation survey OR bathymetric map USACE Little Rock District storage capacity`

Submitted but refused (budget exhausted — re-run first when budget returns): `"MO_Southwest_2021_D21" lidar metadata counties`; `NOAA Ozarks topobathy lidar NV5 area of interest "Table Rock" OR "Taneycomo" ...`; `"Taney County" Missouri lidar 2010 OR 2012 OR 2016 OR 2017 "MO_" USGS LPC project Branson`; `NAIP Missouri imagery years 2010 2012 2014 2016 2018 2020 2022 2024 resolution 60 cm 30 cm`; `MSDIS Missouri statewide orthoimagery 2020 OR 2022 OR 2024 6-inch OR 1-foot "Fly Missouri" imagery program Taney County`; `USGS EarthExplorer "Aerial Photo Single Frames" OR NHAP OR NAPP Branson Missouri Table Rock Dam historical aerial photograph 1950s 1960s`; `Corona KH-4 declassified satellite imagery 1960s Missouri Ozarks Table Rock Dam EarthExplorer "Declass 1"`; `University of Missouri Libraries Missouri historical aerial photographs Taney County 1930s 1950s digital collection`; `historicaerials.com Branson Missouri 1950s 1960s aerial Table Rock Dam`; `Google Earth 3D imagery photogrammetry mesh coverage Branson Missouri "3D" Table Rock`; `Apple Maps "Look Around" OR Flyover Branson Missouri coverage`; `Google Street View "Table Rock Dam" Highway 165 Branson Missouri street view across dam`; `Mapillary OR KartaView "Table Rock Dam" OR "Branson" Highway 165 street-level imagery`.

Planned, never submitted: OpenStreetMap "Table Rock Dam" way id; National Inventory of Dams "Table Rock" NID ID; geospatial-usace.opendata.arcgis.com Table Rock Lake layers; Table Rock Lake Master Plan land classification GIS; MoDOT NBI bridge 165 auxiliary spillway; FEMA NFHL Taney County; Missouri DNR dam inventory; Sketchfab / 3D Warehouse / TurboSquid "Table Rock Dam"; MSFS "Branson" scenery; DroneDeploy/Pix4D Table Rock Dam; NGS datasheet "TABLE ROCK DAM"; NGVD29 NAVD88 offset Branson; USGS 07053500 Table Rock Lake gauge datum; swl-wc.usace.army.mil tabrock; CWMS Data API Table Rock; NWS AHPS Table Rock gauge id; SWPA Table Rock generation schedule; lakelevels.info Table Rock; Sentinel-2 tile Branson; Landsat path row Branson; USACE eHydro Table Rock; Missouri Department of Conservation Table Rock Lake depth map; Fishing Hot Spots Table Rock map.

### Verification commands used (reproducible)

```
# 3DEP inventory
curl "https://s3-us-west-2.amazonaws.com/usgs-lidar-public/?list-type=2&delimiter=/&prefix=MO_"
curl "https://prd-tnm.s3.amazonaws.com/?list-type=2&delimiter=/&prefix=StagedProducts/Elevation/LPC/Projects/MO_"
# EPT metadata
curl https://s3-us-west-2.amazonaws.com/usgs-lidar-public/MO_FEMANRCS_1_2020/ept.json
# tile lists, extents, vendor metadata
curl https://prd-tnm.s3.amazonaws.com/StagedProducts/Elevation/LPC/Projects/MO_FEMANRCS_2020_D20/MO_FEMANRCS_1_2020/0_file_download_links.txt
curl https://prd-tnm.s3.amazonaws.com/StagedProducts/Elevation/metadata/MO_FEMANRCS_2020_D20/MO_FEMANRCS_1_2020/spatial_metadata/USGS/USGS_MO_FEMANRCS_1_2020_FINAL_Silhouette.shp
# historical quads
curl "https://prd-tnm.s3.amazonaws.com/?list-type=2&prefix=StagedProducts/Maps/HistoricalTopo/GeoTIFF/MO/MO_Table"
# NOAA topobathy
curl https://noaa-nos-coastal-lidar-pds.s3.amazonaws.com/laz/geoid18/13981/minmax_NGS_topobathyRiverineOzarksArea_m13981.csv
# DEM sampling (rasterio, windowed): /vsicurl/https://prd-tnm.s3.amazonaws.com/StagedProducts/Elevation/1m/Projects/MO_FEMANRCS_2020_D20/TIFF/USGS_1M_15_x47y406_MO_FEMANRCS_2020_D20.tif
```

---

## Appendix A. North-embankment crest polyline from the 2020 1-m DEM **[DEM]**

Per-row maximum within E 471,950–472,450 m; NAD83 UTM 15N, NAVD88 (Geoid18). Use as the road/crest centreline seed for the 3-D model (refine against the classified LAS).

| Northing (m) | Easting (m) | Crest z (m) | Crest z (ft) | Longitude | Latitude |
|---|---|---|---|---|---|
| 4050350 | 472232 | 288.68 | 947.1 | -93.31046 | 36.59824 |
| 4050400 | 472244 | 288.68 | 947.1 | -93.31033 | 36.59869 |
| 4050450 | 472250 | 288.72 | 947.2 | -93.31025 | 36.59914 |
| 4050500 | 472260 | 288.79 | 947.5 | -93.31014 | 36.59959 |
| 4050550 | 472264 | 288.87 | 947.7 | -93.31011 | 36.60004 |
| 4050600 | 472256 | 288.87 | 947.7 | -93.31019 | 36.60049 |
| 4050650 | 472240 | 288.86 | 947.7 | -93.31037 | 36.60094 |
| 4050700 | 472218 | 288.82 | 947.6 | -93.31063 | 36.60139 |
| 4050750 | 472196 | 288.84 | 947.6 | -93.31087 | 36.60184 |
| 4050800 | 472178 | 288.82 | 947.6 | -93.31107 | 36.60229 |
| 4050850 | 472158 | 288.86 | 947.7 | -93.31131 | 36.60274 |
| 4050900 | 472138 | 288.83 | 947.6 | -93.31153 | 36.60319 |
| 4050950 | 472112 | 288.93 | 947.9 | -93.31183 | 36.60364 |
| 4051000 | 472094 | 289.36 | 949.3 | -93.31203 | 36.60409 |
| 4051050 | 472086 | 289.64 | 950.3 | -93.31212 | 36.60454 |
| 4051100 | 472072 | 289.70 | 950.5 | -93.31227 | 36.60499 |
| 4051150 | 472044 | 288.03 | 945.0 | -93.31258 | 36.60544 |

## Appendix B. DEM cross-sections **[DEM]**

Elevations in ft NAVD88 every 10 m from E 471,900 to 472,700 m (west → east).

**N = 4,050,900 (mid north-embankment):** pool 917 ×21 → 926, 937, **947, 947** (crest, E ≈ 472,130–472,140), 933, 918, 906, 896, 893, 891, 886, 886, 884, 877, 870, 868, 867, 866, 865, 861, 853, 840, 838, 842, 846, 849, 852, 855, 857, 860, 861, 864, 866, 867, 868, 869, 869, 868, 866, 864, 862, 860, 864, 864, 861, 865, 869, 873, 880, 883, 888, 891, 894, 897, 900, 904, 904, 903, 902. (Downstream toe ≈ 838–870 ft; the valley east of the embankment climbs back to ~900 ft.)

**N = 4,050,100 (powerhouse reach of the concrete section):** pool 917 ×30 (to E ≈ 472,190) → 881, 842, 788, 738, 713, then tailwater **708** ×17 (E ≈ 472,240–472,410) → 707, 714, 724, 732, 740, 739, 739, 740, 741, 742, 742, 744, 744, 743, 742, 740, 740, 739, 737, 736, 734, 734, 736, 733, 732, 730, 730, 730. (The 917→708 drop over ~50 m is the bare-earth rendering of the concrete dam and powerhouse; the south-bank terrace sits at 730–744 ft.)

**Auxiliary-spillway channel, N = 4,051,230, every 20 m from E 472,000:** 935, 925, 923, 917 ×10 (approach pool to E ≈ 472,240), 911, 940, 925, 927, 931, 932, 930, 928, 927, 925, 929, 933, 939, 940, 938, 935, 915, 918, 913, 911, 909, 904, 903, 899, 896, 893, 890, 886, 886, 872, 859, 842 (chute descending east).

## Appendix C. 20-m ASCII terrain classification of the dam site (2020 DEM) **[DEM]**

Columns: E 471,000 → 473,600 m (20 m per character). Rows: N 4,051,200 (top) → 4,049,400 (bottom). Legend: `R` = 917.1-ft pool (hydro-flattened), `T` = ~707-ft tailwater, `#` = 287–291.5 m (940–956 ft, crest band), `^` = > 291.5 m hills, `+` = 279–287 m, `-` = 250–279 m, `.` = < 250 m. The N–S line of `#` at E ≈ 472,220–472,260 is the embankment crest; the single-cell gap between `R` and `T` at N 4,049,960–4,050,160 is the concrete section; the `.` pocket east of it (N 4,050,300–4,050,620) is the hatchery/tailrace flat.

```
4051200 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+++#######++RRRRR-----+++++++++++++++---------------...--------+++##^^^^^^^^^^^^^^#####
4051180 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR++++######+RRRR-------++++---+++++++---------------....--------+++##^^^^^^^^^^^#######
4051160 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR++++#####+RR---------------++++++----------------....--------+++####^^^^^^^#########
4051140 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR++#######----------------+++++----------------....---------++++###############++#
4051120 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+++#####----------------++++-----------------....---------++++#############+++##
4051100 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR++####+-----------------++------------------....----------+++++########+++++++#
4051080 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+###+--------------------------------------.....----------+++++#####++++++++++
4051060 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+###+--------------------------------------.....-----------+++++++++++++++++++
4051040 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR###+--------------------------------------.....-------------++++++++++-++++++
4051020 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+##+--------------------------------------.....-------------++++++------+++++
4051000 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+##+-------------------------------------......---------------++---------++++
4050980 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+#+-------------------------------------......--------------------------++++
4050960 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+##------------------------------------.......--------------------------++++
4050940 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+##+----------------------------------........-------------------------+++++
4050920 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+#+----------------------------------........-------------------------+++++
4050900 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+##----------------------------------.........------------------------+++++
4050880 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+#+---------------------------------..........----------------------++++++
4050860 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+#+---------------------------------.........-----------------------++++++
4050840 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR##+-------.------------------------........------------------------++++++
4050820 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+#+--------.-----------------------........------------------------++++++
4050800 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+##--------..---------------------........-------------------------++++++
4050780 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+#+--------..--------------------........-------------------------++++++
4050760 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+#+--------..-..-----------------........-------------------------++++++
4050740 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR##+-------......----------------........--------------.----------++++++
4050720 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+#+--------.....---------------.........-------------..----------++++++
4050700 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+##--------.....---------------.........------------...-----------+++++
4050680 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+#+--------.....-------------..........-----------....------------++++
4050660 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+##--------......------------..........-----------....--------------++
4050640 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+#+-------......------------..........-----------....---------------+
4050620 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+#+--------......-----------...........---------......---------------
4050600 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+#+---------.........-----.............---------......---------------
4050580 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+##---------...........................---------........-------------
4050560 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+##----------............................-----............-----------
4050540 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR##-----------...........................----...................-----
4050520 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR##-----------..........................--.........................--
4050500 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+#+------------......................................................
4050480 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+#+--------------....................................................
4050460 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+#+-----------------.................................................
4050440 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+#+--------------------..............................................
4050420 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+#---------------------..............................................
4050400 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR##-------------------................................................
4050380 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+#+----..---...--.....................................................
4050360 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+#+----...............................................................
4050340 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+#+----...............................................................
4050320 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR------...............................................................
4050300 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-----................................................................
4050280 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR----.................................................................
4050260 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-........................................................TTTTT.......
4050240 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-..................................................TTTTTTTTTTTTTTTTTT
4050220 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-............................................TTTTTTTTTTTTTTTTTTTTTTTT
4050200 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-..........................................TTTTTTTTTTTTTTTTTTTTTTTTTTT
4050180 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-........................................TTTTTTTTTTTTTTTTTTTTTTTTTTTTT
4050160 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-...TTT..............................TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
4050140 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-..TTTTTT.............................TTTTTTTTTTTTTTTTTTTTT.......TTTT
4050120 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-..TTTTTTTT.........................TTTTTTTTTTTTTTTTTTT......TTTT.T...
4050100 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-.TTTTTTTTTT.....................TTTTTTTTTTTTTTTTTTTTTTTTT........T...
4050080 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR--.TTTTTTTTTTT................TTTTTTTTTTTTTTTTTTTTTT...............T...
4050060 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-.TTTTTTTTTTTTTT....TT...TTTTTTTTTTTTTTTTTTTTTTTTT.................T...
4050040 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-.TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT.......................
4050020 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-.TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT..T.......................
4050000 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-.TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT...........................
4049980 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-.TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT................................
4049960 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-..TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT.....................................
4049940 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-....TTT................................................................
4049920 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+++++RRRRRR----................................................--....----.........-
4049900 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+++++RR+++++++++++RR---------------...............--...................----..------........-
4049880 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+++++++++++++####+++++++--++---+------------------..................-------.--------.......-
4049860 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+++++++++++++#####++#+++++--++++++++++-----------................------------------------...-
4049840 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+++++++++++++#####++#+++++++-------------------...............----------------------------.--
4049820 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+++#######++++####+##++++++++-----------------..............---------------------------------
4049800 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+++#########++++##+#+++++++++----------------..............----------------------------------
4049780 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+++############+#+##++++-------------------...............-----------------------------------
4049760 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+++############+###+++++------------------.........----...-----------------------------------
4049740 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+++###############++++++-----------------.........------..-----------------------------------
4049720 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR++++############+++----+-----------------.........---------------------+-+++++++++------------
4049700 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR++++##########+++-----------------------......-...--------------------++++++++++++++----------
4049680 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR++++#########++++------------------------...----..------------------+++++########++++---------
4049660 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR++++########+++++++++++++------------------------.-----------------+++#############++---------
4049640 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR++++########+++++++++++++++--------------------------------------+++###^^^^^^^^^###++--------
4049620 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR++++##########++++++++++++++------------------------------------+++##^^^^^^^^^^^^^##+++------
4049600 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR++++##################++++++------------------------------------++##^^^^^^^^^^^^^^^##++------
4049580 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR++++###################+++++-----------------------------------+++#^^^^^^^^^^^^^^^^^##++-----
4049560 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR++++####^^##############++++----------------------------------+++##^^^^^^^^^^^^^^^^^^##++----
4049540 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+++###^^^^^^############++++---------------------------------+++##^^^^^^^^^^^^^^^^^^^^^#++---
4049520 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR+++++###^^^^^^^###########++++---------------------------++---+++##^^^^^^^^^^^^^^^^^^^^^^##++--
4049500 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR++++###^^^^^^^^^#########+++++--------------------------+++++++++##^^^^^^^^^^^^^^^^^^^^^^^##++-
4049480 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR++++###^^^^^^^^^########++++++--------------------------++++++++##^^^^^^^^^^^^^^^^^^^^^^^^^##++
4049460 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR++++##^^^^^^^^^^########+++++------------------+--------++++++++##^^^^^^^^^^^^^^^^^^^^^^^^^^^#+
4049440 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR++++##^^^^^^^^^########++++++-----------------+++-------++++#####^^^^^^^^^^^^^^^^^^^^^^^^^^^^^#
4049420 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR++++++###^^^^^^^^########+++++-------------------++++-------++#####^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

## Appendix D. Raw bucket facts used above **[S3]**

* `usgs-lidar-public/MO_FEMANRCS_1_2020/ept.json`: bounds (EPSG 3857) x -10,587,433 → -9,941,269; y 4,261,242 → 4,907,406; 55,630,370,830 points; hierarchyType json; dataType laszip.
* `usgs-lidar-public/MO_Southwest_1_2021/ept.json`: bounds x -10,533,031 → -10,386,461; y 4,351,237 → 4,497,807; 49,979,325,202 points (conforming bounds reach only lon -93.304, i.e. the dam).
* `MO_FEMANRCS_1_2020` LAZ tile count 5,019 (1500 m tiles, 100-km squares 15S UA/UB/UC/UD/VA/VB/WA/YA/YB/ZA/ZB); `MO_Southwest_1_2021` tile count 2,200 (squares 15S UA/UB/VA/VB).
* Southwest_1 extent shapefile bbox (UTM 15N): E 355,461 → 472,958; N 4,039,173 → 4,127,669. FEMANRCS_1 extent bbox: E 318,828 → 828,829; N 4,037,710 → 4,379,711 (five rings).
* 1-m DEM tile x47y406 (FEMANRCS): EPSG 26915 in the GeoTIFF header, 1.0 m pixels, bounds E 469,994–480,006 / N 4,049,994–4,060,006, nodata -999999, 512×512 internal tiles, overviews 2/4/8/16/32.
* NOAA 13981 tiles: 10,785 COPC LAZ files in blocks A–Q; block extents (UTM 15N unless noted) A E 440.0–448.5 km N 4027.0–4039.5 km (2023-08-19/21); B E 518.0–553.5 N 3981.5–4003.5; C E 633.0–673.5 N 4002.5–4028.5; D E 417.0–437.0 N 4188.0–4209.5; E E 408.5–431.5 N 4242.0–4270.5; F E 635.0–701.0 N 4030.0–4118.0; G E 694.0–737.0 N 4068.5–4138.0; H E 720.0–748.0 N 4078.5–4123.0; I E 532.5–592.0 N 4227.0–4273.0; J E 545.5–626.5 N 4176.5–4282.0; K E 640.5–732.5 N 4204.5–4271.5; L E 522.0–545.0 N 4303.5–4332.5; M E 436.5–479.0 N 3857.0–3869.5; N E 418.0–446.5 N 3914.0–3927.5; O E 459.5–555.5 N 3853.0–3901.5; P E 324.0–360.0 N 3962.0–4005.0; Q E 207.0–319.5 N 3920.0–4006.0.
