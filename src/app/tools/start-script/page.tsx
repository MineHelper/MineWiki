'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Check,
  Clipboard,
  Download,
  FileCode2,
  Info,
  ServerCog,
  Terminal,
} from 'lucide-react';

type Platform = 'windows' | 'linux';
type ServerKind = 'paper' | 'purpur' | 'vanilla' | 'custom';

const memoryOptions = ['1G', '2G', '3G', '4G', '6G', '8G', '12G', '16G', '24G', '32G'];

const serverDefaults: Record<ServerKind, string> = {
  paper: 'paper-1.21.1-131.jar',
  purpur: 'purpur-1.21.1-2325.jar',
  vanilla: 'server.jar',
  custom: 'server.jar',
};

function withoutNewlines(value: string) {
  return value.replace(/[\r\n]/g, '').trim();
}

function createScript({
  platform,
  javaCommand,
  jarName,
  minMemory,
  maxMemory,
}: {
  platform: Platform;
  javaCommand: string;
  jarName: string;
  minMemory: string;
  maxMemory: string;
}) {
  const java = withoutNewlines(javaCommand) || 'java';
  const jar = withoutNewlines(jarName) || 'server.jar';

  if (platform === 'windows') {
    return `@echo off
setlocal

title MineWiki Minecraft Server
set "JAVA=${java}"
set "JAR=${jar}"
set "MIN_RAM=${minMemory}"
set "MAX_RAM=${maxMemory}"

echo Starting %JAR% with %MIN_RAM% - %MAX_RAM% memory...
"%JAVA%" -Xms%MIN_RAM% -Xmx%MAX_RAM% -jar "%JAR%" nogui

echo.
echo Server stopped. Press any key to close this window.
pause > nul`;
  }

  return `#!/usr/bin/env bash
set -euo pipefail

JAVA="${java}"
JAR="${jar}"
MIN_RAM="${minMemory}"
MAX_RAM="${maxMemory}"

echo "Starting $JAR with $MIN_RAM - $MAX_RAM memory..."
exec "$JAVA" -Xms"$MIN_RAM" -Xmx"$MAX_RAM" -jar "$JAR" nogui`;
}

