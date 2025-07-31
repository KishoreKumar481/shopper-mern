import './RelatedProducts.css';
import React from 'react'
import data_product from './../Assets/data.js';
import Item from './../Item.jsx';

export default function RelatedProducts() {
    return (
        <div className='RelatedProducts'>
            <h1>Related Products</h1>
            <hr />
            <div className="RelatedProductsItem">
                {data_product.map((item, i) => {
                    return <Item key={i}
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            new_price={item.new_price}
                            old_price={item.old_price}
                    />
                })}
            </div>
        </div>
    )
}
