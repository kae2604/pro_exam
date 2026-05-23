import React from 'react';
import "./categoryPageAside.scss"
import filters from "@assets/categoryPage/filters.svg";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryFilterActive } from '@store/slices/categoryFiltersSlice';

const CategoryPageAside = ({handleDrawerToggle}) => {

    const dispatch = useDispatch();
    const activeFilter = useSelector((state) => state.categoryFilters.categoryFilterActive);

    const handleFilterClick = (activeFilterName) => {
        dispatch(setCategoryFilterActive(activeFilterName));
    };




    return (
        <aside className="categoryPage_aside">
            <div className="categoryPage_aside_top">
                <h4>Filters</h4>
                <img src={filters} alt="filters"/>
            </div>
            <div className="section_line"></div>

            <Button variant="contained"
                    className={`categoryPage_aside_button ${activeFilter === 'price' ? '_active' : ''}`}
                    onClick={() => {
                        handleFilterClick('price');
                        handleDrawerToggle?.();
                    }}
            >
                PRICE
            </Button>

            <Button variant="contained"
                    className={`categoryPage_aside_button ${activeFilter === 'sale' ? '_active' : ''}`}
                    onClick={() => {
                        handleFilterClick('sale');
                        handleDrawerToggle?.();
                    }}
            >
                SALE
            </Button>

            <Button variant="contained"
                    className={`categoryPage_aside_button ${activeFilter === 'rating' ? '_active' : ''}`}
                    onClick={() => {
                        handleFilterClick('rating');
                        handleDrawerToggle?.();
                    }}
            >
                RATING
            </Button>

            <Button variant="contained"
                    className={`categoryPage_aside_button ${activeFilter === 'arrivals' ? '_active' : ''}`}
                    onClick={() => {
                        handleFilterClick('arrivals');
                        handleDrawerToggle?.();
                    }}
            >
                ARRIVALS
            </Button>

            <Button variant="contained"
                    className={`categoryPage_aside_button ${activeFilter === 'brand' ? '_active' : ''}`}
                    onClick={() => {
                        handleFilterClick('brand');
                        handleDrawerToggle?.();
                    }}
            >
                BRANDS
            </Button>

            <div className="section_line"></div>

            <Button variant="contained"
                    className={`categoryPage_aside_button ${activeFilter === 'default' ? '_active' : ''}`}
                    onClick={() => {
                        handleFilterClick('default');
                        handleDrawerToggle?.();
                    }}
            >
                NO FILTERS
            </Button>
        </aside>
    );
};

export default CategoryPageAside;