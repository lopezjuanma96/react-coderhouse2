/*
Procesos asincrónicos: tiene que ver con poder ejecutar cosas en la página en paralelo, 
por ejemplo solicitar una petición a un server y mientras seguir cambiando algunas cosas hasta que llegue.

Una metodología para trabajar asincronismo son los callbacks, fueron los primeros en desarrollarse y
ya hoy son un poco pasadas de epoca, no eficientes ni eficaces.

Actualmente Javascript implemento las promesas
*/

//PROMESAS: Objetos (los callbacks eran funciones) que poseen 3 estados posibles: Pending, Fullfilled, Rejected

//IMPORTANTE: SUELE CONVENIR PONER LAS PROMESAS (Y TODO LO ASINCRONO) EN useEffect PARA QUE SOLO SE EJECUTEN EN MONTADO,
//PORQUE A VECES REACT MONTA ALGUNAS PARTES MAS DE UNA VEZ (o lo hacmeos nosotros a traves de otros Estados) Y ESTARÍAMOS
//HACIENDO MÁS DE UNA EJECUCION DE LA FUNCION, QUE SI POR EJEMPLO ES UN LLAMADO PUEDE TERMINAR LA CANTIDAD DE LLAMADOS DISPONIBLES DEL
//SERVIDOR QUE TENIAMOS DISPONIBLES.

export const Promesas = () => {
    const promesa = new Promise( (resolve, reject) => { //una promesa recibe como parámetro una función con otros dos parámetros, resolve y reject
        
        setTimeout(() => {resolve("Promesa resuelta"); }, 5000); //simulamos una accion (peticion a servidor por ejemplo) de 5 segundos, en los cuales el estado de la promesa va a estar pending y luego en resolved

        //resolve("Promesa resuelta"); //solo hay resolucion
        //reject("Promesa fallida"); //solo hay rechazo
    }
    )

    //console.log(promesa);

    promesa.then( //lo que sucede cuando la promesa finaliza
        (response) => { //primer parámetro: que hacer si se ejecuta correctamente, el paramtero response recibe lo que se pase en resolve() en el objeto Promise
            console.log("then:", response);
        },
        (response) => { //segundo parámetro: que hacer si se ejecuta incorrectamente, el paramtero response recibe lo que se pase en resolve() en el objeto Promise
            console.log("then:", response);
        }
    ).catch( //para el rechazo (ver diferencia con onrejected de then)
        (err) => {
            console.log("catch:", err)
        }
    ).finally( //lo que sucede al finalizar la promesa indistinto a si se rechaza o acepta
        () => {
            console.log("finally:", "Se terminó");
        }
    ) //como estos metodos retornan a la misma promesa los puedo concatenar

    return(<hr/>);
}

//CADA PROMESA SE RESUELVE O RECHAZA UNA UNICA VEZ; Y NO EXISTE UNA POSIBILIDAD INTERMEDIA DE DECIR SE RECHAZO EN CIERTO PORCENTAJE Y EN OTRO SE RESOLVIO
//el metodo fetch genera una promesa, por eso sus metodos eran then y catch




/* Lo que puedo hacer es generar una funcion que retorne una promesa segun como cambia alguno de los valores o parametros de dicha funcion:

const solicitarDatos = (result) => {
    return( 
        new Promise(
            (resolve, reject) => {
                if(result){
                    resolve("Se pudo! :)");
                } else {
                    reject("No se pudo!")
                }
            }
        )
    )
}

solicitarDatos(true).then(
    (response) => {console.log(resolve)};
). catch(
    (err) => {console.log(err)};
)

//dentro de la concatenación puedo retornar otras promesas que cambien la ruta de manejos:

solicitarDatos(false).then(
    (response) => {console.log(resolve)};
).catch(
    (err) => {
        console.log(err);
        return(new solicitarDatos(true));
    };
).then( //
    (response) => {
        console.log(response);
    }
)
*/



/*Como hacemos que nuestro componente responda al llamado? creamos un estado con su setState que cambie en los then y catch

DE NUEVO, ES IMPORTANTE ENTONCES QUE USEMOS EL useEffect para que al cambiar el estado de la respuesta no se vuelva a generar la petición

VER TAMBIÉN MÉTODOS async Y await*/


//MAP: podemos usar la funcion map para transformar los resultados de una petición en elementos JSX

export const CMap = () => {

    const arr = ["hola", "mundo"]; //JSX (y por lo tanto react) puede renderizar arrays en el DOM que tengan elementos nativos pero no objetos
    const arrTag = [<h1>Hola</h1>, <h2>Mundo</h2>] //pero también puedo renderizar objetos DOM del array
    const arrObj = [
        {nombre: "Juan", apellido:"Perez"},
        {nombre: "Pedro", apellido: "Ramirez"}
    ]

    return(
        <>
        {arr}
        {arrTag}
        {arr.map( (elem) => {return(<p><b>{elem}</b></p>)})}
        {arrObj.map(
            (elem) => {
                return(
                    <p>{elem.nombre}<b>{elem.apellido}</b></p>
                )
            }
        )}
        </>
    ); //tambien puedo usar map para mapear un array con elementos que pueden o no ser reenderizados en elementos DOM
}

/* Si observamos la consola nos advierte que cada elemento de una lista de dom a renderizar debe tener un atributo key único e irrepetible,
el mismo lo podemos sacar de alguna propiedad de los objetos del array o usar el indice que nos devuelve map:

map( (elem, id) => {<p key={i}>{elem.nombre}<b>{elem.apellido}</b></p>} )}
*/

//---------------------------------------------------------------------------------------------------------------------

/*también se puede usar el operador spread de cada elemento:
map( (elem, id) => {<p key={i}>{...elem}</p>} )

obviamente en este caso no podría ponerle el bold al apellido, pero si en vez de usar tag p y b uso tags propias puedo
pasar el spread como propiedades del componente (children o no) y desectructurarlo en la definicion del componente (esto sería lo correcto)

En este caso el elemento CMap sería Contenedor y el componente que me desglose los elementos y los arme sería un componente De presentacion.
*/

//------------------------------------------------------------------------------------------------------------------------

/* Entonces puedo crear un componente que procese cada elemento en algún dom que yo quiera mostar y mapearlo sobre un array que puede provenir, por ejemplo,
de la petición a un server*/