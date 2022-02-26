import './Cart.css';

import { CartContext } from '../utils/CartContext';
import { useContext } from 'react';
import { CartItem } from './CartItem';
import { Link } from 'react-router-dom';

export const Cart = () => {
    const {cart, clearCart} = useContext(CartContext);

    return (
        <div className="cartBlock">
            <h2 className="cartTitle"> Este es tu Carrito</h2>
            {cart.map( (e) => <CartItem key={e.id} prod={e}/> )}
            <button className="clearCartButton" onClick={clearCart} disabled={cart.length === 0}>Vaciar Carrito</button>
            <Link to={cart.length === 0? "/":"/check"}><button className= "checkoutButton">Terminar Compra</button></Link>
        </div>
    )

}