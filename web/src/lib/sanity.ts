import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false, // fine for published content at build time
});

export interface CaseStudy {
  title: string;
  slug: string;
  client: string;
  industry: string;
  summary: string;
  metricValue: string;
  metricLabel: string;
  facts: { _key: string; label: string; value: string }[];
  isSample: boolean;
}

export function getCaseStudies() {
  return sanity.fetch<CaseStudy[]>(`
    *[_type == "caseStudy"] | order(order asc){
      title, "slug": slug.current, client, industry,
      summary, metricValue, metricLabel, facts, isSample
    }
  `);
}

export interface Service {
  title: string;
  description: string;
  deliverables: string[];
  extraGroupTitle?: string;
  extraGroupItems?: string[];
}

export function getServices() {
  return sanity.fetch<Service[]>(`
    *[_type == "service"] | order(order asc){
      title, description, deliverables, extraGroupTitle, extraGroupItems
    }
  `);
}
