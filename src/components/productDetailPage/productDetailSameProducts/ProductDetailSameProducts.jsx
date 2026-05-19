import React from 'react';
import "./productDetailSameProducts.scss"
import PreviewCategory from "@components/previewCategory";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useGetProductsByCategoryQuery} from "@store/api/productsAPI.js";
import {setCategoryFilterActive} from "@store/slices/categoryFiltersSlice.js";

const ProductDetailSameProducts = ({product}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data: sameProducts,  isLoading: isSameLoading} = useGetProductsByCategoryQuery(
        { category: product?.category, limit: 5 },
        { skip: !product?.category }
    );

    const sameProductsRender = sameProducts?.products?.filter(item => item.id !== product?.id).slice(0, 4) || [];

    const handleGoToSameProducts = () => {
        navigate(`/category/${product.category}`);
        dispatch( setCategoryFilterActive('default'));
    };

    if (!product) return null;

    return (
        <section className="productDetailPage_sameProducts">
            <PreviewCategory
                title={'YOU MIGHT ALSO LIKE'}
                data={{products: sameProductsRender}}
                handle={handleGoToSameProducts}
                isLoading={isSameLoading}
                buttonText={`See All ${product.category}`}
            />
        </section>
    );
};
export default ProductDetailSameProducts;