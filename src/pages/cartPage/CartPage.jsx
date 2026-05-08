import React from 'react';
import "./cartPage.scss"
import {useDispatch, useSelector} from "react-redux";
import QuantitySelector from "@components/quantitySelector/index.js";
import {decreaseProductQuantity, increaseProductQuantity,removeProductFromCart} from "@store/slices/cartSlice.js";

const CartPage = () => {

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    console.log("AAAAAAAAAAAAAAAA:", cartItems);

    return (
        <div className="container ">
            <div className="section_line"></div>
            <div className="cartPage_path">Home</div>
            <h2 className="cartPage_title">Your cart</h2>
            <section className="cartPage_container">


                {cartItems.map((item) => (
                    <div key={item.id}
                         className="cart_item_row">
                        {/*<img src={item.image} alt={item.title} />*/}
                        <span>{item.title}</span>
                        <span>{item.brand}</span>

                        <QuantitySelector
                            quantity={item.quantity}
                            onIncrement={() => dispatch(increaseProductQuantity(item.id))}
                            onDecrement={() => dispatch(decreaseProductQuantity(item.id))}
                            isMinusDisabled={item.quantity <= 1}
                            isPlusDisabled={item.quantity >= item.stockAmount}
                            isInStock={true}/>


                        <span>{item.price * item.quantity} $</span>


                        <button onClick={() => dispatch(removeProductFromCart(item.id))}>
                            Удалить
                        </button>
                    </div>
                ))}
            </section>
        </div>

    );
};

export default CartPage;


