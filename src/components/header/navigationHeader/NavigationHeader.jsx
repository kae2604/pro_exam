import React from 'react';
import "./navigationHeader.scss"
import Shop from "@components/header/shop";
import {Link} from "react-router-dom";
import {resetSearch, setCategoryFilterActive} from "@store/slices/categoryFiltersSlice.js";
import {useDispatch} from "react-redux";
import PropTypes from 'prop-types';

const NavigationHeader = ({handleDrawerToggle}) => {

    const dispatch = useDispatch();

    const handleGoToCategory = (filter) => {
        dispatch(setCategoryFilterActive(filter));
        dispatch(resetSearch());
    };

    return (
        <nav>
            <ul className="menu_list">
                <li><Shop handleDrawerToggle={handleDrawerToggle} /></li>
                <li className="menu_list_item">
                    <Link
                        to="/category"
                        state={{ crumbLabel: 'On Sale' }}
                        onClick={() => {
                            handleGoToCategory('sale');
                            handleDrawerToggle?.();
                        }}
                    >
                        On Sale
                    </Link>
                </li>
                <li className="menu_list_item">
                    <Link to="/category"
                          state={{ crumbLabel: 'New Arrivals' }}
                          onClick={() => {
                              handleGoToCategory('arrivals');
                              handleDrawerToggle?.();
                          }}
                    >
                        New Arrivals
                    </Link>
                </li>
                <li className="menu_list_item">
                    <Link to="/category"
                          state={{ crumbLabel: 'Brands' }}
                          onClick={() => {
                              handleGoToCategory('brand');
                              handleDrawerToggle?.();
                          }}
                    >
                        Brands
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

NavigationHeader.propTypes = {
    handleDrawerToggle: PropTypes.func,
};

export default NavigationHeader;