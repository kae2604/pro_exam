import React from 'react';
import "./newArrivalsHome.scss";
import { useDispatch } from 'react-redux';
import {resetSearch, setCategoryFilterActive} from '@store/slices/categoryFiltersSlice.js';
import { useNavigate } from 'react-router-dom';
import {useGetProductsByCategoryQuery} from "@store/api/productsAPI.js";
import PreviewCategory from "@components/previewCategory/index.js";

const NewArrivalsHome = () => {

    const { data, isLoading } = useGetProductsByCategoryQuery({limit: 4, order: 'desc', sortBy: 'id'});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoToNew = () => {
        dispatch(setCategoryFilterActive('arrivals'));
        dispatch(resetSearch());
        navigate("/category", { state: { crumbLabel: 'New Arrivals' } });
    };

    return (
        <section>
            <div className="container">
                <div className='newArrivals_container'>
                    <div className='newArrivals_preview'>
                        <PreviewCategory
                            title={'NEW ARRIVALS'}
                            data={data}
                            handle={handleGoToNew }
                            isLoading={isLoading}
                            buttonText={'View All'}
                        />
                    </div>
                    <div className="section_line"></div>
                </div>
            </div>
        </section>
    );
};

export default NewArrivalsHome;