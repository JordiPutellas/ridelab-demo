'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ToolBadge from './ToolBadge';
import { getSegmentFromCookies, setAffinity, UserSegment } from '@/lib/personalization';
import {
  getProductsByDiscipline,
  getNewProducts,
  getAllProducts,
} from '@/lib/catalog-helpers';
import { Product, Discipline } from '@/lib/types';

const disciplineColors: Record<Discipline, string> = {
  road: 'bg-blue-900/60 text-blue-300',
  mtb: 'bg-green-900/60 text-green-300',
  gravel: 'bg-amber-900/60 text-amber-300',
  multi: 'bg-neutral-700/60 text-neutral-300',
};
const disciplineLabels: Record<Discipline, string> = {
  road: 'Carretera',
  mtb: 'MTB',
  gravel: 'Gravel',
  multi: 'Multi',
};
const affinityTitles: Record<'road' | 'mtb' | 'gravel', string> = {
  road: 'Carretera',
  mtb: 'MTB',
  gravel: 'Gravel',
};

function RecommendationCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/producto/${product.slug}`}
      onClick={() => {
        if (product.discipline !== 'multi') setAffinity(product.discipline);
      }}
      className="group relative flex flex-col bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-600 transition-colors"
    >
      <ToolBadge tool="dy" variant="corner" label="Ranked for you" />
      <div className="aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col gap-1">
        <p className="text-xs uppercase tracking-widest text-neutral-500">{product.brand}</p>
        <p className="text-neutral-100 font-medium leading-snug">{product.name}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-neutral-100 font-semibold">
            {product.price.toLocaleString('es-ES')} €
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${disciplineColors[product.discipline]}`}>
            {disciplineLabels[product.discipline]}
          </span>
        </div>
      </div>
    </Link>
  );
}

function SkeletonGrid() {
  return (
    <div>
      <div className="h-7 w-64 rounded bg-neutral-800 animate-pulse mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden animate-pulse"
          >
            <div className="aspect-[4/3] bg-neutral-800" />
            <div className="p-4 flex flex-col gap-2">
              <div className="h-3 w-20 rounded bg-neutral-800" />
              <div className="h-4 w-32 rounded bg-neutral-800" />
              <div className="h-4 w-16 rounded bg-neutral-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PersonalizedRecommendations() {
  const [segment, setSegment] = useState<UserSegment | null>(null);

  useEffect(() => {
    setSegment(getSegmentFromCookies());
  }, []);

  if (!segment) return <SkeletonGrid />;

  const { affinity } = segment;

  let products: Product[];
  if (affinity === 'road' || affinity === 'mtb' || affinity === 'gravel') {
    products = getProductsByDiscipline(affinity).slice(0, 4);
  } else {
    const news = getNewProducts();
    products = news.length >= 4 ? news.slice(0, 4) : getAllProducts().slice(0, 4);
  }

  const title =
    affinity === 'road' || affinity === 'mtb' || affinity === 'gravel'
      ? `Selección para ti · ${affinityTitles[affinity]}`
      : 'Destacados de la semana';

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <ToolBadge tool="dy" label="Affinity-based recommendations" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map(p => (
          <RecommendationCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
