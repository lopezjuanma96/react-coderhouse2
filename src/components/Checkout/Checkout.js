import { addDoc, updateDoc, getDoc, doc, collection, writeBatch, query, where, documentId, getDocs } from "firebase/firestore";
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
        
        generateOrderBatch();
        /*
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
        */
        
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