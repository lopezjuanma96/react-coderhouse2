// NAVEGACION

/* Navegacion para:
- Users: entender la pagina y estar comodos
- Navegadores: poder controlar correctamente la pagina y presentarla bien en todos los formatos
- Crawlers: poder acceder correctamente a cada parte de la pagina, entendiendo la estructura y mejorando el SEO, la promocionalidad, etc.
*/

/*Organizacion para el e-shop:

Inicio -> Busqueda de productos/categorias -> detalle -> confirmacion (inclusion al carrito) -> fin (compra)
'/'   -> '/category' or '/category/id'     -> '/item/id/' ->          '/cart'                -> '/checkout'

La idea es que si bien tenemos una SPA, nuestra pagina reaccione a los links => usamos el React Router
https://reactrouter.com

npm install react-router-dom@6

hacemos el import como: import {BrowserRouter} from 'react-router-dom'

luego envolvemos a nuestra app en una etiqueta BrowserRouter

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="subpath de mi pagina" element=elemento a activar en ese path>
                <Route path="subpath de mi pagina" element=elemento a activar en ese path>
                <Route path="subpath de mi pagina" element=elemento a activar en ese path>
            <Routes/>
        </BrowserRouter>
    )
}

esta es para la version del router 6, la version de router 5 cambiaba bastante los nombres y definiciones, siempre tener en cuenta la doc

ETIQUETAS LINKS:

si usamos etiquetas <a></a> va a funcionar, pero no va a ser realmente una SPA ya que va a recargar en cada instancia la pagina de nuevo, poruqe eso es lo que hace la
etiqueta de link (sería como una spa a medias). Ademas cada vez que recargamos la pagina muchos elementos pierden su estado.

Entonces tenemos que hacer que el router capture los cambios de pagina, no el navegador. Para ello se usa la etiqueta Link de react router

import {Link} from 'react-router-dom';

<Link to="subpath de mi pagina" otros_parametros_similares_a_los_tags_a> Nombre </Link>

PARA QUE LOS LINKS FUNCIONEN EL NAVBAR TIENE QUE ESTAR DENTRO DEL ROUTER PERO NO DENTRO DE LAS ROUTES

(para paginas externas obviamente seguimos usando etiquetas a)

ETIQUETA NAVIGATE:

sirve para que podamos renderizar algo especifico si el usuario no entra a un link existente

import {Navigate} from 'reac-router-dom';
<Routes>
    <Route path="subpath de mi pagina" element=elemento a activar en ese path>
    <Route path="subpath de mi pagina" element=elemento a activar en ese path>
    <Route path="subpath de mi pagina" element=elemento a activar en ese path>
    <Route path="*" element={<Navigate to='/'/>}> //asi redireccionaría todo lo que no se encuentra a home
    <Route path="*" element={<Navigate to='/error404'/>}> //asi redireccionaría a una pagina 404 custom dentro del spa (debemos agregar el componente y el route correspondiente)
<Routes/>
*/

/*ROUTEADO CON PARAMETROS

Sirve para poder tomar datos de la URL que usa el router para hacer dinamicos a los elementos
los parametros se definen en el route como si fuera una sub pagina pero con : al principio (en la pagina no se agregan los dos puntos, es solo en react)

<Route path="subpath de mi pagina/:param" element=elemento a activar en ese path> //entrando a http://mipagina/subpath de mi pagina/valor entraria a la subpagina pasando el valor como param (ojo que deja de existir la ruta del subpath solo)

luego lo obtenemos con la funcion useParam() de React adentro del elemnto llamado por la Route

<Route path="logs/:logId" element={<LogPage/>}>

y luego en LogPage

import {useParams} from 'react-router-dom'

export const LogPage = () => {
    let params = useParams(); //devuelve un objeto {logId : 'valor'} cuando el usuario ingrese a mipagina/logs/valor
    let {logId : parameter} = useParams(); //puedo aplicarle deconstruccion también
}

para el proyecto el parametro lo podemos pasar tanto a la promesa como al then de la promesa para filtrar los datos que obtengamos
en algunas bases de datos va a cambiar de donde saco la info, en otras la info va a estar siempre en el mismo lugar pero teno que filtrarla a partir de alguna categoria.
en estos ultimos casos podemos usar la funcion filter de filter

en caso de que se ingrese al subpath sin parametro, useParams devuelve un undefined, recordemos que tenemos que agregarlo como una posible ruta
*/

