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
