module.exports = {
  title: "techno sphère",
  description: "site description",
  locales: {
    "/": {
      lang: "fr-FR",
    },
  },

  markdown: {
    anchor: {
      permalink: true,
      permalinkSymbol: "",
    }
  },

  plugins: [
    [
      'vuepress-plugin-typescript',
      {
        tsLoaderOptions: {
          // All options of ts-loader
        },
      },
    ],
  ],
}
