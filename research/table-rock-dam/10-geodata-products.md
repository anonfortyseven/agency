# 10 — Geodata Products: Inventory and Provenance

Every file under `geodata/` (143 MB in total) was produced in this session from public data reachable over plain HTTPS. Regenerate any of them with the scripts in `scripts/` (Python 3.11; `pip install rasterio laspy[lazrs] numpy scipy pyproj shapely matplotlib pillow pymupdf mgrs`). Nothing here requires an account or API key.

## 1. Source datasets (all read directly from the providers' S3 buckets)

| Dataset | Provider / project | Acquisition | Key facts | Access path |
|---|---|---|---|---|
| 3DEP lidar point cloud | USGS / NV5 Geospatial, **MO_FEMANRCS_2020_D20**, work unit MO_FEMANRCS_1_2020 | 15 Apr – 5 Dec 2020; dam flown 30 Nov 2020 | QL2, NPS 0.71 m, ≤10 cm RMSEz, LAS 1.4, classes 1/2/7/9/17/18/20 | `https://usgs-lidar-public.s3.amazonaws.com/MO_FEMANRCS_1_2020/ept.json` (EPT, EPSG:3857) ; LAZ tiles under `prd-tnm.s3.amazonaws.com/StagedProducts/Elevation/LPC/Projects/MO_FEMANRCS_2020_D20/MO_FEMANRCS_1_2020/` |
| 3DEP lidar point cloud, 2nd epoch | USGS / Digital Aerial Solutions, **MO_Southwest_2021_D21**, work unit MO_Southwest_1_2021 | 6 Dec 2021 – 31 Jan 2022; site 6 Dec 2021 | QL2; ends at the Stone/Taney line E ≈ 472,166 | `https://usgs-lidar-public.s3.amazonaws.com/MO_Southwest_1_2021/ept.json` |
| 1 m DEM | USGS 3DEP, both projects | as above; published 16 Jan 2023 / 2 Nov 2022 | tiles `USGS_1M_15_x47y406_*`, `x47y405_*` (and x46y40x for the 2021 project) | `https://prd-tnm.s3.amazonaws.com/StagedProducts/Elevation/1m/Projects/<project>/TIFF/` |
| 1/3 arc-second DEM | USGS 3DEP | current edition | tile n37w094 | `https://prd-tnm.s3.amazonaws.com/StagedProducts/Elevation/13/TIFF/current/n37w094/USGS_13_n37w094.tif` |
| US Topo GeoPDFs | USGS | 2012-01-05, 2015-01-29, 2017-10-18, 2021-05-15 | embedded NAIP orthoimage layer ≈ 2010/2014/2016/2020 | `https://prd-tnm.s3.amazonaws.com/StagedProducts/Maps/USTopo/PDF/MO/MO_Table_Rock_Dam_<date>_TM_geo.pdf` |
| Historical topographic maps (HTMC) | USGS | 1956 (4 prints), 1956/photorevised 1981, 1989, 1985 (100k) | GeoTIFF scans | `https://prd-tnm.s3.amazonaws.com/StagedProducts/Maps/HistoricalTopo/GeoTIFF/MO/MO_Table Rock Dam_<id>_<year>_24000_geo.tif` |
| Sentinel-2 L2A | ESA Copernicus via Element84 COG mirror | 2025–2026, tile 15SVA | true-colour COGs, 10 m | `https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/15/S/VA/<yyyy>/<m>/<scene>/TCI.tif` |

Also reachable but not used: Copernicus DEM 30 m (`copernicus-dem-30m.s3.amazonaws.com`), AWS terrain tiles (`elevation-tiles-prod.s3.amazonaws.com/terrarium/z/x/y.png`), Google Cloud public Landsat/Sentinel-2 buckets. Blocked from this environment: NAIP buckets (requester-pays), USGS/USACE/NOAA web services, ScienceBase (bathymetry).

## 2. File inventory

