module.exports = {
  pathPrefix: '/TIL',
  siteMetadata: {
    title: `TIL`,
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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-163574982-1`,
        head: true,
        anonymize: true,
      },
    },
  ],
}
