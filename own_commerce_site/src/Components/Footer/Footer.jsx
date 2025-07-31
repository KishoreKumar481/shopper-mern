import React from 'react'
import './Footer.css';
import footer_logo from './../Assets/logo_big.png';
import instagram_icon from './../Assets/instagram_icon.png';
import pintester_icon from './../Assets/pintester_icon.png';
import whatsapp_icon from './../Assets/whatsapp_icon.png';

export default function Footer() {
    return (
        <div className='Footer'>
            <div className="FooterLogo">
                <img src={footer_logo} alt="" />
                <p>SHOPPER</p>
            </div>
            <ul className="FooterLinks">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="FooterSocialIcon">
                <div className="FooterIconsContainer">
                    <img src={instagram_icon} alt="" />
                </div>
                <div className="FooterIconsContainer">
                    <img src={pintester_icon} alt="" />
                </div>
                <div className="FooterIconsContainer">
                    <img src={whatsapp_icon} alt="" />
                </div>
            </div>
            <div className="FooterCopyright">
                <hr />
                <p>Copyright @ 2025 - All Right Reserved.</p>
            </div>
        </div>
    )
}
