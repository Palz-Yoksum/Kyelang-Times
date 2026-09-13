import { RoomItem, GalleryPhoto, MenuItem, AmenityItem } from '../types';

export const HOTEL_INFO = {
  name: "Kyelang Times : The Dragon Heritage Homestay",
  shortName: "Kyelang Times",
  subTitle: "The Dragon Heritage Homestay",
  tagline: "Cozy Dragon Heritage Vibes & Cleanliness at 3,000m with heated beds",
  location: "Lower Keylong Village, Lahaul & Spiti District, Himachal Pradesh, India",
  altitude: "3,000 Meters / 9,842 Feet Above Sea Level",
  phone: "+91-7018296587 / +91-9910922037",
  whatsappNumber: "917018296587",
  email: "kyelangtimes@gmail.com",
  coordinates: "32.5710° N, 77.0325° E",
  tagDescription: "Perched in historic Lower Keylong Village, Kyelang Times is an authentic family-run homestay with a Dragon cultural experience, cozy vibes, and cleanliness as our top priority. We offer 2 Dragon Private Rooms with heated mattresses and attached baths, and an 8-bed Hostel Dorm Room with individual electric blankets and 2 shared washrooms with 24/7 hot showers, accompanied by top-floor Sanakdeik Peak glacier views and traditional home dining.",
  logo: "/images/logo.jpg"
};

