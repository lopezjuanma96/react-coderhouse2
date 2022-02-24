import { Item } from "./Item";

import "./ItemList.css"

export const ItemList = ({stock}) => {

    return (
        <>
            <div className="productList">
                {stock.map((el) => <Item key={el.id} product={el}/>)} 
            </div>
        </>
    );
}