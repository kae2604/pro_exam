import React from 'react';
import "./CartPageProductList.scss"
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {IconButton} from "@mui/material";
import {decreaseProductQuantity, increaseProductQuantity, removeProductFromCart} from "@store/slices/cartSlice.js";
import QuantitySelector from "@components/productDetailPage/quantitySelector/index.js";

const CartPageProductList = () => {











    return (
        <div className="cartPage_container_productList">
            {isCartEmpty ? (
                <div className="cartPage_productList_empty">
                    <p >Your cart is empty.</p>
                    <p>You have not added any products yet.</p>
                    <Button component={Link}
                            to="/category"
                            className="cartPage_return_btn">
                        Return to Shop
                    </Button>
                </div>
            ) : (
                cartItems.map((item) => (
                    <div key={item.id}
                         className="cart_item_row">
                        <Link to={`/products/${item.id}`}>
                            <img src={item.image} alt={item.title} />
                        </Link>

                        <div className="cart_item_description">
                            <Link to={`/products/${item.id}`}>
                                <h4>{item.title}</h4>
                            </Link>
                            <p>{item.brand}</p>
                            <div>
                                <span>Quantity: </span>
                                <span>{item.quantity}</span>
                            </div>
                            <div>
                                <span>Price: </span>
                                <span>{item.price} $</span>
                            </div>
                            <div>
                                <span>Subtotal: </span>
                                <span className="item_description_subtotal">{item.price * item.quantity} $</span>
                            </div>
                        </div>

                        <div className="cartPage_productList_right">
                            <IconButton
                                onClick={() => dispatch(removeProductFromCart(item.id))}
                                aria-label="Remove product"
                                sx={{ color: '#ff3333' }}
                            >
                                <DeleteForeverIcon />
                            </IconButton>

                            <QuantitySelector
                                className="cartPage_productList_quantitySelector"
                                quantity={item.quantity}
                                onIncrement={() => dispatch(increaseProductQuantity(item.id))}
                                onDecrement={() => dispatch(decreaseProductQuantity(item.id))}
                                isMinusDisabled={item.quantity <= 1}
                                isPlusDisabled={item.quantity >= item.stockAmount}
                                isInStock={true}
                            />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default CartPageProductList;