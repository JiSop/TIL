module.exports = {
  pathPrefix: '/TIL',
  siteMetadata: {
    title: `Things I've Learned`,
    description: `청소를 안하면 새로운 우주가 탄생한다.`,
    author: 'JiSop',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-code-notes',
      options: {
        contentPath: 'notes',
        basePath: '/',
        showThemeInfo: false,
        showDescriptionInSidebar: true,
      },
    },
  ],
}