import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/Layout';
import Pages from '../components/Pages';

function IndexPage() {
  const {
    markdownRemark,
    allShopifyProduct,
    allMarkdownRemark,
  } = useStaticQuery(graphql`
    query arPage {
      markdownRemark (fileAbsolutePath: {regex: "/dictionary/ar.md/"}) {
        frontmatter {
          navigation {
            type
            name
            path
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
                button
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
                video
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
                video
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
                video
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
              buyButton {
                text
              }
              tutorialButton {
                text
                icon
              }
              productQuantity {
                sold
                remaining
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

  return (
    <Layout lang="ar" product={product}>
      <Pages
        data={{ product, productData, pageData }}
        className="rtl"
        lang="ar"
      />
    </Layout>
  );
}

export default IndexPage;
