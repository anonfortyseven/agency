# 09 — Measured Geometry of Table Rock Dam from USGS Lidar and Imagery

Everything in this file was **measured in this session** from public USGS 3DEP data (not copied from a
publication). Values are metres unless stated; feet are given alongside (× 3.28084). Horizontal
coordinates are NAD83 / UTM zone 15N (EPSG:26915). Heights are **NAVD88 (GEOID18)** as delivered by
USGS, which is *not* the Corps' project datum (see §2). Machine-readable versions of every number are
in `geodata/lidar/lidar_measurements.json`, `geodata/lidar/lidar_report.json`,
`geodata/lidar/feature_coordinates.json`, `geodata/lidar/spillway_piers_and_bays.csv` and `specs.json`.

## 1. Data and method

| Item | Detail |
|---|---|
| Point cloud | USGS 3DEP lidar, project **MO_FEMANRCS_2020_D20**, work unit **MO_FEMANRCS_1_2020** (NV5 Geospatial, QL2). Flight over the dam: **30 Nov 2020, 20:41–21:11 UTC** (GPS time of the points), leaf-off. 21.6 M points over the 2.0 × 2.7 km area of interest, **3.9 pts/m²** average. |
| Classification available | 1 unclassified (all vegetation and buildings), 2 ground, 7/18 noise, 9 water, **17 bridge deck**, 20 ignored ground. There are **no building or vegetation classes**, so structures were extracted from the surface model and heights above the bare-earth DEM. |
| Second epoch | **MO_Southwest_1_2021** (Digital Aerial Solutions, flown 6 Dec 2021 over the site) covers only the part of the dam **west of E 472,166** (Stone/Taney county line) — the lake face, the embankment crest and the lake side of the concrete section. 6.2 M points, 2.6 pts/m². Kept as `trd_lidar_2021_westside_thinned_1of16.laz` for change comparison. |
| Bare-earth DEM | USGS 3DEP 1 m DEM tiles `USGS_1M_15_x47y406` and `x47y405` (2020 project), holes west of the county line filled from the 2021 project. |
| Imagery | 2020 NAIP orthoimage as embedded in the 2021 US Topo GeoPDF (1.5 m); 2010, 2014, 2016 NAIP from the 2012/2015/2017 sheets. |
| Processing | `scripts/fetch_lidar_ept.py` (EPT octree download), `scripts/process_lidar.py` (0.5 m DSM/DTM/nDSM/intensity/class rasters, crest-centreline trace, unrolled DSM, cross-sections, LAZ crops), `scripts/measure_structures.py` (pier detection, building blocks, slopes, surfaces). |
| Accuracy | Vendor spec: ≤ 10 cm RMSEz (non-vegetated), ≈ 14 cm RMSExy. Positions quoted here are good to ≈ ±1 m horizontally and ±0.1 m vertically on hard surfaces; station values along the crest to ≈ ±2 m. |

## 2. Datums — read before comparing with USACE numbers

* Lidar and DEM heights are **NAVD88 metres**. USACE publishes Table Rock elevations in feet on the
  **project datum (NGVD29)**.
* The measured crest deck is **288.76 m = 947.4 ft NAVD88**; the published top of dam is **947 ft
  NGVD29**. The measured Hwy 165 deck over the auxiliary spillway is 289.0 m = 948.2 ft NAVD88 versus a
  published top-of-structure of 948 ft. Both agree with NAVD88 ≈ NGVD29 + 0.3–0.5 ft at this site,
  which is the expected VERTCON shift for southern Missouri. **Confirm with NGS VERTCON before mixing
  the two datums in the model; until then subtract ≈ 0.4 ft from NAVD88 values to compare with USACE
  gauge readings.**
* Water surfaces read from the lidar on 30 Nov 2020: **Table Rock Lake 279.59 m = 917.3 ft NAVD88**
  (≈ 916.9 ft project datum — consistent with the 917-ft seasonal conservation pool) and **Lake
  Taneycomo at the tailrace 215.69 m = 707.6 ft NAVD88** (powerhouse evidently generating; idle
  tailwater is ≈ 702 ft).

## 3. Crest and alignment

