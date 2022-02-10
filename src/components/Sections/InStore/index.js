/**
 * InStore
 * -------
 * props:
 *  - data: `[node || array]` **required**
 */

import React from 'react';
import { Element } from 'react-scroll';

import Sitewidth from '../../Sitewidth';
import Store from '../../Store';

function InStore({ store, className, lang }) {
  return (
    <Sitewidth py={[4, 5, 6]}>
      <Element name="where-to-buy" />
      <Store store={store} className={className} lang={lang} />
    </Sitewidth>
  );
}
export default InStore;
