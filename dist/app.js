const strategies = [
  { name: "High-resolution terrain and drainage mapping", category: "Map & assess", approach: "Data", cost: "Moderate", horizon: "0–2 years", scale: "City", purpose: "Reveal flow paths, low points, blocked drainage, and assets exposed at different water depths.", action: "combine current elevation surveys, drainage records, field checks, and modeled flood depths in one maintained map", caution: "Maps age quickly when land, channels, or drainage systems change.", metric: "the share of the exposed area covered by current, ground-checked flood-depth maps" },
  { name: "Community flood-history mapping", category: "Map & assess", approach: "Community", cost: "Low", horizon: "0–1 year", scale: "Neighborhood", purpose: "Capture street-level flood depths, timings, safe paths, and failure points that formal records often miss.", action: "run inclusive mapping sessions, verify recollections against physical marks and records, and publish the results in accessible formats", caution: "Memory and participation biases must be documented rather than treated as measured hydrology.", metric: "the number of locally reported hotspots verified and reflected in plans" },
  { name: "Critical-asset vulnerability register", category: "Map & assess", approach: "Policy", cost: "Low", horizon: "0–1 year", scale: "City", purpose: "Identify the facilities, networks, people, and supply chains whose failure would cause cascading harm.", action: "rank assets by exposure, fragility, service consequence, dependency, and time needed to restore them", caution: "Protect sensitive security and personal data while keeping decisions transparent.", metric: "the percentage of high-consequence assets with funded risk-reduction actions" },
  { name: "Climate stress-testing of flood standards", category: "Map & assess", approach: "Hybrid", cost: "Moderate", horizon: "1–3 years", scale: "Regional", purpose: "Test whether today's design standards remain safe under future rainfall, sea level, land use, and compound events.", action: "model multiple plausible futures and define adaptive thresholds instead of relying on one forecast", caution: "Scenario uncertainty should drive flexible decisions, not delay urgent no-regret measures.", metric: "the proportion of major investments assessed against multiple future scenarios" },
  { name: "Watershed digital twin", category: "Map & assess", approach: "Data", cost: "High", horizon: "2–5 years", scale: "Watershed", purpose: "Connect terrain, rainfall, rivers, drainage, assets, and operations in a shared decision model.", action: "start with priority decisions, calibrate a lean model, and add detail only where it improves those decisions", caution: "A complex model without clear ownership, calibration, or maintenance can create false confidence.", metric: "forecast accuracy and the number of real planning decisions improved by the model" },

  { name: "Rainfall and river sensor network", category: "Forecast & warn", approach: "Data", cost: "Moderate", horizon: "0–2 years", scale: "Watershed", purpose: "Detect rapidly changing water conditions early enough to operate assets and warn people.", action: "place redundant gauges at decision-critical points and establish maintenance, telemetry, and data-quality rules", caution: "Sensors require physical protection, calibration, communications backup, and named maintainers.", metric: "network uptime and usable warning lead time during flood events" },
  { name: "Radar and satellite flood nowcasting", category: "Forecast & warn", approach: "Data", cost: "High", horizon: "1–3 years", scale: "Regional", purpose: "Track severe rainfall and expanding inundation where ground monitoring is sparse or delayed.", action: "blend remote-sensing feeds with local gauges, terrain, and trained forecaster judgment", caution: "Remote data can misread terrain, buildings, vegetation, and short intense storms without local calibration.", metric: "event-detection accuracy and the reduction in forecast blind spots" },
  { name: "Impact-based flood forecasting", category: "Forecast & warn", approach: "Hybrid", cost: "Moderate", horizon: "1–3 years", scale: "Regional", purpose: "Translate predicted water into expected consequences for people, roads, homes, crops, and essential services.", action: "link hazard thresholds to exposed assets, vulnerability, plain-language impacts, and predefined response actions", caution: "Impact thresholds must be reviewed after every event and differentiated for vulnerable groups.", metric: "the percentage of warnings that trigger timely, appropriate protective action" },
  { name: "Crowdsourced flood incident reporting", category: "Forecast & warn", approach: "Community", cost: "Low", horizon: "0–1 year", scale: "City", purpose: "Create a rapid picture of passable routes, rising water, trapped people, and service failures.", action: "offer low-bandwidth reporting channels, verify reports, remove duplicates, and display confidence and timestamps", caution: "Protect reporters, moderate misinformation, and never expose precise locations of vulnerable people.", metric: "median verification time and coverage of confirmed incident reports" },
  { name: "Compound flood forecasting", category: "Forecast & warn", approach: "Data", cost: "High", horizon: "2–5 years", scale: "Regional", purpose: "Anticipate interacting rainfall, river flow, tide, storm surge, groundwater, and drainage failures.", action: "couple the relevant models and define joint operating triggers for barriers, pumps, reservoirs, and warnings", caution: "Independent hazard forecasts can dangerously understate combined water levels and durations.", metric: "forecast error for combined peak level, onset, and duration" },

  { name: "Headwater forest restoration", category: "Watershed", approach: "Nature-based", cost: "Moderate", horizon: "5+ years", scale: "Watershed", purpose: "Slow runoff, stabilize slopes, improve soil structure, and reduce sediment reaching channels.", action: "protect existing forest first, restore priority slopes with locally suitable species, and manage fire and grazing", caution: "Forest restoration reduces some runoff and erosion but cannot stop extreme floods on its own.", metric: "vegetation survival, infiltration, erosion, and peak-flow response in treated subcatchments" },
  { name: "Soil-infiltration farming", category: "Watershed", approach: "Nature-based", cost: "Low", horizon: "1–3 years", scale: "Watershed", purpose: "Increase the amount of rain held in agricultural soils while reducing erosion and rapid runoff.", action: "combine cover crops, reduced tillage, contour practices, organic matter, and compacted-soil repair", caution: "Soil, slope, crop, waterlogging, and farmer economics determine which practices are safe.", metric: "infiltration rate, soil cover, erosion reduction, and farm participation" },
  { name: "Wetland and peatland restoration", category: "Watershed", approach: "Nature-based", cost: "Moderate", horizon: "2–5 years", scale: "Watershed", purpose: "Restore water storage, slow releases, support biodiversity, and protect carbon-rich soils.", action: "stop drainage and damaging extraction, restore natural water levels, and secure long-term stewardship", caution: "Poorly planned rewetting can move water or livelihood impacts to neighboring land.", metric: "restored hydrology, storage volume, habitat condition, and avoided peat subsidence" },
  { name: "Riparian buffer corridors", category: "Watershed", approach: "Nature-based", cost: "Low", horizon: "1–3 years", scale: "Watershed", purpose: "Give streams vegetated space to filter runoff, stabilize banks, and dissipate flood energy.", action: "map priority reaches, establish native multi-layer buffers, manage access, and connect habitat corridors", caution: "Buffer width and vegetation must reflect flood power, erosion, farming needs, and local rights.", metric: "protected river length, bank stability, sediment load, and buffer survival" },
  { name: "Post-wildfire catchment stabilization", category: "Watershed", approach: "Hybrid", cost: "Moderate", horizon: "0–2 years", scale: "Watershed", purpose: "Reduce flash flooding, debris flows, sediment, and channel blockage after severe fire.", action: "rapidly map burn severity, protect channels and roads, stabilize priority slopes, and prepare downstream warnings", caution: "Do not disturb recovering soils or rely on treatments that fail during the first intense storm.", metric: "treated high-risk area, debris captured safely, and downstream warning performance" },

  { name: "Distributed detention basins", category: "Store & slow", approach: "Engineered", cost: "High", horizon: "2–5 years", scale: "City", purpose: "Hold stormwater across a catchment and release it at rates downstream systems can manage.", action: "size a network of basins using catchment-wide modeling, safe overflows, sediment access, and maintenance funding", caution: "Uncoordinated basins or clogged outlets can shift peaks or create new hazards.", metric: "verified storage volume and reduction in downstream peak flow" },
  { name: "Floodable parks and plazas", category: "Store & slow", approach: "Hybrid", cost: "Moderate", horizon: "2–5 years", scale: "Neighborhood", purpose: "Temporarily store floodwater in public spaces designed to recover quickly after an event.", action: "shape safe storage, overflow, access, planting, surfaces, and rapid clean-up around everyday community use", caution: "Design must prevent hidden drops, contaminated water exposure, unsafe currents, and inaccessible recreation.", metric: "safe storage volume, recovery time, and days of normal public use" },
  { name: "Rainwater harvesting network", category: "Store & slow", approach: "Hybrid", cost: "Moderate", horizon: "1–3 years", scale: "Neighborhood", purpose: "Capture roof runoff close to where rain falls and reuse it instead of sending it immediately into drains.", action: "aggregate correctly sized tanks, smart drawdown rules, first-flush treatment, and dependable maintenance", caution: "Full tanks provide no storm storage; water quality and mosquito control need active management.", metric: "stormwater captured, pre-storm capacity available, and potable water demand avoided" },
  { name: "Blue-green roof program", category: "Store & slow", approach: "Hybrid", cost: "Moderate", horizon: "2–5 years", scale: "City", purpose: "Retain and delay rooftop runoff while cooling buildings and adding urban habitat.", action: "target structurally suitable roofs, set performance standards, and pair incentives with inspection and maintenance", caution: "Structural load, waterproofing, wind, drought, fire, and drainage overflow require site-specific design.", metric: "retention capacity installed and runoff delay during target storms" },
  { name: "Restored ponds, lakes, and oxbows", category: "Store & slow", approach: "Nature-based", cost: "Moderate", horizon: "2–5 years", scale: "Watershed", purpose: "Reconnect natural water bodies that store floodwater and release it more gradually.", action: "restore hydrologic connections while protecting water quality, habitat, public safety, and adjacent land rights", caution: "Contaminated sediment, invasive species, evaporation, and mosquito habitat must be assessed.", metric: "functional flood-storage volume and ecological condition over time" },

  { name: "Daylighted urban streams", category: "Drain & convey", approach: "Hybrid", cost: "High", horizon: "5+ years", scale: "City", purpose: "Replace constrained buried channels with visible waterways that carry, store, and clean urban runoff.", action: "open priority reaches, provide a safe flood corridor, reconnect tributaries, and create maintainable public edges", caution: "Land, utilities, contaminated soils, dry-weather flow, and displacement risks require early resolution.", metric: "conveyance and storage gained, water quality, habitat, and public access" },
  { name: "Right-sized, redundant culverts", category: "Drain & convey", approach: "Engineered", cost: "High", horizon: "2–5 years", scale: "Regional", purpose: "Keep roads, rail, and waterways functioning when existing crossings constrict flow or collect debris.", action: "prioritize failure consequences, size for future flows and debris, add redundancy, and protect against scour", caution: "A larger crossing can accelerate water and worsen downstream erosion without system-level design.", metric: "priority crossings upgraded and avoided closure hours during floods" },
  { name: "Separated stormwater and sewer systems", category: "Drain & convey", approach: "Engineered", cost: "Transformational", horizon: "5+ years", scale: "City", purpose: "Prevent intense rain from overwhelming sanitation systems and releasing contaminated floodwater.", action: "phase separation by highest health and overflow benefit while repairing infiltration and illegal connections", caution: "Separation is disruptive and expensive; green storage and source control should proceed in parallel.", metric: "combined-sewer overflow volume, flooded properties, and contamination events" },
  { name: "Smart drains and pump controls", category: "Drain & convey", approach: "Engineered", cost: "High", horizon: "1–3 years", scale: "City", purpose: "Operate gates, pumps, storage, and drains as one system using forecasts and real-time water levels.", action: "install fail-safe controls, backup power, manual overrides, cybersecurity, and tested operating rules", caution: "Automation cannot compensate for undersized, blocked, or unmaintained physical infrastructure.", metric: "water level exceedances, pump uptime, energy use, and successful fail-safe operation" },
  { name: "Designed surface overflow corridors", category: "Drain & convey", approach: "Hybrid", cost: "Moderate", horizon: "2–5 years", scale: "City", purpose: "Give water a planned, visible route when underground drainage reaches capacity.", action: "grade streets and open spaces toward safe storage or discharge while protecting people and entrances", caution: "Depth, velocity, traffic, accessibility, and contaminated flow must remain within safe limits.", metric: "properties removed from dangerous flow paths and corridor performance in major storms" },

  { name: "Floodplain reconnection", category: "Make room & protect", approach: "Nature-based", cost: "High", horizon: "5+ years", scale: "Watershed", purpose: "Let rivers spread into suitable land, reducing water levels and restoring floodplain ecosystems.", action: "remove or modify constraints, secure land agreements, restore channels, and plan for sediment and habitat", caution: "Land tenure, livelihoods, groundwater, contamination, and displaced risk require negotiated solutions.", metric: "floodplain area reconnected and reduction in water levels at priority locations" },
  { name: "Setback levees and relief channels", category: "Make room & protect", approach: "Hybrid", cost: "Transformational", horizon: "5+ years", scale: "Regional", purpose: "Create more room for high river flows while maintaining targeted protection for settlements and assets.", action: "relocate barriers where feasible, connect relief flow paths, and design for safe overtopping and residual risk", caution: "Protection can encourage unsafe development and transfer risk unless zoning and emergency plans change too.", metric: "additional conveyance area and reduction in expected annual flood damage" },
  { name: "Adaptive levees and floodwalls", category: "Make room & protect", approach: "Engineered", cost: "Transformational", horizon: "5+ years", scale: "City", purpose: "Protect dense or critical areas where relocation or natural storage alone cannot manage residual risk.", action: "design a complete line of defense with foundations, seepage control, closures, inspections, and upgrade pathways", caution: "Failure can be catastrophic; communicate residual risk and avoid creating a false sense of safety.", metric: "certified system reliability, inspection closure rate, and residual risk reduction" },
  { name: "Deployable property barriers", category: "Make room & protect", approach: "Engineered", cost: "Low", horizon: "0–1 year", scale: "Parcel", purpose: "Block shallow, short-duration water at doors, vents, and other building openings.", action: "survey each property, select tested products, train users, store parts accessibly, and drill deployment", caution: "Barriers can trap occupants, shift water, fail under depth or debris, and must never replace evacuation.", metric: "successful drill deployment time and protected openings during eligible events" },
  { name: "Living shoreline and edge buffers", category: "Make room & protect", approach: "Nature-based", cost: "Moderate", horizon: "2–5 years", scale: "Regional", purpose: "Use locally appropriate wetlands, reefs, dunes, vegetation, or naturalized banks to reduce wave and erosion energy.", action: "restore the site's native protective edge, allow room to migrate, and combine with structures only where needed", caution: "Nature-based edges have ecological limits and establishment periods; extreme residual risk still needs planning.", metric: "edge survival, erosion change, wave attenuation, and habitat condition" },

  { name: "Elevated and floodable building design", category: "Resilient assets", approach: "Engineered", cost: "High", horizon: "2–5 years", scale: "Parcel", purpose: "Keep occupied floors above design water or let selected lower areas flood without structural collapse or toxic loss.", action: "set risk-based floor levels, preserve safe access, use water-compatible materials, and avoid obstructing flood flow", caution: "Elevation can reduce accessibility, wind performance, and neighborhood fit if treated as a single-issue design.", metric: "people and asset value above design flood level and time needed to reoccupy" },
  { name: "Floodproof critical building systems", category: "Resilient assets", approach: "Engineered", cost: "Moderate", horizon: "1–3 years", scale: "Parcel", purpose: "Keep power, communications, controls, medical equipment, fuel, and vertical transport working during floods.", action: "relocate or seal critical equipment, separate circuits, add protected backup, and test under realistic failure scenarios", caution: "Floodproofing one component is insufficient when access, staff, cooling, fuel, or suppliers still fail.", metric: "hours of essential service maintained and recovery time after inundation" },
  { name: "Flood-resilient transport links", category: "Resilient assets", approach: "Hybrid", cost: "Transformational", horizon: "5+ years", scale: "Regional", purpose: "Maintain safe routes for evacuation, emergency response, supply chains, and everyday mobility.", action: "prioritize network redundancy, elevate or protect critical segments, manage drainage, and plan safe closures", caution: "Protecting a road or rail line can block natural flow and increase flooding on adjacent land.", metric: "critical trips preserved and network closure hours during flood events" },
  { name: "Water-safe power and communications", category: "Resilient assets", approach: "Engineered", cost: "High", horizon: "2–5 years", scale: "Regional", purpose: "Prevent floodwater from disabling the energy and information systems needed for warning, response, and recovery.", action: "map dependencies, elevate or protect nodes, segment failures, diversify supply, and pre-plan rapid restoration", caution: "Backup systems require protected fuel, cooling, communications, maintenance, and regular load testing.", metric: "essential customer-hours served and time to restore failed nodes" },
  { name: "Protected water and sanitation services", category: "Resilient assets", approach: "Hybrid", cost: "High", horizon: "2–5 years", scale: "City", purpose: "Prevent contaminated water, sewage release, treatment failure, and disease during and after floods.", action: "seal or elevate facilities, protect wells, manage backflow, add redundancy, and prepare safe emergency supply", caution: "Physical protection must be paired with laboratory capacity, public guidance, and service for informal areas.", metric: "safe service continuity, contamination incidents, and restoration time" },

  { name: "Risk-based land-use zoning", category: "Policy & governance", approach: "Policy", cost: "Low", horizon: "1–3 years", scale: "City", purpose: "Steer new growth away from dangerous flow, erosion, surge, and deep-inundation zones.", action: "tie transparent hazard tiers to permitted uses, density, floor levels, disclosure, enforcement, and regular updates", caution: "Zoning without housing alternatives or fair enforcement can deepen exclusion and informal development.", metric: "new exposure avoided and compliance in the highest-risk zones" },
  { name: "No-net-runoff development standard", category: "Policy & governance", approach: "Policy", cost: "Low", horizon: "1–3 years", scale: "City", purpose: "Require development to manage the extra runoff it creates instead of transferring it downstream.", action: "set measurable retention and discharge limits, require maintenance security, inspect performance, and cover small sites", caution: "Site-by-site compliance must add up to catchment performance and account for storms beyond design capacity.", metric: "verified runoff volume and peak discharge avoided by regulated sites" },
  { name: "Voluntary buyouts, land swaps, and managed retreat", category: "Policy & governance", approach: "Policy", cost: "Transformational", horizon: "5+ years", scale: "Neighborhood", purpose: "Move people and assets out of places where repeated flooding cannot be made acceptably safe or affordable.", action: "offer fair voluntary pathways, replacement options, livelihood support, tenant protection, and permanent risk-compatible land use", caution: "Coercion, unequal valuation, cultural loss, and fragmented buyouts can cause lasting harm.", metric: "households safely rehoused, repeated losses ended, and vacated land kept risk-compatible" },
  { name: "Drainage maintenance performance contracts", category: "Policy & governance", approach: "Policy", cost: "Moderate", horizon: "0–2 years", scale: "City", purpose: "Turn routine clearing, inspection, repair, and waste control into measurable flood-risk performance.", action: "map assets, publish service standards, verify condition independently, and pay for outcomes rather than activity alone", caution: "Aggressive clearing can damage habitat or push debris downstream; worker safety and waste disposal are essential.", metric: "priority assets meeting condition standard and blockages resolved before storm season" },
  { name: "Watershed authority and shared data rules", category: "Policy & governance", approach: "Policy", cost: "Moderate", horizon: "2–5 years", scale: "Watershed", purpose: "Coordinate upstream and downstream land, water, infrastructure, finance, and emergency decisions.", action: "define authority, representation, shared evidence, dispute resolution, funding, and public accountability across boundaries", caution: "A new institution adds little unless it has legitimacy, stable resources, and power to align decisions.", metric: "cross-boundary actions funded and reduction in conflicting flood investments" },

  { name: "Multilingual, accessible warning network", category: "Prepare & respond", approach: "Community", cost: "Low", horizon: "0–1 year", scale: "City", purpose: "Reach people quickly with understandable flood impacts and specific protective actions.", action: "combine sirens, cell broadcast, radio, trusted messengers, visual cues, and accessible formats with backup power", caution: "Warnings must reach people with disabilities, limited connectivity, language barriers, and low institutional trust.", metric: "warning reach, comprehension, lead time, and protective action by vulnerable groups" },
  { name: "Evacuation route and transport planning", category: "Prepare & respond", approach: "Community", cost: "Moderate", horizon: "0–2 years", scale: "City", purpose: "Move people before routes become impassable while supporting those without cars or independent mobility.", action: "model route failure times, designate alternatives and pickup points, manage traffic, and practice assisted evacuation", caution: "A route marked on a map is not safe unless depth, velocity, congestion, lighting, and destination capacity are tested.", metric: "time to clear exposed areas and percentage of at-risk people with a workable transport plan" },
  { name: "Accessible vertical refuge and shelters", category: "Prepare & respond", approach: "Hybrid", cost: "High", horizon: "2–5 years", scale: "Neighborhood", purpose: "Provide safe nearby refuge where horizontal evacuation is too slow, uncertain, or impossible.", action: "locate above credible flood levels, verify structure and access, and provide inclusive sanitation, power, water, and management", caution: "Shelters need safe approach routes and must not encourage late evacuation when leaving earlier is safer.", metric: "safe refuge places within accessible travel time for the exposed population" },
  { name: "Flood drills and local response teams", category: "Prepare & respond", approach: "Community", cost: "Low", horizon: "0–1 year", scale: "Neighborhood", purpose: "Turn plans into practiced roles, faster decisions, mutual aid, and trusted local leadership.", action: "train diverse neighborhood teams, rehearse realistic scenarios, include night and power-loss conditions, and close lessons", caution: "Volunteer systems need safeguarding, insurance, equipment, refreshers, and professional emergency-service coordination.", metric: "participation, drill performance, corrected gaps, and response time" },
  { name: "Pre-positioned rescue and relief supplies", category: "Prepare & respond", approach: "Community", cost: "Moderate", horizon: "0–1 year", scale: "Regional", purpose: "Keep life-saving equipment, medicines, food, water, sanitation, and communications available when access fails.", action: "locate secure distributed caches above flood level, rotate stock, track custody, and match contents to local scenarios", caution: "Poorly maintained caches expire, disappear, or become inaccessible exactly when needed.", metric: "stock readiness and time to deliver priority supplies after routes fail" },

  { name: "Rapid damage assessment and cash assistance", category: "Recover & adapt", approach: "Finance", cost: "Moderate", horizon: "0–1 year", scale: "Regional", purpose: "Help affected households meet urgent needs and begin recovery without long administrative delays.", action: "pre-register secure payment options, use transparent damage tiers, combine remote screening with appeals, and monitor inclusion", caution: "Digital exclusion, identity loss, fraud controls, and tenant or informal-worker eligibility require advance design.", metric: "time from impact to payment and assistance coverage of the most affected groups" },
  { name: "Build-back-safer reconstruction standard", category: "Recover & adapt", approach: "Policy", cost: "Moderate", horizon: "1–3 years", scale: "City", purpose: "Use reconstruction to reduce future damage instead of restoring the same vulnerability.", action: "publish simple hazard-specific standards, provide technical help and finance, inspect fairly, and allow safe local materials", caution: "Higher standards without grants, supply chains, or skilled labor can delay recovery and exclude low-income households.", metric: "reconstructed assets meeting safer standards and reduction in repeat damage" },
  { name: "Parametric flood-risk finance", category: "Recover & adapt", approach: "Finance", cost: "Moderate", horizon: "1–3 years", scale: "Regional", purpose: "Release predefined funds rapidly when measured rainfall, river, surge, or inundation thresholds are crossed.", action: "select transparent triggers that match real loss, combine with contingency plans, and explain basis risk clearly", caution: "A trigger can miss severe individual losses; parametric products must complement rather than replace broader protection.", metric: "payout speed, trigger-to-loss match, and funded recovery actions" },
  { name: "Flood-resilient livelihoods and crops", category: "Recover & adapt", approach: "Hybrid", cost: "Moderate", horizon: "1–3 years", scale: "Watershed", purpose: "Reduce income and food-system disruption where seasonal or repeated flooding affects work and agriculture.", action: "diversify income, adjust calendars, use water-compatible crops and storage, protect tools and livestock, and secure market access", caution: "Adaptation must be farmer- and worker-led and should not transfer financial or ecological risk to them.", metric: "income recovery time, crop loss, food availability, and adoption without increased debt" },
  { name: "Debris, waste, and disease recovery system", category: "Recover & adapt", approach: "Hybrid", cost: "High", horizon: "0–2 years", scale: "City", purpose: "Clear dangerous debris and contaminated waste quickly while preventing injury, dumping, and post-flood disease.", action: "pre-plan sorting sites, contractors, protective equipment, hazardous waste routes, vector control, and public health messaging", caution: "Rushed clearance can expose workers, destroy salvageable property, and move contamination into waterways or communities.", metric: "safe clearance time, worker incidents, waste recovery, and post-flood disease rates" }
];

