import { ShopContext } from '../../Context/ShopContext';
import './CartItems.css';
import React, { useContext } from 'react'
import remove_icon from './../Assets/cart_cross_icon.png';

export default function CartItems() {
    const {all_product, cartItems, reduceItemFromCart, removeFromCart, addToCart, getTotalCartAmount} = useContext(ShopContext);

    return (
        <div className='CartItems'>
            <div className="CartItemsFormatMain">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p className='QuantityHeading'>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr className='CartItemsFormatMainHr'/>
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div className='CartItemsFormatOuter'>
                            <div className="CartItemsFormat CartItemsFormatMain">
                                <img src={e.image} alt="" className='CartIconProductIcon' />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <div className='CartItemsQuantityOuter'>
                                    <p onClick={() => {addToCart(e.id)}}>+</p>
                                    <button className='CartItemsQuantity'>{cartItems[e.id]}</button>
                                    <p onClick={() => {reduceItemFromCart(e.id)}}>-</p>
                                </div>
                                
                                <p>${e.new_price * cartItems[e.id]}</p>
                                <img className='CartItemsRemoveIcon' src={remove_icon} alt="" onClick={() => {removeFromCart(e.id)}}/>
                            </div>
                            <hr />
                        </div>
                    )
                }
                return null;
            })}

            <div className="CartItemsFormatMainMobile">
                {all_product.map((e) => {
                    if (cartItems[e.id] > 0) {
                        return (
                            <div className='ProductBoxMobile'>
                                <div className="CartItemsFormatMobile">
                                    <img src={e.image} alt="" />
                                    <div className="ProductBoxMobileRight">
                                        <p className='ProductBoxMobileRightName'>{e.name}</p>
                                        <div className='flex'>
                                            <p className='ProductBoxMobileRightPrice'>${e.new_price}</p>
                                            <p className='ProductBoxMobileRightRemove'
                                            onClick={() => {removeFromCart(e.id)}}
                                            >Remove</p>    
                                        </div>
                 
                                    </div>
                                </div>
                                <div className="ProductBoxMobileQuantity">
                                    <p onClick={() => { addToCart(e.id) }}>+</p>
                                    <button className='ProductBoxMobileQuantityBox'>{cartItems[e.id]}</button>
                                    <p onClick={() => { reduceItemFromCart(e.id) }}>-</p>
                                    <p className='ProductBoxMobileQuantityTotal'>Total: ${e.new_price * cartItems[e.id]}</p>
                                </div>
                                <hr className='ProductBoxMobileHr' />
                            </div>
                        )
                    }
                })}
            </div>

            <div className="CartItemsDown">
                <div className="CartItemsTotal">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="CartItemsTotalItem">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="CartItemsTotalItem">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="CartItemsTotalItem font-bold">
                            <p>Total</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                    </div>
                    <button className='CheckOutButton'>PROCEED TO CHECKOUT</button>
                </div>
                <div className="CartItemsPromoCode">
                    <p>If you've a promo code, Enter it here</p>
                    <div className="CartItemsPromobox">
                        <input type="text" placeholder='promo code'/>
                        <button className='SubmitButton'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
