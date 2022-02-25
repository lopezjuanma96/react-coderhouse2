import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStock } from "../utils/promises";
import {ItemDetail} from "../Item/ItemDetail";
import { InvalidPage } from "../utils/InvalidPage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export const ItemDetailContainer = () => {

    let [productState, setProductState] = useState({});
    let [loaded, setLoaded] = useState(false);
    let {itemId} = useParams();
    /*
    useEffect(
        () => {
            setLoaded(false);
            const docRef = doc(db, 'productos', itemId);
            getDoc(docRef).
                then((resp) => {
                    console.log(resp.data())
                })
        }
    )*/
    useEffect(
        () => {
            setLoaded(false);
            const docRef = doc(db, 'productos', itemId);
            getDoc(docRef)
                .then((res) => {
                    setProductState({ id: res.id, ...res.data()});
                }
            ).catch(
                (res) => {
                    console.log(res);
                }
            ).finally(
                () => {setLoaded(true)}
            )
        },
        [itemId]
    )

    return(
        loaded?
            productState?
                <ItemDetail product={productState}/>
                :<InvalidPage msg="Producto no encontrado"/>
            :<h2>Loading..</h2>
    )
}