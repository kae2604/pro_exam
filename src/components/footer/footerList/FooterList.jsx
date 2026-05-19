import React from 'react';
import "./footerList.scss"
import {Link} from "react-router-dom";

const FooterList = ({data}) => {
    return (
        <ul className="footer_list">
            <h6 className="footer_list-title">
                {data.title}
            </h6>
            {data.links.map((item, index) => (
                <li key={index}
                    className="footer_list_item">
                    <Link to={item.to}
                          state={{ crumbLabel: item.text }}>
                        {item.text}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default FooterList;