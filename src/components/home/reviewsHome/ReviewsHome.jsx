import React, { useRef } from 'react';
import './reviewsHome.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReviewCard from "@components/productDetailPage/productTabs/reviews/reviewCard";
import { useGetProductsWithParamsQuery } from "@store/api/productsAPI.js";
import Skeleton from "@mui/material/Skeleton";

const ReviewsHome = () => {

    const { data: productsReviews, isLoading } = useGetProductsWithParamsQuery({
        limit: 21,
        sortBy: "rating",
        order: "desc",
        select: "reviews"
    });

    const allReviews = productsReviews?.products?.flatMap(product => product.reviews) || [];
    const goodReviews = allReviews.filter(review => review?.rating === 5);

    const swiperRef = useRef(null);

    const handleSlide = (direction) => {
        const swiper = swiperRef.current;
        if (!swiper) return;
        swiper.animating = false;
        if (direction === 'prev') {
            swiper.slidePrev(300);
        } else {
            swiper.slideNext(300);
        }
    };

    return (
        <section className="reviewsHome">
            <div className="container reviewsHome_top">
                <h2 className="reviewsHome_title">
                    OUR HAPPY CUSTOMERS
                </h2>
                <div className="reviewsHome_nav">
                    <button className="nav_btn prev_btn"
                            onClick={() => handleSlide('prev')}>
                        <ArrowBackIcon />
                    </button>
                    <button className="nav_btn next_btn"
                            onClick={() => handleSlide('next')}>
                        <ArrowForwardIcon />
                    </button>
                </div>
            </div>
            <Swiper
                className="reviewsHome_slider"
                modules={[Autoplay]}
                spaceBetween={20}
                loop={goodReviews.length >= 3}
                centeredSlides={!isLoading}
                speed={1200}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                onAutoplay={(swiper) => {
                    swiper.params.speed = 1200;
                }}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 'auto' },
                }}
            >
                {isLoading ? (
                    [0, 1, 2, 3].map((index) => (
                        <SwiperSlide className="reviewsHome_slider_card"
                                     key={index}>
                            <Skeleton
                                variant="rounded"
                                width="400px"
                                height="240px"
                                animation="wave"
                                sx={{ borderRadius: 5 }}
                            />
                        </SwiperSlide>
                    ))
                ) : (
                goodReviews.map((review, index) => (
                    <SwiperSlide className="reviewsHome_slider_card"
                                 key={`${review.reviewerEmail}-${index}`}>
                        <ReviewCard review={review} />
                    </SwiperSlide>
                ))
                )}
            </Swiper>
        </section>
    );
};
export default ReviewsHome;