import React from 'react';
import './categories.scss';

const Categories = () => {
    return (
        <section>
            <div className="container">
                <div className="categories_container">
                    <h2>
                        BROWSE BY CATEGORY
                    </h2>
                    <div className="categories_box">
                        <div className='categoryBoxSmall'>
                            box1
                        </div>
                        <div className='categoryBoxBig'>
                            box2
                        </div>
                        <div className='categoryBoxBig'>
                            box3
                        </div>
                        <div className='categoryBoxSmall'>
                            box4
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Categories;