import React from 'react';
import {useGetProductByIdQuery} from "@store/api/productsAPI.js";
import {useParams} from "react-router-dom";

const ProductDetailPage = () => {

    const { id } = useParams();

    const { data: product, isLoading, error } = useGetProductByIdQuery(id);

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error</div>;


    return (
        <div>
            {product?.title}
        </div>
    );
};

export default ProductDetailPage;