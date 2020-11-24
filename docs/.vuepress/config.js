module.exports = {
  title: "distortions.",
  description: "site description",
  locales: {
    "/": {
      lang: "en",
    },
  },

  head: [
      ['link', {rel: 'shortcut icon', href: '/resources/favicon.png'}],
      ['link', {rel: 'apple-touch-icon', href: '/resources/touchicon-180.png'}],
  ],

  themeConfig: {
    articlesNames: "series"
  },

  markdown: {
    anchor: {
      permalink: false,
    }
  },

  plugins: [
    'vuepress-plugin-typescript',
    [
      "vuepress-plugin-container",
      {
        type: 'intro',
        before: '<div class="l-page__intro">',
        after: '</div>',
      },
    ],
    [
      "vuepress-plugin-container",
      {
        type: 'vimeo',
        before: info => `<Vimeo src="${info}" >`,
        after: '</Vimeo>',
      },

    ]

  ],
}

