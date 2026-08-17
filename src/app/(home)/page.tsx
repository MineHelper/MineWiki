// app/page.tsx
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      {/* 主标题区域 */}
      <div className="mx-auto max-w-3xl px-4 py-20">
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
          <span className="text-green-600 dark:text-green-400">MineWiki</span>
          <br />
          <span className="text-3xl sm:text-4xl lg:text-5xl">新手腐竹的服务器宝典</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
          从零开始，轻松搭建、优化你的 Minecraft 服务器。
          这里汇集了最实用的插件教程、配置指南和问题排查方案。
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/docs"
            className="inline-flex items-center rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow transition-colors hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
          >
            开始阅读文档
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/docs/test"
            className="inline-flex items-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            查看示例页面
          </Link>
        </div>
      </div>

      {/* 特色功能卡片区域 */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 pb-20 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          emoji="📚"
          title="开服教程"
          description="从服务端选择、环境配置到开服细节，一步步带你走进 Minecraft 服务器世界。"
        />
        <FeatureCard
          emoji="🔌"
          title="插件百科"
          description="详细介绍 EssentialsX、LuckPerms 等常用插件的安装、配置与指令。"
        />
        <FeatureCard
          emoji="🚀"
          title="性能优化"
          description="提供服务器优化方案，让你的服务器更流畅，为玩家带来更好的游戏体验。"
        />
        <FeatureCard
          emoji="🛡️"
          title="安全防护"
          description="防崩、防熊、防攻击，了解服务器安全的基础知识与应对策略。"
        />
        <FeatureCard
          emoji="🤖"
          title="AI 助手答疑"
          description="遇到问题？试试右下角的 AI 助手，快速获得针对性的解答和建议。"
        />
        <FeatureCard
          emoji="💬"
          title="社区支持"
          description="如果这里没有找到答案，别忘了去 MCBBS 或 MineBBS 寻求更多帮助。"
        />
      </div>
    </main>
  );
}

// 功能卡片组件
function FeatureCard({ emoji, title, description }: { emoji: string; title: string; description: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white/50 p-6 text-left shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50">
      <div className="mb-3 text-3xl">{emoji}</div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}