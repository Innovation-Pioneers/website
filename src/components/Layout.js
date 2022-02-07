/**
 * Layout
 * ------
 * props:
 *  - data: `[node || array]` **required**
 */

import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

import App from './App';
import { Quantity } from './Button/ButtonCheckout';

function Layout({ children, lang }) {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <Helmet>
        <title>{data.site.siteMetadata.title}</title>
        <meta property="og:title" content="Lag6a" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Lag6a"
        />
        <meta property="og:image" content="/OGImage.png" />
        <meta property="og:url" content="https://lag6a.com" />
        <meta charSet="utf-8" />
      </Helmet>
      <Quantity.Provider value={{ quantity, setQuantity }}>
        <App lang={lang}>
          {children}
        </App>
      </Quantity.Provider>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
