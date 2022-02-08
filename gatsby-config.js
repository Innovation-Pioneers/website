require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Lag6a',
    siteUrl: 'https://www.lag6a.com',
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/`,
        name: 'src',
      },
    }, {
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
  ],
};
