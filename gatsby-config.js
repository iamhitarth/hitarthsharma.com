const REPO_ABSOLUTE_PATH = process.cwd()

module.exports = {
  siteMetadata: {
    title: 'Hitarth Sharma',
    url: 'https://hitarthsharma.com',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-tinacms',
      options: {
        // The CMS will be disabled on your production site
        enabled: process.env.NODE_ENV !== 'production',
        sidebar: true,
        plugins: [
          {
            resolve: 'gatsby-tinacms-git',
            options: {
              pathToRepo: REPO_ABSOLUTE_PATH,
              pathToContent: '/',
              defaultCommitMessage: 'Edited from CMS',
              defaultCommitName: 'Hitarth CMS',
              defaultCommitEmail: 'hitarth.sharma12+cms@gmail.com',
              pushOnCommit: true,
              sshKey: process.env.SSH_KEY,
            },
          },
          'gatsby-tinacms-remark',
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-copy-linked-files',
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 920,
              linkImagesToOriginal: false,
              showCaptions: true,
              wrapperStyle: `align-self: center; margin: 0.5rem; text-align: center`,
            },
          },
          {
            resolve: `gatsby-remark-embed-video`,
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              // height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
          },
          `gatsby-plugin-styled-components`,
          {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
              trackingId: `G-TX058LL0CT`,
              head: true,
            },
          },
        ],
      },
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
