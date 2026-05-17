import type { Metadata } from 'next';
import BuscarClient from './BuscarClient';

export const metadata: Metadata = {
  title: 'Buscar · ridelab',
  description:
    'Busca entre más de 25 productos de ciclismo con búsqueda inteligente.',
};

export default function BuscarPage() {
  return <BuscarClient />;
}
