# 07 — Site Context & Surrounding Features: Table Rock Dam (White River, Branson, MO)

> ## ⚠️ CORRECTIONS FROM MEASURED GEODATA (added 2026-09-05 by the consolidating agent)
>
> This file was written **without any live search results** (see §0) and its orientation assumption (Conflict C-1) is **wrong**. The 2020 USGS lidar, the 2020 NAIP orthoimage and the 1956/1981/1989 USGS quadrangles in `geodata/` establish the layout unambiguously (see `README.md`, `09-measured-geometry-from-lidar.md` and `geodata/figures/site_layout_annotated.jpg`):
>
> * The dam axis runs **almost north–south** (chord azimuth 356.6° true; the concrete section trends N 9° E, the embankment swings to N 13–20° W towards its north end). It does **not** trend ENE–WSW.
> * The **concrete gravity section (1,602 ft) is at the SOUTH end** against the right (south) abutment bluff — deck N 4,049,856–4,050,337 m UTM 15N. The **ten gated bays** occupy stations 100–265 m from the south abutment (N ≈ 4,049,944–4,050,107); the **powerhouse** roof block (≈ 91 m × 25 m, roof ≈ 246 m / 807 ft NAVD88) sits at the toe immediately **north** of the gates (stations 265–357, 48–73 m downstream of the crest centreline). The **switchyard** is ≈ 340 m east-north-east of the powerhouse on the north bank.
> * The **earth embankment runs NORTH** from the concrete section (N 4,050,337 → ≈ 4,051,130) carrying Missouri 165; the **auxiliary spillway (2005)** is cut through the **north** abutment with the Hwy 165 bridge deck at 289.0 m (948.2 ft) centred near E 472,206 / N 4,051,182; its approach channel opens to the lake on the north (Moonshine Beach side) and its discharge channel runs south-east along the embankment toe (floor ≈ 263 m / 863 ft).
> * **Dewey Short Visitor Center** is at the **south (right) abutment**, on the lake side (west) of Hwy 165, centred near E 471,825 / N 4,049,678 (≈ 500 m south-south-west of the spillway centre), roof ≈ 304 m / 998 ft NAVD88 — **not** at the north-east end and **not** adjacent to the auxiliary spillway.
> * **Shepherd of the Hills Fish Hatchery** raceways are on the **north (left) bank** of Lake Taneycomo directly downstream, centred near E 472,850 / N 4,050,350 (≈ 750 m east-north-east of the spillway), with Hatchery Road along their north side.
> * Table Rock State Park and the State Park Marina are **south-south-west**; Moonshine Beach and Chateau on the Lake are **north**. Statements below that place features "NE"/"SW" must be mirrored accordingly. Bearings/distances in §1 should be replaced by the measured values in `geodata/lidar/feature_coordinates.json`.



**Scope:** built environment, landscape, geology, vegetation and water within roughly a 3 km × 3 km scene centred on the dam (centre approx. 36.5967 N, −93.3106 W; USACE Little Rock District; built 1954–1958; concrete gravity section + earthen embankments; Missouri Route 165 on the crest; Lake Taneycomo is the tailwater).

**Purpose:** feed a highly detailed 3-D model of the dam and its immediate surroundings — every feature needs location, dimensions, dates, materials and photo/plan references.

---

## 0. READ FIRST — provenance and confidence of this file

> **The shared WebSearch budget for this session (200/200 calls) was already exhausted by the sibling agents before this agent's first query. WebFetch and curl are blocked by the proxy. Every query attempted (see §12 Search log) returned "budget exhausted" — zero live results were obtained.**
>
> Consequently **everything below is written from the author model's training knowledge (cutoff mid-2026), not from live sources.** To keep the database honest:
>
> * Every factual line carries a confidence grade: **[H]** high (well-known, repeatedly published), **[M]** medium (recalled from a small number of sources / plausible but unconfirmed), **[L]** low (fragmentary memory or inference — treat as a hypothesis).
> * **Every URL in this file is inferred, not returned by a search, and is therefore marked "(unverified)".** Only canonical, long-lived URL patterns (Wikipedia article titles, agency root pages) are given. Do not cite them onward without opening them.
> * Geographic bearings/distances from the dam centre are **estimates from mental-map recall and simple geometry**, good to perhaps ±300 m and ±20° — adequate to place a feature in the right quadrant of the scene, **not** adequate as survey control. Coordinates must be re-read from imagery / OSM / lidar before modelling (§11 lists the data sources to use).
> * §12 also lists ~50 **planned queries that were never executed**; running them is the fastest way to upgrade this file.

---

## 1. Scene inventory (features within / at the edge of the 3 km × 3 km scene)

Bearings and distances are from the dam centre (36.5967, −93.3106). "In scene" = inside a 3 km × 3 km box (±1.5 km). Orientation assumption used throughout (see Conflict C-1): **dam axis trends roughly ENE–WSW (≈ 060°/240°); the concrete gravity section with spillway and powerhouse is at the NE (Branson-side) end; the long earthen embankment runs WSW to the Table Rock State Park side; the tailwater leaves the powerhouse flowing roughly N then bends E/NE toward Branson.**

