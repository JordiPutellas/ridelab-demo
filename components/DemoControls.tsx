'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  getSegmentFromCookies,
  resetSegment,
  setSegment,
  UserSegment,
} from '@/lib/personalization';

type Action =
  | { kind: 'reset' }
  | { kind: 'affinity'; affinity: 'road' | 'mtb' | 'gravel' }
  | { kind: 'ab' };

export default function DemoControls() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [segment, setLocalSegment] = useState<UserSegment | null>(null);

  useEffect(() => {
    setLocalSegment(getSegmentFromCookies());
  }, []);

  if (pathname !== '/' || !visible) return null;

  function run(action: Action) {
    if (action.kind === 'reset') {
      resetSegment();
    } else if (action.kind === 'affinity') {
      setSegment({ visitorType: 'returning', affinity: action.affinity });
    } else {
      const current = getSegmentFromCookies();
      setSegment({ abVariant: current.abVariant === 'A' ? 'B' : 'A' });
    }
    window.location.reload();
  }

  const isNew = segment?.visitorType === 'new';
  const isReturning = segment?.visitorType === 'returning';

  const buttons: { label: string; action: Action; active: boolean }[] = [
    { label: '🆕 Nueva visita', action: { kind: 'reset' }, active: !!isNew },
    {
      label: '🚴 Carretera',
      action: { kind: 'affinity', affinity: 'road' },
      active: isReturning && segment?.affinity === 'road',
    },
    {
      label: '⛰️ MTB',
      action: { kind: 'affinity', affinity: 'mtb' },
      active: isReturning && segment?.affinity === 'mtb',
    },
    {
      label: '🪨 Gravel',
      action: { kind: 'affinity', affinity: 'gravel' },
      active: isReturning && segment?.affinity === 'gravel',
    },
    { label: '🔀 Cambiar A/B', action: { kind: 'ab' }, active: false },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-900/95 backdrop-blur border-t border-neutral-800 max-h-[40vh] overflow-y-auto">
      <div className="relative max-w-7xl mx-auto px-4 py-2.5 pr-9 flex items-center justify-center gap-2 flex-wrap">
        <span className="hidden sm:block text-xs text-neutral-500 mr-1">
          Modo demo · Dynamic Yield simulator
        </span>
        <div className="grid grid-cols-2 gap-1 w-full sm:w-auto sm:flex sm:gap-2">
          {buttons.map(b => (
            <button
              key={b.label}
              onClick={() => run(b.action)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                b.active
                  ? 'border-white bg-white/10 text-neutral-100'
                  : 'border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-neutral-100'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setVisible(false)}
          aria-label="Ocultar panel demo"
          className="absolute right-3 top-2.5 text-neutral-500 hover:text-neutral-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
