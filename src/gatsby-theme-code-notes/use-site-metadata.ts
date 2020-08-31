import { graphql, useStaticQuery } from 'gatsby'

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          gitRepoContentPath
          showDescriptionInSidebar
          logo
          openSearch {
            siteUrl
            siteShortName
          }
        }
      }
    }
  `)

  return data.site.siteMetadata
}
