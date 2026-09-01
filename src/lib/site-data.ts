import massage from "@/assets/svc-massage.jpg";
import facial from "@/assets/svc-facial.jpg";
import hair from "@/assets/svc-hair.jpg";
import beauty from "@/assets/svc-beauty.jpg";
import body from "@/assets/svc-body.jpg";
import intro from "@/assets/intro.jpg";
import roomHair from "@/assets/room-hair.jpg";
import roomLounge from "@/assets/room-lounge.jpg";
import roomPool from "@/assets/room-pool.jpg";
import gal1 from "@/assets/gal-1.jpg";
import gal2 from "@/assets/gal-2.jpg";
import prodOil from "@/assets/prod-oil.jpg";
import prodSerum from "@/assets/prod-serum.jpg";
import prodCandle from "@/assets/prod-candle.jpg";
import prodSalts from "@/assets/prod-salts.jpg";
import buddha from "@/assets/GOD BUDDHA1.jpg";
import salonSpaVideo from "@/assets/Touring_luxury_salon_and_spa_202608261309.mp4";

export const IMAGES = {
  massage,
  facial,
  hair,
  beauty,
  body,
  intro,
  roomHair,
  roomLounge,
  roomPool,
  gal1,
  gal2,
  prodOil,
  prodSerum,
  prodCandle,
  prodSalts,
  buddha,
};

export const VIDEOS = {
  salonSpaTour: salonSpaVideo,
};

export type Service = {
  slug: string;
  name: string;
  category: "Massage" | "Facials" | "Hair" | "Beauty" | "Body";
  description: string;
  duration: string;
  price: number;
  benefits: string[];
  image: string;
};

