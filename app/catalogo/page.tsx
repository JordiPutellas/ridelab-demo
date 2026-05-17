import Link from "next/link";
import { getAllProducts } from "@/lib/catalog-helpers";
import { Product } from "@/lib/types";

const disciplineColors: Record<string, string> = {
  road: "bg-blue-900/60 text-blue-300",
  mtb: "bg-green-900/60 text-green-300",
  gravel: "bg-amber-900/60 text-amber-300",
  multi: "bg-neutral-700/60 text-neutral-300",
};

const disciplineLabels: Record<string, string> = {
  road: "Carretera",
  mtb: "MTB",
  gravel: "Gravel",
  multi: "Multi",
};

function ProductCard({ product }: { product: Product }) {
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group flex flex-col bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-colors duration-200"
    >
      <div className="relative overflow-hidden aspect-3/2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span
          className={`absolute bottom-2 left-2 text-xs font-medium px-2 py-0.5 rounded-full ${disciplineColors[product.discipline]}`}
        >
          {disciplineLabels[product.discipline]}
        </span>
        {product.isNew && (
          <span className="absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-600 text-white">
            Nuevo
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1 p-4">
        <p className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
          {product.brand}
        </p>
        <p className="text-neutral-100 font-medium leading-snug">
          {product.name}
        </p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-neutral-100 font-semibold">
            {product.price.toLocaleString("es-ES")} €
          </span>
          {hasDiscount && (
            <span className="text-neutral-500 text-sm line-through">
              {product.originalPrice!.toLocaleString("es-ES")} €
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function CatalogoPage() {
  const products = getAllProducts();

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">
            ridelab / catálogo
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-neutral-100">Catálogo</h1>
              <p className="mt-2 text-neutral-400 text-sm">
                {products.length} productos
              </p>
            </div>
            <Link
              href="/buscar"
              className="text-sm text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1"
            >
              Probar búsqueda inteligente →
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
