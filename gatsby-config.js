module.exports = {
  siteMetadata: {
    title: 'Hitarth Sharma',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
    'gatsby-plugin-react-helmet',
  ],
}
