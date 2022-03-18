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
    query enPage {
      markdownRemark (fileAbsolutePath: {regex: "/dictionary/en.md/"}) {
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
        fileAbsolutePath: {regex: "/dictionary/settings/en/en.md/"}
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
              id
              shopifyId
              sku
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
          filter: { fileAbsolutePath: { regex: "/dictionary/products/en/" } }
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
  const productData = allMarkdownRemark.edges;
  const pageData = markdownRemark.frontmatter;
  const settings = markdownRemarkSettings.frontmatter;

  return (
    <Layout lang="en" product={product}>
      <Pages
        data={{ product, productData, pageData, settings }}
        lang="en"
      />
    </Layout>
  );
}

export default IndexPage;
