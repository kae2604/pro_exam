import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useGetCategoriesQuery} from "@store/api/productsApi.js";
import "./shop.scss"


const Shop = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();

    const handleCategoryClick = (path) => {
        navigate(path);
        handleClose();
    };

    const { data: categoriesList } = useGetCategoriesQuery();
    console.log(categoriesList)


    return (
        <div>
            <Button
                className={`menu_list_item shop_button ${open ? 'active' : ''}`}
                sx={{
                    '&::after': {
                        textTransform: 'none',
                        color: '#000',
                        transform: open ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)'
                    }
                }}
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

                <MenuItem onClick={() => handleCategoryClick('/products/category')}>
                    All Products
                </MenuItem>
                {categoriesList?.map((category) => (
                    <MenuItem
                        className="category_item"
                        key={category.slug}
                        onClick={() => handleCategoryClick(`/products/category/${category.slug}`)}>
                        {category.name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};
export default Shop;