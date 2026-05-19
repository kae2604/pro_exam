import React from 'react';
import "./cartPageSummary.scss"
import Button from "@mui/material/Button";
import promo from "@assets/cartPage/promo.svg";
import cartArrow from "@assets/cartPage/cartArrow.svg";

const CartPageSummary = ({totalItemsQuantity, totalPositionsQuantity, subTotalPrice,
                             discount, discountRate, taxRate, taxes, totalPrice,
                             checkoutError, onApplyPromo, onCheckout, isLoadingApply,
                             isLoadingCheckout, isCartEmpty, promoValue, setPromoValue,}) => {

    return (
        <div className="cartPage_container_summary">
            <h3>Order Summary</h3>
            <p className="summary_result">
                Quantity of Positions :
                <span>{totalPositionsQuantity}</span>
            </p>
            <p className="summary_result">
                Quantity of Items :
                <span>{totalItemsQuantity} </span>
            </p>
            <div className="section_line"></div>
            <p className="summary_result summary_result_line">
                Subtotal price:
                <span>${subTotalPrice}</span>
            </p>
            <div className="cartPage_promo">
                <div className="promo_input_wrapper">
                    <img src={promo} alt="Promo Icon" />
                    <input type="text"
                           placeholder="Add promo code"
                           value={promoValue}
                           onChange={(e) => setPromoValue(e.target.value)}
                           disabled={isCartEmpty || discountRate > 0 || isLoadingApply}
                    />
                </div>
                <Button onClick={() => onApplyPromo(promoValue)}
                        disabled={isCartEmpty || discountRate > 0 || isLoadingApply || !promoValue.trim()}
                >
                    Apply
                </Button>
            </div>

            {discountRate > 0 && (
                <p className="summary_result">
                    Discount: (- {discountRate} %)
                    <span className="summary_attention"> -${discount.toFixed(2)} </span>
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

            {checkoutError && (
                <p style={{ color: '#ff3333', textAlign: 'center', marginBottom: '10px' }}>{
                    checkoutError}
                </p>
            )}

            <Button className="cartPage_checkout"
                    onClick={onCheckout}
                    disabled={isCartEmpty || isLoadingApply || isLoadingCheckout}
            >
                Go to Checkout
                <img src={cartArrow} alt="Arrow" />
            </Button>
        </div>
    );
};
export default CartPageSummary;