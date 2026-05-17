import React, {useState} from 'react';
import ReviewCard from "@components/productDetailPage/reviews/reviewCard/index.js";
import "./reviews.scss"

const Reviews = ({reviews = [] }) => {

    const [visibleCount, setVisibleCount] = useState(2);
    const visibleReviews = reviews.slice(0, visibleCount);
    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 2);
    };
    const hasMore = visibleCount < reviews.length;

    return (
        <div className="container">
            <div className="review_count_all">
                <h3>All Reviews</h3>
                <span>({reviews.length})</span>
            </div>

            <div className="review_container">
                {visibleReviews.map(review => (
                    <div className="review_container_card"
                         key={`${review.reviewerEmail}-${review.date}`}>
                        <button className="review_options">
                            <span className="dots"></span>
                        </button>
                        <ReviewCard
                            review={review}
                        />
                    </div>
                ))}
            </div>
            {hasMore && (
                <button className="moreReviews"
                        onClick={handleLoadMore}>
                    Load More Reviews
                </button>
            )}
        </div>
    );
};

export default Reviews;