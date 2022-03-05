import './ItemDetail.css';
import { defaultText } from '../data/defaultText';
import { ItemCount } from "./ItemCount";
import { CartContext } from '../utils/CartContext';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getImageFromStorage } from './getImageFromStorage';

export const ItemDetail = ({product}) => {
    let {id, nameS: singular, nameP:plural, price, quantity: amt, image:img} = product;

    const {addToCart} = useContext(CartContext);
    const [amtCart, setAmtCart] = useState(0);

    const [imgURL, setImageURL] = useState("http://via.placeholder.com/300x300")
    getImageFromStorage(img, setImageURL);

    const onAdd = (counter) => {
        setAmtCart(counter);
        addToCart({id, singular, plural, counter, price});
    }

    return(
        <>
            <div className="itemBlock">
                <img className="itemImage" src={imgURL} alt={id}></img>
                <div className="itemDescriptionBlock">
                    <h2 className="itemName">{amt>1? plural:singular}</h2>
                    <p className="itemDescription">{defaultText}</p>
                </div>
                <div className="itemStockBlock">
                    <p className="itemPrice">${price}</p>
                    <p className="itemStock">En stock: {amt}</p>
                    <div className="addToCartBlock">
                        {amtCart > 0 ?
                        <Link to="/cart" className="endPurchaseContainer">
                            <button className="endPurchase">Terminar compra</button>
                        </Link>
                        :<ItemCount max={amt} onAdd={onAdd}/>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}