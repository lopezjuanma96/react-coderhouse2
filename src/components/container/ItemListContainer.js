import './ItemListContainer.css'
import { getStock } from '../utils/promises';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import { ItemList } from '../Item/ItemList';
import { InvalidPage } from '../utils/InvalidPage';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';

export const ItemListContainer = () => {
    
    let [stockState, setStock] = useState([]);
    let [loaded, setLoaded] = useState(false);
    let {catId} = useParams();

    //console.log(catId);
    //console.log(stockState.length);

    /*
    useEffect(
        () => {
            setLoaded(false);
            const productsRef = collection(db, 'productos');
            getDocs(productsRef)
                .then((resp) => {
                    //console.log(resp);
                    console.log(resp.docs.map((doc) => doc.data())); //resp es la collection encontrada, el parametro docs te da los documentos en dicha collection en forma de array
                    setLoaded(true);
                })
        },
        [catId]
    )*/

    useEffect( 
        () => {
            const productsRef = collection(db, 'productos');
            const q = catId ? query(productsRef, where('category', '==', catId)) : productsRef;
            getDocs(q).then( 
                (res) => {
                    console.log("Products Loaded successfully");
                    /*
                    let docList = res.docs.map(
                        (doc) => {return {
                            id: doc.id, //id has the doc id
                            ...doc.data() //data has each field on the doc
                        }
                    })
                    console.log(docList)
                    */
                    setStock(res.docs.map(
                        (doc) => {return {
                            id: doc.id, //id has the doc id
                            ...doc.data() //data has each field on the doc
                        }
                    }));
                }
            ).catch(
                (res) => {
                    console.log("Products Loading failed due to");
                    console.log(res);
                }
            ).finally(
                () => setLoaded(true)
            )
        },
        [catId]
    )

    return(
        loaded?
            stockState.length === 0 ?
                <InvalidPage msg="Categoría no encontrada"/>
                :<>
                <div className="header">
                    <h2 className="headerTitle">{catId? "Bienvenidos a " + catId + "!": "Bienvenidos al Shop!"}</h2>
                </div>
                <ItemList loaded={loaded} stock={stockState}/>
                </>
        : <h2>Loading</h2>
    );
}