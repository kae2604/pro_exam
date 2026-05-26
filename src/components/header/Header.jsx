import React, {useState} from 'react';
import "./header.scss";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchHeader from "./searchHeader";
import NavigationHeader from "@components/header/navigationHeader";
import LoginUser from "@components/header/loginUser";
import CartHeader from "@components/header/cartHeader";
import LogoMain from "@components/logoMain/index.js";
import {Box, Drawer} from "@mui/material";

const Header = ()=> {

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
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
                            onClick={handleDrawerToggle}
                            size="large"
                            edge="start"
                            aria-label="open drawer"
                            sx={{mr: 2,
                                color: '#000000',
                                display: { xs: 'flex', md: 'none' }}}>
                            <MenuIcon />
                        </IconButton>

                        <LogoMain/>

                        <Box sx={{ display: { xs: 'none', md: 'block' }}}>
                            <NavigationHeader />
                        </Box>
                    </div>

                    <div className="header_container_right">

                        <SearchHeader/>

                        <CartHeader/>

                        <LoginUser/>
                    </div>
                </Toolbar>
            </div>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250, p: 4},
                }}
            >
                <Box >
                    <NavigationHeader handleDrawerToggle={handleDrawerToggle}/>
                </Box>
            </Drawer>
        </AppBar>
    );
}
export default Header
