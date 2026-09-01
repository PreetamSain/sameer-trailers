export interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  category: 'tippers' | 'trailers' | 'bulkers' | 'body-builders';
  categoryTitle: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  features: string[];
  specs: { label: string; value: string }[];
  applications: string[];
}

export const PRODUCTS_LIST: ProductDetail[] = [
  {
    id: 'tippers',
    name: 'Heavy-Duty Commercial Tippers',
    slug: 'tippers',
    category: 'tippers',
    categoryTitle: 'Tippers',
    shortDesc: 'Engineered for high-impact rock dumping, coal transportation, iron ore hauling, and heavy aggregate excavation.',
    fullDesc: 'Sameer Trailers manufactures heavy-duty hydraulic box tippers designed for extreme mining and construction conditions. Built with high-grade abrasion-resistant steel and powered by multi-stage front-end hydraulic telescopic cylinders, our tippers ensure rapid material discharge with zero chassis deflection.',
    image: '/assets/extracted/img_3.webp',
    features: [
      'Anti-rollover low center-of-gravity box structure',
      'High-grade wear-resistant steel floor and side walls',
      'Multi-stage front-end telescopic hydraulic cylinder',
      'Automatic heavy-duty tailgate locking mechanism',
      'Heavy-duty trunnion and bogie suspension options',
      'Shot-blasted SA 2.5 surface with dual 2K PU paint finish'
    ],
    specs: [
      { label: 'Capacity / Volume', value: '18 Cu.M to 36 Cu.M' },
      { label: 'Payload Rating', value: '35 to 50 Metric Tons' },
      { label: 'Axle Configuration', value: '2-Axle / 3-Axle / 4-Axle Heavy Duty' },
      { label: 'Tipping Angle', value: '45° to 48° Fast Discharge' },
      { label: 'Floor Thickness', value: '6mm / 8mm High-Yield Steel' },
      { label: 'Side Wall Thickness', value: '4mm / 5mm High-Tensile Steel' },
      { label: 'Braking System', value: 'Dual-line pneumatic with Wabco ABS' },
      { label: 'Compliance', value: '100% ARAI AIS-113 & CMVR Certified' }
    ],
    applications: [
      'Iron Ore & Bauxite Mining',
      'Coal Transport for Thermal Plants',
      'Blue Metal & Stone Quarry Aggregates',
      'Highway Infrastructure & Earthworks'
    ]
  },
  {
    id: 'trailers',
    name: 'Commercial Flatbed & Semi-Low Bed Trailers',
    slug: 'trailers',
    category: 'trailers',
    categoryTitle: 'Trailers',
    shortDesc: 'High-tensile steel cargo platforms engineered for maximum legal interstate payload, containers, and heavy machinery.',
    fullDesc: 'Our commercial flatbed and skeletal chassis trailers are precision-fabricated using high-tensile steel beams and automated submerged arc welding. Designed to carry heavy steel coils, machinery, and shipping containers across long interstate highway routes with optimal fuel efficiency.',
    image: '/assets/extracted/img_4.webp',
    features: [
      'High-tensile structural steel chassis with zero sagging',
      'Submerged arc robotically welded longitudinal I-beams',
      'Integrated container twist locks for 20ft & 40ft containers',
      'Heavy-duty chequered steel floor plating',
      'Dual-speed heavy landing gear (28T capacity)',
      'Certified RUPD rear and SUPD side underrun guards'
    ],
    specs: [
      { label: 'Platform Length', value: '32 Feet / 40 Feet / 45 Feet' },
      { label: 'Payload Capacity', value: '40 to 55 Metric Tons' },
      { label: 'Axles', value: '3-Axle 13T / 16T Capacity' },
      { label: 'Suspension', value: 'Heavy Duty Leaf Spring / Air Suspension' },
      { label: 'Main Girder', value: 'Fabricated I-Beam (Yield Strength > 550 MPa)' },
      { label: 'King Pin', value: '2" (50mm) or 3.5" (90mm) JOST Standard' },
      { label: 'Tyre Specs', value: '10.00 x 20 / 295/80 R22.5 Tubeless' },
      { label: 'Lighting', value: '24V Submersible Full LED Lighting' }
    ],
    applications: [
      'Steel Coils, TMT Bars & Structural Steel',
      'Intermodal ISO Shipping Containers',
      'Heavy Industrial Machinery & Equipment',
      'Long-Haul Interstate Cargo Logistics'
    ]
  },
  {
    id: 'bulkers',
    name: 'Fly Ash & Cement Bulkers / Tankers',
    slug: 'bulkers',
    category: 'bulkers',
    categoryTitle: 'Bulkers / Tankers',
    shortDesc: 'Pneumatically pressurized dry bulk tankers for seamless, zero-loss powder cargo distribution.',
    fullDesc: 'Sameer Trailers bulkers are engineered for efficient pressurized transportation of cement, fly ash, lime powder, and dry chemical minerals. Featuring an aerodynamic vessel profile with high-speed fluidization aeration beds for rapid discharge and minimal interior material residue.',
    image: '/assets/extracted/img_5.webp',
    features: [
      'Rapid discharge rate of 1.5 to 2.0 Tons per minute',
      'High-efficiency fluidizing canvas aeration bed',
      'Dual pressure safety relief valves and gauge panel',
      'Sealed top manholes with non-slip safety walkway',
      'Auxiliary diesel engine or tractor PTO compressor drive',
      'High-tensile carbon steel pressure vessel body'
    ],
    specs: [
      { label: 'Vessel Volume', value: '30 Cu.M to 42 Cu.M' },
      { label: 'Working Pressure', value: '2.0 Bar (Test Pressure 3.0 Bar)' },
      { label: 'Payload Capacity', value: '35 to 45 Metric Tons' },
      { label: 'Discharge Hose', value: '4-Inch (100mm) High-Pressure Line' },
      { label: 'Axle Setup', value: '3-Axle 13T / 16T Capacity' },
      { label: 'Air Compressor', value: '2-Cylinder / 3-Cylinder Air Cooled' }
    ],
    applications: [
      'Fly Ash Transport from Thermal Power Plants',
      'Bulk Cement for Ready-Mix Concrete (RMC)',
      'Bentonite, Gypsum & Silica Powder Distribution',
      'Mineral Processing & Construction Projects'
    ]
  },
  {
    id: 'body-builders',
    name: 'Custom Truck Bodies & Heavy Carriers',
    slug: 'body-builders',
    category: 'body-builders',
    categoryTitle: 'Body Builders',
    shortDesc: 'Custom fabricated commercial truck bodies, side-wall carriers, and specialized over-dimensional transporters.',
    fullDesc: 'We offer bespoke commercial vehicle body-building services tailored to specific chassis and fleet requirements. From removable side-wall cargo bodies to heavy low-bed machinery carriers, our skilled engineers build durable structures adhering to strict CMVR standards.',
    image: '/assets/extracted/img_2.webp',
    features: [
      'Custom dimensions to fit all major chassis makes (Tata, Ashok Leyland, BharatBenz)',
      'Reinforced side posts and drop-down gate locking mechanisms',
      'High-yield structural steel cross members and bolsters',
      'Anti-corrosion epoxy primer and custom fleet color paint',
      'Heavy tie-down hooks and cargo lashing tracks'
    ],
    specs: [
      { label: 'Chassis Compatibility', value: 'All 6-Wheeler to 16-Wheeler Multi-Axle Trucks' },
      { label: 'Wall Height Options', value: '2.5 Ft to 5.5 Ft Removable Gates' },
      { label: 'Floor Thickness', value: '2.5mm / 3.15mm / 4mm Chequered Plate' },
      { label: 'Paint Finish', value: 'Epoxy Zinc Rich Primer + 2K Polyurethane' }
    ],
    applications: [
      'Bagged Cement & Agricultural Commodities',
      'FMCG, White Goods & Palletized Freight',
      'Construction & Infrastructure Machinery',
      'Specialized Project Cargo'
    ]
  }
];

