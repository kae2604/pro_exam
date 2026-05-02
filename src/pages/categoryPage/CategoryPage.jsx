import React from 'react';
import {Link, useParams} from "react-router-dom";
import { useGetProductsByCategoryQuery } from "@store/api/productsApi.js";
import ProductCard from "@components/productCard";
import './categoryPage.scss';
import Pagination from "@components/pagination"
import filters from "@assets/categoryPage/filters.svg";

const CategoryPage = () => {
    const { slug } = useParams();

    const { data: productsList, isLoading, error } = useGetProductsByCategoryQuery(slug);

    console.log("Zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
    console.log(productsList);




    if (isLoading) return <div className="container">Loading...</div>;
    if (error) return <div className="container">Error</div>;


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
                        <h3>Category: {slug}</h3>

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