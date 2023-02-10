export const currencyFormat = str => {
  let t = str ? String(str) : undefined;
  let sign = '';
  if (t && t.startsWith('-')) {
    sign = '-';
    t = t.substring(1);
  }
  return t
    ? `${sign}${String(t).replace(/(.)(?=(\d{3})+$)/g, '$1,')} ₫`
    : '0 ₫';
};

const numberFormat = str => {
  let t = str ? String(str) : undefined;
  let sign = '';
  if (t && t.startsWith('-')) {
    sign = '-';
    t = t.substring(1);
  }
  return t ? `${sign}${String(t).replace(/(.)(?=(\d{3})+$)/g, '$1,')}` : '0';
};

function phoneNumberFormat(phoneNumberString) {
  const cleaned = `${phoneNumberString}`.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{2})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]} ${match[3]} ${match[4]}`;
  }
  return phoneNumberString;
}

export { numberFormat, phoneNumberFormat };
