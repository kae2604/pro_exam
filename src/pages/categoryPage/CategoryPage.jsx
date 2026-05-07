import React from 'react';
import {Link, useParams} from "react-router-dom";
import { useGetProductsByCategoryQuery, useGetAllProductsQuery } from "@store/api/productsApi.js";
import ProductCard from "@components/productCard";
import './categoryPage.scss';
import Pagination from "@components/pagination"
import filters from "@assets/categoryPage/filters.svg";


const CategoryPage = () => {


    const { slug } = useParams();
    let CategoryName = null;
    if(slug){
        CategoryName = slug.toString().charAt(0).toUpperCase() + slug.toString().slice(1);
    }


    const {
        data: categoryData,
        isLoading: isCategoryLoading
    } = useGetProductsByCategoryQuery(slug, { skip: !slug });


    const {
        data: allData,
        isLoading: isAllLoading
    } = useGetAllProductsQuery(undefined, { skip: !!slug });

    const productsList = slug ? categoryData : allData;

    const isLoading = slug ? isCategoryLoading : isAllLoading;

    if (isLoading) return <div className="container">Loading...</div>;


    return (
        <main>
            <div className="container">
                <div className="categoryPage_line"></div>
                <div className="categoryPage_path">Home</div>
                <div className="categoryPage_container">
                    <aside className="categoryPage_aside">
                        <div className="categoryPage_aside_top">
                            <h4>Filters</h4>
                            <img src={filters} alt="filters"/>
                        </div>
                        <div className="categoryPage_line"></div>

                    </aside>
                    <section className="categoryPage_right">

                        <h3>{CategoryName  || "All Products"}</h3>

                        <div className="categoryPage_box">
                            {productsList?.products?.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                        <div className="categoryPage_line"></div>
                        <Pagination/>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default CategoryPage;