| Quantity | Measured | Notes |
|---|---|---|
| Crest deck elevation (concrete section, class-17 deck) | median **288.76 m (947.4 ft)**, 5th–95th pct 288.72–289.04 m | 13,374 half-metre cells |
| Embankment crest (bare-earth DEM, stations 500–1100) | 288.71–288.87 m (947.2–947.7 ft) | see §6 |
| Crest flat width (within 0.6 m of the maximum) | **12–13 m (40–43 ft)** | two-lane Hwy 165 plus shoulders; the published concrete top thickness is 35 ft |
| Deck width at the intake section (station 200 section) | 13 m | class-17 deck from t = +15 to +28 m in the station-200 section |
| Traced crest centreline | from the south abutment **E 472,149.8 / N 4,049,850.0** to the auxiliary-spillway bridge **E 472,072.9 / N 4,051,132.5** | `geodata/lidar/trd_crest_centreline.csv` (1 m stations) and `.geojson` (WGS84) |
| Chord azimuth (south end → north end) | **356.6° true**, chord 1,284.8 m | |
| Local azimuth | stations 100–300 (concrete): **≈ 9° (N 9° E)**; stations 400–700 (south embankment): 359–13°; stations 800–1100 (north embankment): **334–347° (N 13–26° W)** | the embankment bends to the north-west as it approaches the north abutment |
| Traced crest length | 1,356 m along the centreline (4,449 ft) | main dam only, south abutment to the auxiliary-spillway bridge; the published 6,423 ft total also counts the embankment/dike lengths beyond the auxiliary spillway cut and the tie-ins |

Station convention used everywhere in `geodata/lidar/`: **station 0 = south (right) abutment, increasing
north along the crest centreline; cross distance t < 0 is the lake side, t > 0 is downstream (east).**

## 4. Concrete gravity section, spillway and intake

| Quantity | Measured | Published (for comparison) |
|---|---|---|
| Deck (class 17) extent | E 472,145.5–472,235.5, **N 4,049,856–4,050,337**; north–south extent **481 m (1,578 ft)** | concrete section 1,602 ft (488 m) — agrees within the abutment tie-in |
| Gated spillway | **10 bays, 11 pier/end-wall marks at stations 100.2, 118.2, 134.2, 150.2, 167.2, 183.2, 199.2, 215.2, 232.2, 249.2, 265.2 m** | 531 ft gated section with 10 tainter gates 45 × 37 ft |
| Mean pier spacing | **16.50 m = 54.1 ft** | 45 ft gate + 9 ft pier = 54 ft |
| Gated length (outer marks) | **165.0 m = 541 ft** | 531 ft (measured marks include the outer half-walls) |
| Spillway centre | station 182.7 → **E 472,178.5 / N 4,050,025.3 (36.59531 N, 93.311044 W)** | |
| Chute surface 6–13 m downstream of the deck centreline (between piers, lidar minimum) | **265.5–266.1 m (871–873 ft)** | ogee crest 896 ft; the lidar sees the chute below the gate lip |
| Downstream face of the concrete section (station 175 and 200 sections) | drops from ≈ 279 m at t ≈ 27 m to ≈ 230 m at t ≈ 60 m: **≈ 0.67 H : 1 V (≈ 56°)** | typical USACE gravity section 0.7–0.8 H:1 V |
| Upstream face | vertical from the water line (279.6 m) to the deck (288.8 m); freeboard on 30 Nov 2020 ≈ 9.2 m (30 ft) | 947 − 917 = 30 ft |
| Non-overflow monoliths south of the gates | stations 0–100 (≈ 100 m) between the south abutment and bay 1 | |
| Intake / powerhouse monoliths | stations 265–≈ 360, with the powerhouse at the toe (§5) | 4 penstocks × 18 ft |
| Non-overflow monoliths north of the intake | stations ≈ 360–481 to the concrete/embankment junction at **N 4,050,337** | |

Per-pier and per-bay coordinates (UTM and lat/lon) are in `geodata/lidar/spillway_piers_and_bays.csv`;
gate 1 is the southernmost bay. The 0.5 m unrolled DSM `trd_dsm_unrolled_concrete_section_0p5m.tif`
(preview `previews/preview_trd_dsm_unrolled_concrete_section_0p5m.jpg`) shows every pier and the gate
hoist positions as an orthogonal "elevation map" of the whole concrete section.

## 5. Powerhouse, tailrace and switchyard