export const ROOMS: RoomItem[] = [
  {
    id: "dragon-private-room-1",
    name: "Dragon Private room 1",
    category: "dragon_boutique",
    tagline: "Top-Floor Private Room with Dragon Painted Motifs & Sanakdeik Peak Vista",
    capacity: "2-3 Guests",
    bedConfig: "1 King Bed with Dual-Zone Heated Mattress",
    floor: "Top Floor",
    view: "Unobstructed Panoramic View of Keylong Glaciers & Sanakdeik Jot Peak",
    pricePerNight: "₹3,000",
    originalPrice: "₹3,850",
    badge: "Dragon Private Room 1",
    description: "Immerse yourself in authentic mountain heritage and cozy homestay warmth. Features hand-painted dragon wall artwork, spotless cleanliness, picture windows framing Sanakdeik Jot Peak, dual-control electric heated mattress, and a private attached bathroom with 24/7 instant hot geyser shower.",
    highlights: [
      "Spotless private attached washroom with 24/7 geyser hot water shower",
      "Dual-control electric heated mattress for freezing mountain nights",
      "Instant high-pressure hot water shower (25L dedicated geyser)",
      "Artistic hand-painted dragon wall motifs & cozy boutique decor",
      "Top-floor vantage directly facing Sanakdeik Jot Peak",
      "Electric kettle with complimentary local herbal & butter tea"
    ],
    amenities: [
      "Attached Private Washroom",
      "24/7 Geyser Hot Shower",
      "Heated Electric Mattress",
      "Sanakdeik Peak View Window",
      "Clean Fresh Linens",
      "Warm Duvet & Blankets",
      "High-Speed Wi-Fi",
      "Dragon Painted Decor"
    ],
    images: [
      "/images/room1/dragon_room_1_main.jpg",
      "/images/room1/room1_1.jpeg",
      "/images/room1/dragon_washroom_1.jpg",
      "/images/room1/room1_2.jpeg",
      "/images/room1/room1_3.jpeg",
      "/images/room1/room1_4.jpg",
      "/images/room1/room1_6.jpg",
      "/images/room1/room1_7.jpg",
      "/images/room1/room1_8.jpg",
      "/images/room1/room1_9.jpg",
      "/images/room1/room1_11.jpg",
      "/images/room1/room1_12.jpg",
      "/images/room1/room1_13.jpg",
      "/images/room1/room1_14.jpg",
      "/images/room1/room1_15.jpeg",
      "/images/room1/room1_16.jpeg",
      "/images/room1/room1_17.jpeg",
      "/images/room1/room1_18.jpeg",
      "/images/room1/room1_19.jpeg",
      "/images/room1/room1_20.jpeg"
    ]
  },
  {
    id: "dragon-private-room-2",
    name: "Dragon private room 2",
    category: "dragon_boutique",
    tagline: "Cozy Private Room with Dragon Painted Artwork & Mountain View",
    capacity: "2 Guests",
    bedConfig: "1 Queen Bed with Heated Mattress",
    floor: "Top Floor",
    view: "Direct View of Kardang Monastery & Surrounding 6,000m Himalayan Peaks",
    pricePerNight: "₹3,000",
    originalPrice: "₹3,450",
    badge: "Dragon Private Room 2",
    description: "A cozy and warm homestay retreat designed for travelers seeking cultural harmony and spotless cleanliness. Features dragon painted boutique room walls, thermal electric heated mattress, private attached bathroom with 24/7 hot water, and tranquil mountain vistas.",
    highlights: [
      "Spotless private attached washroom with 24/7 geyser hot shower",
      "Advanced heated thermal mattress with multiple warmth settings",
      "Instant 24-hour hot water showers with private attached bath",
      "Cleanliness as top priority: fresh sanitized linens & towels",
      "Private corner window overlooking village and mountain cliffs",
      "Hand-painted dragon artwork and authentic homestay atmosphere"
    ],
    amenities: [
      "Attached Private Washroom",
      "24/7 Hot Water Shower",
      "Heated Electric Mattress",
      "Mountain & Glacier Panorama",
      "Clean Fresh Linens",
      "Warm Blankets & Duvet",
      "High-Speed Wi-Fi",
      "Dragon Painted Decor"
    ],
    images: [
      "/images/room2/dragon_room_2_main.jpg",
      "/images/room2/room2_1.jpeg",
      "/images/room2/dragon_washroom_2.jpg",
      "/images/room2/room2_2.jpeg",
      "/images/room2/room2_3.jpeg",
      "/images/room2/room2_4.jpg",
      "/images/room2/room2_6.jpg",
      "/images/room2/room2_7.jpg",
      "/images/room2/room2_8.jpg",
      "/images/room2/room2_9.jpg",
      "/images/room2/room2_11.jpg",
      "/images/room2/room2_12.jpg",
      "/images/room2/room2_13.jpg",
      "/images/room2/room2_14.jpg",
      "/images/room2/room2_15.jpeg",
      "/images/room2/room2_16.jpeg",
      "/images/room2/room2_17.jpeg",
      "/images/room2/room2_18.jpeg",
      "/images/room2/room2_19.jpeg",
      "/images/room2/room2_20.jpeg"
    ]
  },
  {
    id: "hostel-dorm-room-8-beds",
    name: "Hostel Dorm Room (8 Single Beds)",
    category: "hostel_dorm",
    tagline: "8 Single Beds with Electric Blankets & 2 Shared Washrooms with Hot Showers",
    capacity: "8 Guests (Individual Single Beds)",
    bedConfig: "8 Single Beds, each with Individual Electric Blanket",
    floor: "Top Floor",
    view: "Sanakdeik Peak Ridges & Panoramic Lahaul Valley View",
    pricePerNight: "₹900",
    originalPrice: "₹1,200",
    badge: "Hostel Dorm · 8 Beds",
    description: "A spotless, warm, and friendly dormitory thoughtfully arranged for backpackers, solo travelers, and motorcyclists. Features 8 single beds each fitted with its own electric blanket for cozy sub-zero nights, clean fresh bed linens, and convenient access to 2 dedicated shared washrooms with 24/7 hot shower facility. Cleanliness is maintained as top priority daily.",
    highlights: [
      "2 dedicated shared washrooms equipped with 24/7 hot shower (geyser) facility",
      "8 comfortable single beds with individual electric blankets for sub-zero warmth",
      "Top priority on hygiene: daily sanitized washrooms & freshly laundered linens",
      "Authentic Dragon cultural experience with friendly, cozy homestay vibes",
      "Personal charging points and reading light beside each bed",
      "Direct top-floor terrace access with uninterrupted Sanakdeik Peak views"
    ],
    amenities: [
      "2 Shared Washrooms with Hot Shower",
      "Individual Electric Blanket",
      "24/7 Hot Shower Facility",
      "Clean Fresh Linens",
      "High-Speed Wi-Fi",
      "Personal Charging Point",
      "Sanakdeik Peak Terrace View",
      "Dragon Cultural Homestay"
    ],
    images: [
      "/images/dorm/hostel_room_main.jpg",
      "/images/dorm/dorm_1.jpg",
      "/images/dorm/hostel_washroom_1.jpg",
      "/images/dorm/hostel_washroom_2.jpg",
      "/images/dorm/dorm_2.jpg",
      "/images/dorm/dorm_4.jpg",
      "/images/dorm/dorm_5.jpg",
      "/images/dorm/dorm_6.jpeg",
      "/images/dorm/dorm_8.jpg"
    ]
  }
];

