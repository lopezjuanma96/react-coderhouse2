# Entregas del Curso

Las entregas están basadas en la creación de un e-commerce. En continuación con el desarrollo del resto de los cursos de la Carrera Full-Stack, se implementará la simulación de un e-commerce para Cabañas La Raquela de la ciudad de La Paz, Lomabola, Córdoba, Argentina.

## Entrega Final

En la entrega final se dispone, según las rúbricas obligatorias:

- Una página principal, donde pueden observarse todos los productos disponibles en el shop. La misma además puede ser accedida clickeando en "La Raquela - Shop" en la barra de navegación.

- Páginas para cada una de las tres categorías de productos disponibles: "Artesanales", "Regionales", "Combos" donde se visualizan únicamente los productos de dichas categorías.

- Páginas específicas para capa producto, accesibles al clickear cada producto en alguna de las secciones mencionada anteriormente, que presentan, además de una descripción más detallada, un contador para agregar productos al carrito, que luego se transforma en un botón que permite acceder directamente al carrito también.

- Las tres páginas superiores se alimentan de una basa de datos (colección de documentos) creada en Firestore de Firebase para acceder a los datos de cada producto. Además la barra de navegación obtiene las categorías a mostrar de una colección específica de Firestore también. Cabe aclarar que las imágenes se encuentran en el servidor de la página, la base de datos solo proporciona la dirección relativa de las mismas.

- Una página de "Carrito" que acumula los productos que vayan a solicitarse en la compra. La misma puede ser accedida a través de un widget específico que se muestra en el extremo derecho de la barra de navegación cuando al menos hay un producto en el carrito (dicho widget muestra además la cantidad de productos acumulados) o luego de incluir alguna cantidad de productos de algún tipo en el mismo detalle de los mismos. El carrito muestra las cantidades solicitadas de cada producto, con su precio específico (además de disponer en el nombre un link al detalle del producto), un botón para eliminar cada uno de ellos y uno para vaciar el carrito completo. Si el carrito esta vacío se muestra un botón de "Volver" para regresar a la página principal, caso contrario se muestra el costo total de una compra y un botón de "Finalizar compra" para acceder al "Checkout".

- Una página de "Checkout" donde el usuario ingresa sus datos en un formulario y finaliza la orden, la cual se carga en otra colección de Firestore que incluye Nombre, Mail y Teléfono de Contacto; una lista de los productos solicitados en la orden (incluyendo únicamente nombre, id precio y contador); una entrada con el costo total de la orden y la fecha en que fue generada. Si la cantidad de algún producto solicitada en la orden no se encuentra dispoible, el usuario es alertado y se regresa a la paágina principal, en cambio si la compra se logra exitosamente, se muestra el usuario el ID de la orden -para posterior seguimiento- y se regresa al 

Para algunas de las rúbricas opcionales:

- El formulario de Checkout presenta algunas validaciones: Ningún campo puede estar vacío, los campos de correo deben respetar una cierta estructura de abcde@efg.xyz (donde cada letra representa una letra cualquiera), a la vez que el campo de email y de validación de email deben ser iguales, y el campo de teléfono no puede presentar caracteres que no sean numéricos.

Un ejemplo de uso de la aplicación puede encontrarse aquí:


El sitio web se enceuntra desplegado aquí: