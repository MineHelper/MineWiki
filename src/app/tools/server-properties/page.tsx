'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowLeft, Check, Clipboard, Download, FileCog, Info, Settings2 } from 'lucide-react';

type GameMode = 'survival' | 'creative' | 'adventure' | 'spectator';
type Difficulty = 'peaceful' | 'easy' | 'normal' | 'hard';

function bool(value: boolean) {
  return value ? 'true' : 'false';
}

export default function ServerPropertiesPage() {
  const [motd, setMotd] = useState('A Minecraft Server');
  const [gameMode, setGameMode] = useState<GameMode>('survival');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [maxPlayers, setMaxPlayers] = useState(10);
  const [pvp, setPvp] = useState(true);
  const [onlineMode, setOnlineMode] = useState(true);
  const [whiteList, setWhiteList] = useState(false);
  const [allowFlight, setAllowFlight] = useState(false);
  const [commandBlocks, setCommandBlocks] = useState(false);
  const [viewDistance, setViewDistance] = useState(10);
  const [simulationDistance, setSimulationDistance] = useState(10);
  const [copied, setCopied] = useState(false);

  const content = useMemo(() => `# MineWiki server.properties generator
# 请在修改前备份原文件，并在保存后重启服务端。

motd=${motd.replace(/[\r\n]/g, ' ')}
gamemode=${gameMode}
difficulty=${difficulty}
max-players=${maxPlayers}
pvp=${bool(pvp)}
online-mode=${bool(onlineMode)}
enforce-whitelist=${bool(whiteList)}
allow-flight=${bool(allowFlight)}
enable-command-block=${bool(commandBlocks)}
view-distance=${viewDistance}
simulation-distance=${simulationDistance}
spawn-protection=16
server-port=25565
`, [allowFlight, commandBlocks, difficulty, gameMode, maxPlayers, motd, onlineMode, pvp, simulationDistance, viewDistance, whiteList]);

  async function copyContent() {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function downloadFile() {
    const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'server.properties';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-full bg-fd-background">
      <section className="border-b border-fd-border bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.13),transparent_46%)]">
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-12 sm:px-8 sm:pb-14 sm:pt-16">
          <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-medium text-fd-muted-foreground transition hover:text-emerald-700 dark:hover:text-emerald-300"><ArrowLeft className="size-4" aria-hidden="true" />返回常用工具</Link>
          <div className="mt-7 flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sky-600 text-white shadow-sm shadow-sky-950/20 dark:bg-sky-500"><FileCog className="size-6" aria-hidden="true" /></span>
            <div>
              <p className="text-sm font-semibold text-sky-700 dark:text-sky-300">MineWiki 小工具</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-fd-foreground sm:text-4xl">server.properties 生成器</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-fd-muted-foreground sm:text-base">选择常见的服务器设置，生成一份可以作为起点的 `server.properties`。它只覆盖常用字段，不会替代你已有的完整配置。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:py-12">
        <form className="rounded-2xl border border-fd-border bg-fd-card p-5 shadow-sm sm:p-6" onSubmit={(event) => event.preventDefault()}>
          <div className="flex items-center gap-2"><Settings2 className="size-5 text-sky-600 dark:text-sky-300" aria-hidden="true" /><h2 className="text-lg font-semibold text-fd-foreground">基础设置</h2></div>
          <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">新手可先使用默认值，等本机稳定启动后再逐项调整。</p>

          <label className="mt-6 block"><span className="text-sm font-semibold text-fd-foreground">服务器描述（MOTD）</span><input value={motd} onChange={(event) => setMotd(event.target.value)} maxLength={120} className="mt-2 h-10 w-full rounded-lg border border-fd-border bg-fd-background px-3 text-sm text-fd-foreground outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20" /></label>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <SelectField label="默认游戏模式" value={gameMode} onChange={(value) => setGameMode(value as GameMode)} options={[['survival', '生存'], ['creative', '创造'], ['adventure', '冒险'], ['spectator', '旁观']]} />
            <SelectField label="游戏难度" value={difficulty} onChange={(value) => setDifficulty(value as Difficulty)} options={[['peaceful', '和平'], ['easy', '简单'], ['normal', '普通'], ['hard', '困难']]} />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <NumberField label="最大人数" value={maxPlayers} min={1} max={200} onChange={setMaxPlayers} />
            <NumberField label="视距" value={viewDistance} min={3} max={32} onChange={setViewDistance} />
            <NumberField label="模拟距离" value={simulationDistance} min={3} max={32} onChange={setSimulationDistance} />
          </div>

          <fieldset className="mt-6"><legend className="text-sm font-semibold text-fd-foreground">规则与联机</legend><div className="mt-2 grid gap-2 sm:grid-cols-2">
            <ToggleCard label="允许 PvP" description="玩家之间可以造成伤害。" checked={pvp} onChange={setPvp} />
            <ToggleCard label="正版验证" description="建议保持开启，验证玩家账号。" checked={onlineMode} onChange={setOnlineMode} />
            <ToggleCard label="启用白名单" description="只允许名单中的玩家加入。" checked={whiteList} onChange={setWhiteList} />
            <ToggleCard label="允许飞行" description="模组或插件服务器常需要开启。" checked={allowFlight} onChange={setAllowFlight} />
            <ToggleCard label="命令方块" description="需要时再开启，避免误用。" checked={commandBlocks} onChange={setCommandBlocks} />
          </div></fieldset>
          <div className="mt-6 flex gap-3 rounded-xl border border-amber-500/30 bg-amber-500/8 p-3.5 text-sm leading-6 text-amber-950 dark:text-amber-100"><Info className="mt-0.5 size-4 shrink-0 text-amber-700 dark:text-amber-300" aria-hidden="true" /><p>请勿在服务端运行时替换配置文件。建议先停止服务端，备份原 `server.properties`，替换后再启动。</p></div>
        </form>

        <section className="overflow-hidden rounded-2xl border border-fd-border bg-fd-card shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-fd-border bg-fd-muted/50 px-5 py-4"><div><h2 className="text-sm font-semibold text-fd-foreground">server.properties</h2><p className="text-xs text-fd-muted-foreground">实时生成的常用配置片段。</p></div><div className="flex gap-2"><button type="button" onClick={copyContent} className="inline-flex h-9 items-center gap-2 rounded-lg border border-fd-border bg-fd-background px-3 text-sm font-semibold text-fd-foreground transition hover:bg-fd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500">{copied ? <Check className="size-4 text-emerald-600" aria-hidden="true" /> : <Clipboard className="size-4" aria-hidden="true" />}{copied ? '已复制' : '复制'}</button><button type="button" onClick={downloadFile} className="inline-flex h-9 items-center gap-2 rounded-lg bg-sky-600 px-3 text-sm font-semibold text-white transition hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:bg-sky-500 dark:hover:bg-sky-400"><Download className="size-4" aria-hidden="true" />下载</button></div></div>
          <pre className="m-0 max-h-[42rem] overflow-auto bg-[#0b1220] p-5 text-sm leading-6 text-slate-100 sm:p-6"><code>{content}</code></pre>
          <div className="border-t border-fd-border px-5 py-3 text-xs leading-5 text-fd-muted-foreground">生成器会保留其他未显示字段的默认策略；请把这份内容作为起点，并按你的服务端版本核对完整配置。</div>
        </section>
      </section>
    </main>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: Array<[string, string]> }) {
  return <label><span className="text-sm font-semibold text-fd-foreground">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-10 w-full rounded-lg border border-fd-border bg-fd-background px-3 text-sm text-fd-foreground outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20">{options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}</select></label>;
}

function NumberField({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) {
  return <label><span className="text-sm font-semibold text-fd-foreground">{label}</span><input type="number" value={value} min={min} max={max} onChange={(event) => onChange(Math.max(min, Math.min(max, Number(event.target.value) || min)))} className="mt-2 h-10 w-full rounded-lg border border-fd-border bg-fd-background px-3 text-sm text-fd-foreground outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20" /></label>;
}

function ToggleCard({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${checked ? 'border-sky-500 bg-sky-500/8' : 'border-fd-border bg-fd-background hover:bg-fd-accent'}`}><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="mt-0.5 size-4 accent-sky-600" /><span><span className="block text-sm font-semibold text-fd-foreground">{label}</span><span className="mt-1 block text-xs leading-5 text-fd-muted-foreground">{description}</span></span></label>;
}
