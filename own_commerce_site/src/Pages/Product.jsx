import React, { useContext } from 'react'
import BreadCrum from './../Components/BreadCrum/BreadCrum.jsx';
import ProductDisplay from './../Components/ProductDisplay/ProductDisplay.jsx';
import DescriptionBox from './../Components/DescriptionBox/DescriptionBox.jsx';
import RelatedProducts from './../Components/RelatedProducts/RelatedProducts.jsx';
import { ShopContext } from '../Context/ShopContext.jsx';
import { useParams } from 'react-router-dom';

export default function Product() {
    const {all_product} = useContext(ShopContext);
    const {productId} = useParams();
    const product = all_product.find((e) => e.id === Number(productId))

    return (
        <div>
            <BreadCrum product={product}/>
            <ProductDisplay product={product}/>
            <DescriptionBox />
            <RelatedProducts />
        </div>
    )
}
