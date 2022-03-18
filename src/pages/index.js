import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/Layout';
import Pages from '../components/Pages';

function IndexPage() {
  const {
    markdownRemark,
    allShopifyProduct,
    allMarkdownRemark,
    settings: markdownRemarkSettings,
  } = useStaticQuery(graphql`
    query arPage {
      markdownRemark (fileAbsolutePath: {regex: "/dictionary/ar.md/"}) {
        frontmatter {
          navigation {
            type
            name
            path
          }
          deals {
            title
            text
          }
          footer {
            links {
              text
              link
            }
            payment {
              name
              path
            }
            social {
              text
              name
              link
            }
            copyright
          }
        }
      }
      settings: markdownRemark (
        fileAbsolutePath: {regex: "/dictionary/settings/ar/ar.md/"}
      ) {
        frontmatter {
          buttons {
            addToCart
            checkout
            getTheDeal
            total
            watchVideo
            watchVideoIcon
            deals
          }
          texts {
            remaining
            sold
            soldOut
          }
        }
      }
      allShopifyProduct {
        edges {
          node {
            id
            variants {
              sku
              id
              shopifyId
              inventoryQuantity
            }
            priceRangeV2 {
              maxVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
      allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/dictionary/products/ar/" } }
          sort: { fields: frontmatter___sort }
        ) {
        edges {
          node {
            frontmatter {
              sku
              stock
              color
              cover {
                image {
                  childImageSharp {
                    gatsbyImageData(
                      layout: FULL_WIDTH,
                      placeholder: BLURRED
                    )
                  }
                }
                title
                text
              }
              introduction {
                introLine
                label
                title
                subtitle
                text
                image {
                  childImageSharp {
                    gatsbyImageData(
                      layout: FULL_WIDTH,
                      placeholder: BLURRED
                    )
                  }
                }
              }
              features {
                title
                subtitle
                text
                image {
                  childImageSharp {
                    gatsbyImageData(
                      layout: FULL_WIDTH,
                      placeholder: BLURRED
                    )
                  }
                }
              }
              slider {
                title
                text
              }
              highlights {
                type
                image {
                  childImageSharp {
                    gatsbyImageData(
                      layout: FULL_WIDTH,
                      placeholder: BLURRED
                    )
                  }
                }
              }
              store {
                title
                text
                items {
                  title
                  subtitle
                  image {
                    childImageSharp {
                      gatsbyImageData(
                        layout: FULL_WIDTH,
                        placeholder: BLURRED
                      )
                    }
                  }
                  description
                }
              }
              description {
                title
                subtitle
                text
                image {
                  childImageSharp {
                    gatsbyImageData(
                      layout: FULL_WIDTH,
                      placeholder: BLURRED
                    )
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const product = allShopifyProduct.edges;
  const productData = allMarkdownRemark.edges
  .filter(({ node: { frontmatter: { sku } } }) => sku !== 'DO-NOT-DELETE');
  const pageData = markdownRemark.frontmatter;
  const settings = markdownRemarkSettings.frontmatter;

  return (
    <Layout lang="ar" product={product}>
      <Pages
        data={{ product, productData, pageData, settings }}
        className="rtl"
        lang="ar"
      />
    </Layout>
  );
}

export default IndexPage;
