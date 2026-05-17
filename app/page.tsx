export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center">
      <div className="text-center px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">
          Cycling Experience Demo
        </p>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">ridelab</h1>
        <p className="text-neutral-400 max-w-md mx-auto">
          A working showcase of personalization, search and PIM intelligence for
          cycling e-commerce.
        </p>
        <p className="text-xs text-neutral-600 mt-12">
          Work in progress · {new Date().toLocaleDateString("es-ES")}
        </p>
      </div>
    </main>
  );
}