export const MANUFACTURING_STEPS = [
  {
    number: '01',
    title: 'DESIGN',
    subtitle: 'Advanced 3D Design & Engineering',
    desc: 'Precision CAD modeling and structural stress analysis to optimize weight distribution and eliminate fatigue points.',
    icon: 'Design',
    image: '/assets/extracted/img_6.webp'
  },
  {
    number: '02',
    title: 'CUTTING',
    subtitle: 'High Performance Cutting for Accuracy',
    desc: 'High-definition CNC plasma and laser cutting lines ensure micron-level dimensional precision for all steel parts.',
    icon: 'Cutting',
    image: '/assets/extracted/img_7.webp'
  },
  {
    number: '03',
    title: 'FABRICATION',
    subtitle: 'Strong Fabrication by Professionals',
    desc: 'Skilled structural fabricators assemble rigid chassis frames using dedicated clamping jigs for 100% alignment.',
    icon: 'Fabrication',
    image: '/assets/extracted/img_8.webp'
  },
  {
    number: '04',
    title: 'WELDING',
    subtitle: 'High Strength Welding for Long Life',
    desc: 'Automatic dual-sided submerged arc welding (SAW) on main I-beams ensures deep root penetration and unyielding strength.',
    icon: 'Welding',
    image: '/assets/extracted/img_9.webp'
  },
  {
    number: '05',
    title: 'PAINTING',
    subtitle: 'Anti Corrosion Painting for Extra Protection',
    desc: 'Complete steel shot-blasting (SA 2.5) followed by epoxy zinc-rich primer and heavy-duty 2K polyurethane paint booth coating.',
    icon: 'Painting',
    image: '/assets/extracted/img_10.webp'
  },
  {
    number: '06',
    title: 'QC',
    subtitle: 'Strict Quality Inspection before Final Delivery',
    desc: 'Comprehensive multi-point quality audit including axle alignment, brake line pressure tests, and electrical checks before dispatch.',
    icon: 'QC',
    image: '/assets/extracted/img_11.webp'
  }
];