export const services: Service[] = [
  {
    slug: "signature-massage",
    name: "Signature Massage",
    category: "Massage",
    description:
      "Our house ritual — warm oils, long flowing strokes and a bespoke pressure map read by your therapist.",
    duration: "90 min",
    price: 210,
    benefits: ["Deep relaxation", "Improved circulation", "Muscle release"],
    image: massage,
  },
  {
    slug: "deep-tissue",
    name: "Deep Tissue Massage",
    category: "Massage",
    description:
      "Slow, deliberate pressure through the deeper layers of muscle and connective tissue.",
    duration: "75 min",
    price: 190,
    benefits: ["Chronic tension relief", "Posture support", "Recovery"],
    image: massage,
  },
  {
    slug: "swedish-massage",
    name: "Swedish Massage",
    category: "Massage",
    description: "The classic full-body treatment, refined with warm compresses and quiet.",
    duration: "60 min",
    price: 150,
    benefits: ["Stress relief", "Gentle release", "Better sleep"],
    image: massage,
  },
  {
    slug: "hot-stone",
    name: "Hot Stone Ritual",
    category: "Massage",
    description: "Heated basalt stones melt into the back and shoulders in a slow, silent rhythm.",
    duration: "80 min",
    price: 220,
    benefits: ["Deep warmth", "Tension melt", "Grounding"],
    image: massage,
  },
  {
    slug: "aromatherapy",
    name: "Aromatherapy Journey",
    category: "Massage",
    description:
      "A blend chosen at the oil bar, layered through breathwork and a full-body treatment.",
    duration: "70 min",
    price: 185,
    benefits: ["Nervous system reset", "Mood balance", "Clarity"],
    image: body,
  },
  {
    slug: "couple-massage",
    name: "Couple Massage",
    category: "Massage",
    description: "A private suite, two therapists, champagne service and complete stillness.",
    duration: "90 min",
    price: 420,
    benefits: ["Shared ritual", "Private suite", "Champagne service"],
    image: roomLounge,
  },
  {
    slug: "signature-facial",
    name: "Signature Facial",
    category: "Facials",
    description: "A diagnostic facial built around your skin on the day, not a fixed protocol.",
    duration: "60 min",
    price: 195,
    benefits: ["Deep cleanse", "Lift", "Luminosity"],
    image: facial,
  },
  {
    slug: "hydrating-facial",
    name: "Hydrating Facial",
    category: "Facials",
    description: "Layered serums, cool globes and a hyaluronic veil for thirsty skin.",
    duration: "55 min",
    price: 175,
    benefits: ["Plumped skin", "Barrier repair", "Calm"],
    image: facial,
  },
  {
    slug: "anti-aging-facial",
    name: "Anti-Aging Facial",
    category: "Facials",
    description: "Peptides, micro-current and lymphatic sculpting for firmness and tone.",
    duration: "75 min",
    price: 260,
    benefits: ["Firmness", "Contour", "Fine line softening"],
    image: facial,
  },
  {
    slug: "glow-treatment",
    name: "Glow Treatment",
    category: "Facials",
    description: "A gentle resurfacing ritual for events, weddings and evenings that matter.",
    duration: "45 min",
    price: 165,
    benefits: ["Instant radiance", "Even tone", "Zero downtime"],
    image: facial,
  },
  {
    slug: "haircut",
    name: "Precision Haircut",
    category: "Hair",
    description: "A consultation-led cut shaped to your hairline, texture and daily routine.",
    duration: "60 min",
    price: 120,
    benefits: ["Tailored shape", "Easy upkeep", "Scalp ritual"],
    image: hair,
  },
  {
    slug: "hair-styling",
    name: "Hair Styling",
    category: "Hair",
    description: "Editorial blowouts, soft waves and evening sets built to last the night.",
    duration: "45 min",
    price: 95,
    benefits: ["Volume", "Shine", "Long hold"],
    image: hair,
  },
  {
    slug: "hair-spa",
    name: "Hair Spa",
    category: "Hair",
    description: "A warm oil scalp ritual with steam therapy and a deep restorative mask.",
    duration: "60 min",
    price: 140,
    benefits: ["Scalp health", "Repair", "Softness"],
    image: hair,
  },
  {
    slug: "hair-coloring",
    name: "Hair Colouring",
    category: "Hair",
    description: "Tonal balayage and gloss work developed in natural light.",
    duration: "150 min",
    price: 320,
    benefits: ["Dimension", "Custom tone", "Gloss finish"],
    image: hair,
  },
  {
    slug: "keratin",
    name: "Keratin Treatment",
    category: "Hair",
    description: "Smoothing therapy that keeps movement while removing frizz.",
    duration: "120 min",
    price: 290,
    benefits: ["Frizz control", "Shine", "Faster styling"],
    image: hair,
  },
  {
    slug: "manicure",
    name: "Luxury Manicure",
    category: "Beauty",
    description: "Hand ritual, cuticle work and a flawless finish in the shade of your choosing.",
    duration: "45 min",
    price: 85,
    benefits: ["Hand ritual", "Long wear", "Nail health"],
    image: beauty,
  },
  {
    slug: "pedicure",
    name: "Luxury Pedicure",
    category: "Beauty",
    description: "A warm soak, exfoliation and massage finished with precision polish.",
    duration: "60 min",
    price: 105,
    benefits: ["Softening", "Relief", "Perfect finish"],
    image: beauty,
  },
  {
    slug: "bridal",
    name: "Bridal Beauty",
    category: "Beauty",
    description: "A full-day atelier service — trial, hair, makeup and touch-up team.",
    duration: "Full day",
    price: 950,
    benefits: ["Trial included", "On-site team", "Photo-ready finish"],
    image: beauty,
  },
  {
    slug: "eyebrow-styling",
    name: "Eyebrow Styling",
    category: "Beauty",
    description: "Mapping, shaping and tinting to frame the face softly.",
    duration: "30 min",
    price: 60,
    benefits: ["Defined shape", "Symmetry", "Natural finish"],
    image: beauty,
  },
  {
    slug: "body-scrub",
    name: "Body Scrub",
    category: "Body",
    description: "Mineral salt and cold-pressed oils polished into the skin, then rinsed in steam.",
    duration: "45 min",
    price: 130,
    benefits: ["Renewed skin", "Circulation", "Softness"],
    image: body,
  },
  {
    slug: "body-wrap",
    name: "Body Wrap",
    category: "Body",
    description: "A warm clay cocoon with a scalp massage while the minerals do their work.",
    duration: "60 min",
    price: 160,
    benefits: ["Detox", "Firming", "Hydration"],
    image: body,
  },
  {
    slug: "detox-treatment",
    name: "Detox Treatment",
    category: "Body",
    description: "Dry brushing, lymphatic drainage and an infrared finish.",
    duration: "75 min",
    price: 200,
    benefits: ["Lightness", "Drainage", "Energy"],
    image: body,
  },
];

export const serviceCategories = ["All", "Massage", "Facials", "Hair", "Beauty", "Body"] as const;

export const homeServices = [
  "signature-massage",
  "deep-tissue",
  "aromatherapy",
  "signature-facial",
  "hair-styling",
  "hair-spa",
  "manicure",
  "bridal",
  "body-scrub",
].map((slug) => services.find((s) => s.slug === slug)!);

