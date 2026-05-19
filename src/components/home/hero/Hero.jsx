import React from 'react';
import "./hero.scss"
import { useGetBannerImagesQuery} from "@store/api/commonAPI.js";
import Button from "@mui/material/Button";
import {resetSearch, setCategoryFilterActive} from '@store/slices/categoryFiltersSlice.js';
import {useGetRandomQuoteQuery} from "@store/api/commonAPI.js";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Hero = () => {

    const { data: motorcycle, isLoading: l1 } =  useGetBannerImagesQuery(113);
    const { data: watch, isLoading: l2 } =  useGetBannerImagesQuery(95);
    const { data: sunglasses, isLoading: l3 } =  useGetBannerImagesQuery(155);
    const { data: perfume, isLoading: l4 } =  useGetBannerImagesQuery(7);
    const { data: quote, isLoading: isLoadingQuote} = useGetRandomQuoteQuery();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (l1 || l2 || l3 || l4) return <div className="container">Loading...</div>;
    if (!motorcycle || !watch || !sunglasses || !perfume) return null;

    const handleGoToAll = () => {
        dispatch(setCategoryFilterActive('default'));
        dispatch(resetSearch());
        navigate("/category", { state: { crumbLabel: 'All Products' } });
    };

    return (
        <section className="hero">
                <div className="container heroContainer">
                    <div className="hero_left">
                        <h1>Find the product , you need</h1>
                        <p className="hero_left_description">{quote?.quote}</p>
                        <Button variant="contained"
                                onClick={() => handleGoToAll()}>
                            Shop Now
                        </Button>
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