export const QUALITY_POINTS = [
  {
    title: 'HIGH GRADE STRUCTURAL STEEL',
    desc: 'We use high-quality steel and robust structural components to build trailers that deliver excellent load-bearing capacity, rigidity, and long-term durability & performance.',
    image: '/assets/extracted/img_8.webp'
  },
  {
    title: 'PRECISION ENGINEERING',
    desc: 'Every trailer is engineered with precision to ensure accurate dimensions, reliable construction, and dependable performance across demanding transportation applications.',
    image: '/assets/extracted/img_7.webp'
  },
  {
    title: 'REINFORCED CHASSIS DESIGN',
    desc: 'Our reinforced chassis is designed to handle heavy loads while maintaining structural stability, reducing stress on critical components and ensuring dependable performance.',
    image: '/assets/extracted/img_6.webp'
  },
  {
    title: 'QUALITY-DRIVEN MANUFACTURING',
    desc: 'Our modern manufacturing processes combine precision fabrication, skilled workmanship, & rigorous quality checks to ensure every trailer meets high standards of strength & reliability.',
    image: '/assets/extracted/img_9.webp'
  }
];

export const ENGINEERING_PILLARS = [
  {
    icon: 'ShieldCheck',
    title: 'DOMEX 700 High-Yield Steel',
    stat: '700 MPa',
    desc: 'Ultra-high yield strength steel eliminates sagging and micro-cracks under peak highway stresses while reducing tare weight.'
  },
  {
    icon: 'Weight',
    title: '1.8 Tons Tare Weight Saved',
    stat: '-1,800 kg',
    desc: 'Lighter tare dead-weight enables fleet transporters to legally haul 1.5 to 1.8 tons more revenue cargo per trip.'
  },
  {
    icon: 'Flame',
    title: 'Submerged Arc Robotic Welding',
    stat: '100% Pen.',
    desc: 'Continuous dual-beam automated submerged arc welding ensures deep root penetration without human welding inconsistencies.'
  },
  {
    icon: 'Sparkles',
    title: 'SA 2.5 Shot Blasting & 2K PU',
    stat: '10+ Yrs',
    desc: 'Steel shot-blasted to white metal (SA 2.5) followed by zinc-rich primer & heavy 2K polyurethane paint for extreme rust resistance.'
  }
];

