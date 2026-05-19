import React, { useEffect, useState, useMemo } from 'react';
import './categories.scss';
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetProductsForHomeCategoryQuery } from "@store/api/productsAPI.js";
import {resetSearch, setCategoryFilterActive} from "@store/slices/categoryFiltersSlice.js";

const Categories = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data: allProductsData } = useGetProductsForHomeCategoryQuery();

    const uniqueCategoriesWithImages = useMemo(() => {
        if (!allProductsData?.products) return [];

        const categoriesMap = {};

        allProductsData.products.forEach(product => {
            if (!categoriesMap[product.category]) {
                categoriesMap[product.category] = {
                    name: product.category,
                    image: product.images[0]
                };
            }
        });
        return Object.values(categoriesMap);
    }, [allProductsData]);

    useEffect(() => {
        uniqueCategoriesWithImages.forEach(cat => {
            const img = new Image();
            img.src = cat.image;
        });
    }, [uniqueCategoriesWithImages]);

    const [randomCategories, setRandomCategories] = useState([]);

    useEffect(() => {
        if (uniqueCategoriesWithImages.length === 0) return;
        const generateRandomCategories = () => {
            const shuffled = [...uniqueCategoriesWithImages].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, 4);
        };
        setRandomCategories(generateRandomCategories());
        const interval = setInterval(() => {
            setRandomCategories(generateRandomCategories());
        }, 4000);

        return () => clearInterval(interval);
    }, [uniqueCategoriesWithImages]);

    const handleCategoryClick = (categoryName) => {
        navigate(`/category/${categoryName}`,{
            state: {crumbLabel: categoryName}
        });
        dispatch(setCategoryFilterActive('default'));
        dispatch(resetSearch());
    };

    return (
        <section>
            <div className="container">
                <div className="categories_container">
                    <h2>BROWSE BY CATEGORY</h2>
                    <div className="categories_box">
                        {randomCategories.map((category, index) => {
                            const boxClass = (index === 0 || index === 3) ? 'categoryBoxSmall' : 'categoryBoxBig';
                            return (
                                <div key={category?.name}
                                     className={boxClass}
                                     onClick={() => handleCategoryClick(category?.name)}
                                     style={{ backgroundImage: `url(${category?.image})`}}
                                >
                                    <span key={category?.name}
                                          className="categoryHomeName">
                                        {category?.name
                                            ?.split('-')
                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(' ')}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Categories;