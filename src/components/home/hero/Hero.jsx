import React from 'react';
import "./hero.scss"
import {useGetProductImagesByIdQuery} from "@store/api/productsAPI.js";

const Hero = () => {

    const { data: motorcycle, isLoading: l1 } = useGetProductImagesByIdQuery(113);
    const { data: watch, isLoading: l2 } = useGetProductImagesByIdQuery(95);
    const { data: sunglasses, isLoading: l3 } = useGetProductImagesByIdQuery(155);
    const { data: perfume, isLoading: l4 } = useGetProductImagesByIdQuery(7);

    if (l1 || l2 || l3 || l4) return <div className="container">Loading...</div>;
    if (!motorcycle || !watch || !sunglasses || !perfume) return null;

    console.log('zzzzz', motorcycle);

    return (
        <section className="hero">
                <div className="container heroContainer">
                    <div className="hero_left">
                        <h1>Find the product , you need</h1>
                        <p className="hero_left_description">Explore our extensive range of thoughtfully selected products, created to suit your everyday needs and bring convenience, quality, and variety into your life.</p>
                        <button>Shop Now</button>
                        <div className="hero_left_bottom">
                            <div>
                                <h3>200 +</h3>
                                <span>International Brands</span>
                            </div>
                            <div>
                                <h3>2,000 +</h3>
                                <span>High-Quality Products</span>
                            </div>
                            <div>
                                <h3>30,000 +</h3>
                                <span>Happy Customers</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero_right">
                        <img className="hero_img1" src={motorcycle.images[0]} alt="motorcycle"/>
                        <img className="hero_img2" src={watch.images[0]} alt="watch"/>
                        <img className="hero_img3" src={sunglasses.images[0]} alt="sunglasses"/>
                        <img className="hero_img4" src={perfume.images[0]} alt="perfume"/>
                    </div>
                </div>
        </section>

    );
};

export default Hero;