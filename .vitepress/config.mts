import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Metastack Help Center",
  appearance: 'force-auto',
  description: "Find valuable articles, guides and FAQ.",
  head: [['link', { rel: 'icon', href: '/favicon.ico'}]],
  themeConfig: {
    search: {
      provider: 'local',
    },
    logo: '/logo.svg',
    siteTitle: false,
    sidebar: [
      {
        text: 'Table of contents',
        items: [
          { text: 'Strategies', link: '/strategies' },
          { text: 'Nades', link: '/nades' },
        ]
      }
    ],
  }
})
