
export const calculateProductPrice = (product) => {
    const price = Math.round(product?.price || 0);
    const discount = product?.discountPercentage ? Math.round(product.discountPercentage) : 0;
    const finalPrice = Math.round(price - (price * discount) / 100);

    return { price, discount, finalPrice };
};