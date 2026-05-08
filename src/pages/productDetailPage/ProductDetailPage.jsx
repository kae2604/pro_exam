import React from 'react';
import {useGetProductByIdQuery} from "@store/api/productsAPI.js";
import {useParams} from "react-router-dom";
import { useState, useEffect } from 'react';
import "./productDetailPage.scss"
import ProductRating from "@components/productCard/productRating";
import ProductPriceRow from "@components/productCard/productPriceRow/index.js";
import { calculateProductPrice } from "@/utils/price";
import { useDispatch } from 'react-redux';
import { addProductToCart } from '@store/slices/cartSlice';
import QuantitySelector from "@components/quantitySelector/index.js";




const ProductDetailPage = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const [mainImage, setMainImage] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const { data: product, isLoading, error } = useGetProductByIdQuery(id);
    console.log("QQQQQQQQQQQQQQQQQQQQ",product);

    useEffect(() => {
        if (product?.images?.length > 0) {
            setMainImage(product.images[0]);
        }
    }, [product]);

    if (isLoading) return <div className="container">Loading...</div>;
    if (error) return <div className="container">Error</div>;
    if (!product) return null;

    const { price, discount, finalPrice } = calculateProductPrice(product);
    const isInStock = product?.availabilityStatus !== 'Out of Stock';
    const stockAmount = product?.stock || 0;

    const handleIncrement = () => {
        if (quantity < stockAmount) {
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
            image: mainImage,
            brand: product.brand,
            availabilityStatus: product.availabilityStatus,
            stockAmount: product.stock
        };
        dispatch(addProductToCart(payload));
    };

    return (
        <div className="container">
            <div className="section_line"></div>
            <div className="productDetailPage_path">Home</div>
            <section className="productDetailPage_container">
                <div className="productDetail_pictures">
                    <div className={`productDetail_pictures_left ${product?.images?.length > 3 ? 'has-scroll' : ''}`}>
                        {product?.images?.map((image, index) => (
                            <img
                                className={`productDetail_pictures_preview ${mainImage === image ? 'active' : ''}`}
                                key={index}
                                src={image}
                                alt="preview"
                                onClick={() => setMainImage(image)}
                            />
                        ))}
                    </div>
                    <div >
                        <img className="productDetail_pictures_right"
                             src={mainImage}
                             alt={product.title}/>
                    </div>
                </div>
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
                                          isPlusDisabled={!isInStock || quantity >= product.stock}
                                          isInStock={isInStock}/>


                        {/*<div>*/}
                        {/*    <button className="productDetailPage_button_minus"*/}
                        {/*            onClick={decrement}*/}
                        {/*            disabled={!isInStock || quantity <= 1}>*/}
                        {/*        <RemoveIcon sx={{ fontSize: 18 }}/>*/}
                        {/*    </button>*/}
                        {/*    <span className="productDetailPage_amount">{isInStock ? quantity : 0}</span>*/}
                        {/*    <button className="productDetailPage_button_plus"*/}
                        {/*            onClick={increment}*/}
                        {/*            disabled={!isInStock || quantity >= stockAmount}>*/}
                        {/*        <AddIcon sx={{ fontSize: 18 }}/>*/}
                        {/*    </button>*/}
                        {/*</div>*/}

                        <button className="productDetailPage_button_addToCart"
                                disabled={!isInStock}
                                onClick={handleAddProductToCart}>
                                    Add to Cart
                        </button>
                    </div>
                </div>
            </section>

            <div className="section_line"></div>
            <section className="productDetailPage_otherProducts"></section>
        </div>
    );
};

export default ProductDetailPage;