import React from 'react';
import './categoryPage.scss';
import CategoryPageAside from "@components/categoryPage/categoryPageAside";
import CategoryPageRight from "@components/categoryPage/categoryPageRight/index.js";

const CategoryPage = () => {

    return (
        <div className="container">
            <div className="categoryPage_container">
                <CategoryPageAside/>
                <CategoryPageRight/>
            </div>
        </div>
    );
};

export default CategoryPage;