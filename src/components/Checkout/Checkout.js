import { addDoc, updateDoc, getDoc, doc, collection } from "firebase/firestore";
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
        setValues({...values, [e.target.id] : e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        //validating fields
        for (const prop in values) {
            if (values[prop].length === 0){
                alert(`El campo ${prop} se encuentra vacío`)
                return;
            }
        }

        let phoneRegex = RegExp('[^0-9]');
        if(phoneRegex.exec(values.phone)){
            alert("El número de teléfono contiene caractéres no numéricos");
            return;
        }

        orden = {
            comprador : values,
            items : cart,
            total : cartTotalPrice(),
            ts : new Date()
        }
        
        const ordersRef = collection(db, "orders");
        addDoc(ordersRef, orden)
            .then((resp) => {
                //updating the stock: since we dont have a backend defined, we have to do all updates on server
                //which takes time and space, that's the disadvantage of Firebase
                cart.forEach((item) => {
                    const docRef = doc(db, "productos", item.id);
                    getDoc(docRef)
                        .then((prod) => {
                            updateDoc(docRef, {quantity: prod.data().quantity - item.counter})
                        })
                })
                //console.log(resp.id);
                setOrderId(resp.id);
                clearCart();
            })
            .catch((e) => console.log(e))
        
        //console.log(orden);
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