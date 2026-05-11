import React from 'react';
import "./cartPage.scss"
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import QuantitySelector from "@components/quantitySelector/index.js";
import { IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {decreaseProductQuantity, increaseProductQuantity,removeProductFromCart} from "@store/slices/cartSlice.js";
import promo from "@assets/cartPage/promo.svg";
import cartArrow from "@assets/cartPage/cartArrow.svg";
import {useApplyPromoCodeMutation} from "@store/api/cartApi.js";

const CartPage = () => {

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    console.log("AAAAAAAAAAAAAAAA:", cartItems);

    const [promoValue, setPromoValue] = React.useState('');
    const [discountRate, setDiscountRate] = React.useState(0);
    const [applyPromo, { isLoading, isSuccess, isError }] = useApplyPromoCodeMutation();
    const isCartEmpty = cartItems.length === 0;
    const totalItemsQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPositionsQuantity = cartItems.length;
    const subTotalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const discount = (subTotalPrice * discountRate) / 100;
    const priceWithDiscount = subTotalPrice - discount;
    const taxRate = priceWithDiscount >= 150 ? 0.20 : 0;
    const taxes = priceWithDiscount * taxRate;
    const totalPrice = priceWithDiscount + taxes;

    React.useEffect(() => {
        if (isCartEmpty) {
            setDiscountRate(0);
            setPromoValue('');
        }
    }, [cartItems.length]);

    const handleApplyPromo = async () => {
        if (!promoValue.trim()) return;
        try {
            await applyPromo(promoValue).unwrap();
            setDiscountRate(10);
        } catch (err) {
            console.error("Promo activation failed:", err);
        }
    };

    return (
        <div className="container ">
            <div className="section_line"></div>
            <div className="cartPage_path">Home</div>
            <h2 className="cartPage_title">Your cart</h2>
            <section className="cartPage_container">
                <div className="cartPage_container_productList">
                    {isCartEmpty ? (
                        <div className="cartPage_productList_empty">
                            <p >Your cart is empty.</p>
                            <p>You have not added any products yet.</p>
                            <Link to="/products/category"
                                  className="cartPage_return_btn">
                                <button >
                                    Return to Shop
                                </button>
                            </Link>
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
                                        sx={{ color: '#ff3333' }} // Можно задать цвет прямо здесь
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
                <div className="cartPage_container_summary">
                    <h3>Order Summary</h3>
                    <p className="summary_result">Quantity of Positions :
                        <span>{totalPositionsQuantity}</span>
                    </p>
                    <p className="summary_result">Quantity of Items :
                        <span>{totalItemsQuantity} </span>
                    </p>
                    <div className="section_line"></div>
                    <p className="summary_result summary_result_line">Subtotal price:
                        <span>${subTotalPrice}</span>
                    </p>

                    <div className="cartPage_promo">
                        <div className="promo_input_wrapper">
                            <img src={promo} alt="Promo Icon" />
                            <input type="text"
                                   placeholder="Add promo code"
                                   value={promoValue}
                                   onChange={(e) => setPromoValue(e.target.value)}
                                   disabled={isCartEmpty || discountRate > 0 || isLoading}
                            />
                        </div>
                        <button type="submit"
                                onClick={handleApplyPromo}
                                disabled={isCartEmpty || discountRate > 0 || isLoading || !promoValue.trim()}
                        >
                            Apply
                        </button>
                    </div>

                    {discountRate > 0  &&(
                        <p className="summary_result">Discount: (- {discountRate} %)
                            <span className="summary_attention"> -${discount} </span>
                        </p>
                    )}
                    {taxRate > 0 && (
                        <>
                            <p className="summary_result">Taxes:
                                <span className="summary_attention">${taxes.toFixed(2)} </span>
                            </p>
                            <p className="taxConditions">* Tax included 20% for orders over $150.</p>
                        </>
                    )}
                    <div className="section_line"></div>
                    <p className="summary_result summary_result_line">Total:
                        <span>${totalPrice.toFixed(2)}</span>
                    </p>
                    <button className="cartPage_checkout"
                            type="button"
                            // onClick={handleCheckout}
                            disabled={isCartEmpty ||  isLoading}
                    >
                        Go to Checkout
                        <img src={cartArrow} alt="Arrow" />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default CartPage;


