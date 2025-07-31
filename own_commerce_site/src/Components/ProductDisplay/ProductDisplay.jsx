import './ProductDisplay.css';
import React, { useContext } from 'react'
import star_icon from './../Assets/star_icon.png';
import star_dull_icon from './../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

export default function ProductDisplay(props) {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);

    return (
        <div className='ProductDisplay'>
            <div className="ProductDisplayLeft">
                <div className="ProductDisplayImgList">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="ProductDisplayImage">
                    <img src={product.image} alt="" className="ProductDisplayMainImg" />
                </div>
            </div>
            <div className="ProductDisplayRight">
                <h1>{product.name}</h1>
                <div className="ProductDisplayRightStars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="ProductDisplayRightPrices">
                    <div className="ProductDisplayRightPriceOld">
                        ${product.old_price}
                    </div>
                    <div className="ProductDisplayRightPriceNew">
                        ${product.new_price}
                    </div>
                </div>
                <div className="ProductDisplayRightDescription">
                This green solid bomber jacket features a full-zip closure, slim fit design, and modern style—perfect for adding a sleek edge to your everyday look.
                </div>
                <div className="ProductDisplayRightSize">
                    <h1>Select Size</h1>
                    <div className="ProductDisplayRightSizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={() => {addToCart(product.id)}}>ADD TO CART</button>
                <p className="ProductDisplayRightCategory">
                    <span>Category: </span> Women, T-Shirt, Crop Top
                </p>
                <p className="ProductDisplayRightCategory">
                    <span>Tags: </span> Modern, Latest
                </p>
            </div>
        </div>
    )
}
