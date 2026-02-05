// Hardcoded demo data for the Product Showcase Builder
// This data simulates what would come from a database

// Premium Background Templates
export const backgrounds = [
  {
    id: 'bg-1',
    name: 'Marble White',
    url: '/dist/bg/bg1.png',
    category: 'minimal'
  },
  {
    id: 'bg-2',
    name: 'Soft Gradient',
    url: '/dist/bg/bg2.png',
    category: 'gradient'
  },
  {
    id: 'bg-3',
    name: 'Concrete Gray',
    url: '/dist/bg/bg3.png',
    category: 'texture'
  },
  {
    id: 'bg-4',
    name: 'Blush Pink',
    url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80',
    category: 'gradient'
  },
  {
    id: 'bg-5',
    name: 'Ocean Blue',
    url: '/dist/bg/bg5.png',
    category: 'gradient'
  },
  {
    id: 'bg-6',
    name: 'Sand Beige',
    url: '/dist/bg/bg6.png',
    category: 'minimal'
  },
  {
    id: 'bg-7',
    name: 'Dark Moody',
    url: '/dist/bg/bg7.png',
    category: 'dark'
  },
  {
    id: 'bg-8',
    name: 'Warm Sunset',
    url: '/bg/bg8.png', // moved to public/bg/bg8.png
    category: 'gradient'
  },
  {
    id: 'bg-9',
    name: 'Forest Green',
    url: '/bg/bg9.png', // moved to public/bg/bg9.png       
    category: 'gradient'
  },
  {
    id: 'bg-10',
    name: 'Pure White',
    url: '/bg/bg10.png', // moved to public/bg/bg10.png
    category: 'minimal'
  },
  {
    id: 'bg-11',
    name: 'Luxury Gold',
    url: '/bg/bg11.png', // moved to public/bg/bg11.png
    category: 'gradient'
  },
  {
    id: 'bg-12',
    name: 'Velvet Black',
    url: '/bg/bg12.png', // moved to public/bg/bg12.png
    category: 'dark'
  },
  {
    id: 'bg-13',
    name: 'Linen Texture',
    url: '/bg/bg13.png', // moved to public/bg/bg13.png
    category: 'texture'
  },
  {
    id: 'bg-14',
    name: 'Dusty Rose',
    url: '/bg/bg14.png', // moved to public/bg/bg14.png
    category: 'gradient'
  },
  {
    id: 'bg-15',
    name: 'Mint Fresh',
    url: '/bg/bg15.png', // moved to public/bg/bg15.png
    category: 'gradient'
  }
];

// Product Categories
export const categories = [
  {
    id: 'purses',
    name: "Women's Purses",
    icon: '👜'
  },
  {
    id: 'earrings',
    name: 'Earrings',
    icon: '💎'
  }
];

// Product Images by Category (transparent PNGs from placeholder URLs)
export const products = {
  purses: [
    {
      id: 'bag-1',
      name: 'Designer Tote',
      url: '/dist/product/product2/p1.png',
      thumbnail: '/dist/product/product2/p1.png'
    },
    {
      id: 'bag-2',
      name: 'Leather Clutch',
      url: '/dist/product/product2/p2.png',
      thumbnail: '/dist/product/product2/p2.png'
    },
    {
      id: 'bag-3',
      name: 'Mini Shoulder',
      url: '/dist/product/product2/p3.png',
      thumbnail: '/dist/product/product2/p3.png'
    },
    {
      id: 'bag-4',
      name: 'Evening Bag',
      url: '/dist/product/product2/p4.png',
      thumbnail: '/dist/product/product2/p4.png'
    },
    {
      id: 'bag-5',
      name: 'Bag Extra 1',
      url: '/dist/product/product2/p7.png',
      thumbnail: '/dist/product/product2/p7.png'
    },
    {
      id: 'bag-6',
      name: 'Bag Extra 2',
      url: '/dist/product/product2/p8.png',
      thumbnail: '/dist/product/product2/p8.png'
    }
  ],
  earrings: [
    {
      id: 'earring-1',
      name: 'Pearl Drops',
      url: '/product/product3/p1.png',
      thumbnail: '/product/product3/p1.png'
    },
    {
      id: 'earring-2',
      name: 'Diamond Studs',
      url: '/product/product3/p2.png',
      thumbnail: '/product/product3/p2.png'
    },
    {
      id: 'earring-3',
      name: 'Gold Hoops',
      url: '/product/product3/p3.png',
      thumbnail: '/product/product3/p3.png'
    },
    {
      id: 'earring-4',
      name: 'Crystal Dangles',
      url: '/product/product3/p4.png',
      thumbnail: '/product/product3/p4.png'
    }
  ]
};

