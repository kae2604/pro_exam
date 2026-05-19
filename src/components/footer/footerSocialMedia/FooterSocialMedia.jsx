import React from 'react';
import "./footerSocialMedia.scss"
import x from "@assets/footer/socialMedia/x.svg";
import fb from "@assets/footer/socialMedia/fb.svg";
import instagram from "@assets/footer/socialMedia/instagram.svg";
import git from "@assets/footer/socialMedia/git.svg";

const FooterSocialMedia = () => {
    return (
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
    );
};

export default FooterSocialMedia;