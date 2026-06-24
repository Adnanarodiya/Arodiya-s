export type ProductCategory = 'juice' | 'mocktail' | 'soda' | 'energy' | 'water';
export type ProductBadge = 'new' | 'limited' | 'bestseller' | 'classic';

export interface ProductNutrition {
  calories: number;
  sugar: string;
  size: string;
  ingredients: string[];
}

export interface Product {
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  tags: string[];
  featured: boolean;
  featuredOrder?: number;
  badge?: ProductBadge;
  flavorColor: string;
  flavorColorLight: string;
  image: string;
  gallery?: string[];
  nutrition: ProductNutrition;
  tasteNotes: string[];
}