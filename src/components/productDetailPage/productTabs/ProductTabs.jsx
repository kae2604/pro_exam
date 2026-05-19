import React, {useState} from 'react';
import "./productTabs.scss"
import PreviewCategory from "@components/previewCategory/index.js";
import ProductDetails from "@components/productDetailPage/productTabs/productDetails/index.js";
import Reviews from "@components/productDetailPage/productTabs/reviews/index.js";
import Faq from "@components/productDetailPage/productTabs/faq/index.js";

const ProductTabs = ({ product, id }) => {

    const [activeTab, setActiveTab] = useState("reviews");


    return (
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
    );
};

export default ProductTabs;