import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, FileCode2, FileCog, MemoryStick, Sparkles, Wrench } from 'lucide-react';

const tools: Array<{
  href: string;
  icon: LucideIcon;
  accent: string;
  label: string;
  title: string;
  description: string;
  items: string[];
}> = [
  {
    href: '/tools/start-script',
    icon: FileCode2,
    accent: 'text-emerald-700 dark:text-emerald-300 bg-emerald-500/12',
    label: '启动与运行',
    title: '启动脚本生成器',
    description: '为 Windows 或 Linux 生成可直接使用的服务端启动脚本。',
    items: ['Paper、Purpur、原版服务端', '内存参数与 Java 路径', '复制或下载 start.bat / start.sh'],
  },
  {
    href: '/tools/memory-plan',
    icon: MemoryStick,
    accent: 'text-violet-700 dark:text-violet-300 bg-violet-500/12',
    label: '性能规划',
    title: '服务器内存规划',
    description: '根据机器总内存与服务端负载，生成保守的 JVM 参数建议。',
    items: ['为系统保留必要余量', '轻量、常规、重载三种场景', '一键复制 -Xms 与 -Xmx 参数'],
  },
  {
    href: '/tools/server-properties',
    icon: FileCog,
    accent: 'text-sky-700 dark:text-sky-300 bg-sky-500/12',
    label: '配置入门',
    title: 'server.properties 生成器',
    description: '通过表单生成常用的服务端基础配置，减少手写出错。',
    items: ['游戏模式、难度和人数', '白名单、正版验证与 PvP', '实时预览、复制或下载配置'],
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-full bg-fd-background">
      <section className="relative overflow-hidden border-b border-fd-border bg-[radial-gradient(circle_at_15%_0%,rgba(16,185,129,0.16),transparent_34%),radial-gradient(circle_at_85%_8%,rgba(56,189,248,0.12),transparent_28%)]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[linear-gradient(rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.07)_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-emerald-800 dark:text-emerald-200"><Sparkles className="size-3.5" aria-hidden="true" />MineWiki 工具箱</div>
            <h1 className="mt-6 text-balance text-4xl font-black tracking-[-0.04em] text-fd-foreground sm:text-5xl">少一点手写配置，<span className="text-emerald-600 dark:text-emerald-300">多一点安心开服。</span></h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-sm leading-7 text-fd-muted-foreground sm:text-base">这些工具全部在浏览器本地运行，不会上传你的 jar 文件名、内存设置或服务器配置。生成结果可以直接复制，也能下载为文件。</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex items-end justify-between gap-4"><div><p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">常用工具</p><h2 className="mt-1 text-2xl font-bold tracking-tight text-fd-foreground sm:text-3xl">从第一次启动到日常配置</h2></div><Wrench className="mb-1 size-6 text-fd-muted-foreground" aria-hidden="true" /></div>
        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          {tools.map((tool) => <ToolCard key={tool.href} {...tool} />)}
        </div>
        <div className="mt-10 rounded-2xl border border-fd-border bg-fd-muted/45 p-5 text-sm leading-6 text-fd-muted-foreground sm:p-6"><strong className="text-fd-foreground">使用前提醒：</strong> 生成器提供的是清晰的起点，不会替你判断服务端版本兼容性。替换脚本或配置前，请先备份原文件；修改 `server.properties` 后需要重启服务端才会生效。</div>
      </section>
    </main>
  );
}

function ToolCard({ href, icon: Icon, accent, label, title, description, items }: (typeof tools)[number]) {
  return (
    <Link href={href} className="group flex min-h-80 flex-col rounded-2xl border border-fd-border bg-fd-card p-5 shadow-sm transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:border-emerald-500/55 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
      <span className={`grid size-11 place-items-center rounded-xl ${accent}`}><Icon className="size-5" aria-hidden="true" /></span>
      <p className="mt-5 text-xs font-semibold tracking-wide text-fd-muted-foreground">{label}</p>
      <h2 className="mt-1 text-xl font-semibold tracking-tight text-fd-foreground">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">{description}</p>
      <ul className="mt-5 space-y-2 text-sm leading-5 text-fd-muted-foreground">
        {items.map((item) => <li key={item} className="flex gap-2 before:mt-2 before:size-1.5 before:shrink-0 before:rounded-full before:bg-emerald-500">{item}</li>)}
      </ul>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-emerald-700 dark:text-emerald-300">打开工具<ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /></span>
    </Link>
  );
}
