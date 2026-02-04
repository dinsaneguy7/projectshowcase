// Hardcoded demo data for the Product Showcase Builder
// This data simulates what would come from a database

// Premium Background Templates
export const backgrounds = [
  {
    id: 'bg-1',
    name: 'Marble White',
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    category: 'minimal'
  },
  {
    id: 'bg-2',
    name: 'Soft Gradient',
    url: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80',
    category: 'gradient'
  },
  {
    id: 'bg-3',
    name: 'Concrete Gray',
    url: 'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=800&q=80',
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
    url: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800&q=80',
    category: 'gradient'
  },
  {
    id: 'bg-6',
    name: 'Sand Beige',
    url: 'https://images.unsplash.com/photo-1558618047-f4b511e56647?w=800&q=80',
    category: 'minimal'
  },
  {
    id: 'bg-7',
    name: 'Dark Moody',
    url: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&q=80',
    category: 'dark'
  },
  {
    id: 'bg-8',
    name: 'Warm Sunset',
    url: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=800&q=80',
    category: 'gradient'
  },
  {
    id: 'bg-9',
    name: 'Forest Green',
    url: 'https://images.unsplash.com/photo-1557682260-96773eb01377?w=800&q=80',
    category: 'gradient'
  },
  {
    id: 'bg-10',
    name: 'Pure White',
    url: 'https://images.unsplash.com/photo-1533628635777-112b2239b1c7?w=800&q=80',
    category: 'minimal'
  },
  {
    id: 'bg-11',
    name: 'Luxury Gold',
    url: 'https://images.unsplash.com/photo-1557682233-43e671455dfa?w=800&q=80',
    category: 'gradient'
  },
  {
    id: 'bg-12',
    name: 'Velvet Black',
    url: 'https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?w=800&q=80',
    category: 'dark'
  },
  {
    id: 'bg-13',
    name: 'Linen Texture',
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    category: 'texture'
  },
  {
    id: 'bg-14',
    name: 'Dusty Rose',
    url: 'https://images.unsplash.com/photo-1557682268-e3955ed5d83f?w=800&q=80',
    category: 'gradient'
  },
  {
    id: 'bg-15',
    name: 'Mint Fresh',
    url: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=800&q=80',
    category: 'gradient'
  }
];

// Product Categories
export const categories = [
  {
    id: 'watches',
    name: 'Watches',
    icon: '⌚'
  },
  {
    id: 'purses',
    name: "Women's Purses",
    icon: '👜'
  },
  {
    id: 'earrings',
    name: 'Earrings',
    icon: '💎'
  },
  {
    id: 'accessories',
    name: 'Caps & Belts',
    icon: '🧢'
  }
];

