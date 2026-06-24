import { getCollection, type CollectionEntry } from 'astro:content';
import type { ProductCategory } from '../types/product';

export type ProductEntry = CollectionEntry<'products'>;

export const categoryLabels: Record<ProductCategory, string> = {
  juice: 'Fruit Juices',
  mocktail: 'Mocktails',
  soda: 'Soft Drinks',
  energy: 'Energy Drinks',
  water: 'Waters',
};

export async function getAllProducts(): Promise<ProductEntry[]> {
  return getCollection('products');
}

export async function getFeaturedProducts(): Promise<ProductEntry[]> {
  const all = await getAllProducts();
  return all
    .filter((entry) => entry.data.featured)
    .sort((a, b) => (a.data.featuredOrder ?? 99) - (b.data.featuredOrder ?? 99));
}

export async function getRelatedProducts(
  entry: ProductEntry,
  limit = 4,
): Promise<ProductEntry[]> {
  const all = await getAllProducts();
  return all
    .filter((p) => p.data.category === entry.data.category && p.id !== entry.id)
    .slice(0, limit);
}