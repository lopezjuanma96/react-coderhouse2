//flujo de reconciliacion: cambua algun estado, se computan las diferencias y se re renderiza
//recordemos que los datos van de padres a hijos y los eventos de hijos a padres a partir de ejecutar metodos de los padres en los hijos

//REndering condicional


/*EJEMPLO BASICO : ternario && o ?:
return(
    {
        loading?
        <h2> Loading </h2>
        :<h3> Loaded </h3>
    }
)

NO LO USAMOS TANTO PERO TAMBIEN ESTA LA POSIBILIDAD DE USAR CONDICIONALES CON DISTINTOS RETURN, Y QUE ELLO
SEA LO QUE VARíA EL OUTPUT, ESTO SE USA CUANDO LA VARIACION ENTRE UNO Y OTRO OUTPUT ES MUY GRANDE ENTONCES
LE DA MAS LEGIBILIDAD ESTA MANERA EN VEZ DE UN TERNARIO CON MILES DE RENGONES

if(loading){
    return(<h2> Loading </h2>)
} else {
    return(<h3> Loaded </h3>)
}

Aca se puede usar el Navigate solo para llevar a una pagina determinada en un condicional (ver navigation.js)

RECORDEMOS QUE LOS TERNARIOS TAMBIEN SE PUEDEN IMPLEMENTAR CON &&, PERO NO ACTUAN COMO IF ELSE, SINO COMO
SOLO IF, Y SINO RETORNAN undefined:

loading && <h2> Loading </h2>
!loading && <h3> Loaded </h3>

tener en cuenta la condicion de undefined porque si lo usamos para definir estilos o clases de las etiquetas
del dom, puede que undefined signifique algo, por ejemplo no mostrar ese elemento

*/

/* Para no llenar los return de condicionales, se puede usar objetos con los parametros de cada objeto (suelen)
llamarse config y pasarlas con spread a el tag

<button className="boton" onClick={funcion} disabled={condicion}></button>

se simplifica como

const configBtn = {
    className:"boton",
    onClick:{funcion},
    disabled:{condicion}
}

<button ...configBtn></button>

ademas estos configs se puede almacenar en un unico componente que las retorne y se importen y descompongan luego

- en el componente:
export const configs = () => {
    ...

    return(configBtn, configSuma);
}

-en el uso
import {configs} from "./configs.js"

...

const {configBtn, configSuma} = configs();
*/

/* Cuando se desmonta un componente se pierden sus hijos y tambien todos sus estados: GUARDA CON LOS BUG, POR EJEMPLO DESACTIVAR LOS LISTENER EN DESMONTAJE*/


//RENDER OPTIMIZATION

/*Para evitar que en el flujo de renconciliacion no se renderizen innecesariamente hijos

Si tenemos componentes puros y estáticos podemos hacerles Memoizing para que REact no vuelva a renderizarlos

export const Memo = () => {
    console.log("se monto el Memo"); //podemos ver que esto se imprime cada vez que se renderize el padre
    return  <h2> Hola </h2>
}

para memorizar:

import { memo } from "react"

export const Memo = memo(() => {
    console.log("se monto el Memo"); //podemos ver que esto se imprime cada vez que se renderize el padre
    return  <h2> Hola </h2>
})

se puede agregar una funcion como parametro que retorne true o false que decida si hay que re renderizar o no

export const Memo = memo(() => {
    console.log("se monto el Memo"); //podemos ver que esto se imprime cada vez que se renderize el padre
    return  <h2> Hola </h2>
}, () => renderBool)

TAMPOCO CONVIENE USARLO EN TODOS LOS COMPONENTES QUE ESTEN FIJOS, PORQUE EN COMPONENTES SIMPLES
OCUPA MAS ESPACIO EL REVISAR LOS MEMOS QUE RENDERIZARLOS CUANTO HAGA FALTA, PERO EN RENDERS QUE REQUIEREN
MUCHOS DATOS/CALCULOS/PIXELES SE PUEDEN MEMORIZAR Y RENDERIZAR CUANDO SEA NECESARIO

TAMBIEN SE PUEDEN MEMORIZAR FUNCIONES Y VARIABLES CON useMemo y useCallback (INVESTIGAR)

*/