| Quantity | Measured |
|---|---|
| Powerhouse roof plateau (243–250 m band, connected component) | stations **265.2–356.8 m → length 91.5 m (300 ft)** along the dam; **t = 48.2–72.8 m → width 24.5 m (80 ft)**; roof median **245.95 m (807 ft)** |
| Roof centre | **E 472,257.7 / N 4,050,142.9 (36.596372 N, 93.310163 W)** |
| Deck/platform between dam toe and powerhouse (station 300 section) | flat at **≈ 236.5 m (776 ft)**, t ≈ 34–46 m (≈ 12 m wide) |
| Tailrace water surface (30 Nov 2020) | **215.69 m (707.6 ft)** directly downstream of the powerhouse (t ≥ 78 m at station 300) |
| Height of roof above tailwater | ≈ 30 m (100 ft) |
| Tailrace channel to the hatchery reach | flattened water 215.7 m; far (south) bank terrace ≈ 226 m (741 ft) |
| Training/divider wall | a linear structure ≈ 70 m long runs east from the powerhouse's south-east corner between the spillway stilling basin and the tailrace (visible in `previews/preview_dsm_hillshade.jpg`) |
| Switchyard | lattice structures 19 m tall at E 472,720 / N 4,050,300; transmission towers 23–28 m tall at E 472,840–473,050 / N 4,050,150–4,050,175 (tops 241–246 m) leading east along the north bank |
| Distance powerhouse roof centre → switchyard | ≈ 340 m |

The bare-earth DEM has the powerhouse removed (interpolated), so the nDSM there is unreliable; use the
DSM (`trd_dsm_0p5m_u16cm_structures.tif`) or the LAZ crop
`trd_lidar_2020_concrete_dam_powerhouse_hatchery.laz` (2.04 M points, full density) for the building.

## 6. Earth embankment (from the 1 m bare-earth DEM, sections perpendicular to the local crest azimuth)

| Station (m) | E / N of crest | Crest max (m / ft) | Flat crest width (m) | Downstream slope H:V (3–25 m below crest) | Upstream slope H:V (above water) |
|---|---|---|---|---|---|
| 500 | 472,231.5 / 4,050,337.9 | 288.73 / 947.3 | 13 | 2.88 | 2.88 |
| 600 | 472,247.1 / 4,050,436.5 | 288.71 / 947.2 | 13 | 2.78 | 2.78 |
| 700 | 472,260.1 / 4,050,535.3 | 288.86 / 947.7 | 12 | 2.89 | 2.92 |
| 800 | 472,243.7 / 4,050,632.9 | 288.87 / 947.7 | 13 | 2.83 | 3.07 |
| 900 | 472,206.0 / 4,050,725.4 | 288.84 / 947.6 | 13 | 4.57* | 2.90 |
| 1000 | 472,168.7 / 4,050,818.0 | 288.82 / 947.6 | 12 | 5.44* | 2.86 |
| 1100 | 472,130.0 / 4,050,910.0 | 288.83 / 947.6 | 13 | 10.5* | 2.79 |

\* North of station ≈ 850 the downstream side is no longer a simple slope: the auxiliary-spillway
discharge channel (floor ≈ 263–273 m) and its excavated benches lie along the toe, so the fitted
"slope" flattens. The upstream slope above the 917-ft water line is consistently **≈ 2.8–3.1 H : 1 V**
with riprap; the downstream slope south of station 850 is **≈ 2.8–2.9 H : 1 V**, grassed. Full
profiles every 10 m are in `lidar_measurements.json` (`embankment_sections_from_1m_DEM`) and the raw
point sections in `geodata/lidar/sections/`.

Embankment height above the downstream toe at station 600: crest 288.7 m to toe ≈ 250 m → ≈ 39 m
(128 ft) on the land side; the lake-side face continues under water to the original valley floor (see the
1956 quadrangle for pre-impoundment contours).

## 7. Auxiliary spillway (2005) and the Hwy 165 bridge