export const ALTITUDE_AMENITIES: AmenityItem[] = [
  {
    id: "heated-mattress",
    title: "Electric Blankets & Heated Mattresses",
    subtitle: "Absolute warmth at 3000m",
    description: "Sub-zero mountain nights stay thoroughly cozy with multi-setting heated mattresses in private rooms and individual electric blankets on all 8 dorm beds.",
    iconName: "Flame",
    isHeroFeature: true
  },
  {
    id: "hot-water",
    title: "24/7 Geyser Hot Water Showers",
    subtitle: "Piping hot showers whenever you arrive",
    description: "Attached baths in private rooms and 2 dedicated shared washrooms for the dorm, powered by instant heavy-duty geysers so you can thaw out after high mountain passes.",
    iconName: "ShowerHead",
    isHeroFeature: true
  },
  {
    id: "cleanliness",
    title: "Cleanliness As Top Priority",
    subtitle: "Spotless & deeply sanitized",
    description: "Freshly laundered linens, immaculate rooms, and sparkling clean private and shared washrooms maintained meticulously every day.",
    iconName: "ShieldCheck",
    isHeroFeature: true
  },
  {
    id: "dragon-heritage",
    title: "Dragon Cultural Homestay Experience",
    subtitle: "Authentic art & warm host hospitality",
    description: "Every corner honours centuries of Lahauli & Buddhist heritage: hand-painted dragon motifs, auspicious Buddhist symbols, and genuine family-run homestay warmth.",
    iconName: "Sparkles",
    isHeroFeature: true
  },
  {
    id: "glacier-views",
    title: "Top-Floor Sanakdeik Peak Panoramas",
    subtitle: "Front-row seats to Sanakdeik Jot Peak",
    description: "Wake up to crystalline views of Sanakdeik Jot Peak and Kardang Monastery ridge right from your room window and our expansive open-air chill terrace.",
    iconName: "MountainSnow",
    isHeroFeature: false
  },
  {
    id: "restaurant",
    title: "In-House Traditional Kitchen",
    subtitle: "Tibetan specialties & Indian comforts",
    description: "Savor steaming momos, hot thukpa, Lahauli siddu dipped in local ghee, authentic butter tea, alongside fresh rotis, aromatic dal, and hot masala chai.",
    iconName: "Utensils",
    isHeroFeature: false
  },
  {
    id: "rooftop-terrace",
    title: "Rooftop Chill Terrace",
    subtitle: "Sanakdeik Peak panoramas & celestial stargazing",
    description: "An open terrace where travelers gather for golden-hour chai and breathtaking Himalayan stargazing.",
    iconName: "Sun",
    isHeroFeature: false
  },
  {
    id: "wifi",
    title: "High-Speed Fiber Wi-Fi",
    subtitle: "Stay connected in Keylong Village",
    description: "Fast broadband connection to check road conditions, coordinate travel routes, or keep in touch with loved ones.",
    iconName: "Wifi",
    isHeroFeature: false
  }
];

