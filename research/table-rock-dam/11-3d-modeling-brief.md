# 11 — 3-D Modeling Brief for Table Rock Dam

How to turn this research database into a high-detail, georeferenced 3-D model of the dam and its
surroundings. Written for the modeling team; assumes Blender / Houdini / Unreal / Cesium-class tooling
plus QGIS/GDAL/PDAL for the data prep. All file paths are relative to `research/table-rock-dam/`.

## 1. Scene tiers and extents (UTM 15N, EPSG:26915)

| Tier | Extent | Purpose | Primary data |
|---|---|---|---|
| T0 context | 40 × 40 km: E 452,000–492,000, N 4,030,000–4,070,000 | horizon, lake arms, Branson skyline, flight paths | `geodata/elevation/trd_dem_40m_40km_context.tif`, `geodata/imagery/S2A_15SVA_20260820_1_L2A_TCI_40km.tif` |
| T1 site | 5 × 5 km: E 469,700–474,700, N 4,047,700–4,052,700 | lake near the dam, Taneycomo to Fall Creek, State Park, Moonshine Beach, Chateau on the Lake, hatchery | `trd_dem_2m_5km.tif`, `trd_hillshade_5km_2m.jpg`, 12 km Sentinel-2 windows, `trd_lidar_2020_aoi_thinned_1of16.laz` |
| T2 structures | 1.4 × 2.0 km: E 471,700–473,100, N 4,049,600–4,051,600 | dam, spillway, powerhouse, switchyard, hatchery, auxiliary spillway, visitor center | 0.5 m DSM/nDSM/intensity/class rasters, `trd_dem_1m_dam_crop.tif`, 1.0–1.5 m NAIP orthos |
| T3 hero assets | concrete section + powerhouse (E 472,050–473,000, N 4,049,850–4,050,450); auxiliary spillway (E 471,850–472,550, N 4,051,050–4,051,550); visitor center (E 471,700–472,100, N 4,049,600–4,049,950) | full-density point clouds for direct meshing or as a survey control for hand modeling | `geodata/lidar/trd_lidar_2020_*.laz`, unrolled DSMs, sections, `spillway_piers_and_bays.csv` |

Suggested model origin: **E 472,178.5, N 4,050,025.3 (spillway centre), Z = 0 at NAVD88 0 m** — or
put Z = 0 at the 915-ft conservation pool (278.9 m NAVD88) if a "water level" reference is more useful
for animation. Keep the X axis = UTM easting, Y = northing, Z = up; the dam axis is then ≈ 3.4° west
of +Y (chord) with the concrete section rotated ≈ 9° east of +Y.

## 2. Datums and units (do not skip)

* Horizontal: NAD83 / UTM 15N metres. All rasters, LAZ files, CSVs and the centreline are in this CRS.
  Lat/lon copies (WGS84) exist for the centreline and the feature list.
* Vertical: **NAVD88 metres** for everything measured here. USACE numbers (915 / 931 / 947 ft etc.) are
  NGVD29 feet. Apply a **+0.3–0.5 ft** shift (NGVD29 → NAVD88) or confirm with NGS VERTCON at
  36.596 N, 93.311 W before mixing. Published feet → metres: ft × 0.3048.
* Time: the lidar is one moment (30 Nov 2020, lake 917.3 ft NAVD88, tailwater 707.6 ft NAVD88,
  powerhouse generating). Model the water as a separate, animatable surface.

## 3. Terrain pipeline

1. Bare earth: start from `trd_dem_1m_dam_crop.tif` (T2) and `trd_dem_2m_5km.tif` (T1); the water
   areas are hydro-flattened at the 2020/2021 pool elevations (279.5 m lake, 215.7 m tailrace).
2. Lake bed: replace the flattened lake with the USGS 2020 multibeam bathymetry (**USGS SIM 3499,
   ScienceBase DOI 10.5066/P9FAFJZG** — listed in `04-…md`/`05-…md`, not downloadable from this
   environment) merged to 931 ft. Until then, digitise the **1956 pre-impoundment contours**
   (`geodata/historical-maps/MO_Table_Rock_Dam_324283_1956_24000_geo_damcrop.tif`; 20-ft interval;
   White River channel ≈ 700–720 ft at the dam site, "TABLE ROCK DAM (UNDER CONSTRUCTION)" outline
   drawn) to reconstruct the drowned valley and the original river alignment through the dam.
