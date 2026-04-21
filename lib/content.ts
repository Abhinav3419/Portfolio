/**
 * Portfolio content — grounded in the public GitHub profile:
 * https://github.com/Abhinav3419
 *
 * Any copy here should stay honest, concise, and recruiter-readable.
 * No motivational filler. No invented metrics.
 */

export type Stack = { label: string; items: string[] };

export type Project = {
  slug: string;
  kind: 'main' | 'mini';
  title: string;
  tagline: string;
  summary: string;
  year: string;
  role: string;
  status: 'Shipped' | 'Active' | 'Research' | 'In Progress';
  repo?: string;
  demo?: string;
  metrics: { label: string; value: string; note?: string }[];
  problem: string;
  approach: string[];
  stack: Stack[];
  outcomes: string[];
  references?: { label: string; url: string }[];
};

export type CaseStudy = {
  slug: string;
  index: string;
  company: string;
  title: string;
  tagline: string;
  lens: string;
  businessProblem: string;
  data: string;
  process: string[];
  insights: { title: string; body: string }[];
  recommendations: string[];
  frameworks: string[];
  repo?: string;
  demo?: string;
};

/* =========================================================
   PROFILE
   ========================================================= */
export const profile = {
  name: 'Abhinav Pandey',
  handle: 'Abhinav3419',
  role: 'Machine Learning Engineer · AI Systems · Quantitative Research',
  locationLabel: 'New Delhi, India',
  github: 'https://github.com/Abhinav3419',
  linkedin: 'https://www.linkedin.com/in/abhinavpandey-ai-ml/',
  email: 'abhinavpandey3419@gmail.com',
  education: [
    {
      degree: 'M.Tech, Applied Mechanics',
      school: 'Motilal Nehru National Institute of Technology (MNNIT) Allahabad',
      note: 'Thermodynamics · Continuum mechanics · Computational methods',
    },
    {
      degree: 'B.Tech, Electronics & Instrumentation',
      school: 'Ghaziabad, India',
      note: 'Signals · Control systems · Embedded sensing',
    },
  ],
  orcid: '0009-0007-8480-8021',
};

/* =========================================================
   MAIN PROJECTS
   ========================================================= */
