import React from 'react';
import logo from "@assets/logo.svg";
import {Link} from "react-router-dom";

const LogoMain = () => {

    const handleLogoClick = () => {
        sessionStorage.setItem('breadcrumbs_referer_path', '/')
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <Link to="/"
              onClick={handleLogoClick}>
            <img src={logo} alt="logo"/>
        </Link>
    );
};

export default LogoMain;