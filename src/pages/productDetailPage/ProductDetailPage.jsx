import React, {useEffect, useState} from 'react';
import "./productDetailPage.scss"
import {useGetProductByIdQuery} from "@store/api/productsAPI.js";
import {useParams} from "react-router-dom";
import ProductTabs from "@components/productDetailPage/productTabs";
import ProductDetailInfo from "@components/productDetailPage/productDetailInfo";
import ProductDetailPictures from "@components/productDetailPage/productDetailPictures";
import ProductDetailSameProducts from "@components/productDetailPage/productDetailSameProducts";
import {LinearProgress} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import ErrorModal from "@components/errorModal";

const ProductDetailPage = () => {

    const { id } = useParams();
    const { data: product, isLoading, isError, refetch } = useGetProductByIdQuery(id);
    console.log("QQQQQQQQQQQQQQQQQQQQ",product);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isError) {
            setIsModalOpen(true);
        }
    }, [isError]);


    return (
        <div className="container">

            {isLoading && (
                <div>
                    <LinearProgress aria-label="Loading…" />
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        width="100%"
                        height="70vh"
                    />
                    <LinearProgress aria-label="Loading…" variant="query" />
                </div>
            )}

            {isError && isModalOpen && (
                <ErrorModal
                    refetch={() => {
                        refetch();
                    }}
                    onClose={() => setIsModalOpen(false)}
                />
            )}

            {!product? (
                <p className="notFoundProduct">No products found.</p>
                ):(
                    <>
                        <section className="productDetailPage_container">
                            <ProductDetailPictures product={product}/>
                            <ProductDetailInfo product={product}/>
                        </section>
                        <ProductTabs product={product} id={id} />
                        <ProductDetailSameProducts product={product}/>
                    </>
                )}
        </div>
    );
};
export default ProductDetailPage;