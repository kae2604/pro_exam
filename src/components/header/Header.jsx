import React from 'react';
import "./header.scss";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchHeader from "./searchHeader";
import NavigationHeader from "@components/header/navigationHeader";
import LoginUser from "@components/header/loginUser";
import CartHeader from "@components/header/cartHeader/index.js";
import LogoMain from "@components/logoMain/index.js";

const Header = ()=> {

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

                        <LogoMain/>

                        <NavigationHeader/>
                    </div>

                    <div className="header_container_right">

                        <SearchHeader/>

                        <CartHeader/>

                        <LoginUser/>
                    </div>
                </Toolbar>
            </div>
        </AppBar>
    );
}
export default Header
