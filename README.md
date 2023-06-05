### ✔️ Video Games App
#### Individual Project - [Henry](https://www.soyhenry.com/?utm_source=google&utm_medium=cpc&utm_campaign=GADS_SEARCH_ARG_BRAND&utm_content=Brand&gad=1&gclid=Cj0KCQjwj_ajBhCqARIsAA37s0wwgGv6FdgDTWEdl9AWVSx5OBvqZd474QqlY6-8C8VvOroqUUuuSsgaAmWMEALw_wcB)

##### [IR AL SITIO](https://cliente-videogames.onrender.com/)

👉 Esta SPA (Single Page Application) se desarrolló como parte del cursado de la carrera de Full Stack Developer, en la etapa de Proyecto Individual. Su objetivo es el desarrollo de una aplicación web que consume datos de una API externa y consultas a la base de datos propia.

#### ⇢ Features:
- Conectarse a la api externa rawg.io para traer los videojuegos
- Crear base de datos para guardar parte de la información
- Paginado
- Filtros acumulativos
- Ordenamientos ascendentes y descendentes
- Sección con información detallada
- Búsqueda por nombre
- Formulario controlado para la creación de nuevos videojuegos
- Funcionalidad para modificar o eliminar los videojuegos creados

#### ⇢ Tecnologías:
- Lenguaje: JavaScript
- Database: PostgreSQL
- Back-End: Node.js, Express.js, Sequelize
- Front-End: React, Redux, CSS puro
- Control de versiones: Git/GitHub

<hr/>

### ✔️ Devs

⇢ Setup:

- Tener instalado ```Node.js```
- Tener instalado ```PostgreSQL``` y crear previamente una db llamada ```videogames```
- crear archivo ```.env```` en la raiz de carpeta /client con las siguientes variables:

```
 DB_USER= tu usuario de PostgreSQL
 DB_PASSWORD= tu contraseña de PostgreSQL
 DB_HOST=localhost
 apikey=tu apikey en https://rawg.io/apidocs
 apiGames='https://api.rawg.io/api/games?key='
 apiGenres='https://api.rawg.io/api/genres?key='
 apiGameByName= 'https://api.rawg.io/api/games?search='
 apiGameID= 'https://api.rawg.io/api/games/'
```


- Tener acceso a una terminal para seguir los siguientes pasos:
- dentro de la carpeta /client y luego dentro de la carpeta /api ```npm install``` para instalar las dependencias
- en la carpeta raiz del proyecto ```npm start``` para levantar el sitio

<hr/>
