export type Discipline = 'road' | 'mtb' | 'gravel' | 'multi';
export type Category = 'bike' | 'wheels' | 'components' | 'apparel' | 'accessories';
export type Level = 'beginner' | 'intermediate' | 'expert';
export type Season = 'all' | 'spring-summer' | 'fall-winter';

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: Category;
  discipline: Discipline;
  level: Level;
  season: Season;
  price: number;
  originalPrice?: number;
  stock: number;
  description: string;
  specs: Record<string, string>;
  sizes?: string[];
  image: string;
  tags: string[];
  isNew?: boolean;
}
