import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStock } from "../utils/promises";
import {ItemDetail} from "../Item/ItemDetail";
import { InvalidPage } from "../utils/InvalidPage";

export const ItemDetailContainer = () => {

    let [productState, setProductState] = useState({});
    let [loaded, setLoaded] = useState(false);
    let {itemId} = useParams();

    useEffect(
        () => {
            getStock(true).then(
                (res) => {
                    setProductState(res.find((elem) => elem.id === itemId));
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