// Product Images by Category (transparent PNGs from placeholder URLs)
export const products = {
  watches: [
    {
      id: 'watch-1',
      name: 'Classic Gold',
      url: 'https://www.pngall.com/wp-content/uploads/2016/04/Wrist-Watch-PNG.png',
      thumbnail: 'https://www.pngall.com/wp-content/uploads/2016/04/Wrist-Watch-PNG.png'
    },
    {
      id: 'watch-2',
      name: 'Sport Silver',
      url: 'https://www.pngall.com/wp-content/uploads/2016/04/Watch-Free-Download-PNG.png',
      thumbnail: 'https://www.pngall.com/wp-content/uploads/2016/04/Watch-Free-Download-PNG.png'
    },
    {
      id: 'watch-3',
      name: 'Minimalist Black',
      url: 'https://www.pngall.com/wp-content/uploads/2016/04/Watch-PNG-File.png',
      thumbnail: 'https://www.pngall.com/wp-content/uploads/2016/04/Watch-PNG-File.png'
    },
    {
      id: 'watch-4',
      name: 'Luxury Diamond',
      url: 'https://www.pngall.com/wp-content/uploads/2016/04/Watch-Transparent.png',
      thumbnail: 'https://www.pngall.com/wp-content/uploads/2016/04/Watch-Transparent.png'
    }
  ],
  purses: [
    {
      id: 'purse-1',
      name: 'Designer Tote',
      url: 'https://www.pngall.com/wp-content/uploads/2016/06/Handbag-Free-PNG-Image.png',
      thumbnail: 'https://www.pngall.com/wp-content/uploads/2016/06/Handbag-Free-PNG-Image.png'
    },
    {
      id: 'purse-2',
      name: 'Leather Clutch',
      url: 'https://www.pngall.com/wp-content/uploads/2016/06/Handbag-PNG.png',
      thumbnail: 'https://www.pngall.com/wp-content/uploads/2016/06/Handbag-PNG.png'
    },
    {
      id: 'purse-3',
      name: 'Mini Shoulder',
      url: 'https://www.pngall.com/wp-content/uploads/2016/06/Handbag-PNG-File.png',
      thumbnail: 'https://www.pngall.com/wp-content/uploads/2016/06/Handbag-PNG-File.png'
    },
    {
      id: 'purse-4',
      name: 'Evening Bag',
      url: 'https://www.pngall.com/wp-content/uploads/2016/06/Handbag-Transparent.png',
      thumbnail: 'https://www.pngall.com/wp-content/uploads/2016/06/Handbag-Transparent.png'
    }
  ],
  earrings: [
    {
      id: 'earring-1',
      name: 'Pearl Drops',
      url: 'https://www.pngall.com/wp-content/uploads/2017/05/Earrings-PNG-HD.png',
      thumbnail: 'https://www.pngall.com/wp-content/uploads/2017/05/Earrings-PNG-HD.png'
    },
    {
      id: 'earring-2',
      name: 'Diamond Studs',
      url: 'https://www.pngall.com/wp-content/uploads/2017/05/Earrings-PNG-Clipart.png',
      thumbnail: 'https://www.pngall.com/wp-content/uploads/2017/05/Earrings-PNG-Clipart.png'
    },
    {
      id: 'earring-3',
      name: 'Gold Hoops',
      url: 'https://www.pngall.com/wp-content/uploads/2017/05/Earrings-PNG-File.png',
      thumbnail: 'https://www.pngall.com/wp-content/uploads/2017/05/Earrings-PNG-File.png'
    },
    {
      id: 'earring-4',
      name: 'Crystal Dangles',
      url: 'https://www.pngall.com/wp-content/uploads/2017/05/Earrings-Free-PNG-Image.png',
      thumbnail: 'https://www.pngall.com/wp-content/uploads/2017/05/Earrings-Free-PNG-Image.png'
    }
  ],
  accessories: [
    {
      id: 'cap-1',
      name: 'Classic Cap',
      url: 'https://www.pngall.com/wp-content/uploads/2016/03/Cap-PNG-Image.png',
      thumbnail: 'https://www.pngall.com/wp-content/uploads/2016/03/Cap-PNG-Image.png'
    },
    {
      id: 'cap-2',
      name: 'Snapback',
      url: 'https://www.pngall.com/wp-content/uploads/2016/03/Cap-PNG.png',
      thumbnail: 'https://www.pngall.com/wp-content/uploads/2016/03/Cap-PNG.png'
    },
    {
      id: 'belt-1',
      name: 'Leather Belt',
      url: 'https://www.pngall.com/wp-content/uploads/2016/05/Belt-Free-PNG-Image.png',
      thumbnail: 'https://www.pngall.com/wp-content/uploads/2016/05/Belt-Free-PNG-Image.png'
    },
    {
      id: 'belt-2',
      name: 'Designer Belt',
      url: 'https://www.pngall.com/wp-content/uploads/2016/05/Belt-PNG-Clipart.png',
      thumbnail: 'https://www.pngall.com/wp-content/uploads/2016/05/Belt-PNG-Clipart.png'
    }
  ]
};

// Demo Showcases
export const demoShowcases = [
  {
    id: 'showcase-1',
    name: 'Luxury Watch Collection',
    tagline: 'Timeless Elegance',
    category: 'watches',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
    createdAt: '2024-01-15',
    components: [
      {
        id: 'comp-1',
        type: 'hero',
        backgroundId: 'bg-1',
        productId: 'watch-1',
        overlayTitle: 'THE TIMEPIECE',
        productPosition: { x: 50, y: 50 },
        productScale: 1
      },
      {
        id: 'comp-2',
        type: 'text',
        title: 'Crafted Excellence',
        content: 'Each watch is meticulously crafted with precision engineering and premium materials.'
      },
      {
        id: 'comp-3',
        type: 'image-text',
        backgroundId: 'bg-3',
        productId: 'watch-2',
        imagePosition: 'left',
        title: 'Swiss Movement',
        content: 'Powered by authentic Swiss movement for unparalleled accuracy.',
        productPosition: { x: 50, y: 50 },
        productScale: 0.9
      }
    ]
  },
  {
    id: 'showcase-2',
    name: 'Designer Handbags',
    tagline: 'Style Meets Function',
    category: 'purses',
    thumbnail: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
    createdAt: '2024-01-20',
    components: [
      {
        id: 'comp-1',
        type: 'hero',
        backgroundId: 'bg-4',
        productId: 'purse-1',
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
    id: 'showcase-3',
    name: 'Fine Jewelry',
    tagline: 'Shine Bright',
    category: 'earrings',
    thumbnail: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80',
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
  },
  {
    id: 'showcase-4',
    name: 'Urban Accessories',
    tagline: 'Express Yourself',
    category: 'accessories',
    thumbnail: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&q=80',
    createdAt: '2024-02-01',
    components: [
      {
        id: 'comp-1',
        type: 'hero',
        backgroundId: 'bg-12',
        productId: 'cap-1',
        overlayTitle: 'THE ESSENTIAL',
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

// Default new component data
export const defaultComponentData = {
  hero: {
    backgroundId: 'bg-1',
    productId: null,
    overlayTitle: 'THE ITEM',
    productPosition: { x: 50, y: 50 },
    productScale: 1
  },
  'image-only': {
    backgroundId: 'bg-1',
    productId: null,
    overlayTitle: '',
    productPosition: { x: 50, y: 50 },
    productScale: 1
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
    productScale: 0.9
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
