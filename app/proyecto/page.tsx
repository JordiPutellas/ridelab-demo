import type { Metadata } from 'next';
import ToolBadge from '@/components/ToolBadge';

export const metadata: Metadata = {
  title: 'El proyecto · ridelab',
};

export default function ProyectoPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-xs uppercase tracking-wider text-neutral-500">
          RIDELAB · SOBRE ESTE PROYECTO
        </p>
        <h1 className="text-3xl font-bold mt-2 mb-8">
          Una forma de aprender haciendo
        </h1>

        <p className="text-neutral-300 leading-relaxed">
          Los conceptos se entienden mejor cuando tienes que implementarlos.
          Este proyecto existe porque enfrentarme a Dynamic Yield, Algolia y
          Akeneo en un entorno real — aunque pequeño — permite entender no solo
          qué hacen, sino cómo piensan. Construirlo sobre un catálogo de
          ciclismo, que es el contexto que conozco, hace que cada decisión de
          configuración tenga sentido concreto.
        </p>

        <div className="border-t border-neutral-800 my-10" />

        <ToolBadge tool="algolia" label="Algolia · Integrado de verdad" />
        <h2 className="text-lg font-semibold mt-4 mb-3">Búsqueda</h2>
        <p className="text-neutral-300 leading-relaxed">
          Algolia está integrado de verdad. El índice tiene 25 productos, ocho
          grupos de sinónimos configurados y dos reglas de merchandising
          activas. Los sinónimos no son genéricos: &apos;maillot&apos; y
          &apos;jersey&apos;, &apos;MTB&apos;, &apos;BTT&apos; y
          &apos;montaña&apos;, &apos;ciclocomputador&apos; y &apos;GPS&apos;.
          Son los términos que un ciclista real usa y que en un catálogo sin
          configurar generan zero results innecesarios. Las dos reglas
          demuestran conceptos concretos: zero-results recovery cuando alguien
          busca una referencia técnica que no existe en el catálogo, y boost por
          intención cuando la query sugiere una categoría específica.
        </p>

        <div className="border-t border-neutral-800 my-10" />

        <ToolBadge tool="dy" label="Dynamic Yield · Simulado" />
        <h2 className="text-lg font-semibold mt-4 mb-3">Personalización</h2>
        <p className="text-neutral-300 leading-relaxed">
          Dynamic Yield no tiene sandbox público, así que lo que hay aquí es una
          simulación de sus capacidades de segmentación. El sistema detecta si
          es la primera visita o una visita recurrente, infiere afinidad
          deportiva según los productos que se visitan, mantiene una variante de
          A/B test entre sesiones y adapta el hero y las recomendaciones en
          consecuencia. No es DY real, pero implementar esta lógica obliga a
          entender exactamente qué hace DY por debajo: qué es un segmento, qué
          es una audiencia, qué significa personalizar en función de
          comportamiento y no de perfil declarado.
        </p>

        <div className="border-t border-neutral-800 my-10" />

        <ToolBadge tool="akeneo" label="Akeneo · No está en esta demo" />
        <h2 className="text-lg font-semibold mt-4 mb-3">PIM</h2>
        <p className="text-neutral-300 leading-relaxed">
          Akeneo no está en esta demo. Es la herramienta que más tiempo requiere
          para montar un entorno de prueba y la que menos se puede atajar. Lo
          que sí está claro conceptualmente es su rol: la capa de información de
          producto que hace posible que Algolia indexe bien y que DY personalice
          con datos de calidad. Un catálogo mal enriquecido limita todo lo que
          viene después. Esa es la razón por la que la capa de PIM importa antes
          que cualquier otra configuración.
        </p>

        <div className="border-t border-neutral-800 my-10" />

        <p className="text-neutral-500 italic">
          El siguiente paso es el mismo con las tres herramientas: pasar de
          entender los conceptos a dominar la configuración real.
        </p>
      </div>
    </main>
  );
}
