export const INITIAL_STRINGING_JOBS = [
  {
    id: 'STR-8821',
    customerName: 'Marcus Tan',
    phone: '+65 9123 4567',
    racket: 'Yonex Astrox 100 ZZ Kurenai',
    string: 'Yonex BG80 (0.68mm)',
    tension: 27,
    technician: 'Master Stringer Kenji (Yonex Certified)',
    status: 'in_progress', // 'received', 'in_progress', 'qc_passed', 'dispatched'
    machine: 'Yonex Precision 9.0 Pro',
    createdAt: '2026-10-19 14:30',
    notes: 'Player requested 2-knot pattern, 10% pre-stretch on main strings.'
  },
  {
    id: 'STR-8820',
    customerName: 'Sophia Chen',
    phone: '+60 12 345 6789',
    racket: 'Victor Thruster Ryuga II Pro',
    string: 'Yonex BG66 Ultimax (0.65mm)',
    tension: 28,
    technician: 'Stringer Alex',
    status: 'qc_passed',
    machine: 'Victor Electronic C-7032 Pro',
    createdAt: '2026-10-19 11:15',
    notes: 'Electronic tension test verified @ 28.1 lbs.'
  },
  {
    id: 'STR-8819',
    customerName: 'David Lee',
    phone: '+855 12 888 999',
    racket: 'Li-Ning Halbertec 8000',
    string: 'Li-Ning LN65 (0.65mm)',
    tension: 26,
    technician: 'Master Stringer Kenji',
    status: 'dispatched',
    machine: 'Yonex Precision 9.0 Pro',
    createdAt: '2026-10-18 16:45',
    notes: 'Dispatched via Express Courier to Olympic National Stadium Court 2.'
  },
  {
    id: 'STR-8822',
    customerName: 'Kevin Sanjaya Fan',
    phone: '+62 811 234 567',
    racket: 'Yonex Nanoflare 1000Z',
    string: 'Yonex Aerobite Hybrid (Red/White)',
    tension: 29,
    technician: 'Unassigned',
    status: 'received',
    machine: 'Pending Queue',
    createdAt: '2026-10-19 15:50',
    notes: 'Rush order for tournament finals tomorrow.'
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-9942',
    customer: 'Marcus Tan',
    items: [
      { name: 'Yonex Astrox 100 ZZ Kurenai', qty: 1, price: 249.00 },
      { name: 'Yonex BG80 Stringing Service (27 lbs)', qty: 1, price: 18.00 }
    ],
    total: 267.00,
    status: 'Restringing',
    date: 'Today, 2:30 PM',
    payment: 'Credit Card (Paid)',
    shippingType: 'Court Express Delivery'
  },
  {
    id: 'ORD-9941',
    customer: 'Sophia Chen',
    items: [
      { name: 'Victor Thruster Ryuga II Pro', qty: 1, price: 229.00 },
      { name: 'Super Tacky Overgrips 3-Pack', qty: 2, price: 8.99 }
    ],
    total: 246.98,
    status: 'Ready to Dispatch',
    date: 'Today, 11:15 AM',
    payment: 'Apple Pay (Paid)',
    shippingType: 'Standard Courier'
  },
  {
    id: 'ORD-9940',
    customer: 'David Lee',
    items: [
      { name: 'Li-Ning Halbertec 8000', qty: 1, price: 239.00 },
      { name: 'Yonex Aerosensa 50 Shuttles', qty: 4, price: 45.00 }
    ],
    total: 419.00,
    status: 'Completed',
    date: 'Yesterday, 4:45 PM',
    payment: 'Credit Card (Paid)',
    shippingType: 'Court Express Delivery'
  },
  {
    id: 'ORD-9939',
    customer: 'Badminton Academy Club',
    items: [
      { name: 'Yonex Aerosensa 50 Shuttles (1 Dozen)', qty: 25, price: 45.00 },
      { name: 'Li-Ning LN65 200m String Reel', qty: 2, price: 89.00 }
    ],
    total: 1303.00,
    status: 'Completed',
    date: 'Yesterday, 10:20 AM',
    payment: 'Bank Transfer (Paid)',
    shippingType: 'Club Wholesale Freight'
  }
];

export const LOW_STOCK_ITEMS = [
  {
    id: 'yonex-aerosensa-50-tube',
    name: 'Yonex Aerosensa 50 Feather Shuttles (Speed 77)',
    category: 'Shuttlecocks',
    currentStock: 6,
    reorderLevel: 20,
    unit: 'Tubes',
    burnRate: 'High (Avg 14 tubes/day)'
  },
  {
    id: 'lining-ln65-string-reel',
    name: 'Li-Ning LN65 200m Yellow String Reel',
    category: 'Strings',
    currentStock: 2,
    reorderLevel: 5,
    unit: '200m Spools',
    burnRate: 'Moderate (Avg 1 spool/week)'
  },
  {
    id: 'elite-tacky-overgrips-pack',
    name: 'Super Tacky Absorbent Overgrips (Pack of 3)',
    category: 'Accessories',
    currentStock: 9,
    reorderLevel: 30,
    unit: 'Packs',
    burnRate: 'High (Avg 8 packs/day)'
  }
];

export const MONTHLY_SALES_DATA = [
  { month: 'May', revenue: 28400, rackets: 74, stringingJobs: 130 },
  { month: 'Jun', revenue: 32600, rackets: 89, stringingJobs: 154 },
  { month: 'Jul', revenue: 36100, rackets: 96, stringingJobs: 180 },
  { month: 'Aug', revenue: 39800, rackets: 112, stringingJobs: 210 },
  { month: 'Sep', revenue: 44500, rackets: 128, stringingJobs: 245 },
  { month: 'Oct', revenue: 48920, rackets: 146, stringingJobs: 288 }
];
