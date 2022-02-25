import './ItemCount.css';
import { useState } from 'react';

export const ItemCount = ({min = 0, max, onAdd}) => {

    const [counter, setCounter] = useState(min);

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
                <button onClick={handleResta} className="addToCartButton" disabled={counter === min}>-</button>
                <p>{counter}</p>
                <button onClick={handleSuma}className="addToCartButton" disabled={counter === max}>+</button>
            </div>
            <button className="addToCartButton" disabled={counter === 0} onClick={() => onAdd(counter)}>AÑADIR</button>
        </>
    )
}