const settings = [
  { name: "Dense coastal megacities", region: "Global urban coast", floodTypes: ["Coastal", "Pluvial", "Compound"], condition: "dense development, subsidence, high asset concentration, and limited space for water", adaptation: "phase measures block by block, protect essential networks, and preserve safe surface flow routes where underground systems exceed capacity.", actors: "city agencies, utilities, port authorities, neighborhood groups, and major landowners" },
  { name: "Riverine metropolitan regions", region: "Major river corridors", floodTypes: ["Riverine", "Pluvial", "Compound"], condition: "interdependent districts spread across a large river corridor with upstream and downstream effects", adaptation: "link metropolitan investment to catchment-wide flow, floodplain, transport, and emergency decisions.", actors: "metropolitan governments, basin agencies, utilities, transport operators, and river communities" },
  { name: "Delta farming plains", region: "Low-lying deltas", floodTypes: ["Riverine", "Coastal", "Compound"], condition: "flat terrain, productive agriculture, tidal influence, sediment change, and extensive water-control infrastructure", adaptation: "balance crop calendars, sediment, drainage, freshwater, salinity, settlements, and room for controlled inundation.", actors: "farmers, irrigation districts, water agencies, fisheries, municipalities, and land-rights holders" },
  { name: "Small island communities", region: "Island states and territories", floodTypes: ["Coastal", "Pluvial", "Compound"], condition: "limited land, fragile freshwater, exposed ports and roads, and constrained recovery supply chains", adaptation: "favor compact, maintainable systems, protect freshwater and access, and plan for isolation after severe events.", actors: "island councils, traditional leaders, utilities, health services, fishers, and transport providers" },
  { name: "Mountain catchment towns", region: "Highland watersheds", floodTypes: ["Flash", "Riverine"], condition: "steep slopes, short warning times, debris, channel constrictions, and isolated access routes", adaptation: "prioritize upstream condition, debris-aware design, rapid alerts, and multiple safe routes above fast water.", actors: "municipalities, upland communities, forestry agencies, road authorities, and emergency services" },
  { name: "Arid wadi cities", region: "Dryland regions", floodTypes: ["Flash", "Pluvial"], condition: "rare intense rain, hard or compacted surfaces, dry channels, high sediment loads, and low risk awareness", adaptation: "keep natural flow paths open, design for debris-laden peaks, capture water safely, and communicate risk despite long dry periods.", actors: "city planners, civil defense, road agencies, water authorities, landowners, and desert communities" },
  { name: "Tropical cyclone coasts", region: "Tropical coastal belts", floodTypes: ["Coastal", "Pluvial", "Riverine", "Compound"], condition: "extreme rain, surge, waves, wind, power loss, debris, and simultaneous failure across a wide area", adaptation: "design portfolios for compound hazards, backup operations, safe shelter, and rapid access restoration after landfall.", actors: "coastal governments, weather services, utilities, emergency agencies, communities, and ecosystem managers" },
  { name: "Temperate river basins", region: "Mid-latitude watersheds", floodTypes: ["Riverine", "Pluvial", "Snowmelt"], condition: "seasonal river floods, saturated soils, urban growth, agricultural runoff, and aging water infrastructure", adaptation: "combine upstream storage, floodplain room, infrastructure renewal, and land-use controls using basin-wide scenarios.", actors: "basin organizations, municipalities, farmers, conservation groups, utilities, and asset owners" },
  { name: "Monsoon cities", region: "South and Southeast Asia", floodTypes: ["Pluvial", "Riverine", "Compound"], condition: "seasonal extreme rain, dense mixed-formality neighborhoods, clogged drainage, tidal backwater, and mobility disruption", adaptation: "prepare before each wet season while delivering long-term drainage, storage, housing, waste, and warning improvements.", actors: "city governments, drainage and waste teams, community organizations, businesses, schools, and transport operators" },
  { name: "Subsiding deltas", region: "Sediment-starved deltas", floodTypes: ["Riverine", "Coastal", "Compound"], condition: "land sinking from groundwater extraction, compaction, or sediment loss while sea and river levels rise", adaptation: "pair flood measures with subsidence control, sediment strategy, groundwater reform, and flexible pathways for the deepest areas.", actors: "national water agencies, cities, industries, farmers, communities, and delta science institutions" },
  { name: "Historic urban centers", region: "Heritage districts", floodTypes: ["Pluvial", "Riverine"], condition: "valuable heritage, narrow streets, sensitive foundations, buried utilities, high foot traffic, and limited retrofit space", adaptation: "use reversible, low-impact interventions, discreet storage and barriers, protected collections, and heritage-compatible recovery materials.", actors: "heritage authorities, city engineers, building owners, businesses, museums, and resident groups" },
  { name: "Industrial ports", region: "Ports and logistics zones", floodTypes: ["Coastal", "Pluvial", "Compound"], condition: "hazardous materials, heavy assets, tide and surge exposure, supply-chain dependencies, and controlled-access sites", adaptation: "contain pollutants, protect critical power and access, coordinate operators, and stage continuity and shutdown decisions before water arrives.", actors: "port authorities, terminal operators, industries, labor, coast guards, utilities, and nearby communities" },
  { name: "Rural floodplain villages", region: "Inland floodplains", floodTypes: ["Riverine", "Flash"], condition: "scattered settlements, livelihood dependence on floodplain land, limited services, and long emergency travel times", adaptation: "support locally managed warnings, raised safe places, water-compatible livelihoods, protected wells, and voluntary choices about repeated loss.", actors: "village councils, farmers, local health services, river agencies, cooperatives, and civil society" },
  { name: "Snowmelt watersheds", region: "Cold-climate basins", floodTypes: ["Snowmelt", "Riverine", "Compound"], condition: "snowpack uncertainty, rain-on-snow, ice jams, frozen ground, spring saturation, and changing melt timing", adaptation: "monitor snow and temperature, preserve storage, prepare for ice and debris, and update seasonal operating rules as the climate shifts.", actors: "water managers, weather services, Indigenous nations, municipalities, dam operators, and rural communities" },
  { name: "Glacial-lake valleys", region: "High mountain regions", floodTypes: ["Glacial lake", "Flash", "Riverine"], condition: "rapid lake growth, unstable moraine or ice dams, cascading debris, scarce monitoring, and settlements far downstream", adaptation: "combine remote monitoring, field verification, controlled risk reduction, automatic warnings, and valley-wide evacuation planning.", actors: "mountain communities, national disaster agencies, scientists, hydropower operators, and cross-border authorities" },
  { name: "Wildfire-scar catchments", region: "Fire-affected watersheds", floodTypes: ["Flash", "Riverine"], condition: "water-repellent soil, lost vegetation, unstable slopes, ash, debris flows, and repeatedly changing channels", adaptation: "act before the first storm, update hazard zones after each event, protect workers, and plan for several seasons of elevated risk.", actors: "fire and forestry agencies, road teams, water utilities, landowners, downstream residents, and emergency managers" },
  { name: "Informal riverside settlements", region: "Rapidly growing cities", floodTypes: ["Riverine", "Pluvial", "Compound"], condition: "high exposure, insecure tenure, livelihood proximity, service gaps, narrow access, and justified distrust of forced relocation", adaptation: "co-design incremental upgrades, protect tenure and livelihoods, fund resident leadership, and make any relocation voluntary, safe, and equitable.", actors: "resident associations, local government, utilities, housing advocates, health teams, and livelihood groups" },
  { name: "Low-lying atolls", region: "Ocean atolls", floodTypes: ["Coastal", "Compound"], condition: "very limited elevation, wave overwash, saltwater intrusion, freshwater lenses, erosion, and few inland relocation options", adaptation: "protect freshwater first, use island-scale sediment and shoreline planning, maintain safe refuge, and prepare dignified long-term mobility choices.", actors: "atoll communities, national governments, customary landowners, utilities, regional bodies, and climate-finance partners" },
  { name: "Critical-facility districts", region: "Hospitals, schools, and civic campuses", floodTypes: ["Pluvial", "Riverine", "Coastal", "Compound"], condition: "people who cannot evacuate easily, continuous service requirements, hazardous equipment, and strong utility and supply dependencies", adaptation: "protect whole-service continuity—including staff, access, water, power, communications, medicines, and safe shelter—not only buildings.", actors: "facility operators, health and education authorities, utilities, emergency services, suppliers, and accessibility advocates" },
  { name: "Transboundary river basins", region: "International watersheds", floodTypes: ["Riverine", "Flash", "Snowmelt", "Glacial lake"], condition: "shared rivers, different laws and capacities, upstream-downstream tradeoffs, data sensitivity, and cross-border emergencies", adaptation: "build joint thresholds, trusted data exchange, benefit sharing, dispute pathways, and interoperable warnings before a crisis.", actors: "national and local governments, basin commissions, border communities, dam operators, scientists, and humanitarian agencies" }
];

