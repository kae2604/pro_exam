import React from 'react';
import "./newArrivals.scss";
import ProductCard from "@components/productCard";
import {useGetHomeNewArrivalsQuery} from "@store/api/productsAPI.js";

const NewArrivals = () => {

    const { data } = useGetHomeNewArrivalsQuery();
    console.log(data)

    return (
        <section>
            <div className="container newArrivals_container">
                <h2>NEW ARRIVALS</h2>

                <div className="newArrivals_Box">
                    {data?.products?.map((product) => (
                        <ProductCard
                            key={product.id}
                            productId={product.id}
                        />
                    ))}
                </div>

                <button className='newArrivals_Button'>
                    View All
                </button>
            </div>

        </section>
    );
};

export default NewArrivals;