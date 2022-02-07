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
            social {
              text
              name
              link
            }
            modal {
              name
              text
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
                images {
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
                id
                title
                text
              }
              highlights {
                id
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
              description {
                title
                subtitle
                text
                images {
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