3. Lake Taneycomo bed: no public bathymetry; approximate with the 1956 sheet (channel bed) and the
   lidar-derived banks. The stilling basin and tailrace floor are engineered (request as-builts).
4. Bluffs and abutments: the 0.5 m DTM (`trd_dtm_0p5m_u16cm.tif` regenerable) and DSM show the rock
   cuts of the auxiliary spillway and the south abutment bluff.

## 4. Structures pipeline

* **Concrete section (stations 0–481 m):** build monoliths from the published cross-section logic
  (crest el. 947 ft, 35-ft crest width, downstream face ≈ 0.67–0.75 H:1 V, vertical upstream face,
  ogee crest 896 ft, 10 bays of 45 ft with 9-ft piers) and **fit them to the lidar**: deck at 288.76 m,
  pier stations 100.2 … 265.2 m on the centreline, chute surface 265.5–266 m at 6–13 m downstream of
  the deck centreline, powerhouse roof 245.95 m, platform 236.5 m, tailwater 215.7 m. The 0.5 m unrolled
  DSM (`trd_dsm_unrolled_concrete_section_0p5m.tif`) is an orthographic "elevation drawing" of the whole
  section — use it as a background image in the modeling viewport (x = station, y = cross distance).
* **Tainter gates and hoists:** geometry from EM 1110-2-2702 conventions (45 × 37 ft leaf, radius
  ≈ 40–45 ft, trunnion on the pier downstream of the crest); hoist machinery sits on the deck between
  the highway and the downstream parapet — verify from `03-…md` photo sources U-1 and the 2016/2017
  drone videos in `06-…md`.
