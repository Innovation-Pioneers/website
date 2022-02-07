
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

export default (...path) => path.join('.').split('.')
  .reduce((a, c) => (a && a[c] ? a[c] : null), useContext(ThemeContext));
