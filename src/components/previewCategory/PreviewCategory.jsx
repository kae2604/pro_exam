import React from 'react';
import "./previewCategory.scss"
import ProductCard from "@components/productCard";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import PropTypes from 'prop-types';

const PreviewCategory = ({title, data, handle, isLoading, buttonText, limit }) => {

    return (
        <div className="previewCategory_container">
            <h2>{title}</h2>
            <div className="previewCategory_Box">

                {isLoading ? (
                    Array.from(new Array(limit || 4)).map((_, index) => (
                        <Skeleton
                            key={index}
                            variant="rounded"
                            width={295}
                            height={408}
                            animation="wave"
                            sx={{ borderRadius: 5 }}
                        />
                    ))
                ) : data?.products?.length > 0 ? (
                    data.products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p className="notFoundCategory">No products found.</p>
                )}
            </div>
            <Button className='previewCategory_Button'
                    onClick={handle}>
                {buttonText}
            </Button>
        </div>
    );
};

PreviewCategory.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
        products: PropTypes.arrayOf(
            PropTypes.shape({
            })
        ),
    }),
    handle: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    buttonText: PropTypes.string.isRequired,
    limit: PropTypes.number.isRequired,
};

export default PreviewCategory;