export const specialists = [
  { id: "elena", name: "Elena Marchetti", role: "Master Therapist", years: 14 },
  { id: "yuki", name: "Yuki Tanaka", role: "Lead Facialist", years: 11 },
  { id: "amara", name: "Amara Okafor", role: "Creative Hair Director", years: 16 },
  { id: "sofia", name: "Sofia Bergman", role: "Bridal & Beauty Lead", years: 9 },
  { id: "any", name: "No Preference", role: "First available expert", years: 0 },
];

export const memberships = [
  {
    name: "Essential",
    monthly: 89,
    annual: 890,
    tagline: "For the monthly ritual.",
    perks: ["Priority booking", "10% service discount", "Complimentary welcome ritual"],
    full: [
      "Priority booking window",
      "10% off all services",
      "Complimentary welcome ritual",
      "Member pricing on boutique products",
    ],
  },
  {
    name: "Signature",
    monthly: 169,
    annual: 1690,
    tagline: "The considered choice.",
    featured: true,
    perks: [
      "Priority booking",
      "15% service discount",
      "Monthly complimentary add-on",
      "Exclusive member events",
    ],
    full: [
      "Priority booking window",
      "15% off all services",
      "One complimentary add-on each month",
      "Exclusive member events",
      "Seasonal product gifting",
      "Guest passes twice yearly",
    ],
  },
  {
    name: "Luméa Elite",
    monthly: 329,
    annual: 3290,
    tagline: "Everything, unhurried.",
    perks: [
      "Priority booking",
      "20% service discount",
      "Complimentary monthly treatment",
      "Personal beauty consultant",
      "VIP lounge access",
    ],
    full: [
      "Concierge priority booking",
      "20% off all services",
      "One complimentary treatment monthly",
      "Personal beauty consultant",
      "Private VIP lounge access",
      "Unlimited guest passes",
      "Complimentary bridal trial",
    ],
  },
];

export const testimonials = [
  {
    quote: "The most peaceful beauty experience I've ever had.",
    name: "Isabella Reyes",
    treatment: "Signature Massage",
    rating: 5,
  },
  {
    quote: "I left looking like myself, only rested. That is rarer than it sounds.",
    name: "Charlotte Nyman",
    treatment: "Anti-Aging Facial",
    rating: 5,
  },
  {
    quote: "From the tea on arrival to the last touch, everything was considered.",
    name: "Priya Raman",
    treatment: "Hot Stone Ritual",
    rating: 5,
  },
  {
    quote: "My colour has never looked this alive. Three months later it still does.",
    name: "Noor El-Amin",
    treatment: "Hair Colouring",
    rating: 5,
  },
];

export type Product = {
  slug: string;
  name: string;
  category: "Skincare" | "Haircare" | "Body Care" | "Essential Oils" | "Candles" | "Wellness";
  price: number;
  rating: number;
  image: string;
  description: string;
  ingredients: string;
};

export const products: Product[] = [
  {
    slug: "amber-ritual-oil",
    name: "Amber Ritual Oil",
    category: "Essential Oils",
    price: 78,
    rating: 4.9,
    image: prodOil,
    description: "A warming blend of amber, sandalwood and neroli for the evening wind-down.",
    ingredients: "Sweet almond oil, amber absolute, sandalwood, neroli, vitamin E.",
  },
  {
    slug: "luminous-serum",
    name: "Luminous Facial Serum",
    category: "Skincare",
    price: 132,
    rating: 4.8,
    image: prodSerum,
    description: "A weightless serum with encapsulated vitamin C and hyaluronic layers.",
    ingredients: "Aqua, hyaluronic acid, ascorbyl glucoside, squalane, niacinamide.",
  },
  {
    slug: "noir-candle",
    name: "Noir Suite Candle",
    category: "Candles",
    price: 96,
    rating: 4.9,
    image: prodCandle,
    description: "The scent of our treatment suites — smoked fig, cedar and warm wax.",
    ingredients: "Coconut-soy wax, cotton wick, fine fragrance oils.",
  },
  {
    slug: "mineral-bath-salts",
    name: "Mineral Bath Salts",
    category: "Body Care",
    price: 54,
    rating: 4.7,
    image: prodSalts,
    description: "Dead sea minerals with rose and chamomile for a long, slow soak.",
    ingredients: "Maris sal, magnesium, rosa damascena, chamomile flower.",
  },
  {
    slug: "restorative-hair-elixir",
    name: "Restorative Hair Elixir",
    category: "Haircare",
    price: 88,
    rating: 4.8,
    image: prodOil,
    description: "A featherlight elixir for lengths and ends, used in our hair spa ritual.",
    ingredients: "Camellia oil, argan, baobab, silk proteins.",
  },
  {
    slug: "polishing-body-scrub",
    name: "Polishing Body Scrub",
    category: "Body Care",
    price: 68,
    rating: 4.6,
    image: prodSalts,
    description: "Fine sugar and salt suspended in cold-pressed oils.",
    ingredients: "Sucrose, maris sal, jojoba, sweet orange peel.",
  },
  {
    slug: "calm-diffuser-blend",
    name: "Calm Diffuser Blend",
    category: "Wellness",
    price: 62,
    rating: 4.7,
    image: prodOil,
    description: "Lavender, vetiver and bergamot — the blend from our relaxation lounge.",
    ingredients: "Lavandula, vetiveria, citrus bergamia.",
  },
  {
    slug: "renewal-night-cream",
    name: "Renewal Night Cream",
    category: "Skincare",
    price: 148,
    rating: 4.9,
    image: prodSerum,
    description: "A rich overnight cream with peptides and ceramide complex.",
    ingredients: "Shea butter, ceramide NP, peptide complex, squalane.",
  },
];

