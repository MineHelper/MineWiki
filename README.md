# MineWiki

[![Website](https://img.shields.io/badge/网站-minewiki.top-39a845?style=flat-square)](https://minewiki.top)
[![Contributing](https://img.shields.io/badge/参与贡献-投稿指南-2f81f7?style=flat-square)](./CONTRIBUTING.md)

**MineWiki** 是一个面向 Minecraft Java 版服务器管理员的中文教程文档站。项目希望把从首次开服、服务端选型、配置与网络联机，到插件、模组服、备份和故障处理的常见问题，整理成可按步骤完成、能回查来源的实用文档。

> 访问网站：[minewiki.top](https://minewiki.top)。如果你发现内容过时、操作不清楚或缺少高频场景，欢迎通过 Issue 或 Pull Request 一起完善。

## 你可以在这里找到什么

| 内容方向 | 适合解决的问题 |
| --- | --- |
| 从这里开始 | 选择服务端类型、准备 Java 与硬件、完成首次启动与开放前检查。 |
| 联机与网络 | 局域网与公网联机、端口、域名、SRV 记录和 Velocity 多子服代理。 |
| 插件与配置 | `server.properties`、白名单、权限组、玩法规则、资源包与数据包。 |
| 维护与备份 | 日常巡检、日志定位、更新回滚、迁移与可恢复的备份流程。 |
| 模组服与常见问题 | 加载器兼容、客户端同步、模组排错，以及权限和世界数据异常处理。 |
| 常用工具 | 启动脚本生成、内存规划和 `server.properties` 配置生成。 |

## 本地运行

本项目基于 [Next.js](https://nextjs.org/) 与 [Fumadocs](https://fumadocs.dev/) 构建。建议使用与部署环境一致的 Node.js LTS 版本，并通过 `npm ci` 按锁定版本安装依赖。

```bash
git clone https://github.com/MineHelper/MineWiki.git
cd MineWiki
npm ci
npm run dev
```

随后访问 [http://localhost:3000](http://localhost:3000)。常用校验命令如下：

```bash
npm run lint          # ESLint 校验
npm run types:check   # 生成 Next 类型并执行 TypeScript 检查
npm run build         # 生产构建与静态页面生成
```

## 内容目录

| 路径 | 用途 |
| --- | --- |
| `content/docs/` | 教程正文。每篇页面以 `.mdx` 保存。 |
| `content/docs/meta.json` | 顶级章节的展示顺序。 |
| `content/docs/<section>/meta.json` | 对应章节内页面的展示顺序。新增页面必须同步登记。 |
| `src/components/mdx.tsx` | MDX 自定义组件注册入口。 |
| `src/app/tools/` | 面向读者的常用工具页面。 |

正文的 `title` 与 `description` 写在 frontmatter 中。正文从 `##` 开始使用标题层级，避免重复显示与页面标题相同的 H1。对 Paper、Fabric、NeoForge、Minecraft Wiki 等技术事实，应优先引用官方或一手资料，并在文末保留可访问的参考链接。

## 参与内容建设

我们尤其欢迎能帮助读者解决真实问题的教程补充、过期信息修订、命令示例勘误和排错经验整理。提交前请先阅读完整的 [内容投稿指南](./CONTRIBUTING.md)，其中列出了选题范围、目录与 MDX 格式、引用标准、提交步骤和审核清单。

一个简要流程如下：

1. 先搜索现有页面与 Issue，确认主题没有重复，或明确本次补充的范围。
2. Fork 仓库后从 `master` 新建一个语义清楚的分支，例如 `docs/velocity-setup`。
3. 在合适的 `content/docs/<section>/` 中新增或修改 `.mdx`，并同步更新该章节的 `meta.json`。
4. 运行 `npm run lint`、`npm run types:check` 与 `npm run build`，确认没有格式、类型或构建问题。
5. 以英文 Conventional Commits 格式提交，例如 `docs(network): add Velocity deployment guide`，然后发起 Pull Request。

> 文档内容的准确性比篇幅更重要。涉及版本、兼容性、配置默认值、安全风险或数据恢复的说法，请写明适用前提、测试范围和来源；不确定的内容可以先作为问题提出，不要把猜测写成结论。

## 维护者提示

提交涉及站点行为、样式、工具或接口的改动时，请在 Pull Request 中简短说明影响范围、验证方式和可能的回滚方法。若同时修改技术教程，请让代码与文档保持一致，避免读者看到无法执行的步骤。

## 致谢

MineWiki 使用 [Next.js](https://nextjs.org/) 提供应用框架，并使用 [Fumadocs](https://fumadocs.dev/) 组织和呈现 MDX 文档内容。
