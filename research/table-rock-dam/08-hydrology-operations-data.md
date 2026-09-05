# 08 — Table Rock Dam: Hydrology, Reservoir Operations, Flood Events & Power Generation Data

Project: Table Rock Dam / Table Rock Lake, White River, Branson–Hollister, Taney/Stone Cos., Missouri (USACE Little Rock District, SWL).
Compiled: 2026-09-05. Research dimension 8 of 8 (hydrology / operations / floods / generation).

> **READ THIS FIRST — evidence quality of this file.**
> The session's shared WebSearch budget (200/200) was exhausted by sibling agents before this dimension ran, and the
> egress proxy returned policy denials (HTTP 403 on CONNECT) for `cwms-data.usace.army.mil`, `waterservices.usgs.gov`
> and `api.water.noaa.gov` (one probe each, not retried). The only live research channel that worked was **GitHub code
> search** (`search_code` API, fragments only — file contents were not retrievable). Roughly 85 code-search queries were
> run; the identifier/ endpoint sections below are therefore well sourced, while the flood-event chronology and record
> release values are **largely model recollection flagged "K"** and must be verified in a follow-up pass (query list
> in §11). Every value carries a confidence tag:
>
> | Tag | Meaning |
> |---|---|
> | **GH** | Text found verbatim in a public GitHub-hosted file (source path/URL given; URL is the exact `object_url` returned by the API). Third-party, but usually copied from USACE/USGS/SWPA/NID. |
> | **GH-USACE** | GitHub-hosted file that itself quotes/embeds an official USACE, USGS, SWPA or NOAA identifier string (highest confidence available here). |
> | **K** | Model recollection, not verified in this session. Treat as a hypothesis to confirm. |
> | **D** | Derived arithmetically from GH/K values (formula shown in Appendix A). |
>
> No URL in this file was invented; inferred URL *forms* are marked "(unverified)".

---

## 1. Elevation & storage reference table

Datum note: USACE SWL publishes Table Rock pool elevations in **feet NGVD29** (project datum); third-party scrapers label the SWL value `elevation_ft_ngvd29` (GH: swbailey00/boatsafeontablerock.com `api/README.md`). USGS Lake Taneycomo elevations use parameter **62615 = "Lake or reservoir water surface elevation above NGVD 1929"** (GH: Eddy dossier lists 62615 for 07053600/07053820), so all elevations in this table are NGVD29 unless stated. NAVD88 is roughly +0.2 to +0.5 ft higher in the Branson area (K — confirm with a VERTCON/NOAA conversion at 36.596 N, −93.311 W).

