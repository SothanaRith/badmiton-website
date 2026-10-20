export const CATEGORIES = [
  {
    id: 'rackets',
    name: 'Pro Rackets',
    nameKm: 'រ៉ាកែតកម្រិតប្រកួត',
    subtitle: 'Astrox, Ryuga, Halbertec & more',
    subtitleKm: 'Astrox, Ryuga, Halbertec និងច្រើនទៀត',
    image: '/images/hero-racket.jpg',
    tag: 'Up to 25% Off',
    tagKm: 'បញ្ចុះតម្លៃរហូតដល់ 25%'
  },
  {
    id: 'shoes',
    name: 'Court Shoes',
    nameKm: 'ស្បែកជើងតារាង',
    subtitle: 'Power Cushion, All-Around Grip',
    subtitleKm: 'បាតទន់ស្រួលជើង និងស្វិតជាប់ល្អ',
    image: '/images/court-shoes.jpg',
    tag: 'New Releases',
    tagKm: 'ម៉ូដថ្មីទើបចេញ'
  },
  {
    id: 'shuttles',
    name: 'Feather Shuttles',
    nameKm: 'កូនសីរោមហង្ស',
    subtitle: 'BWF Approved Tournament Grade',
    subtitleKm: 'ស្តង់ដារ BWF សម្រាប់ប្រកួត',
    image: '/images/shuttlecocks.jpg',
    tag: 'Bulk Pricing',
    tagKm: 'តម្លៃលក់ដុំ'
  },
  {
    id: 'bags',
    name: 'Tournament Bags',
    nameKm: 'កាតាបប្រកួត',
    subtitle: '6 & 9 Racket Thermo Bags',
    subtitleKm: 'កាតាបការពារកម្ដៅដាក់បាន ៦ ទៅ ៩ រ៉ាកែត',
    image: '/images/tour-bag.jpg',
    tag: 'Top Rated',
    tagKm: 'ពេញនិយមបំផុត'
  }
];

