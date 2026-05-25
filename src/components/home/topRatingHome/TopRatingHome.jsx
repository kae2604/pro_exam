import React, {useEffect, useState} from 'react';
import "./topRatingHome.scss";
import {useGetProductsByCategoryQuery} from "@store/api/productsAPI.js";
import { useDispatch } from 'react-redux';
import {resetSearch, setCategoryFilterActive} from '@store/slices/categoryFiltersSlice';
import { useNavigate } from 'react-router-dom';
import PreviewCategory from "@components/previewCategory/index.js";
import {useResponsiveLimitPreviewCategory} from "@hooks/useResponsiveLimit.js";

const TopRatingHome = () => {

    const limit = useResponsiveLimitPreviewCategory()

    const { data, isLoading }  = useGetProductsByCategoryQuery({limit, order: 'desc', sortBy: 'rating'});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoToRating = () => {
        dispatch(setCategoryFilterActive('rating'));
        dispatch(resetSearch());
        navigate("/category", { state: { crumbLabel: 'Top Rating' } });
    };

    return (
        <section>
            <div className="container">
                <div className="topRatingHome_container">
                    <PreviewCategory
                        title={'TOP RATING'}
                        data={data}
                        handle={handleGoToRating}
                        isLoading={isLoading}
                        buttonText={'View All'}
                        limit={limit }
                    />
                </div>
            </div>
        </section>
    );
};

export default TopRatingHome;