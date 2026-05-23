import React from 'react';
import "./hero.scss"
import { useGetBannerImagesQuery} from "@store/api/commonAPI.js";
import Button from "@mui/material/Button";
import {resetSearch, setCategoryFilterActive} from '@store/slices/categoryFiltersSlice.js';
import {useGetRandomQuoteQuery} from "@store/api/commonAPI.js";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Skeleton from "@mui/material/Skeleton";
import {LinearProgress} from "@mui/material";

const Hero = () => {

    const { data: motorcycle, isLoading: l1 } =  useGetBannerImagesQuery(113);
    const { data: watch, isLoading: l2 } =  useGetBannerImagesQuery(95);
    const { data: sunglasses, isLoading: l3 } =  useGetBannerImagesQuery(155);
    const { data: perfume, isLoading: l4 } =  useGetBannerImagesQuery(7);
    const { data: quote, isLoading: l5} = useGetRandomQuoteQuery();

    const isLoading = l1 || l2 || l3 || l4 || l5;

    const isError = !motorcycle || !watch || !sunglasses || !perfume || !quote;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoToAll = () => {
        dispatch(setCategoryFilterActive('default'));
        dispatch(resetSearch());
        navigate("/category", { state: { crumbLabel: 'All Products' } });
    };

    if(isLoading){
    return (
        <div>
            <LinearProgress aria-label="Loading…" />
            <Skeleton
                variant="rounded"
                width="100%"
                height="80vh"
                animation="wave"
            />
            <LinearProgress aria-label="Loading…" variant="query" />
        </div>
    )}

    if (isError) return null;

    return (
        <section className="hero">
                <div className="container heroContainer">
                    <div className="hero_left">
                        <div className="hero_left_top">
                            <h1>Find the product , you need</h1>
                            <p className="hero_left_description">{quote?.quote}</p>
                            <Button variant="contained"
                                    onClick={() => handleGoToAll()}>
                                Shop Now
                            </Button>
                        </div>

                        <div className="hero_left_bottom">
                            <div className="hero_left_info">
                                <h3>200 +</h3>
                                <span>International Brands</span>
                            </div>
                            <div className="hero_left_verticalLine"></div>
                            <div className="hero_left_info">
                                <h3>2,000 +</h3>
                                <span>High-Quality Products</span>
                            </div>
                            <div className="hero_left_verticalLine"></div>
                            <div className="hero_left_info">
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