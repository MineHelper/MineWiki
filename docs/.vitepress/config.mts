import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MineWiki",
  description: "面向新手玩家和腐竹的 Minecraft 中文教程百科",
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#42b883' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '教程', link: '/markdown-examples' },
      { text: 'API 示例', link: '/api-examples' }
    ],

    sidebar: [
      {
        text: '开始',
        items: [
          { text: 'Markdown 示例', link: '/markdown-examples' },
          { text: 'API 示例', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    outline: {
      label: '目录'
    },

    returnToTop: {
      text: '返回顶部'
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '未找到相关结果',
            resetButtonTitle: '清除查询',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2024 MineWiki 贡献者'
    }
  }
})