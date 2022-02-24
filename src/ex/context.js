/*
se utiliza cuando tengoq ue pasar un componente de un padre a un hijo más lejano entonces lo tengo que pasar entre todos los hijos
o cuando dos elementos necesitan compartir un dato pero son independientes o su relaci+on es muy lejana

Un contexto es básicamente un estado que se comparte en toda la app o en varios componentes juntos, como una variable global

creación:
const ThemeContext = React.createContext()
const ThemeContext = React.createContext(valor_inicial)

(en realidad como importamos directamente el createContext de 'react', usariamos ThemeContext = createContext())

uso:

- en un archivo context.js:

import {createContext} from 'react';
export const myContext = createContext();

- en App (u otro compoenente dentro del cual yo quiera compartir variables)

import {myContext} from 'context.js'

function App() {
    const user = "un usuario"
    <myContext.Provider value={user}>
        ...Resto de la App
    <myContext.Provider>
}

- en alguno de los hijos de App (o del componente que wrappee en el Provider)

import {useContext} from 'react'
import {myContext} from context.js

export const hijo = () => {

    const contexto = useContext(myContext); //contexto adquiere el valor que myCOntext tenga en value

}

//TAMBIEN SE PUEDEN PASAR OBJETOS 
const user = "usuario"
const data = 15
const admin = "yo"
<myContext.Provider value={{user, data, admin}}> //recordemos que crear un objeto con variables {var1, var2, var3} es un simplificado de hacer {var1:var1, var2:var2, var3:var3}

y luego se pueden acceder desde el useContext, incluso desectructurando


//Ejemplo de contextos:

usuario loggeado
carrito

*/


/*Custom provider

podemos crear un componente propio que tenga todas las funciones y parametros del provider del contexto que queremos

export const myContextProvider = () => {

    aca coloco todas las funciones y valores que voy a poner en el context

    <myContext.Provider values={{user, data, admin}}>
        {children} //ver abajo
    </myContext.Provider>
}
y luego en la app

import {myContextProvider}

function App() {

    return(
        <myCustomProvider>
            ... //todo lo que ponga aca va a pasar como children, por eso arriba en la definicion de provider los tuve que renderizar
        </myCustomProvider>
    )
}

*/