| Item | Value | Unit | Datum | Source / evidence | Conf. |
|---|---|---|---|---|---|
| Top of dam (crest) | 947 | ft | NGVD29 | "Full pool is 915 ft; the dam crest is 947 ft" — GH: patrickjmcd/table-rock-lake-level `src/app/page.tsx` (https://api.github.com/repositories/616501869/contents/src/app/page.tsx?ref=49e846f9f4db34e25e7b6fe0db520200c00ea6ce) | GH / K agrees |
| Structural height of dam | 252 | ft | — | "This 252 foot high impoundment" (Wikipedia-derived text, GH: Gabriel-Xu/code-estimathon FILE-007690.txt); GRanD gives 79 m = 259 ft (GH: jacksoncoldiron/EDS223-in-class-labs `week0/data/gdw.csv`) | GH (conflict, see §9) |
| Dam length | 6,423 (1,958 m) | ft | — | GRanD DAM_LEN_M = 1958 (GH gdw.csv) | GH |
| Streambed at dam (approx.) | ≈ 695 | ft | NGVD29 | D: 947 − 252 | D (low) |
| Spillway crest (10 tainter gates) | 896 | ft | NGVD29 | K (matches task brief) | K |
| Tainter gates, size | 10 gates, 45 ft wide × 37 ft high | — | — | K | K |
| Top of closed gates | ≈ 933 | ft | NGVD29 | D: 896 + 37 | D (medium) |
| Top of flood-control pool | 931.0 | ft | NGVD29 | WordPress scraper default `'max_flood_pool' => 931.00` (GH: embersyndicate-stack/wordpress-website `skc-lake-levels.php`, https://api.github.com/repositories/1100172010/contents/wp-content/plugins/skc-lake-levels/skc-lake-levels.php?ref=a52f2a48bac37c5fed91b48adaa1e5dc2a7ebfce); K agrees | GH + K |
| Top of conservation (power) pool | 915.0 | ft | NGVD29 | GH (patrickjmcd page.tsx); Eddy notes "Table Rock's pool reads 916 ft" (usace.ts) and dossier reading 914.4 ft | GH |
| Bottom of conservation pool / top of inactive pool | ≈ 881 | ft | NGVD29 | K (low confidence — verify on SWL pertinent-data page) | K (low) |
| Auxiliary spillway (2005, RCC overflow, north/left abutment) crest | not established | ft | — | Wikipedia-derived text: "When the reservoir is above the maximum flood pool, excess water goes over the auxiliary overflow spillway at the north end of the dam" (GH FILE-007690.txt). Crest elevation not found; see §9 | open |
| Maximum design / PMF pool | not established | ft | — | K: on the order of 941–943 ft; verify | open |
| Total storage at top of flood pool (931) | 3,462,000 (4,270.3 MCM) | acre-ft | — | GRanD CAP_MCM = 4270.3 (GH gdw.csv); D conversion; matches K | GH + D |
| Storage at top of conservation pool (915) | 2,702,000 (3,332.9 MCM) | acre-ft | — | GRanD CAP_REP = 3332.9 (GH gdw.csv); D conversion | GH + D |
| Flood-control storage (915→931) | 760,000 | acre-ft | — | D: 3,462,000 − 2,702,000; matches K ("760,000 ac-ft") | D |
| Conservation (power) storage | ≈ 2,046,000 | acre-ft | — | K (implies inactive/dead ≈ 656,000 ac-ft); verify | K (low) |
| Surface area at 915 | 43,100 | acres | — | K; corroborated loosely by "43,000+ acres" (GH: garrett-ham-38336 resort site), "over 43,000 acres" (GH: Yajjay3/Hobby-Drop), Currents app 170 km² (=42,000 ac) | K + GH(loose) |
| Surface area at 931 | ≈ 52,300 | acres | — | K | K |
| GRanD polygon area | 118.1 km² (29,185 ac) | — | — | GH gdw.csv AREA_SKM (SWBD polygon — much smaller than pool area; do not use for rendering) | GH (not pool area) |
| Shoreline length | 745 (at 915) / 779 / 800–850 | miles | — | 745 mi — K (USACE figure at conservation pool); "779 miles of shoreline" — Recreation.gov text (GH: makecamp/open-camping-data MO geojson files); "over 800"/"850" — marketing (GH) | K / GH |
| Lake length | ≈ 79 | miles | — | K | K |
| Maximum depth | ≈ 220 (67 m) | ft | — | Currents app seed `maxDepthM: 67` (GH: PndaMan/Currents WaterbodySeedData.swift); "depths exceeding 200 feet" (GH resort site) | GH |
| Mean depth at 915 | ≈ 63 | ft | — | D: 2,702,000 ac-ft ÷ 43,100 ac | D |
| Drainage area at dam | 4,020 (10,412 km²) | sq mi | — | GRanD CATCH_REP = 10412 km² (GH gdw.csv); RiverGages attribute "Drainage:10395km2" (GH: RopeWiki/RWServer `rw/wf/COERG.csv`); GRanD CATCH_SKM 10,339 | GH |
| Mean annual inflow / discharge | ≈ 5,220 (GRanD) or ≈ 4,270 (RiverGages) | cfs | — | GRanD DIS_AVG_LS = 147,921 L/s (=5,224 cfs); COERG "AvgFlow:4273cfs" | GH (two estimates) |
| Degree of regulation | 91.5 | % | — | GRanD DOR_PC (GH gdw.csv) | GH |
| Mean basin precipitation | 1,113 mm (43.8 in) | — | — | COERG "AvgPrecip:1113mm AvgTemp:14C" (GH) | GH |
| Year completed / first power | 1958 dam; 1959 power (GRanD "Built 1959") | — | — | Wikipedia text "constructed in 1954-1958"; GRanD YEAR = 1959 | GH |
| NID ID | MO30202 | — | — | GH: kalchikee/dam-failure-explorer `web/data/top_risk_dams.json` (nid_id "MO30202", name "Table Rock Dam", county Taney, city BRANSON) | GH |
| GRanD ID | 1026 | — | — | GH gdw.csv (GRAND_ID field = 1026) | GH |
| Dam coordinates (CWMS `Table_Rock_Dam`) | 36.5953888, −93.3110611 | deg | WGS84 | GH-USACE: Eddy dossier quoting CWMS `/locations?office=SWL` | GH-USACE |
| Dam coordinates (GRanD) | 36.597936, −93.311648 | deg | — | GH gdw.csv | GH |

---

## 2. Historical extremes & records

| Record | Value | Date | Evidence | Conf. |
|---|---|---|---|---|
| **Record high pool** | **935.47 ft** | **27 Apr 2011** | "Record peak was 935.47 ft on Apr 27, 2011." — GH: patrickjmcd/table-rock-lake-level `src/app/page.tsx` (hobbyist app that scrapes the SWL table; author likely took the value from USACE). K agrees that the April–May 2011 event set the record (~935.5 ft); exact crest date (27 Apr vs. early May) needs confirmation from SWL. | GH (single source) |
| Second-highest pool (K) | ≈ 933.5–934.5 ft | ~3–5 May 2017 | K — verify | K |
| Other pool crests above flood pool 931 (K) | Jan 2016 (~931–932 after Dec 26–28 2015 storm); Apr 2008 (~930–931); May–Jun 2019 (~930–931); Apr–May 2025 (~929–931) | — | K — verify each on SWL historical data | K |
| Record low pool | not established (K: ~ 900–905 ft during 1980 / 2006–2007 / 2012 droughts) | — | K | open |
| Record inflow | not established (K: order of 200,000+ cfs peak, 25–26 Apr 2011) | — | K | open |
| Record total release | not established (K: order of 60,000–75,000 cfs; candidates Apr–May 2011, late Dec 2015–Jan 2016, May 2017; see §3) | — | K | open |
| Largest measured powerhouse discharge (recent, verified) | 5,270 cfs (30-hr window, Aug 2026); "measured at 6,760 cfs on the same day" (another day); 3 units at 9,653 cfs (news column) | 2026 / undated | GH-USACE: Eddy dossier (CWMS `Flow-Plant` series); GH: CC-News column (see §3) | GH |
| Rated full-power discharge, 4 units | 15,100 cfs | — | GH-USACE: SWPA schedule fixture "12 TRD Table Rock Missouri 4 230 15,100" (https://api.github.com/repositories/1093896714/contents/missouri-float-planner/src/lib/usace/__fixtures__/swpa-mon-2026-07-27.txt?ref=27c4d6ed8286c28d5683a6c3b045a48c97e57c3c) | GH-USACE |
| Lake Taneycomo record stage at Branson | not established (K: 2011 and 2017 both flooded Branson Landing; 2011 likely higher) | — | K | open |
| USACE flood damages prevented | not established | — | — | open |

---

## 3. Release events chronology

Columns: pool peak (ft NGVD29), gates/openings, peak total release (cfs), Taneycomo response, media. Rows marked **K** are recollection-level and unverified; rows marked **GH** cite a found fragment. Numbers in K rows are order-of-magnitude placeholders for the animator, not data.

| Date range | Pool peak (ft) | Gates / openings | Peak release (cfs) | Taneycomo stage / effect | Media / evidence | Conf. |
|---|---|---|---|---|---|---|
| 1957–1959 | — | — | — | Lake filled; first power 1959 | GRanD "Built 1959"; Wikipedia text 1954–1958 construction (GH) | GH |
| Spring 1973 | > 931? | spillway used | ? | first major flood-pool operation of the project (K) | none found | K |
| Dec 1982 | high | gates opened (K) | ? | Ozarks regional flood | none found | K |
| 1985 / May 1990 / 1993 | into flood pool | some spillway use (K) | ? | — | none found | K |
| Mar–Apr 2008 | ≈ 930–931 | multiple gates (K) | ≈ 30,000–50,000 (K) | Taneycomo high, docks flooded (K) | none found | K |
| **19 Apr – mid-May 2011** | **935.47 (27 Apr 2011, GH)** | all 10 gates opened (K), openings on the order of 4–6 ft (D from weir/orifice estimate, App. A) | ≈ 60,000–75,000 (K) | Branson Landing flooded; record Taneycomo stage (K) | record value GH (patrickjmcd); rest K | GH + K |
| Aug 2013 | ≈ 920s | few gates briefly (K) | small | — | none found | K |
| May–Jun 2015 | ≈ 925–928 | gates (K) | ≈ 20,000–40,000 (K) | — | none found | K |
| 26 Dec 2015 – Jan 2016 | ≈ 931–932 (K) | all 10 gates (K) | ≈ 50,000–70,000 (K) | Branson Landing flooded 28–31 Dec 2015 (K) | none found | K |
| 29 Apr – May 2017 | ≈ 933.5–934.5 (K) | all 10 gates (K) | ≈ 50,000–65,000 (K); constrained by Bull Shoals being at/near its own record (K) | Branson Landing flooded (K) | none found | K |
| Undated winter day (CC-News era 2016–2019) | ≈ 920s? | "four chutes" / "five floodgates" open | **9,653 cfs from 3 generators + 5,100 cfs from 5 floodgates = 14,753 cfs total** | "high-water conditions on Taneycomo" | Kenneth Kieser column (The Examiner) in CC-News corpus — GH: DarshanAdiga/idiom-principle-on-magpie-corpus `data/cc_news_data_option1/output/45idioms.txt` (https://api.github.com/repositories/513645154/contents/data/cc_news_data_option1/output/45idioms.txt?ref=2ec2dee3c5fcb148bf026acc229b4f1af9b36732) | GH |
| May–Jul 2019 | ≈ 930–931 (K) | many gates for weeks (K) | ≈ 30,000–55,000 (K) | prolonged high Taneycomo (K) | none found | K |
| 2020 (Jan–Mar) | ≈ 920–925 (K) | few gates (K) | small–moderate | — | none found | K |
| Apr–Jun 2025 | ≈ 929–931 (K) | gates opened Apr; "June 2025 releases" per task brief | ≈ 30,000–50,000 (K) | — | none found | K |
| 2026 (to Sep) | pool 914.4 ft on dossier date (late Aug 2026), no spill; releases 20→5,270 cfs turbine only | 0 gates | ≤ 5,270 (turbine) | tailwater 703→708 ft | GH-USACE: Eddy dossier (CWMS) | GH-USACE |

**Auxiliary spillway usage:** no evidence of it ever passing water. The Wikipedia-derived sentence (GH) says it operates only "above the maximum flood pool". If its crest were at/below 935.47 ft it would have operated in 2011 — this is the single most important elevation to verify (§9).

---

## 4. Operations rules & generation

### 4.1 Powerhouse
| Item | Value | Evidence | Conf. |
|---|---|---|---|
| Units | 4 Francis units | SWPA table "Number of Units 4" (GH-USACE fixture); Eddy "four-unit powerhouse" | GH-USACE |
| Total plant capacity (SWPA, current) | **230 MW** (≈ 57.5 MW/unit) | SWPA fixture line "TRD Table Rock Missouri 4 230 15,100" | GH-USACE |
| Original nameplate | 200 MW (4 × 50 MW) | K (task brief agrees) — uprating history to verify | K |
| Approx. full-power discharge | **15,100 cfs** (≈ 3,775 cfs/unit) | SWPA fixture | GH-USACE |
| MW → cfs conversion (full load) | ≈ 65.7 cfs per MW | D: 15,100 / 230 | D |
| Part-load check | SWPA 35 MW scheduled ⇒ est 2,298 cfs vs CWMS measured 2,463–2,629 cfs (2026-07-27); ⇒ ≈ 70–75 cfs/MW at low load | GH-USACE: Eddy `swpa.ts` comment | GH |
| Idle leakage through turbines | ≈ 20 cfs (CWMS `Flow-Plant` when 0 MW scheduled, "always") | GH-USACE: Eddy | GH-USACE |
| Generation floor used by third parties | 100 cfs ("generationOnCfs: 100") | GH: Eddy usace-registry.ts | GH |
| Ramp behaviour | ramp hours −41 % to +117 % off schedule "because units spin up partway through the hour" | GH: Eddy | GH |
| Station-service "house unit" | CWMS location `Table_Rock_Dam-House_Unit` (36.5964138, −93.3103944) | GH-USACE: Eddy dossier | GH-USACE |
| Per-unit CWMS locations | `Table_Rock_Dam-Turbine1..4`, 36.5961–36.5966 N / −93.3100 to −93.3102 W ("separately surveyed") | GH-USACE: Eddy dossier | GH-USACE |
| EIA plant ID | **2166** ("Table Rock", NERC region SPP) | GH: NETL-RIC/ElectricityLCI `electricitylci/data/hydropower_plant.csv` row "337,2166,Table Rock,SPP,471456.0"; NETL-RIC/elci-scenario-modeler `inputs/emmr_crosswalk.csv` "2166,Table Rock,18" | GH |
| Annual net generation (eLCI baseline year, prob. 2016) | 471,456 MWh (471 GWh) | same NETL file | GH (year K) |
| Capacity factor | ≈ 23 % at 230 MW; ≈ 27 % at 200 MW | D | D |
| Typical annual range | ≈ 350–650 GWh depending on hydrology (wet years, spill years higher) | K | K |

### 4.2 Scheduling & dispatch
* Power is marketed by **Southwestern Power Administration (SWPA)**; SWPA posts a **weekday hourly generation schedule** (MW by hour for 18 projects, incl. TRD) at `https://www.energy.gov/swpa/{mon,tue,wed,thu,fri,sat,sun}.htm` (GH-USACE: Eddy `swpa.ts`; ~42 KB static HTML, header dated e.g. "MONDAY AUGUST 24, 2026"; 18 columns BBD DEN KEY FGD WFD TKD EUF RSK OZK DAD BEV TRD BSD NFD GFD STD HST CAN).
* Pattern (K): peaking — units on for morning and evening peaks, off overnight; multi-unit daytime blocks in summer/winter; near-continuous generation when the lake is in flood pool (flood evacuation via powerhouse first, then spillway).
* Recorded phone lines: USACE Table Rock lake/generation line **417-336-5083** ("lake level, units running and current cfs" — GH: Eddy dossier); project/SWPA info line **866-494-1993** (GH: Eddy registry `infoPhone`).
* Third-party validation: "idle hours are EXACT (0 MW scheduled matched ~20 cfs leakage every time); steady generation lands within ~10 %" (GH: Eddy).

### 4.3 Water-control plan (K unless noted)
* Table Rock is operated as part of the **White River multi-reservoir system** (Beaver → Table Rock → Bull Shoals, plus Norfork and Greers Ferry). Flood storage is evacuated "as fast as downstream conditions allow", with releases balanced among lakes by percentage of flood storage occupied, and regulated to downstream control points on the White River — Newport, AR (K: regulating stage ≈ 21 ft; flood stage 26 ft), with Calico Rock/Batesville/Georgetown also watched. **Verify on the SWL water-control site.**
* Preferred release path: powerhouse (≤ 15,100 cfs) first; spillway tainter gates when the pool is in flood pool and downstream capacity exists; gates are typically opened symmetrically in small increments (K).
* CWMS publishes `%-Flood Pool` for the headwater (`Table_Rock_Dam-Headwater.%-Flood Pool.Inst.1Hour.0.CCP-Comp`, GH-USACE) — a ready-made animation driver.
* **Minimum flow:** *no minimum-flow release exists at Table Rock* — "No `Flow-Min_Flow` series exists at Table Rock. Bull Shoals has one; this project does not" and "no minimum-flow supplement series exists at this project" (GH-USACE: Eddy dossier). Idle release is the ~20 cfs turbine leakage (plus hatchery/house-unit water, K). The 2005–2007 Corps/MDC Lake Taneycomo minimum-flow study (K: ≈ 700 cfs proposal) was never implemented (consistent with the CWMS evidence). Bull Shoals' minimum flow is "near 800 cfs" (GH: Eddy migration note), for contrast.
* **Turbine venting / dissolved oxygen (K):** Table Rock is a documented USACE/TVA turbine-venting (hub-baffle / vacuum-breaker aeration) site to raise tailwater DO in late summer–fall; verify the Harshbarger et al. references. Observed: DO **5.1 mg/L** immediately below the dam vs **9.2 mg/L** at School of the Ozarks ten miles down (GH: Eddy usace-registry comment, Aug 2026); "the release comes out oxygen-poor and re-aerates as it moves" (GH: EDDY_KNOWLEDGE.md).
* **Release temperature:** CWMS `Table_Rock_Dam-Tailwater.Temp-Water` read **53.6 °F (range 52–54 °F over 30 h, Aug 2026)** (GH-USACE); USGS 07053450 latest 11.9 °C (53.4 °F) in the dossier table; "about 53 °F in August" (GH). K: annual range ≈ 45–58 °F, coldest Feb–Apr, warmest Nov–Dec after fall mixing; Taneycomo "58 °F maximum" (Wikipedia-derived, GH).

---

## 5. Real-time data identifiers

### 5.1 USACE Little Rock District water-control web tables (SWL-WC)
| Service | ID / page | URL (exact, as found in GH scrapers) | Parameters / format |
|---|---|---|---|
| SWL tabular, Table Rock (30-day) | `tabrock` | https://www.swl-wc.usace.army.mil/pages/data/tabular/htm/tabrock.htm | 8 whitespace-separated fields per data row (GH: patrickjmcd/lake-info `lake_level.py` `len(data) == 8`): Date, Time, Elev (ft), Tailwater (ft), Generation (MWh), Turbine release (cfs), Spillway release (cfs), Total release (cfs) — column names K, field count GH; third-party parsers store `level, turbineReleaseRate, spillwayReleaseRate, totalReleaseRate` (GH: patrickjmcd `src/lib/level.ts`) and "elevation, tailwater, release" (GH: skc-lake-levels readme) |
| SWL tabular, Table Rock 7-day | `tab7d` | https://www.swl-wc.usace.army.mil/pages/data/tabular/htm/tab7d.htm | same layout (GH: patrickjmcd/lake-info `tablerock.go`, swbailey00 PHP) |
| Beaver Lake | `beaver` | https://www.swl-wc.usace.army.mil/pages/data/tabular/htm/beaver.htm | GH: jnkilgo/Chain-of-Lakes-Monitoring `fetch_lake_data.py` |
| Bull Shoals | `bulsdam` | https://www.swl-wc.usace.army.mil/pages/data/tabular/htm/bulsdam.htm | same |
| James River at Galena (inflow) | `galena` | https://www.swl-wc.usace.army.mil/pages/data/tabular/htm/galena.htm | same |
| Kings River at Berryville (inflow) | `berryvil` | https://www.swl-wc.usace.army.mil/pages/data/tabular/htm/berryvil.htm | same |
| White River near Fayetteville (Beaver inflow) | `fayettev` | https://www.swl-wc.usace.army.mil/pages/data/tabular/htm/fayettev.htm | same |
| War Eagle Creek at Hindsville | `hindsvil` | https://www.swl-wc.usace.army.mil/pages/data/tabular/htm/hindsvil.htm | same |
| Note | — | Scrapers logged `SSLV3_ALERT_HANDSHAKE_FAILURE` from this host in 2025–2026 (GH: jnkilgo logs) — the site is picky about TLS clients; use a modern TLS stack / browser UA. | |
| Pertinent-data page | — | (unverified) https://www.swl-wc.usace.army.mil/pages/data/pertinent/ … — not found this session | |

### 5.2 USACE CWMS Data API (RADAR/CDA) — office `SWL`
Base: `https://cwms-data.usace.army.mil/cwms-data` ; header `Accept: application/json;version=2` ; no API key (GH-USACE: Eddy `cda.ts`). Endpoints: `/locations?office=SWL`, `/catalog/TIMESERIES?office=SWL&like=Table_Rock_Dam.*` (the `like` is a regex and needs the trailing `.*`), `/timeseries?office=SWL&name=<tsid>&begin=…&end=…`. CWMS serves "roughly a week of hourly" data per request (GH). **Blocked from this sandbox (policy 403) — usable from a normal network.**

| Logical metric | CWMS time-series ID (verified live by third party, Aug 2026) | Unit | Notes |
|---|---|---|---|
| Pool elevation | `Table_Rock_Dam-Headwater.Elev.Inst.1Hour.0.Decodes-rev` | ft | read 914.4 ft on dossier date |
| % of flood pool | `Table_Rock_Dam-Headwater.%-Flood Pool.Inst.1Hour.0.CCP-Comp` | % | "Table Rock's 0 %" in tests |
| Total release (outflow) | `Table_Rock_Dam.Flow-Res Out.Ave.1Hour.1Hour.Regi-Comp` | cfs | 30 pts, 20 → 5,270 cfs |
| Turbine (plant) flow | `Table_Rock_Dam.Flow-Plant.Ave.1Hour.1Hour.CCP-Comp` | cfs | tracks release exactly when not spilling |
| Inflow (6-h running avg) | `Table_Rock_Dam.Flow-Res In.Ave.1Hour.1Hour.6hr-RunAve-A2W` | cfs | template from registry |
| Tailwater elevation | `Table_Rock_Dam-Tailwater.Elev-Downstream.Inst.1Hour.0.Decodes-rev` | ft | 703 → 708 ft over 30 h |
| Tailwater temperature | `Table_Rock_Dam-Tailwater.Temp-Water.Inst.1Hour.0.Decodes-rev` | °F | 53.6 °F |
| Minimum flow | (none — `Flow-Min_Flow` series does not exist at this project) | — | GH-USACE |
| Spillway / gate series | not discovered; Bull Shoals exposes `Bull_Shoals_Dam-Tainter_Gate_11`, so `Table_Rock_Dam-Tainter_Gate_1..10` sub-locations are plausible (unverified) — query the catalog with `like=Table_Rock_Dam-.*` | | open |

CWMS locations (GH-USACE, from `/locations?office=SWL`): `Table_Rock_Dam` 36.5953888/−93.3110611; `Table_Rock_Dam-Tailwater` 36.5950454/−93.3069401; `Table_Rock_Dam-Turbine1..4` 36.5961–36.5966/−93.3100…−93.3102; `Table_Rock_Dam-House_Unit` 36.5964138/−93.3103944; `Table_Rock_Dam-Tailwater_Right_Bank` (publishes 0.0/0.0 — bad coords).
Source: https://api.github.com/repositories/1093896714/contents/missouri-float-planner/scripts/ingestion/dossiers/verified-identifiers-tailwater-swl-table-rock-dam.md?ref=27c4d6ed8286c28d5683a6c3b045a48c97e57c3c and https://api.github.com/repositories/1093896714/contents/missouri-float-planner/src/lib/flow-providers/usace-registry.ts?ref=27c4d6ed8286c28d5683a6c3b045a48c97e57c3c

### 5.3 USGS NWIS sites (GH, multiple independent copies of NWIS metadata)
| Site no. | Name | Lat / Lon (NAD83) | Parameters | Notes |
|---|---|---|---|---|
| 07053450 | White River bl Table Rock Dam near Branson, MO | 36.5950631 / −93.3090721 | 00010 temp, 00095 spec. cond., 00300 DO (no discharge) | gage altitude 741 ft NAVD88; HUC 11010003; NWIS record 1974-10-23 → ; "DO sensor lives, the thermistor does not" (temp last Jan 2025 as of Aug 2026 — GH Eddy route.ts) |
| 07053600 | Lake Taneycomo at School of the Ozarks, MO | 36.6173333 / −93.24275 | 00010, 00095, 00300, **62615** lake elevation (NGVD29) | altitude 696.52 ft NAVD88; read 701.42 ft, 12.7 °C, 9.2 mg/L |
| 07053700 | Lake Taneycomo at Branson, MO | 36.6358955 / −93.2146255 | WQP lake site (phosphorus etc.) | https://www.waterqualitydata.us/data/provider/NWIS/USGS-MO/USGS-07053700/ (GH: st3powers/waterqualusa_data) |
| 07053820 | Lake Taneycomo at Ozark Beach Dam, MO | 36.65961 / −93.12586 (36°39′34.6″N 93°07′33.1″W) | 62615 | read 701.00 ft |
| 07053690 | Turkey Creek near Hollister, MO | — | 00060 flow, 00065 stage | tributary to Taneycomo |
| 07053810 | Bull Creek near Walnut Shade, MO | — | 00060, 00065 | tributary to Taneycomo |
| 07049691 | White River at Beaver Dam near Eureka Springs | 36.4208333 / −93.8472222 | — | upstream release from Beaver |
| 07052250 | James River near Boaz, MO | 37.0065833 / −93.3646667 | WQ | James arm inflow (upper) |
| 07050700 (K) | James River at Galena, MO | — | flow | principal inflow gauge (K number; SWL page `galena.htm` GH) |
| 07050500 (K) | Kings River near Berryville, AR | — | flow | principal inflow gauge (K number; SWL page `berryvil.htm` GH) |
| 07054501 / 07054502 / 07054527 | White River at/below Bull Shoals Dam | — | — | downstream project |

### 5.4 NWS / SHEF / USACE RiverGages identifiers
| ID | Name (as listed) | Source | Notes |
|---|---|---|---|
| **FORM7** | "Table Rock Dam" (SWT SHEF list) / "White River at Table Rock Dam - HW & TW" (RiverGages) / "Table Rock Lake" (NWS-based iOS app, lat 36.5961 lon −93.3097, waterbody White River) | GH: ulmo-dev/ulmo `test/files/usace/swtwc/shefids.html` and `test/files/usace/rivergages/get_stations.cfm`; GH: FishheadNate/FloodNotice-iOS `gage-stations-iOS.json`; RopeWiki COERG.csv "COERG:FORM7 … HT=1 … Drainage:10395km2 AvgFlow:4273cfs" | headwater + tailwater; NWPS gauge page likely `FORM7` (unverified) |
| SOGM7 | White River at School of Ozarks nr Branson | GH: ulmo shefids.html | ≈ USGS 07053600 |
| PSZM7 | Lake Taneycomo at Ozark Beach Power House | GH: ulmo shefids.html | ≈ USGS 07053820 |
| BBCM7 | Bull Creek at Branson | GH: ulmo rivergages get_stations.cfm | |
| RCBM7 | "Branson" (lat 36.6522) | GH: FloodNotice-iOS | probably Roark Creek at Branson (K) |
| BEADO | White River below Beaver Dam (WQ) | GH: ulmo rivergages | |
| Taneycomo at Branson NWS LID | not found | — | open (§9) |
| RiverGages page form | `/webdata/gagedata/FORM7.current.html` on the SWT water-control host (host unverified) | GH: ulmo shefids.html | |

### 5.5 SWPA generation schedules
* `https://www.energy.gov/swpa/mon.htm` … `sun.htm` (GH-USACE, Eddy). Table header: "Lake No. | Abbrev. | Project | State | Number of Units | Total Plant Capacity (MW) | Approx. Full Power Discharge (CFS)"; Table Rock row: **12 | TRD | Table Rock | Missouri | 4 | 230 | 15,100**. Neighbours: 11 BEV Beaver 2 / 128 / 8,800; 13 BSD Bull Shoals 8 / 391 / 26,400; 14 NFD Norfork 2 / 92 / 7,200; 15 GFD Greers Ferry 2 / 110 / 7,900.
* Older form (unverified): https://www.swpa.gov/generationschedules.aspx

### 5.6 Other feeds
| Service | ID | Notes |
|---|---|---|
| NOAA COOP / GHCN-Daily station "TABLE ROCK DAM, MO US" | **USC00238252** | 36.5939 / −93.3117, elev 286.5 m (940 ft — on the dam/visitor-center bench); monthly precip normals in file: Jan 2.51, Feb 2.54, Mar 5.02, Apr 5.54, May 6.28, Jun 4.02 in (GH: amcneil36/amcneil36.github.io `USC00238252.csv`); EPA D4EM list gives 1990–2020 mean annual precip 55.87 in (GH: USEPA/Data-Processing-for-SWC-and-SWMM-CAT `2021_D4EM_PREC_updated.txt`) — high vs COERG 43.8 in; treat with caution |
| Lilleys' Landing daily Taneycomo report (logs generation/units) | — | no scraper found on GitHub; URL (unverified) https://lilleyslanding.com |
| Ozark Anglers forum reports | — | none found |
| MDC Shepherd of the Hills Hatchery | — | none found |
| Hobby dashboards that mirror the SWL table | patrickjmcd/table-rock-lake-level (Next.js), patrickjmcd/lake-info (Go/Python CLI), swbailey00/boatsafeontablerock.com (PHP; also parses an NWS Springfield daily lake summary with regex `Table\s*Rock\s*Lake.*?(\d{3,4}\.\d)\s*feet`), embersyndicate-stack/wordpress-website (WP plugin), jnkilgo/Chain-of-Lakes-Monitoring, BrainsyETH/Eddy (CWMS + SWPA, best documented) | all GH |

---

## 6. Tailwater & downstream

| Item | Value | Evidence | Conf. |
|---|---|---|---|
| Lake Taneycomo — what it is | 22–23 mi impoundment between Table Rock Dam and Powersite (Ozark Beach) Dam at Forsyth; Powersite built 1913 (NID MO30088, "Lake Taneycomo", built 1913 — GH: hurstaa/ResNet `resnet_attributes_old.csv`); riverine/wadeable near the dam, flat-water toward Forsyth | GH | GH |
| Reach length | 23.11 mi (Eddy geometry, 71 vertices) / "22 miles" (K) | GH | GH |
| Taneycomo pool elevation | ≈ 701 ft NGVD29: 701.00 at Ozark Beach Dam (07053820), 701.42 at School of the Ozarks (07053600) | GH (USGS 62615 readings) | GH |
| Tailwater at Table Rock, idle | ≈ 702.6–703 ft | CWMS `Elev-Downstream` 702.60 (2026-08-12) and 703 (dossier) | GH-USACE |
| Tailwater at ~5,270 cfs | ≈ 708 ft | dossier "703 → 708 ft over 30 hours" coincident with release 20 → 5,270 cfs | GH-USACE |
| Tailwater at full 4-unit generation | ≈ 710.8 ft (swing **8.19 ft**: 702.60 → 710.79, measured 2026-08-12 over 48 h) | GH: Eddy TAILWATER_PLAN.md / DamStateCard | GH-USACE |
| Rough tailwater rating (3 points) | 0–20 cfs → 702.6; 5,270 → 708.0; 15,100 → 710.8 ft (concave; ≈1 ft per 1,000 cfs at low flow) | D from above | D |
| Gross head | ≈ 212 ft idle (915 − 702.6) → ≈ 204 ft at full load (915 − 710.8) | D | D |
| Stage rise rate | "water can come up feet in minutes; the dam sounds a horn before it starts" (GH: EDDY_KNOWLEDGE.md) | GH | GH |
| Powersite (Ozark Beach) Dam | Liberty Utilities hydro; crest/normal pool ≈ 701 ft (from USGS reading); capacity ≈ 16 MW (K) | GH / K | K |
| Taneycomo temperature | 48 °F near dam typical, max ~58 °F (Wikipedia-derived text, GH); 53–54 °F Aug 2026 (CWMS) | GH | GH |
| DO gradient | 5.1 mg/L below dam → 9.2 mg/L at School of the Ozarks (Aug 2026) | GH | GH |
| Branson Landing flooding threshold | not established (K: Taneycomo stage ≈ 712–715 ft at Branson floods the Landing boardwalk) | — | open |
| Downstream system constraint | White River at Newport, AR regulating stage (K ≈ 21 ft) | K | open |

---

## 7. Hydrology & water quality notes

* **Inflows:** principal tributaries White River (from Beaver Dam), James River (Galena), Kings River (Berryville), Long Creek, Roaring River (K). SWL posts Galena and Berryville tables (GH URLs in §5.1). GRanD mean discharge 5,224 cfs ≈ 3.78 M ac-ft/yr (D).
* **Evaporation / sedimentation:** no bathymetric or sedimentation study surfaced in GitHub-hosted text (K: USGS/USACE 2000s bathymetry; RESSED database entry for Lake Taneycomo exists — GH ResNet cites `https://water.usgs.gov/osw/ressed/` as source for MO30088).
* **Water clarity (for rendering):** K — main-lake Secchi typically 2–5 m (clear, blue-green), James River arm 1–2 m (greener, more productive); LMVP / MDC data should be pulled. Resort text: "crystal-clear Ozarks reservoir" (GH).
* **Thermal structure (K):** summer surface 80–86 °F, thermocline ≈ 25–40 ft, hypolimnion 45–52 °F; deep power intakes → cold releases year-round; fall turnover Nov–Dec; late-summer hypolimnetic DO depletion → low-DO releases Sep–Nov (matches the 5.1 mg/L reading).
* **Precipitation:** basin mean 1,113 mm/yr (COERG, GH); Table Rock Dam COOP station monthly normals above.

---

## 8. Photo / video leads (no verified URLs obtained)
Nothing image-specific could be retrieved without WebSearch. Known vantage points to target in the follow-up (from Recreation.gov text found on GitHub: "Table Rock Lakeshore Trail, about 2 miles long, runs from the Dewey Short Visitor Center to the Table Rock State Park Marina"):
1. Dewey Short Visitor Center overlook (south end of dam, MO-165) — classic all-gates-open shots (2011, Dec 2015, 2017, 2019, 2025).
2. MO-165 across the dam crest; the powerhouse access road / Shepherd of the Hills Hatchery below the dam (gate spray).
3. USACE Little Rock District Facebook album posts (search strings: "Table Rock Dam" "spillway" 2011 / "December 2015" / "May 2017" / "June 2025"; site:facebook.com/littlerockusace).
4. KY3 / OzarksFirst / Branson Tri-Lakes News drone video ("Table Rock Dam spillway drone").
5. Kenneth Kieser / The Examiner column (CC-News) describing 3 units + 5 gates = 14,753 cfs (text found, GH; original URL not in fragment).

---

## 9. Conflicts & open questions

1. **Auxiliary spillway crest elevation** — unknown. If ≤ 935.47 ft it must have operated in April 2011; K says it never has. Highest-priority verification (SWL dam-safety fact sheet, 2005 project description).
2. **Record pool date** — 935.47 ft on 27 Apr 2011 (GH, single hobbyist source) vs K memory of a crest in early May 2011. Confirm from SWL "historical" tables; also get the 2017, Jan-2016, 2008, 2019, 2025 crests.
3. **Record release** — not found. Candidates: Apr–May 2011, Dec 2015–Jan 2016, May 2017. Need SWL daily tables or Corps press releases with cfs and gate openings.
4. **Dam height** — 252 ft (NID/Wikipedia, GH) vs GRanD 79 m (259 ft). Use 252 ft (NID) with crest 947 ⇒ streambed ≈ 695.
5. **Plant capacity** — SWPA lists 230 MW (GH-USACE) vs 200 MW nameplate (K). Both likely true (uprated units); confirm uprate dates and per-unit ratings.
6. **Surface area** — 43,100 ac at 915 (K) vs GRanD 29,185 ac polygon vs Currents app 42,000 ac. Use 43,100 / 52,300 (K) pending SWL pertinent data.
7. **Shoreline** — 745 (K, USACE at 915) vs 779 (Recreation.gov text, GH) vs 800–850 (marketing).
8. **Bottom of conservation pool / dead storage** — 881 ft and ≈ 656,000 ac-ft are K-low.
9. **Datum** — SWL pool elevations NGVD29 (per scraper label) and USGS 62615 NGVD29; confirm whether SWL has migrated Table Rock to NAVD88 (the `Decodes-rev` series carry no datum in their IDs).
10. **NWS LIDs** — FORM7 confirmed for Table Rock Dam (HW & TW); Taneycomo-at-Branson LID unknown; RCBM7 assumed Roark Creek.
11. **USGS inflow site numbers** 07050700 (Galena) and 07050500 (Berryville) are K.
12. **Mean annual precipitation** at the dam: 55.87 in (EPA D4EM 1990–2020) vs 43.8 in (COERG basin mean) — different footprints/periods; verify with NOAA normals.
13. **Spillway design discharge** — K: ≈ 550,000 cfs at max design pool; weir estimate at 931 ft with all gates fully open ≈ 363,000 cfs (Appendix A).
14. **Minimum-flow history** — CWMS shows none today (GH-USACE); the 2005–2007 study outcome should be documented from SWL/MDC sources.
15. **CC-News column date** (3 units 9,653 cfs + 5 gates 5,100 cfs) — undated in fragment; CC-News spans ~2016–2019.

---

## 10. Search log (every query run this session)

### 10.1 WebSearch (all refused — session budget 200/200 already consumed by sibling agents)
1. `Table Rock Dam pertinent data top of flood control pool 931 conservation pool 915 spillway crest elevation storage acre-feet`
2. `site:swl.usace.army.mil Table Rock Lake pertinent data elevation storage`
3. `Table Rock Lake record high pool elevation 935 feet 2011 record`
4. `Table Rock Dam spillway gates opened 2017 May flood release cfs record`
5. `Table Rock Dam 2011 flood all ten gates open spillway release 70,000 cfs Lake Taneycomo record`
6. `site:swl-wc.usace.army.mil tabrock Table Rock`

### 10.2 Direct API probes (one each; all `connect_rejected` — organization egress policy; not retried)
* `https://cwms-data.usace.army.mil/cwms-data/offices?office=SWL`
* `https://waterservices.usgs.gov/nwis/site/?format=rdb&sites=07053450`
* `https://api.water.noaa.gov/nwps/v1/gauges/TBRM7`

### 10.3 GitHub code search (`search_code`; executed; hit counts in parentheses)
1. `"swl-wc.usace.army.mil" tabrock` (10)
2. `"cwms-data.usace.army.mil" "Table Rock"` (1)
3. `"TABLE ROCK LAKE" "BRANSON" usgs` (14)
4. `"Lake Taneycomo"` (419)
5. `"swpa.gov" "Table Rock"` (0)
6. `"Table Rock" org:USACE` (0)
7. `"Table Rock" "Taneycomo" generation` (39)
8. `"Table Rock" tabrock` (10)
9. `"tab7d.htm"` (3)
10. `07053450 OR 07053500 OR 07053810 "Table Rock"` (0)
11. `repo:BrainsyETH/Eddy path:dossiers "Table Rock" cwms` (0)
12. `repo:BrainsyETH/Eddy "Table Rock" cfs units` (27)
13. `repo:FishheadNate/FloodNotice-iOS Taneycomo OR Forsyth OR "White River" OR Galena OR Berryville` (0)
14. `repo:patrickjmcd/lake-info tablerock elevation tailwater` (0)
15. `07053450` (2,748; relevant: Eddy, ResNet, streamtemp, RiverBiomass, mda.streams, Water-Quality-Chatbot)
16. `"Table Rock" "acre-feet" OR "acre feet" storage` (1, irrelevant)
17. `"Table Rock Lake" record 935` (124; hit: patrickjmcd "Record peak was 935.47 ft on Apr 27, 2011")
18. `"Table Rock Dam" spillway gates cfs` (7, irrelevant)
19. `"Table Rock" "turbine venting" OR "dissolved oxygen" tailwater Taneycomo` (0)
20. `"Table Rock" "minimum flow" Taneycomo` (3)
21. `repo:BrainsyETH/Eddy path:__fixtures__ TRD` (0)
22. `repo:BrainsyETH/Eddy swpa.gov` (0)
23. `repo:BrainsyETH/Eddy "Table Rock" Inst timeseries` (14)
24. `repo:BrainsyETH/Eddy path:dossiers "Table Rock"` (0)
25. `repo:BrainsyETH/Eddy "Lake Taneycomo" USGS gauges Powersite` (6)
26. `"Lake Taneycomo at" MO` (13)
27. `repo:FishheadNate/FloodNotice-iOS nwsId Taneycomo` (0)
28. `repo:patrickjmcd/table-rock-lake-level pool OR release OR generation` (1)
29. `"Table Rock" 931 915 pool` (1,176; noise)
30. `"Table Rock Dam" spillway Taneycomo flood` (3)
31. `repo:BrainsyETH/Eddy Table_Rock_Dam` (10)
32. `"office=SWL"` (7)
33. `"Table Rock" 2166 MW OR capacity OR hydro` (13; hits: NETL crosswalk, GRanD/GDW row, H.R. 2132)
34. `USC00238252` (81)
35. `"TABLE ROCK" NID dam "WHITE RIVER" Missouri` (435; noise)
36. `"Table Rock Lake" bathymetric OR bathymetry OR sedimentation` (0)
37. `"Table Rock Lake" thermocline OR stratification OR hypolimnion` (0)
38. `lilleyslanding.com` (1, irrelevant)
39. `"Table Rock Lake" acres shoreline "drainage area" OR "square miles"` (0)
40. `repo:BrainsyETH/Eddy swpa https` (8)
41. `repo:patrickjmcd/table-rock-lake-level spillwayReleaseRate` (4)
42. `repo:patrickjmcd/lake-info "Table Rock"` (2)
43. `repo:FishheadNate/FloodNotice-iOS "Table Rock"` (1)
44. `TBRM7 OR TRLM7 OR BRAM7 OR BRSM7` (0)
45. `"TABLE ROCK" "TANEY" dam height storage` (32; hit: kalchikee NID record)
46. `"Powersite Dam" OR "Ozark Beach" elevation feet Taneycomo` (2)
47. `"Taneycomo" "Branson Landing" flood 2011 OR 2017 record` (0)
48. `"Table Rock" "auxiliary spillway"` (1, irrelevant)
49. `"Table Rock" floodgates OR "flood gates" Taneycomo Branson` (0)
50. `repo:BrainsyETH/Eddy "energy.gov/swpa"` (1)
51. `repo:BrainsyETH/Eddy path:dossiers measured cfs turbines` (0)
52. `repo:BrainsyETH/Eddy path:dossiers Headwater Tailwater Elev` (0)
53. `repo:BrainsyETH/Eddy "Flow-Plant"` (16)
54. `repo:BrainsyETH/Eddy floodPool OR "flood pool" Table_Rock_Dam OR "Table Rock" 931` (0)
55. `"Table Rock Dam" "cubic feet per second"` (16; hit: CC-News column; Active Calculus exercise)
56. `"Table Rock Lake" "flood pool"` (17)
57. `"Table Rock" "damages prevented" OR "flood damages"` (0)
58. `"Table Rock Dam" "252" feet high OR "6,423"` (0)
59. `repo:BrainsyETH/Eddy tailwater tsId Elev Decodes-rev` (2)
60. `repo:BrainsyETH/Eddy path:dossiers Table_Rock_Dam-Tailwater OR Table_Rock_Dam-Headwater ft` (0)
61. `repo:kalchikee/dam-failure-explorer "Table Rock"` (1)
62. `"Table Rock Dam" hazard "Missouri" height storage json OR csv` (0)
63. `"Table Rock Dam" gates open Taneycomo water` (6)
64. `"Table Rock" "Bull Shoals" "Newport" release flood White River` (8; noise)
65. `"Table Rock" "White River" hydropower MW "Corps" MO plant` (12; noise)
66. `"Table Rock" aeration OR venting turbine oxygen tailwater` (0)
67. `"Taneycomo" crest OR crested feet flood Branson 2011` (1, irrelevant)
68. `"Table Rock Lake" "flood control pool" OR "top of flood" 931` (0)
69. `repo:BrainsyETH/Eddy TRD "Table Rock" Missouri` (3; SWPA fixture line)
70. `repo:kalchikee/dam-failure-explorer MO30202` (1)
71. `repo:patrickjmcd/lake-info row` (5; `len(data) == 8`)
72. `repo:swbailey00/boatsafeontablerock.com NWS` (3)
73. `repo:embersyndicate-stack/wordpress-website preg_match tailwater` (1)
74. `"Table Rock Lake" "record level" OR "record high" OR "highest level"` (0)
75. `"Table Rock Dam" 2017 flood Taneycomo` (10; noise)
76. `"Table Rock Dam" 2011 flood Taneycomo` (10; noise)
77. `"935.47"` (107,264; noise)
78. `"Table Rock" "Beaver Lake" "Bull Shoals" record flood "White River" 2017 OR 2011 OR 2015` (0)
79. `repo:BrainsyETH/Eddy poolElevation "Table_Rock_Dam-Headwater" ft` (2; 914.4 ft)
80. `repo:BrainsyETH/Eddy tailwaterElevation "Table_Rock_Dam-Tailwater"` (2; 703→708 ft)
81. `repo:BrainsyETH/Eddy inflow "Flow-Res In" Table_Rock_Dam` (2)
82. `repo:BrainsyETH/Eddy Tainter_Gate OR Table_Rock_Dam-Turbine1 OR Table_Rock_Dam-Spillway` (0)
83. `repo:BrainsyETH/Eddy Temp-Water Table_Rock_Dam OR "Table Rock"` (2; 53.6 °F; no Flow-Min_Flow)
84. `repo:ulmo-dev/ulmo Taneycomo` (1; PSZM7)
85. `repo:ulmo-dev/ulmo Branson` (4; BBCM7, SOGM7)
86. `repo:ulmo-dev/ulmo "Table Rock" OR "TABLE ROCK"` (4; FORM7)
87. `repo:BrainsyETH/Eddy Turbine1 located 36.5961` (1)
88. `repo:BrainsyETH/Eddy "Elev-Downstream" "Table Rock" OR Table_Rock_Dam 702 OR 710` (0)
89. `"Table Rock Dam" spillway` (37; only Wikipedia-derived text relevant)
90. `"Table Rock Lake" "feet above" normal OR "conservation pool" OR "power pool"` (0)
91. `"43,100 acres" OR "43,100-acre" OR "43,100 acre"` (0)
92. `"52,300 acres" OR "52,300-acre" OR "52,300 acre"` (0)
93. `"Table Rock Lake" "miles of shoreline"` (28; 745 / 779 / 800 / 850)
94. `"Table Rock" GWh OR "gigawatt-hours" OR "megawatt-hours" hydro OR hydroelectric` (0)
95. `"Lilleys" OR "Lilley's Landing" Taneycomo generation` (0)
96. `"Table Rock Lake" 1958 OR 1959 filled OR impounded OR "began filling" dam completed power` (0)
97. `"Dewey Short" "Table Rock" spillway OR overlook OR visitor` (0)
98. `"Table Rock" 2019 flood May Taneycomo gates OR spillway OR release` (0)

---

## 11. Follow-up WebSearch plan (run when budget is available; ~50 queries)
1. `site:swl-wc.usace.army.mil tabrock pertinent data` 2. `"Table Rock" "top of flood control pool" 931 "conservation pool" 915 acre-feet` 3. `"Table Rock Lake" "record" 935 2011 crest date` 4. `site:swl.usace.army.mil "Table Rock" "record pool"` 5. `"Table Rock Dam" "auxiliary spillway" crest elevation 2005` 6. `"Table Rock" "auxiliary spillway" "never" used` 7. `"Table Rock Dam" spillway "all 10 gates" 2011 cfs` 8. `"Table Rock Dam" "cubic feet per second" May 2011 release` 9. `site:ky3.com "Table Rock Dam" spillway 2011` 10. `site:ky3.com "Table Rock" gates December 2015` 11. `site:news-leader.com "Table Rock" spillway 2017` 12. `site:bransontrilakesnews.com "Table Rock Dam" gates cfs` 13. `site:ozarksfirst.com "Table Rock" spillway release` 14. `site:facebook.com/littlerockusace "Table Rock" spillway` 15. `"Table Rock Dam" spillway 2019 June gates cfs` 16. `"Table Rock Dam" spillway 2025 June release cfs` 17. `"Table Rock" "Lake Taneycomo" "Branson Landing" flood 2011 crest feet` 18. `"Lake Taneycomo" record stage Branson 2017` 19. `site:water.noaa.gov FORM7` 20. `site:water.noaa.gov "Table Rock Lake"` 21. `site:water.noaa.gov "Lake Taneycomo" Branson gauge` 22. `site:waterdata.usgs.gov 07053450` 23. `site:waterdata.usgs.gov 07053600 62615` 24. `site:waterdata.usgs.gov "James River at Galena"` 25. `site:waterdata.usgs.gov "Kings River near Berryville"` 26. `site:waterdata.usgs.gov "Long Creek" Table Rock` 27. `site:swpa.gov "Table Rock" generation schedule` 28. `site:energy.gov/swpa Table Rock 230 MW` 29. `site:eia.gov "Table Rock" plant 2166` 30. `"Table Rock" EIA-923 net generation MWh 2023` 31. `"Table Rock" hydropower uprate 57.5 MW units` 32. `"Table Rock" "turbine venting" dissolved oxygen Harshbarger` 33. `"Table Rock" tailwater "dissolved oxygen" USACE study` 34. `"Lake Taneycomo" "minimum flow" study Corps MDC 700 cfs` 35. `"Table Rock" "water control plan" Newport regulating stage` 36. `"White River" "Newport" "regulating stage" Corps Little Rock` 37. `"Table Rock Lake" bathymetric survey USGS sedimentation storage loss` 38. `"Table Rock Lake" Secchi depth LMVP clarity` 39. `"Table Rock Lake" temperature profile thermocline MDC` 40. `"Table Rock Dam" tainter gates 45 37 spillway design discharge cfs` 41. `"Table Rock Dam" "252 feet" "6,423 feet"` 42. `"Table Rock Lake" "43,100 acres" "52,300"` 43. `"Table Rock Lake" "745 miles" shoreline` 44. `"Table Rock" "flood damages prevented" Little Rock District` 45. `site:lakelevels.info Table Rock` 46. `site:lilleyslanding.com fishing report generation units` 47. `site:ozarkanglers.com Table Rock generation report` 48. `"Powersite Dam" elevation crest 701 Ozark Beach` 49. `"Table Rock" NID MO30202` 50. `"Table Rock Dam" drone spillway video 2017` 51. `"Dewey Short Visitor Center" spillway photo gates open` 52. `"Table Rock Lake" record low elevation drought` 53. `"Table Rock" "inflow" record cfs April 2011` 54. `site:swl-wc.usace.army.mil historical tabrock`.

---

## Appendix A — Derived calculations (for the animation)

**Unit conversions used:** 1 MCM = 810.714 acre-ft; 1 km² = 0.386102 sq mi = 247.105 acres; 1 L/s = 0.0353147 cfs; 1 m = 3.28084 ft.
* Storage: 4,270.3 MCM × 810.714 = 3,462,000 ac-ft (top of flood pool); 3,332.9 MCM → 2,702,000 ac-ft (top of conservation pool); difference 760,000 ac-ft flood storage.
* Catchment: 10,412 km² → 4,020 sq mi; 10,395 km² → 4,014 sq mi; 10,339 km² → 3,992 sq mi.
* Mean discharge: 147,921 L/s → 5,224 cfs → 3.78 M ac-ft/yr; RiverGages 4,273 cfs → 3.09 M ac-ft/yr.
* Mean depth at 915: 2,702,000 / 43,100 = 62.7 ft.
* Storage-per-foot near 915 (K/D): ≈ 43,000–46,000 ac-ft per ft (surface area 43,100 → 52,300 ac across 915→931 gives average 47,500 ac-ft/ft; 760,000/16 = 47,500 ✓ consistent with the K area values).

**Powerhouse:** Q_full ≈ 15,100 cfs (SWPA); per unit ≈ 3,775 cfs; cfs ≈ 65.7 × MW at full load (use ≈ 70–75 cfs/MW below ~40 MW). Hydraulic check: P = ρ g Q H η = 1000 × 9.81 × 427.6 m³/s × 62.2 m × 0.90 ≈ 235 MW at head 204 ft — consistent with 230 MW.

**Tailwater vs release (measured points, ft NGVD29):** (0–20 cfs, 702.6); (5,270 cfs, 708.0); (15,100 cfs, 710.8). Interpolate on a concave curve; +8.2 ft from idle to full generation.

**Spillway (10 tainter gates 45 ft × 37 ft, crest 896 ft — K geometry):**
* Free-overflow (all gates fully raised), Q = C·L·H^1.5 with C ≈ 3.9, L = 450 ft: pool 931 → H = 35 ft → ≈ 363,000 cfs; pool 915 → H = 19 → ≈ 145,000 cfs; pool 935.5 → ≈ 431,000 cfs.
* Partial opening (orifice), per gate: Q ≈ 0.7 × a × 45 × √(2g·(pool − 896 − a/2)). Examples at pool 931: a = 1 ft → ≈ 1,450 cfs/gate; a = 2 ft → ≈ 2,900; a = 4 ft → ≈ 5,800 (10 gates ≈ 58,000 cfs); a = 6 ft → ≈ 8,600 (10 gates ≈ 86,000). At pool 935.5, a = 5 ft → ≈ 7,700 cfs/gate (10 gates ≈ 77,000 cfs). These reproduce the K-level flood releases (≈ 60–75 k cfs ⇔ 10 gates open ≈ 4–5 ft).
* Cross-check with the CC-News observation: 5 gates → 5,100 cfs ⇒ ≈ 1,020 cfs/gate ⇒ opening ≈ 0.7–0.8 ft at a pool near 925–931.

## Appendix B — Primary GitHub sources (exact API object URLs returned by search)
* Eddy dossier (CWMS/USGS identifiers): https://api.github.com/repositories/1093896714/contents/missouri-float-planner/scripts/ingestion/dossiers/verified-identifiers-tailwater-swl-table-rock-dam.md?ref=27c4d6ed8286c28d5683a6c3b045a48c97e57c3c
* Eddy registry: https://api.github.com/repositories/1093896714/contents/missouri-float-planner/src/lib/flow-providers/usace-registry.ts?ref=27c4d6ed8286c28d5683a6c3b045a48c97e57c3c
* Eddy SWPA parser: https://api.github.com/repositories/1093896714/contents/missouri-float-planner/src/lib/usace/swpa.ts?ref=27c4d6ed8286c28d5683a6c3b045a48c97e57c3c
* Eddy SWPA fixture (Table Rock row): https://api.github.com/repositories/1093896714/contents/missouri-float-planner/src/lib/usace/__fixtures__/swpa-mon-2026-07-27.txt?ref=27c4d6ed8286c28d5683a6c3b045a48c97e57c3c
* Eddy CDA client: https://api.github.com/repositories/1093896714/contents/missouri-float-planner/src/lib/usace/cda.ts?ref=27c4d6ed8286c28d5683a6c3b045a48c97e57c3c
* Eddy tailwater plan (8.19 ft swing): https://api.github.com/repositories/1093896714/contents/missouri-float-planner/docs/TAILWATER_PLAN.md?ref=27c4d6ed8286c28d5683a6c3b045a48c97e57c3c
* Eddy dam survey (Taneycomo gauges): https://api.github.com/repositories/1093896714/contents/missouri-float-planner/docs/DAM_EXPANSION_SURVEY_2026-08.md?ref=27c4d6ed8286c28d5683a6c3b045a48c97e57c3c
* Eddy knowledge notes: https://api.github.com/repositories/1093896714/contents/missouri-float-planner/EDDY_KNOWLEDGE.md?ref=27c4d6ed8286c28d5683a6c3b045a48c97e57c3c
* Eddy SQL migration (Taneycomo geometry, 62615 note): https://api.github.com/repositories/1093896714/contents/missouri-float-planner/supabase/migrations/20260824232949_three_tailwaters_land_inactive.sql?ref=27c4d6ed8286c28d5683a6c3b045a48c97e57c3c
* patrickjmcd page (record 935.47 ft; 915/947): https://api.github.com/repositories/616501869/contents/src/app/page.tsx?ref=49e846f9f4db34e25e7b6fe0db520200c00ea6ce
* patrickjmcd/lake-info parser: https://api.github.com/repositories/271373454/contents/lake-info/lake_level.py?ref=139c37e242035539e08b2a29b1515f0ac124e528
* boatsafe PHP scraper: https://api.github.com/repositories/1059007638/contents/api/cron/fetch_table_rock.php?ref=9fa1b100ae618f37d1d2c2b62c146f7683ee663a
* skc WordPress plugin (931 default): https://api.github.com/repositories/1100172010/contents/wp-content/plugins/skc-lake-levels/skc-lake-levels.php?ref=a52f2a48bac37c5fed91b48adaa1e5dc2a7ebfce
* Chain-of-Lakes fetcher (SWL page set): https://api.github.com/repositories/925786154/contents/.github/scripts/fetch_lake_data.py?ref=c2cd2d64774e15a39153512d546052b3854443fb
* FloodNotice gauge list (FORM7): https://api.github.com/repositories/530766047/contents/FloodNotice/FloodNotice/gage-stations-iOS.json?ref=76123c0e4b599d093c1dec58412a6fe4aa380ea7
* ulmo SHEF list (FORM7/PSZM7/SOGM7): https://api.github.com/repositories/1579740/contents/test/files/usace/swtwc/shefids.html?ref=63371c33550d4c3fe19a02e615f239d3096fd401
* ulmo RiverGages list (FORM7 HW&TW, BBCM7): https://api.github.com/repositories/1579740/contents/test/files/usace/rivergages/get_stations.cfm?ref=63371c33550d4c3fe19a02e615f239d3096fd401
* RopeWiki COERG attributes (FORM7 drainage/flow/precip): https://api.github.com/repositories/184487284/contents/rw/wf/COERG.csv?ref=c88fcc8c6ee82b1f1460a6d9e07af1698c3f818d
* GRanD/GDW row: https://api.github.com/repositories/1067261851/contents/week0/data/gdw.csv?ref=177bffde1ad969f4b8d9be406d945c2846ba89b3
* NETL eLCI hydropower (EIA 2166, 471,456 MWh): https://api.github.com/repositories/95246689/contents/electricitylci/data/hydropower_plant.csv?ref=71a3f6dd20ed36bfcea3ff64b5e27d117ca7adc5
* NID record MO30202: https://api.github.com/repositories/1182725857/contents/web/data/top_risk_dams.json?ref=b3a1251c6426a4b27520a545450fafbc2643d5ef
* USGS site metadata copies: https://api.github.com/repositories/27729134/contents/inst/extdata/170504_meta_basic.tsv?ref=97893d8a9d45abc162ebaa6cf0b114b85f19644d ; https://api.github.com/repositories/224582173/contents/data/USGS_stations.txt?ref=f44ef3788a8b893b2aa11227f5edf3ea526423c1 ; https://api.github.com/repositories/308823081/contents/WQP_sites_Phosphorus_resultcount500.csv?ref=81730800d729a8d9402377f0e67a11e99fa4fae6
* COOP station file: https://api.github.com/repositories/190502728/contents/programs/WeatherData/multivariate/USC00238252.csv?ref=66705c870502c2947a5d895fecd8450d760d0f92
* CC-News column (3 units + 5 gates = 14,753 cfs): https://api.github.com/repositories/513645154/contents/data/cc_news_data_option1/output/45idioms.txt?ref=2ec2dee3c5fcb148bf026acc229b4f1af9b36732
* Wikipedia-derived Table Rock text (252 ft; auxiliary spillway sentence): https://api.github.com/repositories/1003140677/contents/txtFiles (1 - 10000)/FILE-007690.txt?ref=91e62013cf07f59ec62dee9b08f31d2924469f8d
