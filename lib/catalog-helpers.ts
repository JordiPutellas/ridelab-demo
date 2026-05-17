import { catalog } from './catalog';
import { Product, Discipline, Category } from './types';

export function getAllProducts(): Product[] {
  return catalog;
}

export function getProductBySlug(slug: string): Product | undefined {
  return catalog.find(p => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return catalog.find(p => p.id === id);
}

export function getProductsByDiscipline(discipline: Discipline): Product[] {
  return catalog.filter(p => p.discipline === discipline);
}

export function getProductsByCategory(category: Category): Product[] {
  return catalog.filter(p => p.category === category);
}

export function getNewProducts(): Product[] {
  return catalog.filter(p => p.isNew);
}

export function getOnSaleProducts(): Product[] {
  return catalog.filter(p => p.originalPrice && p.originalPrice > p.price);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return catalog
    .filter(p => p.id !== product.id && p.discipline === product.discipline)
    .slice(0, limit);
}
