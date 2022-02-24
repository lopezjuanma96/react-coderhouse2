import {useState, useEffect} from 'react';

//USO DE PROP CHILDREN

export function Boton ({children, text, click}) { //children queda reservado para todo lo que este entre las etiquetas que llaman al compoennte (<Boton>children</Boton>)

    console.log("Is this running again too? Yes"); //ver más abajo

    return(
        <div>
            <button className="myButton" onClick={click}>
                {text}
            </button>
            {children}
        </div>
    )
}
 
//se usaría tipo: <Boton text="Clickear" click={()=>{console.log("clickeo")}}><p>Soy un children</p></Boton>

//ESTADOS: variables atadas a componentes -> para crearlos se usan "hooks"
export const Clicker = () => {

    let clicks = 0; //Puesto así la variable cambia pero no se renderiza ese cambio
    console.log("This is running again"); //cada vez que cambiemos el estado este console log se reimprime

    let [state, setState] = useState(0); 
    /*useState(valor_inicial: undefined) crea un estado, y usamos desetructuracion de 
    arrays (ver nivelacion) para obtener el estado (el valor que cambia) y la funcion que lo cambia
    a diferencia de la desetructuracion de objetos, como los elementos del array no tienen nombres
    se le puede definir los nombres que quiera [clicks, setClicks] o [name, changeName], etc
    RECORDEMOS QUE HAY QUE IMPORTARLO*/

    const al_clickear = () => {
        clicks++; 
        console.log(clicks);
        setState(state + 1); 
        /*setState recibe como parametro el valor al que cambia el state asociado (linkeados al llamar a useState).
        Si quiero generar cambios más complejos puedo mandar un objeto más complejo en el valor inicial del useState (array u objeto propio)
        y mandar la actualizacion del mismo con el setState. Es importante el valor inicial porque sino se pone 
        undefined y no le puedo hacer actualizaciones (state + 1 = NaN si state es undefined)
        no puedo usar state++ porque la operacion ++ cambia el valor de state  pero no lo devuelve entonces state no recibe nada*/
    }

    return(
        <Boton text = "CLICK ME!" click={al_clickear}>
            <p>Clicks: {clicks}</p>
            <p>Clicks con estados: {state}</p>
            <p>Esta fecha se actualiza también: {new Date().toLocaleString()}</p>
        </Boton>
    );
}

/*Hay dos instancias donde React actualiza el DOM, volviendo a llamar al return de la función:

-CON EL CAMBIO DE ESTADOS: con useState creaamos el hook del estado al return. Es importante saber que se dispara 
todo el componente con su return entonces puedo tener un solo cambio de estado pero otras funciones que retornen cosas 
que se actualizen tambien

-CON EL CICLO DE VIDA:
*/

//CICLOS DE VIDA: un componente aparece (nace), cambia (crece) y desaparece (muere), 

/*A cada momento del ciclo se llama MONTAJE - ACTUALIZACION -DESMONTAJE, en cada uno de los momentos se puede

-(START): Inicio de la aplicación
-MONTAJE: Agregar el componente al DOM con el return (lo que vinimos haciendo hasta ahora)
-ACTUALIZACIONES: Nuevos renderizados una vez que se monta, uno de ellos el uso de ESTADOS
-DESMONTAJE: Componente se elimina del DOM

el proceso puede ciclarse y volver a iniciar

*/

//ACTUALIZACION HOOK DE EFECTO: useEffect: permite que una ffuncion se ejecute una sola vez en el montado y no en cada actualización

export const Cc = () => {

    let var_change = 0; //como no tengo donde se cambie esta variable, la funcion de useEffect solo se va a correr en el montaje
    const fn = () => {
        console.log("Se corre en el montado y si cambia var_change.");
    };
    const arr = [var_change];

    console.log("se corre en el montado y en cada actualización.");

    useEffect(fn, arr); 
    /*useEffect recibe una función y un array 
    la funcion se va a correr en el montaje y cada vez que se actualicen las 
    variables que se pasen dentro del array, si se actualizan otras variables no se ejecuta
    REVISAR BIEN EL EJEMPLO DEL VIDEO (1.40 hs)
    */

    let [state, setState] = useState(0);

    return(
        <>
            <button onClick = {() => {setState(state + 1)}}> Me presionaste {state} veces.</button>
            {state%2 === 0 ? <Par/>:null}
        </>
    );//Ese ultimo ternario nos permite montar y desmontar <Par/> segun el valor de state, también se puede hacer con {condicion && <Par/>}
}

// Si le agregamos una función en un return a useEffect, se ejecuta cuando se desmonte el componente, entonces

const Par = () => {
    let var_unchanged = 0;

    const f = () => {
        console.log("Par montado");
        return(() => console.log("Par desmontado"));
    }

    useEffect(f, [var_unchanged]);

    return(
        <p>Clicks PARES</p>
    );
}

//Es importante usar esto porque si el montaje de un componente me crea algo que perdure, por ejemplo un listener y no lo remuevo en el demontaje
//puede que se mantenga para siempre o incluso vuelva a crearse nuevamente en un nuevo montaje, se llama leak de efecto.

/* en resumen, useEffect de https://www.w3schools.com/react/react_useeffect.asp

recibe uno o dos parametros:
una funcion que se ejecuta en el montaje y en cada actualización de las dependencias (si es que las tiene) y que devuelve en su return otra funcion que se ejecuta en el desmontado
un array con las dependencias, que son variables que al cambiar llaman la ejecucion de la funcion del primer parametro, si no se pasa ninguna dependencia la funcion se ejecuta en todas las actualizaciones, si se pasa un array vacío solo se ejecuta en montaje (y el return en desmontaje)
*/

/*
Anatomía del Componente: (Ver presentación)

DOM Synchronization - Props - States - LifeCycle
*/
