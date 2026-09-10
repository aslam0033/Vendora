const vendors = [
  {
    id: 1,
    name: "TechSphere",
    category: "Electronics",

    description:
      "TechSphere brings together modern electronics, audio devices, smart accessories and everyday tech products with a focus on quality and reliable customer service.",

    rating: 4.9,
    reviews: 1200,
    products: 86,
    followers: "12.8K",

    verified: true,
    joined: 2023,

    location: "Bengaluru, Karnataka",
    phone: "+91 98765 41001",
    email: "support@techsphere.in",
    website: "www.techsphere.in",

    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=80",

    logo:
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=400&q=80",

    banner:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1600&q=80",
  },

  {
    id: 2,
    name: "Digital World",
    category: "Electronics",

    description:
      "Digital World offers smart gadgets, wearable technology and practical electronic accessories designed for modern everyday life.",

    rating: 4.5,
    reviews: 540,
    products: 78,
    followers: "6.8K",

    verified: false,
    joined: 2024,

    location: "Hyderabad, Telangana",
    phone: "+91 98765 41002",
    email: "hello@digitalworld.in",
    website: "www.digitalworld.in",

    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",

    logo:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",

    banner:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
  },

  {
    id: 3,
    name: "Urban Style",
    category: "Fashion",

    description:
      "Urban Style is a fashion-focused marketplace store offering casual clothing, footwear and modern lifestyle essentials for everyday wear.",

    rating: 4.8,
    reviews: 980,
    products: 124,
    followers: "10.5K",

    verified: true,
    joined: 2022,

    location: "Mumbai, Maharashtra",
    phone: "+91 98765 41003",
    email: "care@urbanstyle.in",
    website: "www.urbanstyle.in",

    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80",

    logo:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80",

    banner:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80",
  },

  {
    id: 4,
    name: "Style Street",
    category: "Fashion",

    description:
      "Style Street provides practical fashion accessories, bags and contemporary lifestyle products for students, professionals and everyday shoppers.",

    rating: 4.4,
    reviews: 410,
    products: 83,
    followers: "5.6K",

    verified: false,
    joined: 2024,

    location: "New Delhi, Delhi",
    phone: "+91 98765 41004",
    email: "support@stylestreet.in",
    website: "www.stylestreet.in",

    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",

    logo:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80",

    banner:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
  },

  {
    id: 5,
    name: "HomeCraft",
    category: "Home & Living",

    description:
      "HomeCraft specializes in thoughtful home decor, kitchen accessories and everyday living products designed to make spaces more comfortable and stylish.",

    rating: 4.7,
    reviews: 760,
    products: 72,
    followers: "8.6K",

    verified: true,
    joined: 2024,

    location: "Pune, Maharashtra",
    phone: "+91 98765 41005",
    email: "support@homecraft.in",
    website: "www.homecraft.in",

    image:
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=1200&q=80",

    logo:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80",

    banner:
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=1600&q=80",
  },

  {
    id: 6,
    name: "FitZone",
    category: "Sports",

    description:
      "FitZone offers fitness accessories, training equipment and sports essentials for customers focused on active lifestyles, workouts and everyday performance.",

    rating: 4.7,
    reviews: 830,
    products: 68,
    followers: "7.9K",

    verified: true,
    joined: 2023,

    location: "Chennai, Tamil Nadu",
    phone: "+91 98765 41006",
    email: "care@fitzone.in",
    website: "www.fitzone.in",

    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",

    logo:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&q=80",

    banner:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80",
  },

  {
    id: 7,
    name: "Glow Beauty",
    category: "Beauty",

    description:
      "Glow Beauty brings together skincare, personal-care and beauty essentials designed for simple daily routines and modern self-care.",

    rating: 4.6,
    reviews: 640,
    products: 95,
    followers: "9.2K",

    verified: true,
    joined: 2023,

    location: "Bengaluru, Karnataka",
    phone: "+91 98765 41007",
    email: "hello@glowbeauty.in",
    website: "www.glowbeauty.in",

    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80",

    logo:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=80",

    banner:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1600&q=80",
  },

  {
    id: 8,
    name: "Pixel Point",
    category: "Electronics",

    description:
      "Pixel Point focuses on cameras, photography equipment and creator-focused electronics for enthusiasts and professionals looking for reliable imaging products.",

    rating: 4.9,
    reviews: 1100,
    products: 52,
    followers: "11.1K",

    verified: true,
    joined: 2022,

    location: "Mumbai, Maharashtra",
    phone: "+91 98765 41008",
    email: "support@pixelpoint.in",
    website: "www.pixelpoint.in",

    image:
      "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=1200&q=80",

    logo:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80",

    banner:
      "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=1600&q=80",
  },
];

export default vendors;