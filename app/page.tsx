import Link from 'next/link';
import PersonalizedHero from '@/components/PersonalizedHero';
import PersonalizedRecommendations from '@/components/PersonalizedRecommendations';
import DemoControls from '@/components/DemoControls';
import ToolBadge from '@/components/ToolBadge';
import { catalog } from '@/lib/catalog';
import { Discipline } from '@/lib/types';

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

export default function Home() {
  const seasonal = catalog
    .filter(p => p.season === 'spring-summer')
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 pb-24">
      <PersonalizedHero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PersonalizedRecommendations />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-neutral-900">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold">En temporada ahora</h2>
          <ToolBadge tool="dy" label="Server-side seasonal rule" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {seasonal.map(p => {
            const rd = p.originalPrice && p.originalPrice > p.price;
            return (
              <Link
                key={p.id}
                href={`/producto/${p.slug}`}
                className="group flex flex-col bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-600 transition-colors"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex flex-col gap-1">
                  <p className="text-xs uppercase tracking-widest text-neutral-500">
                    {p.brand}
                  </p>
                  <p className="text-neutral-100 font-medium leading-snug">{p.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-neutral-100 font-semibold">
                      {p.price.toLocaleString('es-ES')} €
                      {rd && (
                        <span className="ml-2 text-neutral-500 text-xs line-through">
                          {p.originalPrice!.toLocaleString('es-ES')} €
                        </span>
                      )}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${disciplineColors[p.discipline]}`}
                    >
                      {disciplineLabels[p.discipline]}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <DemoControls />
    </main>
  );
}