| File | Contents | CRS / datum | Resolution | Size | Regenerate with |
|---|---|---|---|---|---|
| `elevation/trd_dem_1m_dam_crop.tif` | USGS 3DEP 1 m bare-earth DEM, tight box E 470,600–473,800 / N 4,049,200–4,051,200 (MO_FEMANRCS_2020_D20, holes filled from MO_Southwest_2021_D21) | EPSG:26915 / NAVD88 m | 1 m | 6.8 MB | `scripts/fetch_dem.py` |
| `elevation/trd_dem_2m_5km.tif` | Same DEM resampled to 2 m over the 5 km box E 469,700–474,700 / N 4,047,700–4,052,700 | EPSG:26915 / NAVD88 m | 2 m | 7.7 MB | `scripts/fetch_dem.py` |
| `elevation/trd_dem_40m_40km_context.tif` | USGS 3DEP 1/3 arc-second DEM tile n37w094 reprojected to UTM, 40 km box E 452,000–492,000 / N 4,030,000–4,070,000 | EPSG:26915 / NAVD88 m | 40 m | 3.1 MB | `scripts/assemble_geodata.py (from the 20 m intermediate)` |
| `elevation/trd_hillshade_dam_crop.png` | Hillshade of the 1 m dam crop (az 315°, alt 45°) | pixel-aligned with the 1 m crop | 1 m | 1.6 MB | `scripts/fetch_dem.py` |
| `elevation/trd_hillshade_5km_2m.jpg` | Hillshade of the 5 km DEM, downsampled | pixel-aligned with the 5 km box | 2 m | 0.8 MB | `scripts/fetch_dem.py` |
| `lidar/trd_lidar_2020_concrete_dam_powerhouse_hatchery.laz` | Full-density 2020 lidar, E 472,050–473,000 / N 4,049,850–4,050,450: concrete section, spillway, intake, powerhouse, switchyard, hatchery, tailrace (2,043,210 pts, LAS 1.4 PF6, classes 1/2/9/17/20) | EPSG:26915 / NAVD88 m | 3.9 pts/m² | 12.1 MB | `scripts/process_lidar.py` |
| `lidar/trd_lidar_2020_auxiliary_spillway.laz` | Full-density 2020 lidar, E 471,850–472,550 / N 4,051,050–4,051,550: auxiliary spillway, Hwy 165 bridge, approach and discharge channels (1,097,865 pts) | EPSG:26915 / NAVD88 m | 3.9 pts/m² | 5.9 MB | `scripts/process_lidar.py` |
| `lidar/trd_lidar_2020_visitor_center.laz` | Full-density 2020 lidar, E 471,700–472,100 / N 4,049,600–4,049,950: Dewey Short Visitor Center and south abutment (853,546 pts) | EPSG:26915 / NAVD88 m | 3.9 pts/m² | 5.0 MB | `scripts/process_lidar.py` |
| `lidar/trd_lidar_2020_aoi_thinned_1of16.laz` | Whole 2.0 × 2.7 km area of interest, every 16th point of the 2020 cloud (1,348,789 pts) | EPSG:26915 / NAVD88 m | ≈0.25 pts/m² | 11.2 MB | `scripts/assemble_geodata.py` |
| `lidar/trd_lidar_2021_westside_thinned_1of16.laz` | Second epoch: MO_Southwest_1_2021 (6 Dec 2021) west of E 472,166, every 16th point (385,458 pts) | EPSG:26915 / NAVD88 m | ≈0.16 pts/m² | 3.3 MB | `scripts/assemble_geodata.py` |
| `lidar/trd_dsm_0p5m_u16cm_structures.tif` | Digital surface model (max of all returns, noise removed) of the structures box E 471,700–473,100 / N 4,049,600–4,051,600; uint16 centimetres: metres = value/100 + 200, 0 = nodata | EPSG:26915 / NAVD88 | 0.5 m | 10.4 MB | `scripts/process_lidar.py + assemble_geodata.py` |
| `lidar/trd_ndsm_0p5m_u16cm_structures.tif` | Height above the USGS 1 m bare-earth DEM (structures, trees, decks); metres = (value−1)/100, 0 = nodata; unreliable where the DEM interpolates under buildings | EPSG:26915 | 0.5 m | 8.3 MB | `scripts/process_lidar.py` |
| `lidar/trd_intensity_first_0p5m_structures.tif` | Mean first-return lidar intensity, 8-bit stretch (99th percentile) — a leaf-off 'image' of the structures, roads and riprap | EPSG:26915 | 0.5 m | 6.4 MB | `scripts/process_lidar.py` |
| `lidar/trd_class_0p5m_structures.tif` | Dominant ASPRS class per cell: 1 unclassified/above-ground, 2 ground, 9 water, 17 bridge deck (priority 9 > 17 > 2 > 1) | EPSG:26915 | 0.5 m | 2.0 MB | `scripts/process_lidar.py` |
| `lidar/trd_dsm_unrolled_along_crest.tif` | DSM resampled into crest coordinates: x = station from the south abutment (m), y = cross distance (m, lake side negative, downstream positive), whole dam | crest coordinates (see 09-…md §3) | 1 m | 1.6 MB | `scripts/process_lidar.py` |
| `lidar/trd_dsm_unrolled_concrete_section_0p5m.tif` | Same for stations 0–500 m and cross −60…+120 m at 0.5 m: piers, gates, hoist deck, powerhouse, platforms | crest coordinates | 0.5 m | 0.4 MB | `scripts/process_lidar.py` |
| `lidar/trd_crest_centreline.csv` | Crest centreline traced on the 947-ft deck, 1 m stations: station, E, N, local azimuth | EPSG:26915 | 1 m | 0.0 MB | `scripts/process_lidar.py` |
| `lidar/trd_crest_centreline_wgs84.geojson` | The same centreline as a WGS84 LineString with the axis summary as properties | EPSG:4326 | 5 m vertices | 0.0 MB | `scripts/process_lidar.py` |
| `lidar/trd_crest_profile.csv` | Maximum DSM within ±15 m of the centreline at every station (spikes = piers, hoists, poles) | crest coordinates | 1 m | 0.1 MB | `scripts/process_lidar.py` |
| `lidar/spillway_piers_and_bays.csv` | Station, UTM, lat/lon and local azimuth of the 11 pier/end-wall marks and the 10 bay centres (gate 1 = southernmost) | EPSG:26915 + WGS84 | ±1 m | 0.0 MB | `make_site_figure step (see 09-…md)` |
| `lidar/feature_coordinates.json` | 17 measured feature positions (abutment, spillway, powerhouse, junction, auxiliary spillway, visitor center, switchyard, hatchery, water samples) in UTM and lat/lon | EPSG:26915 + WGS84 | ±2 m | 0.0 MB | `scripts/make_site_figure.py` |
| `lidar/lidar_measurements.json` | All structure measurements: deck clusters, pier stations, bay chute elevations, building blocks, embankment sections with profiles, water/channel surfaces, powerhouse block | EPSG:26915 / NAVD88 | — | 0.0 MB | `scripts/measure_structures.py` |
| `lidar/lidar_report.json` | Processing report: water surfaces, axis summary, section point counts, bridge-deck clusters, crop point counts | — | — | 0.0 MB | `scripts/process_lidar.py` |
| `lidar/trd_lidar_FEMANRCS_2020.laz.manifest.json` | EPT nodes downloaded for the 2020 cloud (593 nodes, 21,580,618 pts) with the exact ept.json URL | — | — | 0.0 MB | `scripts/fetch_lidar_ept.py` |
| `lidar/trd_lidar_Southwest_2021.laz.manifest.json` | EPT nodes downloaded for the 2021 cloud (168 nodes, 6,167,328 pts) | — | — | 0.0 MB | `scripts/fetch_lidar_ept.py` |
| `lidar/sections/` | 30 cross-sections: PNG plots + gzipped CSV of raw points within ±1 m of each line (t, E, N, z, class, return). crest_station_XXXXm = perpendicular to the crest at that station (t −250…+350 m); named lines through the auxiliary spillway (along E 472,180 and across N 4,051,250 / 4,051,350), the powerhouse tailrace (N 4,050,200) and the visitor center (N 4,049,800) | EPSG:26915 / NAVD88 | raw points | 3.0 MB (60 files) | `scripts/process_lidar.py` |
| `lidar/previews/` | JPEG previews: DSM hillshade, nDSM (magma, 0–40 m), intensity, classes, unrolled DSMs, crest profile | — | 0.5 m (downsampled to 3000 px) | 20.6 MB (7 files) | `scripts/process_lidar.py` |
| `imagery/MO_Table_Rock_Dam_20120105_ortho_1m.tif` | Orthoimage layer of the 2012-01-05 US Topo sheet (≈ 2010 NAIP), rendered at 1 m, box E 471,000–474,000 / N 4,048,800–4,052,300 | EPSG:26915 (from the GeoPDF LGIDict) | 1 m (source ≈ 1 m) | 2.4 MB | `scripts/extract_ustopo_ortho.py` |
| `imagery/MO_Table_Rock_Dam_20150129_ortho_1m.tif` | Orthoimage layer of the 2015-01-29 US Topo sheet (≈ 2014 NAIP) | EPSG:26915 | 1 m | 2.3 MB | `scripts/extract_ustopo_ortho.py` |
| `imagery/MO_Table_Rock_Dam_20171018_ortho_strips_native.tif` | Orthoimage of the 2017-10-18 sheet (≈ 2016 NAIP) rebuilt from the embedded image strips (no map overlays) | EPSG:26915 (from the GeoPDF viewport) | 1.52 m native | 2.3 MB | `scripts/extract_ustopo_ortho.py --strips` |
| `imagery/MO_Table_Rock_Dam_20210515_ortho_strips_native.tif` | Orthoimage of the 2021-05-15 sheet (2020 NAIP) rebuilt from the embedded image strips — the newest clean ortho | EPSG:26915 | 1.52 m native | 1.8 MB | `scripts/extract_ustopo_ortho.py --strips` |
| `imagery/S2A_15SVA_20260820_1_L2A_TCI_40km.tif` | Sentinel-2 L2A true colour, 20 Aug 2026, 40 km box (whole lower lake, Branson, Taneycomo) | EPSG:32615 (WGS84 UTM 15N) | 10 m | 4.6 MB | `scripts/fetch_sentinel2.py --box wide` |
| `imagery/S2*_TCI_12km.tif` | Sentinel-2 L2A true colour, 12 km box, seven dates: 2026-08-20, 2026-05-12, 2026-04-20 (leaf-out), 2026-03-26 (leaf-off), 2026-01-05 (winter), 2025-10-22 (autumn), 2025-06-09 (spillway-release day) | EPSG:32615 | 10 m | 3.3 MB (7 files) | `scripts/fetch_sentinel2.py` |
| `historical-maps/MO_Table_Rock_Dam_324283_1956_24000_geo_damcrop.tif` | USGS 7.5' 'Table Rock Dam' 1956 edition (1952 aerial photography, field check 1956): PRE-IMPOUNDMENT topography with the natural White River, 'TABLE ROCK DAM (UNDER CONSTRUCTION)' and the borrow area; 20-ft contours, NGVD29; crop E 469,500–475,500 / N 4,047,000–4,053,500 (+ full-sheet preview JPG) | NAD27 polyconic (as scanned) | 2.03 m/px | 3.0 MB | `scripts/crop_historical_topo.py` |
| `historical-maps/MO_Table_Rock_Dam_324286_1956_24000_geo_damcrop.tif` | Same sheet photorevised 1981 (1980 photography): completed dam, powerhouse, 'Sub sta' switchyard, hatchery raceways, lake shoreline in purple/blue over the 1952 contours (+ preview) | NAD27 polyconic | 2.03 m/px | 4.2 MB | `scripts/crop_historical_topo.py` |
| `historical-maps/MO_Table_Rock_Dam_324287_1989_24000_geo_damcrop.tif` | 1989 edition (1980 photos, field check 1986/87): pre-auxiliary-spillway abutment and original Hwy 165 alignment (+ preview) | NAD27 polyconic | 2.03 m/px | 4.1 MB | `scripts/crop_historical_topo.py` |
| `historical-maps/MO_Table_Rock_Lake_325408_1985_100000_geo_damcrop.tif` | 1:100,000 'Table Rock Lake' 1985 sheet crop (+ preview) | NAD27 | 8.5 m/px | 0.2 MB | `scripts/crop_historical_topo.py` |
| `metadata/` | USGS FGDC XML + browse JPG for the two 1 m DEM tiles x47y406 (both projects) and the ept.json of the nine Missouri EPT projects that were examined | — | — | 0.0 MB (9 files) | `curl (see 05-…md for the S3 paths)` |
| `figures/site_layout_annotated.jpg` | Annotated 2020 ortho with the lidar crest centreline, 100 m station ticks and measured feature labels — the orientation reference | EPSG:26915 axes | — | 0.6 MB | `scripts/make_site_figure.py` |

