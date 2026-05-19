import React, {useState} from 'react';
import "./productDetailInfo.scss"
import ProductRating from "@components/productCard/productRating/index.js";
import ProductPriceRow from "@components/productCard/productPriceRow/index.js";
import QuantitySelector from "@components/productDetailPage/quantitySelector/index.js";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {calculateProductPrice} from "@utils/price.js";
import {addProductToCart} from "@store/slices/cartSlice.js";


const ProductDetailInfo = ({product}) => {

    if (!product) return null;
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const cartItems = useSelector((state) => state.cart.items);
    const { price, discount, finalPrice } = calculateProductPrice(product);
    const isInStock = product?.availabilityStatus !== 'Out of Stock';
    const stockAmount = product?.stock || 0;
    const productInCart = cartItems.find(item => item.id === product.id);
    const quantityInCart = productInCart ? productInCart.quantity : 0;
    const availableToAdd = stockAmount - quantityInCart;

    const handleIncrement = () => {
        if (quantity < availableToAdd) {
            setQuantity(prev => prev + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleAddProductToCart = () => {
        const payload = {
            id: product.id,
            title: product.title,
            price: finalPrice,
            quantity: quantity,
            image: product.images[0],
            brand: product.brand,
            availabilityStatus: product.availabilityStatus,
            stockAmount: product.stock
        };
        dispatch(addProductToCart(payload));
    };

    return (
        <div className="productDetail_info">
            <h2>{product.title}</h2>
            <p className="productDetail_brand">Brand: {product.brand}</p>
            <div className="productRating_box">
                <ProductRating rating={product.rating}/>
                <div className="productCard_rating">
                    {product.rating} / 5
                </div>
            </div>
            <div className="productPriceRow">
                <ProductPriceRow price={price}
                                 discount={discount}
                                 finalPrice={finalPrice}/>
            </div>
            <div>
                <div className="section_line"></div>
                <p className="productDetail_description">{product.description}</p>
                <div className="section_line"></div>
            </div>
            <div className={product.availabilityStatus === 'In Stock' ? 'productDetailPage_status_block' : ''}>
                <span>Status: </span>
                <span className="productDetailPage_status">{product.availabilityStatus} </span>
            </div>
            <div className="productDetailPage_buttons_block">
                <QuantitySelector quantity={quantity}
                                  onIncrement={handleIncrement}
                                  onDecrement={handleDecrement}
                                  isMinusDisabled={!isInStock || quantity <= 1}
                                  isPlusDisabled={!isInStock || quantity >= availableToAdd}
                                  isInStock={isInStock}/>

                <Button className="productDetailPage_button_addToCart"
                        disabled={!isInStock || availableToAdd <= 0 || quantity > availableToAdd}
                        onClick={handleAddProductToCart}>
                    {availableToAdd <= 0 ? 'Limit reached' : 'Add to Cart'}
                </Button>
            </div>
        </div>
    );
};
export default ProductDetailInfo;