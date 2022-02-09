require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Lag6a',
    siteUrl: 'https://www.lag6a.com',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'img',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/`,
        name: 'src',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'img',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1024,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-shopify',
      options: {
        password: process.env.SHOPIFY_SHOP_PASSWORD,
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
        shopifyConnections: ['collections'],
      },
    }, {
      resolve: 'gatsby-plugin-i18n',
      options: {
        useLangKeyLayout: false,
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-netlify-cms',
  ],
};
