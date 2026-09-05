# Table Rock Dam — Engineering & Structural Specifications

> ## ⚠️ NOTE FROM MEASURED GEODATA (added 2026-09-05 by the consolidating agent)
>
> §2.4 repeats a press description of the Dewey Short Visitor Center sitting "at the north end of the dam". The 2020 lidar/2020 NAIP place the visitor center at the **south (right) abutment**, lake side of Hwy 165 (≈ E 471,825 / N 4,049,678 UTM 15N). Several open items in this file (crest width, embankment slopes, pier spacing, powerhouse envelope, deck elevation, auxiliary-spillway bridge elevation, water surfaces) are now **measured** in `09-measured-geometry-from-lidar.md` and `geodata/lidar/lidar_measurements.json`.



**Project:** Table Rock Dam and Lake, White River, river mile 528.8, ~8 mi SW of Branson, Taney/Stone counties, Missouri, USA
**Owner/operator:** U.S. Army Corps of Engineers (USACE), Little Rock District (SWL)
**Type:** Concrete gravity dam (gated ogee spillway + power intake section) flanked by two rolled-earth embankments; gated auxiliary spillway (2005) on a separate alignment north of the main dam
**Built:** October 1954 – August 1958 (dam); powerhouse/switchyard 1959; units 3–4 in 1961; auxiliary spillway 1997/2000–2005
**Research dimension:** Engineering & structural specifications (agent 1 of 8)
**Compiled:** 2026-09-05. Method: WebSearch only (WebFetch/curl blocked by proxy). 56 queries returned results; 18 further queries were refused when the session's shared WebSearch budget (200 calls) was exhausted — see §13 and §14.

> **Reading guide.** Every number carries a source URL exactly as returned by search. Confidence: **V** = verified by multiple independent sources; **S** = single source; **I** = inferred/derived by this agent (arithmetic or engineering convention), not found verbatim in any source; **U** = unverified background knowledge. Any URL not returned by a search result is labelled "(unverified)". Elevations are feet above mean sea level; the Corps' project datum for a 1950s dam is almost certainly NGVD 29 unless a source says NAVD 88 (see §7.3).

---

## 1. Summary specifications table

| Item | Value | Unit | Source URL(s) | Conf. |
|---|---|---|---|---|
| Total dam length | 6,423 | ft | http://www.bransontablerocklake.com/wp-content/uploads/2015/10/08-Right-Table-Rock-Dam-Info-Corps-of-Eng.pdf ; https://encyclopediaofarkansas.net/entries/table-rock-dam-and-lake-6610/ ; https://www.betterbranson.com/item/table-rock-dam/ ; https://travelcurious.com/united-states-of-america/branson/attractions/table-rock-dam-ABMXG1 | V |
| Total dam length (NID value) | 6,454 | ft | https://damsoftheworld.com/usa/missouri/table-rock-dam/ ; https://snoflo.org/reservoir/missouri/mo30202-table-rock-dam | V (NID-derived) |
| "More than 6,000 ft long" | >6,000 | ft | https://www.swl.usace.army.mil/Missions/Recreation/Lakes/Table-Rock-Lake/Dam-and-Lake-Information/ | V |
| Concrete gravity section length | 1,602 | ft | Corps info PDF (above); https://en.wikipedia.org/wiki/Table_Rock_Lake ; https://encyclopediaofarkansas.net/entries/table-rock-dam-and-lake-6610/ | V |
| Earth embankment length (two sections, combined) | 4,821 | ft | same as above | V |
| Split of embankment length (left vs right) | not found | ft | — | open |
| Max height above streambed | 252 | ft | https://www.swl.usace.army.mil/Missions/Recreation/Lakes/Table-Rock-Lake/Dam-and-Lake-Information/ ; Corps info PDF; EoA | V |
| Height (NID "NID height") | 260 | ft | https://snoflo.org/reservoir/missouri/mo30202-table-rock-dam ; https://damsoftheworld.com/usa/missouri/table-rock-dam/ | V (NID-derived) |
| Height (metric, trade press) | 76.2 m (=250 ft) | m | https://www.waterpowermagazine.com/news/spillway-work-continues-at-table-rock-lake/ | S |
| Concrete volume | 1,230,000 | cu yd | Corps info PDF; Wikipedia; EoA | V |
| Embankment fill volume | 3,320,000 | cu yd | Corps info PDF; Wikipedia; EoA | V |
| NID structural volume | 4,550,000 (=1.23M+3.32M) | cu yd | https://damsoftheworld.com/usa/missouri/table-rock-dam/ | S (consistent) |
| Crest (top) width of concrete section | 35 | ft | https://travelcurious.com/united-states-of-america/branson/attractions/table-rock-dam-ABMXG1 ; https://discoverbranson.com/travel-guide/376455/table-rock-lake-dam-in-branson-missouri | S (two tourism pages, likely one origin) |
| Number of concrete monoliths | 30 | — | https://www.bransontrilakesnews.com/news_free/article_bb503ec6-922b-11e9-bafc-2b604507deb9.html | S |
| Average monolith width (1,602/30) | ≈53.4 | ft | derived | I |
| First concrete placed | 24 May 1955 | date | https://www.bransontrilakesnews.com/news_free/article_bb503ec6-922b-11e9-bafc-2b604507deb9.html | S |
| Main spillway section length | 531 | ft | https://encyclopediaofarkansas.net/entries/table-rock-dam-and-lake-6610/ ; Corps info PDF | V |
| Main spillway gates | 10 tainter (radial) crest gates | — | EoA; Wikipedia; https://www.swl.usace.army.mil/Media/News-Releases/Article/4484316/table-rock-dam-spillway-gates-to-open-intermittently-for-routine-inspections/ | V |
| Main spillway gate size | 45 wide × 37 high | ft | Corps info PDF; https://encyclopediaofarkansas.net/entries/table-rock-dam-and-lake-6610/ ; https://www.branson.com/learn/free-things-to-do-in-branson/table-rock-dam/ (result set) | V |
| Gate max raise (operational statement) | ≈30 | ft | http://forsythwx.blogspot.com/2019/02/worst-case-scenario-for-table-rock-dam.html | S (conflicts with 37-ft gate height; see §12) |
| Implied pier width (531 − 10×45)/9 | ≈9 | ft | derived | I |
| Spillway crest elevation | 896 | ft | https://en.wikipedia.org/wiki/Table_Rock_Lake ; https://www.stillwatersresort.com/post/about-table-rock-lake | V |
| Top of closed gates (896+37) | ≈933 | ft | derived | I |
| Main spillway design discharge | 558,000 (=4,174,000 gal/s) | cfs | https://www.swl.usace.army.mil/Portals/50/docs/tablerocklake/Table%20Rock%20Dam%20Safety%20Fact%20Sheet%2020170313.pdf | V (USACE) |
| Auxiliary spillway gates | 8 tainter | — | EoA; Water Power magazine; Granite Construction listing | V |
| Auxiliary spillway weir length | 467 | ft | https://encyclopediaofarkansas.net/entries/table-rock-dam-and-lake-6610/ ; https://bcgforums.com/threads/table-rock-dam-auxiliary-spillway.32929/ (result set) | V |
| Auxiliary spillway crest elevation (as published) | 948 (NAVD 88) | ft | https://encyclopediaofarkansas.net/entries/table-rock-dam-and-lake-6610/ | S — physically doubtful, see §12 |
| Auxiliary spillway structure height / top elev. | 85 tall; top el. 948 | ft | https://bcgforums.com/threads/table-rock-dam-auxiliary-spillway.32929/ ; https://grokipedia.com/page/Table_Rock_Lake (result set) | S |
| Auxiliary spillway design discharge | 451,000 (=3,373,000 gal/s) | cfs | USACE Dam Safety Fact Sheet (above); EoA | V |
| Auxiliary spillway cost (program) | ≈$65 million | USD | EoA; https://www.betterbranson.com/item/table-rock-dam/ | V |
| Aux. spillway Phase 1 (Kiewit) excavation | 254,000 | cu yd | https://www.kiewit.com/projects/table-rock-auxillary-spillway-phase-1/ | S |
| Aux. spillway main contract (Granite Construction) | US$43.4 million | USD | https://www.waterpowermagazine.com/news/spillway-work-continues-at-table-rock-lake/ | S |
| Aux. spillway completed | 2005 | year | EoA; Kiewit; Water Power | V |
| Powerhouse main units | 4 × Francis, 50 MW each = 200 MW | MW | https://www.power-technology.com/marketdata/table-rock-us/ ; https://www.power-technology.com/data-insights/power-plant-profile-table-rock-us/ | V |
| Generator rating | 52.63 MVA each (Westinghouse) | MVA | https://www.power-technology.com/marketdata/table-rock-us/ | S |
| Station-service (house) units | 2 small turbines ("six electric turbines … two … for operating the dam") | — | https://www.bransonalpinemountaincoaster.com/table-rock-dam-keeping-us-cool-for-70-years | S |
| Penstocks | 4 × 18 ft (5.486 m) dia. | ft | https://www.power-technology.com/marketdata/table-rock-us/ ; https://www.bransonalpinemountaincoaster.com/table-rock-dam-keeping-us-cool-for-70-years | V |
| Units 1–2 online | May/June 1959 | date | https://en.wikipedia.org/wiki/Table_Rock_Lake ; EoA; Alpine coaster blog | V |
| Units 3–4 online | April & June 1961 (EoA) / "August 1961" (blog) | date | EoA; https://www.bransonalpinemountaincoaster.com/table-rock-dam-keeping-us-cool-for-70-years | conflict |
| Gross head at conservation pool (915−702) | ≈213 | ft | derived | I |
| Turbine release (max, all units) | "as much as 20,000" | cfs | https://www.branson.com/learn-old/lake-taneycomo/ (result set incl. https://midlakesguide.com/lake-taneycomo/) | S — see §12 |
| Top of dam | 947 | ft | https://en.wikipedia.org/wiki/Table_Rock_Lake | V (with 948 variants) |
| Top of surcharge pool | 936 | ft | https://www.swl.usace.army.mil/Portals/50/docs/tablerocklake/Shoreline/trl-smp-2020/2020-Table-Rock-Lake-SMP.pdf?ver=Twxc2zPTvBoSh1SVnfwPyQ%3D%3D | S (USACE) |
| Top of flood-control pool | 931 | ft | Wikipedia; SMP 2020; https://www.tablerocklakelevel.com/ | V |
| Seasonal conservation pool (May–Nov) | 917 | ft | SMP 2020 (above) | S (USACE) |
| Top of conservation pool | 915 | ft | Wikipedia; SMP 2020; USGS SIM 3499 | V |
| Record pool | 935.47 on 27 Apr 2011 | ft | https://www.bransonmo.gov/DocumentCenter/View/11193/City-Monitoring-Table-Rock-Dam-Spillway-Release ; EoA (result set) | V |
| Lake Taneycomo normal pool (tailwater) | 702 | ft | https://en.wikipedia.org/wiki/Lake_Taneycomo ; https://grokipedia.com/page/Lake_Taneycomo | V |
| Observed tailwater range (29–30 Aug 2026) | 702.61 – 706.62 | ft | https://www.swl-wc.usace.army.mil/pages/data/tabular/htm/tabrock.htm | S (USACE data) |
| Streambed elevation (947−252) | ≈695 | ft | derived | I |
| Total storage (top of flood pool) | 3,462,000 | acre-ft | https://www.swl.usace.army.mil/Missions/Recreation/Lakes/Table-Rock-Lake/Dam-and-Lake-Information/ ; damsoftheworld; snoflo | V |
| Normal storage (NID) | 2,702,000 | acre-ft | https://damsoftheworld.com/usa/missouri/table-rock-dam/ | S (NID-derived) |
| Flood-control storage (3,462,000−2,702,000) | ≈760,000 | acre-ft | derived | I |
| Reservoir volume (metric) | 4,267.77 million m³ | m³ | https://www.power-technology.com/marketdata/table-rock-us/ | S |
| Drainage area | 4,020 | sq mi | https://damsoftheworld.com/usa/missouri/table-rock-dam/ ; USGS 07053450 result set | V |
| Lake area at el. 915 | 42,644 (SMP) / 43,100 (Corps rec. page, Wikipedia) | acres | SMP 2020; Dam-and-Lake-Information page; Wikipedia | conflict (survey vintage) |
| Shoreline at el. 915 | 758 (SMP) / 745 (Corps rec. page) / "nearly 800" (Wikipedia) | mi | same | conflict |
| Project land+water area | 62,207 | acres | SMP 2020 | S |
| NID ID | MO30202 | — | https://snoflo.org/reservoir/missouri/mo30202-table-rock-dam | S (URL slug) |
| NID hazard potential | High | — | https://snoflo.org/reservoir/missouri/mo30202-table-rock-dam ; USACE Dam Safety Fact Sheet (EAP) | V |
| NID spillway | Controlled; width 1,058 ft | ft | https://snoflo.org/reservoir/missouri/mo30202-table-rock-dam | S — see §12 |
| Original construction cost | ≈$65 million | USD | https://www.joplinglobe.com/news/local_news/bill-caldwell-table-rock-dam-a-dream-half-a-century-in-making/article_b95781ba-4fce-11ed-97cf-430ab9e86a01.html | S |
| Highway across dam | Missouri Route 165 (co-signed 265) | — | https://en.wikipedia.org/wiki/Missouri_Route_165 ; USACE lane-closure releases | V |
| Dewey Short Visitor Center | opened 27 Apr 2012; LEED Gold; ~15,000 sq ft; ~$8M | — | https://www.army.mil/article/85518/Construction_of_new_regional_visitor_center_at_Table_Rock_crosses_regional_boundaries/ ; https://www.joplinglobe.com/news/local_news/new-dewey-short-visitors-center-offers-views-history-of-table/article_018180ac-1bcc-5ea3-ab61-701944d19c7d.html | V |