export const mainProjects: Project[] = [
  {
    slug: 'enso-free-energy',
    kind: 'main',
    title: 'ENSO Free Energy Prediction',
    tagline:
      'Thermodynamic free energy predicts El Niño onset using multi-domain entropy.',
    summary:
      'A physics-informed ML framework that extends Jin (1997) by unifying Shannon entropy across seven geophysical domains with an SHM energy channel into a single thermodynamic free-energy predictor. Validated against 75 years of NOAA data with walk-forward cross-validation.',
    year: '2025 — 2026',
    role: 'Author · Model design · Pipeline',
    status: 'Research',
    repo: 'https://github.com/Abhinav3419/ENSO-Free-Energy-Prediction',
    metrics: [
      { label: 'AUC (6-month El Niño)', value: '0.905', note: 'AND-gate model' },
      { label: 'AUC (26-feature XGBoost)', value: '0.927' },
      { label: 'Detection rate @ 3 months', value: '80%', note: 'FAR 26.4%' },
      { label: 'Physics-informed features', value: '6' },
    ],
    problem:
      'ENSO prediction remains a hard problem because standard approaches treat energy and information as separate signals. The spring barrier, sparse event labels, and structural asymmetry between El Niño and La Niña onsets confound most statistical models.',
    approach: [
      'Built an Energy channel from the Oceanic Niño Index: E(t) = [ONI(t)]² + [dONI/dt]², grounded in the Jin recharge-oscillator formulation.',
      'Computed a multi-domain Shannon entropy S(t) across seven geophysical series — ONI, SOI, TNI, MJO, warm-pool index, OHC anomaly, solar and geomagnetic indices.',
      'Unified the two channels via thermodynamic free energy F(t) = E(t) − T_eff · S(t), with T_eff calibrated asymmetrically: 2.0 for El Niño (entropy-dominated), 0.3 for La Niña (energy-dominated).',
      'Wrapped the signal in a three-layer AND-gate: charging (accumulated energy), organisation (coherent multi-domain alignment), trigger (SOI collapse / Kelvin-wave / MJO / warm-pool surge — only required for El Niño).',
      'Validated with walk-forward splits, XGBoost benchmarks, and a null baseline. Reported Brier, AUC, and F1 at the 6-month horizon for both El Niño and La Niña.',
    ],
    stack: [
      { label: 'Modelling', items: ['Python 3.10', 'XGBoost', 'scikit-learn', 'SciPy'] },
      { label: 'Data', items: ['NOAA CPC', 'NOAA PSL', 'NCEI OHC', 'SILSO', 'USGS', 'ISGI'] },
      { label: 'Pipeline', items: ['pandas', 'NumPy', 'requirements.txt', 'setup.py'] },
      { label: 'Reporting', items: ['Matplotlib', 'Jupyter', 'LaTeX / DOCX manuscript'] },
    ],
    outcomes: [
      'AUC 0.905 on 6-month El Niño prediction with only 6 physics-informed features.',
      'Discovered structural asymmetry: La Niña develops gradually from L1+L2 alone; El Niño requires an active trigger (L3).',
      'Composite Readiness Index detects 80% of events three months before onset.',
      'Current forecast (Jan 2026): RI −0.163 DORMANT; 28.8% P(El Niño) / 32.4% P(La Niña) over next six months.',
      'Manuscript prepared for Nature Communications submission.',
    ],
    references: [
      { label: 'Jin (1997) — Recharge oscillator', url: 'https://doi.org/10.1175/1520-0469(1997)054%3C0811:AEORPF%3E2.0.CO;2' },
      { label: 'NOAA CPC — ONI data', url: 'https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/ensostuff/ONI_v5.php' },
    ],
  },
  {
    slug: 'wedding-demand-forecast',
    kind: 'main',
    title: 'Wedding Demand Forecast',
    tagline:
      'Cultural calendar features close a gap in India’s $45B wedding apparel forecasting.',
    summary:
      'Retail forecasting in India ignores the Hindu Panchang — the calendar that actually governs when 10M weddings a year happen. This project quantifies the gap: 46 engineered features across three layers, validated on 16 years of Google Trends data with leave-one-year-out CV.',
    year: '2025',
    role: 'End-to-end · Feature engineering · Validation',
    status: 'Shipped',
    repo: 'https://github.com/Abhinav3419/Wedding-Demand-Forecast',
    metrics: [
      { label: 'RMSE improvement (Ridge)', value: '6.4%', note: 'p = 0.020' },
      { label: 'RMSE improvement (GBM)', value: '6.3%', note: 'p = 0.018' },
      { label: 'Muhurat × demand correlation', value: 'r = 0.434' },
      { label: 'Cultural feature importance', value: '31.8%' },
    ],
    problem:
      'Every deployed demand-forecasting system for Indian wedding retail relies on Gregorian features — month, quarter, lag — plus historical sales. A year with 85 muhurat days behaves very differently from one with 52, but standard models cannot see it.',
    approach: [
      'Pulled 16 years of Google Trends data for three wedding search terms — wedding lehenga, sherwani, bridal saree — and constructed a composite demand index after rejecting single-term targets on empirical grounds (r jumped from 0.22 to 0.43).',
      'Engineered 46 features in three layers: temporal baseline (14), cultural calendar (16, the novel contribution), economic context (5). Cultural features include muhurat counts, density ratios, leading indicators, Pitru Paksha / Kharmas / Mal Maas flags, and Hijri restricted-day ratios.',
      'Ran a two-track experimental design — Track A (cold-start, cultural features alone) and Track B (practical, cultural features on top of lag features) — to separate cleanly whether cultural data adds incremental signal.',
      'Validated with Leave-One-Year-Out cross-validation across 14 folds (2012–2025), paired t-tests on per-fold RMSE, and two model families (Ridge and Gradient Boosting) for robustness.',
      'Reported Track A as a null result honestly: cultural features alone are a complement to sales history, not a replacement.',
    ],
    stack: [
      { label: 'Modelling', items: ['scikit-learn Ridge', 'GradientBoosting', 'SciPy t-tests'] },
      { label: 'Data', items: ['Google Trends (India)', 'Drik Panchang', 'IslamicFinder', 'World Gold Council'] },
      { label: 'Validation', items: ['LOYO CV (14 folds)', 'Paired t-tests', 'Per-fold RMSE'] },
      { label: 'App', items: ['Streamlit dashboard', 'Python 3.10', 'pandas', 'NumPy'] },
    ],
    outcomes: [
      '6.4% RMSE reduction on Ridge, 6.3% on GBM — both statistically significant (p < 0.025).',
      '11/14 fold wins for Ridge, 10/14 for GBM against the lag-only baseline.',
      'hindu_muhurat_count ranked the 4th most important feature overall across 46.',
      'Framework generalises to gold, venues, travel, real estate, automotive — any market driven by culturally-determined consumption.',
      'Open-source with a Streamlit dashboard that reproduces all eight figures in under 60 seconds on CPU.',
    ],
  },
];

