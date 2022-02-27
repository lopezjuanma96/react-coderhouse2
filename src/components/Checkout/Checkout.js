import { addDoc, collection, writeBatch, query, where, documentId, getDocs } from "firebase/firestore";
import { useContext, useState } from "react"
import { db } from "../../firebase/config";
import { CartContext } from "../utils/CartContext"
import { Navigate, Link } from 'react-router-dom';
import { validateCheckoutFields } from "./validateCheckoutFields";


export const Checkout = () => {

    const { cart, cartTotalPrice, clearCart } = useContext(CartContext);
    const [ values, setValues ] = useState({
                                            name : "",
                                            email : "",
                                            phone : ""
                                        });
    const [ orderId, setOrderId ] = useState(null);
    const [ invalidFields, setInvalidFields ] = useState({});

    const fieldList = {
        name : {
            label : "Nombre",
            type : "text",
            ph : "Nombre Apellido"
        },
        email : {
            label : "Tu correo",
            type : "email",
            ph : "usuario@correo.com"
        },
        email_val : {
            label : "Tu correo nuevamente",
            type : "email",
            ph : "usuario@correo.com"
        },
        phone : {
            label : "Tu teléfono",
            type : "text",
            ph : "#########"
        },
    }

    //batch async callback
    const generateOrderBatch = async () => {
        
        order = {
            comprador : values,
            items : cart,
            total : cartTotalPrice(),
            ts : new Date()
        }

        //batch creation
        const orderBatch = writeBatch(db);
        const productsRef = collection(db, "productos");
        const orderssRef = collection(db, "orders");
        
        const q = query(productsRef, where(documentId(), "in", cart.map((item) => item.id)));
        //documentId gets the Id of each document on the collection passed by on productsRef

        const prods = await getDocs(q); //await waits for the async function to finish
        const outOfStock = [];

        prods.docs.forEach((eachDoc) => {
            const itemToUpdate = cart.find((item) => item.id === eachDoc.id);

            if (eachDoc.data().quantity >= itemToUpdate.counter){
                orderBatch.update(eachDoc.ref, //this replaces doing doc(db, eachDoc.id)
                                  {quantity: eachDoc.data().quantity - itemToUpdate.counter} //similar to updateDoc we pass the props to modify
                                )
            } else {
                outOfStock.push(itemToUpdate);
            }

            if (outOfStock.length === 0){
                addDoc(orderssRef, order)
                    .then((resp) => {
                        orderBatch.commit(); //this does the final update
                        setOrderId(resp.id);
                        clearCart();
                    })
            } else {
                alert("Algunos productos no tienen suficiente stock para la compra");
            }
        })
    }

    let order = {}

    const handleInputChange = (e) => {
        delete invalidFields[e.target.id]
        setValues({...values, [e.target.id] : e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        //validating fields
        const check = validateCheckoutFields(values, setInvalidFields); //this check is used because setInvalidFields is asynchronous, see how to improve it
        if (Object.keys(check).length > 0) return;

        generateOrderBatch();
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
                { Object.keys(fieldList).map( (elem) => {
                    return(
                        <>
                        <label for={elem}>{fieldList[elem].label}</label>
                        {Object.keys(invalidFields).find((e) => e === elem)
                        ? <input className="checkoutFormInput checkoutFormInputInvalid"
                                type={fieldList[elem].type}
                                placeholder={invalidFields[elem]}
                                id={elem}
                                name={elem}
                                value=""
                                onChange={handleInputChange}
                                />
                                : <input className="checkoutFormInput"
                                type={fieldList[elem].type}
                                placeholder={fieldList[elem].ph}
                                id={elem}
                                name={elem}
                                onChange={handleInputChange}
                                />
                            }
                        </>
                    );
                })}
                <button className="CheckoutFormSubmit" type="submit" onClick={handleSubmit}>Enviar</button>
            </form>
        </div>
    )
}