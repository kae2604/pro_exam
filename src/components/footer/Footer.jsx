import React from 'react';
import "./footer.scss";
import {Link} from "react-router-dom";
import logo from "@assets/logo.svg";
import visa from '@assets/footer/paymentMethod/visa.svg';
import masterCard from '@assets/footer/paymentMethod/masterCard.svg';
import payPal from '@assets/footer/paymentMethod/payPal.svg';
import applePay from '@assets/footer/paymentMethod/applePay.svg';
import googlePay from '@assets/footer/paymentMethod/googlePay.svg';
import x from '@assets/footer/socialMedia/x.svg';
import fb from '@assets/footer/socialMedia/fb.svg';
import instagram from '@assets/footer/socialMedia/instagram.svg';
import git from '@assets/footer/socialMedia/git.svg';
import mailIcon from '@assets/footer/mailIcon.svg';



const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer_top">
                    <h3>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h3>
                    <div className="footer_top_right">
                        <div className="footer_input_wrapper">
                            <img src={mailIcon} alt="Icon of mail" />
                            <input type="email" placeholder="Enter your email address" />
                        </div>
                        <button type="submit">Subscribe to Newsletter</button>
                    </div>
                </div>
                <div className='footer-container'>
                    <div className='footer-container_left'>
                        <Link to="/"
                              className="footer_logo">
                            <img src={logo} alt="logo"/>
                        </Link>
                        <p>We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
                        <ul className="footer_socialMedia">
                            <li>
                                <a href="https://x.com" className="footer_socialMedia_icons" target="_blank" title="X">
                                    <img  src={x} alt="X" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com" className="footer_socialMedia_icons footer_socialMedia_icons_fb" target="_blank" title="Facebook">
                                    <img  src={fb} alt="Facebook" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com" className="footer_socialMedia_icons" target="_blank" title="Instagram">
                                    <img  src={instagram} alt="Instagram" />
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com" className="footer_socialMedia_icons" target="_blank" title="Git Hub">
                                    <img  src={git} alt="Git Hub" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    <ul>
                        <li className="footer_list">
                                Company
                        </li>
                        <li className="footer_list">
                            <Link to="/">
                                About
                            </Link>
                        </li>
                        <li className="footer_list">
                            <Link to="/">
                                Features
                            </Link>
                        </li>
                        <li className="footer_list">
                            <Link to="/">
                                Works
                            </Link>
                        </li>
                        <li className="footer_list">
                            <Link to="/">
                                Career
                            </Link>
                        </li>
                    </ul>

                    <ul>
                        <li className="footer_list">
                                Help
                        </li>
                        <li className="footer_list">
                            <Link to="/">
                                Customer Support
                            </Link>
                        </li>
                        <li className="footer_list">
                            <Link to="/">
                                Delivery details
                            </Link>
                        </li>
                        <li className="footer_list">
                            <Link to="/">
                                Terms and Conditions
                            </Link>
                        </li>
                        <li className="footer_list">
                            <Link to="/">
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>

                    <ul>
                        <li className="footer_list">
                                FAQ
                        </li>
                        <li className="footer_list">
                            <Link to="/">
                                Account
                            </Link>
                        </li>
                        <li className="footer_list">
                            <Link to="/">
                                Manage Deliveries
                            </Link>
                        </li>
                        <li className="footer_list">
                            <Link to="/">
                                Orders
                            </Link>
                        </li>
                        <li className="footer_list">
                            <Link to="/">
                                Payments
                            </Link>
                        </li>
                    </ul>

                    <ul>
                        <li className="footer_list">
                                Resources
                        </li>
                        <li className="footer_list">
                            <Link to="/">
                                Free Books
                            </Link>
                        </li>
                        <li className="footer_list">
                            <Link to="/">
                                Development Tutorial
                            </Link>
                        </li>
                        <li className="footer_list">
                            <Link to="/">
                                How to - Blog
                            </Link>
                        </li>
                        <li className="footer_list">
                            <Link to="/">
                                Youtube Playlist
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="footer_line"></div>
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
        </footer>
    );
};

export default Footer;