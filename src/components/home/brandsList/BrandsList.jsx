import React from 'react';
import "./brandsList.scss";
import { useGetProductsWithParamsQuery } from "@store/api/productsAPI.js";
import { useNavigate } from "react-router-dom";
import {resetSearch, setCategoryFilterActive, setSearchQuery} from "@store/slices/categoryFiltersSlice.js";
import {useDispatch} from "react-redux";

const BrandsList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data: productsBrands, isLoading } = useGetProductsWithParamsQuery({
        limit: 0,
        sortBy: "title",
        order: "asc",
        select: "brand"
    });

    const allBrands = productsBrands?.products?.flatMap(product => product.brand) || [];
    const brokenBrands = [
        "Chrysler", "Furniture Co.", "Comfort Trends", "Fashion Shades", "Fashion Trends",
        "Fashionista", "Fashion Timepieces", "Glamour Beauty", "Generic Motors", "Fashion Diva",
        "Classic Wear", "Casual Comfort", "Urban Chic", "TechGear", "Fashion Fun",
        "Velvet Touch", "Chic Cosmetics", "Nail Couture", "Fashion Express", "ScootMaster",
        "GadgetMaster", "SnapTech", "SpeedMaster", "ProVision", "Fashion Gold",
        "Elegance Collection", "Fashion Co.", "Bath Trends"
    ];

    const uniqueBrandsList = [...new Set(allBrands.filter(Boolean))]
        .filter(brand => !brokenBrands.includes(brand));

    const handleBrandClick = (brandName) => {
        navigate(`/category/${brandName}`,{
            state: {
                crumbLabel: brandName
            }
        });
        dispatch(setSearchQuery(brandName));
        dispatch(setCategoryFilterActive('brand'));
    };

    if (isLoading) {
        return (
            <div className="brandsList_loading"></div>
    )}

    return (
        <section className="brandsList">
            <div className="brandsList_marquee">
                <div className="brandsList_track">
                    {uniqueBrandsList.map((brand, index) => (
                        <span key={`track1-${index}`}
                              className="brand_item"
                              onClick={() => handleBrandClick(brand)}>
                            {brand}
                        </span>
                    ))}
                </div>
                <div className="brandsList_track" aria-hidden="true">
                    {uniqueBrandsList.map((brand, index) => (
                        <span key={`track2-${index}`}
                              className="brand_item"
                              onClick={() => handleBrandClick(brand)}>
                            {brand}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default BrandsList;