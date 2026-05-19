import React from 'react';
import "./productDetailPage.scss"
import {useGetProductByIdQuery} from "@store/api/productsAPI.js";
import {useParams} from "react-router-dom";
import ProductTabs from "@components/productDetailPage/productTabs";
import ProductDetailInfo from "@components/productDetailPage/productDetailInfo";
import ProductDetailPictures from "@components/productDetailPage/productDetailPictures";
import ProductDetailSameProducts from "@components/productDetailPage/productDetailSameProducts/index.js";

const ProductDetailPage = () => {

    const { id } = useParams();
    const { data: product, isLoading, error } = useGetProductByIdQuery(id);
    console.log("QQQQQQQQQQQQQQQQQQQQ",product);

    if (isLoading) return <div className="container">Loading...</div>;
    if (error) return <div className="container">Error</div>;
    if (!product) return null;

    return (
        <div className="container">
            <section className="productDetailPage_container">
                <ProductDetailPictures product={product}/>
                <ProductDetailInfo product={product}/>
            </section>
            <ProductTabs product={product} id={id} />
            <ProductDetailSameProducts product={product}/>
        </div>
    );
};
export default ProductDetailPage;