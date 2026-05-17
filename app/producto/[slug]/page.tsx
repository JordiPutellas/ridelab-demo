import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts } from '@/lib/catalog-helpers';
import { Discipline } from '@/lib/types';
import ToolBadge from '@/components/ToolBadge';
import AffinityTracker from './AffinityTracker';

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

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  const stockColor =
    product.stock === 0
      ? 'text-red-400'
      : product.stock <= 3
        ? 'text-orange-400'
        : 'text-green-400';
  const stockLabel =
    product.stock === 0
      ? 'Agotado'
      : product.stock <= 3
        ? `Últimas ${product.stock} unidades`
        : `${product.stock} disponibles`;

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <AffinityTracker discipline={product.discipline} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/catalogo"
          className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          ← Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6">
          {/* Imagen */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-[4/3] object-cover rounded-xl border border-neutral-800"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-wider text-neutral-500">
              {product.brand}
            </p>
            <h1 className="text-3xl font-bold text-neutral-100 mt-1">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-2xl font-semibold text-neutral-100">
                {product.price.toLocaleString('es-ES')} €
              </span>
              {hasDiscount && (
                <span className="text-neutral-500 line-through">
                  {product.originalPrice!.toLocaleString('es-ES')} €
                </span>
              )}
            </div>

            <p className="text-neutral-400 mt-4 leading-relaxed">
              {product.description}
            </p>

            {/* Specs */}
            <dl className="mt-6 border-t border-neutral-800">
              {Object.entries(product.specs).map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-4 py-2.5 border-b border-neutral-800 text-sm"
                >
                  <dt className="text-neutral-500 capitalize">{k}</dt>
                  <dd className="text-neutral-200 text-right">{v}</dd>
                </div>
              ))}
            </dl>

            {/* Tallas */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-6">
                <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">
                  Tallas
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(s => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-md border border-neutral-700 text-sm text-neutral-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            <p className={`mt-6 text-sm font-medium ${stockColor}`}>
              ● {stockLabel}
            </p>

            {/* CTA decorativo */}
            <button
              disabled={product.stock === 0}
              className="mt-4 w-full sm:w-auto rounded-full bg-neutral-100 text-neutral-900 font-medium px-8 py-3 hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Añadir al carrito
            </button>
          </div>
        </div>

        {/* Cross-sell */}
        {related.length > 0 && (
          <section className="mt-16">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold">También te puede interesar</h2>
              <ToolBadge tool="dy" label="Cross-sell · Related by discipline" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map(p => {
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
                      <p className="text-neutral-100 font-medium leading-snug text-sm">
                        {p.name}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-neutral-100 font-semibold text-sm">
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
        )}
      </div>
    </main>
  );
}
