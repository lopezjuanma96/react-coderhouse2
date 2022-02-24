import './ItemListContainer.css'
import { getStock } from '../utils/promises';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import { ItemList } from '../Item/ItemList';
import { InvalidPage } from '../utils/InvalidPage';

export const ItemListContainer = () => {
    
    let [stockState, setStock] = useState([]);
    let [loaded, setLoaded] = useState(false);
    let {catId} = useParams();

    //console.log(catId);
    //console.log(stockState.length);

    useEffect( 
        () => {
            setLoaded(false);
            getStock(true).then( 
                (res) => {
                    console.log("Products Loaded successfully");
                    setStock(catId ? res.filter((elem) => elem.category === catId)
                                :res);
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