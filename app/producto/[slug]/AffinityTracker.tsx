'use client';

import { useEffect } from 'react';
import { setAffinity } from '@/lib/personalization';
import { Discipline } from '@/lib/types';

export default function AffinityTracker({ discipline }: { discipline: Discipline }) {
  useEffect(() => {
    if (discipline !== 'multi') {
      setAffinity(discipline);
    }
  }, [discipline]);

  return null;
}
