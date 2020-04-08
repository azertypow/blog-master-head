module.exports = {
  title: "distorsions.",
  description: "site description",
  locales: {
    "/": {
      lang: "fr-FR",
    },
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
        type: 'credit',
        before: '<div class="l-page__credit">',
        after: '</div>',
      },
    ],
    [
      "vuepress-plugin-container",
      {
        type: 'date',
        before: '<div class="l-page__date">',
        after: '</div>',
      },

    ]
  ],
}

