import type { ReactNode } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Blocks,
  CheckCircle2,
  File,
  Folder,
  HardDrive,
  Info,
  Network,
  Package,
  Puzzle,
  Server,
  Settings2,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { cn } from '@/lib/cn';

type QuickLinkIcon = 'start' | 'java' | 'bedrock' | 'network' | 'plugins' | 'config' | 'maintenance' | 'mods' | 'faq';
type CalloutTone = 'info' | 'tip' | 'warning' | 'danger';

const quickLinkIcons = {
  start: HardDrive,
  java: Server,
  bedrock: Blocks,
  network: Network,
  plugins: Puzzle,
  config: Settings2,
  maintenance: Wrench,
  mods: Package,
  faq: ShieldCheck,
} satisfies Record<QuickLinkIcon, typeof HardDrive>;

const calloutStyles = {
  info: {
    icon: Info,
    label: '说明',
    className: 'border-sky-500/35 bg-sky-500/8 text-sky-950 dark:text-sky-100',
    iconClassName: 'bg-sky-500/15 text-sky-700 dark:text-sky-300',
  },
  tip: {
    icon: CheckCircle2,
    label: '建议',
    className: 'border-emerald-500/35 bg-emerald-500/8 text-emerald-950 dark:text-emerald-100',
    iconClassName: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  },
  warning: {
    icon: AlertTriangle,
    label: '注意',
    className: 'border-amber-500/40 bg-amber-500/10 text-amber-950 dark:text-amber-100',
    iconClassName: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  },
  danger: {
    icon: AlertTriangle,
    label: '风险提示',
    className: 'border-rose-500/40 bg-rose-500/10 text-rose-950 dark:text-rose-100',
    iconClassName: 'bg-rose-500/15 text-rose-700 dark:text-rose-300',
  },
} satisfies Record<CalloutTone, { icon: typeof Info; label: string; className: string; iconClassName: string }>;

export function QuickLinkGrid({ children }: { children: ReactNode }) {
  return <div className="not-prose my-8 grid gap-3 sm:grid-cols-2">{children}</div>;
}

export function QuickLink({
  href,
  title,
  description,
  icon = 'start',
}: {
  href: string;
  title: string;
  description: string;
  icon?: QuickLinkIcon;
}) {
  const Icon = quickLinkIcons[icon];

  return (
    <a
      href={href}
      className="group flex min-h-32 items-start gap-3 rounded-xl border border-fd-border bg-fd-card p-4 no-underline shadow-sm transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:border-emerald-500/55 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-500/12 text-emerald-700 transition-colors group-hover:bg-emerald-500/18 dark:text-emerald-300">
        <Icon className="size-4.5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 text-sm font-semibold text-fd-foreground">
          {title}
          <ArrowRight className="size-3.5 text-fd-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
        <span className="mt-1.5 block text-sm leading-6 text-fd-muted-foreground">{description}</span>
      </span>
    </a>
  );
}

export function Callout({
  children,
  title,
  tone = 'info',
}: {
  children: ReactNode;
  title?: string;
  tone?: CalloutTone;
}) {
  const config = calloutStyles[tone];
  const Icon = config.icon;

  return (
    <aside className={cn('not-prose my-6 rounded-xl border p-4', config.className)}>
      <div className="flex gap-3">
        <span className={cn('grid size-8 shrink-0 place-items-center rounded-lg', config.iconClassName)}>
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1 text-sm leading-6">
          <p className="m-0 font-semibold">{title ?? config.label}</p>
          <div className="mt-1 text-current/85 [&_code]:rounded [&_code]:bg-black/7 [&_code]:px-1.5 [&_code]:py-0.5 dark:[&_code]:bg-white/10">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}

export function Steps({ children }: { children: ReactNode }) {
  return <div className="not-prose my-7 space-y-4 [&>section:last-child_.step-connector]:hidden">{children}</div>;
}

export function Step({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="relative grid grid-cols-[2rem_1fr] gap-3">
      <div className="flex flex-col items-center">
        <span className="grid size-8 place-items-center rounded-full bg-emerald-600 text-sm font-bold text-white shadow-sm dark:bg-emerald-500">
          {number}
        </span>
        <span className="step-connector mt-2 h-full min-h-5 w-px bg-fd-border" aria-hidden="true" />
      </div>
      <div className="pb-4">
        <h3 className="m-0 text-base font-semibold tracking-normal text-fd-foreground">{title}</h3>
        <div className="mt-1.5 text-sm leading-6 text-fd-muted-foreground [&_p]:my-0 [&_ul]:my-2 [&_ul]:ps-5 [&_ol]:my-2 [&_ol]:ps-5 [&_code]:rounded [&_code]:border [&_code]:border-fd-border [&_code]:bg-fd-muted [&_code]:px-1.5 [&_code]:py-0.5">
          {children}
        </div>
      </div>
    </section>
  );
}

export function FileTree({ children }: { children: ReactNode }) {
  return <div className="not-prose my-6 overflow-hidden rounded-xl border border-fd-border bg-fd-card text-sm shadow-sm">{children}</div>;
}

export function FileTreeItem({
  name,
  kind = 'file',
  description,
}: {
  name: string;
  kind?: 'file' | 'folder';
  description: string;
}) {
  const Icon = kind === 'folder' ? Folder : File;

  return (
    <div className="flex items-start gap-3 border-b border-fd-border px-4 py-3 last:border-b-0">
      <Icon className={cn('mt-0.5 size-4 shrink-0', kind === 'folder' ? 'text-amber-600 dark:text-amber-300' : 'text-fd-muted-foreground')} aria-hidden="true" />
      <code className="shrink-0 rounded bg-fd-muted px-1.5 py-0.5 text-xs text-fd-foreground">{name}</code>
      <span className="min-w-0 text-fd-muted-foreground">{description}</span>
    </div>
  );
}
