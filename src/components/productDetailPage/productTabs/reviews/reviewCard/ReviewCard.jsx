import React from 'react';
import "./reviewCard.scss";
import tick from "@assets/review/reviewTick.svg";
import ProductRating from "@components/productCard/productRating/index.js";
import PropTypes from "prop-types";


const ReviewCard = ({review}) => {

    const displayDate = review?.date
        ? new Date(review.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
        : 'N/A';

    return (
        <div className="reviewCard">
            <div className="reviewCard_rating">
                <ProductRating rating={review.rating}/>
            </div>

            <h5>{review.reviewerName}
                <img src={tick} alt="tick"/>
            </h5>

            <p>{review.comment}</p>

            <span>Posted on {displayDate}</span>
        </div>
    );
};

ReviewCard.propTypes = {
    review: PropTypes.shape({
        rating: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
        reviewerName: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
    }).isRequired,
};

export default ReviewCard;