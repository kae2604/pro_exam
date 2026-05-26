import React, {useState, useEffect} from 'react';
import "./categoryPageRight.scss"
import ProductCard from "@components/productCard";
import Pagination from "@components/categoryPage/pagination";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import FilterSortedBy from "@components/categoryPage/categoryPageRight/filterSortedBy";
import { useDispatch } from 'react-redux';
import {useGetProductsByCategoryQuery} from "@store/api/productsAPI.js";
import {useGetProductsBySearchQuery} from "@store/api/productsAPI.js";
import {setCurrentPage } from '@store/slices/categoryFiltersSlice';
import Skeleton from '@mui/material/Skeleton';
import {useResponsiveLimitCategoryPage} from "@hooks/useResponsiveLimit.js";
import filtersMobile from "@assets/categoryPage/filtersMobile.svg";
import ErrorModal from "@components/errorModal";
import PropTypes from 'prop-types';

const CategoryPageRight = ({handleDrawerToggle}) => {

    const limit = useResponsiveLimitCategoryPage();

    const { category } = useParams();
    const dispatch = useDispatch();

    const activeFilter = useSelector((state) => state.categoryFilters.categoryFilterActive);
    const searchQuery = useSelector((state) => state.categoryFilters.searchQuery);
    const page = useSelector((state) => state.categoryFilters.currentPage);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsModalOpen(true);
    }, [category, searchQuery]);

    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [limit, dispatch]);

    const skip = (page - 1) * limit;

    let CategoryName = null;
    if(category){
        CategoryName = category
            .toString()
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    const sortBy = activeFilter === "price" ? "price" :
        activeFilter === "rating" ? "rating" :
            activeFilter === "arrivals" ? "id" :
                activeFilter === "sale" ? "discountPercentage" :
                    activeFilter === "brand" ? "brand" : 'title'


    const [sortOrder, setSortOrder] = useState("desc");

    useEffect(() => {
        if (activeFilter === "price" || activeFilter === "default" || activeFilter === "brand" ) {
            setSortOrder("asc");
        } else {
            setSortOrder("desc");
        }
    }, [activeFilter]);

    const { data: productsList, isLoading, isError, refetch } = searchQuery
        ? useGetProductsBySearchQuery({ search: searchQuery, limit, skip, sortBy, order: sortOrder })
        : useGetProductsByCategoryQuery({ category, limit, skip, sortBy, order: sortOrder });


    const totalProducts = productsList?.total || 0;
    const pageCount = Math.ceil(totalProducts / limit);
    const startRange = totalProducts === 0 ? 0 : skip + 1;
    const endRange = Math.min(skip + limit, totalProducts);

    const toggleOrder = () => {
        setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    };

    const handlePageChange = (event, value) => {
        dispatch(setCurrentPage(value));
    };


    return (
        <section className="categoryPage_right">

            {isError && isModalOpen && (
                <ErrorModal
                    refetch={() => {
                        refetch();
                    }}
                    onClose={() => setIsModalOpen(false)}
                />
            )}

            <div className= "categoryPage_right_top">

                <div className= "categoryPage_right_title">
                    <h3>{searchQuery || (CategoryName  || "All Products")}</h3>

                    <button className= "categoryPage_filterMobile_button"
                            onClick={handleDrawerToggle}>
                        <img src={filtersMobile} alt="filters"/>
                    </button>
                </div>


                <div className= "categoryPage_right_top_sort">
                    <p className="categoryPage_pageNumber">
                        Showing {startRange}-{endRange} of {totalProducts} Products
                    </p>
                    <FilterSortedBy handleToggleOrder={toggleOrder}
                                    sortOrder = {sortOrder}/>
                </div>
            </div>

            <div className="categoryPage_box">
                {isLoading ? (
                    Array.from(new Array(limit)).map((_, index) => (
                        <Skeleton
                            key={index}
                            variant="rounded"
                            width={295}
                            height={408}
                            animation="wave"
                            sx={{ borderRadius: 5 }}
                        />
                    ))
                ) : productsList?.products?.length > 0 ? (
                    productsList.products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p className="notFoundCategory">No products found.</p>
                )}
            </div>

            <div className="section_line"></div>

            <div className="categoryPage_pagination">
                <Pagination
                    count={pageCount}
                    page={page}
                    onChange={handlePageChange}
                />
            </div>
        </section>
    );
};

CategoryPageRight.propTypes = {
    handleDrawerToggle: PropTypes.func.isRequired,
};

export default CategoryPageRight;