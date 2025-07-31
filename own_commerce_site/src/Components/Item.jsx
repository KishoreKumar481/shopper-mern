import React from 'react'
import { Link } from 'react-router-dom'

export default function Item(props) {
    return (
        <div className='Item'>
            <Link to={`/product/${props.id}`}><img onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} src={props.image} alt="" /></Link>
            <p>{props.name}</p>
            <div className="ItemPrices">
                <div className="ItemNewPrice">
                    ${props.new_price}
                </div>
                <div className="ItemOldPrice">
                    ${props.old_price}
                </div>
            </div>
        </div>
    )
}
