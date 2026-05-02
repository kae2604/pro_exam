import React from 'react';
import "./topSelling.scss";
import ProductCard from "@components/productCard";
import {useGetHomeTopSellingQuery} from "@store/api/productsAPI.js";

const TopSelling = () => {

    const { data } = useGetHomeTopSellingQuery();
    console.log(data)

    return (
        <section>
            <div className="container ">
                <div className="topSelling_container">
                    <h2>TOP SELLING</h2>

                    <div className="topSelling_Box">
                        {data?.products?.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>

                    <button className='topSelling_Button'>
                        View All
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TopSelling;