import "./Item.css"
import { Link } from "react-router-dom";
import { useState } from "react"
import { getImageFromStorage } from "./getImageFromStorage";

export const Item = ({product}) => {
    
    let {id, nameS: singular, nameP:plural, price, quantity: amt, image:img} = product;

    const [imgURL, setImageURL] = useState("http://via.placeholder.com/300x300")
    getImageFromStorage(img, setImageURL);

    return (
        <Link to={'/item/'+id} className="productBlock">
            <img className="productImage" src={imgURL} alt={id}></img>
            <div className="productDescriptionBlock">
                <h2 className="productName">{amt>1? plural:singular}</h2>
                <p className="productPrice">${price}</p>
            </div>
            <div className="productStockBlock">
                <p className="productStock">En stock: {amt}</p>
            </div>
        </Link>
    );
}