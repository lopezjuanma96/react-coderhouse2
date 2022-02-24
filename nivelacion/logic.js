/*Nivelación */

/*Operadores Ternarios: Simplificación de operador if */

//Ejemplo con if


let mensaje;
const temp = 42;
if (temp <= 32){
    mensaje = "Temperatura agradable";
} else {
    mensaje = "Infierno";
}
console.log(mensaje)

// Operador Ternario -> condición ? caso 1 : caso 2

temp <= 32 ? console.log("Temperatura agradable") : console.log("Infierno")

// Pero se aprovecha mucho mas con su return para asignacion de variables de forma condicional

mensaje = temp <= 32 ? "Temperatura agradable" : "Infierno";
console.log(mensaje);

console.log(temp <= 32 ? "Temperatura agradable" : "Infierno");

//Operador de coalescencia nula: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
//similar al ternario pero más directo, si el objeto es null devuelve lo que esta a la derecha, sino devuelve el objeto mismo
/*Desectructuración: Recuperar propiedades de objetos */

//Desectructuración de Objetos

const usuario = {
    nombre: 'Ramiro',
    rol:'tutor',
    curso: 'React',
    edad: 27
};

//para mantener la inmutabilidad quiero asignar los valores de las propiedades en variables externas

un_nombre = usuario.nombre;
un_rol = usuario.rol;

console.log(un_nombre)
console.log(un_rol)

//con desectructuración

const { nombre, rol } = usuario

console.log(nombre)
console.log(rol)

//desectructuracion con alias

const { edad: age, curso: course} = usuario

console.log(age)
console.log(course)

//desectructuracion anidada

const vuelo = {
    piloto:'Juan',
    duración: 24,
    horario: {
        salida:"Lunes 24, 15hs",
        llegada:"Martes 25, 17hs"
    }
}

const { piloto, duración:tiempo, horario:{salida:inicio, llegada:fin} } = vuelo

console.log(piloto, tiempo, inicio, fin)

//desectructuracion dentro de los parametros de una funcion

function mostrarDatos({piloto, horario}){
    console.log(piloto)
    console.log(horario)
}

mostrarDatos(vuelo)
//Desectructuración de Arrays