const categoryColors = {
  "Map & assess": "#4f7cac",
  "Forecast & warn": "#8854a2",
  "Watershed": "#2d936c",
  "Store & slow": "#00a6a6",
  "Drain & convey": "#0f5f88",
  "Make room & protect": "#f09d35",
  "Resilient assets": "#d45d79",
  "Policy & governance": "#6b7280",
  "Prepare & respond": "#e05b37",
  "Recover & adapt": "#719334"
};

const solutions = strategies.flatMap((strategy, strategyIndex) =>
  settings.map((setting, settingIndex) => {
    const number = strategyIndex * settings.length + settingIndex + 1;
    return {
      id: `FS-${String(number).padStart(4, "0")}`,
      number,
      title: `${strategy.name} for ${setting.name}`,
      strategy: strategy.name,
      setting: setting.name,
      region: setting.region,
      floodTypes: setting.floodTypes,
      category: strategy.category,
      approach: strategy.approach,
      cost: strategy.cost,
      horizon: strategy.horizon,
      scale: strategy.scale,
      summary: `${strategy.purpose} For ${setting.name.toLowerCase()}, ${setting.adaptation}`,
      rationale: `${setting.name} face ${setting.condition}. This solution adapts ${strategy.name.toLowerCase()} to that operating reality rather than treating the intervention as a stand-alone project.`,
      actions: [
        `Map the people, assets, flow paths, service dependencies, and decision windows affected by ${setting.condition}.`,
        `With local evidence, ${strategy.action}.`,
        `Co-design responsibilities, funding, safeguards, and maintenance with ${setting.actors}.`,
        `Track ${strategy.metric.toLowerCase()}, publish lessons, and adjust the intervention after storms and major land-use change.`
      ],
      caution: `${strategy.caution} In this setting, explicitly account for ${setting.condition}.`,
      metric: strategy.metric,
      leaders: setting.actors,
      accent: categoryColors[strategy.category]
    };
  })
);