## 3. Regeneration (≈ 5 minutes on a laptop)

```bash
pip install rasterio 'laspy[lazrs]' numpy scipy pyproj shapely matplotlib pillow pymupdf mgrs
mkdir -p work && cd work
python3 ../scripts/fetch_dem.py dem                                   # 1 m DEM (two projects merged), 2 m, hillshades
python3 ../scripts/fetch_lidar_ept.py lidar/trd_lidar_FEMANRCS_2020.laz --project MO_FEMANRCS_1_2020
python3 ../scripts/fetch_lidar_ept.py lidar/trd_lidar_Southwest_2021.laz --project MO_Southwest_1_2021
python3 ../scripts/process_lidar.py lidar/trd_lidar_FEMANRCS_2020.laz lidar_products --dem dem/trd_dem_1m_5km.tif
python3 ../scripts/measure_structures.py lidar_products dem/trd_dem_1m_5km.tif
python3 ../scripts/fetch_sentinel2.py s2 && python3 ../scripts/fetch_sentinel2.py s2 --box wide
# US Topo GeoPDFs -> ../ustopo/ (curl), historical GeoTIFFs -> ../topo/ (curl); then:
for f in ../ustopo/*2012*.pdf ../ustopo/*2015*.pdf; do python3 ../scripts/extract_ustopo_ortho.py $f ortho; done
for f in ../ustopo/*2017*.pdf ../ustopo/*2021*.pdf; do python3 ../scripts/extract_ustopo_ortho.py $f ortho --strips; done
python3 ../scripts/crop_historical_topo.py ../topo topo_crops
python3 ../scripts/make_site_figure.py ortho/MO_Table_Rock_Dam_20210515_ortho_strips_native.tif lidar_products/trd_crest_centreline.csv lidar_products/lidar_measurements.json site.jpg feature_coordinates.json
python3 ../scripts/assemble_geodata.py . ../geodata
```

