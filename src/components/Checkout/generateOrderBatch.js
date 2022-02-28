import { addDoc, collection, writeBatch, query, where, documentId, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

export const generateOrderBatch = async (values, setOrderId, cart, cartTotalPrice, clearCart) => {

    let order = {
        comprador : Object.fromEntries(Object.entries(values).filter(([key, val]) => key !== "email_val")), //filters email_validation from document entry
        items : cart,
        total : cartTotalPrice(),
        ts : new Date()
    }

    //batch creation
    const orderBatch = writeBatch(db);
    const productsRef = collection(db, "products");
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