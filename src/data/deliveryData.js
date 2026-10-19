export const DEFAULT_DELIVERY_PROVIDERS = [
  {
    id: 'virak-buntham',
    name: 'Virak Buntham (VET Express)',
    nameKm: 'វីរៈ ប៊ុនថាំ (VET Express)',
    desc: 'Nationwide express bus & branch courier across all 25 provinces (1-2 days)',
    descKm: 'ដឹកជញ្ជូនរហ័សទូទាំង ២៥ ខេត្តក្រុងតាមសាខា និងរថយន្តក្រុង (១-២ ថ្ងៃ)',
    logo: '/delivery/vet.png',
    feeUSD: 2.00,
    active: true,
    displayOrder: 1
  },
  {
    id: 'jnt-express',
    name: 'J&T Express',
    nameKm: 'J&T Express (ជេ & ធី)',
    desc: 'Door-to-door courier directly to your home or court doorstep (1-2 days)',
    descKm: 'ដឹកជញ្ជូនដល់មាត់ទ្វារផ្ទះ ឬដល់តារាងវាយសីផ្ទាល់ (១-២ ថ្ងៃ)',
    logo: '/delivery/jnt.png',
    feeUSD: 2.00,
    active: true,
    displayOrder: 2
  },
  {
    id: 'jalat-delivery',
    name: 'Jalat Delivery',
    nameKm: 'ចល័ត ដឹកជញ្ជូន (Jalat Express)',
    desc: 'Same-day express dispatch within Phnom Penh capital area (2-4 hours)',
    descKm: 'ដឹកជញ្ជូនរហ័សក្នុងរាជធានីភ្នំពេញ ក្នុងរយៈពេល ២-៤ ម៉ោង',
    logo: '/delivery/jalat.png',
    feeUSD: 2.00,
    active: true,
    displayOrder: 3
  },
  {
    id: 'pickup',
    name: 'Pro Shop & Court Pickup',
    nameKm: 'មកយកនៅហាង ឬ តារាងសីផ្ទាល់',
    desc: 'Pickup directly at SmashZone Station, Court 4 National Olympic Stadium',
    descKm: 'មកយកផ្ទាល់នៅស្តង់ SmashZone តារាងទី ៤ ពហុកីឡដ្ឋានជាតិអូឡាំពិក',
    logo: null,
    feeUSD: 0.00,
    active: true,
    displayOrder: 4
  }
];

export const CAMBODIA_PROVINCES = [
  { en: 'Phnom Penh', km: 'ភ្នំពេញ' },
  { en: 'Siem Reap', km: 'សៀមរាប' },
  { en: 'Battambang', km: 'បាត់ដំបង' },
  { en: 'Sihanoukville', km: 'ព្រះសីហនុ' },
  { en: 'Kampot', km: 'កំពត' },
  { en: 'Kampong Cham', km: 'កំពង់ចាម' },
  { en: 'Kandal', km: 'កណ្ដាល' },
  { en: 'Kampong Speu', km: 'កំពង់ស្ពឺ' },
  { en: 'Kampong Chhnang', km: 'កំពង់ឆ្នាំង' },
  { en: 'Takeo', km: 'តាកែវ' },
  { en: 'Prey Veng', km: 'ព្រៃវែង' },
  { en: 'Svay Rieng', km: 'ស្វាយរៀង' },
  { en: 'Kampong Thom', km: 'កំពង់ធំ' },
  { en: 'Pursat', km: 'ពោធិ៍សាត់' },
  { en: 'Koh Kong', km: 'កោះកុង' },
  { en: 'Kep', km: 'កែប' },
  { en: 'Pailin', km: 'ប៉ៃលិន' },
  { en: 'Banteay Meanchey', km: 'បន្ទាយមានជ័យ' },
  { en: 'Kratie', km: 'ក្រចេះ' },
  { en: 'Stung Treng', km: 'ស្ទឹងត្រែង' },
  { en: 'Ratanakiri', km: 'រតនគិរី' },
  { en: 'Mondulkiri', km: 'មណ្ឌលគិរី' },
  { en: 'Preah Vihear', km: 'ព្រះវិហារ' },
  { en: 'Oddar Meanchey', km: 'ឧត្ដរមានជ័យ' },
  { en: 'Tbong Khmum', km: 'ត្បូងឃ្មុំ' }
];

export const KHR_EXCHANGE_RATE = 4100;
export const DEFAULT_FREE_DELIVERY_THRESHOLD = 199;
