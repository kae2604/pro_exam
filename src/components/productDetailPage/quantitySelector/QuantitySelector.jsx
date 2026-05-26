import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import "./quantitySelector.scss";
import PropTypes from 'prop-types';

const QuantitySelector = ({ quantity, onIncrement, onDecrement, isMinusDisabled, isPlusDisabled, isInStock } ) => {

    return (
        <div className="productDetailPage_quantitySelector">
            <button className="productDetailPage_button_minus"
                    onClick={onDecrement}
                    disabled={isMinusDisabled}>
                <RemoveIcon sx={{ fontSize: 18 }}/>
            </button>
            <span className="productDetailPage_amount">{isInStock ? quantity : 0}</span>
            <button className="productDetailPage_button_plus"
                    onClick={onIncrement}
                    disabled={isPlusDisabled}>
                <AddIcon sx={{ fontSize: 18 }}/>
            </button>
        </div>
    );
};

QuantitySelector.propTypes = {
    quantity: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
    isMinusDisabled: PropTypes.bool.isRequired,
    isPlusDisabled: PropTypes.bool.isRequired,
    isInStock: PropTypes.bool.isRequired,
};

export default QuantitySelector;