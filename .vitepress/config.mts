import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Metastack Help Center",
  appearance: 'force-dark',
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
        text: 'Getting Started',
        collapsible: true,
        items: [
          { text: 'What is Metastack?', link: '/getting-started/what-is' },
          { text: 'Creating an Account', link: '/getting-started/account' },
          { text: 'Navigating the Homepage', link: '/getting-started/home' },
          { text: 'Team vs. Personal Workspaces', link: '/getting-started/workspaces' },
          { text: 'How Statuses Work', link: '/getting-started/statuses' },
	  { text: 'Collaborative Content Edit', link: '/getting-started/collaborative-content-edit'},
        ]
      },
      {
        text: 'Core Features',
        collapsible: true,
        items: [
          { text: 'Lineups', link: '/features/lineups' },
          { text: 'Playbook', link: '/features/playbook' },
          { text: 'Roles', link: '/features/roles' },
          { text: 'Tables', link: '/features/tables' },
          { text: 'Callouts', link: '/features/callouts' },
          { text: 'Keywords', link: '/features/keywords' },
        ]
      },
      {
        text: 'Team & Member Management',
        collapsible: true,
        items: [
          { text: 'Team Profile', link: '/team/team-profile' },
          { text: 'Members', link: '/team/members' },
          { text: 'Permissions', link: '/team/permissions' },
        ]
      },
      {
        text: 'Personalization & Settings',
        collapsible: true,
        items: [
          { text: 'Profile', link: '/settings/profile' },
          { text: 'Profile Settings', link: '/settings/preferences' },
        ]
      },
      {
        text: 'Metastack Content Library',
        collapsible: true,
        items: [
          { text: 'Sharing', link: '/metastack/sharing' },
          { text: 'Import', link: '/metastack/import' },
          { text: 'Submissions', link: '/metastack/submissions' },
          { text: 'Metapoints', link: '/metastack/metapoints' },
        ]
      },
      {
        text: 'Changelog',
        collapsible: true,
        items: [
          { text: 'Update Notes', link: '/features/updates' },
        ]
      },
      {
        text: 'FAQs & Troubleshooting',
        collapsible: true,
        items: [
          { text: 'Common Issues', link: 'https://discord.gg/metastack' },
          { text: 'Contact Support', link: 'https://discord.gg/metastack' },
          { text: 'Feedback & Requests', link: 'https://discord.gg/metastack' },
        ]
      },
    ]
  }
})
