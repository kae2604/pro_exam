import React from 'react';
import usePagination from '@mui/material/usePagination';
import './pagination.scss';
import PropTypes from 'prop-types';

const  CustomPagination = ({ count, page, onChange }) => {
    const { items } = usePagination({
        count,
        page,
        onChange,
        siblingCount: 0,
        boundaryCount: 1
    });

    return (
        <nav className="pagination_nav">
            <ul className="pagination_list">
                {items.map(({ page: itemPage, type, selected, ...item }, index) => {
                    let children = null;

                    if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                        children = <span className="pagination_ellipsis">…</span>;
                    } else if (type === 'page') {
                        children = (
                            <button
                                type="button"
                                className={`pagination_item_btn ${selected ? '_active' : ''}`}
                                {...item}
                            >
                                {itemPage}
                            </button>
                        );
                    } else {
                        children = (
                            <button
                                type="button"
                                className={`pagination_nav_btn _${type}`}
                                {...item}
                            >
                                {type === 'previous' ? '← Previous' : 'Next →'}
                            </button>
                        );
                    }
                    return (
                        <li key={index} className={`pagination_li _${type}`}>
                            {children}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

CustomPagination.propTypes = {
    count: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CustomPagination