// Demo Showcases
export const demoShowcases = [
  {
    id: 'showcase-1',
    name: 'Designer Handbags',
    tagline: 'Style Meets Function',
    category: 'purses',
    thumbnail: '/dist/product/product2/p1.png',
    createdAt: '2024-01-20',
    components: [
      {
        id: 'comp-1',
        type: 'hero',
        backgroundId: 'bg-4',
        productId: 'bag-1',
        overlayTitle: 'THE BAG',
        productPosition: { x: 50, y: 50 },
        productScale: 1
      },
      {
        id: 'comp-2',
        type: 'text',
        title: 'Handcrafted Luxury',
        content: 'Premium Italian leather meets contemporary design in every stitch.'
      }
    ]
  },
  {
    id: 'showcase-2',
    name: 'Fine Jewelry',
    tagline: 'Shine Bright',
    category: 'earrings',
    thumbnail: '/product/product3/p1.png',
    createdAt: '2024-01-25',
    components: [
      {
        id: 'comp-1',
        type: 'hero',
        backgroundId: 'bg-7',
        productId: 'earring-1',
        overlayTitle: 'THE JEWEL',
        productPosition: { x: 50, y: 50 },
        productScale: 1
      }
    ]
  }
];

// Component Templates
export const componentTemplates = [
  {
    id: 'hero',
    name: 'Hero Section',
    description: 'Full-width layered product showcase',
    icon: '🎯'
  },
  {
    id: 'image-only',
    name: 'Image Only',
    description: 'Single product image with background',
    icon: '🖼️'
  },
  {
    id: 'text',
    name: 'Text Only',
    description: 'Feature title and description',
    icon: '📝'
  },
  {
    id: 'image-text',
    name: 'Image & Text',
    description: 'Product image with feature text',
    icon: '📸'
  },
  {
    id: 'gallery',
    name: 'Gallery',
    description: 'Horizontal scrolling product gallery',
    icon: '🎞️'
  }
];

// Gallery items from public/gallery
export const galleryItems = [
  '/gallery/bags/p1.png',
  '/gallery/bags/p2.png',
  '/gallery/bags/p3.png',
  '/gallery/bags/p4.png',
  '/gallery/bags/p5.png'
];

// Default new component data
export const defaultComponentData = {
  hero: {
    backgroundId: 'bg-1',
    productId: null,
    overlayTitle: 'THE ITEM',
    productPosition: { x: 50, y: 50 },
    productScale: 1,
    productRotation: 0,
    productImage: null
  },
  'image-only': {
    backgroundId: 'bg-1',
    productId: null,
    overlayTitle: '',
    productPosition: { x: 50, y: 50 },
    productScale: 1,
    productRotation: 0,
    productImage: null
  },
  text: {
    title: 'Feature Title',
    content: 'Add a brief description of this feature.'
  },
  'image-text': {
    backgroundId: 'bg-1',
    productId: null,
    imagePosition: 'left',
    title: 'Feature Title',
    content: 'Add a brief description.',
    productPosition: { x: 50, y: 50 },
    productScale: 0.9,
    productRotation: 0,
    productImage: null
  },
  gallery: {
    images: [],
    title: 'Gallery'
  }
};

// Helper function to get product by ID
export const getProductById = (productId) => {
  for (const category of Object.values(products)) {
    const product = category.find(p => p.id === productId);
    if (product) return product;
  }
  return null;
};

// Helper function to get background by ID
export const getBackgroundById = (bgId) => {
  return backgrounds.find(bg => bg.id === bgId) || backgrounds[0];
};

// Generate unique ID
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