Environment notes: GDAL reads the remote COGs through `/vsicurl/` with HTTP range requests, so the DEM and Sentinel-2 steps transfer only a few megabytes; the EPT download fetches ≈ 600 small LAZ nodes in parallel (≈ 125 MB for the 2020 cloud). Set `CURL_CA_BUNDLE`/`SSL_CERT_FILE` if your network re-signs TLS.

## 4. Encodings and conventions

* Rasters named `*_u16cm.tif` store centimetres in uint16 to keep files small: `metres = value/100 + 200` (DSM/DTM) or `metres = (value-1)/100` (nDSM); 0 is nodata. Float32 DEMs use −9999/−999999 nodata.
* Crest coordinates (`*_unrolled_*`, `trd_crest_profile.csv`, `spillway_piers_and_bays.csv`): station 0 at the south abutment (E 472,149.8 / N 4,049,850.0), increasing north; cross distance negative on the lake side.
* LAZ files are LAS 1.4 point format 6 written by laspy/lazrs; open with PDAL, CloudCompare, QGIS, LAStools or laspy. Coordinates are UTM metres; GPS time is adjusted standard GPS time (add 1e9 s and count from 1980-01-06).
* The historical map crops keep the scans' NAD27 polyconic CRS; reproject to EPSG:26915 with GDAL (`gdalwarp -t_srs EPSG:26915`) before overlaying — expect the NAD27→NAD83 shift of ≈ 4 m south / 16 m east noted in the sheet margins.
* Not included because of size (regenerable in seconds): the full 21.6 M-point 2020 cloud (125 MB), the 6.2 M-point 2021 cloud (38 MB), the 1 m 5 km DEM (28 MB), the whole-AOI 0.5 m rasters and the full-sheet historical GeoTIFFs (10–22 MB each).