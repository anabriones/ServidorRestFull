# ServidorRestFull

 Servidor con servicio de Login , que permite crear, modificar, borrar y obtener registros.
 Creación de token para direcciones con "privilegios"

 Es un servidor con "2 Bases de Datos", que se guardan en ficheros json, en una se almacenan los usuarios y en la otra películas.

 Los usuarios podrán iniciar sesión y registrarse, a la vez de poder ver el listado de películas, eliminar peliculas, modificar peliculas y crearlas.

 Para eliminar películas así como modificarlas se hace uso de la función `splice` que elimina valores de un json según el índice que se indique y las posiciones a eliminar a partir de este.

 para la modificación se hace un splice primero en el fichero json seguido de un `push`.

# Instalación Software

Para que la aplicación funcione es necesario tener las siguientes dependencias instaladas:

- Para instalar nvm `sudo apt-get install curl`

-La versión que utilizo es 16.15.1 `nvm install 16.15.1` y para usar esta `nvm use 16.15.1`

 -`nvm install node` instala la versión de node

- Para instalar babel se ejecuta el comando `npm install @babel/core @babel/register --save-dev`

- Nodemon es una herramienta para escuchar los cambios que se realizan en el proyecto e ir lanzando la Aplicación y mostrar los errores si los hay `npm install nodemon`

- Para la libreria jwt hay que ejecutar el comando `npm install jwt-simple`

# Ejecutar

-Es necesario el comando `nvm use 16.15.1`

- `npm run start`

# Fichero .env

En este fichero se encuentra la configuración del servidor, como son el puerto, el tiempo de duración del token y el token.

# Creación del token

El token se crea cuando el usuario hace login con la libreria jwt-simple.

# POST - GET _ DELETE - PUT

Los métodos para modiciar, crear y eliminar películas necesitan la creación previa del token, por lo tanto al invocarlos se les debe pasar el token mediante la cabecera en el Authetication.

Los metodos GET he decidido que puedan ser invocados siempre, puesto que no son datos comprometidos.

# Tiempo del token

Como las variables de entorno se guardan como string, se debe de hacer la conversión a entero.
El tiempo en jwt-simple se le pasa por la "directiva" `exp: tiempo`
