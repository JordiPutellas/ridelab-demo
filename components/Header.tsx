import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        <Link href="/" className="text-neutral-100 font-semibold tracking-tight hover:text-white transition-colors">
          ridelab
        </Link>
        <nav className="flex items-center gap-6 text-sm text-neutral-400">
          <Link href="/buscar" className="hover:text-neutral-100 transition-colors">
            Buscar
          </Link>
        </nav>
      </div>
    </header>
  );
}
