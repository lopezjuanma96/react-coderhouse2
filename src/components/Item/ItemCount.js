import './ItemCount.css';
import { useState, useContext } from 'react';
import { CartContext } from '../utils/CartContext';

export const ItemCount = ({min = 0, max, toAdd}) => {

    const {id, singular, plural, price} = toAdd;

    const {addToCart, howMany} = useContext(CartContext);
    const [counter, setCounter] = useState(howMany(id));

    const addToCartHandler = () => {
        addToCart({id, singular, plural, counter, price});
    }

    const handleSuma = (e) => {
        e.stopPropagation();
        //console.log(e);
        counter < max && setCounter(counter + 1);
    }
    const handleResta = (e) => {
        e.stopPropagation();
        //console.log(e);
        counter > min && setCounter(counter- 1);
    }

    return (
        <>
            <div className="addToCartCounter">
                <button onClick={handleResta} className="addToCartButton">-</button>
                <p>En Carrito: {counter}</p>
                <button onClick={handleSuma}className="addToCartButton">+</button>
            </div>
            <button className="addToCartButton" onClick={addToCartHandler}>AÑADIR</button>
        </>
    )
}