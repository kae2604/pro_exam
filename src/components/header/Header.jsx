import React from 'react';
import {Link} from "react-router-dom";
import logo from "@assets/logo.svg";
import "./header.scss";
import Shop from "./shop/index.js";
import cart from '@assets/header/cart.svg';
import login from '@assets/header/login.svg';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {resetSearch, setCategoryFilterActive} from "@store/slices/categoryFiltersSlice.js";
import SearchHeader from "./searchHeader";

const Header = ()=> {

    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.items);
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleGoToCategory = (filter) => {
        dispatch(setCategoryFilterActive(filter));
        dispatch(resetSearch());
    };

    const handleLogoClick = () => {
        sessionStorage.setItem('breadcrumbs_referer_path', '/')
    };

    return (
        <AppBar component="header"
                className="header"
                position="fixed"
                elevation={0}>

            <div className="container">
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: 'unset',
                        padding: '24px 0'
                    }}
                    className="header_container">

                    <div className="header_container_left">
                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="open drawer"
                            sx={{mr: 2, display: { xs: 'flex', md: 'none' }}}>
                            <MenuIcon />
                        </IconButton>

                        <Link to="/"
                              onClick={handleLogoClick}>
                            <img src={logo} alt="logo"/>
                        </Link>

                        <nav>
                            <ul className="menu_list">
                                <li><Shop/></li>
                                <li className="menu_list_item">
                                    <Link
                                        to="/category"
                                        state={{ crumbLabel: 'On Sale' }}
                                        onClick={() => handleGoToCategory('sale')}
                                    >
                                        On Sale
                                    </Link>
                                </li>
                                <li className="menu_list_item">
                                    <Link to="/category"
                                          state={{ crumbLabel: 'New Arrivals' }}
                                          onClick={() => handleGoToCategory('arrivals')}
                                    >
                                        New Arrivals
                                    </Link>
                                </li>
                                <li className="menu_list_item">
                                    <Link to="/category"
                                          state={{ crumbLabel: 'Brands' }}
                                          onClick={() => handleGoToCategory('brand')}
                                    >
                                        Brands
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="header_container_right">

                        <SearchHeader/>

                        <Link to={`/cart`}>
                            <div className="header_cart_wrapper">
                                <div className="cart_icon_container">
                                    <img className="header_icon_cart" src={cart} alt="Icon of cart" />
                                    {totalQuantity > 0 && (
                                        <div className="cart_badge">
                                            {totalQuantity}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                        <img className="header_icon_login" src={login} alt="Icon of login" />
                    </div>
                </Toolbar>
            </div>
        </AppBar>

    );
}
export default Header