const pageSize = 24;
let currentPage = 1;
let currentView = "grid";

const elements = {
  grid: document.getElementById("solutionGrid"),
  count: document.getElementById("resultCount"),
  summary: document.getElementById("resultSummary"),
  pagination: document.getElementById("pagination"),
  empty: document.getElementById("emptyState"),
  search: document.getElementById("searchInput"),
  sort: document.getElementById("sortSelect"),
  flood: document.getElementById("floodFilter"),
  setting: document.getElementById("settingFilter"),
  category: document.getElementById("categoryFilter"),
  approach: document.getElementById("approachFilter"),
  cost: document.getElementById("costFilter"),
  horizon: document.getElementById("horizonFilter"),
  gridView: document.getElementById("gridView"),
  listView: document.getElementById("listView"),
  dialog: document.getElementById("solutionDialog"),
  dialogContent: document.getElementById("dialogContent"),
  methodDialog: document.getElementById("methodDialog")
};

function addOptions(select, values) {
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

addOptions(elements.flood, [...new Set(settings.flatMap((item) => item.floodTypes))].sort());
addOptions(elements.setting, settings.map((item) => item.name));
addOptions(elements.category, [...new Set(strategies.map((item) => item.category))]);
addOptions(elements.approach, [...new Set(strategies.map((item) => item.approach))].sort());
addOptions(elements.cost, ["Low", "Moderate", "High", "Transformational"]);
addOptions(elements.horizon, ["0–1 year", "0–2 years", "1–3 years", "2–5 years", "5+ years"]);

function getFilteredSolutions() {
  const query = elements.search.value.trim().toLowerCase();
  let result = solutions.filter((item) => {
    const searchable = `${item.id} ${item.title} ${item.category} ${item.approach} ${item.region} ${item.floodTypes.join(" ")} ${item.summary} ${item.rationale} ${item.leaders}`.toLowerCase();
    return (!query || searchable.includes(query))
      && (elements.flood.value === "all" || item.floodTypes.includes(elements.flood.value))
      && (elements.setting.value === "all" || item.setting === elements.setting.value)
      && (elements.category.value === "all" || item.category === elements.category.value)
      && (elements.approach.value === "all" || item.approach === elements.approach.value)
      && (elements.cost.value === "all" || item.cost === elements.cost.value)
      && (elements.horizon.value === "all" || item.horizon === elements.horizon.value);
  });

  const costOrder = { Low: 1, Moderate: 2, High: 3, Transformational: 4 };
  const horizonOrder = { "0–1 year": 1, "0–2 years": 2, "1–3 years": 3, "2–5 years": 4, "5+ years": 5 };
  if (elements.sort.value === "fastest") result.sort((a, b) => horizonOrder[a.horizon] - horizonOrder[b.horizon] || a.number - b.number);
  if (elements.sort.value === "lowest") result.sort((a, b) => costOrder[a.cost] - costOrder[b.cost] || a.number - b.number);
  if (elements.sort.value === "az") result.sort((a, b) => a.title.localeCompare(b.title));
  return result;
}

function makeCard(item) {
  const article = document.createElement("article");
  article.className = "solution-card";
  article.style.setProperty("--card-accent", item.accent);
  article.innerHTML = `
    <div class="card-top">
      <span class="solution-id">${item.id}</span>
      <span class="approach-label">${item.approach}</span>
    </div>
    <h3>${item.title}</h3>
    <p>${item.summary}</p>
    <div class="tag-row" aria-label="Solution attributes">
      <span class="tag">${item.category}</span>
      <span class="tag">${item.floodTypes[0]}</span>
      <span class="tag">${item.cost} cost</span>
      <span class="tag">${item.horizon}</span>
    </div>
    <button class="card-action" type="button" data-solution="${item.id}">Open implementation brief</button>
  `;
  return article;
}

function getPageButtons(totalPages) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);
  const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  const valid = [...pages].filter((page) => page > 0 && page <= totalPages).sort((a, b) => a - b);
  const output = [];
  valid.forEach((page, index) => {
    if (index && page - valid[index - 1] > 1) output.push("…");
    output.push(page);
  });
  return output;
}

