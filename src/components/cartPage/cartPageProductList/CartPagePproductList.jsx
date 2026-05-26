import React from 'react';
import "./CartPageProductList.scss"
import { Link } from "react-router-dom";
import { IconButton, Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import QuantitySelector from "@components/productDetailPage/quantitySelector";
import PropTypes from 'prop-types';

const CartPageProductList = ({cartItems, onRemove, onIncrement, onDecrement}) => {

    if (cartItems.length === 0) {
        return (
            <div className="cartPage_container_productList">
                <div className="cartPage_productList_empty">
                    <p>Your cart is empty.</p>
                    <p>You have not added any products yet.</p>

                    <Button
                        component={Link}
                        to="/category"
                        className="cartPage_return_btn"
                    >
                        Return to Shop
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="cartPage_container_productList">
            {cartItems.map((item) => (
                <div key={item.id} className="cart_item_row">
                    <Link to={`/products/${item.id}`}>
                        <img src={item.image} alt={item.title} />
                    </Link>

                    <div className="cart_item_description">
                        <div className="cart_item_description_title">
                            <Link to={`/products/${item.id}`}>
                                <h4>{item.title}</h4>
                            </Link>

                            <div className="cart_item_description_basket">
                                <IconButton
                                    onClick={() => onRemove(item.id)}
                                    aria-label="Remove product"
                                    sx={{ color: '#ff3333' }}
                                >
                                    <DeleteForeverIcon />
                                </IconButton>
                            </div>
                        </div>

                        <div className="cart_item_description_row">
                            <span>Quantity: </span>
                            <span>{item.quantity}</span>
                        </div>
                        <div className="cart_item_description_row">
                            <span>Price: </span>
                            <span>{item.price} $</span>
                        </div>
                        <div className="cart_item_description_bottom">
                            <div className="cart_item_description_row">
                                <span>Subtotal: </span>
                                <span className="item_description_subtotal">
                                    {item.price * item.quantity} $
                                </span>
                            </div>
                            <div className="cartPage_productList_quantitySelector">
                                <QuantitySelector
                                    quantity={item.quantity}
                                    onIncrement={() => onIncrement(item.id)}
                                    onDecrement={() => onDecrement(item.id)}
                                    isMinusDisabled={item.quantity <= 1}
                                    isPlusDisabled={item.quantity >= item.stockAmount}
                                    isInStock={true}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="cartPage_quantitySelector_bottom">
                        <QuantitySelector
                            quantity={item.quantity}
                            onIncrement={() => onIncrement(item.id)}
                            onDecrement={() => onDecrement(item.id)}
                            isMinusDisabled={item.quantity <= 1}
                            isPlusDisabled={item.quantity >= item.stockAmount}
                            isInStock={true}
                        />

                        <IconButton
                            onClick={() => onRemove(item.id)}
                            aria-label="Remove product"
                            sx={{ color: '#ff3333' }}
                        >
                            <DeleteForeverIcon />
                        </IconButton>
                    </div>
                </div>
            ))}
        </div>
    );
};

CartPageProductList.propTypes = {
    cartItems: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            quantity: PropTypes.number.isRequired,
            stockAmount: PropTypes.number.isRequired,
        })
    ).isRequired,
    onRemove: PropTypes.func.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
};

export default CartPageProductList;