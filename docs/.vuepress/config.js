module.exports = {
  title: "distortions.",
  description: "site description",
  locales: {
    "/": {
      lang: "en",
    },
  },

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

