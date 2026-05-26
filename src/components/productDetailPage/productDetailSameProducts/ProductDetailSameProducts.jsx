import React from 'react';
import "./productDetailSameProducts.scss"
import PreviewCategory from "@components/previewCategory";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useGetProductsByCategoryQuery} from "@store/api/productsAPI.js";
import {resetSearch, setCategoryFilterActive} from "@store/slices/categoryFiltersSlice.js";
import {useResponsiveLimitPreviewCategory} from "@hooks/useResponsiveLimit.js";
import PropTypes from 'prop-types';

const ProductDetailSameProducts = ({product}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const limit = useResponsiveLimitPreviewCategory()

    const { data: sameProducts,  isLoading: isSameLoading} = useGetProductsByCategoryQuery(
        { category: product?.category, limit: limit + 1 },
        { skip: !product?.category }
    );

    const sameProductsRender = sameProducts?.products?.filter(item => item.id !== product?.id).slice(0, limit) || [];

    const handleGoToSameProducts = () => {
        dispatch(resetSearch());
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
                limit={limit }
            />
        </section>
    );
};

ProductDetailSameProducts.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        category: PropTypes.string.isRequired,
    }).isRequired,
};

export default ProductDetailSameProducts;