| # | Feature | Type | Approx. location rel. to dam centre | Built / modified | Key dimensions | Operator | Best source (all unverified) | In scene? |
|---|---|---|---|---|---|---|---|---|
| 1 | Table Rock Dam (the subject) | Concrete gravity + earth embankment | centre | 1954–58; power 1959; aux. spillway 2001–05 | 6,423 ft total; 1,602 ft concrete; 252 ft high; crest el. 947 ft; 10 tainter gates 45×37 ft [H] | USACE Little Rock Dist. | https://www.swl.usace.army.mil (Table Rock Lake pages); https://en.wikipedia.org/wiki/Table_Rock_Dam | Yes |
| 2 | Powerhouse + tailrace | Hydro powerhouse | at downstream toe of concrete section, NE half of dam, ≈ 0.4–0.6 km @ ~050–070° | 1957–59 | 4 units × 50 MW = 200 MW [H] | USACE (generation marketed by SWPA) | USACE Table Rock pages (unverified) | Yes |
| 3 | Switchyard / transmission take-off | 161 kV switchyard [M] | immediately adjacent to powerhouse, downstream side, ≈ 0.5–0.7 km @ ~050–070° | 1958–59 | several 161-kV circuits climbing hillside to N/NE [M] | SWPA / interconnected utilities | https://www.swpa.gov (unverified) | Yes |
| 4 | Auxiliary spillway + fuse plug + Hwy 165 bridge | Concrete-lined emergency spillway chute | NE abutment area between concrete dam and visitor centre; ≈ 0.9–1.2 km @ ~055–065° [M] | 2001–2005 [M] | chute several hundred ft wide, ~1,000+ ft long; fuse-plug embankment at lake end; new 2-lane highway bridge [M/L] | USACE (bridge: MoDOT-maintained road on federal structure? [L]) | USACE Little Rock Dam Safety pages (unverified) | Yes |
| 5 | Dewey Short Visitor Center (2012) | USACE visitor centre, 2-storey w/ observation deck | NE abutment, lake side of Hwy 165, ≈ 1.1–1.4 km @ ~055–065° | opened April 2012 [H] | order of 15,000–21,000 sq ft [L]; observation tower/deck; theatre | USACE | https://www.swl.usace.army.mil (Dewey Short VC page) (unverified) | Yes |
| 6 | Original (pre-2012) Dewey Short Visitor Center | 1960s/70s low overlook building | NE abutment near the dam's north end on the lake side [M]; site probably consumed by aux. spillway [L] | c.1960s; named for Short (1970s) [M]; removed c.2001–03 [L] | small single-storey [M] | USACE | (none) | Yes (site) |
| 7 | USACE Table Rock Project Office & maintenance yard | Offices, shops, boat dock | 4600 State Hwy 165 — adjacent to / just N of the VC on Hwy 165 [M] | 1950s–60s, expanded | office bldg + shop + yard + dock [M] | USACE | (unverified) | Yes |
| 8 | Shepherd of the Hills Fish Hatchery & Conservation Center | Cold-water trout hatchery | immediately below dam on east/right bank of tailwater, ≈ 0.6–0.9 km @ ~030–050° | 1958 (mitigation for lost warm-water fishery) [H]; centre bldg later [M] | ~48 outdoor concrete raceways [M] (42 vs 48 — see C-4); ~1.1 million trout/yr [M]; water 48 °F from ~130 ft depth through the dam [M] | Missouri Dept. of Conservation | https://mdc.mo.gov (Shepherd of the Hills Fish Hatchery page) (unverified) | Yes |
| 9 | Hatchery outlets 1–3 (raceway discharges into Taneycomo) | Outfall channels / fishing spots | along hatchery shoreline, 0.7–1.2 km @ ~030–045° | 1958 | 3 outfalls; famous "Outlet 1/2/3" trout holes [H] | MDC | (fishing-report sites, unverified) | Yes |
| 10 | Hatchery boat ramp / Taneycomo access | Concrete ramp + parking | hatchery grounds, downstream end [M] | — | single-lane ramp [M] | MDC | (unverified) | Yes |
| 11 | Hatchery Road (access road from Hwy 165 down to hatchery/powerhouse) | 2-lane paved local road, steep grade | branches from Hwy 165 N of the dam; descends ~240 ft to river terrace [M] | 1950s | ~1 km [M] | MDC / USACE | — | Yes |
| 12 | White River Bluff Trail | Natural-surface hiking trail | on the bluff/ridge E and NE of hatchery, overlooking Taneycomo | — | ~1.5–1.6 mi [M] | MDC | (unverified) | Yes |
| 13 | Table Rock Lakeshore Trail | 2.2-mi paved multi-use trail [H] | from Dewey Short VC to State Park Marina — along the lake side of the dam crest/ Hwy 165 [M] (see C-3) | c.2000s (paved) [L] | 2.2 mi, ~10 ft wide asphalt [M] | USACE / MO State Parks | (unverified) | Yes |
| 14 | Missouri Route 165 (crest roadway) | 2-lane state highway across dam | full length of dam crest; continues N to Branson (Hwy 76) and S/SE to state park, White River Landing, Hollister (US 65) | opened with dam 1958–59 [H]; realigned over aux. spillway 2004–05 [M] | 2 lanes, ~24-ft pavement + shoulders [M]; no stopping on dam [M] | MoDOT | https://en.wikipedia.org/wiki/Missouri_Route_165 (unverified) | Yes |
| 15 | Missouri Route 265 | State highway; concurrent with 165 over the dam [M/L] | N junction with 165 ≈ 1.5–2 km N/NNW (near Chateau on the Lake / Moonshine Beach); S split ≈ 2–3 km S/SE | — | 2 lanes | MoDOT | https://en.wikipedia.org/wiki/Missouri_Route_265 (unverified) | Edge |
| 16 | Table Rock State Park (office 5272 State Hwy 165) | State park, 356 acres [M] on USACE-leased land | adjoins SW end of dam; ≈ 1–2 km @ 210–250° | 1959 [H] | 2 campgrounds (~160 sites) [M]; marina; boat ramps; picnic areas | Missouri State Parks (DNR) | https://mostateparks.com/park/table-rock-state-park (unverified) | Yes |
| 17 | State Park Marina (380 State Park Marina Rd) | Full-service marina (concession) | cove just W/SW of the dam's SW abutment, ≈ 1.0–1.4 km @ ~230–250° | 1960s, rebuilt/expanded [M] | covered slips, fuel dock, store; Spirit of America 49-pax catamaran; parasail; dive shop [M] | Concessionaire under MO State Parks | (unverified) | Yes |
| 18 | State park boat ramps (2+) | Concrete launch ramps + courtesy docks | near marina and campgrounds | 1960s | multi-lane [M] | MO State Parks | — | Yes |
| 19 | Chinquapin Trail | Natural-surface loop | in state park uplands | — | ~1.6–1.7 mi [M] | MO State Parks | — | Yes |
| 20 | White River Valley Trail System | Mountain-bike / hike trail network (4 loops) | state park hills S/SW of dam; trailheads off Hwy 165 | c.2011–2013 [M] | ~10 mi total [M] | MO State Parks / volunteers | (unverified) | Yes (part) |
| 21 | White River Landing / Showboat Branson Belle (4800 State Hwy 165) | Cruise-boat landing, ticket building, parking | on lake's N shore S/SSW of dam, ≈ 2–2.5 km @ ~200–215° [M] | boat launched 1995 [H]; landing 1994–95 | vessel 278 ft long, ~78 ft beam, 700 passengers [M]; large parking lot | Herschend Family Entertainment | https://en.wikipedia.org/wiki/Showboat_Branson_Belle (unverified) | Edge / just outside |
| 22 | Moonshine Beach | USACE day-use swim beach | lake shore N/NNW of dam off Hwy 165, ≈ 1.5–2 km @ ~330–350° [M] | 1960s; renovated 2010s [L] | sand beach, bathhouse, shelters, playground, parking | USACE | (unverified) | Edge |
| 23 | Chateau on the Lake Resort (415 N State Hwy 265) | 10-storey resort hotel, 301 rooms [M] | hilltop N/NW of dam, ≈ 2 km @ ~330–345° [M]; skyline landmark visible from dam & lake | opened 1997 [H]; spa/convention additions later | 10 storeys; 43,500 sq ft convention centre [M] | Atrium Hospitality (ex-John Q. Hammons) | https://en.wikipedia.org/wiki/Chateau_on_the_Lake (unverified) | Edge / just outside |
| 24 | Lake Taneycomo (tailwater) | Run-of-river reservoir, cold (~48 °F) | from powerhouse N then E/NE | 1913 (Powersite Dam) [H]; cold since 1958 | 22 mi long [H]; pool ~701 ft [M]; ~400 ft wide below dam [L] | Liberty Utilities (Empire District) at Powersite Dam | https://en.wikipedia.org/wiki/Lake_Taneycomo (unverified) | Yes (upper 1.5 km) |
| 25 | Trophy Trout Management Area | Regulatory zone (artificial lures/flies; slot limit) | dam → mouth of Fall Creek (~3 mi) [H] | 1990s (revised) | 3 river miles | MDC | (unverified) | Yes (upper end) |
| 26 | Table Rock Lake (headwater) | Flood-control/hydro reservoir | W/SW of dam | 1958 | 43,100 acres @ 915 ft; 52,300 acres @ 931; ~745–800 mi shoreline [H/M] | USACE | https://en.wikipedia.org/wiki/Table_Rock_Lake (unverified) | Yes |
| 27 | Upstream boater-exclusion boom / buoy line | Floating safety barrier | ~200–400 m upstream of concrete section [M] | — | — | USACE | — | Yes |
| 28 | Downstream warning system (sirens/horns, signage) | Safety | powerhouse & hatchery shoreline | — | — | USACE | — | Yes |
| 29 | "Table Rock" — namesake rock ledge | Natural flat-topped dolomite ledge | ambiguous: east bluff just downstream near hatchery, OR under dam/aux. spillway (see C-2) | pre-existing | — | — | (none) | Yes (if extant) |
| 30 | Long Creek arm (mouth) | Lake arm entering from S | ≈ 2.5–4 km @ ~200–230° [M] | — | — | — | — | Outside |
| 31 | Fall Creek Rd / Fall Creek / Lilleys' Landing / Fall Creek Marina | Downstream Taneycomo nodes | ~3 mi down-lake, ≈ 4–5 km @ ~060–080° [M] | — | — | private | — | Outside |
| 32 | Branson Landing | Downtown waterfront | ~7 mi by water, ~8 mi by road NE [M] | 2006 | — | City/private | — | Outside |
| 33 | Branson Scenic Railway (MNA line, ex-Missouri Pacific White River Line) | Railway | downtown Branson depot ≥ 6–7 km NE; never approaches the dam [H] | line 1905–06 | — | Branson Scenic Railway / G&W (MNA) | https://en.wikipedia.org/wiki/Branson_Scenic_Railway (unverified) | Outside |
| 34 | Hwy 165/76 junction & Route 465 (Ozark Mountain Highroad) terminus | Highway junction | ≈ 5–6 km N [M] | 465 opened 2000s | — | MoDOT | — | Outside |
| 35 | US 65 and Route 76 bridges over Taneycomo | Highway bridges | Branson/Hollister, ≈ 7–9 km ENE [M] | 76 bridge 1931 (historic) [M] | — | MoDOT | — | Outside |

