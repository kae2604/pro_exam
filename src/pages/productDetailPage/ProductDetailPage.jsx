import React from 'react';
import "./productDetailPage.scss"
import {useGetProductByIdQuery} from "@store/api/productsAPI.js";
import {useGetProductsByCategoryQuery} from "@store/api/productsAPI.js";
import {useParams} from "react-router-dom";
import { useState, useEffect } from 'react';
import ProductRating from "@components/productCard/productRating";
import ProductPriceRow from "@components/productCard/productPriceRow/index.js";
import { calculateProductPrice } from "@/utils/price";
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProductToCart } from '@store/slices/cartSlice';
import QuantitySelector from "@components/productDetailPage/quantitySelector/index.js";
import Reviews from "@components/productDetailPage/reviews";
import ProductDetails from "@components/productDetailPage/productDetails";
import Faq from "@components/productDetailPage/faq";
import PreviewCategory from "@components/previewCategory/index.js";
import {setCategoryFilterActive} from "@store/slices/categoryFiltersSlice.js";
import Button from "@mui/material/Button";




const ProductDetailPage = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const [mainImage, setMainImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const cartItems = useSelector((state) => state.cart.items);
    const [activeTab, setActiveTab] = useState("reviews");
    const navigate = useNavigate();

    const { data: product, isLoading, error } = useGetProductByIdQuery(id);
    console.log("QQQQQQQQQQQQQQQQQQQQ",product);


    const { data: sameProducts,  isLoading: isSameLoading} = useGetProductsByCategoryQuery(
        { category: product?.category, limit: 5 },
        { skip: !product?.category }
    );

        useEffect(() => {
        if (product?.images?.length > 0) {
            setMainImage(product.images[0]);
        }
    }, [product]);

    if (isLoading) return <div className="container">Loading...</div>;
    if (error) return <div className="container">Error</div>;
    if (!product) return null;

    const sameProductsRender = sameProducts?.products?.filter(item => item.id !== product?.id).slice(0, 4) || [];

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
            image: mainImage,
            brand: product.brand,
            availabilityStatus: product.availabilityStatus,
            stockAmount: product.stock
        };
        dispatch(addProductToCart(payload));
    };

    const handleGoToSameProducts = () => {
        navigate(`/category/${product.category}`);
        dispatch( setCategoryFilterActive('default'));
    };


    return (
        <div className="container">
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
                                          isPlusDisabled={!isInStock || quantity >= availableToAdd}
                                          isInStock={isInStock}/>

                        <Button className="productDetailPage_button_addToCart"
                                disabled={!isInStock || availableToAdd <= 0 || quantity > availableToAdd}
                                onClick={handleAddProductToCart}>
                                {availableToAdd <= 0 ? 'Limit reached' : 'Add to Cart'}
                        </Button>
                    </div>
                </div>
            </section>

            <section className="productDetailPage_productTabs">
                <div className="productTabs_titles">
                    <button
                        onClick={() => setActiveTab('details')}
                        className={activeTab === 'details' ? 'product_tab_bold' : ''}
                    >
                        Product Details
                    </button>
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={activeTab === 'reviews' ? 'product_tab_bold' : ''}>
                        Rating & Reviews
                    </button>
                    <button
                        onClick={() => setActiveTab('faq')}
                        className={activeTab === 'faq' ? 'product_tab_bold' : ''}>
                        FAQs
                    </button>
                </div>
                <div className="section_line">
                    <div className={`productTabs_line 
                                    ${activeTab === 'details' ? 'productTabs_line_left' : ''}
                                    ${activeTab === 'reviews' ? 'productTabs_line_center' : ''}
                                    ${activeTab === 'faq' ? 'productTabs_line_right' : ''}
                    `}>

                    </div>
                </div>

                <div className="productTabs_container">
                    {activeTab === "details" && (
                        <ProductDetails product = {product}/>
                    )}
                    {activeTab === "reviews" && (
                        <Reviews
                            key={product.id}
                            reviews = {product.reviews} />
                    )}
                    {activeTab === "faq" && (
                        <Faq id={id} />
                    )}
                </div>
            </section>

            <section className="productDetailPage_otherProducts">
                <PreviewCategory
                    title={'YOU MIGHT ALSO LIKE'}
                    data={{products: sameProductsRender}}
                    handle={handleGoToSameProducts}
                    isLoading={isSameLoading}
                    buttonText={`See All ${product.category}`}
                />
            </section>
        </div>
    );
};
export default ProductDetailPage;