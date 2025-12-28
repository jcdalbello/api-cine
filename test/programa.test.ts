import { app, server } from "../app/programa";
import supertest from "supertest";
import { pool } from "../app/adaptadores/pool-postgresql";

const requestWithSupertest = supertest(app);

enum CodigosHTTP {
  OperacionExitosa = 200,
  CreacionExitosa = 201,
  DatosIncorrectos = 400,
  RecursoNoEncontrado = 404,
}

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
    expect(respuesta.status).toEqual(CodigosHTTP.OperacionExitosa);
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
    expect(respuesta.status).toEqual(CodigosHTTP.CreacionExitosa);
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

    expect(respuesta.status).toEqual(CodigosHTTP.DatosIncorrectos);
    expect(respuesta.body.titulo).toEqual("El titulo no puede superar el limite de caracteres");
  });
  
  test("deberia devolver un codigo 400 cuando se usa un genero demasiado largo", async () => {
    const cantidadMaximaDeCaracteres: number = 70;
    const generoDemasiadoLargo: string = "a".repeat(cantidadMaximaDeCaracteres + 1);

    const datosPeliculaGeneroLargo: DatosDePelicula = { ...datosDePelicula, genero: generoDemasiadoLargo };

    const respuesta = await requestWithSupertest.post(urlPeliculas).send(datosPeliculaGeneroLargo);

    expect(respuesta.status).toEqual(CodigosHTTP.DatosIncorrectos);
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
    expect(respuesta.status).toEqual(CodigosHTTP.OperacionExitosa);
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

describe("GET /peliculas/{id}", () => {
  const urlPeliculasPorId: string = "/peliculas/";

  const id: number = 1;
  const titulo: string = "pelicula1";
  const genero: string = "genero1";
  
  interface DatosCreacionPelicula {
    titulo: string;
    genero: string;
  }

  const datosCreacionPelicula: DatosCreacionPelicula = {
    titulo: titulo,
    genero: genero,
  }

  test("deberia devolver un codigo 200 y una pelicula si existe una pelicula con ese id", async () => {
    await requestWithSupertest.post("/peliculas").send(datosCreacionPelicula);
    const respuesta = await requestWithSupertest.get(urlPeliculasPorId + id);
    expect(respuesta.status).toEqual(CodigosHTTP.OperacionExitosa);
    expect(respuesta.body.id).toEqual(id);
    expect(respuesta.body.titulo).toEqual(titulo);
    expect(respuesta.body.genero).toEqual(genero);
  });

  test("deberia devolver mas de una pelicula existente", async () => {
    await requestWithSupertest.post("/peliculas").send(datosCreacionPelicula);
    const respuesta = await requestWithSupertest.get(urlPeliculasPorId + id.toString());
    expect(respuesta.status).toEqual(CodigosHTTP.OperacionExitosa);
    expect(respuesta.body.id).toEqual(id);
    expect(respuesta.body.titulo).toEqual(titulo);
    expect(respuesta.body.genero).toEqual(genero);

    const id2: number = 2;
    const titulo2: string = "pelicula2";
    const genero2: string = "genero2";

    const datosCreacionPelicula2: DatosCreacionPelicula = {
      titulo: titulo2,
      genero: genero2,
    }
    
    await requestWithSupertest.post("/peliculas").send(datosCreacionPelicula2);
    const respuesta2 = await requestWithSupertest.get(urlPeliculasPorId + id2.toString());
    expect(respuesta2.status).toEqual(CodigosHTTP.OperacionExitosa);
    expect(respuesta2.body.id).toEqual(id2);
    expect(respuesta2.body.titulo).toEqual(titulo2);
    expect(respuesta2.body.genero).toEqual(genero2);
  });

  test("deberia devolver multiples peliculas existentes", async () => {
    for (let i = 1; i <= 10; i++) {
      const idActual: number = i;
      const tituloActual: string = "pelicula" + i;
      const generoActual: string = "genero" + i;

      const datosCreacionPeliculaActual: DatosCreacionPelicula = {
        titulo: tituloActual,
        genero: generoActual,
      }

      await requestWithSupertest.post(urlPeliculasPorId).send(datosCreacionPeliculaActual);
      const respuesta = await requestWithSupertest.get(urlPeliculasPorId + idActual.toString());
      expect(respuesta.status).toEqual(CodigosHTTP.OperacionExitosa);
      expect(respuesta.body.id).toEqual(idActual);
      expect(respuesta.body.titulo).toEqual(tituloActual);
      expect(respuesta.body.genero).toEqual(generoActual);
    }
  });

  test("deberia devolver un error y un codigo 404 si no existe ninguna pelicula con el id indicado cuando todavia no se cargaron peliculas", async () => {
    const id: number = 1;
    const respuesta = await requestWithSupertest.get(urlPeliculasPorId + id.toString());
    expect(respuesta.status).toEqual(CodigosHTTP.RecursoNoEncontrado);
    expect(respuesta.body.id).toEqual("no se encontro ninguna pelicula con el id indicado");
  });
});