---

## 2. Dewey Short Visitor Center (2012) and its predecessor

### 2.1 The current building (opened April 2012)
* **Address / operator:** 4500 State Highway 165, Branson, MO 65616; U.S. Army Corps of Engineers, Little Rock District. [H]
* **Location in scene:** on the Branson (NE) side of the dam, on the **lake (west/southwest) side of Hwy 165**, on the high ground of the NE abutment, roughly 1.1–1.4 km from the dam centre at a bearing of about 055–065°. The building's principal façade and observation deck face SW toward the concrete section of the dam and up the lake; the auxiliary spillway lies between the VC and the dam. [M]
* **Opened:** April 2012 (ribbon-cutting spring 2012; replaced an interim facility used since the old centre was removed). [H for April 2012; L for the interim arrangement]
* **Funding/cost:** federal (partly American Recovery and Reinvestment Act 2009 money) — total recalled in the **$10–13 million** range. [L — verify]
* **Size:** recalled as roughly **15,000–21,000 sq ft** over two levels. [L — verify]
* **LEED:** recalled as LEED-certified (Silver or Gold). [L — verify]
* **Architect / contractor:** **not reliably known** to this author — do not guess. Search terms to resolve: "Dewey Short Visitor Center" architect; USACE Little Rock District design-build; ENR/AIA Missouri award listings 2012–2013. [—]
* **Design & materials (from photo memory):** contemporary "Ozark lodge" idiom: battered walls of native stone veneer (buff-grey Ozark dolomite/limestone), large glass curtain walls facing the lake, exposed heavy timber/glulam and cedar soffits, standing-seam metal roof in dark bronze/grey, deep overhangs; a prominent **observation tower/deck** element with an open-air viewing platform overlooking the dam and lake; a flag plaza at the entry. [M]
* **Program:** exhibit hall (White River basin, flood control, hydropower, the 1950s construction story, Ozark natural history); a **theatre showing a ~20-minute film** on the dam; information desk / bookstore; restrooms; classroom; interpretive **model(s)** — a relief/topographic model of Table Rock Lake and a section model of the dam are recalled but not confirmed [L]. Outdoor interpretive panels along the deck.
* **Site plan (from memory):** entry drive from Hwy 165 → surface parking (~100 cars + RV/bus bays) on the highway side (east) → pedestrian plaza → building → cantilevered deck on the lake side; grounds are mown fescue with young native plantings; the **Table Rock Lakeshore Trail** trailhead begins here [H that the trail starts here]. A separate paved overlook/pull-off exists near the dam's north end [M].
* **Hours:** seasonal; typically daily spring–autumn with reduced winter hours (closed some winter months). Free admission. [M]
* **Powerhouse tours:** historically departed from the VC (suspended after 9/11, resumed mid-2000s, suspended again at times) — status varies year to year. [M]
* **Best imagery to obtain:** USACE Little Rock District Flickr/DVIDS photo sets of the ribbon-cutting (2012); Google Street View along Hwy 165 (bridge and VC entry); oblique aerials on Bing/Apple; MoDOT plans of the Hwy 165 realignment.

### 2.2 The original visitor center / overlook (pre-2012)
* A small single-storey **overlook building at the north end of the dam on the lake side**, dating from the 1960s, with a panoramic window toward the lake and a modest exhibit room; named for Dewey Short in the 1970s (Short was still alive; died 1979). [M]
* **Fate:** the strongest recollection is that the **2001–2005 auxiliary-spillway project consumed the old VC site and its parking**, the building was demolished early in that project, and interpretive services moved to a temporary facility until the 2012 building opened. [L — this is the single most important item to verify in this section; see C-5]
* For the 3-D model this matters only for historical-scene variants; the modern scene has no trace beyond graded ground under the spillway approach.

### 2.3 Name origin — Dewey Short
* Dewey Jackson Short (1898–1979), born Galena, Stone County, MO; U.S. Representative (R-MO 7th) 1929–31 and 1935–57; chair of House Armed Services Committee (1953–55); **Assistant Secretary of the Army (Civil Works) 1957–61**; a decades-long champion of White River basin dams (Table Rock, Bull Shoals, Norfork, Beaver). [H]
* Source: https://en.wikipedia.org/wiki/Dewey_Short (unverified) and the Biographical Directory of the U.S. Congress (bioguide.congress.gov) (unverified).

---

## 3. Shepherd of the Hills Fish Hatchery & Conservation Center (MDC)

* **Address / operator:** 483 Hatchery Road, Branson, MO 65616; Missouri Department of Conservation. Free admission. [H]
* **Why it exists:** built with the dam (1957–58) to mitigate the loss of the warm-water White River fishery once the deep, cold releases from Table Rock made Lake Taneycomo a trout fishery. It is Missouri's largest trout hatchery and produces on the order of **1.1 million rainbow and brown trout per year**, most stocked into Taneycomo and the rest shipped statewide. [H for role; M for numbers]
* **Location in scene:** on a low river terrace **immediately downstream (N/NE) of the concrete section, on the east/right bank** of the tailwater, between the river and the toe of the east bluff; the spillway gates and powerhouse loom directly behind (upstream of) the raceways in visitor photos. Distance ~0.6–0.9 km from the dam centre at bearing ~030–050°. Terrace elevation roughly 705–720 ft. [M]
* **Water supply:** gravity-fed cold water drawn from Table Rock Lake **through the dam** from a depth of roughly **130 ft** (intake elevation therefore ~785 ft when the pool is at 915 ft), delivering ~48 °F water (seasonal range ~44–52 °F). [M] The exact routing (dedicated conduits through the concrete non-overflow/intake section vs. taps on the penstocks) is **unknown** — see C-6.
* **Raceways:** rows of long, narrow concrete raceways aligned roughly parallel to the river, laid out in banks with walkways; a visitor "show pool"/feeding area near the Conservation Center; hatchery building with indoor tanks; brood-stock raceways. Count recalled as **48** (some memory of 42) — see C-4. Typical MDC raceway: ~100 ft long × 8–10 ft wide × 3 ft deep, light-grey weathered concrete with green algae staining below the waterline, chain-link and hand-rails, aerator drops between banks. [M for layout; L for count/dimensions]
* **Outfalls:** raceway water returns to Taneycomo through **three outlet channels, famous with anglers as Outlets 1, 2 and 3**, which attract trout feeding on drift from the raceways. They are small rock-lined channels/culvert mouths on the hatchery shoreline. [H for existence/names; M for form]
* **Conservation Center building:** stone-and-cedar visitor centre with a low-pitched metal roof [M], exhibit hall with native-fish aquariums, an auditorium, gift shop; car park for ~80–100 cars plus buses; typical hours 9–5 (seasonally extended). Date: recalled as a 1990s building with later exhibit refreshes. [L on date]
* **Trails on hatchery land (MDC):** *White River Bluff Trail* (~1.5–1.6 mi, climbs the bluff east of the hatchery with views over Taneycomo) [M]; a short *Hatchery Trail* along the raceways/river [L]; the *Table Rock Lakeshore Trail* (2.2 mi paved) is co-listed by MDC because it starts near the hatchery/VC [M]; a fourth short interpretive loop is recalled [L].
* **Water access:** a concrete boat ramp with parking on hatchery grounds gives Taneycomo access just below the dam; bank fishing is permitted along the hatchery shoreline (with restrictions near the outlets/hatchery intakes). [M]
* **Regulations visible on site:** the **Trophy Trout Area** runs from the dam to the mouth of Fall Creek (~3 miles): artificial lures/flies only, protected slot for rainbows (roughly 12–20 in), reduced limits. Signs and a buoy/rope line mark the upstream limit near the hatchery outlets. [H for existence; M for specifics]
* **Sources to verify (unverified URLs):** https://mdc.mo.gov/discover-nature/places (search "Shepherd of the Hills Fish Hatchery"); MDC "Places to Go" PDF map of the hatchery; MDC hatchery tour brochure; Google Earth imagery for raceway count.

---

## 4. Table Rock State Park, marina, showboat landing, resort landmarks

