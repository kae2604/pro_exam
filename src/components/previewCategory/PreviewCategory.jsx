import React from 'react';
import "./previewCategory.scss"
import ProductCard from "@components/productCard/index.js";
import Button from "@mui/material/Button";

const PreviewCategory = ({title, data, handle, isLoading, buttonText}) => {

    if (isLoading) return <div>Loading {title}...</div>;

    return (
        <div className="previewCategory_container">
            <h2>{title}</h2>
            <div className="previewCategory_Box">
                {data?.products?.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
            <Button className='previewCategory_Button'
                    onClick={handle}>
                {buttonText}
            </Button>
        </div>
    );
};

export default PreviewCategory;