import React from 'react';
import "./cartPage.scss"
import {useDispatch, useSelector} from "react-redux";
import {decreaseProductQuantity, increaseProductQuantity,removeProductFromCart, clearCart} from "@store/slices/cartSlice.js";
import {useApplyPromoCodeMutation} from "@store/api/cartApi.js";
import {useCreateOrderMutation} from "@store/api/cartApi.js";
import ModalSuccess from "@components/cartPage/modalSuccess";
import CartPageProductList from "@components/cartPage/cartPageProductList/index.js";
import CartPageSummary from "@components/cartPage/cartPageSummary/index.js";


const CartPage = () => {

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const [promoValue, setPromoValue] = React.useState('');
    const [discountRate, setDiscountRate] = React.useState(0);
    const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
    const [checkoutError, setCheckoutError] = React.useState("");
    const [applyPromo, { isLoading: isLoadingApplyPromo, isSuccess: isSuccessApplyPromo, isError: isErrorApplyPromo }] = useApplyPromoCodeMutation();
    const [createOrder, { isLoading: isLoadingCheckingOut, isSuccess: isSuccessCheckingOut, isError: isErrorCheckingOut }] = useCreateOrderMutation();
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

    const handleCheckout = async () => {
        const isAuthenticated = !!localStorage.getItem('token');

        if (!isAuthenticated) {
            setCheckoutError("To place an order, you need to be logged in.");
            setTimeout(() => setCheckoutError(""), 3000);
            return;
        }

        setCheckoutError("");

        const orderData = {
            items: cartItems.map(item => ({
                id: item.id,
                quantity: item.quantity,
                price: item.price
            })),
            discount: discount,
            priceWithDiscount: priceWithDiscount,
            taxRate: taxRate,
            taxes: taxes,
            totalPrice: totalPrice,
        };

        try {
            await createOrder(orderData).unwrap();
            setOpenSuccessModal(true);
            dispatch(clearCart());
        } catch (err) {
            console.error("Checkout failed:", err);
            setCheckoutError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="container ">
            <ModalSuccess openSuccessModal={openSuccessModal}/>
            <h2 className="cartPage_title">Your cart</h2>
            <section className="cartPage_container">
                <CartPageProductList
                    cartItems={cartItems}
                    onRemove={(id) => dispatch(removeProductFromCart(id))}
                    onIncrement={(id) => dispatch(increaseProductQuantity(id))}
                    onDecrement={(id) => dispatch(decreaseProductQuantity(id))}
                />
                <CartPageSummary
                    totalItemsQuantity={totalItemsQuantity}
                    totalPositionsQuantity={totalPositionsQuantity}
                    subTotalPrice={subTotalPrice}
                    discount={discount}
                    discountRate={discountRate}
                    taxRate={taxRate}
                    taxes={taxes}
                    totalPrice={totalPrice}
                    checkoutError={checkoutError}
                    onApplyPromo={handleApplyPromo}
                    onCheckout={handleCheckout}
                    isLoadingApply={isLoadingApplyPromo}
                    isLoadingCheckout={isLoadingCheckingOut}
                    isCartEmpty={isCartEmpty}
                    promoValue={promoValue}
                    setPromoValue={setPromoValue}
                />
            </section>
        </div>
    );
};
export default CartPage;