### 4.1 Table Rock State Park (Missouri State Parks, DNR)
* Established **1959** on land leased from USACE at the SW end of the dam; ~**356 acres** [M]. Office/entrance at 5272 State Hwy 165, Branson. [H for 1959; M for acreage]
* **Components:** two campgrounds (roughly 160 sites total, basic to full-hookup) laid out on the wooded peninsula/coves SW of the dam; day-use picnic areas with shelters; two or more paved multi-lane **boat ramps**; the concession **State Park Marina**; the trailheads of the Lakeshore Trail, Chinquapin Trail (~1.6–1.7 mi natural surface) and the **White River Valley Trail System** (~10 mi of purpose-built mountain-bike/hiking single-track in four colour-coded loops, opened c.2011–13). [M]
* **Relationship to the dam:** the park's northern edge is essentially the downstream toe/abutment of the earthen embankment's SW end; from the park's shoreline the whole upstream face (riprap) and the crest roadway are visible looking NE.
* **Source (unverified):** https://mostateparks.com/park/table-rock-state-park

### 4.2 State Park Marina (380 State Park Marina Road)
* Full-service marina in the first cove W/SW of the SW abutment (~1.0–1.4 km from dam centre, bearing ~230–250°) [M]: covered and open slips on floating docks (steel-framed, aluminium/roofed), fuel dock, ship's store, rentals (pontoons, ski boats, wave-runners), parasailing, a scuba shop (Taneycomo/Table Rock are dive destinations), and the **Spirit of America** 49-passenger sailing catamaran. [M]
* Recognisable in aerials as a large T- and finger-dock array with a long breakwater/log boom; parking terraces cut into the hillside; boat-rental yard.

### 4.3 White River Landing — Showboat Branson Belle (4800 State Hwy 165)
* Herschend Family Entertainment's dinner-cruise paddlewheeler; **launched 1995** (famously slid into the lake on a bed of bananas), ~**278 ft long**, ~78 ft beam, three decks + pilot house, capacity ~700. [H for launch year and banana story; M for dimensions]
* The landing: Victorian-styled terminal/ticket building, large asphalt lot, floating pier, on the lake's north shore ~2–2.5 km S/SSW of the dam centre (bearing ~200–215°) — probably just **outside** the 3 km box but a skyline object from the dam/lake. [M]
* Source (unverified): https://en.wikipedia.org/wiki/Showboat_Branson_Belle

### 4.4 Chateau on the Lake Resort (415 N State Hwy 265)
* 10-storey, 301-room château-styled resort with a 10-storey glazed atrium, opened **1997** (John Q. Hammons; now Atrium Hospitality), spa/convention centre added 2000s. [H for 1997/10 storeys; M for rooms]
* Sits on a hilltop ~2 km N/NNW of the dam near the Hwy 165/265 junction; **the dominant man-made skyline object to the north when viewed from the dam or from the lake**. Likely just outside the box but should be included as a background massing. [M]
* Source (unverified): https://en.wikipedia.org/wiki/Chateau_on_the_Lake

### 4.5 Moonshine Beach (USACE)
* USACE day-use swimming beach on a cove of the lake ~1.5–2 km NNW of the dam, entered from Hwy 165 between the dam and the 165/265 junction; sand beach, roped swim area, bathhouse/changing rooms, picnic shelters, playground, large lot; fee area open Memorial Day–Labor Day; renovated in the 2010s. [M]

### 4.6 "Dam Site" recreation area?
* At Table Rock the Corps day-use land at the dam is the **Dewey Short VC grounds and overlook** plus **Moonshine Beach**; a separately named "Dam Site Park" (as at Beaver Dam, Norfork, Bull Shoals) **is not recalled for Table Rock**. [M] Treat "Dam Site" as an open question (C-8).

### 4.7 Farther nodes (outside scene; useful for orientation only)
* Big Cedar Lodge / Top of the Rock (Ridgedale) ~8–10 km S; Kimberling City ~15 km W; Indian Point/Silver Dollar City ~6–8 km W/NW; Branson downtown/Branson Landing ~8 km NE; College of the Ozarks (Point Lookout) ~6 km E; Old Highway 86 Park (USACE campground) on the Long Creek arm ~6–8 km S.

---

## 5. Roads, bridges, rail

### 5.1 Missouri Route 165 on the dam
* Route 165 is a ~14-mile loop from Route 76 (west Branson) south past the Chateau/Moonshine Beach, **across the crest of Table Rock Dam**, then past Table Rock State Park and White River Landing, and east to US 65 at Hollister. [H for general routing]
* On the dam: **two lanes** of asphalt over the concrete non-overflow sections and the earth embankment crest; across the spillway the roadway is carried on the gate-hoist deck/bridge between the pier tops, with concrete parapets each side; upstream (lake) side parapet with a pedestrian walkway/trail [M]; downstream side parapet/guardrail; no stopping/parking on the dam; speed limit ~35–45 mph. [M]
* Opened to traffic with completion of the dam (1958–59); provided the first fixed road crossing of the White River between Branson and the south side in this reach. [M] "Old"/"Historic Highway 165" as a distinct alignment near the dam is **not recalled** — see C-9.
* **2004–05 realignment/bridge:** construction of the auxiliary spillway on the NE abutment cut the highway, which now crosses the spillway chute on a **new multi-span concrete bridge** (order of 500–900 ft long, 2 lanes + shoulders) [L on length]. This is the only bridge in the scene; NBI record (structure number, year built, length) **not retrieved** — see planned queries.

### 5.2 Missouri Route 265
* Runs from Route 76 (west Branson) south past Chateau on the Lake to a **junction with 165 north of the dam** (~1.5–2 km N/NNW of dam centre), then is recalled as **concurrent with 165 across the dam**, splitting off south of the state park/showboat area to run down the east side of the Long Creek arm to Route 86 near Big Cedar. [M for north junction; L for concurrency — see C-10]

### 5.3 Local roads
* **Hatchery Road** — from Hwy 165 N of the dam down to the hatchery/powerhouse terrace (steep, ~1 km) [M]; **powerhouse access road** — gated USACE road from the abutment to the powerhouse and switchyard [M]; **State Park Marina Road** and campground loops in the state park; **Fall Creek Road** (Hwy 76 → Hwy 165, ~4 km NE, outside scene) [M]; "Lakeshore Drive" in Branson is downtown on Taneycomo — **not** near the dam [H].

### 5.4 Bridges on Lake Taneycomo (all outside scene)
* US 65 (Branson–Hollister) and Route 76 (downtown, 1931 historic truss/concrete) bridges ~7–9 km ENE. [M]

### 5.5 Railway
* The **Branson Scenic Railway** runs excursions from the 1906 downtown Branson depot over the Missouri & Northern Arkansas (ex-Missouri Pacific "White River Line"); its route goes south along Turkey Creek to the Barren Fork trestle or north toward Galena along the James River. **It never comes within ~6 km of Table Rock Dam** and does not follow Taneycomo toward the dam. Exclude from scene. [H]
* Source (unverified): https://en.wikipedia.org/wiki/Branson_Scenic_Railway

---

## 6. Downstream: Lake Taneycomo and the tailwater reach

* **Lake Taneycomo** (Taney-Co-Mo) was created in **1913 by Powersite (Ozark Beach) Dam** at Forsyth — Missouri's first major hydro dam (Empire District Electric → Liberty Utilities, ~16 MW). ~**22 miles long**, normal pool ~**701 ft**; since 1958 fed by Table Rock's deep, cold discharge (~48 °F at the dam, warming only slightly downstream), making it a premier trout fishery. [H for dates/length; M for pool]
* **Channel immediately below the dam (for modelling):** the powerhouse tailrace and the spillway stilling basin discharge into a channel on the order of **300–450 ft (90–140 m) wide** [L], bounded on the east/right by the hatchery terrace and on the west/left by the wooded toe of the embankment/bluff; the river runs roughly N for ~0.5–1 km then bends E/NE. No permanent islands are recalled in the first kilometre; gravel bars appear at low flow farther down (near Trophy Run/Fall Creek) [L]. Water level swings **2–5 ft within hours** with generation; four turbine "boils" and a standing ripple line mark the tailrace when units run. Streambed at the dam ≈ 695 ft (947 − 252). [M]
* **Named spots downstream (upstream → downstream):** dam / powerhouse → hatchery Outlets 1–3 → "Lookout" bluff → Trophy Run → **Fall Creek** mouth (end of trophy area, ~3 mi) → **Lilleys' Landing** (367 River Ln) & Fall Creek Marina → Short Creek → **Cooper Creek** (~5 mi) → Branson Landing / downtown (~7 mi) → Rockaway Beach → Powersite Dam (22 mi). [M]
* **Fog:** the cold water produces dense morning fog over Taneycomo on warm, humid mornings (late spring–autumn), often filling the valley to ~50–100 ft above the water and spilling over the hatchery while the dam crest is in sun — a signature visual. [H]

