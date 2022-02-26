import { addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react"
import { db } from "../../firebase/config";
import { CartContext } from "../utils/CartContext"
import { Navigate, Link } from 'react-router-dom';


export const Checkout = () => {

    const { cart, cartTotalPrice, clearCart } = useContext(CartContext);
    const [ values, setValues ] = useState({
                                            name : "",
                                            email : "",
                                            phone : ""
                                        });
    const [ orderId, setOrderId ] = useState(null);

    let orden = {}

    const handleInputChange = (e) => {
        //condicionar input
        setValues({...values, [e.target.id] : e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        /*usar condiciones para validar los campos
        if (values.name.length < 5){
            alert("El nombre es muy corto");
        }*/

        orden = {
            comprador : values,
            items : cart,
            total : cartTotalPrice(),
            ts : new Date()
        }
        
        const ordersRef = collection(db, "orders");
        addDoc(ordersRef, orden)
            .then((doc) => {
                console.log(doc.id);
                setOrderId(doc.id);
                clearCart();
            })
            .catch((e) => console.log(e))
        
        console.log(orden);
    }

    if (orderId) { //its important that this is above the cartlength's early return bc when orderId is set the cart is also emptied
        return(
            <>
                <h2>Tu ID de compra es {orderId}</h2>
                <Link to="/"><button className="as">Volver</button></Link>
            </>
        )
    }

    if (cart.length === 0){
        return <Navigate to="/"/>
    }


    return (
        <div className="checkoutFormBlock">
            <form className="checkoutForm">
                <input className="checkoutFormInput"
                       type="text"
                       placeholder="Tu nombre"
                       id="name"
                       name="name"
                       onChange={handleInputChange}
                />
                <input className="checkoutFormInput"
                       type="email"
                       placeholder="usuario@correo.com"
                       id="email"
                       name="email"
                       onChange={handleInputChange}
                />
                <input className="checkoutFormInput"
                       type="text"
                       placeholder="Tu teléfono"
                       id="phone"
                       name="phone"
                       onChange={handleInputChange}
                />
                <button className="CheckoutFormSubmit" type="submit" onClick={handleSubmit}>Enviar</button>
            </form>
        </div>
    )
}