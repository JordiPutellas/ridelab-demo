import { config } from 'dotenv';
import path from 'path';
import { algoliasearch } from 'algoliasearch';
import { catalog } from '../lib/catalog';

config({ path: path.resolve(process.cwd(), '.env.local') });
const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
const adminKey = process.env.ALGOLIA_ADMIN_API_KEY!;
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME ?? 'products';

if (!appId || !adminKey) {
  console.error('❌  Faltan variables NEXT_PUBLIC_ALGOLIA_APP_ID o ALGOLIA_ADMIN_API_KEY en .env.local');
  process.exit(1);
}

const client = algoliasearch(appId, adminKey);

async function main() {
  // ── 1. Subir productos ──────────────────────────────────────────────
  const objects = catalog.map(p => ({ ...p, objectID: p.id }));
  await client.saveObjects({ indexName, objects });
  console.log(`✅  ${objects.length} productos subidos al índice "${indexName}"`);

  // ── 2. Configurar settings ──────────────────────────────────────────
  await client.setSettings({
    indexName,
    indexSettings: {
      searchableAttributes: [
        'unordered(name)',
        'brand',
        'unordered(tags)',
        'description',
      ],
      attributesForFaceting: [
        'discipline',
        'brand',
        'level',
        'category',
        'season',
        'searchable(tags)',
      ],
      customRanking: ['desc(isNew)', 'desc(stock)'],
    },
  });
  console.log('✅  Settings configurados (searchableAttributes, facets, customRanking)');

  // ── 3. Sinónimos ────────────────────────────────────────────────────
  const synonymGroups: string[][] = [
    ['maillot', 'jersey'],
    ['culotte', 'bib short', 'bib-short', 'bib'],
    ['mtb', 'btt', 'montaña', 'mountain bike'],
    ['bici', 'bicicleta', 'bike'],
    ['carretera', 'ruta', 'road'],
    ['gafas', 'sunglasses'],
    ['carbono', 'carbon'],
    ['ciclocomputador', 'gps', 'computer'],
  ];

  const synonymHit = synonymGroups.map((synonyms, i) => ({
    objectID: `synonym-${i}`,
    type: 'synonym' as const,
    synonyms,
  }));

  await client.saveSynonyms({
    indexName,
    synonymHit,
    replaceExistingSynonyms: true,
  });
  console.log(`✅  ${synonymHit.length} grupos de sinónimos guardados`);

  // ── 4. Rules ────────────────────────────────────────────────────────
  const rules = [
    {
      objectID: 'rule-zero-results-dura-ace-9200',
      conditions: [
        {
          pattern: 'dura ace 9200',
          anchoring: 'contains' as const,
        },
      ],
      consequence: {
        promote: [
          {
            objectID: 'p004',
            position: 0,
          },
        ],
      },
      description: 'Zero-results recovery: "dura ace 9200" → pin Apex Velo Climber (p004)',
    },
    {
      objectID: 'rule-apparel-intent',
      conditions: [
        { pattern: 'maillot', anchoring: 'contains' as const },
        { pattern: 'jersey',  anchoring: 'contains' as const },
      ],
      consequence: {
        params: {
          optionalFilters: ['category:apparel<score=2>'],
        },
      },
      description: 'Apparel intent: boost category:apparel when query contains maillot or jersey',
    },
  ];

  await client.saveRules({
    indexName,
    rules,
    clearExistingRules: true,
  });
  console.log(`✅  ${rules.length} rules guardadas`);

  console.log('\n🎉  Sincronización completada con éxito.');
  process.exit(0);
}

main().catch(err => {
  console.error('❌  Error durante la sincronización:', err);
  process.exit(1);
});