---

## 2. Overall dam

### 2.1 Configuration and quantities

The USACE Little Rock District describes the structure as "a concrete gravity dam" consisting of "a concrete section 1,602 feet long and two earth embankment sections having a length of 4,821 feet," for a total length of 6,423 ft, rising 252 ft above the riverbed and containing 1,230,000 cu yd of concrete and 3,320,000 cu yd of embankment (Corps information sheet reproduced at http://www.bransontablerocklake.com/wp-content/uploads/2015/10/08-Right-Table-Rock-Dam-Info-Corps-of-Eng.pdf ; same figures at https://www.swl.usace.army.mil/Missions/Recreation/Lakes/Table-Rock-Lake/Dam-and-Lake-Information/ , https://en.wikipedia.org/wiki/Table_Rock_Lake and https://encyclopediaofarkansas.net/entries/table-rock-dam-and-lake-6610/ ).

Key derived relations (I):
- Concrete section = 1,602 ft = **531 ft gated spillway** + **≈1,071 ft of non-overflow / power-intake / abutment monoliths** (1,602 − 531). The split of the 1,071 ft between the intake monoliths (4 penstocks) and plain non-overflow monoliths was not found.
- NID structural volume 4,550,000 cu yd equals 1.23 M + 3.32 M exactly, confirming the NID record is built from the same design quantities ( https://damsoftheworld.com/usa/missouri/table-rock-dam/ ).
- NID length 6,454 ft vs. design 6,423 ft (Δ = 31 ft) and NID height 260 ft vs. 252 ft above streambed (Δ = 8 ft) are consistent with the NID reporting structural height to the foundation and length including abutment contact/wing walls; unconfirmed (see §12).

Tourism copy that appears to originate from Corps hand-outs gives the **top thickness of the concrete section as 35 ft** ("The visible part of the dam is 1,602 feet wide and 252 feet tall, with the top thickness of the concrete being 35 feet wide") — https://travelcurious.com/united-states-of-america/branson/attractions/table-rock-dam-ABMXG1 and https://discoverbranson.com/travel-guide/376455/table-rock-lake-dam-in-branson-missouri . For a 252-ft-high USACE gravity section of the 1950s, a base width of roughly 0.7–0.8 × height (≈175–200 ft) would be normal practice (U — not found in any source; use only as a modelling placeholder until a typical section drawing is obtained, §10).

### 2.2 Concrete section — monoliths and construction sequence

- "Table Rock Dam was built in 30 monoliths to create one seamless structure. The first concrete was poured on May 24, 1955" — https://www.bransontrilakesnews.com/news_free/article_bb503ec6-922b-11e9-bafc-2b604507deb9.html (Branson Tri-Lakes News, "60 years of Table Rock Dam", 2019). Average monolith width 1,602/30 ≈ 53 ft (I); USACE practice of the period used ~50-ft monoliths with transverse contraction joints (general statement from https://apps.dtic.mil/sti/tr/pdf/ADA402909.pdf , EM 1110-2-2200 Gravity Dam Design — not Table-Rock-specific).
- Spillway monolith arithmetic (I): 10 gates × 45 ft = 450 ft of clear opening; 531 − 450 = 81 ft over 9 intermediate piers ⇒ **≈9-ft piers**, which is a standard USACE tainter-gate pier width for 45-ft bays (cf. EM 1110-2-2702, https://damsafety.org/content/engineering-and-design-design-spillway-tainter-gates ). If the 531-ft figure includes half-widths of the two end (abutment) piers, intermediate piers could be somewhat narrower (~8 ft).
- Construction: Little Rock District began work October 1954; dam completed August 1958; powerhouse and switchyard 1959; lake declared operational for public use 1960 ( https://www.swl.usace.army.mil/Portals/50/docs/tablerocklake/Shoreline/trl-smp-2020/2020-Table-Rock-Lake-SMP.pdf?ver=Twxc2zPTvBoSh1SVnfwPyQ%3D%3D ; https://en.wikipedia.org/wiki/Table_Rock_Lake ). Authorized by the Flood Control Act of 1941; delayed by WWII, the Korean War and construction of Bull Shoals ( https://en.wikipedia.org/wiki/Table_Rock_Lake ; http://zweiglist.com/shifting-course-the-white-river-and-table-rock-dam/ ).
- Cost: "$65 million," construction 1954–1958 — https://www.joplinglobe.com/news/local_news/bill-caldwell-table-rock-dam-a-dream-half-a-century-in-making/article_b95781ba-4fce-11ed-97cf-430ab9e86a01.html . (Note this is the same headline figure quoted for the 2005 auxiliary spillway program — coincidence; treat separately.)
- Construction-era photograph: "The early construction of Table Rock Dam on the White River" — https://www.swl.usace.army.mil/Media/Images/igphoto/2002994177/ ; also https://www.facebook.com/wrvhs/posts/early-construction-of-table-rock-dam-in-the-1950s-near-branson-missouri/1369217011914971/ (White River Valley Historical Society) and PBS OzarksWatch "Table Rock Lake — Beneath Still Waters" https://www.pbs.org/video/table-rock-lake-beneath-still-waters-n980rw/ .

### 2.3 Embankments

- Two rolled-earth embankment sections, combined 4,821 ft, 3,320,000 cu yd (sources above). No source found giving the individual lengths, crest width, upstream/downstream slopes, core/zoning, or riprap specification (queries 39, 40 returned only generic material). The revised-PMF study found the **embankment** (not the concrete) would be overtopped, which is why a separate auxiliary spillway was built ( https://www.waterpowermagazine.com/news/spillway-work-continues-at-table-rock-lake/ ; https://encyclopediaofarkansas.net/entries/table-rock-dam-and-lake-6610/ ).
- The auxiliary-spillway program included "the excavation and construction of a new length of earthen embankment, completed in September of 2000" and, in the Granite contract, "earthen dam embankments" ( https://www.waterpowermagazine.com/news/spillway-work-continues-at-table-rock-lake/ ; https://www.thebluebook.com/iProView/1191135/granite-construction-inc/material-suppliers//construction-projects/table-rock-auxiliary-spillway-136610/ ). So the present embankment system includes 2000-vintage fill tying the auxiliary spillway into the original left (north) embankment/abutment (I as to location).
- Modelling defaults if drawings are unavailable (U, generic USACE 1950s practice): crest width 30–40 ft carrying the 2-lane highway; upstream slope ~1V:3H with dumped riprap; downstream slope ~1V:2.5H grassed; embankment crest at el. 947 with parapet/guardrail. These are NOT Table Rock-specific.

### 2.4 Foundation, geology, grouting, drainage

No Table-Rock-specific statement of the foundation formation, grout-curtain depth, or gallery layout was returned. Relevant leads:
- The site lies in the Ordovician dolomite terrain of the Ozark uplift (Cotter/Jefferson City/Roubidoux/Gasconade sequence) per general references returned by query 20 ( https://en.wikipedia.org/wiki/Cotter_Formation ; https://en.wikipedia.org/wiki/Jefferson_City_Formation ; https://geology.arkansas.gov/geology/ozark-plateaus-region-ordovician-period.html ) — the specific formation under the dam is **not confirmed** (U).
- "Foundation Grouting Practices at Corps of Engineers Dams," Albritton, Jackson & Bangert, WES, Oct 1984, https://apps.dtic.mil/sti/tr/pdf/ADA152527.pdf (also https://digital.library.unt.edu/ark:/67531/metadc303926/m1/192/ ) is a 500-page survey of Corps grouting programs and is the most likely open document to contain Table Rock's grout-curtain data; the search snippet did not confirm inclusion.
- Auxiliary spillway Phase 1: Kiewit "excavating, blasting and preparing the foundation" ( https://www.kiewit.com/projects/table-rock-auxillary-spillway-phase-1/ ); Advanced Construction Techniques lists "Table Rock Auxiliary Spillway Phase 1" among its projects ( http://www.advancedconstructiontechniques.com/Table-Rock-Auxiliary-Spillway-Phase-1.asp ) — the firm's project list describes foundation-grouting scopes (overburden/rock drilling, water testing, core drilling of grout and drainage-relief holes, pressure grouting), implying a grout curtain and relief drains under the new spillway (S, inferred scope).
- The Dewey Short Visitor Center "sits atop a limestone bluff" at the north end of the dam ( https://www.joplinglobe.com/news/local_news/new-dewey-short-visitors-center-offers-views-history-of-table/article_018180ac-1bcc-5ea3-ab61-701944d19c7d.html ) — confirms carbonate bedrock abutments.

---

## 3. Main (service) spillway

| Attribute | Value | Source | Conf. |
|---|---|---|---|
| Location | Within the 1,602-ft concrete section (gated overflow monoliths) | Corps info PDF; EoA | V |
| Length of spillway section | 531 ft | https://encyclopediaofarkansas.net/entries/table-rock-dam-and-lake-6610/ | V |
| Gates | 10 tainter (radial) crest gates, numbered 1–10 | EoA; https://www.facebook.com/littlerockusace/posts/crews-opened-table-rock-dam-spillway-gates-1-through-9-to-1-foot-each-at-3-pm-to/1081220050712665/ | V |
| Gate size | 45 ft wide × 37 ft high | Corps info PDF; EoA; branson.com result set | V |
| Crest (ogee) elevation | 896 ft | Wikipedia infobox; https://www.stillwatersresort.com/post/about-table-rock-lake | V |
| Top of closed gate | ≈933 ft (896+37); i.e., 2 ft above flood pool 931 | derived | I |
| Max gate raise quoted operationally | "maximum height of approximately 30 feet" | http://forsythwx.blogspot.com/2019/02/worst-case-scenario-for-table-rock-dam.html | S |
| Design discharge | 558,000 cfs (4,174,000 gal/s) | https://www.swl.usace.army.mil/Portals/50/docs/tablerocklake/Table%20Rock%20Dam%20Safety%20Fact%20Sheet%2020170313.pdf | V |
| Pier width | ≈9 ft (derived) | — | I |
| Hoist deck / service bridge | Not described in any returned source. USACE 1950s gated spillways of this class carry the gate hoists on a deck above the piers with the highway bridge (here MO 165) spanning the bays; gate-hoist type (wire-rope drum hoists vs. chain) not found. | — | U |
| Stilling basin / energy dissipator | Not described in any returned source (queries 10, 14, 51). The Corps photo "Table Rock Dam spillway at work" ( https://www.swl.usace.army.mil/Media/Images/igphoto/2002230281/ ) and news video ( https://www.youtube.com/watch?v=cNDPwvd_B5c ) are the best visual references for the chute/basin geometry. | — | open |
| Bulkhead gates / stoplogs | Not found (query 52). | — | open |

**Gate discharge behaviour (for animation/hydraulics):**
- Five gates open 1 ft ≈ 5,000 cfs ( https://bransonregister.com/corps-began-spillway-release-at-table-rock-lake/ ) and ≈ 6,500 cfs ( https://www.ky3.com/2025/06/09/us-army-corps-engineers-opens-spillways-table-rock-dam-adjusting-service-hours/ ), i.e., **≈1,000–1,300 cfs per gate per foot of opening** at pools near 915–931 (V for the range). Cross-check (I): orifice flow Q ≈ 0.7 × 45 ft × 1 ft × √(2·32.2·~19 ft) ≈ 1,100 cfs — consistent.
- Gates 1–9 opened to 1 ft each (USACE Facebook post, above); 5 gates at 1 ft is "a typical release when Table Rock Dam is evacuating flood storage" ( https://www.bransontrilakesnews.com/news_free/article_f3542f48-32ba-11e8-99e3-4b21a260b653.html ).
- The 558,000-cfs design capacity implies free (fully-open) flow with roughly 45 ft of head over the 896 crest (Q = C·L·H^1.5 with C≈4, L=450 ft ⇒ H≈46 ft ⇒ pool ≈ el. 942), i.e., the maximum design pool sits just under the 947 top of dam (I).
- Gates are opened "intermittently for routine inspections" (2024–2026 USACE releases: https://www.swl.usace.army.mil/Media/News-Releases/Article/4484316/table-rock-dam-spillway-gates-to-open-intermittently-for-routine-inspections/ ; https://www.swl.usace.army.mil/Media/News-Releases/Article/4326122/usace-to-begin-intermittent-spillway-releases-at-table-rock-dam/ ; https://www.swl.usace.army.mil/Media/News-Releases/Article/4210796/usace-to-begin-spillway-releases-at-table-rock-dam/ ).
- Floods of 2008 and 2011 set record lake levels and record spillway releases; peak pool 935.47 ft on 27 April 2011 ( https://www.bransonmo.gov/DocumentCenter/View/11193/City-Monitoring-Table-Rock-Dam-Spillway-Release ; https://encyclopediaofarkansas.net/entries/table-rock-dam-and-lake-6610/ result set). The record spillway cfs figure was not captured.
- A warning horn below the dam signals releases ( https://www.swl.usace.army.mil/Media/News-Releases/Article/4120553/warning-horn-below-table-rock-dam-not-operational/ ).

---

## 4. Auxiliary spillway (1997–2005)

### 4.1 Rationale
- Re-analysis of the Probable Maximum Flood (study "ongoing since the late 1980s"; safety evaluations "in the 1990s") showed the lake "would rise ten feet higher" in the worst-case event than originally computed, which "would overtop the earthen embankment" with catastrophic downstream consequences including Branson ( https://www.waterpowermagazine.com/news/spillway-work-continues-at-table-rock-lake/ ; https://encyclopediaofarkansas.net/entries/table-rock-dam-and-lake-6610/ ; https://www.betterbranson.com/item/table-rock-dam/ ).
- Alternatives considered: enlarging the service spillway, raising the dam, a fixed-crest spillway, and emergency spillways around the dam; after public input a gated auxiliary spillway was selected (same sources).
- Congress approved construction at ≈$65 million; completed 2005 (EoA; betterbranson).

### 4.2 Physical description
| Attribute | Value | Source | Conf. |
|---|---|---|---|
| Location | "north of the main dam" | https://encyclopediaofarkansas.net/entries/table-rock-dam-and-lake-6610/ | S (see §12 for exact siting) |
| Configuration | Eight-bay gated spillway with ogee weir; approach channel excavated from the lake; discharge channel to Lake Taneycomo; new earthen embankments tying into the dam | https://www.waterpowermagazine.com/news/spillway-work-continues-at-table-rock-lake/ ; https://www.thebluebook.com/iProView/1191135/granite-construction-inc/material-suppliers//construction-projects/table-rock-auxiliary-spillway-136610/ | V |
| Gates | 8 tainter gates | EoA; Water Power; Granite | V |
| Weir length | 467 ft | EoA; bcgforums/grokipedia result set | V |
| Crest elevation | "948 ft (NAVD 88)" as published | EoA | S — doubtful (§12) |
| Structure | "top elevation of 948 feet, 467 feet in length, and 85 feet tall" | https://bcgforums.com/threads/table-rock-dam-auxiliary-spillway.32929/ ; https://grokipedia.com/page/Table_Rock_Lake (result set) | S |
| Discharge capacity | 451,000 cfs (3,373,000 gal/s) | USACE Dam Safety Fact Sheet; EoA | V |
| Highway | New bridge carries Missouri Highway 165 over the completed channel | Water Power; Granite | V |
| Phase 1 contractor | Kiewit — excavation, blasting, foundation preparation; 254,000 cu yd excavation | https://www.kiewit.com/projects/table-rock-auxillary-spillway-phase-1/ | S |
| Phase 1 grouting subcontractor (likely) | Advanced Construction Techniques | http://www.advancedconstructiontechniques.com/Table-Rock-Auxiliary-Spillway-Phase-1.asp | S |
| New embankment length | completed September 2000 | Water Power | S |
| Main construction contract | Granite Construction Company, Watsonville CA, US$43.4 M — eight-bay gated spillway, earthen embankments, approach-channel excavation, highway bridge | Water Power; Granite/BlueBook | V |
| Owner | USACE Little Rock District | Granite/BlueBook | V |

Gate-width arithmetic (I): 467 ft over 8 bays. With 8 × 50-ft gates (400 ft) the 7 intermediate piers would be ≈9.6 ft — a very plausible USACE layout; with 8 × 45-ft gates the piers would be ≈15 ft (less likely). **Working assumption for the model: ~50-ft-wide gates with ~9–10-ft piers — flagged unverified.**

Crest-elevation consistency check (I): if the weir crest really were at 948 ft (above the 947-ft top of dam) the spillway could never operate. A gated auxiliary spillway rated 451,000 cfs at a pool near the top of dam requires roughly 40–45 ft of head over its crest for ~400 ft of net width, placing the ogee crest in the low-900s ft — likely at or a little above the service-spillway crest (896) — with the "948" more plausibly being the top-of-pier/bridge-deck elevation. The 85-ft structure height then reads as foundation-to-deck. **Treat 948 as top-of-structure, not crest, until a USACE drawing confirms.**

Inspections: one lane of MO 165 across the auxiliary spillway bridge is closed periodically for bridge/spillway inspection ( https://bransonregister.com/table-rock-dam-auxiliary-spillway-inspection-to-closes-one-lane-of-highway-165/ ; https://www.swl.usace.army.mil/Media/News-Releases/Article/2367946/new-date-for-temporary-lane-closure-of-highway-165-across-table-rock-dam-and-au/ ). Photo thread with close-ups of the gate structure: https://bcgforums.com/threads/table-rock-dam-auxiliary-spillway.32929/ .

---

## 5. Powerhouse and hydropower

### 5.1 Plant data
| Attribute | Value | Source | Conf. |
|---|---|---|---|
| Location | Downstream toe of the concrete section, fed by 4 penstocks through the intake monoliths; discharges to the head of Lake Taneycomo | Corps/EoA descriptions (implicit); Wikipedia; Taneycomo sources | I/U (arrangement is standard USACE; no plan drawing retrieved) |
| Main units | 4 × Francis, 50 MW nameplate each; plant 200 MW | https://www.power-technology.com/marketdata/table-rock-us/ ; https://www.power-technology.com/data-insights/power-plant-profile-table-rock-us/ | V |
| Generators | 4 × Westinghouse Electric, 52.63 MVA each (⇒ 0.95 pf, I) | power-technology (above) | S |
| Turbine supplier (as listed) | "Andritz Hydro" per power-technology database — almost certainly reflects a later runner/rehab supplier or a database default; original 1950s OEM not confirmed (Allis-Chalmers, Newport News, Baldwin-Lima-Hamilton, S. Morgan Smith all unconfirmed) | https://www.power-technology.com/marketdata/table-rock-us/ | S — see §12 |
| Station-service units | "six electric turbines; the electricity from two of the turbines goes just for operating the dam itself, while the other four … goes directly into the grid" | https://www.bransonalpinemountaincoaster.com/table-rock-dam-keeping-us-cool-for-70-years | S |
| Penstocks | 4 × 18-ft (5.486 m) diameter | power-technology; Alpine coaster blog | V |
| Commissioning | Units 1–2: "power production was online in May 1959 with two generating units" (Wikipedia/EoA); "first two 18-foot diameter penstocks were ready for generation of power in June 1959" (blog). Units 3–4: April and June 1961 (EoA) vs. "August 1961" (blog) | https://en.wikipedia.org/wiki/Table_Rock_Lake ; EoA; blog | conflict on 1961 dates |
| Powerhouse & switchyard completed | 1959 | SMP 2020 | S (USACE) |
| Operating mode | Peaking plant "to supply power during high demand periods" | https://www.waterpowermagazine.com/news/spillway-work-continues-at-table-rock-lake/ | S |
| Gross head | 915 − 702 = ≈213 ft at conservation pool; ≈229 ft at flood pool 931; ≈200 ft at 896 | derived | I |
| Turbine flow | "As much as 20,000 cfs can be released through turbines" (fishing guide); a 50-MW Francis unit at ~200 ft net head and ~90 % efficiency passes ≈3,300 cfs ⇒ ≈13,000–14,000 cfs for four units (I). Treat 20,000 as an upper/rough figure. | https://www.branson.com/learn-old/lake-taneycomo/ result set | conflict |
| Annual hydropower benefit | ≈$42.5 million/yr | USACE Dam Safety Fact Sheet | S |
| Power marketing | Southwestern Power Administration (SWPA, DOE) sells output to municipalities and rural cooperatives across northern Arkansas, southern Missouri and adjoining states | https://encyclopediaofarkansas.net/entries/table-rock-dam-and-lake-6610/ ; https://www.energy.gov/swpa/southwestern-power-administration | V |
| Switchyard voltage / lines | Not found (query 17). SWPA transmission overview: https://www.energy.gov/swpa/transmission | — | open |
| Powerhouse dimensions, crane capacity, rpm, draft-tube geometry | Not found (queries 15, 33, 47). | — | open |
| Upgrade/rewind history | Not found (queries 16, 48). | — | open |

### 5.2 Documents to obtain (not readable in this environment)
- **USACE Hydropower 2020 Project Report, Table Rock Lake** — https://usace.contentdm.oclc.org/digital/api/collection/p16021coll2/id/7094/download (USACE Digital Library). Expected to list unit ratings, rated head, generation, and rehabilitation status.
- **Hydropower Reform Coalition project page** — https://hydroreform.org/hydro-project/table-rock/ .
- **Hydropower Analysis Center report (Beaver reallocation, 2017)** covering White River system plants — https://www.swl.usace.army.mil/Portals/50/docs/beaverlake/Beaver%20Water%20Reallocation/Appendix%20E%20-%20BVWSS%20HAC%20Report.pdf?ver=2017-08-04-160015-650 .
- News feature with interior photographs: "A now-rare look inside Table Rock Dam" — https://sports.yahoo.com/now-rare-look-inside-table-103035220.html (also https://www.aol.com/news/now-rare-look-inside-table-103035220.html ): "four massive generators"; public tours run with partner organisations ended roughly seven years before the article.
- Turbine inspection context: "Table Rock Dam's gates open as turbines inspected" — https://www.bransontrilakesnews.com/news/article_0f202b3c-f99d-11e4-847a-e38db2bc006b.html .

---

## 6. Outlet works, water-quality intakes, minimum flow, dissolved oxygen

- **No separate low-level outlet works / sluices were identified** (query 35 returned only generic references). All returned descriptions attribute releases either to the 10-gate spillway or to the turbines ("As much as 20,000 cfs can be released through turbines, but even more can be moved … through its 10 flood gates" — https://www.branson.com/learn-old/lake-taneycomo/ result set). Whether the concrete section contains flood-control sluices is therefore **open**; the Water Power article's statement that the dam "supplies water to the Table Rock power plant" and the absence of any "sluice" reference in Corps releases suggest a spillway-plus-penstock-only outlet system (I).
- **Hypolimnetic (cold) discharge:** the penstock intakes draw from deep in the pool; released water "averages 48 degrees Fahrenheit year-round," which created the Lake Taneycomo trout fishery ( https://lilleyslanding.com/lake-taneycomo/ ; https://midlakesguide.com/lake-taneycomo/ ; https://mdc.mo.gov/fishing/fishing-prospects/areas/lake-taneycomo ).
- **Shepherd of the Hills Hatchery** (Missouri Dept. of Conservation), at the foot of the dam, established 1957, produces 350,000–400,000 lb of trout/yr, ~80 % stocked in Taneycomo ( https://mdc.mo.gov/discover-nature/places/shepherd-hills-conservation-education-center ; https://thecrankycamper.com/2022/03/21/missouri-state-parks-table-rock-dam-and-the-hatchery/ ). Its water supply is drawn from the dam's cold releases; the specific hatchery-supply intake/pipe and any contractual minimum-flow figure were **not found** (query 22; query 16 of the blocked batch was intended to close this).
- **Dissolved-oxygen problem:** seasonal DO depression in releases "has been a concern since 1970"; from mid-July the hypolimnetic water is oxygen-poor; below 6 mg/L fishing success declines; 1986 estimate of lost benefits $358,000/yr; "The U.S. Army Corps of Engineers has proposed a structural modification of Table Rock Dam" and has made turbine modifications ( https://www.lakescientist.com/low-do-in-lake-taneycomo-has-become-a-high-priority/ ; https://www.tandfonline.com/doi/abs/10.1080/07438148609354626 ; https://www.lakeexpo.com/boating/fishing_hunting/trout-impacted-by-low-oxygen-levels-at-lake-taneycomo/article_1d4ea99e-9543-11e5-941b-bbfee0c6fb68.html ; https://forums.ozarkanglers.com/waters/lakes/lake-taneycomo/seasonal-issue-low-dissolved-oxygen-and-restricted-flows-r285/ ). The USGS modelled Table Rock Lake hydrodynamics/temperature/DO in WRIR 03-4237 ( https://pubs.usgs.gov/wri/2003/4237/wrir20034237.pdf ). USACE publishes "Pertinent Data for Dissolved Oxygen Season (June to December)" for Table Rock at https://www.swl-wc.usace.army.mil/newweb/Pertinent_WQ_Data2.htm . The exact hardware (turbine venting/aeration, oxygen injection, or a minimum-flow unit) was **not confirmed** (query 36).
- Lake Taneycomo: created 1913 by Powersite Dam; ~2,080 surface acres; normal surface el. 702 ft; Table Rock holds generation when work is needed at Powersite ( https://en.wikipedia.org/wiki/Lake_Taneycomo ; https://grokipedia.com/page/Lake_Taneycomo ; https://forums.ozarkanglers.com/waters/lakes/lake-taneycomo/generation-boating-and-wading-r537/ ).

---

## 7. Elevations

### 7.1 Elevation table (ft, project datum unless noted)

| Feature | Elevation (ft) | Source | Conf. |
|---|---|---|---|
| Streambed at dam (947 − 252) | ≈695 | derived | I |
| NID structural base (947 − 260) | ≈687 | derived from NID height | I |
| Lake Taneycomo normal pool (tailwater) | 702 | Wikipedia Lake Taneycomo; grokipedia | V |
| Observed tailwater during generation (Aug 2026) | 702.6 – 706.6 | https://www.swl-wc.usace.army.mil/pages/data/tabular/htm/tabrock.htm | S |
| Penstock intake invert / centreline | not found | — | open |
| Service spillway crest (ogee) | 896 | Wikipedia; stillwatersresort | V |
| Top of service-spillway gates (closed) | ≈933 | derived | I |
| Top of conservation (power) pool | 915 | Wikipedia; SMP 2020; USGS SIM 3499 | V |
| Seasonal conservation pool, May–Nov | 917 | SMP 2020 | S |
| Top of flood-control pool | 931 | Wikipedia; SMP 2020; tablerocklakelevel.com | V |
| Record pool (27 Apr 2011) | 935.47 | Branson media release / EoA | V |
| Top of surcharge pool | 936 | SMP 2020 | S |
| Design max pool for 558,000 cfs (derived) | ≈942 | derived | I |
| Top of dam | 947 | Wikipedia (also "947 or 948" in various copies) | V |
| Auxiliary spillway top of structure / "crest" | 948 (NAVD 88 per EoA) | EoA; bcgforums | S — see §12 |
| Revised-PMF pool | "ten feet higher" than original design pool (absolute value not given) | Water Power / betterbranson | S |

### 7.2 Storage / area relations
- Total storage 3,462,000 acre-ft (Corps rec. page; NID) — this is the flood-pool (931) capacity. Normal (915) storage 2,702,000 acre-ft (NID via damsoftheworld) ⇒ flood-control storage ≈760,000 acre-ft (I). power-technology's 4,267.77 million m³ = 3.46 M acre-ft (consistent).
- Area/shoreline at 915: 42,644 acres / 758 mi (SMP 2020 official) vs. 43,100 acres / 745 mi (Corps recreation page) vs. "nearly 800 miles" (Wikipedia). Use the SMP figures.
- Latest bathymetry: USGS SIM 3499 (2020 survey), https://pubs.usgs.gov/publication/sim3499/full , sheets https://pubs.usgs.gov/sim/3499/sim3499_sheet01.pdf and https://pubs.usgs.gov/sim/3499/sim3499_sheet03.pdf ; data release https://www.usgs.gov/data/bathymetric-and-supporting-data-table-rock-lake-near-branson-missouri-2020 .

### 7.3 Datums
- The 2020 USGS survey is referenced to **NAVD 88 (GEOID18)** and reports the conservation pool at "approximately 915 ft" ( https://pubs.usgs.gov/sim/3499/sim3499_sheet03.pdf ), implying the NGVD 29 → NAVD 88 shift at Table Rock is small (sub-foot). The EoA quotes the auxiliary-spillway 948 as NAVD 88. Corps operational elevations (896/915/931/947) are legacy project-datum values (NGVD 29 or the older Corps datum) (U). Do not mix datums in the model; a VERTCON check at 36.60° N, 93.31° W is recommended (generic guidance: https://www.fema.gov/sites/default/files/documents/Vertical_Datum_Conversion_Guidance_Nov_2023.pdf ; https://geodesy.noaa.gov/datums/vertical/north-american-vertical-datum-1988.shtml ).

---

## 8. Roads, access and appurtenances

- **Missouri Route 165 (co-signed MO 265)** crosses the crest of the dam and, on a separate bridge, the auxiliary-spillway channel ( https://en.wikipedia.org/wiki/Missouri_Route_165 ; https://www.swl.usace.army.mil/Media/News-Releases/Article/3614799/one-lane-of-highway-165265-across-table-rock-dam-to-temporarily-close/ ; https://katv.com/news/local/routine-bridge-inspection-to-close-highway-165265-at-table-rock-dam-katv-news-share ; https://www.explorebranson.com/media/news/one-lane-highway-165-265-cross-table-rock-dam-to-temporarily-close ; https://tablerockfishingintel.com/News/Scheduled-Lane-Closure-over-Table-Rock-Dam ). The road is two-lane (one lane at a time is closed for inspections — V by implication). Sidewalk/railing details were not captured (blocked query).
- **Auxiliary-spillway highway bridge** — built under the Granite contract to "relocate Missouri Highway 165 over the completed channel" ( https://www.waterpowermagazine.com/news/spillway-work-continues-at-table-rock-lake/ ). Span/length not found.
- **Dewey Short Visitor Center** (USACE regional visitor center): opened 27 April 2012; LEED Gold; ~15,000 sq ft; ≈$8 million; on a limestone bluff at the dam with decks overlooking the lake, the dam and Lake Taneycomo; Table Rock Lakeshore Trail adjacent to its parking lot ( https://www.army.mil/article/85518/Construction_of_new_regional_visitor_center_at_Table_Rock_crosses_regional_boundaries/ ; https://www.joplinglobe.com/news/local_news/new-dewey-short-visitors-center-offers-views-history-of-table/article_018180ac-1bcc-5ea3-ab61-701944d19c7d.html ; https://www.thousandhills.com/branson-attractions/area-attractions/dewey-short-visitors-center/ ; https://recreation.gov/camping/campgrounds/10040545 ). The pre-2012 visitor center is not described in returned results.
- **"Table Rock" overlook** — the namesake scenic overlook above Lake Taneycomo on MO 165 about three miles east of the dam ( https://en.wikipedia.org/wiki/Table_Rock,_Missouri ).
- **Table Rock State Park** adjoins the dam on the lake side ( https://mostateparks.com/page/table-rock-state-park/park-history-table-rock ; https://en.wikipedia.org/wiki/Table_Rock_State_Park_(Missouri) ).
- **Hatchery / below-dam area** — Shepherd of the Hills Hatchery and Conservation Center immediately below the dam; warning horn for releases (§3).
- **Security / tours** — public powerhouse tours (run with partners) ended about seven years before the "rare look inside" article ( https://sports.yahoo.com/now-rare-look-inside-table-103035220.html ). Post-2001 fencing changes were not captured (blocked query).
- **Current official lake map (Mar 2026):** https://www.swl.usace.army.mil/Portals/50/docs/tablerocklake/2026-TABLE-ROCK-MAP-3-2-26.pdf ; 2016 map (Wikimedia copy of USACE map): https://upload.wikimedia.org/wikipedia/commons/1/11/Table_Rock_Lake,_Missouri_and_Arkansas_-_USACE-p16021coll10-10699.pdf .

---

## 9. National Inventory of Dams (NID) record

| NID field | Value | Source | Conf. |
|---|---|---|---|
| NID ID | **MO30202** (slug used by snoflo's NID mirror; the NID itself was not directly readable) | https://snoflo.org/reservoir/missouri/mo30202-table-rock-dam | S |
| Dam name / river / county | Table Rock Dam / White River / Taney County, MO | snoflo; damsoftheworld | V |
| Owner | USACE (federal) | snoflo; damsoftheworld | V |
| Primary purpose | Flood Risk Reduction; others: Irrigation, Fish & Wildlife Pond, Recreation, Hydroelectric, Water Supply | https://damsoftheworld.com/usa/missouri/table-rock-dam/ | S |
| Dam type | Concrete (gravity) | snoflo | S |
| Year completed (NID) | 1959 (NID) vs. 1958 (construction) | snoflo; damsoftheworld | conflict (NID likely uses power-on-line year) |
| NID height | 260 ft | snoflo; damsoftheworld | V (NID) |
| Length | 6,454 ft | snoflo; damsoftheworld | V (NID) |
| Structural volume | 4,550,000 cu yd | damsoftheworld | S |
| NID storage | 3,462,000 acre-ft | snoflo; damsoftheworld; Corps | V |
| Normal storage | 2,702,000 acre-ft | damsoftheworld | S |
| Drainage area | 4,020 sq mi | damsoftheworld; USGS 07053450 result set | V |
| Spillway type / width | Controlled / 1,058 ft | snoflo | S — see §12 |
| Hazard potential | High | snoflo; Dam Safety Fact Sheet | V |
| EAP | Maintained and exercised with stakeholders; regular inspection/monitoring | https://www.swl.usace.army.mil/Portals/50/docs/tablerocklake/Table%20Rock%20Dam%20Safety%20Fact%20Sheet%2020170313.pdf | V |
| Max discharge | not captured (NID field) | — | open |
| DSAC classification | not found (blocked query) | — | open |

NID background: https://en.wikipedia.org/wiki/National_Inventory_of_Dams ; https://www.fema.gov/grants/mitigation/learn/dam-safety/national-inventory-dams ; data dictionary https://usace-cwbi-prod-il2-nld2-docs.s3-us-gov-west-1.amazonaws.com/ec51e2ba-daff-4dbe-95eb-af13b91066ba/NID%20Data%20Dictionary%202021-12-14.pdf . USACE water-data overview page for the dam: https://water.usace.army.mil/overview/swl/locations/table_rock_dam .

Benefits quoted on the Dam Safety Fact Sheet (13 Mar 2017): flood-damage reduction $550,900,000 "since placed into service" (as summarised), hydropower ≈$42.5 M/yr, recreation ≈$64.5 M/yr.

---

## 10. Drawings, design memoranda, model studies and archival sources

**Primary engineering documents located (titles/URLs only — contents could not be opened in this environment):**
1. **Table Rock Lake Master Plan — Appendix C: Design Memorandums and Prior Supplements** (USACE Digital Library, Project Management Reports): https://usace.contentdm.oclc.org/digital/collection/p16021coll7/id/4047/ — should enumerate every Design Memorandum (site selection, hydrology, spillway, embankment, powerhouse, relocations) by number and date.
2. **Table Rock Lake, Missouri and Arkansas — Maps and Drawings** (USACE Digital Library): https://usace.contentdm.oclc.org/digital/collection/p16021coll10/id/10699/ (project map; Wikimedia mirror above).
3. **Table Rock Lake MO T22NR23W – M1322N23W0 (Maps and Drawings):** https://usace.contentdm.oclc.org/digital/collection/p16021coll10/id/8791/ ; boundary survey sheets https://usace.contentdm.oclc.org/digital/api/collection/p16021coll10/id/8749/download and https://usace.contentdm.oclc.org/digital/api/collection/p16021coll10/id/8879/download .
4. **USACE Hydropower 2020 Project Report, Table Rock Lake:** https://usace.contentdm.oclc.org/digital/api/collection/p16021coll2/id/7094/download .
5. **Little Rock District project-data volume ("LITTLE ROCK, ARKANSAS"):** https://usace.contentdm.oclc.org/digital/api/collection/p16021coll6/id/436/download and https://usace.contentdm.oclc.org/digital/api/collection/p16021coll7/id/149/download (returned by the design-memorandum query; likely Annual Report/Project Maps volumes containing "pertinent data" tables).
6. **Shoreline Management Plan, Table Rock Lake, 2020** (project history, pool elevations, acreage): https://www.swl.usace.army.mil/Portals/50/docs/tablerocklake/Shoreline/trl-smp-2020/2020-Table-Rock-Lake-SMP.pdf?ver=Twxc2zPTvBoSh1SVnfwPyQ%3D%3D .
7. **USACE Dam Safety Fact Sheet (2017-03-13):** https://www.swl.usace.army.mil/Portals/50/docs/tablerocklake/Table%20Rock%20Dam%20Safety%20Fact%20Sheet%2020170313.pdf .
8. **Corps hand-out "Table Rock Dam is located on the White River…":** http://www.bransontablerocklake.com/wp-content/uploads/2015/10/08-Right-Table-Rock-Dam-Info-Corps-of-Eng.pdf .
9. **Real-time/tabular operations (pool, tailwater, generation, releases):** https://www.swl-wc.usace.army.mil/pages/data/tabular/htm/tabrock.htm ; forecasts https://www.swl-wc.usace.army.mil/pages/reports/remote/lakfcst.htm .
10. **USGS gauge 07053450 White River below Table Rock Dam near Branson:** https://waterdata.usgs.gov/monitoring-location/USGS-07053450/ ; https://waterdata.usgs.gov/nwis/inventory?agency_code=USGS&site_no=07053450 ; NOAA https://water.noaa.gov/gauges/form7 .
11. **Monthly Catalog of U.S. Government Publications entries** that may be Table Rock Corps reports (not opened): https://mocat.library.unt.edu/catalog/790-17015 ; https://mocat.library.unt.edu/catalog/776-12617/citation ; https://mocat.library.unt.edu/catalog/773-7680 ; https://mocat.library.unt.edu/catalog/837-17723 .
12. **Library of Congress map holdings, Table Rock Lake (USACE Little Rock District):** https://www.loc.gov/maps/?all=true&fa=location:missouri%7Clocation:arkansas%7Ccontributor:united+states.+army.+corps+of+engineers.+little+rock+district%7Clocation:table+rock+lake .
13. **Historic USGS 7.5′ "Table Rock Dam, Missouri" quadrangle:** https://mapstore.mytopo.com/products/historic_7-5x7-5_table-rock-dam_missouri (useful for pre-2005 crest-road alignment and the original left-abutment topography).

**Not found by this agent** (but identified by title in sibling file 04 — see §11A item 1: WES TR 2-504, "Spillway and Conduits for Table Rock Dam"): a WES/ERDC hydraulic-model report for the Table Rock spillway/stilling basin (queries 10, 51; blocked query 67). The ERDC Knowledge Core technical-report collection ( https://erdc-library.erdc.dren.mil/collections/3f208109-8800-4fdb-844a-dacc2e3058a5 ) and the WES review "Trends in baffled, hydraulic jump, stilling basin designs" ( https://usace.contentdm.oclc.org/digital/api/collection/p266001coll1/id/6779/download ) are the places to look; a 1950s WES Technical Memorandum 2-xxx on "Spillway, Table Rock Dam" is plausible but **unverified**. No HAER/HABS recordation of Table Rock Dam was found (query 38).

---

## 11. Quick-reference geometry for the 3-D model (with confidence)

| Element | Modelling value | Basis |
|---|---|---|
| Dam axis length | 6,423 ft (crest road length ≈ same) | V |
| Concrete section | 1,602 ft long, crest el. 947, crest width 35 ft, 30 monoliths (~53 ft) | V / S / S |
| Spillway | 531 ft of the concrete section; 10 bays × 45 ft clear, 9 piers ≈ 9 ft; ogee crest el. 896; tainter gates 37 ft high (top ≈ 933 closed); hoist deck + MO 165 bridge over bays | V / I / V / V / U |
| Non-overflow + intake monoliths | ≈1,071 ft total; 4 intake bays with 18-ft penstocks descending to a powerhouse at the toe | I / V / U |
| Powerhouse | 4 main + 2 station-service units; Westinghouse generators; dimensions unknown | S |
| Embankments | 4,821 ft combined; crest el. 947; individual lengths/slopes unknown; riprap upstream (typical) | V / open |
| Auxiliary spillway | separate gated structure "north of the main dam": 8 bays, 467-ft weir, structure 85 ft tall, top el. 948, gates likely ~50 ft wide; approach channel from lake, discharge channel to Taneycomo; MO 165 bridge over channel | V / S / I |
| Pools | 915 normal (917 summer), 931 flood, 936 surcharge, 947 top of dam | V |
| Tailwater | 702 (Lake Taneycomo), rising to ~706–707 under full generation | V / S |
| Streambed | ≈695 | I |

---

## 11A. Cross-references from sibling research files (added after the search budget was exhausted)

Facts found by the parallel agents (files `02-history-timeline.md`, `03-photography-catalog.md`, `04-documents-technical-literature.md`, `06-video-film-3d-assets.md` in this directory) that bear directly on the engineering questions above. URLs are as recorded in those files; confidence tags are theirs.

1. **WES Technical Report No. 2-504, "Spillway and Conduits for Table Rock Dam, White River, Mo. — Hydraulic Model Investigation"** (USACE Waterways Experiment Station, Vicksburg; c. 1959; title confirmed [S] in file 04; PDF not yet located; UNT Monthly Catalog candidate records: https://mocat.library.unt.edu/catalog/776-12617/citation ; https://mocat.library.unt.edu/catalog/845-9071 ; https://mocat.library.unt.edu/catalog/839-21282 ; https://mocat.library.unt.edu/catalog/790-17015 ). This is the model study sought in §10. Its title — "Spillway **and Conduits**" — indicates the concrete section does include low-level flood-control conduits (sluices), partly answering open question 18; number, size and invert elevation remain unknown. Expected plates: general plan; ogee crest section; pier/gate-slot geometry; chute/bucket/stilling-basin sections; conduit profiles and intake; discharge rating curves.
2. **White River Basin Water Control Master Manual** (Little Rock District, c. 1998), archived copy: https://webarchive.library.unt.edu/web/20161027183913mp_/http://www.swl-wc.usace.army.mil/pages/docs/White_River_Master_Manual.pdf — per file 04 it carries project pertinent-data tables (crest elevations, gate sizes, outlet capacities). Highest-priority document to open for §3, §6 and §7.
3. **USACE Dam Safety Fact Sheet (13 Mar 2017)** also reports a **2012 risk assessment** placing Table Rock in the "moderate to high risk" group among >700 USACE dams, with failure modes of embankment slope instability/erosion and spillway-equipment operational problems during an extreme flood; no deficiency under normal operation (per file 04). Bears on the DSAC item in §9.
4. **Full-generation turbine flow ≈12,000 cfs**: the 30 May 2020 gate-opening video is captioned "+5,500 cfs on top of 12,000 cfs" ( https://www.youtube.com/watch?v=cNDPwvd_B5c , per file 06). Supports the ≈12,000–14,000 cfs four-unit estimate over the "20,000 cfs" figure (open question 14).
5. **Auxiliary-spillway program cost/date**: International Water Power gives ≈US$60 M total with completion expected 2004 (per file 02) vs. ≈$65 M / completed 2005 elsewhere — added to conflict 17.
6. **2019 crest-road rehabilitation**: "Table Rock Dam to close again for rehab project" (Mar 2019), https://www.bransontrilakesnews.com/news_free/article_a63393b2-4753-11e9-b57e-83aceb2fedba.html (per file 02) — scope not captured; check post-2019 imagery for new railings, hoist enclosures or paint.
7. **Powerhouse interior**: the 20 July 2022 News-Leader tour led by Corps PAO Jay Townsend shows the generator hall and a shaft gallery with the shaft "spinning >100 rpm" ( https://www.aol.com/news/now-rare-look-inside-table-103035220.html , per file 03). A 50-MW Francis unit at ~200 ft head would normally run at a 60-Hz synchronous speed of 112.5–128.6 rpm (64–56 poles) — consistent, but the exact speed is unverified (I/U).
8. **Auxiliary-spillway channel**: cut through rock adjacent to the embankment, with large rock-cut faces visible today (per file 02) — relevant to terrain modelling around the north end of the dam.

---

## 12. Conflicts & open questions

1. **Dam length 6,423 ft vs. 6,454 ft (NID).** Corps design literature and all narrative sources: 6,423 ( http://www.bransontablerocklake.com/wp-content/uploads/2015/10/08-Right-Table-Rock-Dam-Info-Corps-of-Eng.pdf ; EoA). NID-derived sites: 6,454 ( https://snoflo.org/reservoir/missouri/mo30202-table-rock-dam ; https://damsoftheworld.com/usa/missouri/table-rock-dam/ ). Likely definitional (NID "dam length" including abutment structures); unresolved.
2. **Height 252 ft vs. 260 ft vs. 76.2 m (250 ft).** 252 above streambed (Corps); 260 NID height (probably foundation-to-crest); 76.2 m (Water Power magazine, rounded). Use 252 above streambed for visible geometry.
3. **Top of dam 947 vs. 948.** Wikipedia infobox 947; some copies say 948; EoA gives the auxiliary spillway "948 ft (NAVD 88)". Could be a datum artefact (NGVD 29 947 ≈ NAVD 88 947.x) or simply rounding. Unresolved.
4. **Auxiliary spillway "crest at 948."** Physically implausible for a weir crest (above top of dam); more likely top-of-structure (85-ft-tall structure, per https://bcgforums.com/threads/table-rock-dam-auxiliary-spillway.32929/ ). True ogee crest elevation and gate height remain **open** — the most important unresolved dimension for the model.
5. **Auxiliary spillway gate width.** Not published; 467 ft / 8 bays suggests ~50-ft gates with ~9.6-ft piers (I). Open.
6. **Auxiliary spillway exact siting.** EoA: "north of the main dam." Its relation to the Dewey Short Visitor Center, the left embankment and the MO 165 alignment must come from imagery/geodata (other agents). Open.
7. **Which end is which.** No source explicitly labels left/right (north/south) embankment lengths or the position of the spillway relative to the powerhouse within the concrete section. Open — defer to the imagery/geodata dimension.
8. **Gate height 37 ft vs. "maximum height of approximately 30 feet."** The 45×37 ft figure is the structural gate size (Corps hand-out/EoA). The 30-ft statement ( http://forsythwx.blogspot.com/2019/02/worst-case-scenario-for-table-rock-dam.html ) is probably the maximum hoist lift (gate lip clears the flow when raised ~30 ft), not gate height. Treat 37 as the skin-plate height.
9. **NID spillway width 1,058 ft.** Does not equal 531 + 467 = 998 ft. Possibly 531 + 527 (an overall auxiliary-structure length including abutments) or another NID convention. Open.
10. **Plant capacity 200 MW (4 × 50 MW) vs. any 160 MW figure.** All returned sources give 200 MW / 4 × 50 MW ( https://www.power-technology.com/marketdata/table-rock-us/ ; EoA; Wikipedia). No source returned 160 MW or 4 × 40 MW; if the original 1959 nameplate was lower and later uprated, that history was not found. Generator 52.63 MVA supports a 50-MW rating at 0.95 pf.
11. **Turbine OEM.** power-technology lists Andritz Hydro as turbine supplier; this is inconsistent with a 1958–61 installation (Andritz's U.S. hydro business dates from later acquisitions) and probably reflects rehab work or a database default. Original OEM (Allis-Chalmers / Newport News / BLH / S. Morgan Smith) unconfirmed. Open.
12. **Units 3–4 commissioning: April & June 1961 (EoA) vs. August 1961 ( https://www.bransonalpinemountaincoaster.com/table-rock-dam-keeping-us-cool-for-70-years ).** Prefer EoA.
13. **Units 1–2: May 1959 (Wikipedia/EoA) vs. June 1959 (blog).** Prefer May 1959 (first unit) — both may be right for units 1 and 2 respectively.
14. **Turbine discharge "as much as 20,000 cfs"** (fishing sources) vs. ≈13,000–14,000 cfs from a 4 × 50 MW / ~200-ft-head calculation (I), and vs. the "12,000 cfs" full-generation figure in a 2020 video caption (§11A item 4). Prefer ≈12,000–14,000 cfs; confirm from the swl-wc tabular page.
15. **Lake area/shoreline at 915:** 42,644 ac / 758 mi (SMP 2020) vs. 43,100 ac / 745 mi (Corps rec. page) vs. "nearly 800 mi" (Wikipedia). Survey-vintage differences; use SMP.
16. **NID "year completed" 1959 vs. dam completion August 1958.** Definitional.
17. **Auxiliary spillway cost: $65 M program (EoA/Better Branson) vs. ≈$60 M (International Water Power, per file 02) vs. $43.4 M Granite contract.** Not a true conflict (program includes Phase 1 Kiewit excavation, grouting, embankment, design/engineering); use "≈$60–65 M, completed 2005".
18. **Outlet works.** No narrative source mentions sluices, but the WES model-study title "Spillway **and Conduits** for Table Rock Dam" (TR 2-504, §11A item 1) implies low-level conduits exist in the concrete section. Number, size, invert and discharge capacity remain open — the Water Control Master Manual pertinent-data table (§11A item 2) should settle this.
19. **Switchyard voltage, transmission lines, station-service arrangement, crane, rpm, powerhouse envelope dimensions, penstock intake elevations, trashracks/bulkheads, stilling-basin geometry, embankment zoning/slopes, grout curtain, foundation formation** — all open; targeted queries were either unproductive or blocked by the search budget (§13).

---

## 13. Follow-up queries blocked by the exhausted search budget (recommended next actions)

These 18 queries were issued but refused ("session has used its web search budget"). They should be run first when budget is restored, together with attempts to open the USACE Digital Library PDFs listed in §10:

1. "USACE Hydropower 2020 Project Report" "Table Rock" units capacity megawatts generation head
2. hydroreform.org "Table Rock" hydro project capacity MW owner Corps of Engineers White River
3. site:swpa.gov OR site:energy.gov/swpa "Table Rock" powerplant capacity MW White River projects
4. "Table Rock" dam "station service" OR "house units" OR "two small" generators "six" turbines powerhouse Branson
5. "Table Rock Dam" "auxiliary spillway" crest elevation OR "sill" "917" OR "918" OR "915" OR "919" gates top "948" ogee
6. "Table Rock" auxiliary spillway location north "Dewey Short" OR "visitor center" channel discharge "Lake Taneycomo" Highway 165 bridge length feet MoDOT
7. "Table Rock Dam" "left abutment" OR "right abutment" OR "north embankment" OR "south embankment" … concrete section powerhouse spillway arrangement
8. "Table Rock" dam penstock intake elevation OR "streambed elevation" OR "riverbed" "695" OR "696" OR "700" feet White River foundation
9. "Table Rock" hydroelectric "rated head" OR "net head" OR "gross head" OR "design head" feet Francis turbine generating unit White River Corps
10. "Table Rock" powerhouse "generator" "rewind" OR "stator" OR "rehabilitation" OR "overhaul" unit Corps "Little Rock District" hydropower news
11. "Table Rock Dam" "hydraulic model investigation" OR "model study" spillway OR "powerhouse" OR "auxiliary spillway" ERDC OR WES OR "Waterways Experiment Station" report
12. "Table Rock Dam" DSAC OR "dam safety action classification" OR "risk assessment" OR "periodic assessment" OR "periodic inspection" Corps Little Rock
13. "Table Rock Dam" security fence OR barriers OR "closed to the public" OR "tours" powerhouse "September 11" OR 2001 OR "9/11" access
14. "Table Rock Dam" walk across OR walkway OR sidewalk OR pedestrians OR bicycles "across the dam" Highway 165 overlook parking
15. "Table Rock" hydropower switchyard OR substation SWPA "Table Rock" 161 kV OR "161kV" transmission "Branson" OR "Ozark Beach" OR "Springfield"
16. "Table Rock Dam" minimum flow OR "minimum release" cfs hatchery OR "Lake Taneycomo" agreement Corps "Missouri Department of Conservation" generation schedule
17. "60 years of Table Rock Dam" bransontrilakesnews monoliths concrete poured 1955 cofferdam river closure
18. "Table Rock Dam" "dedicated" OR "dedication" 1959 "Eisenhower" OR "Dewey Short" June 14 1959 power units 1961 completed

Additional high-value targets not yet attempted: the Table Rock Water Control Manual (pertinent-data table with all elevations, gate and sluice data); the NID public record for MO30202 (nid.sec.usace.army.mil — unverified URL); FERC/SWPA "Table Rock" rate-schedule documents listing unit ratings; MoDOT bridge inventory for the MO 165 structures over the dam and auxiliary spillway; Missouri Geological Survey geologic map of the Table Rock Dam quadrangle for the foundation formation.

---

## 14. Search log

All WebSearch queries issued by this agent, in order. Status: R = returned results (used above); B = blocked by exhausted session budget.

| # | Query | Status |
|---|---|---|
| 1 | "Table Rock Dam" length height concrete section embankment specifications feet | R |
| 2 | Table Rock Dam Missouri wikipedia | R |
| 3 | site:swl.usace.army.mil Table Rock Dam | R |
| 4 | "Table Rock Dam" "6,423 feet" OR "1,602 feet" OR "252 feet" concrete gravity | R |
| 5 | Table Rock Dam National Inventory of Dams NID ID hazard MO | R |
| 6 | "Table Rock Dam" spillway "tainter gates" "45 feet" OR "45 ft" gates dimensions | R |
| 7 | Table Rock Dam auxiliary spillway Kiewit 2005 tainter gates ogee weir | R |
| 8 | Table Rock Dam powerhouse turbines generators manufacturer Allis-Chalmers Westinghouse 50 MW | R |
| 9 | Table Rock Dam elevations spillway crest 896 conservation pool 915 flood pool 931 top of dam | R |
| 10 | "Table Rock" dam "Waterways Experiment Station" hydraulic model spillway stilling basin report | R |
| 11 | "Table Rock Dam" "Dam Safety" fact sheet Little Rock District storage acre-feet drainage area square miles | R |
| 12 | "MO30202" Table Rock Dam | R |
| 13 | "Table Rock Dam" tainter gates "37 feet" OR "37 ft" OR "45 by 37" spillway gate height width | R |
| 14 | "Table Rock Dam" spillway discharge "558,000" OR "550,000" cfs capacity stilling basin | R |
| 15 | Table Rock Dam powerhouse penstock diameter feet intake trashracks draft tube generating units Francis rpm | R |
| 16 | Table Rock Dam hydropower rehabilitation turbine replacement Andritz OR Voith OR "General Electric" units rewind Little Rock District | R |
| 17 | Table Rock Dam switchyard "161 kV" OR "161-kV" OR "115 kV" Southwestern Power Administration transmission line | R |
| 18 | Table Rock Dam "Highway 165" across the dam two lanes sidewalk overlook bridge auxiliary spillway | R |
| 19 | Table Rock Dam auxiliary spillway phase 2 contractor completed cost million cubic yards concrete gates bridge | R |
| 20 | Table Rock Dam foundation geology dolomite formation "Cotter" OR "Jefferson City" OR "Roubidoux" OR "Gasconade" grout curtain | R |
| 21 | "Table Rock" dam "probable maximum flood" PMF pool elevation dam safety modification study spillway adequacy | R |
| 22 | Table Rock Dam Shepherd of the Hills hatchery minimum flow cold water intake Lake Taneycomo turbine release temperature | R |
| 23 | "Table Rock" dam "drainage area" "4,020" OR "4020" square miles White River | R |
| 24 | "Table Rock Dam" "Dewey Short Visitor Center" 2012 LEED overlook parking | R |
| 25 | site:swl-wc.usace.army.mil Table Rock tabrock elevation | R |
| 26 | "Table Rock" dam NID "MO30202" OR "MO 30202" hazard potential "high" EAP inspection year completed 1958 height storage | R |
| 27 | "Table Rock Dam" "crest gates" OR "flood gates" "45 feet wide" OR "45-foot" OR "37 feet high" OR "37-foot" spillway | R |
| 28 | site:dtic.mil "Table Rock Dam" OR "Table Rock Reservoir" White River Missouri | R (no DTIC hits) |
| 29 | "Table Rock" dam "design memorandum" OR "definite project report" OR "general design memorandum" White River Corps of Engineers 1950s | R |
| 30 | waterpowermagazine "Spillway work continues at Table Rock lake" auxiliary spillway | R |
| 31 | "Table Rock" auxiliary spillway "Phase 2" OR "Phase II" contract awarded concrete gates hoists 2003 2004 Corps Little Rock | R |
| 32 | "Table Rock" powerhouse 1958 turbines "Allis-Chalmers" OR "Newport News" OR "Baldwin-Lima-Hamilton" OR "S. Morgan Smith" hydraulic turbines White River | R |
| 33 | "Table Rock" hydroelectric plant generators rpm "13.8 kV" OR "vertical shaft" OR "rated head" Francis "Table Rock Dam" power plant profile | R |
| 34 | "Table Rock Dam" "Lake Taneycomo" tailwater elevation "701" OR "702" OR "704" OR "706" feet Powersite Dam pool | R |
| 35 | "Table Rock Dam" "outlet works" OR "sluices" OR "low-flow" OR "low flow outlet" OR "flood control conduits" concrete section | R (generic only) |
| 36 | "Table Rock Dam" "dissolved oxygen" OR "aeration" OR "turbine venting" OR "selective withdrawal" Lake Taneycomo trout Corps modification | R |
| 37 | "Table Rock" lake "pertinent data" OR "project data" OR "water control manual" Corps of Engineers White River elevation spillway power pool | R |
| 38 | "Table Rock Dam" Historic American Engineering Record OR HAER OR "National Register" engineering documentation drawings | R (none found) |
| 39 | "Table Rock" dam embankment "rolled" earth fill "impervious core" OR "riprap" OR "slopes" OR "rock fill" construction 1950s White River | R (generic) |
| 40 | "Table Rock Dam" foundation "dolomite" OR "limestone" OR "karst" OR "solution" grouting cutoff geology construction | R (generic) |
| 41 | usace.contentdm.oclc.org "Table Rock" design memorandum spillway powerhouse embankment "Little Rock District" digital library | R |
| 42 | "Table Rock Lake, Missouri and Arkansas" maps and drawings USACE Digital Library plan section | R |
| 43 | "Advanced Construction Techniques" "Table Rock" auxiliary spillway grouting foundation curtain drilling | R |
| 44 | "Foundation Grouting Practices at Corps of Engineers Dams" "Table Rock" | R (inclusion unconfirmed) |
| 45 | "Granite Construction" "Table Rock" auxiliary spillway cubic yards concrete tainter gates bridge completed 2005 Branson | R |
| 46 | "Table Rock" auxiliary spillway gates "feet wide" OR "feet high" OR "50-foot" OR "40-foot" eight tainter gates size "948" | R |
| 47 | "Table Rock Dam" powerhouse "feet long" OR "feet wide" OR "feet tall" OR "stories" generator floor crane tour description | R |
| 48 | "Table Rock" powerhouse "Andritz" turbine runner replacement contract Corps hydropower "Table Rock" units 2020 OR 2021 OR 2022 OR 2023 OR 2024 | R (no Table Rock hits) |
| 49 | "Table Rock" hydropower "200,000 kilowatts" OR "200,000 kw" OR "160,000 kilowatts" OR "50,000 kilowatts" OR "40,000 kilowatts" generating units 1959 | R |
| 50 | "Table Rock Dam" "monoliths" OR "monolith" concrete gravity section construction blocks | R |
| 51 | "Table Rock Dam" spillway "stilling basin" OR "flip bucket" OR "baffle blocks" OR "end sill" OR "apron" energy dissipation below gates | R (generic) |
| 52 | "Table Rock Dam" "trash rack" OR "trashrack" OR "intake gates" OR "bulkhead" OR "stoplog" penstock intake power | R (generic) |
| 53 | "Table Rock Lake" elevation datum "NGVD 29" OR "NGVD29" OR "NAVD 88" OR "NAVD88" conversion feet Corps USGS bathymetric 2020 | R |
| 54 | "Table Rock Dam" spillway gates "per foot" OR "each gate" cfs release "gate opening" "one foot" Corps release rate | R |
| 55 | "Table Rock Dam" record spillway release cfs "all ten" gates 2011 OR 2015 OR 2017 highest lake level "935" OR "936" | R |
| 56 | "Table Rock Dam" original construction cost "$65" OR "$66" OR "million" 1958 contractor "Flippin Materials" OR "Morrison-Knudsen" OR "Peter Kiewit" | R |
| 57–74 | The 18 queries listed in §13 | B |

---

## 15. Source URL index (as returned by search; none invented)

**USACE / federal**
- https://www.swl.usace.army.mil/Missions/Recreation/Lakes/Table-Rock-Lake/Dam-and-Lake-Information/
- https://www.swl.usace.army.mil/Missions/Recreation/Lakes/Table-Rock-Lake/
- https://www.swl.usace.army.mil/Portals/50/docs/tablerocklake/Table%20Rock%20Dam%20Safety%20Fact%20Sheet%2020170313.pdf
- https://www.swl.usace.army.mil/Portals/50/docs/tablerocklake/Shoreline/trl-smp-2020/2020-Table-Rock-Lake-SMP.pdf?ver=Twxc2zPTvBoSh1SVnfwPyQ%3D%3D
- https://www.swl.usace.army.mil/Portals/50/docs/tablerocklake/2026-TABLE-ROCK-MAP-3-2-26.pdf
- https://www.swl.usace.army.mil/Portals/50/docs/beaverlake/Beaver%20Water%20Reallocation/Appendix%20E%20-%20BVWSS%20HAC%20Report.pdf?ver=2017-08-04-160015-650
- https://www.swl.usace.army.mil/Media/News-Releases/Tag/9786/table-rock-dam/
- https://www.swl.usace.army.mil/Media/News-Releases/Article/4120553/warning-horn-below-table-rock-dam-not-operational/
- https://www.swl.usace.army.mil/Media/News-Releases/Article/4210796/usace-to-begin-spillway-releases-at-table-rock-dam/
- https://www.swl.usace.army.mil/Media/News-Releases/Article/4326122/usace-to-begin-intermittent-spillway-releases-at-table-rock-dam/
- https://www.swl.usace.army.mil/Media/News-Releases/Article/4484316/table-rock-dam-spillway-gates-to-open-intermittently-for-routine-inspections/
- https://www.swl.usace.army.mil/Media/News-Releases/Article/2367946/new-date-for-temporary-lane-closure-of-highway-165-across-table-rock-dam-and-au/
- https://www.swl.usace.army.mil/Media/News-Releases/Article/3614799/one-lane-of-highway-165265-across-table-rock-dam-to-temporarily-close/
- https://www.swl.usace.army.mil/Media/Images/igphoto/2002230281/
- https://www.swl.usace.army.mil/Media/Images/igphoto/2002994177/
- https://www.swl-wc.usace.army.mil/pages/data/tabular/htm/tabrock.htm
- https://www.swl-wc.usace.army.mil/newweb/Pertinent_WQ_Data2.htm
- https://www.swl-wc.usace.army.mil/pages/reports/remote/lakfcst.htm
- https://water.usace.army.mil/overview/swl/locations/table_rock_dam
- https://usace.contentdm.oclc.org/digital/collection/p16021coll7/id/4047/
- https://usace.contentdm.oclc.org/digital/collection/p16021coll10/id/10699/
- https://usace.contentdm.oclc.org/digital/collection/p16021coll10/id/8791/
- https://usace.contentdm.oclc.org/digital/api/collection/p16021coll10/id/8749/download
- https://usace.contentdm.oclc.org/digital/api/collection/p16021coll10/id/8879/download
- https://usace.contentdm.oclc.org/digital/api/collection/p16021coll2/id/7094/download
- https://usace.contentdm.oclc.org/digital/api/collection/p16021coll6/id/436/download
- https://usace.contentdm.oclc.org/digital/api/collection/p16021coll7/id/149/download
- https://usace.contentdm.oclc.org/digital/api/collection/p266001coll1/id/6779/download
- https://apps.dtic.mil/sti/tr/pdf/ADA152527.pdf
- https://apps.dtic.mil/sti/tr/pdf/ADA402909.pdf
- https://apps.dtic.mil/sti/citations/ADA402900
- https://damsafety.org/content/engineering-and-design-design-spillway-tainter-gates
- https://www.publications.usace.army.mil/portals/76/publications/engineermanuals/em_1110-2-1603.pdf
- https://www.publications.usace.army.mil/Portals/76/publications/EngineerManuals/EM_1110-2-2400.pdf
- https://erdc-library.erdc.dren.mil/collections/3f208109-8800-4fdb-844a-dacc2e3058a5
- https://www.army.mil/article/85518/Construction_of_new_regional_visitor_center_at_Table_Rock_crosses_regional_boundaries/
- https://recreation.gov/camping/campgrounds/10040545
- https://www.energy.gov/swpa/southwestern-power-administration
- https://www.energy.gov/swpa/transmission
- https://www.fema.gov/grants/mitigation/learn/dam-safety/national-inventory-dams
- https://usace-cwbi-prod-il2-nld2-docs.s3-us-gov-west-1.amazonaws.com/ec51e2ba-daff-4dbe-95eb-af13b91066ba/NID%20Data%20Dictionary%202021-12-14.pdf
- https://www.fema.gov/sites/default/files/documents/Vertical_Datum_Conversion_Guidance_Nov_2023.pdf
- https://geodesy.noaa.gov/datums/vertical/north-american-vertical-datum-1988.shtml

**USGS / NOAA**
- https://waterdata.usgs.gov/monitoring-location/USGS-07053450/
- https://waterdata.usgs.gov/nwis/inventory?agency_code=USGS&site_no=07053450
- https://www.waterqualitydata.us/provider/NWIS/USGS-MO/USGS-07053450/
- https://water.noaa.gov/gauges/form7
- https://pubs.usgs.gov/publication/sim3499/full
- https://pubs.usgs.gov/sim/3499/sim3499_sheet01.pdf
- https://pubs.usgs.gov/sim/3499/sim3499_sheet03.pdf
- https://www.usgs.gov/data/bathymetric-and-supporting-data-table-rock-lake-near-branson-missouri-2020
- https://pubs.usgs.gov/wri/2003/4237/wrir20034237.pdf

**Encyclopedic / reference**
- https://en.wikipedia.org/wiki/Table_Rock_Lake
- https://simple.wikipedia.org/wiki/Table_Rock_Lake
- https://en.wikipedia.org/wiki/Table_Rock,_Missouri
- https://en.wikipedia.org/wiki/Table_Rock_State_Park_(Missouri)
- https://en.wikipedia.org/wiki/Lake_Taneycomo
- https://en.wikipedia.org/wiki/Missouri_Route_165
- https://en.wikipedia.org/wiki/Tainter_gate
- https://en.wikipedia.org/wiki/National_Inventory_of_Dams
- https://encyclopediaofarkansas.net/entries/table-rock-dam-and-lake-6610/
- https://encyclopediaofarkansas.net/entries/bull-shoals-dam-and-lake-6078/
- https://grokipedia.com/page/Table_Rock_Lake
- https://grokipedia.com/page/Lake_Taneycomo
- https://damsoftheworld.com/usa/missouri/table-rock-dam/
- https://snoflo.org/reservoir/missouri/mo30202-table-rock-dam
- https://hydroreform.org/hydro-project/table-rock/
- https://www.power-technology.com/marketdata/table-rock-us/
- https://www.power-technology.com/data-insights/power-plant-profile-table-rock-us/
- https://mostateparks.com/page/table-rock-state-park/park-history-table-rock
- https://upload.wikimedia.org/wikipedia/commons/1/11/Table_Rock_Lake,_Missouri_and_Arkansas_-_USACE-p16021coll10-10699.pdf
- https://www.loc.gov/maps/?all=true&fa=location:missouri%7Clocation:arkansas%7Ccontributor:united+states.+army.+corps+of+engineers.+little+rock+district%7Clocation:table+rock+lake
- https://mapstore.mytopo.com/products/historic_7-5x7-5_table-rock-dam_missouri
- https://mocat.library.unt.edu/catalog/790-17015 ; https://mocat.library.unt.edu/catalog/776-12617/citation ; https://mocat.library.unt.edu/catalog/773-7680 ; https://mocat.library.unt.edu/catalog/837-17723

**Contractors / trade press**
- https://www.kiewit.com/projects/table-rock-auxillary-spillway-phase-1/
- http://www.advancedconstructiontechniques.com/Table-Rock-Auxiliary-Spillway-Phase-1.asp
- https://www.waterpowermagazine.com/news/spillway-work-continues-at-table-rock-lake/
- https://www.thebluebook.com/iProView/1191135/granite-construction-inc/material-suppliers//construction-projects/table-rock-auxiliary-spillway-136610/
- http://www.thebluebook.com/iProView/1191135/granite-construction-company/material-suppliers/construction-projects/table-rock-auxiliary-spillway-136610
- https://www.andritz.com/hydro-en/about-andritz-hydro/locations/charlotte-usa/usa-service-and-rehabilitation

**News / local**
- http://www.bransontablerocklake.com/wp-content/uploads/2015/10/08-Right-Table-Rock-Dam-Info-Corps-of-Eng.pdf
- https://www.bransontrilakesnews.com/news_free/article_bb503ec6-922b-11e9-bafc-2b604507deb9.html
- https://www.bransontrilakesnews.com/news/article_0f202b3c-f99d-11e4-847a-e38db2bc006b.html
- https://www.bransontrilakesnews.com/news_free/article_f3542f48-32ba-11e8-99e3-4b21a260b653.html
- https://www.bransontrilakesnews.com/news_free/article_cf4f2d6e-fa87-11e9-b0f3-472361e6ecfb.html
- https://www.bransontrilakesnews.com/editorial/article_49f86c25-22ad-5dac-9680-4a66633c5eab.html
- https://www.joplinglobe.com/news/local_news/bill-caldwell-table-rock-dam-a-dream-half-a-century-in-making/article_b95781ba-4fce-11ed-97cf-430ab9e86a01.html
- https://www.joplinglobe.com/news/local_news/new-dewey-short-visitors-center-offers-views-history-of-table/article_018180ac-1bcc-5ea3-ab61-701944d19c7d.html
- https://sports.yahoo.com/now-rare-look-inside-table-103035220.html
- https://www.aol.com/news/now-rare-look-inside-table-103035220.html
- https://www.ky3.com/2025/06/09/us-army-corps-engineers-opens-spillways-table-rock-dam-adjusting-service-hours/
- https://www.ky3.com/content/news/table-rock-flood-gates-420288403.html
- https://www.ky3.com/content/news/Corps-of-Engineers-plans-to-open-gates-at-Table-Rock-Dam-Saturday-570886451.html
- https://www.ky3.com/content/news/Corps-of-Engineers-releases-more-water-from-Table-Rock-Lake-spillways-509557331.html
- https://www.ky3.com/content/news/Corps-began-spillway-release-at-Table-Rock-Lake-481827561.html
- https://bransonregister.com/corps-began-spillway-release-at-table-rock-lake/
- https://bransonregister.com/table-rock-dam-auxiliary-spillway-inspection-to-closes-one-lane-of-highway-165/
- https://www.bransonmo.gov/DocumentCenter/View/11193/City-Monitoring-Table-Rock-Dam-Spillway-Release
- https://www.ozarksfirst.com/top-stories/us-army-corps-table-rock-dam-spillway/
- https://www.facebook.com/littlerockusace/posts/crews-opened-table-rock-dam-spillway-gates-1-through-9-to-1-foot-each-at-3-pm-to/1081220050712665/
- https://www.legends1063.fm/news/local-news/spillway-gates-opened-at-table-rock-dam/
- https://www.komc.com/news-content/local-news/spillway-gates-opened-at-table-rock-dam/
- https://katv.com/news/local/routine-bridge-inspection-to-close-highway-165265-at-table-rock-dam-katv-news-share
- https://www.explorebranson.com/media/news/one-lane-highway-165-265-cross-table-rock-dam-to-temporarily-close
- https://tablerockfishingintel.com/News/Scheduled-Lane-Closure-over-Table-Rock-Dam
- https://www.tablerocklakelevel.com/
- https://www.youtube.com/watch?v=cNDPwvd_B5c
- http://forsythwx.blogspot.com/2019/02/worst-case-scenario-for-table-rock-dam.html
- https://www.facebook.com/wrvhs/posts/early-construction-of-table-rock-dam-in-the-1950s-near-branson-missouri/1369217011914971/
- https://www.pbs.org/video/table-rock-lake-beneath-still-waters-n980rw/
- http://zweiglist.com/shifting-course-the-white-river-and-table-rock-dam/

**Tourism / fishing (secondary; used only where they reproduce Corps figures)**
- https://travelcurious.com/united-states-of-america/branson/attractions/table-rock-dam-ABMXG1
- https://discoverbranson.com/travel-guide/376455/table-rock-lake-dam-in-branson-missouri
- https://www.branson.com/learn/free-things-to-do-in-branson/table-rock-dam/
- https://www.branson.com/learn/free-things-to-do-in-branson/branson-lakes/
- https://www.branson.com/learn-old/lake-taneycomo/
- https://www.betterbranson.com/item/table-rock-dam/
- https://www.betterbranson.com/item/table-rock-lake/
- https://www.stillwatersresort.com/post/about-table-rock-lake
- https://www.bransonalpinemountaincoaster.com/table-rock-dam-keeping-us-cool-for-70-years
- https://www.thousandhills.com/branson-attractions/area-attractions/table-rock-dam/
- https://www.thousandhills.com/branson-attractions/area-attractions/dewey-short-visitors-center/
- https://lostintheozarks.com/table-rock-dam
- https://www.visittablerocklake.com/about-table-rock-lake/
- https://lilleyslanding.com/lake-taneycomo/
- https://midlakesguide.com/lake-taneycomo/
- https://www.bransontourismcenter.com/info/2014/03/06/did-you-know-this-about-bransons-lake-taneycomo/
- https://thecrankycamper.com/2022/03/21/missouri-state-parks-table-rock-dam-and-the-hatchery/
- https://www.flyingthekoop.com/2015/06/24/table-rock-dam/
- https://forums.ozarkanglers.com/waters/lakes/lake-taneycomo/generation-boating-and-wading-r537/
- https://forums.ozarkanglers.com/waters/lakes/lake-taneycomo/seasonal-issue-low-dissolved-oxygen-and-restricted-flows-r285/
- https://forums.ozarkanglers.com/topic/73967-lets-start-up-at-the-cable/
- https://forums.ozarkanglers.com/topic/69623-tr-lake-level-going-forward/?page=4
- https://bcgforums.com/threads/table-rock-dam-auxiliary-spillway.32929/
- https://sunsetcovecoa.com/wp-content/uploads/2020/10/Tablerock-Corp-of-Engineers-Update.pdf
- https://www.riverhillstraveler.com/table-rock-lake/

**Water quality / science**
- https://www.lakescientist.com/low-do-in-lake-taneycomo-has-become-a-high-priority/
- https://www.lakeexpo.com/boating/fishing_hunting/trout-impacted-by-low-oxygen-levels-at-lake-taneycomo/article_1d4ea99e-9543-11e5-941b-bbfee0c6fb68.html
- https://www.tandfonline.com/doi/abs/10.1080/07438148609354626
- https://mdc.mo.gov/fishing/fishing-prospects/areas/lake-taneycomo
- https://mdc.mo.gov/discover-nature/places/shepherd-hills-conservation-education-center
- https://www.science.gov/topicpages/t/table+rock+lake.html
