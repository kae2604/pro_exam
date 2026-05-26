import React from 'react';
import "./footerList.scss"
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

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

FooterList.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        links: PropTypes.arrayOf(
            PropTypes.shape({
                to: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default FooterList;