---

## 7. Upstream / lake side near the dam

* **Lake character at the dam:** the deepest part of Table Rock (max depth ~220 ft near the dam at conservation pool) [M]; clear blue-green water; rocky dolomite/chert shoreline with a pale "bathtub ring" when the pool is below 915 ft; steep wooded bluffs on the N shore, gentler wooded peninsulas on the S (state park) shore. Conservation pool **915 ft**, flood pool to **931 ft**, top of dam **947 ft**; record pool ≈ 935 ft (Dec 2015/Jan 2016; 2011 and 2017 were also near record) [M].
* **Safety boom:** a buoy/log line closes the water within a few hundred metres of the concrete section to boats. [M]
* **Coves:** the state park marina cove (SW of the SW abutment); Moonshine Beach cove (N of the NE abutment, N shore); small unnamed coves along the N shore toward the Chateau. [M]
* **Long Creek arm** enters from the south ~2.5–4 km SW of the dam (mouth opposite the state park/showboat shore). [M]
* **"The Table Rock":** the lake and dam take their name from a flat-topped rock ledge ("table rock") on the White River bluff that was a picnic/dance landmark and gave its name to the 1920s–30s private "Table Rock" dam proposals at this site. Whether the ledge survives (on the east bluff just downstream near the hatchery, visible from the river) or was buried under the dam/auxiliary spillway is **unresolved** — C-2. [M for name origin; L for location]
* **Municipal water intake:** Branson draws drinking water from Table Rock Lake [M]; the intake/pump station location relative to the dam (possibly on the N shore between the dam and the Chateau) is **unknown** — C-11.
* **Table Rock Dam overlooks:** a paved overlook/pull-off near the NE abutment on Hwy 165 (lake side) and the VC deck itself; a viewing pull-off at the SW end near the state park entrance is also recalled. [M/L]

---

## 8. Geology, landforms, soils, vegetation

### 8.1 Physiography
* Ozark Plateaus province; the dam sits on the **Salem Plateau** (Ordovician dolomite terrain) near its western boundary with the higher **Springfield Plateau** (Mississippian limestone), whose escarpment (the Eureka Springs Escarpment) lies west toward Reeds Spring/Kimberling City. Deeply dissected: ridgetops ~1,100–1,250 ft, river ~695 ft → ~400–500 ft of local relief; valley walls 20–40° with vertical bluffs of 50–200 ft along the river. [M]

