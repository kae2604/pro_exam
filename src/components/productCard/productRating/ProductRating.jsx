import React from 'react';
import fullStar from '@assets/productCard/fullStar.svg';
import halfStar from '@assets/productCard/halfStar.svg';
import "./productRating.scss"
import PropTypes from 'prop-types';

const ProductRating = ({rating}) => {
    const fullStarsCount = Math.floor(rating);
    const hasHalfStar = (rating % 1) !== 0;

    return (
        <div className="productCard_stars">
             {[...Array(fullStarsCount)].map((_, index) => (
                 <img
                     key={`full-${index}`}
                     src={fullStar }
                     alt="Full Star"
                 />
             ))}{hasHalfStar && (
                <img
                    src={halfStar}
                    alt="Half Star"
                    className="half-star"/>
            )}
        </div>
    );
};

ProductRating.propTypes = {
    rating: PropTypes.number.isRequired,
};

export default ProductRating;