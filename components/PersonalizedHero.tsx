'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ToolBadge from './ToolBadge';
import { getSegmentFromCookies, UserSegment } from '@/lib/personalization';

interface HeroVariant {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  badgeText: string;
  badgeClass: string;
}

function resolveVariant(segment: UserSegment): HeroVariant {
  const { visitorType, affinity, abVariant } = segment;

  if (visitorType === 'new') {
    if (abVariant === 'A') {
      return {
        title: 'Todo para tu próxima aventura sobre ruedas',
        subtitle: 'Descubre el catálogo · Envío gratis en tu primer pedido',
        ctaLabel: 'Ver catálogo',
        ctaHref: '/buscar',
        badgeText: 'PRIMERA VISITA · Envío gratis',
        badgeClass: 'bg-yellow-500/15 border-yellow-500/40 text-yellow-300',
      };
    }
    return {
      title: 'Todo para tu próxima aventura sobre ruedas',
      subtitle: 'Más de 25 productos seleccionados para ciclistas',
      ctaLabel: 'Explorar',
      ctaHref: '/buscar',
      badgeText: 'NUEVA SELECCIÓN · Primavera 2025',
      badgeClass: 'bg-green-500/15 border-green-500/40 text-green-300',
    };
  }

  if (affinity === 'road') {
    return {
      title: 'Bienvenido de vuelta, rodador',
      subtitle: 'Tu próxima escapada en carretera te espera',
      ctaLabel: 'Ver bicis de carretera',
      ctaHref: '/buscar',
      badgeText: 'PARA TI · Carretera',
      badgeClass: 'bg-blue-500/15 border-blue-500/40 text-blue-300',
    };
  }
  if (affinity === 'mtb') {
    return {
      title: 'Bienvenido de vuelta, trailero',
      subtitle: 'Nuevo material de montaña que te va a gustar',
      ctaLabel: 'Ver MTB',
      ctaHref: '/buscar',
      badgeText: 'PARA TI · MTB',
      badgeClass: 'bg-orange-500/15 border-orange-500/40 text-orange-300',
    };
  }
  // returning + gravel o sin afinidad
  return {
    title: 'Bienvenido de vuelta',
    subtitle: 'Tus recomendaciones de esta semana',
    ctaLabel: 'Ver novedades',
    ctaHref: '/buscar',
    badgeText: 'RECURRENTE',
    badgeClass: 'bg-neutral-500/15 border-neutral-500/40 text-neutral-300',
  };
}

export default function PersonalizedHero() {
  const [segment, setSegment] = useState<UserSegment | null>(null);

  useEffect(() => {
    setSegment(getSegmentFromCookies());
  }, []);

  if (!segment) {
    return (
      <section className="w-full min-h-[380px] bg-gradient-to-br from-neutral-900 to-neutral-950 flex items-center justify-center">
        <div className="w-full max-w-2xl px-6 flex flex-col items-center gap-4 animate-pulse">
          <div className="h-6 w-48 rounded-full bg-neutral-800" />
          <div className="h-9 w-full rounded bg-neutral-800" />
          <div className="h-9 w-2/3 rounded bg-neutral-800" />
          <div className="h-5 w-1/2 rounded bg-neutral-800" />
          <div className="h-12 w-44 rounded-full bg-neutral-800 mt-2" />
        </div>
      </section>
    );
  }

  const v = resolveVariant(segment);
  const dyLabel = `Segment: ${segment.visitorType} / ${segment.affinity ?? 'no affinity'} / Variant ${segment.abVariant}`;

  return (
    <section className="relative w-full min-h-[380px] bg-gradient-to-br from-neutral-900 to-neutral-950 flex items-center justify-center">
      <ToolBadge tool="dy" variant="corner" label={dyLabel} />
      <div className="text-center px-6 max-w-3xl py-16">
        <span
          className={`inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${v.badgeClass} mb-5`}
        >
          {v.badgeText}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4 leading-tight">
          {v.title}
        </h1>
        <p className="text-neutral-400 text-lg mb-8">{v.subtitle}</p>
        <Link
          href={v.ctaHref}
          className="inline-flex items-center justify-center rounded-full bg-neutral-100 text-neutral-900 font-medium px-7 py-3 hover:bg-white transition-colors"
        >
          {v.ctaLabel}
        </Link>
      </div>
    </section>
  );
}
