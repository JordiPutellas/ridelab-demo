'use client';

import { liteClient as algoliasearch } from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  Pagination,
  Stats,
  Configure,
} from 'react-instantsearch';
import ToolBadge from '@/components/ToolBadge';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!,
);

const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME ?? 'products';

interface HitProduct {
  objectID: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  discipline: string;
  price: number;
  originalPrice?: number;
  image: string;
}

function ProductHit({ hit }: { hit: HitProduct }) {
  const hasDiscount = hit.originalPrice && hit.originalPrice > hit.price;
  return (
    <div className="relative flex flex-col bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-600 transition-colors">
      <ToolBadge tool="algolia" label="Ranked by relevance" variant="corner" />
      <div className="aspect-[3/2] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hit.image}
          alt={hit.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 flex flex-col gap-0.5">
        <p className="text-xs uppercase tracking-widest text-neutral-500">{hit.brand}</p>
        <p className="text-neutral-100 text-sm font-medium leading-snug">{hit.name}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-neutral-100 font-semibold text-sm">
            {hit.price.toLocaleString('es-ES')} €
          </span>
          {hasDiscount && (
            <span className="text-neutral-500 text-xs line-through">
              {hit.originalPrice!.toLocaleString('es-ES')} €
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function FacetSection({ title, attribute }: { title: string; attribute: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-medium">{title}</p>
      <RefinementList
        attribute={attribute}
        classNames={{
          root: 'text-sm',
          list: 'flex flex-col gap-1',
          item: 'flex items-center',
          label: 'flex items-center gap-2 cursor-pointer w-full group',
          checkbox:
            'rounded border-neutral-600 bg-neutral-800 text-sky-500 focus:ring-sky-500 focus:ring-offset-neutral-950',
          labelText: 'text-neutral-300 group-hover:text-neutral-100 transition-colors flex-1',
          count:
            'ml-auto text-neutral-600 text-xs tabular-nums',
          selectedItem: '[&_.ais-RefinementList-labelText]:text-sky-300',
        }}
      />
    </div>
  );
}

export default function BuscarPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold">Búsqueda</h1>
          <ToolBadge
            tool="algolia"
            label="Live search + 8 synonym groups + 2 rules"
            variant="inline"
          />
        </div>

        <InstantSearch searchClient={searchClient} indexName={indexName} future={{ preserveSharedStateOnUnmount: true }}>
          <Configure hitsPerPage={12} />

          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
            {/* Sidebar facets */}
            <aside className="lg:border-r lg:border-neutral-800 lg:pr-8">
              <FacetSection title="Disciplina"  attribute="discipline" />
              <FacetSection title="Marca"       attribute="brand" />
              <FacetSection title="Nivel"       attribute="level" />
              <FacetSection title="Categoría"   attribute="category" />
            </aside>

            {/* Main */}
            <div className="min-w-0">
              <SearchBox
                placeholder="Busca bicis, ropa, accesorios… (prueba: 'maillot', 'dura ace 9200', 'mtb carbono')"
                classNames={{
                  root: 'mb-3',
                  form: 'relative',
                  input:
                    'w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-sky-500 transition-colors',
                  submit: 'absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-100',
                  reset: 'absolute right-8 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-100',
                  submitIcon: 'w-4 h-4',
                  resetIcon: 'w-3 h-3',
                }}
              />

              <Stats
                classNames={{
                  root: 'text-xs text-neutral-500 mb-4',
                }}
              />

              <Hits
                hitComponent={({ hit }) => <ProductHit hit={hit as unknown as HitProduct} />}
                classNames={{
                  root: '',
                  list: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4',
                  item: '',
                }}
              />

              <Pagination
                classNames={{
                  root: 'mt-8 flex justify-center',
                  list: 'flex items-center gap-1',
                  item: '',
                  link: 'flex items-center justify-center w-8 h-8 rounded-lg text-sm text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors',
                  selectedItem: '[&_.ais-Pagination-link]:bg-sky-600 [&_.ais-Pagination-link]:text-white [&_.ais-Pagination-link]:hover:bg-sky-500',
                  disabledItem: 'opacity-30 pointer-events-none',
                }}
              />
            </div>
          </div>
        </InstantSearch>
      </div>
    </main>
  );
}
