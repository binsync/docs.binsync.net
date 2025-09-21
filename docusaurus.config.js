// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'BinSync',
  tagline: 'A framework for understanding binaries across tools and analyses',

  // ✅ Favicon must be top-level; path is relative to /static
  favicon: 'img/favicon.ico',

  // Site URL settings
  url: 'https://docs.binsync.net',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/binsync/docs.binsync.net',
          routeBasePath: '/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: { type: ['rss', 'atom'], xslt: true },
          editUrl: 'https://github.com/binsync/docs.binsync.net',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // OpenGraph / social card image is fine here
      image: 'img/favicon.ico',

      navbar: {
        title: 'BinSync',
        logo: {
          alt: 'BinSync',
          src: 'img/logo.svg',
        },
        items: [
          { type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: 'Tutorial' },
          { to: '/blog', label: 'Blog', position: 'left' },
          { href: 'https://github.com/binsync/binsync', label: 'GitHub', position: 'right' },
        ],
      },

      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [{ label: 'Tutorial', to: '/intro' }],
          },
          {
            title: 'Community',
            items: [
              { label: 'Discord', href: 'https://discord.gg/seujzRAwdZ' },
              { label: 'Twitter', href: 'https://twitter.com/mahal0z' },
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'Blog', to: '/blog' },
              { label: 'GitHub', href: 'https://github.com/binsync' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} BinSync.`,
      },

      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
