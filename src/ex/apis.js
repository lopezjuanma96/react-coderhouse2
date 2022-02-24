//MODELO CLIENTE-SERVIDOR
//FETCH: EL cliente solicita informacion del servidor, el cliete inicia la conversacion.
//PUSH: el servidor inicia la conversación (ej: push notifications). Requieren suscripciones al sistema push
//POLLING: en caso de que no existan push, tenemos que configurar al cliente para que constantemente este buscando datos nuevos (el cliente inicia la conversacion varias veces)

import { useEffect, useState } from "react";

/*Request via HTTPS:

Protocolo seguro más utilizado para llevar a cabo los modelos servidor-cliente
Componentes:

-URL

-VERBO: definen la accion
---GET: quiero obtener 
---POST: quiero crear 
---PUT: quiero crear o actualizar
---PATCH: quiero alterar parcialmente
---DELETE: quiero borrar

-PARAMETROS: de tipo query o segment

-PETICION: compuesta por
---HEADERS
---BODY

las paginas suelen tener documentacion de la api que indica como trabajarla, ejemplos: 
https://petstore.swagger.io/
https://developers.giphy.com/docs/api/ USA QUERY PARAMS
https://stripe.com/docs/api/products

*/

/* query Params:

URL BASE: https://www.google.com.ar/
URL con PARAMETRO: https://www.google.com.ar/search?q=coderhouse //en este caso le diria al servidor que me devuelva la busqueda "coderhouse"

URL BASE: https://api.giphy.com/v1/gifs/search //es importante ver que a veces los endpoint de las APIs no son iguales a los de la pagina web (giphy tiene direccion giphy.com)
URL con PARAMETRO: https://api.giphy.com/v1/gifs/search?api_key=1234&q=mono.jpg //notar que ? indica que ahi termina la url y arrancan los parametros, y & separa los parametros
*/

/* segment Params:

URL BASE: https://pokeapi.co/api/v2/pokemon o https://pokeapi.com/api/v2/games (esta en particular tiene distintos endpoints para cada tipo de datos a solicitar)
URL con PARAMETRO: https://pokeapi.co/api/v2/pokemon/1 //cada parametro se separa por barras

*/

/*método FETCH (Js): genera una petición al servidor entregado por la url, de tipo GET como predeterminado pero puede modificarse. 
Devuelve una promesa.

fetch(url, config) //config permite cambiar la peticion a PUT/POST/etc
*/

export const ApiControl = () => {

    const KEYq = '1234';
    const q = 'coderhouse';

    const urlq = `https://api.giphy.com/v1/gifs/search?api_key=${KEYq}&q=${q}`

    const s = '1';

    const urls = `https://pokeapi.co/api/v2/pokemon/${s}`

    //console.log(fetch(urls)); //devuelve una promesa, probablemente en pending, no me sirve

    //uso al fetch como una promesa
    let [pokemon, setPokemon] = useState(null); //podría inicializar el objeto en {} (objeto vacío) pero genera problemas cuando tomamos subpropiedades: o sea no tiene drama si yo hago pokemon.propiedad, pero si si hacemos pokempon.propiedad.subpropiedad, porque no hay drama mandar un null a JSX, pero si va a tener problema con null.subpropiedad, ya que {}.propiedad da null
    let [pokId, setPokId] = useState(1);

    console.log(pokemon);
    console.log("id:", pokId);

    const handleNextId = () => {
        setPokId(pokId +1);
    }

    const handlePrevId = () => {
        setPokId(pokId > 1? pokId-1: 1);
    }

    const urlsHandle = `https://pokeapi.co/api/v2/pokemon/${pokId}`
    useEffect(
        () => {

            fetch(urlsHandle).then(
                (res) => {
                    //console.log(res); observamos que devuelve un objeto tipo response, no todas las apis hacen ello, cada una devuelve la manera como maneje sus datos, y muchos te indican como transformarlo por ejemplo a JSON (generalmente obj.json())
                    return(res.json()); //devuelvo el objeto json de la respuesta para concatenar then (creo que no es obligatorio)
                }
                ).then(
                    (data) => {
                        //console.log(data); //acá sí están mis datos
                        setPokemon(data);
                    }
                )
        }, [pokId]
    )
    return(
        <>
            <h2>RESPUESTA API</h2>
            {pokemon ? 
                <div>
                    <p>{pokemon.name}</p>
                    <img src={pokemon?.sprites.front_default}/>
                </div>
                : <p>Loading..</p>
            }
            <button onClick={handlePrevId} disabled={pokId===1}>Anterior</button> 
            <button onClick={handleNextId}>Siguiente</button>
        </>
    );
}

/*
HEADERS DE LA PETICION: se pueden ver en network del navegador
dan datos sobre la peticion -> datos del cliente, datos del servidor, estado de la peticion
no suelen modificarse a menos que la api lo solicite para tener alguna autenticacion, usuario contraseña token
pero en esos casos las mismas apis suelen tener indicaciones de como hacerlo
*/

/*
BODY DE LA PETICION: usados en metodos que sirvan para mandar info al server (no GET ni DELETE en general)
envian la info que quiero colocar en el servidor

fetch(url_endpoint_w_params, //ya que son de post, los parametros van a indicar mas bien claves de acceso o parametros de donde/como colocar el objeto
    {
        method: POST,
        header:{
            Auth: 'ajdvdaj',
        },
        body:JSON.stringify({ //ver que la config de fetch se pasa como un objeto, y el header también, pero el body tiene que ser un string en el formato que lo solicite la api, generalmente JSON (pero stringeado)
            name:'miPokemon',
            id:134558,
            img:'kjfnaldn.com'
            })
        }
    }
).then( //el servidor suele mandar una respuesta, por ejemplo, con una copia del recurso creado
    (res) => {

    }
)
*/