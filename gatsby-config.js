module.exports = {
  pathPrefix: '/TIL',
  siteMetadata: {
    title: `청소를 안하면 새로운 우주가 탄생한다`,
    description: `Things I've Learned`,
    author: 'JiSop',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-code-notes',
      options: {
        basePath: '/',
        contentPath: 'notes',
        gitRepoContentPath: 'https://github.com/JiSop/TIL/tree/TIL/',
        showThemeInfo: false,
        showDescriptionInSidebar: true,
        logo: 'https://avatars0.githubusercontent.com/u/23256989'
      },
    },
  ],
}
