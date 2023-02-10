import get from 'lodash/get';

export const getProductPrice = (product, productVariant) => {
  const variant =
    (productVariant && productVariant.productVariantId !== undefined
      ? productVariant
      : undefined) ||
    get(product, 'defaultProductVariant') ||
    product;
  const originPrice = get(variant, 'price.originRetailPrice');
  const flashSaleVariant =
    get(variant, 'flashSaleProductVariant') || get(variant, 'flashSaleProduct');
  const price = get(flashSaleVariant || variant, 'price.retailPrice');
  const discountPercent =
    originPrice > 0
      ? Math.floor(((originPrice - price) * 100) / originPrice)
      : 0;
  return {
    price,
    originPrice,
    discountPercent,
  };
};

export const normalizePhoneNumber = phone => {
  if (!phone) return '+84';
  if (phone.startsWith('84')) {
    return phone.replace('84', '0');
  }
  if (phone.startsWith('+84')) {
    return phone.replace('+84', '0');
  }
  return phone;
};

export function shuffle(inputArray) {
  const outputArray = [...inputArray];
  for (let i = outputArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [outputArray[i], outputArray[j]] = [outputArray[j], outputArray[i]];
  }
  return outputArray;
}
