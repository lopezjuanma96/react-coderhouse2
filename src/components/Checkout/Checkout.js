import { useContext, useState } from "react"
import { CartContext } from "../utils/CartContext"
import { Navigate, Link } from 'react-router-dom';
import { validateCheckoutFields } from "./validateCheckoutFields";
import "./Checkout.css";
import { generateOrderBatch } from "./generateOrderBatch";
import { fieldList } from "./formData";

export const Checkout = () => {

    const { cart, cartTotalPrice, clearCart } = useContext(CartContext);
    const [ values, setValues ] = useState({
                                            name : "",
                                            email : "",
                                            email_val: "",
                                            phone : ""
                                        });
    const [ orderId, setOrderId ] = useState(null);
    const [ invalidFields, setInvalidFields ] = useState({});

    const handleInputChange = (e) => {
        delete invalidFields[e.target.id]
        setValues({...values, [e.target.id] : e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        //validating fields
        const check = validateCheckoutFields(values, setInvalidFields); //this check is used because setInvalidFields is asynchronous, see how to improve it
        if (Object.keys(check).length > 0) return;

        generateOrderBatch(values, setOrderId, cart, cartTotalPrice, clearCart);
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
                { Object.keys(fieldList).map( (elem, index) => {
                    return(
                        <div key={index} className="checkoutFormItem">
                        <label className="checkoutFormLabel" htmlFor={elem}>{fieldList[elem].label}</label>
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
                        </div>
                    );
                })}
                <button className="checkoutFormSubmitButton" type="submit" onClick={handleSubmit}>Finalizar Compra</button>
            </form>
        </div>
    )
}