import { stock } from "../data/stock";

export const getStock = (success) => {
    const promis = new Promise(
        (resolve, reject) => {
            setTimeout( //this would be replaced with getting the values from the API
                () => {
                    if(success){
                        resolve(stock); //resolve could return the value from the API
                    } else {
                        reject(stock);
                    }
                },
                500
            )
        }
    )
    console.log("Promise Created.")

    return promis;
}