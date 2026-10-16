import { Product } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_scandinavian_home_1792129041902.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'nord-01',
    name: 'Forma Sculptural Ceramic Vase',
    category: 'Ceramics & Glass',
    tagline: 'Hand-pinched stoneware with tactile sand glaze',
    price: 135,
    originalPrice: 160,
    rating: 4.9,
    reviewsCount: 48,
    description: 'A tactile, organic silhouette inspired by coastal rock formations. Each piece is hand-thrown on the wheel by master potters using iron-rich stoneware, finished with an unglazed mineral slip that feels like warm beach pebble stone.',
    details: [
      'Individually hand-thrown in small studio batches',
      'Unglazed textured mineral exterior, glazed water-tight interior',
      'Suitable for dry botanicals or fresh floral arrangements',
      'Signed on the base by the resident artisan'
    ],
    dimensions: 'H 24cm · Ø 16cm · Base Ø 11cm',
    materials: 'High-fire stoneware clay, mineral quartz slip',
    origin: 'Bornholm, Denmark',
    inStock: true,
    stockCount: 14,
    image: '/src/assets/images/product_ceramic_vase_1792129082335.jpg',
    variants: [
      {
        name: 'Mineral Finish',
        options: ['Chalk Dune', 'Smoked Basalt', 'Raw Sandstone']
      }
    ]
  },
  {
    id: 'nord-02',
    name: 'Astral Spun Brass Pendant',
    category: 'Lighting',
    tagline: 'Precision spun dome with champagne brushed luster',
    price: 320,
    originalPrice: 380,
    rating: 5.0,
    reviewsCount: 62,
    description: 'Suspended from a minimalist black braided cord, this architectural pendant casts a serene warm downward pool of light. Spun from solid raw brass sheet and treated with a light matte wax sealant that develops a gentle organic patina over decades.',
    details: [
      'Spun from 1.5mm thick solid brushed brass',
      'Includes 3m braided textile cable and matching ceiling canopy',
      'Compatible with standard E27 LED bulbs up to 60W',
      'Fully dimmable with compatible phase-cut wall dimmers'
    ],
    dimensions: 'Ø 38cm · H 22cm · Ceiling Rose Ø 12cm',
    materials: 'Solid spun brass, woven textile cable, porcelain socket',
    origin: 'Småland, Sweden',
    inStock: true,
    stockCount: 8,
    image: '/src/assets/images/product_brass_pendant_1792129083964.jpg',
    variants: [
      {
        name: 'Metal Luster',
        options: ['Champagne Brass', 'Brushed Bronze', 'Muted Gunmetal']
      }
    ]
  },
  {
    id: 'nord-03',
    name: 'Aura Travertine & Opal Table Lamp',
    category: 'Lighting',
    tagline: 'Unfilled Italian travertine cylinder with mouth-blown frosted globe',
    price: 245,
    originalPrice: 280,
    rating: 4.9,
    reviewsCount: 41,
    description: 'A study in tactile monoliths. The heavy unfilled beige travertine column provides an architectural anchor for the delicate, mouth-blown acid-etched opal glass sphere that diffuses a soothing 2700K ambient glow.',
    details: [
      'Solid carved Italian travertine stone with natural cavitations',
      'Mouth-blown three-layer frosted opal glass shade',
      'Integrated brass rotary dimmer switch on base',
      'Weighted 4.2kg base with non-slip cork underside'
    ],
    dimensions: 'H 32cm · Stone Base Ø 12cm · Glass Globe Ø 18cm',
    materials: 'Unfilled Italian Travertine, acid-etched glass, solid brass fitting',
    origin: 'Tivoli, Italy & Copenhagen',
    inStock: true,
    stockCount: 9,
    image: '/src/assets/images/product_travertine_lamp_1792129652826.jpg',
    variants: [
      {
        name: 'Stone Shade',
        options: ['Warm Roman Travertine', 'Silver Persian Travertine', 'Honed Sandstone']
      }
    ]
  },
  {
    id: 'nord-04',
    name: 'Brune Low-Profile Bouclé Armchair',
    category: 'Furniture',
    tagline: 'Smoked oak architectural frame with heavy textured bouclé',
    price: 680,
    originalPrice: 750,
    rating: 5.0,
    reviewsCount: 27,
    description: 'Conceived for lingering afternoons. The low rake of the seat supports an unhurried, relaxed posture, while the sculpted armrests celebrate the organic grain of smoked European oak with hand-sanded joinery.',
    details: [
      'Solid European smoked oak with natural wax finish',
      'High-resilience foam core with down feather top topper',
      'Heavy-duty tactile wool-blend bouclé upholstery (60,000 Martindale)',
      'Custom brass dowel joinery accents on rear stiles'
    ],
    dimensions: 'W 74cm · D 78cm · H 72cm · Seat H 39cm',
    materials: 'FSC Smoked Oak, 70% Wool 30% Cotton Bouclé, Brass dowels',
    origin: 'Småland, Sweden',
    inStock: true,
    stockCount: 4,
    image: '/src/assets/images/product_walnut_chair_1792129654955.jpg',
    variants: [
      {
        name: 'Upholstery Tone',
        options: ['Oatmeal Cream', 'Muted Charcoal', 'Warm Sand']
      }
    ]
  },
  {
    id: 'nord-05',
    name: 'Waffle Weave Organic Linen Throw',
    category: 'Textiles',
    tagline: 'Pre-washed European flax with breathable waffle relief',
    price: 145,
    rating: 4.8,
    reviewsCount: 39,
    description: 'Woven on heritage dobby looms from 100% certified European flax linen. The deep waffle texture traps soothing warmth while remaining feather-light and exceptionally breathable across all seasons.',
    details: [
      '100% GOTS & OEKO-TEX certified European flax',
      'Stone-washed for an effortless drape and immediate softness',
      'Naturally hypoallergenic, anti-static, and temperature regulating',
      'Machine washable on gentle cycle; gets softer with every wash'
    ],
    dimensions: '140cm × 200cm',
    materials: '100% stonewashed organic European flax (380 g/m²)',
    origin: 'Vilnius, Lithuania',
    inStock: true,
    stockCount: 22,
    image: '/src/assets/images/product_linen_throw_1792129083973.jpg',
    variants: [
      {
        name: 'Natural Color',
        options: ['Oatmeal Flax', 'Warm Olive', 'Earthy Terracotta']
      }
    ]
  },
  {
    id: 'nord-06',
    name: 'Kyst Solid White Oak Stool',
    category: 'Furniture',
    tagline: 'Sculptural three-legged accent stool with soft bullnose edges',
    price: 285,
    rating: 4.9,
    reviewsCount: 31,
    description: 'An understated multi-functional object that effortlessly transitions between an extra fireside seat, a nightstand, or a pedestal for collected curiosities. Built with traditional wedged tenon joinery from sustainably harvested FSC white oak.',
    details: [
      'Crafted from sustainable FSC-certified solid European white oak',
      'Hand-finished with plant-based organic hardwax oil',
      'Concealed wedged tenon joints without mechanical fasteners',
      'Felt glider feet included to protect delicate floorings'
    ],
    dimensions: 'H 46cm · Seat W 36cm · Footprint Ø 42cm',
    materials: 'Solid European White Oak, organic hardwax oil finish',
    origin: 'Aarhus, Denmark',
    inStock: true,
    stockCount: 6,
    image: '/src/assets/images/product_oak_stool_1792129084597.jpg',
    variants: [
      {
        name: 'Timber Finish',
        options: ['Natural White Oak', 'Smoked Dark Oak', 'Oiled Ash']
      }
    ]
  },
  {
    id: 'nord-07',
    name: 'Silke Fluted Smoked Amber Carafe & Tumbler Set',
    category: 'Ceramics & Glass',
    tagline: 'Hand-blown fluted amber glass decanter with stackable cups',
    price: 110,
    originalPrice: 130,
    rating: 4.9,
    reviewsCount: 36,
    description: 'Mouth-blown by glassblowers using recycled borosilicate glass with rich amber pigmentation. The linear vertical fluting creates mesmerizing refractive caustics when filled with cold spring water or botanical infusions.',
    details: [
      'Includes 1 carafe (1000ml) and 2 matching fluted tumblers (280ml each)',
      'Natural Portuguese raw cork stopper included',
      'Heat-resistant borosilicate glass suitable for iced or hot drinks',
      'Tumbler nests neatly upside down over the carafe neck for bedside use'
    ],
    dimensions: 'Carafe: H 25cm · Ø 9.5cm | Tumblers: H 9cm · Ø 7.5cm',
    materials: 'Hand-blown colored borosilicate glass, natural cork',
    origin: 'Kosta, Sweden',
    inStock: true,
    stockCount: 16,
    image: '/src/assets/images/product_amber_glassware_1792129655931.jpg',
    variants: [
      {
        name: 'Glass Tint',
        options: ['Smoked Amber', 'Mist Olive', 'Clear Quartz']
      }
    ]
  },
  {
    id: 'nord-08',
    name: 'Skov Solid Walnut End-Grain Butcher Board',
    category: 'Kitchen & Table',
    tagline: 'Heavy 5cm end-grain block with recessed solid brass corner inlays',
    price: 175,
    originalPrice: 200,
    rating: 5.0,
    reviewsCount: 52,
    description: 'An heirloom kitchen centerpiece. End-grain timber arrangement preserves the razor edges of chef knives by parting fibers gently under the blade. Finished with food-grade pure walnut oil and beeswax.',
    details: [
      'End-grain construction from sustainably harvested American black walnut',
      'Solid brass corner brace inlays flush-mounted to perimeter',
      'Carved side handles for effortless lifting from kitchen island',
      'Reversible flat surface on reverse for pastry dough rolling'
    ],
    dimensions: 'L 45cm · W 35cm · Thickness 5.2cm · Weight 6.8kg',
    materials: 'Black American Walnut, solid brass inlays, organic beeswax finish',
    origin: 'Odense, Denmark',
    inStock: true,
    stockCount: 10,
    image: '/src/assets/images/product_endgrain_board_1792129656613.jpg',
    variants: [
      {
        name: 'Hardwood Selection',
        options: ['Black Walnut & Brass', 'European White Oak & Brass', 'Hard Maple']
      }
    ]
  },
  {
    id: 'nord-09',
    name: 'Vinter Ribbed Merino Wool Cushion Pair',
    category: 'Textiles',
    tagline: 'Chunky architectural knit in undyed natural ivory fleece',
    price: 120,
    rating: 4.8,
    reviewsCount: 29,
    description: 'Knitted from heavy gauge 21-micron untreated merino wool. The bold architectural rib creates comforting textural relief on leather or timber chairs. Complete with a plush certified cruelty-free duck feather pad.',
    details: [
      'Set of 2 tactile knit cushions (50cm × 50cm each)',
      '100% natural unbleached, undyed pure merino wool yarn',
      'Concealed brass YKK zipper along the bottom edge',
      'Includes high-loft down and feather interior pad'
    ],
    dimensions: '50cm × 50cm (each cushion)',
    materials: '100% Merino wool cover, 100% Cotton shell with duck down fill',
    origin: 'Trondheim, Norway',
    inStock: true,
    stockCount: 18,
    image: '/src/assets/images/product_wool_cushion_1792129657326.jpg',
    variants: [
      {
        name: 'Fleece Shade',
        options: ['Raw Ivory Fleece', 'Smoked Heather Grey', 'Toasted Dune']
      }
    ]
  },
  {
    id: 'nord-10',
    name: 'Solis Solid Milled Brass Incense Vessel',
    category: 'Studio Objects',
    tagline: 'Sculptural solid brass burner with slate collector tray',
    price: 85,
    rating: 4.9,
    reviewsCount: 73,
    description: 'Precision-milled from a solid cylindrical brass billet with a weighted rounded base. The center aperture holds standard bamboo-core and Japanese coreless incense sticks firmly, while the dark slate dish catches fallen ash cleanly.',
    details: [
      'CNC milled from solid lead-free C360 brass',
      'Natural cleaved Spanish charcoal slate presentation tray',
      'Accommodates Japanese stick incense (1.8mm to 3.2mm)',
      'Includes 10 trial sticks of Kyoto cedarwood incense'
    ],
    dimensions: 'Brass Vessel: Ø 6.5cm · H 3.2cm | Slate Tray: Ø 18cm',
    materials: 'Solid milled brass, natural cleft slate, cork base pad',
    origin: 'Kyoto, Japan & Stockholm, Sweden',
    inStock: true,
    stockCount: 25,
    image: '/src/assets/images/product_brass_incense_1792129656542.jpg',
    variants: [
      {
        name: 'Brass Finish',
        options: ['Spun Satin Brass', 'Aged Patina Basalt', 'Raw Machined Gold']
      }
    ]
  },
  {
    id: 'nord-11',
    name: 'Hygge Stoneware Coffee Mug (Pair)',
    category: 'Ceramics & Glass',
    tagline: 'Set of two speckle-glazed morning coffee vessels',
    price: 68,
    rating: 4.9,
    reviewsCount: 84,
    description: 'Designed for the unhurried morning cup. Thick ceramic walls retain warmth, while the ergonomic pulled loop handle comfortably rests two fingers. Glazed in a soft matte cream with authentic iron pyrites specks.',
    details: [
      'Set of 2 handcrafted mugs (340ml capacity each)',
      'Microwave and dishwasher safe durable stoneware body',
      'Comfortable weighted ergonomic balance in the hand',
      'Unglazed tactile base ring with workshop stamp'
    ],
    dimensions: 'H 9.5cm · Ø 8.8cm · 340ml capacity',
    materials: 'High-fire speckled stoneware, lead-free food-safe matte glaze',
    origin: 'Kyoto & Stockholm Studio Collaboration',
    inStock: true,
    stockCount: 35,
    image: '/src/assets/images/product_stoneware_mug_1792129100841.jpg',
    variants: [
      {
        name: 'Glaze Scheme',
        options: ['Speckled Oatmeal', 'Midnight Slate', 'Misty Birch']
      }
    ]
  },
  {
    id: 'nord-12',
    name: 'Kuro Cast Iron Pouring Kettle',
    category: 'Kitchen & Table',
    tagline: 'Heavy gauge matte iron kettle with steam-bent oak handle',
    price: 195,
    originalPrice: 220,
    rating: 5.0,
    reviewsCount: 57,
    description: 'A striking union of traditional sand-cast metallurgy and Scandinavian woodworking. The heavy cast iron maintains steady temperature distribution, and the precision goose-neck spout affords effortless control for pour-over coffee and tea infusions.',
    details: [
      'Sand-cast iron with enameled rust-resistant interior',
      'Steam-bent solid FSC white oak stay-cool handle',
      'Compatible with induction, gas, ceramic, and electric stoves',
      'Includes removable fine-mesh stainless steel infuser basket'
    ],
    dimensions: 'H 21cm (with handle) · Base Ø 15.5cm · 1.2L capacity',
    materials: 'Pure sand-cast iron, steam-bent oak, 304 stainless steel',
    origin: 'Morioka, Japan',
    inStock: true,
    stockCount: 11,
    image: '/src/assets/images/product_cast_kettle_1792129101468.jpg',
    variants: [
      {
        name: 'Handle Accent',
        options: ['Natural Oak', 'Charred Black Oak', 'Smoked Walnut']
      }
    ]
  }
];

