import React, { useContext } from 'react'
import './CSS/ShopCategory.css';
import dropdown_icon from './../Components/Assets/dropdown_icon.png';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item';

export default function ShopCategory(props) {
    const {all_product} = useContext(ShopContext)

    return (
        <div className='ShopCategory'>
            <img src={props.banner} alt="" className="ShopCategoryBanner" />
            <div className="ShopCategoryIndexSort">
                <p>
                    <span>Showing 1-12</span> out of 36 products
                </p>
                <div className="ShopCategorySort">
                    Sort by <img src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className="ShopCategoryProducts">
                {all_product.map((item, i) => {
                    if (props.category === item.category) {
                        return <Item key={i} 
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                new_price={item.new_price}
                                old_price={item.old_price}
                               />
                    } else {
                        return null;
                    }
                })}
            </div>
            <div className="ShopCategoryLoadmore">
                Explore More
            </div>
        </div>
    )
}
