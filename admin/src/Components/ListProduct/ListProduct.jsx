import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

export default function ListProduct() {
    const url = 'https://shopper-backend-ug5r.onrender.com'
    const [allproducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        await fetch(`${url}/allproducts`)
            .then((res) => res.json())
            .then((data) => { setAllProducts(data) })
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    const remove_product = async(id) => {
        await fetch(`${url}/removeproduct`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        })
        await fetchInfo();
    }

    return (
        <div className='list-product'>
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allproducts.map((product, index) => {
                    return <>
                        <div key={index} className="listproduct-format-main listproduct-format">
                            <img src={product.image} alt="" className="listproduct-product-icon" />
                            <p>{product.name}</p>
                            <p>${product.old_price}</p>
                            <p>${product.new_price}</p>
                            <p>{product.category}</p>
                            <img onClick={() => {remove_product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />
                        </div>
                        <hr />
                    </>
                })}
            </div>
        </div>
    )
}
