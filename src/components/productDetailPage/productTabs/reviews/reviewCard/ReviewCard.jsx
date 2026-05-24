import React from 'react';
import "./reviewCard.scss";
import tick from "@assets/review/reviewTick.svg";
import ProductRating from "@components/productCard/productRating/index.js";

const ReviewCard = ({review}) => {

    const displayDate = new Date(review.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

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

export default ReviewCard;