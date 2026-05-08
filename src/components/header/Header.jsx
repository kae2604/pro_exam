import React from 'react';
import {Link} from "react-router-dom";
import logo from "@assets/logo.svg";
import "./header.scss";
import Shop from "./shop/index.js";
import cart from '@assets/header/cart.svg';
import login from '@assets/header/login.svg';
import { useSelector } from 'react-redux';




import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import mailIcon from "@assets/footer/mailIcon.svg";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    width: '100%',
    maxWidth: '577px',
    flexShrink: 0,

    borderRadius: '24px',
    border: '1px solid #d9d9d9',
    backgroundColor: '#f0f0f0',
    marginLeft: 0,
    '&:hover': {
        backgroundColor: '#ffffff',
    },
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#000000',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        paddingRight: theme.spacing(2),
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
        },
    },
}));


const Header = ()=> {

    const cartItems = useSelector((state) => state.cart.items);
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <AppBar
                component="header"
                className="header"
                position="fixed"
                elevation={0}
                sx={{ backgroundColor: '#ffffff', color: '#888' }}>
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

                        <Link to="/">
                            <img src={logo} alt="logo"/>
                        </Link>

                        <nav>
                            <ul className="menu_list">
                                <li className="menu_list_item"><Shop/></li>
                                <li className="menu_list_item"><Link to="/onSale">On Sale</Link></li>
                                <li className="menu_list_item"><Link to="/newArrivals">New Arrivals</Link></li>
                                <li className="menu_list_item"><Link to="/brands">Brands</Link></li>
                            </ul>
                        </nav>
                    </div>

                    <div className="header_container_right">
                        <Search className="header_search" sx={{ flexGrow: 1, maxWidth: 577 }}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search for products…"
                                inputProps={{ 'aria-label': 'search'}}
                            />
                        </Search>

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
