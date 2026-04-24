import { Organization, Category, MenuItem, Table } from '../types'

export const mockOrganization: Organization = {
  id: 'org-001',
  name: 'DASTYOR Restaurant',
  logo_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
  address: 'Toshkent, Amir Temur ko\'chasi 108',
  phone: '+998 90 123 45 67'
}

export const mockCategories: Category[] = [
  { id: 'cat-001', organization_id: 'org-001', name: 'Osh', icon: '🍚', sort_order: 1, is_active: true },
  { id: 'cat-002', organization_id: 'org-001', name: 'Sho\'rva', icon: '🍲', sort_order: 2, is_active: true },
  { id: 'cat-003', organization_id: 'org-001', name: 'Kabob', icon: '🍖', sort_order: 3, is_active: true },
  { id: 'cat-004', organization_id: 'org-001', name: 'Salat', icon: '🥗', sort_order: 4, is_active: true },
  { id: 'cat-005', organization_id: 'org-001', name: 'Ichimlik', icon: '🥤', sort_order: 5, is_active: true },
  { id: 'cat-006', organization_id: 'org-001', name: 'Desert', icon: '🍰', sort_order: 6, is_active: true }
]

export const mockMenuItems: MenuItem[] = [
  {
    id: 'item-001',
    organization_id: 'org-001',
    category_id: 'cat-001',
    name: 'Osh Toshkent',
    description: 'An\'anaviy Toshkent oshi, qo\'y go\'shti va sabzi bilan',
    image_url: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?w=600',
    price: 3500000,
    cook_time_minutes: 25,
    is_available: true,
    ingredients: 'Guruch, qo\'y go\'shti, sabzi, piyoz, yog\''
  },
  {
    id: 'item-002',
    organization_id: 'org-001',
    category_id: 'cat-001',
    name: 'Osh Samarqand',
    description: 'Samarqand uslubidagi osh, nozik to\'g\'ralgan sabzi bilan',
    image_url: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600',
    price: 4000000,
    cook_time_minutes: 30,
    is_available: true,
    ingredients: 'Guruch, mol go\'shti, sabzi, piyoz, noʻxat'
  },
  {
    id: 'item-003',
    organization_id: 'org-001',
    category_id: 'cat-001',
    name: 'Devzira Oshi',
    description: 'Maxsus devzira guruchi bilan tayyorlangan premium osh',
    image_url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600',
    price: 5500000,
    cook_time_minutes: 35,
    is_available: true,
    ingredients: 'Devzira guruchi, qo\'y go\'shti, sabzi, piyoz'
  },
  {
    id: 'item-004',
    organization_id: 'org-001',
    category_id: 'cat-002',
    name: 'Mastava',
    description: 'Guruchli sho\'rva, qatiq va ko\'k ko\'katlari bilan',
    image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600',
    price: 2000000,
    cook_time_minutes: 20,
    is_available: true,
    ingredients: 'Guruch, go\'sht, qatiq, sabzavot'
  },
  {
    id: 'item-005',
    organization_id: 'org-001',
    category_id: 'cat-002',
    name: 'Lagʻmon Sho\'rva',
    description: 'Qo\'l tortma lagʻmon, boy sho\'rva va go\'sht bilan',
    image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600',
    price: 2500000,
    cook_time_minutes: 25,
    is_available: true,
    ingredients: 'Qo\'l xamiri, go\'sht, sabzavot, ziravorlar'
  },
  {
    id: 'item-006',
    organization_id: 'org-001',
    category_id: 'cat-003',
    name: 'Qo\'y Kabob',
    description: 'Yumshoq qo\'y go\'shtidan tayyorlangan klassik kabob',
    image_url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600',
    price: 3000000,
    cook_time_minutes: 15,
    is_available: true,
    ingredients: 'Qo\'y go\'shti, piyoz, ziravorlar'
  },
  {
    id: 'item-007',
    organization_id: 'org-001',
    category_id: 'cat-003',
    name: 'Jigar Kabob',
    description: 'Yangi jigar, mazali ziravorlar bilan',
    image_url: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600',
    price: 2500000,
    cook_time_minutes: 10,
    is_available: true,
    ingredients: 'Jigar, piyoz, ziravorlar'
  },
  {
    id: 'item-008',
    organization_id: 'org-001',
    category_id: 'cat-003',
    name: 'Tovuq Kabob',
    description: 'Marinlangan tovuq go\'shti, nozik ta\'m',
    image_url: 'https://images.unsplash.com/photo-1633504581786-316c8002b1b9?w=600',
    price: 2200000,
    cook_time_minutes: 12,
    is_available: true,
    ingredients: 'Tovuq go\'shti, yogurt, ziravorlar'
  },
  {
    id: 'item-009',
    organization_id: 'org-001',
    category_id: 'cat-004',
    name: 'Achichuk',
    description: 'Yangi pomidor, bodring va piyozdan tayyorlangan salat',
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600',
    price: 1200000,
    cook_time_minutes: 5,
    is_available: true,
    ingredients: 'Pomidor, bodring, piyoz, ko\'kat'
  },
  {
    id: 'item-010',
    organization_id: 'org-001',
    category_id: 'cat-004',
    name: 'Olivye',
    description: 'An\'anaviy rus salati, tovuq va kartoshka bilan',
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
    price: 1500000,
    cook_time_minutes: 5,
    is_available: true,
    ingredients: 'Tovuq, kartoshka, tuxum, sabzi, mayonez'
  },
  {
    id: 'item-011',
    organization_id: 'org-001',
    category_id: 'cat-005',
    name: 'Ko\'k choy',
    description: 'Issiq ko\'k choy',
    image_url: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cda9?w=600',
    price: 500000,
    cook_time_minutes: 3,
    is_available: true,
    ingredients: 'Ko\'k choy'
  },
  {
    id: 'item-012',
    organization_id: 'org-001',
    category_id: 'cat-005',
    name: 'Kompot',
    description: 'Uyda tayyorlangan meva kompoti',
    image_url: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600',
    price: 800000,
    cook_time_minutes: 2,
    is_available: true,
    ingredients: 'Quritilgan mevalar, shakar'
  },
  {
    id: 'item-013',
    organization_id: 'org-001',
    category_id: 'cat-005',
    name: 'Limonad',
    description: 'Tabiiy limonli suvli ichimlik',
    image_url: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f0b?w=600',
    price: 1000000,
    cook_time_minutes: 2,
    is_available: true,
    ingredients: 'Limon, shakar, suv, yalpiz'
  },
  {
    id: 'item-014',
    organization_id: 'org-001',
    category_id: 'cat-006',
    name: 'Nisholda',
    description: 'An\'anaviy o\'zbek deserti, yong\'oq bilan',
    image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600',
    price: 1500000,
    cook_time_minutes: 5,
    is_available: true,
    ingredients: 'Tuxum oqi, shakar, yong\'oq'
  },
  {
    id: 'item-015',
    organization_id: 'org-001',
    category_id: 'cat-006',
    name: 'Chak-chak',
    description: 'Qovurilgan xamir, asal bilan qoplangan',
    image_url: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600',
    price: 1200000,
    cook_time_minutes: 5,
    is_available: true,
    ingredients: 'Un, tuxum, asal'
  },
  {
    id: 'item-016',
    organization_id: 'org-001',
    category_id: 'cat-006',
    name: 'Muzqaymoq',
    description: 'Uy ishlab chiqarilgan muzqaymoq, turli lazzatlar',
    image_url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600',
    price: 1800000,
    cook_time_minutes: 2,
    is_available: true,
    ingredients: 'Sut, qaymoq, shakar'
  }
]

export const mockTable: Table = {
  id: 'table-001',
  organization_id: 'org-001',
  table_number: 5,
  qr_code_id: 'demo-qr-001'
}
