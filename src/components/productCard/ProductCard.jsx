import React from 'react';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ProductRating from "./productRating";
import "./productCard.scss"
import ProductPriceRow from "@components/productCard/productPriceRow/index.js";
import { calculateProductPrice } from "@/utils/price";

const ProductCard = ({product}) => {
    if (!product) return null;

    const { price, discount, finalPrice } = calculateProductPrice(product);

    return (
        <Link to={`/products/${product.id}`}
              className="productDetailPage_link">

            <Card sx={{ boxShadow: 'none' }}>
                <CardMedia
                    sx={{
                        height: 298, borderRadius: 5, backgroundColor: '#f0eeed', mb: 2 }}
                    image={product.thumbnail}
                    title={product.title}/>
                <CardContent sx={{
                    p: 0,
                    '&:last-child': {
                        pb: 0
                    }
                }}>
                    <Typography
                        gutterBottom
                        component="div"
                        sx={{
                            fontWeight: 700,
                            fontSize: 20,
                            color: '#000'
                        }}>
                        {product.title}
                    </Typography>


                    <div className="productRating_box">
                        <ProductRating rating={product.rating}/>
                        <div className="productCard_rating">
                            {product.rating} / 5
                        </div>
                    </div>

                    <ProductPriceRow price={price}
                                     discount={discount}
                                     finalPrice={finalPrice}/>
                </CardContent>
            </Card>
        </Link>
    );
};

export default ProductCard;