# Proyecto de muestra: API REST de gestion de cine

 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)

[![Pipeline](https://github.com/jcdalbello/api-cine/actions/workflows/.api-cine-ci.yml/badge.svg?branch=main)](https://github.com/jcdalbello/api-cine/actions/workflows/.api-cine-ci.yml)

## API REST para la simulacion de gestión de un cine.

Proyecto de muestra que simula las funcionalidades útiles para la gestión de un cine. Se pensó para crear, buscar, y manejar los recursos que se suelen ver en una sala de cine:
* Peliculas.
* Salas de proyección.
* Funciones de películas que se dan en las salas.

## Instrucciones para ejecutar el proyecto

Instalar las dependencias con `yarn`:
```
$ nvm use
$ corepack enable
$ yarn install
```

Iniciar docker:
```
$ docker compose up
```

Iniciar el servicio de forma local en el puerto 3000 con el host `http://localhost:3000`:
```
$ yarn start
```

## Endpoint

Los endpoints disponibles de la aplicación pueden verse en el archivo `api.yml`, y renderizarse en [Swagger Editor](https://editor.swagger.io/).

## Pruebas

A lo largo del desarrollo del programa se realizaron los siguientes tipos de pruebas:

* **Pruebas unitarias**: siguiendo las practicas propuestas por el TDD (_Test-Driven Development_, o desarrollo guiado por pruebas), el desarrollo se hizo paso a paso implementando pruebas unitarias que definen el comportamiento del código, y que sirven como conjuntos de tests automatizados para asegurar la calidad del código y facilitar refactorizaciones.

* **Pruebas de integración**: por medio de los test del archivo `programa.test.ts` se prueba el funcionamiento de todos los componentes funcionando de forma conjunta en un entorno simulado con Docker.

* **Pruebas de aceptación**: con el archivo `pruebas.http` se puede probar facilmente el comportamiento de los endpoint, a modo de tener una forma sencilla de realizar pruebas manuales o que apunten a casos específicos que busque el usuario.

## Arquitectura

### Arquitectura hexagonal

Para el proyecto se usaron los principios de la arquitectura hexagonal (o _ports and adapters_) de forma que se pueda **separar la complejidad escencial de la complejidad accidental** y, fundamentalmente, contribuir a la **testeabilidad** del código.
De esta forma, se puede probar la lógica de negocio de la aplicación de forma independiente de los componentes tecnológicos, y _mockear_ estos últimos para probar componentes que dependan de ellos, aprovechando el principio de inversión de dependencia para usar interfaces en lugar de pasarlos directamente.

### Patron MVC

Al ser una aplicación interactiva, se usó el patron MVC para organizala, de forma que se puedan separar el controlador (manejo de input), la vista (manejo de output), y el modelo (lógica computable), adaptándolo en forma de API web.
En este proyecto, el controlador y la vista funcionan como un mismo archivo.

### Patron Repositorio

Se usaron clases Repositorio para abstraer la lógica de acceso a la capa de persistencia para el dominio, usando interfaces para crear mocks en los tests de clases que necesitan acceso a la base de datos.

### Patron Comando

A modo de interfaz entre el controlador y el modelo computable, se usan clases que modelan casos de uso para realizar las funcionalidades de la API. Esto permite una mayor modularización, evitar crear una sola clase sobrecargada que maneje todas las funcionalidades, y facilita el testeo.

## Estructura de archivos

(Ignorando los archivos relacionados a la configuración)

```
api-cine
├── app/
│   ├── adaptadores/      # Repositorios SQL
│   ├── comandos/         # Clases del patron Comando
│   ├── dominio/          # Clases pertenecientes al dominio
│   ├── errores/          # Errores creados para el programa
│   └── programa.ts       # Manejo de la API
├── base-de-datos/
│   └── init.sql          # Configuracion inicial del esquema de la base de datos
├── build.sh              # Build script
├── pruebas.http          # Pruebas de aceptación
└── test/                 # Pruebas unitarias y de aceptación
    ├── adaptadores/
    ├── comandos/
    ├── dominio/
    └── programa.test.ts  # Pruebas de aceptacion
```

## Tecnologias usadas

TECNOLOGÍA | MOTIVO DE USO                                                      
---------- | ------------------------------------------------------------------ 
TypeScript | Principal lenguaje de programación                                 
Yarn       | Gestor de proyectos para TypeScript
Jest       | Pruebas unitarias para TypeScript                                  
Docker     | Simulación de entorno para la ejecución del programa y las pruebas 
PostgreSQL | Gestión de base de datos

## Creditos

Hecho por Dal Bello Juan Cruz, estudiante de Ingeniería en Computación UNTREF (3er año, al momento de creación de este repositorio).

Basado en el proyecto final de la materia Ingeniería de Software I.
