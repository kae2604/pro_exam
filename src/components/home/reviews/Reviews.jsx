import React from 'react';
import './reviews.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Autoplay  } from 'swiper/modules';
import 'swiper/css/navigation';


const Reviews = () => {
    return (
        <section className="reviews">
            <div className="container">
                <div className="reviews_container">
                    <h2>
                        OUR HAPPY CUSTOMERS
                    </h2>
                </div>
            </div>

            <div>
                <Swiper
                    className="reviews_slider"
                    modules={[Autoplay, Navigation]}
                    slidesPerView={3}
                    spaceBetween={20}
                    loop={true}
                    navigation={true}
                    speed={1200}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                >
                    <SwiperSlide>1</SwiperSlide>
                    <SwiperSlide>2</SwiperSlide>
                    <SwiperSlide>3</SwiperSlide>
                    <SwiperSlide>4</SwiperSlide>
                    <SwiperSlide>5</SwiperSlide>
                </Swiper>
            </div>


        </section>
    );
};

export default Reviews;



// <Swiper spaceBetween={20} slidesPerView={3}>
//     {reviews.map((item) => (
//         <SwiperSlide key={item.id}>
//             <ReviewCard review={item} />
//         </SwiperSlide>
//     ))}
// </Swiper>
//


// адаптивность
// <Swiper
//     spaceBetween={20}
//     breakpoints={{
//         320: { slidesPerView: 1 },
//         768: { slidesPerView: 2 },
//         1024: { slidesPerView: 3 },
//     }}
// >