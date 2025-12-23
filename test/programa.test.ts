import { app, server } from "../app/programa";
import supertest from "supertest";

const requestWithSupertest = supertest(app);

const CODIGO_OPERACION_EXITOSA: number = 200;
const CODIGO_CREACION_EXITOSA: number = 201;

afterAll(() => {
  server.close();
});

describe("GET /", () => {
  const url: string = "/";
  test("deberia devolver un codigo 200", async () => {
    const respuesta = await requestWithSupertest.get(url);
    expect(respuesta.status).toEqual(CODIGO_OPERACION_EXITOSA);
  });
});

describe("GET /peliculas", () => {
  const urlPeliculas: string = "/peliculas";
  
  test("deberia devolver un codigo 200", async () => {
    const respuesta = await requestWithSupertest.get(urlPeliculas);
    expect(respuesta.status).toEqual(CODIGO_OPERACION_EXITOSA);
  });
});

describe("POST /peliculas", () => {
  interface datosDePelicula {
    id: string;
    titulo: string;
    genero: string;
  }

  const urlPeliculas: string = "/peliculas";
  test("deberia devolver un codigo 201 si se crea correctamente una pelicula", async () => {
    const respuesta = await requestWithSupertest.post(urlPeliculas);
    expect(respuesta.status).toEqual(CODIGO_CREACION_EXITOSA);
  });

  test("deberia devolver los datos de la pelicula creada", async () => {
    const id: string = "1";
    const titulo: string = "pelicula1";
    const genero: string = "genero1";

    const datosPelicula: datosDePelicula = {
      id: id,
      titulo: titulo,
      genero: genero,
    }

    const respuesta = await requestWithSupertest.post(urlPeliculas).send(datosPelicula);
    const peliculaCreada: datosDePelicula = respuesta.body;

    expect(peliculaCreada.id).toEqual(id);
    expect(peliculaCreada.titulo).toEqual(titulo);
    expect(peliculaCreada.genero).toEqual(genero);
  });
});
