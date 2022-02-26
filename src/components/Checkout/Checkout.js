import { addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react"
import { db } from "../../firebase/config";
import { CartContext } from "../utils/CartContext"


export const Checkout = () => {

    const { cart, cartTotalPrice } = useContext(CartContext);
    const [ values, setValues ] = useState({
                                            name : "",
                                            email : "",
                                            phone : ""
                                        })

    let orden = {
        comprador: {
            name : "Juan",
            email : "ll@yahoo.com",
            phone : "123345"
        },
        items : cart,
        total : cartTotalPrice()
    }

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
            total : cartTotalPrice()
        }
        
        const ordersRef = collection(db, "orders");
        addDoc(ordersRef, orden)
            .then((doc) => console.log(doc.id))
            .catch((e) => console.log(e))
        
        console.log(orden);
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