/* =========================================================
   MINI PROJECTS
   ========================================================= */
export const miniProjects: Project[] = [
  {
    slug: 'medical-insurance-predictor',
    kind: 'mini',
    title: 'Medical Insurance Cost Predictor',
    tagline:
      'A neural network that predicts annual medical insurance charges from patient demographics — shipped as a production FastAPI service.',
    summary:
      'End-to-end regression: six model iterations (M0 → M5) taking test MAE from ~$5,000 to ~$1,650 and R² from 0.50 to 0.82. Ten engineered features encode the smoker × BMI interaction that drives most of the pricing signal. Deployed behind a FastAPI endpoint with Docker packaging.',
    year: '2025',
    role: 'Solo build · End-to-end · Deployment',
    status: 'Shipped',
    repo: 'https://github.com/Abhinav3419/Mini-Projects/tree/main/01-Medical-Insurance-Cost-Predictor',
    metrics: [
      { label: 'Best Test MAE', value: '~$1,650', note: 'M5 · engineered features' },
      { label: 'Best Test R²', value: '0.82', note: 'M5 neural net' },
      { label: 'MAE vs Linear Reg', value: '−65%', note: 'from $4,700 → $1,650' },
      { label: 'Engineered features', value: '10', note: 'domain-informed' },
    ],
    problem:
      'Medical insurance charges depend on demographics and lifestyle — age, BMI, smoking status, dependents, region — but the relationships are deeply non-linear. Smokers with BMI ≥ 30 pay roughly 5× what non-smokers pay. A flat linear model leaves most of that signal on the table; the project quantifies how much a neural network plus honest feature engineering can recover.',
    approach: [
      'Progressive model iteration (M0 → M6), each step isolating one variable: optimizer (SGD → Adam), architecture (20 → 100-10 → 120-60-30 Swish), scaling (StandardScaler), feature engineering (2 features → 10), and callbacks (EarlyStopping + ReduceLROnPlateau).',
      'Ten engineered features grounded in medical domain knowledge: smoker × BMI interaction, is_obese at the clinical cutoff of BMI = 30, smoker_obese as a binary flag separating the $41K group from the $21K group, age², age × BMI, BMI deviation from healthy (24.9), and has_children.',
      'Strict overfitting discipline: training MAE of $1,400 with test MAE of $2,400 was treated as a failure, not a success. EarlyStopping and ReduceLROnPlateau replaced manual epoch tuning.',
      'Segment-wise error analysis — non-smoker ($1,800 MAE on $8,434 mean), smoker with BMI < 30 ($1,000 MAE on $21,363), smoker with BMI ≥ 30 ($1,350 MAE on $41,558) — confirmed the model does not hide errors inside the high-charge tail.',
      'Classical-baseline comparison with the same engineered features: Linear Regression ($4,700 MAE), Random Forest ($2,900), Gradient Boosting ($2,800), Neural Net M5 ($1,650). Feature engineering closed most of the gap; architecture closed the rest.',
      'Shipped as a FastAPI service with a JSON prediction endpoint, Dockerfile, pinned requirements, and seven smoke tests — production shape, not notebook-only.',
    ],
    stack: [
      { label: 'Modelling', items: ['TensorFlow / Keras', 'StandardScaler', 'EarlyStopping', 'ReduceLROnPlateau', 'Swish activation'] },
      { label: 'Baselines', items: ['scikit-learn LinearRegression', 'RandomForest (300)', 'GradientBoosting (500)'] },
      { label: 'Serving', items: ['FastAPI', 'uvicorn', 'Docker', 'Pydantic schemas'] },
      { label: 'Tooling', items: ['pandas', 'NumPy', 'Jupyter', 'pytest'] },
    ],
    outcomes: [
      'Test MAE $1,650 / R² 0.82 on the Kaggle Medical Cost dataset — outperforms tuned Gradient Boosting (~$2,800 MAE) by 41% on the same feature set.',
      'smoker_obese binary flag alone encodes a medical insight worth hundreds of dollars of MAE — separates the $41K group from the $21K group cleanly.',
      'Segment-wise MAE stays proportional to segment mean charges: the model doesn’t cheat by dumping error into the high-cost tail.',
      'Production-shaped deployment: FastAPI + Docker + pinned deps + smoke tests. `curl -X POST /predict` returns a charge estimate in under 50 ms.',
      'Key lesson documented in the README: data and feature engineering moved MAE more than any architecture change.',
    ],
  },
];

