import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndustryPageTemplate from "@/components/IndustryPageTemplate";
import { getIndustryBySlug, industries } from "@/lib/industries";
import { getIndustryDetail } from "@/lib/industryDetails";

type IndustryPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export function generateMetadata({ params }: IndustryPageProps): Metadata {
  const industry = getIndustryBySlug(params.slug);

  if (!industry) {
    return { title: "Briza Solutions" };
  }

  return {
    title: `${industry.name} Solutions | Briza Solutions`,
    description: industry.teaser,
  };
}

export default function IndustryPage({ params }: IndustryPageProps) {
  const industry = getIndustryBySlug(params.slug);
  const detail = getIndustryDetail(params.slug);

  if (!industry || !detail) {
    notFound();
  }

  return <IndustryPageTemplate industry={industry} detail={detail} />;
}