export default function StartScriptGeneratorPage() {
  const [platform, setPlatform] = useState<Platform>('windows');
  const [serverKind, setServerKind] = useState<ServerKind>('paper');
  const [jarName, setJarName] = useState(serverDefaults.paper);
  const [javaCommand, setJavaCommand] = useState('');
  const [minMemory, setMinMemory] = useState('2G');
  const [maxMemory, setMaxMemory] = useState('4G');
  const [copied, setCopied] = useState(false);

  const script = useMemo(
    () => createScript({ platform, javaCommand, jarName, minMemory, maxMemory }),
    [javaCommand, jarName, maxMemory, minMemory, platform],
  );

  const extension = platform === 'windows' ? 'bat' : 'sh';
  const fileName = `start.${extension}`;

  function changeServerKind(kind: ServerKind) {
    setServerKind(kind);
    setJarName(serverDefaults[kind]);
  }

  function changeMaxMemory(value: string) {
    const nextIndex = memoryOptions.indexOf(value);
    const currentMinIndex = memoryOptions.indexOf(minMemory);
    if (nextIndex < currentMinIndex) setMinMemory(value);
    setMaxMemory(value);
  }

  async function copyScript() {
    try {
      await navigator.clipboard.writeText(script);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function downloadScript() {
    const content = platform === 'windows' ? script.replace(/\n/g, '\r\n') : `${script}\n`;
    const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-full bg-fd-background">
      <section className="border-b border-fd-border bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.14),transparent_48%)]">
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-12 sm:px-8 sm:pb-14 sm:pt-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-fd-muted-foreground transition hover:text-emerald-700 dark:hover:text-emerald-300"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            返回首页
          </Link>
          <div className="mt-7 flex max-w-3xl items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-emerald-600 text-white shadow-sm shadow-emerald-950/20 dark:bg-emerald-500">
              <FileCode2 className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">MineWiki 小工具</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-fd-foreground sm:text-4xl">启动脚本生成器</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-fd-muted-foreground sm:text-base">
                填写 jar 文件名和内存配置，即可生成适用于 Windows 或 Linux 的启动脚本。生成过程完全在浏览器中完成，不会上传你的配置。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:py-12">
        <form className="rounded-2xl border border-fd-border bg-fd-card p-5 shadow-sm sm:p-6" onSubmit={(event) => event.preventDefault()}>
          <div className="flex items-center gap-2">
            <ServerCog className="size-5 text-emerald-600 dark:text-emerald-300" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-fd-foreground">服务器配置</h2>
          </div>
          <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">脚本会使用 `nogui` 模式启动，适合大多数服务端环境。</p>

          <fieldset className="mt-6">
            <legend className="text-sm font-semibold text-fd-foreground">运行系统</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <OptionButton active={platform === 'windows'} onClick={() => setPlatform('windows')} label="Windows" detail="生成 .bat" />
              <OptionButton active={platform === 'linux'} onClick={() => setPlatform('linux')} label="Linux" detail="生成 .sh" />
            </div>
          </fieldset>

          <label className="mt-6 block">
            <span className="text-sm font-semibold text-fd-foreground">服务端类型</span>
            <select
              value={serverKind}
              onChange={(event) => changeServerKind(event.target.value as ServerKind)}
              className="mt-2 h-10 w-full rounded-lg border border-fd-border bg-fd-background px-3 text-sm text-fd-foreground outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="paper">Paper</option>
              <option value="purpur">Purpur</option>
              <option value="vanilla">原版服务端</option>
              <option value="custom">其他 / 自定义</option>
            </select>
          </label>

          <label className="mt-5 block">
            <span className="text-sm font-semibold text-fd-foreground">jar 文件名</span>
            <input
              value={jarName}
              onChange={(event) => setJarName(event.target.value)}
              spellCheck="false"
              placeholder="paper-1.21.1-131.jar"
              className="mt-2 h-10 w-full rounded-lg border border-fd-border bg-fd-background px-3 font-mono text-sm text-fd-foreground outline-none transition placeholder:text-fd-muted-foreground focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
            <span className="mt-1.5 block text-xs leading-5 text-fd-muted-foreground">必须与服务器文件夹中的 jar 名称完全一致，包括版本号。</span>
          </label>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <label>
              <span className="text-sm font-semibold text-fd-foreground">初始内存</span>
              <select
                value={minMemory}
                onChange={(event) => setMinMemory(event.target.value)}
                className="mt-2 h-10 w-full rounded-lg border border-fd-border bg-fd-background px-3 text-sm text-fd-foreground outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              >
                {memoryOptions.slice(0, memoryOptions.indexOf(maxMemory) + 1).map((value) => <option key={value}>{value}</option>)}
              </select>
            </label>
            <label>
              <span className="text-sm font-semibold text-fd-foreground">最大内存</span>
              <select
                value={maxMemory}
                onChange={(event) => changeMaxMemory(event.target.value)}
                className="mt-2 h-10 w-full rounded-lg border border-fd-border bg-fd-background px-3 text-sm text-fd-foreground outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              >
                {memoryOptions.slice(memoryOptions.indexOf(minMemory)).map((value) => <option key={value}>{value}</option>)}
              </select>
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-sm font-semibold text-fd-foreground">Java 命令或路径 <span className="font-normal text-fd-muted-foreground">（可选）</span></span>
            <input
              value={javaCommand}
              onChange={(event) => setJavaCommand(event.target.value)}
              spellCheck="false"
              placeholder={platform === 'windows' ? '留空则使用 java；也可填 C:\\Program Files\\Java\\bin\\java.exe' : '留空则使用 java；也可填 /usr/bin/java'}
              className="mt-2 h-10 w-full rounded-lg border border-fd-border bg-fd-background px-3 font-mono text-sm text-fd-foreground outline-none transition placeholder:text-fd-muted-foreground focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </label>

          <div className="mt-6 flex gap-3 rounded-xl border border-amber-500/30 bg-amber-500/8 p-3.5 text-sm leading-6 text-amber-950 dark:text-amber-100">
            <Info className="mt-0.5 size-4 shrink-0 text-amber-700 dark:text-amber-300" aria-hidden="true" />
            <p>请确认最大内存不要超过机器可用内存，并为系统和其他程序预留空间。首次启动后仍需在 `eula.txt` 中同意用户协议。</p>
          </div>
        </form>

        <section className="overflow-hidden rounded-2xl border border-fd-border bg-fd-card shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-fd-border bg-fd-muted/50 px-5 py-4">
            <div className="flex items-center gap-2">
              <Terminal className="size-5 text-emerald-600 dark:text-emerald-300" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-semibold text-fd-foreground">{fileName}</h2>
                <p className="text-xs text-fd-muted-foreground">实时生成，可直接保存到服务器文件夹。</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copyScript}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-fd-border bg-fd-background px-3 text-sm font-semibold text-fd-foreground transition hover:bg-fd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                {copied ? <Check className="size-4 text-emerald-600 dark:text-emerald-300" aria-hidden="true" /> : <Clipboard className="size-4" aria-hidden="true" />}
                {copied ? '已复制' : '复制'}
              </button>
              <button
                type="button"
                onClick={downloadScript}
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-emerald-600 px-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-500 dark:hover:bg-emerald-400"
              >
                <Download className="size-4" aria-hidden="true" />
                下载
              </button>
            </div>
          </div>
          <pre className="m-0 max-h-[38rem] overflow-auto bg-[#0b1220] p-5 text-sm leading-6 text-slate-100 sm:p-6"><code>{script}</code></pre>
          <div className="border-t border-fd-border px-5 py-3 text-xs leading-5 text-fd-muted-foreground">
            {platform === 'linux' ? '下载后执行 chmod +x start.sh，再用 ./start.sh 启动。' : '将 start.bat 与服务端 jar 放在同一文件夹，双击即可启动。'}
          </div>
        </section>
      </section>
    </main>
  );
}

function OptionButton({ active, onClick, label, detail }: { active: boolean; onClick: () => void; label: string; detail: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-lg border px-3 py-2.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${active ? 'border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100' : 'border-fd-border bg-fd-background text-fd-muted-foreground hover:bg-fd-accent'}`}
    >
      <span className="block text-sm font-semibold">{label}</span>
      <span className="mt-0.5 block text-xs opacity-75">{detail}</span>
    </button>
  );
}