* **Powerhouse:** 91.5 × 24.5 m footprint at the toe, roof 246 m, four unit bays (≈ 23 m each) with the
  draft-tube outlets in the tailrace; the 2022 News-Leader interior set (03-…md source #5) is the only
  interior reference found. Switchyard 340 m ENE with 19 m lattice structures; transmission towers
  23–28 m tall along the north bank.
* **Embankment (stations 481–1,356 m):** crest 12–13 m at 288.8 m, upstream 2.8–3.1 H:1 V riprap,
  downstream 2.8–2.9 H:1 V grass, a bench/road at the downstream toe, the auxiliary-spillway discharge
  channel along the toe north of station ≈ 850.
* **Auxiliary spillway:** 8-gate structure ≈ 142 m (467 ft) wide spanning the cut at N ≈ 4,051,140–
  4,051,240; deck 289.0 m; floor 263 m (863 ft); approach channel ≈ 215 m wide at water level to the
  north; discharge channel south-east. Hwy 165 crosses on a bridge on the crest alignment. Point cloud:
  `trd_lidar_2020_auxiliary_spillway.laz` (1.10 M points).
* **Dewey Short Visitor Center:** blocks with roofs 300.7–305.0 m on ground ≈ 288 m; the observation
  tower ≈ 16.5 m; 15,000 sq ft, LEED Gold (published). Point cloud `trd_lidar_2020_visitor_center.laz`.
* **Hatchery:** raceway grid E 472,700–473,000 / N 4,050,280–4,050,420 at ≈ 235 m, outlets to
  Taneycomo, Hatchery Road; buildings visible in the 2020 ortho.
* **Roads:** Missouri 165 on the crest (2 lanes), Hatchery Road, State Park Road, the visitor-center
  loop; the 2010–2020 orthos show lane markings at 1–1.5 m.

## 5. Water, operations and animation states

| State | Table Rock pool (ft, project datum) | Gates | Release | Tailwater at dam | Source |
|---|---|---|---|---|---|
| Winter conservation | 915 | closed | turbine only, 0–15,100 cfs | 702 → ≈ 711 ft | 01/08 |
| Summer conservation | 917 | closed | as above | | 01/08 |
| Top of flood pool | 931 | closed / opening | 5 gates × 1 ft ≈ 5,000–6,500 cfs | | 01/08 |
| 2011 record | 935.47 (27 Apr 2011) | all 10 open ≈ 4 ft | ≈ 68,000 cfs | Branson Landing flooded | 02/08 |
| Dec 2015 | ≈ 931–932 | all 10 | ≈ 72,000 cfs (record release, single source) | | 02 |
| Lidar moment | 917.3 NAVD88 | closed | generating | 707.6 ft NAVD88 | 09 |

Discharge scaling for spillway animation: ≈ 1,000–1,300 cfs per gate per foot of opening at pools of
915–931 ft; full-power turbine flow 15,100 cfs (SWPA). Tailwater rises ≈ 8 ft from idle to full
generation (08-…md). Cold (48–55 °F) releases produce the signature morning fog on Taneycomo.

## 6. Texturing and vegetation

* Orthos: 2020 NAIP (1.5 m, `…20210515_ortho_strips_native.tif`), 2016 (`…20171018…`), 2014 (1 m,
  `…20150129_ortho_1m.tif`), 2010 (1 m, `…20120105_ortho_1m.tif`). Seasonal colour from the seven
  Sentinel-2 windows (leaf-off Jan/Mar, leaf-out Apr, full leaf May/Aug, autumn Oct, and the
  9 Jun 2025 spillway-release day).
* Trees: leaf-off lidar (class 1 points above the DEM) gives trunk positions and heights across T2;
  crown shapes need leaf-on imagery.
* Materials: concrete (weathered, streaked below the gates), riprap dolomite on the upstream face,
  grass downstream, asphalt crest road with concrete parapets, blue-green clear lake vs. grey-green
  tailwater — see the materials palette in `07-…md` (unverified, from memory) and the photo catalog.

## 7. Historical states worth modeling

| Year | State | Evidence |
|---|---|---|
| 1952–1956 | natural valley, river through the site, construction start | 1956 quadrangle (1952 photos), Springfield News-Leader Darkroom photos (Jan/Jun/Aug 1955), Missouri State Archives May 1957 |
| 1957 | premature filling against the unfinished dam | 02-…md, Facebook history-group scans |
| 1959–1961 | completed dam, 2 then 4 units, original visitor overlook | dedication coverage, postcards |
| 1981 / 1989 | full lake, pre-auxiliary-spillway abutment, original Hwy 165 alignment | 1981 photorevised and 1989 quadrangles in `geodata/historical-maps/` |
| 2005 | auxiliary spillway and new Hwy 165 bridge | 2010 ortho (2012 sheet) |
| 2012 → | Dewey Short Visitor Center | 2014/2016/2020 orthos |

## 8. Gaps and the acquisition plan

1. **As-built drawings and Design Memoranda** — FOIA to USACE Little Rock District (list in
   `04-…md` §10/§11, DM index in the 2014 Master Plan Appendix C). Highest-value single document: WES
   Technical Report 2-504 *Spillway and Conduits for Table Rock Dam — Hydraulic Model Investigation*.
2. **Bathymetry** — USGS SIM 3499 data release (ScienceBase) for the lake; ask USACE/MDC for any
   Taneycomo/tailrace survey.
3. **Photogrammetry** — commission a drone orbit of the concrete section, powerhouse and auxiliary
   spillway (USACE permission required near the dam; local operators named in `06-…md`), or extract
   frames from the 2016 all-gates-open drone videos.
4. **Interior** — request a powerhouse/gallery photo visit through the Little Rock District PAO.
5. **60 cm NAIP** (USDA) and Missouri statewide imagery (MSDIS) for better textures than the 1.5 m sheets.
6. **Re-run the unexecuted searches** listed at the end of files 03, 04, 05, 06, 07 and 08 (the session's
   200-query budget ran out); the site-context file (07) in particular was written without live results.
7. **Datum check** with NGS VERTCON; **NID record MO30202** direct read for the official height/length.

## 9. Quick start for the modeler

```bash
pip install rasterio laspy[lazrs] numpy scipy pyproj matplotlib pillow   # ~1 min
python3 scripts/fetch_dem.py work/dem                                     # 1 m DEM, 30 s
python3 scripts/fetch_lidar_ept.py work/lidar/trd_2020.laz                # 21.6 M points, ~30 s
python3 scripts/process_lidar.py work/lidar/trd_2020.laz work/lp --dem work/dem/trd_dem_1m_5km.tif
python3 scripts/measure_structures.py work/lp work/dem/trd_dem_1m_5km.tif
```
Then load `geodata/lidar/trd_lidar_2020_concrete_dam_powerhouse_hatchery.laz` in CloudCompare /
Blender (LAZ import) with the DSM as a height field and the 2020 ortho as the base texture; use
`geodata/figures/site_layout_annotated.jpg` to orient yourself (north up, concrete section south).
