import React, {useState} from 'react';
import './categoryPage.scss';
import CategoryPageAside from "@components/categoryPage/categoryPageAside";
import CategoryPageRight from "@components/categoryPage/categoryPageRight/index.js";
import {Box, Drawer} from "@mui/material";
import NavigationHeader from "@components/header/navigationHeader/index.js";

const CategoryPage = () => {

    const [openFilters, setOpenFilters] = useState(false);

    const handleDrawerToggle = () => {
        setOpenFilters(!openFilters);
    };

    return (
        <>
            <div className="container">
                <div className="categoryPage_container">
                    <div className="categoryPage_filters_desktop">
                        <CategoryPageAside/>
                    </div>
                    <CategoryPageRight handleDrawerToggle={handleDrawerToggle} />
                </div>
            </div>

            <Drawer
                className="categoryPage_filters_mobile"
                variant="temporary"
                open={openFilters}
                onClose={handleDrawerToggle}
                slotProps={{
                    paper: {
                        sx: {
                            width: '250px',
                        }
                    }
                }}
            >
                <CategoryPageAside handleDrawerToggle={handleDrawerToggle}/>
            </Drawer>
        </>
    );
};

export default CategoryPage;