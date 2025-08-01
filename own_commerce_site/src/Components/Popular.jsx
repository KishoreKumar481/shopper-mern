import React, { useEffect, useState } from 'react'
import Item from './Item.jsx';

export default function Popular() {
    const url = 'https://shopper-backend-ug5r.onrender.com'
    const [popularProducts, setPopularProducts] = useState([]);

    useEffect(() => {
        fetch(`${url}/popularinwomen`)
            .then((res) => res.json())
            .then((data) => setPopularProducts(data))
    }, [])

    return (
        <div className='Popular'>
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className="PopularItem">
                {popularProducts.map((item, i) => {
                    return <Item 
                                key={i}
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
