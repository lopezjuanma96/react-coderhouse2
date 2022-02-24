/* El desarrollo por componentes se basa en el diseño modular, de partes independientes y reutilizables*/
// Antes se usaban class based components, hoy se usan function base components, ver diferencias


/*se pueden crear con cualquier tipo de definicion de funciones, mientras se pueda asociar a algún nombre:

const Component = () => { return (JSX)}

function Component() { return (JSX)}


lo importante es que siempre retornen codigo JSX y se exporten, 
ademas React levanta warning si no empiezan con mayuscula

el return se puede poner sin parentesis pero requiere que el principio del JSX este en el mismo renglon

 BIEN                               MAL
return <div>
            ...
                                return
return(                             <div>
    <div>                               ...
        ...
)

El return debe devolver solo un unico elemento dom, que despues puede tener cuantos hijos se quiera
por lo que si tenemos varios los debemos envovler en otra etiqueta como div, section o incluso vacío
que React interpreta como main

return(
    <>
        <h1></h1>
        <h2></h2>
        <p></p>
    </>
)
*/

const Component = () => {
    return(
        <h3>Hola soy un componente</h3>
    );
}

export default Component 

/*
al export default lo puedo importar luego con cualquier nombre

para exportar más de uno se usan llaves (sin default), y para importar mas de uno se usa deconstruccion

si quiero exportar sin default debo ponerlo antes de la definicion de la funcion "export const Component=.."
y luego importarlo obligatoriamente con llaves import {Component} from

En general se usa un script por cada componente asi que cualquiera de las dos suelen ser validas
por lo que suelen decidirse por equipo
*/

/*REACT DEV TOOLS: Extension de Chrome para poder analizar los componentes desde el inspector del navegador */

/*Propiedades: Manera de trabajar con atributos de padres a hijos en JSX, me permiten generar el flujo de datos
de arriba a abajo y el flujo de acciones de abajo a arriba (movimiento unidireccional)*/

export const ComponentParam = (props) => {

    console.log(props)

    return(
        <>
        <ul>
            <li>{props["título"]}</li>
            <li style={{color:props.color}}>{props.título}</li>
        </ul>
        </>
    );
}

/*en props podemos usar la destructuración, en general directamente sobre el parametro de la función

export const ComponentParam = ({título, color: estilito}) => {
    ...
}*/


/* PATRONES: Generalidades de los compoenentes:

Dos tipos de componentes:

-> De Presentación: Muestran datos
                    Generalmente reciben propiedades como atributos que modifican lo que se muestra.
                    Aspecto visual
                    Suelen ser stateless

-> Contenedores: Encapsulan otros componentes
                 Se encargan de trabajar la lógica, de qué componentes contenedores se van a mostrar y cómo
                 Generalmente reciben condiciones o funciones como atributos que modifican la lógica de lo que se muestra
                 También se llaman state components
                 Llaman a las APIs externas y en base a su respuesta modifican la página

ya que es un paradigma recomendado, pueden aparecer componentes mixtos, en especial cuando se trata de 
datos y lógica muy simples que no requieren una separación para mantener un orden
*/

/* CHILDREN: si en vez de usar a los componentes como etiquetas autocerradas las hago como etiquetas con 
apertura y cierre, todas las etiquetas y elementos que incluya adentro se pasan a la función de dicho componente
principal como parametro

function App() {
    return( 
        <Component>
            <ComponentChildren/>
            <h1>Hola</h1>
        </Component>
    );
}

function Component(params){
    console.log(params) -> en ese params están los dos hijos ComponentChildren y h1 como atributo children

    return(
        <section style={{color: "red"}}>
            {params.children}
        </section>
    )
}

Este método de trabajar es bastante compolejo y se utiliza en desarrollos con requerimientos específicos, conviene
empezar usando otras cosas más basicas.
*/

/*Estilos: Existen varias maneras de encarar los estilos en React

El más comun es tener una hoja de estilos general e importarlo en la App.js
El más práctico es tener estilos separados para cada Componente e importarlo en cada componente, para lo cual
es útil tener una carpeta por cada componente

Existen frameworks que unen React con frameworks de estilo como Bootstrap o Material UI.
*/
