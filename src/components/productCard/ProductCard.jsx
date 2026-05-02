import React from 'react';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ProductRating from "./ProductRating";
import "./productCard.scss"


const ProductCard = ({product}) => {

    console.log(product)
    console.log(product?.discountPercentage)

    const price = Math.round(product?.price);
    const discountPercentage = product?.discountPercentage ? Math.round(product.discountPercentage) : 0;
    const finalPrice = Math.round(price - (price * discountPercentage) / 100);
    const isDiscount = discountPercentage > 0;
    if (!product) return null;

    return (
        <Link to={`/products/${product.id}`} className="productDetailPage_link">
            <Card sx={{ maxWidth: 295, width: '100%', boxShadow: 'none' }}>
                <CardMedia
                    sx={{ maxWidth: 295, height: 298, borderRadius: 5, backgroundColor: '#f0eeed', mb: 2 }}
                    image={product.thumbnail}
                    title={product.title}
                />
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

                    <div className="price_row">
                        {isDiscount ? (
                            <>
                                <Typography
                                    className="productCard_finalPrice">
                                    $ {finalPrice}
                                </Typography>

                                <Typography
                                    className="productCard_price">
                                    $ {price}
                                </Typography>

                                <Typography
                                    className="productCard_discount">
                                    -{discountPercentage}%
                                </Typography>
                            </>
                        ) : (
                            <Typography
                                className="productCard_finalPrice">
                                $ {price}
                            </Typography>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default ProductCard;