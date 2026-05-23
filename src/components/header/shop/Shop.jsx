import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useGetCategoriesQuery} from "@store/api/productsApi.js";
import "./shop.scss"
import {resetSearch, setCategoryFilterActive} from "@store/slices/categoryFiltersSlice.js";
import {useDispatch} from "react-redux";


const Shop = ({handleDrawerToggle}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCategoryClick = (path, subCategoryLabel) => {
        navigate(path, {
            state: {crumbLabel: subCategoryLabel}
        });
        handleClose();
        dispatch(setCategoryFilterActive('default'));
        dispatch(resetSearch());
    };

    const { data: categoriesList } = useGetCategoriesQuery();

    return (
        <div>
            <Button
                className={`menu_list_item shop_button ${open ? 'active' : ''}`}
                sx={{
                    fontWeight: 400,
                    fontSize: '16px',
                    color: '#000',
                    textTransform: 'none',
                    paddingRight: '16px',
                    minWidth: 0,
                    fontFamily: 'inherit',
                    '&:hover': {
                        backgroundColor: 'transparent',
                    }
                }}
                disableRipple
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                    Shop
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className="shop_category_list">

                <MenuItem className="category_item"
                    onClick={() => handleCategoryClick('/category', 'All Products')}>
                    All Products
                </MenuItem>
                {categoriesList?.map((category) => (
                    <MenuItem
                        className="category_item"
                        key={category.slug}
                        onClick={() => {
                            handleCategoryClick(`/category/${category.slug}`, category.name);
                            if (typeof handleDrawerToggle === 'function') {
                                handleDrawerToggle();
                            }
                        }}>
                        {category.name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};
export default Shop;