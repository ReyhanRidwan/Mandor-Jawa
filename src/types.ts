export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string; // Lucide icon name
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: 'pembangunan' | 'renovasi' | 'pekerjaan_spesifik' | 'interior';
  categoryLabel: string;
  image: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  content: string;
  rating: number;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface SurveyState {
  projectType: string;
  buildingArea: string;
  location: string;
  budget: string;
  targetStart: string;
  clientName: string;
  clientPhone: string;
}

export interface RABInput {
  projectType: 'bangun_baru' | 'renovasi';
  buildingArea: number;
  floorsCount: number;
  materialQuality: 'standar' | 'menengah' | 'premium';
}

export interface RABResult {
  minCost: number;
  maxCost: number;
  estimatedDurationMonths: number;
  itemizedEstimates: Array<{
    category: string;
    description: string;
    percentage: number;
    amount: number;
  }>;
}
