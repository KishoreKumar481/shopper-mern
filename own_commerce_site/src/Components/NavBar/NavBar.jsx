import React, { useContext, useState } from 'react'
import logo from './../Assets/logo.png';
import cart_icon from './../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

export default function NavBar() {
    const [menu, setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);

    return (
        <>
        <div className='NavBar'>
            <div onClick={() => {setMenu("shop")}} className="NavBarLogo">
                <img src={logo} alt="" />
                <Link to='/'><p>SHOPPER</p></Link>   
            </div>
            <ul className="NavBarMenu">
                <li onClick={() => {setMenu("shop")}}>
                    <Link to='/'>Shop</Link> 
                {menu == "shop" ? <hr /> : <></>}</li>

                <li onClick={() => {setMenu("men")}}>
                    <Link to='/men'>Men</Link> 
                {menu == "men" ? <hr /> : <></>}</li>

                <li onClick={() => {setMenu("women")}}>
                    <Link to='/women'>Women</Link> 
                {menu == "women" ? <hr /> : <></>}</li>

                <li onClick={() => {setMenu("kids")}}>
                    <Link to='/kids'>Kids</Link> 
                {menu == "kids" ? <hr /> : <></>}</li>
            </ul>
            <div className="NavBarCart">
                {
                    localStorage.getItem('auth-token')
                    ? <button onClick={() => {localStorage.removeItem('auth-token');
                        window.location.replace('/')
                    }}>Logout</button>
                    : <Link to='/login'><button>Login</button></Link>
                }
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="NavBarCartCount">{getTotalCartItems()}</div>
            </div>
        </div>
        <div className="NavBarMenuMobile">
        <li onClick={() => {setMenu("shop")}}>
                    <Link to='/'>Shop</Link> 
                {menu == "shop" ? <hr /> : <></>}</li>

                <li onClick={() => {setMenu("men")}}>
                    <Link to='/men'>Men</Link> 
                {menu == "men" ? <hr /> : <></>}</li>

                <li onClick={() => {setMenu("women")}}>
                    <Link to='/women'>Women</Link> 
                {menu == "women" ? <hr /> : <></>}</li>

                <li onClick={() => {setMenu("kids")}}>
                    <Link to='/kids'>Kids</Link> 
                {menu == "kids" ? <hr /> : <></>}</li>
        </div>
        </>
    )
}
