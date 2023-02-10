import shortid from 'shortid';

function createOrderItem(product, quantity, productVariant) {
  const itemOrder = {
    orderItemId: shortid.generate(),
    quantity,
    productId: product.productId,
    product,
  };
  if (productVariant) {
    itemOrder.productVariantId = productVariant.productVariantId;
    itemOrder.productVariant = productVariant;
  }
  return itemOrder;
}

export { createOrderItem };
