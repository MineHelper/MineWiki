import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Blocks,
  BookOpenCheck,
  ChevronRight,
  CircleHelp,
  Compass,
  MessageCircle,
  Network,
  PackageOpen,
  PlugZap,
  ServerCog,
  ShieldCheck,
  Sparkles,
  FileCode2,
} from 'lucide-react';

const learningPaths: Array<{
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  label: string;
}> = [
  {
    href: '/docs/java',
    icon: ServerCog,
    title: 'Java 版开服',
    description: '适合 Java Edition 玩家；覆盖服务端、插件、模组、网络与维护。',
    label: 'Java Edition',
  },
  {
    href: '/docs/bedrock',
    icon: Blocks,
    title: '基岩版开服',
    description: '适合 Bedrock Edition 玩家；从 BDS、UDP 联机、配置与 Add-On 开始。',
    label: 'Bedrock Edition',
  },
  {
    href: '/docs/java/intro',
    icon: Compass,
    title: '从零开服',
    description: '准备 Java、选择服务端，并完成第一次本机启动。',
    label: 'Java 入门',
  },
  {
    href: '/docs/java/network',
    icon: Network,
    title: '让朋友连进来',
    description: '理解端口转发与内网穿透，安全开放 Java 版联机入口。',
    label: 'Java 网络',
  },
  {
    href: '/docs/java/extensions/plugins',
    icon: PlugZap,
    title: '扩展 Java 服务器',
    description: '安装插件、管理功能，并避开常见兼容性问题。',
    label: 'Java 插件',
  },
  {
    href: '/docs/java/extensions/mods',
    icon: PackageOpen,
    title: '搭建 Java 模组服',
    description: '选择 Forge、NeoForge 或 Fabric，安装匹配版本的模组服务端。',
    label: 'Java 模组',
  },
];

export default function HomePage() {
  return (
    <main className="relative flex-1 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_10%,rgba(16,185,129,0.14),transparent_25%),radial-gradient(circle_at_88%_16%,rgba(56,189,248,0.10),transparent_22%)] dark:opacity-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[35rem] bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:linear-gradient(to_bottom,black,transparent_78%)] dark:opacity-45"
      />

      <section className="mx-auto max-w-6xl px-5 pb-14 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-emerald-800 dark:text-emerald-200">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Minecraft Server Wiki · 面向新手的开服指南
          </div>
          <h1 className="text-balance text-5xl font-black tracking-[-0.045em] text-fd-foreground sm:text-6xl lg:text-7xl">
            从第一条命令开始，
            <span className="block bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
              建好你的 Minecraft 服务器。
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-8 text-fd-muted-foreground sm:text-lg">
            MineWiki 先帮助你区分 Java Edition 与 Bedrock Edition，再按对应服务端、联机、配置、扩展和维护路径完成部署。
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/docs"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 text-sm font-semibold text-white shadow-sm shadow-emerald-950/15 transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-500 dark:hover:bg-emerald-400"
            >
              选择开服版本
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/tools"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-fd-border bg-fd-background/75 px-5 text-sm font-semibold text-fd-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-fd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              <FileCode2 className="size-4 text-emerald-600 dark:text-emerald-300" aria-hidden="true" />
              常用工具
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-3 rounded-2xl border border-fd-border/80 bg-fd-background/70 p-3 shadow-sm backdrop-blur sm:grid-cols-3 sm:gap-0 sm:p-2">
          <HeroStep number="01" title="先选择版本" description="确认玩家使用 Java Edition 还是 Bedrock Edition。" />
          <HeroStep number="02" title="完成本机启动" description="按对应服务端完成配置并验证日志。" />
          <HeroStep number="03" title="再邀请玩家加入" description="确认备份后处理端口与联机。" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className="flex flex-col justify-between gap-4 border-t border-fd-border pt-10 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">按路径学习</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-fd-foreground sm:text-3xl">先选择版本，再按路径学习</h2>
          </div>
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-fd-muted-foreground transition hover:text-emerald-700 dark:hover:text-emerald-300"
          >
            浏览全部文档
            <ChevronRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {learningPaths.map((path) => (
            <LearningPath key={path.href} {...path} />
          ))}
        </div>

        <div className="mt-10 grid gap-4 rounded-2xl border border-fd-border bg-fd-card p-5 shadow-sm sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
          <div className="flex items-start gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-500/12 text-emerald-700 dark:text-emerald-300">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-fd-foreground">遇到启动、连接或配置问题？</h2>
              <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">
                先按症状查 FAQ；其中整理了连接失败、启动失败和常见配置误区的排查顺序。
              </p>
            </div>
          </div>
          <Link
            href="/docs/java/faq"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-fd-border px-4 py-2.5 text-sm font-semibold text-fd-foreground transition hover:border-emerald-500/55 hover:bg-emerald-500/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            查看常见问题
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="border-t border-fd-border bg-fd-muted/45">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-5 py-10 sm:flex-row sm:items-center sm:px-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-fd-foreground">
              <BookOpenCheck className="size-4 text-emerald-600 dark:text-emerald-300" aria-hidden="true" />
              MineWiki 是持续整理中的开服知识库
            </div>
            <p className="mt-1.5 text-sm text-fd-muted-foreground">文档里找不到答案时，可以加入社区交流，或补充你踩过的坑。</p>
          </div>
          <a
            href="https://qm.qq.com/q/ddmU2e3I4g"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-lg bg-fd-foreground px-4 py-2.5 text-sm font-semibold text-fd-background transition hover:opacity-88 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            加入 QQ 群交流
          </a>
        </div>
      </section>
    </main>
  );
}

function HeroStep({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="relative rounded-xl px-4 py-3 sm:rounded-lg sm:px-5 sm:py-4 sm:not-last:border-r sm:not-last:border-fd-border">
      <span className="text-xs font-bold tracking-[0.16em] text-emerald-700 dark:text-emerald-300">{number}</span>
      <h2 className="mt-1 text-sm font-semibold text-fd-foreground">{title}</h2>
      <p className="mt-1 text-xs leading-5 text-fd-muted-foreground">{description}</p>
    </div>
  );
}

function LearningPath({
  href,
  icon: Icon,
  title,
  description,
  label,
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-48 flex-col overflow-hidden rounded-2xl border border-fd-border bg-fd-card p-5 shadow-sm transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:border-emerald-500/55 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
    >
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-fd-muted px-2.5 py-1 text-xs font-medium text-fd-muted-foreground">
        <Icon className="size-3.5 text-emerald-600 dark:text-emerald-300" aria-hidden="true" />
        {label}
      </span>
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-fd-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">{description}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
        查看指南
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