/* =========================================================
   CASE STUDIES
   ========================================================= */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'kindle-physical-book',
    index: '01',
    company: 'Amazon',
    title: 'Kindle: Physical Book Aesthetics',
    tagline:
      'Six data-driven features that bridge the emotional gap between physical books and digital reading.',
    lens: 'Product Management · Sensory Design · CIRCLES + RICE',
    businessProblem:
      'Kindle has won on utility and lost on emotion. Digital reading still fails to replicate the sensory signals that make physical books feel owned, aged, and handled. The result: lapsed Kindle users returning to print for long-form reading.',
    data:
      'Framed around public reading-behaviour research, Goodreads engagement patterns, and sensory-psychology literature on tactile and auditory priming. Feature prioritisation by RICE scoring.',
    process: [
      'Ran a CIRCLES breakdown to isolate the unmet sensory needs.',
      'Enumerated six candidate features spanning visual, tactile, auditory, and proprioceptive channels.',
      'Scored each against RICE (Reach × Impact × Confidence / Effort) and competitive differentiation.',
      'Mapped each feature to an underlying device capability already shipping in Kindle hardware.',
    ],
    insights: [
      { title: 'Drop-impact wrinkling', body: 'Accelerometer-triggered visual wrinkle simulation — the page reacts to mishandling.' },
      { title: 'Time-based yellowing', body: 'Pages age visually with cumulative read-time per title — subtle patina builds ownership.' },
      { title: 'Ink bleed-through', body: 'Typographic simulation of back-page bleed mapped to paper weight settings.' },
      { title: 'Page-turn sound synthesis', body: 'Haptic + audio coupling for a tactile-auditory turn experience.' },
      { title: 'Functional thickness bar', body: 'A tangible progress indicator that mimics how far into a physical book you are.' },
      { title: 'Gravity-responsive orientation', body: 'Layout micro-adjustments on tilt to preserve the feel of a held book.' },
    ],
    recommendations: [
      'Ship the thickness bar and yellowing feature first — highest Reach × Impact at minimal device cost.',
      'Gate page-turn audio behind a "Classic Reader" mode to avoid alienating productivity users.',
      'A/B test retention lift on a lapsed-reader cohort before rolling to core users.',
    ],
    frameworks: ['CIRCLES', 'RICE', 'Sensory Design'],
  },
  {
    slug: 'project-sunroof',
    index: '02',
    company: 'Google',
    title: 'Project Sunroof 2.0 — Atmospheric Correction',
    tagline:
      'A physics-first correction to the solar-energy estimation equation used at planetary scale.',
    lens: 'Product × Applied Physics × ML',
    businessProblem:
      'Project Sunroof estimates rooftop solar potential using a single climatological coefficient (Wc) that treats continental interiors and coastal zones identically. Coastal homeowners receive systematically biased estimates — a quiet accuracy problem hiding behind a clean UI.',
    data:
      'NOAA atmospheric pressure belt data, coastal-distance rasters, and historical solar irradiance measurements across representative Köppen climate zones.',
    process: [
      'Decomposed the Sunroof equation to isolate where Wc absorbs all atmospheric variance.',
      'Introduced two physics-grounded multipliers: a Pressure Belt Multiplier (Pb) reflecting Hadley/Ferrel/Polar cell effects, and a Marine Coastal Distance Correction (Mc) modelling exponential atmospheric moisture decay inland.',
      'Reformulated the estimator: E = (A · η · Isc) × [Wbase · Pb · Mc].',
      'Tested against ground-truth irradiance data at 40+ coastal and inland sites.',
    ],
    insights: [
      { title: 'Pb captures latitudinal systematic error', body: 'Global circulation cells impose a predictable irradiance gradient that Wc smears away.' },
      { title: 'Mc captures coastal humidity loss', body: 'Exponential-decay modelling matches measured attenuation within the first 80 km inland.' },
      { title: 'Patent-worthy formulation', body: 'The Pb × Mc decomposition is novel — no existing Sunroof-class product models atmosphere this way.' },
    ],
    recommendations: [
      'Pilot the corrected equation in coastal US ZIP codes where current estimates systematically under- or over-predict.',
      'Expose the correction factors in the homeowner-facing explainer as a trust signal.',
      'File a defensive publication or patent on the Pb × Mc decomposition.',
    ],
    frameworks: ['Physics-First Strategy', 'Exponential Decay Modeling'],
  },
  {
    slug: 'netflix-sensory',
    index: '03',
    company: 'Netflix',
    title: 'Sensory Personalization',
    tagline:
      'Four context-aware features extending personalization past the algorithm into the viewer’s real world.',
    lens: 'Product × Behavioural Psychology × Sensor Engineering',
    businessProblem:
      'Netflix personalisation ends at the recommendation. It knows what you watched; it does not know what you feel, what the weather is, or what your household is watching around you. This is a ceiling on engagement that better collaborative filtering cannot break.',
    data:
      'Behavioural-psychology literature on social proof, wearable-biometric data APIs (Fitbit, Apple Health), and public weather APIs as contextual signals.',
    process: [
      'Mapped the personalisation surface beyond the recommendation algorithm.',
      'Identified four latent context channels: generational social proof, scene-synced haptics, weather state, and biometric mood.',
      'Defined each as a shippable feature with a clear device dependency and privacy posture.',
      'Prioritised with RICE against Netflix’s existing engagement metrics.',
    ],
    insights: [
      { title: 'Gen-Pulse', body: 'Generational social proof — "72% of viewers your age finished this in one sitting" as a surfaced signal.' },
      { title: 'Sense-Stream', body: 'Scene-synced haptic feedback on supported phones and controllers — an action beat you feel.' },
      { title: 'Atmosphere', body: 'Weather-responsive UI: rainy evening → cosy-mood carousel; clear Saturday → action carousel.' },
      { title: 'Pulse-Rec', body: 'Biometric mood sensing from paired wearables (opt-in), mapped to content temperature.' },
    ],
    recommendations: [
      'Ship Atmosphere first — no hardware dependency, pure UI + weather API.',
      'Pilot Gen-Pulse on user-profile-level opt-in cohorts to measure uplift before broad rollout.',
      'Hold Pulse-Rec until a clear privacy narrative exists; biometric data is not a casual launch.',
    ],
    frameworks: ['CIRCLES', 'RICE', 'Behavioral Psychology'],
  },
  {
    slug: 'bioazure-symbiosis',
    index: '04',
    company: 'Microsoft',
    title: 'Bio-Azure Symbiosis: Data Center × Bio-Foundry Heat Integration',
    tagline:
      'Route data-center waste heat to precision-fermentation bio-foundries instead of homes.',
    lens: 'Product × Industrial Symbiosis × Sustainability Engineering',
    businessProblem:
      'District heating is the default destination for data-center waste heat. The thermal match is imperfect (residential demand is seasonal and peaked; data centers produce 24/7), and the commercial proposition is a commodity with negligible margin. A structurally better match exists.',
    data:
      'DC outlet temperatures (45–50 °C), bio-reactor inlet requirements (30–40 °C) for five major precision-fermentation processes, German EnEfG regulation timelines, and a 7-dimension competitive comparison against district heating.',
    process: [
      'Quantified thermal compatibility: DC waste heat directly feeds five of seven fermentation processes with no heat pump required.',
      'Built a financial model showing $3–6M annual savings per co-located pair — margin, not commodity.',
      'Drafted a phased PM roadmap and regulatory analysis tied to the German EnEfG mandate starting July 2026.',
      'Produced a 7-dimension comparison showing where district heating wins (community PR) and where bio-foundry co-location wins (load match, margin, defensibility, ESG narrative).',
    ],
    insights: [
      { title: 'Load-shape match', body: 'Fermentation is 24/7; district heating is seasonally peaked. The load curve is the entire argument.' },
      { title: 'Thermal gradient match', body: '45–50 °C out, 30–40 °C in — no heat pump needed. Capex drops out of the equation.' },
      { title: 'Platform > commodity', body: 'Heat sold to a bio-foundry enables a product platform; heat sold to homes is a regulated utility commodity.' },
      { title: 'Regulatory tailwind', body: 'German EnEfG heat-reuse mandates begin July 2026 — the window to pilot is now.' },
    ],
    recommendations: [
      'Pilot a co-located bio-foundry at one German Azure region before the EnEfG deadline.',
      'Structure the deal as a heat-plus-platform-equity partnership, not a utility contract.',
      'Market the carbon-reduction story (40–60%) externally as an ESG anchor for enterprise customers.',
    ],
    frameworks: ['Implementation Blueprint', 'Industrial Symbiosis'],
  },
  {
    slug: 'luxury-ev-ethos',
    index: '05',
    company: 'BMW / Mercedes / Porsche / Audi',
    title: 'The Ethos Intelligence Suite: Empathy-First Features for Luxury EVs',
    tagline:
      'Three modules for luxury EVs targeting the multi-generational household.',
    lens: 'Product × Automotive AI × Sensory UX × Predictive Analytics',
    businessProblem:
      'Luxury EV differentiation is trapped in a screen-size arms race. The actual multi-generational owner — grandparent, professional, teen driver — is badly served by one-size-fits-all calibration. Silence as a feature has reached its limit.',
    data:
      'Porsche Taycan / Tesla / BMW current-feature competitive teardown, per-driver telematics logs (household fleet), and UBI insurance partner data models.',
    process: [
      'Defined three feature modules, each solving a distinct empathy gap: Acoustic Resurrection Engine, Payload Oracle, Adaptive Guardian.',
      'Wrote a PRD for each with measurable success criteria and acceptance tests.',
      'Built a 3-phase GTM with UBI insurance partnerships as the distribution wedge.',
      'Competitive-mapped against Porsche Taycan, Tesla, BMW current offerings to locate defensible whitespace.',
    ],
    insights: [
      { title: 'Acoustic Resurrection Engine', body: 'Generative V12 sound synthesis — not recordings. Driver-selectable sound signatures that respond to throttle and RPM physics.' },
      { title: 'Payload Oracle', body: 'AI-powered weight-aware range prediction with actionable trade-off insights: "drop the roof box for +38 km or take the second charging stop."' },
      { title: 'Adaptive Guardian', body: 'Per-driver safety envelope that learns each household member’s skill, blind spots, and driving patterns. Grandfather and teen get different ADAS aggressiveness.' },
    ],
    recommendations: [
      'Ship Adaptive Guardian first — highest safety narrative, strongest UBI-insurer partnership hook.',
      'Gate Acoustic Resurrection behind a "Heritage" trim to preserve brand-tier positioning.',
      'Launch Payload Oracle in the towing-heavy SUV segment where the utility case is visible.',
    ],
    frameworks: ['Empathy-First Strategy', 'PRD + GTM Framework'],
  },
  {
    // 6th case study — synthesised from the Wedding Demand Forecast work,
    // presented here in case-study form for retail strategy readers.
    slug: 'cultural-calendar-retail',
    index: '06',
    company: 'Indian Apparel & Jewellery Retail',
    title: 'Cultural Calendar as a Forecasting Primitive',
    tagline:
      'Why ₹3.75 lakh crore of annual wedding demand is being forecast against the wrong calendar.',
    lens: 'Retail Analytics · Feature Engineering · Demand Strategy',
    businessProblem:
      'Retail demand planners at Indian apparel, jewellery, and venue brands use Gregorian seasonality plus sales lags. Wedding timing is governed by the Hindu Panchang — specifically Shubh Vivah Muhurat dates. A year with 85 muhurat days behaves nothing like one with 52, and current forecasting systems cannot distinguish them.',
    data:
      '16 years of Google Trends data (India, 2010–2025) across three composite wedding search terms. Drik Panchang muhurat dates. Hijri calendar restricted-day ratios. World Gold Council price indices. CPI macro controls.',
    process: [
      'Constructed a composite demand index across wedding lehenga, sherwani, and bridal saree — rejecting single-term targets because the strongest muhurat correlation (sherwani, r = 0.53) was being diluted by adoption-curve effects in lehenga.',
      'Engineered 46 features in three layers: temporal baseline, cultural calendar, and economic context.',
      'Designed a two-track experiment: Track A (cold-start, cultural features alone) and Track B (practical, cultural on top of lag).',
      'Validated with Leave-One-Year-Out cross-validation across 14 folds; paired t-tests on per-fold RMSE; two model families (Ridge, GBM).',
    ],
    insights: [
      { title: 'Cultural features carry ~32% of total signal', body: 'When allowed to compete with 30 other engineered features, cultural-calendar features account for 31.8% of feature importance.' },
      { title: 'Muhurat count is rank #4', body: 'hindu_muhurat_count ranks fourth overall — ahead of most economic and lag features.' },
      { title: 'Cultural signal complements, not replaces, history', body: 'Track A (cold-start) was a null result. The signal’s value is incremental on top of sales history, not a substitute for it.' },
      { title: 'The market is ₹3.75L Cr', body: 'At ~10M weddings a year, even a 6% RMSE improvement in inventory planning compounds across a market of this scale.' },
    ],
    recommendations: [
      'Retrofit existing lag-based demand models with muhurat-count, density, and lead-month features before rebuilding the stack.',
      'Generalise the feature layer to adjacent muhurat-driven markets: gold, venues, catering, travel, real estate, automotive.',
      'Translate the methodology to Chinese New Year (East/SE Asia), Eid (Middle East / South Asia), and Obon (Japan) — structurally identical problems in different calendars.',
    ],
    frameworks: ['Leave-One-Year-Out CV', 'Paired t-test', 'Track A / Track B design'],
    repo: 'https://github.com/Abhinav3419/Wedding-Demand-Forecast',
  },
];