// Unique, non-duplicated Gallery photos
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "g-w1",
    title: "Dragon Room 1 Attached Washroom",
    category: "dragon-room-1",
    categoryLabel: "Dragon Room 1 Washroom",
    src: "/images/room1/dragon_washroom_1.jpg",
    caption: "Spotless private attached washroom equipped with 24/7 instant hot geyser shower."
  },
  {
    id: "g-w2",
    title: "Dragon Room 2 Attached Washroom",
    category: "dragon-room-2",
    categoryLabel: "Dragon Room 2 Washroom",
    src: "/images/room2/dragon_washroom_2.jpg",
    caption: "Clean, hygienic attached bathroom with 24/7 hot water supply."
  },
  {
    id: "g-w3",
    title: "Hostel Dorm Shared Washroom 1",
    category: "hostel-dorm",
    categoryLabel: "Hostel Shared Washroom",
    src: "/images/dorm/hostel_washroom_1.jpg",
    caption: "Meticulously cleaned shared washroom facility with instant hot geyser for dorm guests."
  },
  {
    id: "g-w4",
    title: "Hostel Dorm Shared Washroom 2",
    category: "hostel-dorm",
    categoryLabel: "Hostel Shared Washroom",
    src: "/images/dorm/hostel_washroom_2.jpg",
    caption: "2nd dedicated shared washroom maintaining daily hygiene standards."
  },
  {
    id: "g-food-1",
    title: "Fresh Himalayan Food Platter",
    category: "dining",
    categoryLabel: "Kitchen & Dining",
    src: "/images/gallery/food_gallery_1.jpg",
    caption: "Delicious home-cooked traditional meals served fresh."
  },
  {
    id: "g-food-2",
    title: "Traditional Kitchen & Dining Spread",
    category: "dining",
    categoryLabel: "Kitchen & Dining",
    src: "/images/gallery/food_gallery_2.jpg",
    caption: "Steaming hot local Lahauli delicacies prepared with love."
  },
  {
    id: "g-food-3",
    title: "Homestay Dining Special",
    category: "dining",
    categoryLabel: "Kitchen & Dining",
    src: "/images/gallery/food_gallery_3.jpg",
    caption: "Authentic comfort meals for high-altitude travelers."
  },
  {
    id: "g-loc-tandi",
    title: "Tandi Confluence Point",
    category: "keylong",
    categoryLabel: "Nearby Attractions",
    src: "/images/gallery/tandi.jpg",
    caption: "Sacred confluence of Chandra & Bhaga rivers at Tandi, just minutes from Keylong."
  },
  {
    id: "g-loc-jispa",
    title: "Jispa Valley Scenic Drive",
    category: "keylong",
    categoryLabel: "Nearby Attractions",
    src: "/images/gallery/jispa.jpg",
    caption: "Scenic drive towards Jispa and Deepak Tal along the Manali-Leh highway."
  },
  {
    id: "g-peak-sanakdeik",
    title: "Sanakdeik Jot Peak View",
    category: "glaciers",
    categoryLabel: "Glacier Views & Terrace",
    src: "/images/gallery/sanakdeik_peak.jpg",
    caption: "Majestic Sanakdeik Jot Peak visible from our top floor terrace and private rooms."
  },
  {
    id: "g1",
    title: "Lower Keylong Village Panorama",
    category: "keylong",
    categoryLabel: "Keylong Village",
    src: "/images/gallery/gallery_1.jpg",
    caption: "Authentic village setting at 3000m altitude."
  },
  {
    id: "g2",
    title: "Lahaul Valley Mountain Vista",
    category: "glaciers",
    categoryLabel: "Glaciers & Terrace",
    src: "/images/gallery/gallery_2.jpg",
    caption: "Expansive views of surrounding Himalayan ridges."
  },
  {
    id: "g3",
    title: "Dragon Cultural Motifs",
    category: "buddhist-art",
    categoryLabel: "Dragon Art & Culture",
    src: "/images/gallery/gallery_3.jpg",
    caption: "Traditional Tibetan dragon artwork and hand-painted wall art."
  },
  {
    id: "g4",
    title: "Homestay Terrace View",
    category: "glaciers",
    categoryLabel: "Glaciers & Terrace",
    src: "/images/gallery/gallery_7.jpeg",
    caption: "Open air chill zone facing Sanakdeik Jot Peak."
  },
  {
    id: "g5",
    title: "Buddhist Ashtamangala Symbols",
    category: "buddhist-art",
    categoryLabel: "Dragon Art & Culture",
    src: "/images/gallery/gallery_10.jpg",
    caption: "Auspicious symbols celebrating wisdom and peace."
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "m1",
    name: "Steamed Himalayan Momos",
    localName: "Kothe / Mok-Mok",
    category: "tibetan",
    description: "Plump dumplings stuffed with spiced cottage cheese, cabbage, mountain herbs, served with our signature fire-roasted red chili dip and clear broth.",
    isSpecialty: true,
    veg: true,
    price: "₹180",
    tags: ["Homestay Special", "Chef's Recommendation"],
    image: "/images/gallery/food_gallery_1.jpg"
  },
  {
    id: "m2",
    name: "Tibetan Thukpa Bowl",
    localName: "Gyathuk",
    category: "tibetan",
    description: "Handmade noodles in a soul-warming rich garlic-ginger broth loaded with crunchy carrots, greens, scallions, and roasted cumin oil.",
    isSpecialty: true,
    veg: true,
    price: "₹190",
    tags: ["Hot Soup", "Altitude Healer"],
    image: "/images/gallery/food_gallery_2.jpg"
  },
  {
    id: "m3",
    name: "Traditional Lahauli Siddu",
    localName: "Desi Siddu",
    category: "tibetan",
    description: "Ancient fermented wheat bread stuffed with roasted poppy seeds, walnuts, and dried mountain spices. Served piping hot with a bowl of pure desi ghee.",
    isSpecialty: true,
    veg: true,
    price: "₹220",
    tags: ["Local Heritage Dish", "Nutrient Dense"],
    image: "/images/gallery/food_gallery_3.jpg"
  },
  {
    id: "m4",
    name: "Tingmo with Veg Shapta Gravy",
    localName: "Steamed Lotus Buns",
    category: "tibetan",
    description: "Fluffy, cloud-like layered steamed Tibetan buns served with a rich aromatic tomato, capsicum, and mushroom stir-fry sauce.",
    isSpecialty: false,
    veg: true,
    price: "₹210",
    tags: ["Comfort Food"],
    image: "/images/gallery/food_gallery_1.jpg"
  },
  {
    id: "m5",
    name: "Dal Makhani with Butter Naan/Roti",
    category: "indian",
    description: "Slow-simmered black lentils cooked overnight with cream, butter, and mild Indian spices. The quintessential comfort after a long mountain drive.",
    isSpecialty: false,
    veg: true,
    price: "₹240",
    tags: ["Popular Dinner", "Protein Rich"],
    image: "/images/gallery/food_gallery_2.jpg"
  },
  {
    id: "m6",
    name: "Kadhai Paneer & Jeera Rice",
    category: "indian",
    description: "Fresh cottage cheese cubes tossed with bell peppers, crushed coriander seeds, and a spicy onion-tomato masala. Served with steaming cumin basmati rice.",
    isSpecialty: false,
    veg: true,
    price: "₹260",
    tags: ["Wholesome Meal"],
    image: "/images/gallery/food_gallery_3.jpg"
  },
  {
    id: "m7",
    name: "Himalayan Aloo Paratha Breakfast",
    category: "indian",
    description: "Golden griddled whole wheat flatbreads stuffed with spiced Lahaul valley potatoes. Accompanied by fresh mint chutney, curd, and homemade pickle.",
    isSpecialty: true,
    veg: true,
    price: "₹140",
    tags: ["Morning Fuel", "Traveler Favorite"],
    image: "/images/gallery/food_gallery_1.jpg"
  },
  {
    id: "m8",
    name: "Authentic Tibetan Butter Tea (Po Cha)",
    localName: "Ja-Srub-Ma",
    category: "beverages",
    description: "Traditional brick tea churned with butter and rock salt. An ancient high-altitude recipe to prevent lips from chapping and sustain body heat.",
    isSpecialty: true,
    veg: true,
    price: "₹80",
    tags: ["Traditional Tibetan", "Altitude Energy"],
    image: "/images/gallery/gallery_3.jpg"
  },
  {
    id: "m9",
    name: "Saffron Kashmiri & Spiti Kahwa",
    category: "beverages",
    description: "Aromatic green tea infused with real saffron strands, crushed green cardamom, cinnamon bark, and roasted almond slivers.",
    isSpecialty: true,
    veg: true,
    price: "₹100",
    tags: ["Herbal Remedy", "Immunity Boost"],
    image: "/images/gallery/gallery_2.jpg"
  }
];

export const TRAVEL_TIPS = [
  {
    title: "Altitude Acclimatization at 3000m",
    text: "Keylong sits at 3000 meters (9,842 ft). We advise resting for the first few hours, drinking plenty of water, and having our hot butter tea or ginger-lemon-honey infusion to adapt seamlessly before heading higher to Sarchu or Leh."
  },
  {
    title: "Manali to Keylong Route (Atal Tunnel)",
    text: "Thanks to the Atal Tunnel at Rohtang, Keylong is now a breathtaking 2.5 to 3-hour scenic drive (72 km) from Manali all year round, open across all seasons except extreme snow clearances."
  },
  {
    title: "Gateway to Leh-Ladakh, Tandi & Jispa",
    text: "Keylong is the historic district headquarters of Lahaul and the premier transit hub near Tandi confluence, Jispa valley, Darcha, Shinku La Pass, or Baralacha La."
  },
  {
    title: "Monasteries & Sanakdeik Peak Views",
    text: "Visit the 900-year-old Kardang Monastery directly across the valley, Shashur Gompa hidden in blue pines, and enjoy the famous Sanakdeik Jot Peak view right from our top floor terrace."
  }
];
