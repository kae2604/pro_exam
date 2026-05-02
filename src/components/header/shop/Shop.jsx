import * as React from 'react';
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import {useGetCategoriesQuery} from "@store/api/categoriesApi.js";


const Shop = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    const { data: categoriesList, isLoading, error } = useGetCategoriesQuery();
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
                onClick={handleClick}
            >
                Shop
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem disabled>
                    Scroll down to see more
                </MenuItem>
                {categoriesList?.map((category) => (
                    <MenuItem
                        key={category.slug}
                        onClick={handleClose}>
                        <Link to={`products/category/${category.slug}`}>
                            {category.name}
                        </Link>
                    </MenuItem>

                ))}
            </Menu>
        </div>
    );
};
export default Shop;