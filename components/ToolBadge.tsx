'use client';

type Tool = 'algolia' | 'dy' | 'akeneo';

interface Props {
  tool: Tool;
  label: string;
  variant?: 'inline' | 'corner';
}

const config: Record<Tool, { bg: string; border: string; text: string; icon: string; name: string }> = {
  algolia: {
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/30',
    text: 'text-sky-300',
    icon: '🔍',
    name: 'ALGOLIA',
  },
  dy: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-300',
    icon: '🎯',
    name: 'DY',
  },
  akeneo: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    text: 'text-violet-300',
    icon: '✨',
    name: 'AKENEO',
  },
};

export default function ToolBadge({ tool, label, variant = 'inline' }: Props) {
  const { bg, border, text, icon, name } = config[tool];

  const base = `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs ${bg} ${border} ${text}`;
  const cls = variant === 'corner' ? `absolute top-2 right-2 z-10 ${base}` : base;

  return (
    <span className={cls}>
      <span>{icon}</span>
      <span className="font-semibold uppercase tracking-wider">{name}</span>
      <span className="opacity-70">·</span>
      <span>{label}</span>
    </span>
  );
}
