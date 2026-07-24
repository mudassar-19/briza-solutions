export type Industry = {
  slug: string;
  name: string;
  icon: string;
  teaser: string;
};

export const industries: Industry[] = [
  {
    slug: "real-estate",
    name: "Real Estate",
    icon: "Building2",
    teaser:
      "Automated lead capture, listing follow-ups, and virtual assistants that keep buyers and sellers engaged around the clock.",
  },
  {
    slug: "medical",
    name: "Medical",
    icon: "Stethoscope",
    teaser:
      "Scheduling automation, patient follow-up, and chatbot intake that reduce no-shows and free up front-desk time.",
  },
  {
    slug: "cleaning-janitorial",
    name: "Cleaning & Janitorial Services",
    icon: "SprayCan",
    teaser:
      "Booking automation, dispatch follow-ups, and review systems built for cleaning and janitorial teams on the move.",
  },
  {
    slug: "consultants",
    name: "Consultants",
    icon: "Briefcase",
    teaser:
      "Lead qualification, proposal follow-up, and content systems that position consultants as the obvious choice.",
  },
  {
    slug: "food-drinks",
    name: "Food & Drinks",
    icon: "UtensilsCrossed",
    teaser:
      "Reservation reminders, review generation, and scroll-stopping content for restaurants, cafés, and beverage brands.",
  },
  {
    slug: "hotels-hospitality",
    name: "Hotels & Hospitality",
    icon: "BedDouble",
    teaser:
      "Guest messaging, booking follow-ups, and review automation that elevate the stay before, during, and after.",
  },
  {
    slug: "travel",
    name: "Travel",
    icon: "Plane",
    teaser:
      "Itinerary follow-ups, booking reminders, and always-on chat support for travel agencies and tour operators.",
  },
  {
    slug: "high-security-websites",
    name: "High Security Websites",
    icon: "ShieldCheck",
    teaser:
      "Hardened, high-trust web builds with automation and monitoring for businesses that can't afford downtime or breaches.",
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}