### 8.2 Bedrock at the dam
* Foundation and abutments are **Lower Ordovician dolomites** — the **Cotter Dolomite** (bluff-former around Branson: thin- to medium-bedded, cherty, with sandstone lenses and shaly zones) over the **Jefferson City Dolomite** (often mapped together as "Jefferson City–Cotter"). [M] The Roubidoux Formation (sandy dolomite/sandstone) lies beneath and may approach streambed elevation in the deep valley [L]. Mississippian limestones (Compton/Pierson/Reeds Spring/Burlington-Keokuk) cap only the highest ridges in the vicinity, if present at all within the scene [L].
* **Karst:** solution-widened joints, small caves and springs are typical; foundation treatment involved extensive grouting and cut-off; seepage monitoring continues. [M]
* **Maps to obtain:** USGS 7.5-minute topographic quadrangle **"Table Rock Dam, MO"** (36°30'–36°37.5' N, 93°15'–93°22.5' W; adjacent "Branson" to the E) [H that the quad exists]; Missouri Geological Survey 1:24,000 bedrock/surficial geologic map of the Table Rock Dam quadrangle via **GeoSTRAT** (https://dnr.mo.gov/… GeoSTRAT viewer) (unverified); USACE Table Rock Dam foundation-geology reports (design memoranda) — search planned.

### 8.3 Quarry / borrow areas
* Concrete aggregate for the dam was produced from a **project-site dolomite/limestone quarry** and earthfill from borrow areas in the reservoir basin; the aggregate quarry's location (one recollection: on the ridge/abutment near the north end, later graded for the auxiliary spillway) is **unconfirmed** — C-7. Look for it in 1950s construction photos and in 1960s–70s aerials (USGS EarthExplorer single-frame aerials, MSDIS historic imagery). [L]

### 8.4 Soils (USDA-NRCS)
* Soil surveys: **Taney County, MO (MO213)** and **Stone County, MO (MO209)** — the dam straddles the county line (Taney E/NE bank, Stone W/SW). [M] Typical map units on the steep dolomite slopes and bluffs: very shallow **Gasconade** and **Moko** soils with rock outcrop; very cherty **Clarksville** and **Alsup/Bardley/Gatewood/Ocie** soils on side-slopes and ridges; **Cedargap/Secesh/Razort** cherty alluvium on the Taneycomo terrace (hatchery). Surface colours: brown to greyish-brown cherty silt loam with abundant white chert fragments; road cuts show orange-red clay over grey dolomite. [M/L]

### 8.5 Vegetation
* **Upland oak–hickory forest** (white, post, black and chinquapin oaks; black/mockernut hickory) with **eastern redcedar** dominant on bluff edges, glades and disturbed slopes; scattered shortleaf pine; dogwood/redbud understorey (spring bloom late March–April). [H]
* **Dolomite glades** with little bluestem and cedar on S/SW-facing slopes. [M]
* **Riparian** along Taneycomo: sycamore (white-barked), silver maple, box elder, river birch, black willow, with mown fescue lawns at the hatchery. [M]
* **Engineered surfaces:** the embankment's downstream face is **mown grass** (fescue/bermuda), the upstream face **dolomite riprap**; abutment slopes are wooded right up to the fences; the state park and VC grounds are mown lawn with retained mature oaks. [M]
* Seasonal palette: bare grey-brown canopy Dec–Mar with cedar green; pale chartreuse leaf-out mid-April; dense dark green Jun–Sep; peak colour (oak russet/maroon, hickory gold, sumac red) late Oct–early Nov. [H]

---

## 9. Utilities & infrastructure

* **Powerhouse:** 4 Francis turbine-generators, 50 MW each (200 MW) [H]; a rectangular concrete/masonry hall at the toe of the concrete section, with a gantry crane rail on the roof or deck, intake gate hoists on the dam crest above, four penstocks through the dam; tailrace with training walls. [M]
* **Switchyard:** open-air 161 kV yard with steel lattice/tubular structures immediately adjacent (downstream/east) of the powerhouse, fenced; several **161-kV transmission circuits** (Southwestern Power Administration; interconnections toward Springfield/City Utilities, Empire/Liberty, and Bull Shoals/AECI) climb the east hillside on lattice towers and cross the Hwy 165 corridor north of the dam — visible as cleared corridors in aerials. Voltage/ownership per circuit **not confirmed** — C-12. [M/L]
* **USACE Table Rock Project Office:** 4600 State Hwy 165, Branson — office, maintenance shops, equipment yard, and a boat dock/ramp on the lake, sited on the N side near the VC. [M]
* **Security (post-2001):** gated and fenced powerhouse/switchyard; no-stopping rules and barriers on the dam roadway; CCTV; upstream exclusion boom; downstream warning sirens/strobes before release changes; MDC hatchery intakes fenced. [M]
* **Cell towers:** none confirmed within the scene; likely candidates near the Chateau/165-265 junction and along the ridges — verify with FCC ASR data (planned). [—]
* **Sewer/water:** the VC, hatchery and state park are on public water/sewer (Branson/Taney County systems) [L]; a lift station near the hatchery is plausible [L].

---

## 10. Climate & lighting context for visualisation

* **Position:** 36.60° N, 93.31° W; Central Time (UTC−6 / −5 DST); solar noon ≈ 12:13 CST / 13:13 CDT. [H]
* **Sun geometry (approx.):** summer solstice — sunrise ~05:55 CDT at az ~059°, noon altitude ~76.8°, sunset ~20:35 at az ~301°; equinox — rise/set due E/W, noon altitude ~53.4°; winter solstice — sunrise ~07:20 CST at az ~119°, noon altitude ~30°, sunset ~17:00 at az ~241°. [H]
* **Consequences for the dam:** the downstream face (facing ~N/NNW) is shaded much of the day except low-angle summer mornings/evenings; the upstream face and the VC deck (facing ~SW) get strong afternoon light; the powerhouse/hatchery terrace sits in the valley shadow until mid-morning. [M — depends on C-1 orientation]
* **Climate:** humid subtropical (Köppen Cfa). July highs ~90 °F, January lows ~22 °F; ~45 in (1,150 mm) rain/yr with spring maxima (flood season Mar–Jun); ~10 in snow/yr, brief; frequent summer haze; severe thunderstorms spring. [H]
* **Fog:** Taneycomo valley fog most mornings May–Oct (cold 48 °F water under warm humid air), burning off by ~9–10 am; Table Rock Lake itself fogs mainly on cold winter mornings (steam fog). [H]
* **Water colour:** Table Rock — clear, oligotrophic-mesotrophic, blue-green, Secchi ~3–6 m near the dam, deep blue in the main channel; Taneycomo — clear cold jade/green, gin-clear at low flow, turbulent white at the tailrace during generation, tea-tinted after floods. [M]
* **Pool fluctuation:** conservation pool 915 ft; typical annual range ~910–925 ft; flood pool to 931 ft with gate releases; record ~935 ft. A pool 5–10 ft below 915 exposes a pale bleached rock ring and wide gravel shore. [M]
* **Ice:** Table Rock rarely freezes (thin ice in sheltered coves in hard winters); Taneycomo near the dam never freezes (48 °F). [H]
* **Foliage:** see §8.5 for the seasonal palette; peak colour late Oct–early Nov.

---

## 11. Landscape & materials palette (for texturing) — with data sources

| Element | Material / colour | Notes | Source to verify |
|---|---|---|---|
| Dam concrete (crest, spillway piers, non-overflow faces) | Weathered mid-grey Portland-cement concrete with vertical dark water/algae streaking and lift-line horizontals; pale efflorescence | 1950s formed concrete, board/steel-form texture | USACE photos; Wikipedia Commons "Table Rock Dam" category (unverified) |
| Tainter gates, hoist bridge steel | Painted structural steel — dark grey/near-black (some memory of green/grey) | verify colour in recent photos | Street View from Hwy 165; USACE Flickr |
| Powerhouse | Concrete/masonry walls, large glazed panels, flat/low roof; SWPA-era institutional style | verify cladding | USACE photos |
| Earth embankment upstream face | Dolomite riprap, buff-grey to tan, blocks ~1–3 ft | bleached above waterline, darker below | oblique aerials |
| Earth embankment downstream face | Mown grass, green Apr–Oct, straw-tan Nov–Mar | slope ~2.5–3 H:1V typical (verify) | USACE design memos |
| Roadway | Asphalt (dark grey, weathered), white edge lines, yellow centre line; concrete parapets/curbs on the dam | 2 lanes | Street View |
| Lakeshore Trail | Asphalt ~10 ft wide | — | MO State Parks |
| Visitor Center | Buff/grey native stone veneer, clear glazing, cedar/glulam, dark standing-seam metal roof | — | USACE 2012 photos |
| Hatchery raceways | Light-grey concrete, green algae film below waterline, galvanised rails/chain-link, blue-grey aerators | ~100 ft × 8–10 ft (verify) | MDC photos |
| Conservation Center | Stone + cedar siding, metal roof | date verify | MDC |
| Bedrock outcrops/bluffs | Cotter Dolomite: grey to buff-grey, thin ledges, orange lichen and dark manganese stains, chert nodules; talus of white chert | — | MGS GeoSTRAT; field photos |
| Soil/road-cut colour | Orange-red to yellow-brown cherty clay over grey rock; white chert gravel | — | NRCS WSS |
| Forest canopy | Oak–hickory greens (dark, matte) with blue-green cedar spires; autumn russet/gold | — | NAIP imagery (leaf-on) |
| Lake water | Blue-green, clear; darker blue in channel | Secchi 3–6 m | MO DNR lake water-quality reports |
| Tailwater | Jade/green clear; white turbulence at tailrace | fog mornings | angler photo archives |
| Marina | White/grey floating docks with brown or white roofs; cream breakwater floats | — | oblique aerials |

**Geodata sources for the 3-D scene (all unverified URLs, but standard):** USGS 3DEP lidar (Missouri statewide QL2 via MSDIS: https://msdis.missouri.edu) — bare-earth DEM and building/tree heights; USGS NAIP orthoimagery (1 m / 60 cm); USGS historical single-frame aerials (EarthExplorer) for 1950s–70s site states; OpenStreetMap for roads/buildings/trails (https://www.openstreetmap.org); USACE Little Rock District GIS/Recreation maps; MoDOT NBI bridge inventory (structure on Hwy 165 over the auxiliary spillway); NRCS Web Soil Survey (https://websoilsurvey.nrcs.usda.gov); Missouri GeoSTRAT; USGS topo "Table Rock Dam" quad (current and historical editions incl. a pre-1958 edition showing the un-dammed river and the original Table Rock landform).

---

## 12. Conflicts & open questions (C-n) — ranked by modelling impact

| ID | Question | Why it matters | Current best guess (confidence) | How to resolve |
|---|---|---|---|---|
| C-1 | **Dam axis orientation and which end holds the concrete section/powerhouse.** | Everything in the scene layout hangs on this. | Axis ≈ ENE–WSW; concrete section, spillway and powerhouse at the **NE (Branson/hatchery) end**, earth embankment WSW toward the state park [M]. | One look at NAIP/OSM/Google Earth; USACE plan sheet. |
| C-2 | **Where is the namesake "Table Rock" ledge?** | Possible modelling landmark. | Either the east bluff just downstream near the hatchery, or buried under the dam/aux. spillway [L]. | Local history articles (Springfield News-Leader, KY3, White River Valley Historical Quarterly). |
| C-3 | **Does the 2.2-mi Lakeshore Trail cross the dam on the crest (lake-side walkway) or run along a lower shoreline bench?** | Crest cross-section (road + walkway width). | On the crest, lake side of Hwy 165, fenced from traffic [M]. | MO State Parks trail map; Street View on the dam. |
| C-4 | Hatchery raceway count (42 vs 48) and dimensions. | Raceway array footprint. | 48 [M]. | MDC hatchery page/brochure; count in imagery. |
| C-5 | Fate and exact site of the original Dewey Short VC; was it removed for the auxiliary spillway (c.2001–03)? | Historical scene variant; confirms aux. spillway location. | Yes, removed for the spillway; interim VC until 2012 [L]. | USACE press releases 2001–2012; Branson Tri-Lakes News archives. |
| C-6 | Routing of the hatchery's cold-water supply through the dam (dedicated conduits vs. penstock taps; intake elevation). | Small pipes/valve houses to model. | Dedicated intake ~130 ft below pool (el. ~785) with pipes through the concrete section to a valve/aeration structure at the hatchery [M/L]. | MDC hatchery description; USACE design memoranda. |
| C-7 | Location and remnants of the construction-era aggregate quarry and concrete batch plant. | Landform scars in the scene. | Near the north abutment ridge, later graded [L]. | 1950s construction photos; 1960s aerials; USACE completion report. |
| C-8 | Is there a USACE "Dam Site" park at Table Rock? | Naming/inventory. | No; the VC grounds + Moonshine Beach fill that role [M]. | USACE recreation area list. |
| C-9 | Existence/alignment of any "old Highway 165" near the dam; pre-dam roads and ferries. | Historical variant; abandoned road traces. | No distinct old alignment near the dam; 165 was built with the dam [M]. | Historic USGS topo editions (1930s–50s). |
| C-10 | Is Route 265 concurrent with 165 over the dam, and where exactly are the two junctions? | Signage/road model. | Concurrent over the dam; N junction ~1.5–2 km N, S split ~2–3 km S/SE [L]. | MoDOT route map; Wikipedia Route 265. |
| C-11 | Branson municipal water intake location on Table Rock Lake. | Small shoreline structure. | Unknown; possibly N shore between dam and Chateau [L]. | City of Branson utilities; MO DNR public water system records. |
| C-12 | Transmission circuits from the switchyard: number, voltage, owners, direction. | Tower lines are prominent in aerials. | 161 kV SWPA lines heading N/NE and E [M/L]. | SWPA system map; HIFLD transmission GIS; OSM power tags. |
| C-13 | Hwy 165 auxiliary-spillway bridge: NBI number, year, length, spans. | The only bridge in the scene. | Built 2004–05, ~500–900 ft [L]. | NBI (FHWA) download for Taney/Stone Co.; MoDOT plans. |
| C-14 | Visitor Center hard facts: architect, sq ft, cost, LEED level, contractor. | Building model fidelity. | 15–21k sq ft, $10–13M, LEED Silver/Gold [L]. | USACE press release April 2012; AIA/ENR; architect portfolios. |
| C-15 | Conservation Center construction date and materials. | Building model. | 1990s, stone/cedar [L]. | MDC. |
| C-16 | Tailwater channel width, bed, islands in first 1.5 km. | Water surface model. | ~300–450 ft, no islands [L]. | Lidar/NAIP; USACE tailwater rating. |
| C-17 | Moonshine Beach / Chateau / Showboat precise positions relative to the 3 km box. | Whether to model or treat as backdrop. | Beach edge-in; Chateau and Showboat edge-out but visible [M]. | OSM/imagery. |

---

## 13. Search log — every query attempted in this session

All ten queries below were **submitted to WebSearch and rejected with "this session has used its web search budget (200 of 200 WebSearch calls)"**; no results, URLs or summaries were returned for any of them.

| # | Query (verbatim) | Outcome |
|---|---|---|
| 1 | Dewey Short Visitor Center Table Rock Dam architect LEED square feet | not executed — budget exhausted |
| 2 | "Dewey Short Visitor Center" opened April 2012 cost million | not executed — budget exhausted |
| 3 | "Dewey Short Visitor Center" exhibits film observation deck scale model dam | not executed — budget exhausted |
| 4 | Table Rock Dam original visitor center overlook 1958 history demolished | not executed — budget exhausted |
| 5 | Shepherd of the Hills Fish Hatchery raceways number dimensions water supply Table Rock Dam pipeline | not executed — budget exhausted |
| 6 | Shepherd of the Hills Conservation Center building Branson built history Missouri Department of Conservation | not executed — budget exhausted |
| 7 | Table Rock State Park marina campground history 1959 boundaries acres | not executed — budget exhausted |
| 8 | "Table Rock Lakeshore Trail" paved 2.2 miles Dewey Short Visitor Center marina | not executed — budget exhausted |
| 9 | Highway 165 bridge auxiliary spillway Table Rock Dam 2004 2005 construction | not executed — budget exhausted |
| 10 | Missouri Route 165 Table Rock Dam roadway crest two lanes sidewalk relocation 1958 | not executed — budget exhausted |

### 13.1 Planned queries NOT run (ready to execute when budget is restored — raise CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION)

Visitor centres
11. site:swl.usace.army.mil "Dewey Short Visitor Center"
12. "Dewey Short Visitor Center" architect OR "designed by"
13. "Dewey Short Visitor Center" "square-foot" OR "square feet"
14. "Dewey Short Visitor Center" LEED
15. "Dewey Short Visitor Center" ribbon cutting 2012 site:dvidshub.net OR site:flickr.com
16. "Dewey Short" "visitor center" 1970 OR 1971 dedicated Table Rock Dam original
17. Table Rock Dam "visitor center" demolished "auxiliary spillway"
18. "Table Rock Dam" powerhouse tours resumed Dewey Short
Hatchery
19. site:mdc.mo.gov "Shepherd of the Hills" hatchery raceways
20. "Shepherd of the Hills Fish Hatchery" "130 feet" OR "48 degrees" water Table Rock Lake
21. "Shepherd of the Hills" hatchery "Outlet 1" "Outlet 2" "Outlet 3" Taneycomo
22. "Shepherd of the Hills Conservation Center" built OR opened OR renovated
23. "White River Bluff Trail" Branson hatchery miles
24. "Shepherd of the Hills" hatchery boat ramp Taneycomo access
State park / recreation
25. site:mostateparks.com "Table Rock State Park" acres established 1959
26. "State Park Marina" Table Rock "Spirit of America" catamaran
27. "White River Valley Trail System" Table Rock State Park miles loops opened
28. "Chinquapin Trail" "Table Rock State Park"
29. "Moonshine Beach" Table Rock Lake Corps of Engineers Highway 165
30. "Table Rock Lakeshore Trail" crosses dam OR "top of the dam"
31. "Showboat Branson Belle" length feet launched 1995 bananas "White River Landing"
32. "Chateau on the Lake" opened 1997 stories rooms Highway 265
33. Table Rock Lake "Dam Site" park Corps of Engineers Branson
Roads / bridges / rail
34. site:en.wikipedia.org "Missouri Route 165"
35. site:en.wikipedia.org "Missouri Route 265" Table Rock Dam concurrent
36. "Route 165" OR "Highway 165" "auxiliary spillway" bridge MoDOT Table Rock Dam 2004
37. National Bridge Inventory "Highway 165" Taney County spillway structure number
38. "Table Rock Dam" "Highway 165" opened 1958 OR 1959 road across dam
39. "Branson Scenic Railway" route map Hollister Barren Fork Galena Table Rock
40. "Lake Taneycomo" bridges "Highway 76" 1931 "Highway 65" Branson Hollister
Downstream / upstream water
41. "Lake Taneycomo" Powersite Dam 1913 elevation 701 feet 22 miles
42. "Table Rock Dam" tailwater "trophy area" "Fall Creek" mouth regulations MDC
43. "Lilleys' Landing" Taneycomo miles below dam; "Fall Creek Marina"
44. "Table Rock" rock formation namesake "White River" flat rock ledge location dam
45. Branson drinking water intake Table Rock Lake location treatment plant
46. Table Rock Lake record pool elevation 935 December 2015
Geology / soils / vegetation
47. "Table Rock Dam" foundation geology Cotter Dolomite Jefferson City grouting Corps
48. Missouri Geological Survey GeoSTRAT "Table Rock Dam" quadrangle bedrock geologic map
49. USDA NRCS soil survey Taney County Missouri Gasconade Clarksville Moko
50. "Table Rock Dam" construction aggregate quarry location batch plant 1955
51. Ozark oak-hickory redcedar dolomite glade Table Rock Lake shoreline vegetation
Utilities / security
52. Southwestern Power Administration Table Rock 161 kV transmission line Springfield Bull Shoals
53. "Table Rock Project Office" "4600 State Highway 165" Branson Corps
54. "Table Rock Dam" security restrictions no stopping powerhouse post 9/11
55. FCC ASR cell tower Branson "State Highway 165" Table Rock Dam
Climate / visual
56. Lake Taneycomo fog mornings cold water 48 degrees photography
57. Table Rock Lake water clarity Secchi depth blue-green
58. Branson Missouri climate normals precipitation snowfall fall foliage peak
Imagery / plans
59. site:commons.wikimedia.org "Table Rock Dam"
60. USACE Little Rock District Table Rock Dam plan drawing spillway powerhouse "auxiliary spillway" aerial photo

---

## 14. Estimated coordinates for scene placement (DERIVED — verify against imagery)

Derived from the bearing/distance estimates in §1 using the dam centre (36.5967, −93.3106), 1° lat ≈ 111.0 km, 1° lon ≈ 89.4 km at this latitude. **Error budget: ±300 m and ±20° — use only to seed a search window in NAIP/lidar/OSM, never as final placement.** All rows inherit the C-1 orientation assumption.

| Feature | Assumed bearing / distance | Est. lat | Est. lon | Est. ground elevation (ft) |
|---|---|---|---|---|
| Dam centre (given) | — | 36.5967 | −93.3106 | crest 947 |
| NE abutment (Branson side) | 060° / 0.98 km | 36.601 | −93.301 | 947 → hillside ~950–1,050 |
| SW abutment (state-park side) | 240° / 0.98 km | 36.592 | −93.320 | 947 → hillside ~950–1,050 |
| Powerhouse (toe of concrete section) | 060° / 0.5 km, then ~0.1 km downstream (N) | 36.600 | −93.306 | tailrace deck ~705–715 |
| Switchyard | adjacent E/NE of powerhouse | 36.601 | −93.305 | ~715–730 |
| Fish hatchery (raceway field centre) | 040° / 0.75 km | 36.602 | −93.305 | terrace ~705–720 |
| Hatchery Outlets 1–3 | along shoreline 030–045° / 0.7–1.2 km | 36.602–36.606 | −93.306 → −93.302 | ~701 (water) |
| Auxiliary spillway (chute centreline at Hwy 165 bridge) | 060° / 1.05 km | 36.601 | −93.300 | fuse-plug crest ~935–945; chute floor descends to ~705 |
| Dewey Short Visitor Center | 060° / 1.25 km | 36.602 | −93.299 | ~980–1,000 (hilltop) |
| USACE Project Office (4600 Hwy 165) | 050° / 1.5 km | 36.605 | −93.298 | ~950–1,000 |
| State Park Marina | 240° / 1.2 km | 36.591 | −93.322 | water 915 |
| Table Rock State Park office / campground core | 215° / 1.8 km | 36.583 | −93.322 | ~930–1,000 |
| White River Landing / Showboat | 205° / 2.3 km | 36.578 | −93.322 | water 915; lot ~930 |
| Moonshine Beach | 340° / 1.7 km | 36.611 | −93.317 | water 915; lot ~930 |
| Chateau on the Lake | 340° / 2.0 km | 36.614 | −93.318 | hilltop ~1,050–1,120 |
| Hwy 165 / Hwy 265 north junction | 350° / 1.7 km | 36.612 | −93.314 | ~1,000 |
| Tailwater bend (river turns E/NE) | 020° / 1.3 km | 36.608 | −93.306 | water ~701 |

**Vertical datum note:** USACE Table Rock elevations are quoted in feet NGVD29 (project datum). Lidar/3DEP products are NAVD88 — the local offset is on the order of a few tenths of a foot to ~1 ft; confirm before stacking pool levels on a lidar DEM.

---

## 15. Temporal states of the scene (for historical variants of the model)

| Period | State of the scene | Notes / confidence |
|---|---|---|
| Pre-1954 | Free-flowing White River in a wooded valley ~400–500 ft deep; the "Table Rock" ledge landmark on the bluff; no highway crossing; scattered farms/resort cabins; Lake Taneycomo (1913) already backing up to roughly this reach at ~701 ft. | [M] Use pre-1958 USGS topo edition for road/creek layout. |
| 1954–1958 construction | Cofferdams, diversion, batch plant, aggregate quarry, construction camp/roads on the NE side, cableway or trestle across the concrete section; embankment borrow from the future lake bed. | [M/L] 1950s USACE construction photos are the source; quarry location is C-7. |
| 1958–1960 | Dam and Hwy 165 open; hatchery opens (1958); lake fills to 915 (reached power pool 1959); state park opens (1959); first small visitor overlook. | [H/M] |
| 1960s–1990s | Original Dewey Short VC (named 1970s); marina and campgrounds mature; Chateau (1997) and Showboat (1995) appear on the skyline; powerhouse tours routine; transmission corridors as today. | [M] |
| 2001–2005 | Auxiliary spillway excavated through the NE abutment; Hwy 165 realigned onto a new bridge; old VC site removed; post-9/11 security fences/barriers. | [M for spillway; L for VC removal] |
| 2012–present | New Dewey Short VC (April 2012); Lakeshore Trail paved link; White River Valley Trail System; Moonshine Beach renovation; record pools 2011/2015–16/2017 with all-gate spill events. | [H/M] |

---

## 16. Viewpoint & photo-reference checklist (what to collect into `images/`)

Each viewpoint is tagged with the scene-inventory numbers (§1) it documents. All are standard tourist/agency viewpoints, so imagery is plentiful once search is restored.

1. **VC observation deck looking SW** — concrete section, spillway gates, hoist bridge, embankment beyond, lake; foreground auxiliary-spillway approach. (#1, #4, #5, #13, #14)
2. **Hwy 165 Street View across the dam (both directions)** — parapets, walkway, lane widths, signage, gate-hoist deck, view down to powerhouse. (#1, #13, #14)
3. **Hatchery raceways looking S/SW up at the dam** — powerhouse, penstock/intake section, spillway face, stilling basin, switchyard fence. (#2, #3, #8)
4. **Hatchery Outlet 1/2/3 angler photos** — outfall geometry, riprap, water colour, fog. (#9, #24)
5. **Taneycomo boat view looking upstream** — tailrace turbulence, channel width, bluffs both banks, hatchery terrace. (#24, #16)
6. **State Park Marina / campground shoreline looking NE** — full upstream (riprap) face of the embankment, crest road, VC on the far hill. (#1, #16, #17)
7. **Lake (boat) view from ~1 km upstream** — concrete section frontal elevation with intake structure, gates, log boom, hillside with VC and Chateau behind. (#1, #23, #27)
8. **Oblique aerials (Bing/Apple/USACE)** — whole site: spillway chute, Hwy 165 bridge, VC roof form, project office yard, hatchery raceway count, marina docks, beach. (all)
9. **Aux. spillway construction photos 2002–05** — chute geometry, fuse plug, bridge piers. (#4)
10. **2012 ribbon-cutting set** — VC materials, deck, plaza, signage. (#5)
11. **Historic 1950s USACE construction photos and 1960s postcards** — quarry, original VC, early roadway. (#6, C-7)
12. **Chateau on the Lake & Showboat Branson Belle exteriors** — background massing only. (#21, #23)
13. **Autumn/winter/fog seasonal sets** — foliage palette, fog depth, low-pool "bathtub ring". (§10, §11)

---

## 17. Level-of-detail guidance for the 3-D scene

| Zone (distance from dam centre) | Features | Suggested LOD |
|---|---|---|
| 0–0.7 km | Dam (concrete + embankment), spillway, powerhouse, switchyard, tailrace/stilling basin, crest road & walkway, exclusion boom | Full detail: true geometry from plans; PBR materials; gates, hoists, railings, lighting poles, signage |
| 0.7–1.5 km | Hatchery (raceways, Conservation Center, ramp, outlets), auxiliary spillway + Hwy 165 bridge, Dewey Short VC + parking, project office, marina, nearest campground loops, Lakeshore Trail, transmission towers | Medium detail: massing from lidar/OSM, facade materials per §11, raceway grid modelled individually, trees as instanced canopy from lidar heights |
| 1.5–3 km (edge) | Moonshine Beach, 165/265 junction, Chateau, showboat landing, state park office/campgrounds, tailwater bend, Long Creek mouth | Low detail / backdrop massing; terrain from DEM with NAIP drape; Chateau and Showboat as silhouette-accurate boxes |
| Beyond | Branson skyline, Big Cedar/Top of the Rock, Kimberling City | Not modelled; optional skybox/horizon haze |

Terrain: 1 m bare-earth DEM from 3DEP lidar for the whole box; overlay water surfaces as flat planes at 915 ft (lake, adjustable 910–931) and ~701–706 ft (tailwater, adjustable with generation). Canopy: use lidar first-return minus bare-earth for tree heights (typically 40–70 ft on slopes, 80–100 ft sycamores along the river).

---

## 18. Suggested next actions for the parent agent

1. Restore search budget and run §13.1 items 11, 17, 19, 30, 34–37, 44, 47–48 first — they resolve conflicts C-1, C-3, C-5, C-2, C-13 and pin the geology.
2. Pull NAIP + 3DEP lidar for the "Table Rock Dam" quad into `research/table-rock-dam/geodata/` — a single hillshade will settle the axis orientation, the aux. spillway location, channel widths and the marina/beach positions listed here as estimates.
3. Download OSM extract for the 3 km box (roads, buildings, power lines, trails, `man_made=dam`) into `geodata/` and reconcile against §1.
4. Collect the 2012 USACE ribbon-cutting photo set and MDC hatchery photos into `images/` with attribution.
5. Replace every "(unverified)" URL in this file with the URL actually returned by search, and delete any that do not resolve.

*End of file — 07-site-context-surroundings.md.*
