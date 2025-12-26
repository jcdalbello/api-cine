import { app, server } from "../app/programa";
import supertest from "supertest";
import { pool } from "../app/adaptadores/pool-postgresql";

const requestWithSupertest = supertest(app);

const CODIGO_OPERACION_EXITOSA: number = 200;
const CODIGO_CREACION_EXITOSA: number = 201;
const CODIGO_DATOS_INCORRECTOS: number = 400;

afterEach(async () => {
  await pool.query("TRUNCATE TABLE peliculas RESTART IDENTITY CASCADE");
});

afterAll(async () => {
  server.close();
  await pool.end();
});

describe("GET /", () => {
  const url: string = "/";
  test("deberia devolver un codigo 200", async () => {
    const respuesta = await requestWithSupertest.get(url);
    expect(respuesta.status).toEqual(CODIGO_OPERACION_EXITOSA);
  });
});

describe("POST /peliculas", () => {
  interface DatosCreacionPelicula {
    titulo: string;
    genero: string;
  }

  interface DatosDePelicula {
    id: number;
    titulo: string;
    genero: string;
  }

  const urlPeliculas: string = "/peliculas";
  const id: number = 1;
  const titulo: string = "pelicula1";
  const genero: string = "genero1";

  const datosCreacionPelicula: DatosCreacionPelicula = {
    titulo: titulo,
    genero: genero,
  }

  const datosDePelicula: DatosDePelicula = {
    id: 1,
    titulo: titulo,
    genero: genero,
  }

  test("deberia devolver un codigo 201 si se crea correctamente una pelicula", async () => {
    const respuesta = await requestWithSupertest.post(urlPeliculas).send(datosCreacionPelicula);
    expect(respuesta.status).toEqual(CODIGO_CREACION_EXITOSA);
  });

  test("deberia devolver los datos de la pelicula creada", async () => {
    const respuesta = await requestWithSupertest.post(urlPeliculas).send(datosDePelicula);
    const peliculaCreada: DatosDePelicula = respuesta.body;

    expect(peliculaCreada.id).toEqual(id);
    expect(peliculaCreada.titulo).toEqual(titulo);
    expect(peliculaCreada.genero).toEqual(genero);
  });

  test("deberia devolver los datos de cada pelicula al crear mas de una", async () => {
    const id2: number = 2;
    const titulo2: string = "pelicula2";
    const genero2: string = "genero2";

    const datosPelicula2: DatosDePelicula = {
      id: id2,
      titulo: titulo2,
      genero: genero2,
    }

    const respuesta1 = await requestWithSupertest.post(urlPeliculas).send(datosDePelicula);
    const peliculaCreada1: DatosDePelicula = respuesta1.body;
    expect(peliculaCreada1.id).toEqual(id);
    expect(peliculaCreada1.titulo).toEqual(titulo);
    expect(peliculaCreada1.genero).toEqual(genero);

    const respuesta2 = await requestWithSupertest.post(urlPeliculas).send(datosPelicula2);
    const peliculaCreada2: DatosDePelicula = respuesta2.body;
    expect(peliculaCreada2.id).toEqual(id2);
    expect(peliculaCreada2.titulo).toEqual(titulo2);
    expect(peliculaCreada2.genero).toEqual(genero2);
  });

  test("deberia devolver un codigo 400 cuando se usa un titulo demasiado largo", async () => {
    const cantidadMaximaDeCaracteres: number = 70;
    const tituloDemasiadoLargo: string = "a".repeat(cantidadMaximaDeCaracteres + 1);
    const datosDePeliculaTituloLargo: DatosDePelicula = { ...datosDePelicula, titulo: tituloDemasiadoLargo }

    const respuesta = await requestWithSupertest.post(urlPeliculas).send(datosDePeliculaTituloLargo);

    expect(respuesta.status).toEqual(CODIGO_DATOS_INCORRECTOS);
    expect(respuesta.body.titulo).toEqual("El titulo no puede superar el limite de caracteres");
  });
  
  test("deberia devolver un codigo 400 cuando se usa un genero demasiado largo", async () => {
    const cantidadMaximaDeCaracteres: number = 70;
    const generoDemasiadoLargo: string = "a".repeat(cantidadMaximaDeCaracteres + 1);

    const datosPeliculaGeneroLargo: DatosDePelicula = { ...datosDePelicula, genero: generoDemasiadoLargo };

    const respuesta = await requestWithSupertest.post(urlPeliculas).send(datosPeliculaGeneroLargo);

    expect(respuesta.status).toEqual(CODIGO_DATOS_INCORRECTOS);
    expect(respuesta.body.genero).toEqual("El genero no puede superar el limite de caracteres");
  });
});

describe("GET /peliculas", () => {
  interface DatosCreacionPelicula {
    titulo: string;
    genero: string;
  }

  const urlPeliculas: string = "/peliculas";
  const id: number = 1;
  const titulo: string = "pelicula1";
  const genero: string = "genero1";

  const datosCreacionPelicula: DatosCreacionPelicula = {
    titulo: titulo,
    genero: genero,
  }
  
  test("deberia devolver un codigo 200", async () => {
    const respuesta = await requestWithSupertest.get(urlPeliculas);
    expect(respuesta.status).toEqual(CODIGO_OPERACION_EXITOSA);
  });

  test("deberia recuperar una lista vacia si no se guardo ninguna pelicula", async () => {
    const respuesta = await requestWithSupertest.get(urlPeliculas);
    expect(respuesta.body.length).toEqual(0);
  });

  test("deberia recuperar una lista con una sola pelicula si solo se agrego una", async () => {
    await requestWithSupertest.post(urlPeliculas).send(datosCreacionPelicula);
    const respuesta = await requestWithSupertest.get(urlPeliculas);
    expect(respuesta.body.length).toEqual(1);
    expect(respuesta.body[0].id).toEqual(id);
    expect(respuesta.body[0].titulo).toEqual(titulo);
    expect(respuesta.body[0].genero).toEqual(genero);
  });
});
