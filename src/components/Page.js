import React from 'react';
import styled, { css } from 'styled-components';

import Navigation from './Navigation';
import Introduction from './Sections/Introduction';
import Features from './Sections/Features';
import Gallery from './Sections/Gallery';
import InStore from './Sections/InStore';
import Description from './Sections/Description';
import AllDeals from './Sections/AllDeals';
import Footer from './Footer';

const Wrapper = styled.div`
  width: 100vw;
  transform-origin: top center;
  backface-visibility: hidden;

  filter: blur(20px);
  transform: scale(1.5);
  ${({ active, clicked }) => (active
    ? css`
      animation:
        activate 2500ms cubic-bezier(0.785, 0.135, 0.000, 1.000) forwards;
    ` : clicked && css`
      animation:
        deactivate 800ms forwards;
    `)};

  @keyframes activate {
    0% {
      filter: blur(20px);
      transform: scale(1.5);
    }
    100% {
      filter: blur(0);
      transform: scale(1);
    }
  }

  @keyframes deactivate {
    0% {
      filter: blur(0);
      transform: scale(1);
    }
    100% {
      filter: blur(20px);
      transform: scale(1.5);
    }
  }

  pointer-events: ${({ active }) => (active ? 'initial' : 'none')};
`;

function Page({
  data: {
    pageData,
    productData,
    product,
    settings,
  },
  className,
  lang,
  active,
  clicked,
  setActiveCoverScreen,
}) {
  const BUTTON_CHECKOUT = {
    text: settings.buttons.addToCart,
    textSoldOut: settings.texts.soldOut,
    price: product[0].node.priceRangeV2.maxVariantPrice.amount,
    currency: product[0].node.priceRangeV2.maxVariantPrice.currencyCode,
    variantId: product[0].node.variants[0].shopifyId,
  };
  const BUTTON_CHECKOUT_CART = {
    text: settings.buttons.checkout,
    textTotal: settings.buttons.total,
    price: product[0].node.priceRangeV2.maxVariantPrice.amount,
    currency: product[0].node.priceRangeV2.maxVariantPrice.currencyCode,
    variantId: product[0].node.variants[0].shopifyId,
  };
  const availableQuantity = product[0].node.variants[0].inventoryQuantity;
  const { stock } = productData;

  return (
    <Wrapper active={active} clicked={clicked}>
      <Navigation
        social={pageData.footer.social}
        items={pageData.navigation}
        buyButton={BUTTON_CHECKOUT_CART}
        lang={lang}
        className={className}
        setActiveCoverScreen={setActiveCoverScreen}
      />
      <Introduction
        data={productData.introduction}
        buyButton={BUTTON_CHECKOUT}
        tutorialButton={{
          watchVideo: settings.buttons.watchVideo,
          watchVideoIcon: settings.buttons.watchVideoIcon,
        }}
        className={className}
        lang={lang}
        availableQuantity={availableQuantity}
        textSold={settings.texts.sold}
        textRemaining={settings.texts.remaining}
        productStock={stock}
      />
      <Features
        data={productData.features}
        slides={productData.slider}
        className={className}
      />
      <Gallery gallery={productData.highlights} lang={lang} />
      <InStore
        slides={productData.slides}
        store={productData.store}
        testimonials={productData.testimonials}
        lang={lang}
        className={className}
      />
      <Description
        data={productData.description}
        buyButton={BUTTON_CHECKOUT}
        className={className}
        availableQuantity={availableQuantity}
      />
      <AllDeals
        title={pageData.deals.title}
        text={pageData.deals.text}
        buttonText={settings.buttons.deals}
        setActiveCoverScreen={setActiveCoverScreen}
        lang={lang}
      />
      <Footer
        data={pageData.footer}
        className={className}
      />
    </Wrapper>
  );
}

export default Page;