export const CATEGORIES = [
  'All Objects',
  'Ceramics & Glass',
  'Lighting',
  'Furniture',
  'Textiles',
  'Kitchen & Table',
  'Studio Objects'
];

export const PROMO_CODES: Record<string, { discountPercent: number; description: string }> = {
  'WELCOME10': { discountPercent: 10, description: '10% Welcome Studio Discount' },
  'NORD15': { discountPercent: 15, description: '15% Seasonal Collector Discount' },
  'ARCHITECT20': { discountPercent: 20, description: '20% Trade Member Privilege' }
};

export const REVIEWS = [
  {
    author: 'Elena Lindqvist',
    location: 'Copenhagen, Denmark',
    product: 'Forma Sculptural Ceramic Vase',
    text: 'The weight, texture, and mineral finish exceed gallery standard. It anchors my dining table with quiet authority.',
    date: '2 weeks ago'
  },
  {
    author: 'Marcus Vance',
    location: 'London, UK',
    product: 'Astral Spun Brass Pendant',
    text: 'The brushed brass glow transformed our kitchen nook completely. Flawless craftsmanship and arrived securely packed in biodegradable molded wool.',
    date: 'Last month'
  },
  {
    author: 'Sophie Chen',
    location: 'Vancouver, Canada',
    product: 'Kuro Cast Iron Pouring Kettle',
    text: 'A daily ritual transformed. The oak handle stays cool, the pour balance is effortless, and the tactile presence on the stovetop is magnificent.',
    date: '3 weeks ago'
  },
  {
    author: 'Nikolai Sorensen',
    location: 'Stockholm, Sweden',
    product: 'Brune Low-Profile Bouclé Armchair',
    text: 'The smoked oak joinery is flawless. The bouclé fabric has wonderful tactile depth, and the posture is supremely comfortable for evening reading.',
    date: '1 week ago'
  }
];
