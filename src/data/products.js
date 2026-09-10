const products = [
  {
    id: 1,
    name: "Wireless Noise Cancelling Headphones",
    vendor: "TechSphere",
    vendorId: 1,

    category: "Electronics",
    subCategory: "Audio",

    price: 3499,
    oldPrice: 4499,

    rating: 4.8,
    reviews: 128,

    stock: "In Stock",
    stockCount: 8,

    popularity: 95,
    featured: true,
    badge: "Best Seller",

    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",

    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80",
    ],

    description:
      "Experience immersive sound with powerful active noise cancellation, soft ear cushions and a comfortable lightweight design built for music, calls and everyday use.",

    specifications: {
      Brand: "SoundWave",
      Connectivity: "Bluetooth 5.3",
      Battery: "Up to 35 Hours",
      Charging: "USB Type-C",
      Microphone: "Built-in",
      Warranty: "1 Year",
    },
  },

  {
    id: 2,
    name: "Premium Smart Watch",
    vendor: "Digital World",
    vendorId: 2,

    category: "Electronics",
    subCategory: "Wearables",

    price: 2899,
    oldPrice: 3999,

    rating: 4.6,
    reviews: 92,

    stock: "In Stock",
    stockCount: 14,

    popularity: 90,
    featured: true,
    badge: "New",

    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",

    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=1200&q=80",
    ],

    description:
      "Stay connected and monitor your daily activity with a stylish smartwatch featuring fitness tracking, notifications, multiple sports modes and long-lasting battery life.",

    specifications: {
      Display: "1.9-inch HD",
      Connectivity: "Bluetooth",
      Battery: "Up to 7 Days",
      Tracking: "Heart Rate & Activity",
      WaterResistance: "IP68",
      Warranty: "1 Year",
    },
  },

  {
    id: 3,
    name: "Classic Casual Sneakers",
    vendor: "Urban Style",
    vendorId: 3,

    category: "Fashion",
    subCategory: "Footwear",

    price: 1899,
    oldPrice: 2499,

    rating: 4.7,
    reviews: 76,

    stock: "In Stock",
    stockCount: 12,

    popularity: 88,
    featured: true,
    badge: "20% Off",

    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",

    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80",
    ],

    description:
      "Comfortable everyday sneakers designed with a modern casual style, cushioned interior and durable sole for daily wear.",

    specifications: {
      Material: "Synthetic & Mesh",
      Sole: "Rubber",
      Fit: "Regular",
      Closure: "Lace-up",
      Style: "Casual",
      Care: "Wipe Clean",
    },
  },

  {
    id: 4,
    name: "Minimal Everyday Backpack",
    vendor: "Style Street",
    vendorId: 4,

    category: "Fashion",
    subCategory: "Accessories",

    price: 1499,
    oldPrice: 1999,

    rating: 4.5,
    reviews: 64,

    stock: "In Stock",
    stockCount: 18,

    popularity: 80,
    featured: true,
    badge: "Popular",

    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",

    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1200&q=80",
    ],

    description:
      "A clean and practical backpack designed for college, office and travel with organized storage and comfortable shoulder straps.",

    specifications: {
      Capacity: "24 Litres",
      Material: "Polyester",
      Compartments: "Multiple",
      LaptopSupport: "Up to 15.6 inch",
      Closure: "Zip",
      WaterResistance: "Splash Resistant",
    },
  },

  {
    id: 5,
    name: "Modern Wooden Table Lamp",
    vendor: "HomeCraft",
    vendorId: 5,

    category: "Home & Living",
    subCategory: "Decor",

    price: 2199,
    oldPrice: 2999,

    rating: 4.4,
    reviews: 47,

    stock: "In Stock",
    stockCount: 5,

    popularity: 75,
    featured: false,
    badge: "Limited Stock",

    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",

    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80",
    ],

    description:
      "Add warm ambient lighting to your room with this modern wooden table lamp, designed to complement bedrooms, study spaces and living rooms.",

    specifications: {
      Material: "Wood & Fabric",
      BulbType: "LED Compatible",
      Power: "220-240V",
      Switch: "Inline",
      Usage: "Indoor",
      Assembly: "Minimal",
    },
  },

  {
    id: 6,
    name: "Professional DSLR Camera",
    vendor: "Pixel Point",
    vendorId: 8,

    category: "Electronics",
    subCategory: "Cameras",

    price: 45999,
    oldPrice: 52999,

    rating: 4.9,
    reviews: 214,

    stock: "Only 4 Left",
    stockCount: 4,

    popularity: 99,
    featured: false,
    badge: "Top Rated",

    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=80",

    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=1200&q=80",
    ],

    description:
      "Capture high-quality photos and videos with a powerful DSLR camera designed for creators, photography enthusiasts and professional users.",

    specifications: {
      Sensor: "24.2 MP",
      Video: "Full HD",
      Autofocus: "Fast AF System",
      Connectivity: "Wi-Fi",
      LensMount: "Interchangeable",
      Warranty: "2 Years",
    },
  },

  {
    id: 7,
    name: "Premium Cotton Hoodie",
    vendor: "Urban Style",
    vendorId: 3,

    category: "Fashion",
    subCategory: "Clothing",

    price: 1299,
    oldPrice: 1899,

    rating: 4.3,
    reviews: 55,

    stock: "In Stock",
    stockCount: 16,

    popularity: 72,
    featured: false,
    badge: "Trending",

    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",

    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=1200&q=80",
    ],

    description:
      "A soft premium cotton hoodie designed for everyday comfort with a relaxed modern fit and versatile casual styling.",

    specifications: {
      Material: "Cotton Blend",
      Fit: "Regular",
      Sleeve: "Full Sleeve",
      Hood: "Adjustable",
      Wash: "Machine Wash",
      Gender: "Unisex",
    },
  },

  {
    id: 8,
    name: "Running Fitness Shoes",
    vendor: "FitZone",
    vendorId: 6,

    category: "Sports",
    subCategory: "Footwear",

    price: 2699,
    oldPrice: 3499,

    rating: 4.7,
    reviews: 101,

    stock: "In Stock",
    stockCount: 10,

    popularity: 86,
    featured: false,
    badge: "Fitness Pick",

    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",

    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80",
    ],

    description:
      "Lightweight running shoes designed for workouts, jogging and everyday training with responsive cushioning and reliable grip.",

    specifications: {
      Usage: "Running & Training",
      Upper: "Breathable Mesh",
      Sole: "Rubber",
      Cushioning: "Responsive Foam",
      Closure: "Lace-up",
      Fit: "Regular",
    },
  },

  {
    id: 9,
    name: "Skincare Essentials Kit",
    vendor: "Glow Beauty",
    vendorId: 7,

    category: "Beauty",
    subCategory: "Skincare",

    price: 1799,
    oldPrice: 2399,

    rating: 4.6,
    reviews: 89,

    stock: "In Stock",
    stockCount: 20,

    popularity: 84,
    featured: false,
    badge: "Customer Favorite",

    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",

    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80",
    ],

    description:
      "A complete everyday skincare collection designed to cleanse, hydrate and support a simple daily self-care routine.",

    specifications: {
      Products: "4 Piece Kit",
      SkinType: "All Skin Types",
      Usage: "Daily",
      Category: "Skincare",
      Packaging: "Reusable Box",
      ShelfLife: "24 Months",
    },
  },

  {
    id: 10,
    name: "Portable Bluetooth Speaker",
    vendor: "TechSphere",
    vendorId: 1,

    category: "Electronics",
    subCategory: "Audio",

    price: 1999,
    oldPrice: 2799,

    rating: 4.5,
    reviews: 73,

    stock: "Out of Stock",
    stockCount: 0,

    popularity: 79,
    featured: false,
    badge: "Popular",

    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80",

    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=1200&q=80",
    ],

    description:
      "Take your music anywhere with a compact wireless speaker offering clear sound, portable design and convenient Bluetooth connectivity.",

    specifications: {
      Connectivity: "Bluetooth 5.0",
      Battery: "Up to 12 Hours",
      Charging: "USB Type-C",
      WaterResistance: "IPX5",
      Microphone: "Built-in",
      Weight: "450 g",
    },
  },

  {
    id: 11,
    name: "Ceramic Coffee Mug Set",
    vendor: "HomeCraft",
    vendorId: 5,

    category: "Home & Living",
    subCategory: "Kitchen",

    price: 899,
    oldPrice: 1299,

    rating: 4.2,
    reviews: 38,

    stock: "In Stock",
    stockCount: 24,

    popularity: 65,
    featured: false,
    badge: "Value Pack",

    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80",

    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
    ],

    description:
      "A stylish ceramic mug set perfect for coffee, tea and everyday beverages, designed to complement modern kitchen and dining spaces.",

    specifications: {
      Pieces: "4 Mugs",
      Material: "Ceramic",
      Capacity: "350 ml Each",
      MicrowaveSafe: "Yes",
      DishwasherSafe: "Yes",
      Usage: "Hot & Cold Drinks",
    },
  },

  {
    id: 12,
    name: "Resistance Bands Training Set",
    vendor: "FitZone",
    vendorId: 6,

    category: "Sports",
    subCategory: "Fitness",

    price: 799,
    oldPrice: 1199,

    rating: 4.4,
    reviews: 62,

    stock: "In Stock",
    stockCount: 30,

    popularity: 71,
    featured: false,
    badge: "Home Workout",

    image:
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=900&q=80",

    images: [
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=80",
    ],

    description:
      "A versatile resistance-band set designed for strength training, mobility exercises, stretching and convenient home workouts.",

    specifications: {
      Bands: "5 Resistance Levels",
      Material: "Natural Latex",
      Usage: "Strength & Mobility",
      Portable: "Yes",
      Accessories: "Carry Bag Included",
      SuitableFor: "Beginner to Advanced",
    },
  },
];

export default products;