| Quantity | Measured |
|---|---|
| Hwy 165 bridge / hoist deck (class-17 cluster) | E 472,139.5–472,272.5, N 4,051,125.5–4,051,239.5 (114 m N–S, 133 m E–W footprint of deck cells), deck median **289.00 m (948.2 ft)** |
| Bridge span seen in the along-channel section at E 472,180 | deck from N 4,051,145 to 4,051,165 (≈ 20 m) at 289.5 m; piers/structure below reach up to 290 m from a floor at ≈ 269 m |
| Approach channel (north of the structure, open to the lake at Moonshine Beach cove) | water surface **279.64 m (917.5 ft)** from N ≈ 4,051,165 to 4,051,330 at E 472,180; across-section at N 4,051,250 the channel is ≈ 215 m wide at water level (E ≈ 472,040–472,255), with natural ground at 285–289 m either side |
| Discharge channel (runs south-east along the embankment toe) | floor minimum **263.0 m (863 ft)**; floor 270–273 m (886–896 ft) at E 472,180 between N 4,050,950 and 4,051,100 |
| Implied structure height | deck 948 ft − floor 863 ft = **85 ft**, matching the published "85 ft tall, top el. 948" description; the published "crest el. 948" therefore refers to the top of the structure, not the ogee crest |
| Ogee crest elevation | **not resolvable** from lidar (under the deck); published statements imply the gates begin to overflow at ≈ 933 ft |

Note the flow direction: the approach channel is on the **north**, the structure spans the cut at
N ≈ 4,051,140–4,051,240, and the discharge channel leaves to the **south-east** along the toe of the
north embankment before turning east to Lake Taneycomo.

## 8. Dewey Short Visitor Center, hatchery and other features

| Feature | Measured |
|---|---|
| Visitor center building complex (nDSM > 5 m blocks) | largest block E 471,801–471,850 / N 4,049,650–4,049,707, roof ≈ 304.2 m (998 ft), height above ground ≈ 16.5 m (54 ft) at the 90th percentile (observation tower); further blocks at E 471,758–471,860 / N 4,049,650–4,049,830 with roofs 300.7–305.0 m — the building sits on the bluff at ≈ 288 m ground level, **≈ 500 m south-south-west of the spillway centre, on the lake side of Hwy 165** |
| Shepherd of the Hills Fish Hatchery raceways | E ≈ 472,700–473,000 / N ≈ 4,050,280–4,050,420, ground ≈ 235 m (771 ft), on the **north bank** of Lake Taneycomo, ≈ 750 m east-north-east of the spillway centre; Hatchery Road along the north side |
| Table Rock Lake shoreline at the dam (30 Nov 2020) | 279.59 m (917.3 ft) |
| South abutment bluff | rises above 300 m within 100 m south of station 0 |
| Original valley | 1956 quadrangle: White River channel ≈ 700–720 ft at the dam site, valley floor ≈ 720–760 ft, bluffs to 1,000 ft+ |

## 9. Agreement with published figures

| Item | Published | Measured here | Verdict |
|---|---|---|---|
| Top of dam | 947 ft (NGVD29) | 947.4 ft NAVD88 | agree (datum shift ≈ 0.4 ft) |
| Concrete section length | 1,602 ft | 1,578 ft (class-17 deck, N–S) | agree within tie-ins |
| Gate + pier module | 54 ft | 54.1 ft | agree |
| Gated section | 531 ft | 541 ft between outer pier marks | agree (outer walls) |
| Auxiliary spillway top / height | 948 ft / 85 ft | 948.2 ft deck / 863 ft floor → 85 ft | agree |
| Seasonal conservation pool | 917 ft | 917.3 ft NAVD88 on 30 Nov 2020 | agree |
| Tailwater | 702 ft idle, up to ≈ 711 ft at full generation | 707.6 ft during the flight | plausible generating state |
| Total length | 6,423 ft | 4,449 ft main-dam crest traced to the auxiliary spillway | remainder is dike/tie-in beyond the cut — to be resolved with as-built drawings |

## 10. Known limitations

* Single lidar epoch over the concrete section (2020); the 2021 flight stops at the county line.
* No returns from the water surface of the stilling basin below the gates, and the ogee crest is hidden
  under the deck: the gate geometry (45 × 37 ft) still comes from publications.
* Buildings and vegetation share class 1; automatic footprints were validated only for the powerhouse and
  visitor center. Tree crowns in leaf-off condition give reliable trunk positions but not canopy shape.
* Orthoimagery is 1.5 m (2020) and 1 m (2010–2016) from the US Topo sheets; 60 cm NAIP is available
  from USDA but was not reachable from this environment.
* Bathymetry of Table Rock Lake (USGS SIM 3499, 2020 multibeam) and of Lake Taneycomo is **not**
  included; the lake bed near the dam must be taken from SIM 3499 (ScienceBase) or approximated from
  the 1956 quadrangle contours.