function renderPagination(totalPages) {
  elements.pagination.replaceChildren();
  if (totalPages <= 1) return;

  const previous = document.createElement("button");
  previous.type = "button";
  previous.textContent = "←";
  previous.setAttribute("aria-label", "Previous page");
  previous.disabled = currentPage === 1;
  previous.addEventListener("click", () => changePage(currentPage - 1));
  elements.pagination.appendChild(previous);

  getPageButtons(totalPages).forEach((value) => {
    if (value === "…") {
      const ellipsis = document.createElement("span");
      ellipsis.textContent = value;
      elements.pagination.appendChild(ellipsis);
      return;
    }
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = value;
    button.classList.toggle("active", value === currentPage);
    button.setAttribute("aria-label", `Page ${value}`);
    if (value === currentPage) button.setAttribute("aria-current", "page");
    button.addEventListener("click", () => changePage(value));
    elements.pagination.appendChild(button);
  });

  const next = document.createElement("button");
  next.type = "button";
  next.textContent = "→";
  next.setAttribute("aria-label", "Next page");
  next.disabled = currentPage === totalPages;
  next.addEventListener("click", () => changePage(currentPage + 1));
  elements.pagination.appendChild(next);
}

function render() {
  const filtered = getFilteredSolutions();
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  if (currentPage > totalPages) currentPage = totalPages;
  const start = (currentPage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  elements.count.textContent = filtered.length.toLocaleString();
  const activeFilters = [elements.flood, elements.setting, elements.category, elements.approach, elements.cost, elements.horizon]
    .filter((select) => select.value !== "all").length + (elements.search.value.trim() ? 1 : 0);
  elements.summary.textContent = activeFilters
    ? `${activeFilters} active ${activeFilters === 1 ? "filter" : "filters"} · page ${currentPage} of ${totalPages}`
    : "Showing the complete global atlas";

  elements.grid.replaceChildren(...pageItems.map(makeCard));
  elements.empty.hidden = filtered.length !== 0;
  elements.grid.hidden = filtered.length === 0;
  renderPagination(filtered.length ? totalPages : 0);
}

function changePage(page) {
  currentPage = page;
  render();
  document.getElementById("solutions").scrollIntoView({ behavior: "smooth", block: "start" });
}

function openSolution(id, updateUrl = true) {
  const item = solutions.find((solution) => solution.id === id);
  if (!item) return;
  elements.dialogContent.innerHTML = `
    <div class="detail-hero">
      <p class="eyebrow">${item.id} · ${item.category}</p>
      <h2>${item.title}</h2>
      <p>${item.summary}</p>
    </div>
    <div class="detail-grid" aria-label="Implementation profile">
      <div><span>Approach</span><strong>${item.approach}</strong></div>
      <div><span>Likely cost</span><strong>${item.cost}</strong></div>
      <div><span>Start horizon</span><strong>${item.horizon}</strong></div>
      <div><span>Primary scale</span><strong>${item.scale}</strong></div>
    </div>
    <section class="detail-section">
      <h3>Why it fits</h3>
      <p>${item.rationale}</p>
    </section>
    <section class="detail-section">
      <h3>Implementation sequence</h3>
      <ol>${item.actions.map((action) => `<li>${action}</li>`).join("")}</ol>
    </section>
    <section class="detail-section">
      <h3>Likely delivery coalition</h3>
      <p>${item.leaders}.</p>
    </section>
    <section class="detail-section">
      <h3>Watch closely</h3>
      <p>${item.caution}</p>
    </section>
    <section class="detail-section metric-box">
      <h3>Track success with</h3>
      <p>${item.metric}.</p>
    </section>
  `;
  elements.dialog.showModal();
  if (updateUrl) history.replaceState(null, "", `#${item.id}`);
}

function closeSolution() {
  elements.dialog.close();
  if (location.hash.startsWith("#FS-")) history.replaceState(null, "", location.pathname + location.search);
}

function resetFilters() {
  elements.search.value = "";
  [elements.flood, elements.setting, elements.category, elements.approach, elements.cost, elements.horizon].forEach((select) => { select.value = "all"; });
  elements.sort.value = "library";
  currentPage = 1;
  render();
}

[elements.search, elements.sort, elements.flood, elements.setting, elements.category, elements.approach, elements.cost, elements.horizon]
  .forEach((control) => control.addEventListener(control === elements.search ? "input" : "change", () => {
    currentPage = 1;
    render();
  }));

elements.grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-solution]");
  if (button) openSolution(button.dataset.solution);
});

