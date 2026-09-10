export const BRAND = {
  name: "AR HOMES",
  shortName: "AR",
  tagline: "Building Spaces That Feel Like Home",
  subTagline: "Designed With Quality That Lasts",
  philosophy: "More Than Four Walls",
  philosophyText: "The celebrations, the quiet evenings, the moments that bring everyone together — life's best moments happen at home. At AR Homes, this is where moments like these find their place. Thoughtfully planned, beautifully finished and built to a standard that makes every day feel a little more special.",
  phone: "+91 88755 66970",
  phoneDisplay: "+91 88755 66970",
  whatsapp: "916377300724",
  whatsappDisplay: "+91 63773 00724",
  email: "arhomesjaipur@gmail.com",
  salesEmail: "arhomesjaipur@gmail.com",
  corporateAddress: "Shop No. 1&2, opposed Chaska restaurant & BAR, Saket Vihar, Hatoj - Kalwar - Jaipur Rd, Jaipur, Rajasthan 302012",
  address: "Shop No. 1&2, opposed Chaska restaurant & BAR, Saket Vihar, Hatoj - Kalwar - Jaipur Rd, Jaipur, Rajasthan 302012",
  facebook: "https://www.facebook.com/arhomesjaipur/reels/",
  instagram: "https://www.instagram.com/arhomesindia/?hl=en",
  youtube: "https://www.youtube.com/@ARHOMES",
  reraDisclaimer: "The information provided on this website is for general informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any property. All artist impressions, specifications, floor plans, and perspectives are artistic representations designed to convey design intent.",
  reraCert: "RAJ/RERA/2026/G-8812"
};

export const BRAND_INFO = BRAND;

