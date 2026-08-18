'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowLeft, Check, Clipboard, Cpu, Info, MemoryStick } from 'lucide-react';

const totalMemoryOptions = [4, 6, 8, 12, 16, 24, 32, 48, 64];
type Workload = 'light' | 'standard' | 'heavy';

const workloadDetails: Record<Workload, { title: string; description: string; target: number }> = {
  light: { title: '轻量原版 / 少量插件', description: '朋友小服、原版或少量基础插件。', target: 2 },
  standard: { title: '常规 Paper 服务端', description: '中等玩家数量与常见插件组合。', target: 4 },
  heavy: { title: '大型插件 / 模组服', description: '较多插件、模组或较高视距需求。', target: 6 },
};

function reserveMemory(total: number) {
  if (total <= 6) return 2;
  if (total <= 12) return 3;
  if (total <= 24) return 4;
  return 6;
}

function formatMemory(value: number) {
  return Number.isInteger(value) ? `${value}G` : `${value.toFixed(1)}G`;
}

export default function MemoryPlanPage() {
  const [totalMemory, setTotalMemory] = useState(16);
  const [workload, setWorkload] = useState<Workload>('standard');
  const [runsOnDesktop, setRunsOnDesktop] = useState(true);
  const [copied, setCopied] = useState(false);

  const plan = useMemo(() => {
    const baseReserve = reserveMemory(totalMemory) + (runsOnDesktop ? 1 : 0);
    const available = Math.max(1, totalMemory - baseReserve);
    const target = workloadDetails[workload].target;
    const max = Math.max(1, Math.min(target, available));
    const min = Math.max(1, Math.min(max, workload === 'heavy' ? Math.max(2, max / 2) : Math.min(2, max)));
    return { reserve: baseReserve, available, min, max };
  }, [runsOnDesktop, totalMemory, workload]);

  const jvmArgs = `-Xms${formatMemory(plan.min)} -Xmx${formatMemory(plan.max)}`;

  async function copyArgs() {
    try {
      await navigator.clipboard.writeText(jvmArgs);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="min-h-full bg-fd-background">
      <section className="border-b border-fd-border bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.13),transparent_46%)]">
        <div className="mx-auto max-w-5xl px-5 pb-10 pt-12 sm:px-8 sm:pb-14 sm:pt-16">
          <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-medium text-fd-muted-foreground transition hover:text-emerald-700 dark:hover:text-emerald-300">
            <ArrowLeft className="size-4" aria-hidden="true" />
            返回常用工具
          </Link>
          <div className="mt-7 flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-emerald-600 text-white shadow-sm shadow-emerald-950/20 dark:bg-emerald-500"><MemoryStick className="size-6" aria-hidden="true" /></span>
            <div>
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">MineWiki 小工具</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-fd-foreground sm:text-4xl">服务器内存规划</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-fd-muted-foreground sm:text-base">根据机器总内存和服务端负载给出保守的 JVM 内存参数。它不会代替性能监控，但能帮你避开一开始就分配过多内存的常见错误。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:py-12">
        <section className="rounded-2xl border border-fd-border bg-fd-card p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-2"><Cpu className="size-5 text-emerald-600 dark:text-emerald-300" aria-hidden="true" /><h2 className="text-lg font-semibold text-fd-foreground">机器与负载</h2></div>
          <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">只选择你确定的配置。这里的建议会优先为操作系统和其他程序预留余量。</p>

          <label className="mt-6 block">
            <span className="text-sm font-semibold text-fd-foreground">机器总内存</span>
            <select value={totalMemory} onChange={(event) => setTotalMemory(Number(event.target.value))} className="mt-2 h-10 w-full rounded-lg border border-fd-border bg-fd-background px-3 text-sm text-fd-foreground outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20">
              {totalMemoryOptions.map((memory) => <option key={memory} value={memory}>{memory} GB</option>)}
            </select>
          </label>

          <fieldset className="mt-6">
            <legend className="text-sm font-semibold text-fd-foreground">服务端负载</legend>
            <div className="mt-2 space-y-2">
              {(Object.keys(workloadDetails) as Workload[]).map((item) => (
                <button key={item} type="button" onClick={() => setWorkload(item)} aria-pressed={workload === item} className={`w-full rounded-xl border p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${workload === item ? 'border-emerald-500 bg-emerald-500/10' : 'border-fd-border bg-fd-background hover:bg-fd-accent'}`}>
                  <span className="block text-sm font-semibold text-fd-foreground">{workloadDetails[item].title}</span>
                  <span className="mt-1 block text-xs leading-5 text-fd-muted-foreground">{workloadDetails[item].description}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-fd-border bg-fd-background p-3.5">
            <input type="checkbox" checked={runsOnDesktop} onChange={(event) => setRunsOnDesktop(event.target.checked)} className="mt-0.5 size-4 accent-emerald-600" />
            <span><span className="block text-sm font-semibold text-fd-foreground">同一台电脑还要玩游戏或做其他事情</span><span className="mt-1 block text-xs leading-5 text-fd-muted-foreground">勾选后会额外为客户端、浏览器和系统桌面留出 1 GB 余量。</span></span>
          </label>
        </section>

        <aside className="rounded-2xl border border-fd-border bg-fd-card p-5 shadow-sm sm:p-6">
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">保守建议</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-fd-foreground">给服务端分配最多 {formatMemory(plan.max)}</h2>
          <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">预计为系统和其他程序保留 {formatMemory(plan.reserve)}，剩余可分配空间约 {formatMemory(plan.available)}。如果服务器开始卡顿，应先检查插件、实体和视距，而不是盲目增加内存。</p>

          <div className="mt-6 rounded-xl bg-[#0b1220] p-4 text-slate-100">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">JVM 参数</p>
            <code className="mt-2 block break-all font-mono text-sm leading-6">{jvmArgs}</code>
          </div>
          <button type="button" onClick={copyArgs} className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-500 dark:hover:bg-emerald-400">
            {copied ? <Check className="size-4" aria-hidden="true" /> : <Clipboard className="size-4" aria-hidden="true" />}
            {copied ? '已复制参数' : '复制 JVM 参数'}
          </button>

          <div className="mt-6 flex gap-3 rounded-xl border border-amber-500/30 bg-amber-500/8 p-3.5 text-sm leading-6 text-amber-950 dark:text-amber-100"><Info className="mt-0.5 size-4 shrink-0 text-amber-700 dark:text-amber-300" aria-hidden="true" /><p>Java 堆内存不是越大越好。`-Xmx` 不要等于机器总内存；留下余量比避免崩溃更重要。</p></div>
          <Link href="/tools/start-script" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200">前往启动脚本生成器使用这些参数 →</Link>
        </aside>
      </section>
    </main>
  );
}
