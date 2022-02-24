import "./Item.css"
import { Link } from "react-router-dom";

export const Item = ({product}) => {
    
    let {id, nameS: singular, nameP:plural, price, quantity: amt, image:img} = product;

    return (
        <Link to={'/item/'+id} className="productBlock">
            <img className="productImage" src={img} alt={id}></img>
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