export const PRODUCTS = [
  {
    id: 'yonex-astrox-100zz',
    name: 'Yonex Astrox 100 ZZ Kurenai',
    brand: 'Yonex',
    category: 'rackets',
    price: 249.00,
    originalPrice: 295.00,
    rating: 4.9,
    reviewsCount: 1180,
    image: '/images/hero-racket.jpg',
    badge: 'BEST SELLER',
    inStock: true,
    stockCount: 12,
    description: 'Flagship offensive racket engineered with Hyper Slim Shaft and Namd graphite for explosive continuous smash power and sharp angle attacks.',
    specs: {
      balance: 'Head-Heavy',
      flex: 'Extra Stiff',
      weightGrip: '4U (83g) / G5',
      weightClass: '4U',
      tensionMax: '28 lbs',
      frameMaterial: 'HM Graphite + Namd + Tungsten',
      playStyle: 'Attacking / Smash Dominance',
      smashPower: 98,
      controlSpeed: 91
    }
  },
  {
    id: 'victor-thruster-ryuga-2',
    name: 'Victor Thruster Ryuga II Pro',
    brand: 'Victor',
    category: 'rackets',
    price: 229.00,
    originalPrice: 265.00,
    rating: 4.8,
    reviewsCount: 840,
    image: '/images/hero-racket.jpg',
    badge: 'HOT DEAL',
    inStock: true,
    stockCount: 15,
    description: 'Equipped with WES 2.0 and FREE CORE synthetic handle for quick recovery and fierce decisive attacks at the highest competitive level.',
    specs: {
      balance: 'Head-Heavy',
      flex: 'Stiff',
      weightGrip: '3U (88g) / G5',
      weightClass: '3U',
      tensionMax: '31 lbs',
      frameMaterial: 'High Resilience Modulus Graphite + PYROFIL',
      playStyle: 'Heavy Attacking Singles & Doubles',
      smashPower: 96,
      controlSpeed: 89
    }
  },
  {
    id: 'lining-halbertec-8000',
    name: 'Li-Ning Halbertec 8000',
    brand: 'Li-Ning',
    category: 'rackets',
    price: 239.00,
    originalPrice: 279.00,
    rating: 4.9,
    reviewsCount: 650,
    image: '/images/hero-racket.jpg',
    badge: 'PRO CHOICE',
    inStock: true,
    stockCount: 14,
    description: 'The pinnacle of even-balance control and swift defensive counters. High-elastic carbon shaft provides surgical shuttle placement.',
    specs: {
      balance: 'Even-Balance',
      flex: 'Medium',
      weightGrip: '4U (84g) / G5',
      weightClass: '4U',
      tensionMax: '30 lbs',
      frameMaterial: 'T1100 + Ultra-High Elastic Carbon',
      playStyle: 'All-Around Control & Fast Defense',
      smashPower: 90,
      controlSpeed: 97
    }
  },
  {
    id: 'yonex-nanoflare-1000z',
    name: 'Yonex Nanoflare 1000Z Lightning',
    brand: 'Yonex',
    category: 'rackets',
    price: 255.00,
    originalPrice: 289.00,
    rating: 4.9,
    reviewsCount: 920,
    image: '/images/hero-racket.jpg',
    badge: 'WORLD RECORD SPEED',
    inStock: true,
    stockCount: 8,
    description: 'The fastest racket frame ever produced. Engineered for lightning drives, net kills, and instantaneous swing speed.',
    specs: {
      balance: 'Head-Light',
      flex: 'Extra Stiff',
      weightGrip: '4U (83g) / G5',
      weightClass: '4U',
      tensionMax: '28 lbs',
      frameMaterial: 'Sonic Flare System + Ultra PE FIBER',
      playStyle: 'High-Speed Drives & Net Interception',
      smashPower: 91,
      controlSpeed: 99
    }
  },
  {
    id: 'victor-drivex-10-metallic',
    name: 'Victor DriveX 10 Metallic',
    brand: 'Victor',
    category: 'rackets',
    price: 215.00,
    originalPrice: 245.00,
    rating: 4.7,
    reviewsCount: 410,
    image: '/images/hero-racket.jpg',
    badge: 'NEW ARRIVAL',
    inStock: true,
    stockCount: 11,
    description: 'Innovative metallic carbon fiber integration in the shaft provides crisp feedback and effortless baseline-to-baseline clears.',
    specs: {
      balance: 'Even-Balance',
      flex: 'Stiff',
      weightGrip: '4U (83g) / G5',
      weightClass: '4U',
      tensionMax: '29 lbs',
      frameMaterial: 'Metallic Carbon + Nano Fortify TR',
      playStyle: 'Precision Counter & Tactical Play',
      smashPower: 91,
      controlSpeed: 95
    }
  },
  {
    id: 'yonex-aerus-z2-men',
    name: 'Yonex Power Cushion Aerus Z2 Light',
    brand: 'Yonex',
    category: 'shoes',
    price: 159.99,
    originalPrice: 185.00,
    rating: 4.8,
    reviewsCount: 512,
    image: '/images/court-shoes.jpg',
    badge: 'FEATHER LIGHT',
    inStock: true,
    stockCount: 16,
    description: 'The lightest badminton shoe on the market at just 240g. Seamless upper construction with Power Cushion+ shock absorption.',
    specs: {
      weight: '240g',
      cushioning: 'Power Cushion+ (3-layer)',
      sole: 'Hexagrip Natural Gum Rubber',
      type: 'Speed & Agility'
    }
  },
  {
    id: 'victor-p9200-cushion-pro',
    name: 'Victor P9200 Hype Cushion Pro Court',
    brand: 'Victor',
    category: 'shoes',
    price: 145.00,
    originalPrice: 169.00,
    rating: 4.8,
    reviewsCount: 388,
    image: '/images/court-shoes.jpg',
    badge: 'MAX STABILITY',
    inStock: true,
    stockCount: 10,
    description: 'Tournament-grade lateral stability shoe with ENERGYMAX V heel dampening, preventing ankle rolling during extreme lunges.',
    specs: {
      weight: '310g',
      cushioning: 'ENERGYMAX V + Light Resilient EVA',
      sole: 'VSR Anti-Slip Rubber',
      type: 'Maximum Cushioning & Support'
    }
  },
  {
    id: 'yonex-aerosensa-50-tube',
    name: 'Yonex Aerosensa 50 Feather Shuttles (1 Dozen)',
    brand: 'Yonex',
    category: 'shuttles',
    price: 45.00,
    originalPrice: 52.00,
    rating: 5.0,
    reviewsCount: 1420,
    image: '/images/shuttlecocks.jpg',
    badge: 'BWF OFFICIAL',
    inStock: true,
    stockCount: 6,
    description: 'Official tournament shuttlecock for Olympic Games and World Championships. Crafted with 100% selected goose feathers and 100% solid cork.',
    specs: {
      feather: 'Grade A Goose Feather',
      cork: '100% Natural Cork Base',
      speed: 'Speed 77 / Speed 78',
      quantity: '12 Shuttles per tube'
    }
  },
  {
    id: 'victor-master-ace-tube',
    name: 'Victor Master Ace Tournament Shuttles',
    brand: 'Victor',
    category: 'shuttles',
    price: 43.50,
    originalPrice: 48.00,
    rating: 4.9,
    reviewsCount: 890,
    image: '/images/shuttlecocks.jpg',
    badge: 'TOP FLIGHT',
    inStock: true,
    stockCount: 18,
    description: 'Superior flight trajectory consistency and incredible durability under heavy smash testing.',
    specs: {
      feather: 'Selected Goose Feathers',
      cork: 'Three-Layer Natural Composite Cork',
      speed: 'Speed 77',
      quantity: '12 Shuttles per tube'
    }
  },
  {
    id: 'yonex-pro-tour-9r-bag',
    name: 'Yonex Pro 9-Racket Thermal Tour Bag',
    brand: 'Yonex',
    category: 'bags',
    price: 129.99,
    originalPrice: 155.00,
    rating: 4.9,
    reviewsCount: 460,
    image: '/images/tour-bag.jpg',
    badge: 'THERMO GUARD',
    inStock: true,
    stockCount: 7,
    description: 'Dual climate-protection compartments protect your string tension from hot courts and temperature swings. Dedicated ventilated shoe tunnel.',
    specs: {
      capacity: 'Up to 9 Rackets',
      features: 'Thermo Guard Lining + Shoe Pocket',
      straps: 'Ergonomic Dual Padded Backpack Harness'
    }
  },
  {
    id: 'lining-ln65-string-reel',
    name: 'Li-Ning LN65 200m String Reel (High Repulsion)',
    brand: 'Li-Ning',
    category: 'accessories',
    price: 89.00,
    originalPrice: 105.00,
    rating: 4.8,
    reviewsCount: 310,
    image: '/images/string-reel.jpg',
    badge: 'CRISP SOUND',
    inStock: true,
    stockCount: 2,
    description: '0.65mm thin gauge string that produces deafening metallic hitting sound and blistering shuttle repulsion on smashes.',
    specs: {
      gauge: '0.65mm',
      length: '200m (Approx. 20-22 rackets)',
      feel: 'Crisp & Explosive'
    }
  },
  {
    id: 'elite-tacky-overgrips-pack',
    name: 'Super Tacky Absorbent Overgrips (Pack of 3)',
    brand: 'SmashZone Pro',
    category: 'accessories',
    price: 8.99,
    originalPrice: 12.00,
    rating: 4.8,
    reviewsCount: 780,
    image: '/images/overgrips.jpg',
    badge: 'BEST VALUE',
    inStock: true,
    stockCount: 9,
    description: 'Micro-perforated polyurethane material that absorbs sweat immediately and provides slip-free control even during intense rallies.',
    specs: {
      thickness: '0.60mm',
      pack: '3 grips with sealing tape',
      texture: 'Super Tacky Moisture-Wicking'
    }
  }
];

