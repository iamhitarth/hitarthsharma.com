# hitarthsharma.com

Made using the default Gatsby starter.

For an overview of the project structure please refer to the [Gatsby documentation - Building with Components](https://www.gatsbyjs.org/docs/building-with-components/).

See it live at [hitarthsharma.com](https://hitarthsharma.com).

## Install

Make sure that you have the Gatsby CLI program installed:

```sh
npm install --global gatsby-cli
```

And run from your CLI:

```sh
gatsby new gatsby-example-site
```

Then you can run it by:

```sh
cd gatsby-example-site
gatsby develop
```

## Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-default)

## Environment variables

Need to set the following environment variables:

- `GATSBY_NOTION_API_BASE_URL` in `env.production`
- `NOTION_CLIENT_SECRET` in `functions/.secret.local`