export const getWhatsAppUrl = (phoneOrNumber, message = "Hello AR Homes, I am interested in your luxury properties.") => {
  const raw = String(phoneOrNumber || BRAND.whatsapp || '916377300724')
    .replace(/\D/g, '')
    .replace(/^0+/, '');
  const cleanNumber = raw.length === 10 ? `91${raw}` : (raw.startsWith('91') ? raw : `91${raw}`);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}${encoded ? `?text=${encoded}` : ''}`;
};

export const RESIDENCES = [
  {
    id: "c2-civil-lines",
    title: "C2 at Civil Lines",
    location: "Civil Lines, Jaipur, Rajasthan",
    builtForm: "S + 4",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    features: [
      { label: "5 BHK INDEPENDENT FLOORS", icon: "home" },
      { label: "LARGE OPEN SPACES", icon: "maximize" },
      { label: "VRV/VRF AIR CONDITIONING", icon: "wind" },
      { label: "THREE SIDE OPEN", icon: "sun" }
    ],
    overview: "C2 at Civil Lines represents a benchmark in low-density boutique floor living in Jaipur. With three sides open to sunlit avenues and verdant parklands, each independent floor delivers uncompromised light, natural cross-ventilation, and private basement spaces.",
    price: "₹3.85 Cr onwards",
    priceUsd: "$465,000 onwards",
    rera: "RAJ/P/2026/745",
    status: "Ready for Fit-outs"
  },
  {
    id: "c5-vaishali-nagar",
    title: "C5 at Vaishali Nagar",
    location: "Vaishali Nagar, Jaipur, Rajasthan",
    builtForm: "S + 4",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
    features: [
      { label: "4 & 5 BHK LUXURY FLOORS", icon: "home" },
      { label: "EXPANSIVE VERANDAS", icon: "maximize" },
      { label: "PRIVATE ELEVATOR ACCESS", icon: "wind" },
      { label: "100% POWER BACKUP", icon: "sun" }
    ],
    overview: "Exquisitely engineered with imported Italian statuario marble in living suites, acoustic double-glazed windows, and bespoke walk-in wardrobes, C5 is conceived for families prioritizing timeless elegance.",
    price: "₹4.10 Cr onwards",
    priceUsd: "$495,000 onwards",
    rera: "RAJ/P/2026/746",
    status: "Under Construction"
  },
  {
    id: "e11-c-scheme",
    title: "E11 at C-Scheme",
    location: "C-Scheme, Jaipur, Rajasthan",
    builtForm: "S + 4",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    features: [
      { label: "5 BHK SIGNATURE HOMES", icon: "home" },
      { label: "DOUBLE HEIGHT FOYER", icon: "maximize" },
      { label: "SMART AUTOMATION", icon: "wind" },
      { label: "2-CAR COVERED PARKING", icon: "sun" }
    ],
    overview: "Positioned in Jaipur's most coveted diplomatic neighborhood, E11 combines architectural symmetry with bespoke timber millwork and terrace entertainment pavilions.",
    price: "₹4.35 Cr onwards",
    priceUsd: "$525,000 onwards",
    rera: "RAJ/P/2026/748",
    status: "New Launch"
  },
  {
    id: "ea04-jagatpura",
    title: "EA 04 at Jagatpura",
    location: "Jagatpura, Jaipur, Rajasthan",
    builtForm: "S + 4",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85",
    features: [
      { label: "5 BHK BESPOKE FLOORS", icon: "home" },
      { label: "ORGANIC CURVED FACADE", icon: "maximize" },
      { label: "GERMAN MODULAR KITCHEN", icon: "wind" },
      { label: "PRIVATE TERRACE DECK", icon: "sun" }
    ],
    overview: "Featuring signature sculpted curved white balconies and horizontal wooden louvers, EA 04 at Jagatpura is our crowning statement in contemporary Rajasthani luxury living.",
    price: "₹5.25 Cr onwards",
    priceUsd: "$630,000 onwards",
    rera: "RAJ/P/2026/752",
    status: "Exclusive Release"
  },
  {
    id: "ar-homes-rise",
    title: "AR Homes Rise, Mansarovar",
    location: "Mansarovar Extension, Jaipur, Rajasthan",
    builtForm: "G + 15 High-Rise Towers",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=85",
    features: [
      { label: "2, 3 & 4 BHK APARTMENTS", icon: "home" },
      { label: "6.27 ACRES GREEN ENCLAVE", icon: "maximize" },
      { label: "40,000 SQ.FT CLUBHOUSE", icon: "wind" },
      { label: "MINUTES TO METRO", icon: "sun" }
    ],
    overview: "A majestic high-rise sanctuary spread over 6.27 acres with 80% open recreational grounds, Olympic-sized swimming facilities, and seamless highway access in Jaipur.",
    price: "₹1.15 Cr - ₹2.65 Cr",
    priceUsd: "$138,000 - $318,000",
    rera: "RAJ/P/2026/890",
    status: "Under Construction"
  },
  {
    id: "ar-homes-altura",
    title: "AR Homes Altura, Tonk Road",
    location: "Tonk Road Corridor, Jaipur, Rajasthan",
    builtForm: "G + 35 Sky Monolith",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=85",
    features: [
      { label: "3 & 4 BHK SKY MANSIONS", icon: "home" },
      { label: "35TH FLOOR INFINITY POOL", icon: "maximize" },
      { label: "PRIVATE HIGH-SPEED LIFTS", icon: "wind" },
      { label: "DOLBY ATMOS SCREENING", icon: "sun" }
    ],
    overview: "Rising 35 levels above the Jaipur skyline with an iconic silhouette, AR Homes Altura is engineered for visionary leaders who demand the ultimate elevated lifestyle.",
    price: "₹1.95 Cr - ₹4.40 Cr",
    priceUsd: "$234,000 - $528,000",
    rera: "RAJ/P/2026/990",
    status: "Fast-Track Build"
  }
];

export const FLOOR_PLAN_DATA = [
  {
    tab: "TYPICAL FLOOR",
    name: "Typical Floor",
    subtitle: "5 BHK Luxury Independent Floor",
    area: "3,250 Sq.Ft",
    image: "/assets/floorplan-3d.jpeg",
    materials: [
      { room: "LIVING & DINING", finish: "Italian Marble" },
      { room: "BEDROOMS", finish: "Engineered Wood" },
      { room: "KITCHEN", finish: "Quartz Counter" },
      { room: "TOILETS", finish: "Anti Skid Tiles" }
    ],
    details: "Designed with an expansive 30-foot open living salon, separate formal dining area, private staff quarters, and deep sunlit verandas overlooking quiet tree-lined avenues."
  },
  {
    tab: "TERRACE FLOOR",
    name: "Terrace Floor",
    subtitle: "Private Rooftop Sky Lounge & Pergola",
    area: "1,850 Sq.Ft",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    materials: [
      { room: "SKY DECK", finish: "Weatherproof Deckwood" },
      { room: "BARBECUE STATION", finish: "Polished Granite" },
      { room: "POWDER ROOM", finish: "Designer Vitrified" },
      { room: "PERGOLA", finish: "Powder-Coated Aluminum" }
    ],
    details: "An intimate rooftop entertainment sanctuary with custom planter boxes, ambient mood lighting, and panoramic sunset skyline views."
  },
  {
    tab: "STILT FLOOR",
    name: "Stilt Floor",
    subtitle: "Dedicated Multi-Car Covered Parking & Private Foyer",
    area: "2,400 Sq.Ft",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    materials: [
      { room: "PARKING BAYS", finish: "Heavy-Duty Pavers" },
      { room: "ENTRANCE FOYER", finish: "Imported Granite" },
      { room: "GUARD STATION", finish: "Acoustic Glazing" },
      { room: "EV CHARGING", finish: "Level-2 Smart Point" }
    ],
    details: "Generously dimensioned stilt floor ensuring 2-3 dedicated covered car parking spaces per residence, high-speed passenger elevator lobby, and 24/7 security booth."
  }
];

export const GALLERY_INTERIORS = [
  {
    title: "Master Living Pavilion",
    subtitle: "Double-Height Ceilings & Italian Marble",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Gourmet Kitchen",
    subtitle: "European Modular Joinery & Quartz Countertops",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Primary Suite",
    subtitle: "Engineered Hardwood & Custom Dressing Salon",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Terrace Veranda",
    subtitle: "Bespoke Timber Louvers & Cascading Planters",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Spa Ensuite",
    subtitle: "Freestanding Soaking Tub & Kohler Purist Brass",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80"
  }
];

export const INSIGHTS_ARTICLES = [
  {
    id: 1,
    date: "21 FEB",
    title: "The 2050 Home: How Technology, Green Living and Community Will Redefine Luxury Living",
    tag: "Future Living",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    date: "17 FEB",
    title: "Rent vs. Buy in Gurgaon & Kollur: When Does It Actually Make Sense to Take the Leap?",
    tag: "Real Estate Investment",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    date: "04 FEB",
    title: "The Subtle Art of Independent Floor Architecture: Why Low-Density Wins in 2026",
    tag: "Design Philosophy",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  }
];

export const PROJECTS = RESIDENCES;
