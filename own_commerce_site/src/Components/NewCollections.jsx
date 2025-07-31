import React, { useEffect, useState } from 'react'
import Item from './Item.jsx';

export default function NewCollections() {
    const [new_collections, setNew_collections] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/newcollections')
            .then((res) => res.json())
            .then((data) => setNew_collections(data))
    }, [])

    return (
        <div className='NewCollections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="Collections">
                {new_collections.map((item, i) => {
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
