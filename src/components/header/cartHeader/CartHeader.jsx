import React, {useMemo} from 'react';
import "./cartHeader.scss"
import cart from "@assets/pictures/header/cart.svg";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const CartHeader = () => {

    const cartItems = useSelector((state) => state.cart.items);

    const totalQuantity = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    return (
        <Link to={`/cart`}>
            <div className="header_cart_wrapper">
                <div className="cart_icon_container">
                    <img className="header_icon_cart" src={cart} alt="Icon of cart" />
                    {totalQuantity > 0 && (
                        <div className="cart_badge">
                            {totalQuantity}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default CartHeader;