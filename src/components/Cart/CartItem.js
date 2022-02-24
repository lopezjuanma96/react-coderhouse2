import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../utils/CartContext";

export const CartItem = ({prod}) => {
    const {id, singular, plural, counter, price} = prod;

    const {deleteFromCart} = useContext(CartContext);

    const deleteFromCartHandler = () => {
        deleteFromCart(id);
    }

    return(
        <div className="CartItemBlock">
            <Link to={'/item/'+id}>
                <h3 className="cartItemName">{counter > 1? plural: singular}</h3>
            </Link>
            <p className="cartItemQuant">Cantidad: {counter}</p>
            <p className="cartItemCost"><b>Costo Total: {counter*price}</b></p>
            <button className="cartItemDeleteButton" onClick={deleteFromCartHandler}>Eliminar</button>
        </div>
    )
}