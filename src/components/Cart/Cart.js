import './Cart.css';

import { CartContext } from '../utils/CartContext';
import { useContext } from 'react';
import { CartItem } from './CartItem';
import { Link } from 'react-router-dom';

export const Cart = () => {
    const {cart, clearCart, cartTotalPrice } = useContext(CartContext);

    return (
        <div className="cartBlock">
            <h2 className="cartTitle"> Tu Carrito</h2>
            {cart.map( (e) => <CartItem key={e.id} prod={e}/> )}
            <button className="clearCartButton" onClick={clearCart} disabled={cart.length === 0}>Vaciar Carrito</button>
            {cart.length === 0? 
                <Link to="/"><button className="checkoutButton">Volver</button></Link>
                :<div className="checkoutBlock">
                    <p className="checkoutPrice"> $ {cartTotalPrice()}</p>
                    <Link to="/check"><button className="checkoutButton">Terminar Compra</button></Link>
                </div>
            }

        </div>
    )

}