export const QUICK_RECOMMENDATIONS = [
  { id: 'rec-1', title: 'Top Astrox Series', titleKm: 'ត្រកូល Astrox ពេញនិយម', subtitle: 'Power & Smashes', subtitleKm: 'កម្លាំង & វាយសំពាស', iconType: 'zap' },
  { id: 'rec-2', title: 'Your Saved Rackets', titleKm: 'រ៉ាកែតដែលបានរក្សាទុក', subtitle: '3 items saved', subtitleKm: 'រក្សាទុក ៣ មុខ', iconType: 'heart' },
  { id: 'rec-3', title: 'Court Shoes 2026', titleKm: 'ស្បែកជើងតារាង 2026', subtitle: 'Lightweight & Grip', subtitleKm: 'ស្រាល & ស្អិតល្អ', iconType: 'shoes' },
  { id: 'rec-4', title: 'Tournament Shuttles', titleKm: 'កូនសីប្រកួត', subtitle: 'BWF Certified', subtitleKm: 'ស្តង់ដារ BWF', iconType: 'shuttle' },
  { id: 'rec-5', title: 'Custom Stringing', titleKm: 'សេវាដាក់ខ្សែពិសេស', subtitle: '24-hour turnaround', subtitleKm: 'រួចរាល់ក្នុង 24 ម៉ោង', iconType: 'wrench' }
];

export const STRING_OPTIONS = [
  { name: 'Yonex BG80 (0.68mm - Hard Feeling / Power)', price: 18.00 },
  { name: 'Yonex BG66 Ultimax (0.65mm - High Repulsion)', price: 19.50 },
  { name: 'Li-Ning LN65 (0.65mm - Crisp Sound / Speed)', price: 18.00 },
  { name: 'Yonex Aerobite Hybrid (0.67mm / 0.61mm - Spin)', price: 22.00 },
  { name: 'Unstrung (Frame Only - $0)', price: 0.00 }
];
