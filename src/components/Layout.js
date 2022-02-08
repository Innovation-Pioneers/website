/**
 * Layout
 * ------
 * props:
 *  - data: `[node || array]` **required**
 */

import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
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
          siteUrl
        }
      }
    }
  `);

  const [quantity, setQuantity] = useState(1);
  const cart = useMemo(
    () => ({
      quantity,
      setQuantity,
    }),
    [quantity, setQuantity]
  );

  const { title, siteUrl } = data.site.siteMetadata;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content="Lag6a" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Lag6a"
        />
        <meta property="og:image" content="/OGImage.png" />
        <meta property="og:url" content={siteUrl} />
        <meta charSet="utf-8" />
      </Helmet>
      <Quantity.Provider value={cart}>
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
