module.exports = {
  siteMetadata: {
    title: 'Hitarth Sharma',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    // TODO: `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      // TODO: options: {
      //   plugins: [
      //     {
      //       resolve: `gatsby-remark-images`,
      //       options: {
      //         // It's important to specify the maxWidth (in pixels) of
      //         // the content container as this plugin uses this as the
      //         // base for generating different widths of each image.
      //         maxWidth: 920,
      //         linkImagesToOriginal: false,
      //         showCaptions: true,
      //         wrapperStyle: {
      //           alignSelf: 'center',
      //           margin: '0.5rem, 0',
      //         },
      //       },
      //     },
      //   ],
      // },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
    'gatsby-plugin-react-helmet',
  ],
}
