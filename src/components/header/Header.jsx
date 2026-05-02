import React from 'react';
import {Link} from "react-router-dom";
import logo from "@assets/logo.svg";
import "./header.scss";
import Shop from "./shop/index.js";



import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';


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
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


const Header = ()=> {

    return (
        <div className="container">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="sticky"
                        elevation={0}
                        sx={{ backgroundColor: '#ffffff', color: '#888' }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="open drawer"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' }
                        }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Link to="/">
                            <img src={logo} alt="logo"/>
                        </Link>

                        <nav>
                            <ul className="menu_list">
                                <li><Shop/></li>
                                <li><Link to="/onSale">On Sale</Link></li>
                                <li><Link to="/newArrivals">New Arrivals</Link></li>
                                <li><Link to="/brands">Brands</Link></li>
                            </ul>
                        </nav>

                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search'}}
                            />
                        </Search>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}
export default Header