document.getElementById("resetButton").addEventListener("click", resetFilters);
document.getElementById("emptyReset").addEventListener("click", resetFilters);
document.getElementById("dialogClose").addEventListener("click", closeSolution);
document.getElementById("methodButton").addEventListener("click", () => elements.methodDialog.showModal());
document.getElementById("methodClose").addEventListener("click", () => elements.methodDialog.close());

[elements.dialog, elements.methodDialog].forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});
elements.dialog.addEventListener("close", () => {
  if (location.hash.startsWith("#FS-")) history.replaceState(null, "", location.pathname + location.search);
});

elements.gridView.addEventListener("click", () => {
  currentView = "grid";
  elements.grid.classList.remove("list");
  elements.gridView.classList.add("active");
  elements.listView.classList.remove("active");
  elements.gridView.setAttribute("aria-pressed", "true");
  elements.listView.setAttribute("aria-pressed", "false");
});

elements.listView.addEventListener("click", () => {
  currentView = "list";
  elements.grid.classList.add("list");
  elements.listView.classList.add("active");
  elements.gridView.classList.remove("active");
  elements.listView.setAttribute("aria-pressed", "true");
  elements.gridView.setAttribute("aria-pressed", "false");
});

document.addEventListener("keydown", (event) => {
  const tag = document.activeElement?.tagName;
  if (event.key === "/" && tag !== "INPUT" && tag !== "SELECT" && tag !== "TEXTAREA") {
    event.preventDefault();
    elements.search.focus();
  }
});

render();

const linkedId = location.hash.slice(1).toUpperCase();
if (/^FS-\d{4}$/.test(linkedId)) openSolution(linkedId, false);