export const productCategories = [
  "All",
  "Skincare",
  "Haircare",
  "Body Care",
  "Essential Oils",
  "Candles",
  "Wellness",
] as const;

export const gallery = [
  { src: gal1, alt: "Orchid, candles and folded towels", tall: true },
  { src: roomHair, alt: "Hair studio with gilded mirrors" },
  { src: intro, alt: "Relaxation lounge in ivory and gold", tall: true },
  { src: gal2, alt: "Product boutique shelving" },
  { src: roomPool, alt: "Indoor spa pool" },
  { src: facial, alt: "Facial treatment in progress", tall: true },
  { src: body, alt: "Body treatment preparation" },
  { src: roomLounge, alt: "VIP lounge in emerald velvet" },
];

export const rooms = [
  {
    id: "reception",
    name: "Reception",
    image: intro,
    note: "Tea service, scent selection and a slow start.",
  },
  {
    id: "hair-studio",
    name: "Hair Studio",
    image: roomHair,
    note: "Nine gilded stations under natural and warm light.",
  },
  {
    id: "facial-rooms",
    name: "Facial Rooms",
    image: facial,
    note: "Four private cabins with diagnostic lighting.",
  },
  {
    id: "massage-rooms",
    name: "Massage Rooms",
    image: massage,
    note: "Sound-isolated suites with heated tables.",
  },
  {
    id: "vip-lounge",
    name: "VIP Lounge",
    image: roomLounge,
    note: "Members only. Emerald velvet, candlelight, silence.",
  },
  {
    id: "relaxation",
    name: "Relaxation Pool",
    image: roomPool,
    note: "Thermal water, gold ceiling, no clocks.",
  },
  {
    id: "boutique",
    name: "Product Boutique",
    image: gal2,
    note: "The full apothecary, blended in-house.",
  },
];

export const experienceStages = [
  {
    number: "01",
    title: "Arrive",
    copy: "You are met by name. Coats taken, tea poured, the city left at the door.",
    image: intro,
  },
  {
    number: "02",
    title: "Unwind",
    copy: "A scent is chosen at the oil bar. Breath slows. The lounge does the rest.",
    image: roomLounge,
  },
  {
    number: "03",
    title: "Indulge",
    copy: "Your therapist reads the body and adapts. Nothing here is a fixed protocol.",
    image: massage,
  },
  {
    number: "04",
    title: "Renew",
    copy: "Warm water, quiet light, and time you do not have to account for.",
    image: roomPool,
  },
];

export const stats = [
  { value: 10, suffix: "+", label: "Years of Excellence" },
  { value: 25, suffix: "K+", label: "Happy Clients" },
  { value: 40, suffix: "+", label: "Premium Treatments" },
  { value: 15, suffix: "+", label: "Beauty Experts" },
];

export const CONTACT = {
  name: "LUMÉA Luxury Salon & Spa",
  address: "42 Marlowe Crescent, Chelsea, London SW3 4TQ",
  phone: "+44 20 7946 0912",
  whatsapp: "442079460912",
  email: "concierge@lumea-spa.com",
  hours: [
    { day: "Monday — Thursday", time: "09:00 — 21:00" },
    { day: "Friday — Saturday", time: "09:00 — 22:00" },
    { day: "Sunday", time: "10:00 — 19:00" },
  ],
};
