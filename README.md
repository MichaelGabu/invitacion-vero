# Los quince de Vero

Proyecto React + TypeScript + Vite adaptado de los componentes de la rama [development de la invitación de matrimonio](https://github.com/MichaelGabu/wedding-invitation/tree/development). La apertura mantiene el movimiento de ambas mitades del sobre y el sello, y el interior conserva las animaciones de entrada y desplazamiento de Anime.js 4.2.2. Los estilos originales se adaptaron a CSS con las variables de diseño de Vero.

## Vista con datos de muestra

La configuración inicial muestra a la familia Rivera con tres cupos para el sábado 20 de marzo de 2027, a las 5:00 p. m. La hacienda, la dirección y los nombres son ficticios. El enlace al mapa abre Subachoque como referencia. La lista de horarios y la fecha límite también son editables en public/evento.js. Para volver al saludo general, asigne null a invitadoMuestra. Una lista real de invitados tiene prioridad sobre la familia de muestra.

## Ejecutar

Desde la carpeta que contiene package.json, use Node 22.12 o posterior.

    npm install
    npm run dev

También puede instalar con bun install --frozen-lockfile. Para revisar y compilar:

    npm run lint
    npm run build
    npm run preview

## Publicar

El ZIP incluye una compilación lista para usar dentro de dist. Para XAMPP o alojamiento estático, copie el contenido de dist a la carpeta del sitio. Para GitHub Pages, conecte este proyecto a su propio repositorio Git y ejecute npm run deploy. El comando compila y sube dist a la rama gh-pages del remoto origin. En Settings → Pages seleccione esa rama y la carpeta raíz. Vite genera rutas relativas para servir la invitación en una subcarpeta.

dist/index.html es la entrada del sitio. dist/invitacion.html es una copia autocontenida para abrir en un navegador sin servidor.

## Recorrido

1. Sobre personalizado con nombre, sello y cupos. Toque el sello o «Ver invitación».
2. Encabezado, calendario de cinco días con el día de la celebración resaltado, oración y control de música.
3. Primer recuerdo, bendición de la familia y cuenta regresiva.
4. Lugar, dirección y mapa, vestuario y segundo recuerdo.
5. Itinerario, lluvia de sobres, agradecimiento y confirmación por WhatsApp.

Edite public/evento.js para personalizar el contenido y vuelva a compilar. En un sitio ya compilado se puede editar dist/evento.js para actualizar dist/index.html sin recompilar. La copia autocontenida incorpora la configuración durante la compilación.

- fechaISO lleva fecha, hora y zona horaria, por ejemplo 2030-08-24T18:00:00-05:00. El calendario muestra el día local escrito y el contador usa el instante exacto. Los campos en blanco se muestran como pendientes.
- lugar, direccion y mapa controlan la ubicación. La dirección permite buscar en Google Maps si no se especifica un enlace.
- oracion, familia, ellas, ellos, itinerario y fechaLimite personalizan los textos. El programa incluido es una propuesta editable.
- fotos admite dos rutas, en orden. canciones admite hasta cuatro rutas de audio por índice. Para archivos propios, ubíquelos en public y escriba una ruta relativa a la entrada (por ejemplo, fotos/vero.webp). La copia portátil incluye las ilustraciones y melodías predeterminadas. Los medios personalizados por URL o ruta deben seguir disponibles.
- Use whatsapp como número general y contactos como lista de números de anfitriones con indicativo internacional. Sin un número definido, el invitado selecciona el chat al enviar el mensaje.

## Invitados y confirmación

Para probar el sobre de muestra abra ?guest=DEMO sin una fuente de invitados configurada. Para la fiesta configure invitadosCSV con la URL de su propia hoja de Google Sheets publicada como CSV. También se admite un CSV servido junto al sitio. Los encabezados del proyecto original son:

    nombre,asientos,codigo,celular,cancion
    Familia de muestra,2,EJEMPLO,2,3

El ejemplo selecciona el segundo contacto y la tercera canción. Los índices empiezan en 1. Envíe enlaces con la forma index.html?guest=CODIGO. Con soloConCodigo activado la entrada general requiere código, como en la boda. Los códigos desconocidos muestran «Invitación no encontrada» y la consulta permite reintentar errores de conexión.

Una hoja publicada como CSV se descarga en el navegador. Use los índices de contacto en la columna celular. También se mantiene la alternativa de Firestore de la entrega anterior mediante proyectoFirebase y coleccionInvitados. La colección usa el código como ID del documento y los mismos nombres de campos. Si se configuran ambas fuentes, la hoja CSV tiene prioridad.

El formulario limita la cantidad al cupo de la invitación y permite declinar. La respuesta se entrega cuando el invitado envía el mensaje en WhatsApp.
