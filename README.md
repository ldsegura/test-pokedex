# Pokedex
## sitio de prueba de listado pokemon

Sitio web responsivo con tematica pokemon utilizando React.js, boostrap 5 y react-router-dom 6

## Features

- Inicia con un pokedex que te da la bienvenida y deja cargar tu nombre y un pokemon inicial
- si eliminas todos los pokemones de tu deck, al seleccionar a inicio (dashboard) te manda a seleccionar tu primer pokemon desde el pokedex
- Un dashboard donde te muestra los tipos de pokemones que tienes en tu deck, y el total de pokemones capturados
- Página de busqueda pokemon, donde puedes agregar o eliminarlos de tu deck
- Página de mis pokemones, donde muestra la lista de los pokemones capturados, dejando agregar o eliminarlos
- Pagina de visualización pokemon, puedes agregar o eliminar uno por uno

> La sesion se mantiene con localstorage, pero no tiene un logout por lo que para eliminar la sesion es quitar el local llamado "_auth_pokedex" donde almacena el nombre del entrenador, y los pokemones que tiene capturado, solo guarda el id/nombre que se usa como identificador y caughtUp que es el total de pokemon del mismo tipo

## Tech

Dependencias mas destacadas:

- [React] - react 18.2
- [Bootstrap] - react-bootstrap
- [intl] - react-intl - para el lenguaje
- [LazyImage] - react-lazy-load-image-component carga de imagen con retraso hasta que sea visible
- [react-responsive] - react-responsive - para validar la dimension de la pantalla desde JS
- [recharts] - graficas

Repositorio [public repository][dill] on GitHub.

## Installation

Requieres [Node.js](https://nodejs.org/) v18+ to run.

Instalar las dependencias

```sh
npm install 
```
ó
```sh
yarn install
```

Para variables de entorno solo usa dos parametros
```sh
REACT_APP_SITENAME=Website-name
```
y
```sh
REACT_APP_API=URL-API
```

## Ejecución
En la carpeta del proyecto, ejecuta:

```sh
npm run start ó yarn start
```

## License

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [dill]: <https://github.com/ldsegura/test-pokedex>
