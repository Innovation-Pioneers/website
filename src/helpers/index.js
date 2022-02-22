const decimalize = (number, decimalSeparator = '.', precision = 2) => {
  const thousandSeparator = decimalSeparator === '.' ? ',' : '.';
  const string = number.toFixed(precision);
  const [integer, decimal] = string.split('.');
  return [
    integer
    .split('')
    .reverse()
    .join('')
    .replace(/(.{3})/g, `$1${thousandSeparator}`)
    .replace(new RegExp(`\\${thousandSeparator}$`, 'g'), '')
    .split('')
    .reverse()
    .join(''),
    decimal,
  ]
  .filter((value) => value && value.length)
  .join(decimalSeparator);
};

export {
  // eslint-disable-next-line import/prefer-default-export
  decimalize,
};
