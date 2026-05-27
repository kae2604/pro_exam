import React from 'react';
import "./footer.scss";
import visa from '@assets/pictures/footer/paymentMethod/visa.svg';
import masterCard from '@assets/pictures/footer/paymentMethod/masterCard.svg';
import payPal from '@assets/pictures/footer/paymentMethod/payPal.svg';
import applePay from '@assets/pictures/footer/paymentMethod/applePay.svg';
import googlePay from '@assets/pictures/footer/paymentMethod/googlePay.svg';
import {FOOTER_DATA} from './footerLinks.js';
import FooterList from "@components/footer/footerList";
import {useGetRandomQuoteQuery} from "@store/api/commonAPI.js";
import FooterSocialMedia from "@components/footer/footerSocialMedia";
import FooterTop from "@components/footer/footerTop/index.js";
import LogoMain from "@components/logoMain/index.js";


const Footer = () => {

    const { data} = useGetRandomQuoteQuery();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-wrapper">

                    <FooterTop/>

                    <div className='footer-container'>
                        <div className='footer-container_left'>
                            <div className="footer_logo">
                                <LogoMain/>
                            </div>

                            <p>{data?.quote}</p>

                            <FooterSocialMedia/>
                        </div>

                        <FooterList data = {FOOTER_DATA.company}/>
                        <FooterList data = {FOOTER_DATA.help}/>
                        <FooterList data = {FOOTER_DATA.faq}/>
                        <FooterList data = {FOOTER_DATA.resources}/>
                    </div>
                    <div className="section_line"></div>
                    <div className="footer_bottom">
                        <span>
                            Shop.co © 2000-2023, All Rights Reserved
                        </span>
                        <div className="footer_bottom_right">
                            <img className="footer_bottom_payMent" src={visa} alt="Visa" />
                            <img className="footer_bottom_payMent" src={masterCard} alt="Master Cars" />
                            <img className="footer_bottom_payMent" src={payPal} alt="PayPal" />
                            <img className="footer_bottom_payMent" src={applePay} alt="ApplePay" />
                            <img className="footer_bottom_payMent" src={googlePay} alt="GooglePay" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;