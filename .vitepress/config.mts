import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Metastack Help Center",
  description: "Find valuable articles, guides and FAQ.",
  titleTemplate: 'TEST',
  head: [['link', { rel: 'icon', href: '/favicon.ico'}]],
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: false,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/strategies' }
    ],

    sidebar: [
      {
        text: 'Documentation',
        items: [
          { text: 'Strategies', link: '/strategies' },
          { text: 'Nades', link: '/nades' },
        ]
      }
    ],
  }
})
