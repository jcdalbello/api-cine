import { app, server } from "../app/programa";
import supertest from "supertest";

const requestWithSupertest = supertest(app);

const CODIGO_OPERACION_EXITOSA: number = 200;

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
  const urlPeliculas: string = "/peliculas";
  test("deberia devolver un codigo 200", async () => {
    const respuesta = await requestWithSupertest.post(urlPeliculas);
    expect(respuesta.status).toEqual(CODIGO_OPERACION_EXITOSA);
  });
});
