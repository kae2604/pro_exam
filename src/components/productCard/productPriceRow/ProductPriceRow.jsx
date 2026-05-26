import React from 'react';
import "./productPriceRow.scss"
import Typography from "@mui/material/Typography";
import PropTypes from 'prop-types';

const ProductPriceRow = ({price, discount, finalPrice}) => {

    const isDiscount = discount > 0;

    return (
        <div className="price_row">
            {isDiscount ? (
                <>
                    <Typography
                        className="productCard_finalPrice">
                        $ {finalPrice}
                    </Typography>

                    <Typography
                        className="productCard_price">
                        $ {price}
                    </Typography>

                    <Typography
                        className="productCard_discount">
                        -{discount}%
                    </Typography>
                </>
            ) : (
                <Typography
                    className="productCard_finalPrice">
                    $ {price}
                </Typography>
            )}
        </div>
    );
};

ProductPriceRow.propTypes = {
    price: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    finalPrice: PropTypes.number.isRequired,
};

export default ProductPriceRow;