import React from 'react';
import "./filterSortedBy.scss"
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {useSelector} from "react-redux";

const FilterSortedBy = ({handleToggleOrder, sortOrder}) => {

    const activeFilter = useSelector((state) => state.categoryFilters.categoryFilterActive);

    const getSortLabels = () => {
        switch (activeFilter) {
            case 'price':
                return { asc: "Cheapest First", desc: "Most Expensive" };
            case 'rating':
                return { asc: "Lowest Rated", desc: "Top Rated" };
            case 'sale':
                return { asc: "Smallest Discount", desc: "Biggest Savings" };
            case 'arrivals':
                return { asc: "Oldest Items", desc: "New Arrivals" };
            default:
                return { asc: "A-Z", desc: "Z-A" };
        }
    };
    const labels = getSortLabels();
    const currentLabel = sortOrder === "asc" ? labels.asc : labels.desc;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleItemClick = (targetOrder) => {
        if (targetOrder !== sortOrder) {
            handleToggleOrder();
        }
        handleClose();
    };

    return (
        <div className="filterSortedBy_wrapper">
            <button
                className={`filterSortedBy_button ${open ? 'active' : ''}`}
                onClick={handleClick}>
                <span>Sort by:</span>
                <span>{currentLabel}</span>
            </button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className="shop_category_list">

                <MenuItem onClick={() => handleItemClick("asc")}
                          disabled={sortOrder === "asc"}>
                    {labels.asc}
                </MenuItem>

                <MenuItem
                    onClick={() => handleItemClick("desc")}
                    disabled={sortOrder === "desc"}
                >
                    {labels.desc}
                </MenuItem>
            </Menu>
        </div>
    );
};

export default FilterSortedBy;