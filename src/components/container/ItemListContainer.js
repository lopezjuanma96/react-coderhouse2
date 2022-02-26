import './ItemListContainer.css'
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

    useEffect( 
        () => {
            const productsRef = collection(db, 'productos');
            const q = catId ? query(productsRef, where('category', '==', catId)) : productsRef;
            getDocs(q).then( 
                (res) => {
                    console.log("Products Loaded successfully");

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