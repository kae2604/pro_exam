import React, {useEffect, useState} from 'react';
import "./productDetailPictures.scss"

const ProductDetailPictures = ({product}) => {

    if (!product) return null;
    const [mainImage, setMainImage] = useState(null);

    useEffect(() => {
        if (product?.images?.length > 0) {
            setMainImage(product.images[0]);
        }
    }, [product]);

    return (
        <div className="productDetail_pictures">
            <div className="productDetail_pictures_left_wrapper">
                <div className={`productDetail_pictures_left ${product?.images?.length > 3 ? 'has-scroll' : ''}`}>
                    {product?.images?.map((image, index) => (
                        <img
                            className={`productDetail_pictures_preview ${mainImage === image ? 'active' : ''}`}
                            key={index}
                            src={image}
                            alt="preview"
                            onClick={() => setMainImage(image)}
                        />
                    ))}
                </div>
            </div>

            <div >
                <img className="productDetail_pictures_right"
                     src={mainImage}
                     alt={product.title}/>
            </div>
        </div>
    );
};
export default ProductDetailPictures;