export const INDUSTRY_SECTORS = [
  {
    title: 'Mining & Aggregates',
    desc: 'Extreme-duty rock tippers and quarry carriers built for iron ore, bauxite, limestone, and granite haulage.',
    cargo: 'Iron Ore, Coal, Granite, Blue Metal'
  },
  {
    title: 'Cement & Infrastructure',
    desc: 'High-speed fluidizing bulkers and heavy material trailers for highway projects, fly ash, and RMC batching plants.',
    cargo: 'Bulk Cement, Fly Ash, Lime Powder'
  },
  {
    title: 'Port Logistics & Shipping',
    desc: '40ft & 45ft flatbeds and skeletal trailers equipped with standard JOST container twist locks for intermodal freight.',
    cargo: '20ft/40ft ISO Containers, Export Cargo'
  },
  {
    title: 'Steel & Project Cargo',
    desc: 'Reinforced girder platforms with recessed coil wells for secure transport of hot-rolled steel coils and structural TMT bars.',
    cargo: 'Steel Coils, TMT Bundles, Heavy Machinery'
  }
];

export const FAQ_LIST = [
  {
    q: 'Are Sameer Trailers approved by ARAI and compliant with CMVR regulations?',
    a: 'Yes, 100% of our trailers and tippers are fully homologated and certified under ARAI AIS-113 and CMVR 1989 standards. Each vehicle comes with complete official documentation for direct and hassle-free RTO registration across any state in India.'
  },
  {
    q: 'What type of structural steel is used in manufacturing?',
    a: 'We use high-grade high-tensile structural steel (DOMEX 700 / BSK-46 / E350) for all primary longitudinal main I-beams and cross bolsters. This provides superior tensile strength and eliminates sagging even under extreme 50T+ payload conditions.'
  },
  {
    q: 'Can trailer dimensions and side-wall heights be customized?',
    a: 'Yes, we offer bespoke engineering options for length (32ft, 40ft, 45ft), side-wall heights, axle configurations (2-axle, 3-axle, 4-axle), and suspension systems (leaf spring or pneumatic air suspension) based on your fleet requirements.'
  },
  {
    q: 'What is the standard delivery timeline for new trailer orders?',
    a: 'Standard production timeline ranges between 10 to 20 working days depending on the model, quantity, and custom fabrication requirements from our Bhilwara manufacturing facility.'
  },
  {
    q: 'What warranty and after-sales support do you provide?',
    a: 'All Sameer Trailers come with a comprehensive structural warranty covering chassis I-beams, fabrication joints, and paint protection, backed by our dedicated technical support team.'
  }
];

export const COMPANY_INFO = {
  name: 'Sameer Trailers',
  tagline: 'High-Performance Commercial Trailers & Tippers',
  phone: '+91 96023 68888',
  phoneDisplay: '+91 96023 68888',
  email: 'info@sameertrailer.in',
  address: '8JGM+2HJ, near FCI GODOWN, Kawa Kheda, AMBEDKAR COLONY, Bhilwara, Rajasthan 311001',
  logo: '/assets/extracted/img_1.png',
  heroImage: '/assets/extracted/img_2.webp'
};
