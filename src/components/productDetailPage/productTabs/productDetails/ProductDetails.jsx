import React from 'react';
import "./producrDetails.scss"
import PropTypes from 'prop-types';

const ProductDetails = ({product}) => {
    return (
        <div className="container">
            <div className="productDetails_container">
                <div className="productDetails_dimensions_wrapper">
                    <h5>Dimensions</h5>
                    <p>Width: <span>{product.dimensions.width}</span></p>
                    <p>Height: <span>{product.dimensions.height}</span></p>
                    <p>Depth: <span>{product.dimensions.depth}</span></p>
                    <p>Weight: <span>{product.weight}</span></p>
                </div>
                <div className="productDetails_dimensions_wrapper">
                    <p>In stock: <span>{product.stock}</span></p>
                    <p>Minimum to order: <span>{product.minimumOrderQuantity}</span></p>
                </div>
                <div className="productDetails_dimensions_wrapper">
                    <p>Return Policy: <span>{product.returnPolicy}</span></p>
                    <p>Shipping Information: <span>{product.shippingInformation}</span></p>
                    <p>Warranty Information: <span>{product.warrantyInformation}</span></p>
                </div>
            </div>
        </div>
    );
};


ProductDetails.propTypes = {
    product: PropTypes.shape({
        dimensions: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
            depth: PropTypes.number,
        }),
        weight: PropTypes.number,
        stock: PropTypes.number,
        minimumOrderQuantity: PropTypes.number,
        returnPolicy: PropTypes.string,
        shippingInformation: PropTypes.string,
        warrantyInformation: PropTypes.string,
    }).isRequired,
};

export default ProductDetails;