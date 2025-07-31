import React from 'react'
import exclusive_image from './Assets/exclusive_image.png';

export default function Offers() {
    return (
        <div className='Offers'>
            <div className="OffersLeft">
                <div className="OffersLeft2">
                    <h1>Exclusive</h1>
                    <h1>Offers For You</h1>
                    <p>ONLY ON BEST SELLERS PRODUCTS</p>
                </div>
                <button>Check Now</button>
            </div>
            <div className="OffersRight">
                <img src={exclusive_image} alt="" />
            </div>
        </div>
    )
}
