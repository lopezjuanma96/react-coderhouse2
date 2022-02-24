import './Cart.css';

import { CartContext } from '../utils/CartContext';
import { useContext } from 'react';
import { CartItem } from './CartItem';

export const Cart = () => {
    const {cart, clearCart} = useContext(CartContext);

    return (
        <div className="cartBlock">
            <h2 className="cartTitle"> Este es tu Carrito</h2>
            {cart.map( (e) => <CartItem key={e.id} prod={e}/> )}
            {cart.length > 0?
                <button className="clearCartButton" onClick={clearCart}>Vaciar Carrito</button>
                :<button className="clearCartButton" disabled>Vaciar Carrito</button>
            }
        </div>
    )

}