import React from 'react'
import arrow_icon from './../Assets/arrow.png';
import hero_image from './../Assets/hero_image.png';

export default function Hero() {
    return (
        <div className='Hero'>
            <div className="HeroLeft">
                <div className="HeroLeft2">
                    <h2>NEW ARRIVALS ONLY</h2>
                    <p>new</p>
                    <p>collections</p>
                    <p>for everyone</p>    
                </div>

                <div className="HeroLatestBtn">
                    <div>Latest Collection</div>
                    <img src={arrow_icon} alt="" />
                </div>
            </div>
            <div className="HeroRight">
                <img src={hero_image} alt="" />
            </div>
        </div>
    )
}