/* =========================================================
   SKILLS
   ========================================================= */
export const skills = [
  {
    group: 'Machine Learning',
    items: ['Gradient Boosting (XGBoost, GBM)', 'Neural Networks (TensorFlow / Keras)', 'Regularised regression', 'Walk-forward CV', 'Calibration', 'Feature attribution'],
  },
  {
    group: 'Data Science',
    items: ['Exploratory analysis', 'Hypothesis testing (paired t-test, permutation)', 'Leakage-aware validation', 'Segment-wise error analysis', 'Honest null reporting'],
  },
  {
    group: 'Forecasting',
    items: ['Time-series feature engineering', 'Leave-One-Year-Out CV', 'Cultural-calendar features', 'Lag / rolling / YoY decomposition'],
  },
  {
    group: 'Analytics',
    items: ['Google Trends methodology', 'Correlation diagnostics', 'Model-family comparison', 'Per-fold RMSE analysis'],
  },
  {
    group: 'Python Ecosystem',
    items: ['pandas', 'NumPy', 'scikit-learn', 'SciPy', 'XGBoost', 'TensorFlow / Keras', 'Matplotlib', 'Seaborn'],
  },
  {
    group: 'Deployment / Tools',
    items: ['FastAPI', 'uvicorn', 'Docker', 'Streamlit', 'Jupyter', 'VS Code Interactive', 'pytest'],
  },
  {
    group: 'Version Control',
    items: ['Git', 'GitHub', 'Structured repo layout', 'README-as-documentation', 'Reproducible pipelines'],
  },
];

/* =========================================================
   SKILL STORY — timeline for the About section
   ========================================================= */
export const timeline = [
  {
    period: 'Now',
    heading: 'ML engineering, applied research, portfolio build-out.',
    detail:
      'Active work on ENSO Free Energy (manuscript in prep), Wedding Demand Forecast (published), and a PM-flavoured case-study portfolio spanning six companies.',
  },
  {
    period: '2024 — 2025',
    heading: 'Bridging teaching and machine learning.',
    detail:
      'Teaching Physics, Mathematics, and Quantitative Aptitude for NEET/JEE/CUET prep while building a production-grade ML portfolio on the side. Domain switches are a marathon; the technical foundation from Applied Mechanics accelerates the pace.',
  },
  {
    period: 'M.Tech',
    heading: 'Applied Mechanics, MNNIT Allahabad.',
    detail:
      'Thermodynamics, continuum mechanics, and computational methods. The discipline shows in every project — physics-informed features, entropy-based signal decomposition, and respect for null results.',
  },
  {
    period: 'B.Tech',
    heading: 'Electronics & Instrumentation.',
    detail:
      'Signals, control systems, and embedded sensing. The foundation for thinking about data as measurement — with noise, bias, and provenance — rather than just numbers.',
  },
];
