import { app, server } from "../app/programa";
import supertest from "supertest";
import { pool } from "../app/adaptadores/pool-postgresql";
import CreacionFuncionDTO from "../app/dtos/creacion-funcion-dto";
import CreacionSalaDTO from "../app/dtos/creacion-sala-dto";
import CreacionPeliculaDTO from "../app/dtos/creacion-pelicula-dto";
import SalaDTO from "../app/dtos/sala-dto";
import PeliculaDTO from "../app/dtos/pelicula-dto";

const requestWithSupertest = supertest(app);

enum CodigosHTTP {
  OperacionExitosa = 200,
  CreacionExitosa = 201,
  DatosIncorrectos = 400,
  RecursoNoEncontrado = 404,
}

afterEach(async () => {
  await pool.query("TRUNCATE TABLE peliculas RESTART IDENTITY CASCADE");
  await pool.query("TRUNCATE TABLE salas RESTART IDENTITY CASCADE");
  await pool.query("TRUNCATE TABLE funciones RESTART IDENTITY CASCADE");
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
  const cantidadMaximaDeCaracteres: number = 70;

  const datosCreacionPelicula: DatosCreacionPelicula = {
    titulo: titulo,
    genero: genero,
  }

  const datosDePelicula: DatosDePelicula = {
    id: id,
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
    const tituloDemasiadoLargo: string = "a".repeat(cantidadMaximaDeCaracteres + 1);
    const datosDePeliculaTituloLargo: DatosDePelicula = { ...datosDePelicula, titulo: tituloDemasiadoLargo }

    const respuesta = await requestWithSupertest.post(urlPeliculas).send(datosDePeliculaTituloLargo);

    expect(respuesta.status).toEqual(CodigosHTTP.DatosIncorrectos);
    expect(respuesta.body.titulo).toEqual("El titulo no puede superar el limite de caracteres");
  });
  
  test("deberia devolver un codigo 400 cuando se usa un genero demasiado largo", async () => {
    const generoDemasiadoLargo: string = "a".repeat(cantidadMaximaDeCaracteres + 1);

    const datosPeliculaGeneroLargo: DatosDePelicula = { ...datosDePelicula, genero: generoDemasiadoLargo };

    const respuesta = await requestWithSupertest.post(urlPeliculas).send(datosPeliculaGeneroLargo);

    expect(respuesta.status).toEqual(CodigosHTTP.DatosIncorrectos);
    expect(respuesta.body.genero).toEqual("El genero no puede superar el limite de caracteres");
  });

  test("deberia devolver un codigo 400 y el error correspondiente si no se pasa ningun valor como titulo al momento de crear una pelicula", async () => {
    const datosPeliculaSinTitulo = { genero: genero };
    const respuesta = await requestWithSupertest.post(urlPeliculas).send(datosPeliculaSinTitulo);
    expect(respuesta.status).toEqual(CodigosHTTP.DatosIncorrectos);
    expect(respuesta.body.titulo).toEqual("El titulo es un campo obligatorio");
  });

  test("deberia devolver un codigo 400 y el error correspondiente si no se pasa ningun valor como genero al momento de crear una pelicula", async () => {
    const datosPeliculaSinGenero = { titulo: titulo };
    const respuesta = await requestWithSupertest.post(urlPeliculas).send(datosPeliculaSinGenero);
    expect(respuesta.status).toEqual(CodigosHTTP.DatosIncorrectos);
    expect(respuesta.body.genero).toEqual("El genero es un campo obligatorio");
  });

  test("deberia devolver un codigo 400 y todos los mensajes correspondientes cuando no se pasa ningun dato al querer crear una pelicula", async () => {
    const respuesta = await requestWithSupertest.post(urlPeliculas).send({});
    expect(respuesta.status).toEqual(CodigosHTTP.DatosIncorrectos);
    expect(respuesta.body.titulo).toEqual("El titulo es un campo obligatorio");
    expect(respuesta.body.genero).toEqual("El genero es un campo obligatorio");
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

  const titulo2: string = "pelicula2";
  const genero2: string = "genero2";

  const datosCreacionPelicula: DatosCreacionPelicula = {
    titulo: titulo,
    genero: genero,
  }

  const datosCreacionPelicula2: DatosCreacionPelicula = {
    titulo: titulo2,
    genero: genero2,
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

  test("deberia recuperar una lista con las peliculas que coincidan con el parametro de titulo", async () => {    
    await requestWithSupertest.post(urlPeliculas).send(datosCreacionPelicula);
    await requestWithSupertest.post(urlPeliculas).send(datosCreacionPelicula2);
    
    const respuesta = await requestWithSupertest.get(urlPeliculas + "?" + "titulo=" + datosCreacionPelicula.titulo);
    expect(respuesta.body.length).toEqual(1);
    expect(respuesta.body[0].id).toEqual(id);
    expect(respuesta.body[0].titulo).toEqual(titulo);
    expect(respuesta.body[0].genero).toEqual(genero);
  });

  test("deberia recuperar una lista con las peliculas que coincidan con el parametro de titulo", async () => {    
    await requestWithSupertest.post(urlPeliculas).send(datosCreacionPelicula);
    await requestWithSupertest.post(urlPeliculas).send(datosCreacionPelicula2);
    
    const respuesta = await requestWithSupertest.get(urlPeliculas + "?" + "genero=" + datosCreacionPelicula.genero);
    expect(respuesta.body.length).toEqual(1);
    expect(respuesta.body[0].id).toEqual(id);
    expect(respuesta.body[0].titulo).toEqual(titulo);
    expect(respuesta.body[0].genero).toEqual(genero);
  });

  test("deberia recuperar una lista con las peliculas que coincidan con el parametro de titulo y genero al mismo tiempo", async () => {
    const titulo3: string = "pelicula3";
    const genero3: string = "genero3";
    const datosCreacionPelicula3: DatosCreacionPelicula = {
      titulo: titulo3,
      genero: genero3,
    }
    
    await requestWithSupertest.post(urlPeliculas).send(datosCreacionPelicula);
    await requestWithSupertest.post(urlPeliculas).send(datosCreacionPelicula2);
    await requestWithSupertest.post(urlPeliculas).send(datosCreacionPelicula3);
    
    const respuesta = await requestWithSupertest.get(urlPeliculas + "?" + "titulo=" + datosCreacionPelicula.titulo + "&" + "genero=" + datosCreacionPelicula.genero);
    expect(respuesta.body.length).toEqual(1);
    expect(respuesta.body[0].id).toEqual(id);
    expect(respuesta.body[0].titulo).toEqual(titulo);
    expect(respuesta.body[0].genero).toEqual(genero);
  });

  test("deberia recuperar una lista con las peliculas que que tenga un titulo similar al parametro de titulo (fuzzy search)", async () => {
    const tituloSimilar: string = "1";
    
    await requestWithSupertest.post(urlPeliculas).send(datosCreacionPelicula);
    await requestWithSupertest.post(urlPeliculas).send(datosCreacionPelicula2);
    
    const respuesta = await requestWithSupertest.get(urlPeliculas + "?" + "titulo=" + tituloSimilar);
    expect(respuesta.body.length).toEqual(1);
    expect(respuesta.body[0].id).toEqual(id);
    expect(respuesta.body[0].titulo).toEqual(titulo);
    expect(respuesta.body[0].genero).toEqual(genero);
  });

  test("deberia recuperar una lista con las peliculas que que tenga un genero similar al parametro de genero (fuzzy search)", async () => {
    const generoSimilar: string = "1";

    await requestWithSupertest.post(urlPeliculas).send(datosCreacionPelicula);
    await requestWithSupertest.post(urlPeliculas).send(datosCreacionPelicula2);
    
    const respuesta = await requestWithSupertest.get(urlPeliculas + "?" + "genero=" + generoSimilar);
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
    const idDesconocido: number = 999;
    const respuesta = await requestWithSupertest.get(urlPeliculasPorId + idDesconocido.toString());
    expect(respuesta.status).toEqual(CodigosHTTP.RecursoNoEncontrado);
    expect(respuesta.body.id).toEqual("No se encontro ninguna pelicula con el id indicado");
  });

  test("deberia devolver un error y un codigo 404 si no existe ninguna pelicula con el id indicado con peliculas cargadas", async () => {
    await requestWithSupertest.post("/peliculas").send(datosCreacionPelicula);
    const idDesconocido: number = 999;
    const respuesta = await requestWithSupertest.get(urlPeliculasPorId + idDesconocido.toString());
    expect(respuesta.status).toEqual(CodigosHTTP.RecursoNoEncontrado);
    expect(respuesta.body.id).toEqual("No se encontro ninguna pelicula con el id indicado");
  });
});

describe("POST /salas", () => {
  const urlSalas: string = "/salas";

  interface DatosCreacionDeSala {
    capacidad: number;
  }

  const id: number = 1;
  const capacidad: number = 50;

  const datosCreacionDeSala: DatosCreacionDeSala = {
    capacidad: capacidad,
  }

  test("deberia devolver un codigo 201 si se crea correctamente una sala", async () => {
    const respuesta = await requestWithSupertest.post(urlSalas).send(datosCreacionDeSala);
    expect(respuesta.status).toEqual(CodigosHTTP.CreacionExitosa);
  });

  test("deberia devolver los datos de la sala creada", async () => {
    const respuesta = await requestWithSupertest.post(urlSalas).send(datosCreacionDeSala);
    expect(respuesta.body.id).toEqual(id);
    expect(respuesta.body.capacidad).toEqual(capacidad);
  });

  test("deberia devolver los datos de cada sala al crear mas de una", async () => {
    const respuesta = await requestWithSupertest.post(urlSalas).send(datosCreacionDeSala);
    expect(respuesta.body.id).toEqual(id);
    expect(respuesta.body.capacidad).toEqual(capacidad);

    const id2: number = 2;
    const capacidad2: number = 100;
    const datosCreacionDeSala2: DatosCreacionDeSala = {
      capacidad: capacidad2,
    };
    const respuesta2 = await requestWithSupertest.post(urlSalas).send(datosCreacionDeSala2);
    expect(respuesta2.body.id).toEqual(id2);
    expect(respuesta2.body.capacidad).toEqual(capacidad2);
  });

  test("deberia devolver un error 400 si la capacidad es igual o menor que 0", async () => {
    const datosCreacionDeSalaCapacidadInvalida: DatosCreacionDeSala = {
      capacidad: 0,
    };

    const respuesta = await requestWithSupertest.post(urlSalas).send(datosCreacionDeSalaCapacidadInvalida);
    expect(respuesta.status).toEqual(CodigosHTTP.DatosIncorrectos);
    expect(respuesta.body.capacidad).toEqual("La capacidad de la sala debe ser mayor a 0");
  });

  test("deberia devolver un codigo 400 y el error correspondiente si no se pasa ningun valor como capacidad al momento de crear una sala", async () => {
    const datosCreacionDeSalaSinCapacidad = { };
    const respuesta = await requestWithSupertest.post(urlSalas).send(datosCreacionDeSalaSinCapacidad);
    expect(respuesta.status).toEqual(CodigosHTTP.DatosIncorrectos);
    expect(respuesta.body.capacidad).toEqual("La capacidad es un campo obligatorio");
  });
});

describe("GET /salas", () => {
  const urlSalas: string = "/salas";

  interface DatosCreacionDeSala {
    capacidad: number;
  }

  const id: number = 1;
  const capacidad: number = 50;

  const datosCreacionDeSala: DatosCreacionDeSala = {
    capacidad: capacidad,
  }

  test("deberia devolver un codigo 200", async () => {
    const respuesta = await requestWithSupertest.get(urlSalas);
    expect(respuesta.status).toEqual(CodigosHTTP.OperacionExitosa);
  });

  test("deberia devolver una lista vacia si no hay salas", async () => {
    const respuesta = await requestWithSupertest.get(urlSalas);
    expect(respuesta.body).toEqual([]);
  });

  test("deberia devolver una la unica sala creada si no se pasan parametros de busqueda", async () => {
    await requestWithSupertest.post(urlSalas).send(datosCreacionDeSala);
    const respuesta = await requestWithSupertest.get(urlSalas);
    expect(respuesta.body.length).toEqual(1);
    expect(respuesta.body[0].id).toEqual(id);
    expect(respuesta.body[0].capacidad).toEqual(datosCreacionDeSala.capacidad);
  });

  test("deberia devolver una lista solamente con las salas que tengan una capacidad igual o mayor a la pasada por parametro", async () => {
    const capacidadMinima: number = capacidad;
    const datosCreacionDeSalaCapacidadInsuficiente: DatosCreacionDeSala = { capacidad: capacidadMinima - 1 };
    const datosCreacionDeSalaCapacidadSuficiente: DatosCreacionDeSala = { capacidad: capacidadMinima + 1 };
    await requestWithSupertest.post(urlSalas).send(datosCreacionDeSala);
    await requestWithSupertest.post(urlSalas).send(datosCreacionDeSalaCapacidadInsuficiente);
    await requestWithSupertest.post(urlSalas).send(datosCreacionDeSalaCapacidadSuficiente);

    const respuesta = await requestWithSupertest.get(urlSalas + "/" + "?" + "capacidad=" + capacidadMinima.toString());
    expect(respuesta.body.length).toEqual(2);

    const capacidadesDevueltas: number[] = [];
    for (const sala of respuesta.body) {
      capacidadesDevueltas.push(sala.capacidad as number);
    }
    expect(capacidadesDevueltas).toContainEqual(datosCreacionDeSala.capacidad);
    expect(capacidadesDevueltas).toContainEqual(datosCreacionDeSalaCapacidadSuficiente.capacidad);
    expect(capacidadesDevueltas).not.toContainEqual(datosCreacionDeSalaCapacidadInsuficiente.capacidad);
  });

  test("deberia devolver un error 400 si el parametro de capacidad es un numero menor o igual a 0", async () => {
    const capacidadInvalida: number = 0;
    const respuesta = await requestWithSupertest.get(urlSalas + "/" + "?" + "capacidad=" + capacidadInvalida.toString());
    expect(respuesta.status).toEqual(CodigosHTTP.DatosIncorrectos);
    expect(respuesta.body.capacidad).toEqual("No se pueden buscar salas por capacidad menor a 0");
  });

  test("deberia devolver un error 400 si el parametro de capacidad no es un numero", async () => {
    const capacidadInvalida: string = "capacidadInvalida";
    const respuesta = await requestWithSupertest.get(urlSalas + "/" + "?" + "capacidad=" + capacidadInvalida.toString());
    expect(respuesta.status).toEqual(CodigosHTTP.DatosIncorrectos);
    expect(respuesta.body.capacidad).toEqual("La capacidad debe ser un numero valido");
  });
});

describe("GET /salas/:id", () => {
  const id: number = 1;
  const capacidad: number = 50;
  const urlSalaPorId: string = "/salas/";

  interface DatosCreacionDeSala {
    capacidad: number;
  }
  
  const datosCreacionDeSala: DatosCreacionDeSala = {
    capacidad: capacidad,
  }
  test("deberia devolver un codigo 200 y la sala con ese id si existe", async () => {
    await requestWithSupertest.post("/salas").send(datosCreacionDeSala);
    const respuesta = await requestWithSupertest.get(urlSalaPorId + id);
    expect(respuesta.status).toEqual(CodigosHTTP.OperacionExitosa);
    expect(respuesta.body.id).toEqual(id);
    expect(respuesta.body.capacidad).toEqual(capacidad);
  });

  test("deberia devolver la sala correspondiente al id pasado por parametro en cada iteracion", async () => {
    const cantidadDeSalasAGenerar: number = 10;
    for (let i = 1; i <= cantidadDeSalasAGenerar; i++) {
      const idActual: number = i;
      const capacidadActual: number = i * 10;
      
      const datosCreacionDeSalaActual: DatosCreacionDeSala = {
        capacidad: capacidadActual,
      };

      await requestWithSupertest.post("/salas").send(datosCreacionDeSalaActual);

      const respuesta = await requestWithSupertest.get(urlSalaPorId + idActual.toString());
      expect(respuesta.status).toEqual(CodigosHTTP.OperacionExitosa);
      expect(respuesta.body.id).toEqual(idActual);
      expect(respuesta.body.capacidad).toEqual(capacidadActual);
    }
  });

  test("deberia devolver un error 404 si no existe ninguna sala con el id indicado", async () => {
    const idDesconocido: number = 999;
    const respuesta = await requestWithSupertest.get(urlSalaPorId + idDesconocido.toString());
    expect(respuesta.status).toEqual(CodigosHTTP.RecursoNoEncontrado);
    expect(respuesta.body.id).toEqual("No se encontro ninguna sala con el id indicado");
  });

  test("deberia devolver un error 400 si se pasa un valor que no es un numero como id", async () => {
    const idInvalido: string = "idInvalido";
    const respuesta = await requestWithSupertest.get(urlSalaPorId + idInvalido);
    expect(respuesta.status).toEqual(CodigosHTTP.DatosIncorrectos);
    expect(respuesta.body.id).toEqual("El id debe ser un numero valido");
  });
});

describe("POST /funciones", () => {
  const idFuncion: number = 1;

  const idSala: number = 1;
  const idPelicula: number = 1;

  const capacidadSala: number = 50;
  const tituloPelicula: string = "pelicula1";
  const generoPelicula: string = "genero1";

  const creacionSalaDTO: CreacionSalaDTO = { capacidad: capacidadSala };

  const creacionPeliculaDTO: CreacionPeliculaDTO ={
    titulo: tituloPelicula,
    genero: generoPelicula,
  };

  const creacionFuncionDTO: CreacionFuncionDTO = {
    idSala: idSala,
    idPelicula: idPelicula,
  };

  let respuestaPostSala: supertest.Response;
  let respuestaPostPelicula: supertest.Response;

  beforeEach(async () => {
    respuestaPostSala = await requestWithSupertest.post("/salas").send(creacionSalaDTO);
    respuestaPostPelicula = await requestWithSupertest.post("/peliculas").send(creacionPeliculaDTO);
  });

  test("deberia devolver un codigo 201 si se crea correctamente una funcion", async () => {
    const respuesta = await requestWithSupertest.post("/funciones").send(creacionFuncionDTO);
    expect(respuesta.status).toEqual(CodigosHTTP.CreacionExitosa);
  });

  test("deberia devolver los datos de la funcion creada", async () => {
    const respuesta = await requestWithSupertest.post("/funciones").send(creacionFuncionDTO);
    expect(respuesta.status).toEqual(CodigosHTTP.CreacionExitosa);
    expect(respuesta.body.id).toEqual(idFuncion);
    expect(respuesta.body.sala).toEqual(respuestaPostSala.body);
    expect(respuesta.body.pelicula).toEqual(respuestaPostPelicula.body);
  });

  test("deberia devolver los datos de mas de una funcion creada", async () => {
    const respuesta = await requestWithSupertest.post("/funciones").send(creacionFuncionDTO);
    expect(respuesta.status).toEqual(CodigosHTTP.CreacionExitosa);
    expect(respuesta.body.id).toEqual(idFuncion);
    expect(respuesta.body.sala).toEqual(respuestaPostSala.body);
    expect(respuesta.body.pelicula).toEqual(respuestaPostPelicula.body);

    const idFuncion2: number = 2;
    const idSala2: number = 2;
    const idPelicula2: number = 2;

    const capacidad2: number = 100;
    const titulo2: string = "pelicula2";
    const genero2: string = "genero2";

    const creacionSalaDTO2: CreacionSalaDTO = { capacidad: capacidad2 };
    const creacionPeliculaDTO2: CreacionPeliculaDTO = {
      titulo: titulo2,
      genero: genero2,
    };

    const respuestaPostSala2 = await requestWithSupertest.post("/salas").send(creacionSalaDTO2);
    const respuestaPostPelicula2 = await requestWithSupertest.post("/peliculas").send(creacionPeliculaDTO2);

    const creacionFuncionDTO2: CreacionFuncionDTO = {
      idSala: idSala2,
      idPelicula: idPelicula2,
    };

    const respuesta2 = await requestWithSupertest.post("/funciones").send(creacionFuncionDTO2);
    expect(respuesta2.status).toEqual(CodigosHTTP.CreacionExitosa);
    expect(respuesta2.body.id).toEqual(idFuncion2);
    expect(respuesta2.body.sala).toEqual(respuestaPostSala2.body);
    expect(respuesta2.body.pelicula).toEqual(respuestaPostPelicula2.body);
  });

  test("deberia devolver un error 400 si se pasa un valor no numerico como id de sala", async () => {
    const idSalaNoNumerico: string = "idInvalido";

    const respuesta = await requestWithSupertest.post("/funciones").send({
      idSala: idSalaNoNumerico,
      idPelicula: idPelicula,
    });
    expect(respuesta.status).toEqual(CodigosHTTP.DatosIncorrectos);
    expect(respuesta.body.idSala).toEqual("El id de sala debe ser un numero valido");
  });

  test("deberia devolver un error 400 si se pasa un valor no numerico como id de pelicula", async () => {
    const idPeliculaNoNumerico: string = "idInvalido";

    const respuesta = await requestWithSupertest.post("/funciones").send({
      idSala: idSala,
      idPelicula: idPeliculaNoNumerico,
    });
    expect(respuesta.status).toEqual(CodigosHTTP.DatosIncorrectos);
    expect(respuesta.body.idSala).toEqual("El id de pelicula debe ser un numero valido");
  });

  test("deberia devolver un error 404 no se encuentra una sala con el id de sala indicado", async () => {
    const idSalaNoEncontrada: number = 9999;
    const creacionFuncionDTO: CreacionFuncionDTO = {
      idSala: idSalaNoEncontrada,
      idPelicula: idPelicula,
    };

    const respuesta = await requestWithSupertest.post("/funciones").send(creacionFuncionDTO);
    expect(respuesta.status).toEqual(CodigosHTTP.RecursoNoEncontrado);
    expect(respuesta.body.idSala).toEqual("No se encontro ninguna sala con el id indicado");
  });

  test("deberia devolver un error 404 no se encuentra una pelicula con el id de pelicula indicado", async () => {
    const idPeliculaNoEncontrada: number = 9999;
    const creacionFuncionDTO: CreacionFuncionDTO = {
      idSala: idSala,
      idPelicula: idPeliculaNoEncontrada,
    };

    const respuesta = await requestWithSupertest.post("/funciones").send(creacionFuncionDTO);
    expect(respuesta.status).toEqual(CodigosHTTP.RecursoNoEncontrado);
    expect(respuesta.body.idPelicula).toEqual("No se encontro ninguna pelicula con el id indicado");
  });
});

describe("GET /funciones", () => {
  const idFuncion: number = 1;

  const idSala: number = 1;
  const idPelicula: number = 1;

  const capacidadSala: number = 50;
  const tituloPelicula: string = "pelicula1";
  const generoPelicula: string = "genero1";

  const creacionSalaDTO: CreacionSalaDTO = { capacidad: capacidadSala };

  const creacionPeliculaDTO: CreacionPeliculaDTO ={
    titulo: tituloPelicula,
    genero: generoPelicula,
  };

  const creacionFuncionDTO: CreacionFuncionDTO = {
    idSala: idSala,
    idPelicula: idPelicula,
  };

  test("deberia devolver una lista vacia si no se guardo ninguna funcion", async () => {
    const respuesta = await requestWithSupertest.get("/funciones");
    expect(respuesta.status).toEqual(CodigosHTTP.OperacionExitosa);
    expect(respuesta.body.length).toEqual(0);
  });

  test("deberia devolver una lista con una sola funcion si solo se agrego una", async () => {
    const respuestaPostSala = await requestWithSupertest.post("/salas").send(creacionSalaDTO);
    const respuestaPostPelicula = await requestWithSupertest.post("/peliculas").send(creacionPeliculaDTO);
    await requestWithSupertest.post("/funciones").send(creacionFuncionDTO);
    const respuesta = await requestWithSupertest.get("/funciones");
    expect(respuesta.status).toEqual(CodigosHTTP.OperacionExitosa);
    expect(respuesta.body.length).toEqual(1);
    expect(respuesta.body[0].id).toEqual(idFuncion);
    expect(respuesta.body[0].sala).toEqual(respuestaPostSala.body);
    expect(respuesta.body[0].pelicula).toEqual(respuestaPostPelicula.body);
  });

  test("deberia devolver una lista con todas las funciones guardadas si no se pasa ningun parametro", async () => {
    const cantidadDeFunciones: number = 5;
    for (let i = 1; i <= cantidadDeFunciones; i++) {
      const creacionSalaActualDTO: CreacionSalaDTO = { capacidad: i * 10 };
      const creacionPeliculaActualDTO: CreacionPeliculaDTO = {
        titulo: "pelicula" + i,
        genero: "genero" + i,
      };
      const creacionFuncionActualDTO: CreacionFuncionDTO = {
        idSala: i,
        idPelicula: i,
      };
      await requestWithSupertest.post("/salas").send(creacionSalaActualDTO);
      await requestWithSupertest.post("/peliculas").send(creacionPeliculaActualDTO);
      await requestWithSupertest.post("/funciones").send(creacionFuncionActualDTO);
    }

    const respuesta = await requestWithSupertest.get("/funciones");
    expect(respuesta.status).toEqual(CodigosHTTP.OperacionExitosa);
    expect(respuesta.body.length).toEqual(cantidadDeFunciones);
  });

  test("deberia devolver todas las funciones guardadas con los datos correctos de cada una", async () => {
    await requestWithSupertest.post("/salas").send(creacionSalaDTO);
    await requestWithSupertest.post("/peliculas").send(creacionPeliculaDTO);
    const respuestaPostFuncinon1 = await requestWithSupertest.post("/funciones").send(creacionFuncionDTO);
    const respuestaPostFuncinon2 = await requestWithSupertest.post("/funciones").send(creacionFuncionDTO);
    const respuestaPostFuncinon3 = await requestWithSupertest.post("/funciones").send(creacionFuncionDTO);

    const respuestaGetFunciones = await requestWithSupertest.get("/funciones");

    expect(respuestaGetFunciones.status).toEqual(CodigosHTTP.OperacionExitosa);
    expect(respuestaGetFunciones.body.length).toEqual(3);
    expect(respuestaGetFunciones.body).toContainEqual(respuestaPostFuncinon1.body);
    expect(respuestaGetFunciones.body).toContainEqual(respuestaPostFuncinon2.body);
    expect(respuestaGetFunciones.body).toContainEqual(respuestaPostFuncinon3.body);
  });

  test("deberia devolver solo las funciones que cumplan con el filtro de busqueda por id de sala", async () => {
    const idSala1: number = 1;
    const idSala2: number = 2;
    const idPelicula: number = 1;
    const cantidadDeFuncionesSala1: number = 2;
    const cantidadDeFuncionesSala2: number = 3;

    const creacionSalaDTO: CreacionSalaDTO = { capacidad: 50 };
    await requestWithSupertest.post("/salas").send(creacionSalaDTO);
    await requestWithSupertest.post("/salas").send(creacionSalaDTO);

    const creacionPeliculaDTO: CreacionPeliculaDTO = {
      titulo: "pelicula",
      genero: "genero",
    }
    await requestWithSupertest.post("/peliculas").send(creacionPeliculaDTO);

    for (let i = 1; i <= cantidadDeFuncionesSala1; i++) {
      const creacionFuncionActualDTO: CreacionFuncionDTO = {
        idSala: idSala1,
        idPelicula: idPelicula,
      };
      await requestWithSupertest.post("/funciones").send(creacionFuncionActualDTO);
    }

    for (let i = 1; i <= cantidadDeFuncionesSala2; i++) {
      const creacionFuncionActualDTO: CreacionFuncionDTO = {
        idSala: idSala2,
        idPelicula: idPelicula,
      };
      await requestWithSupertest.post("/funciones").send(creacionFuncionActualDTO);
    }

    const respuesta = await requestWithSupertest.get("/funciones?idSala=" + idSala1);
    expect(respuesta.status).toEqual(CodigosHTTP.OperacionExitosa);
    expect(respuesta.body.length).toEqual(cantidadDeFuncionesSala1);
  });

  test("deberia devolver solo las funciones que cumplan con el filtro de busqueda por id de pelicula", async () => {
    const idPelicula1: number = 1;
    const idPelicula2: number = 2;
    const idSala: number = 1;
    const cantidadDeFuncionesPelicula1: number = 2;
    const cantidadDeFuncionesPelicula2: number = 3;

    const creacionPeliculaDTO: CreacionPeliculaDTO = { 
      titulo: "pelicula",
      genero: "genero",
    };
    await requestWithSupertest.post("/peliculas").send(creacionPeliculaDTO);
    await requestWithSupertest.post("/peliculas").send(creacionPeliculaDTO);

    const creacionSalaDTO: CreacionSalaDTO = {
      capacidad: 50,
    }
    await requestWithSupertest.post("/salas").send(creacionSalaDTO);

    for (let i = 1; i <= cantidadDeFuncionesPelicula1; i++) {
      const creacionFuncionActualDTO: CreacionFuncionDTO = {
        idSala: idSala,
        idPelicula: idPelicula1,
      };
      await requestWithSupertest.post("/funciones").send(creacionFuncionActualDTO);
    }

    for (let i = 1; i <= cantidadDeFuncionesPelicula2; i++) {
      const creacionFuncionActualDTO: CreacionFuncionDTO = {
        idSala: idSala,
        idPelicula: idPelicula2,
      };
      await requestWithSupertest.post("/funciones").send(creacionFuncionActualDTO);
    }

    const respuesta = await requestWithSupertest.get("/funciones?idPelicula=" + idPelicula1);
    expect(respuesta.status).toEqual(CodigosHTTP.OperacionExitosa);
    expect(respuesta.body.length).toEqual(cantidadDeFuncionesPelicula1);
  });

  test("deberia devolver un error 400 si el parametro de id de sala no es un valor numerico", async () => {
    const idSalaNoNumerico: string = "idSalaNoNumerico";
    const respuesta = await requestWithSupertest.get("/funciones" + "?" + "idSala=" + idSalaNoNumerico);
    expect(respuesta.status).toEqual(CodigosHTTP.DatosIncorrectos);
    expect(respuesta.body.idSala).toEqual("El id de sala debe ser un numero valido");
  });

  test("deberia devolver un error 400 si el parametro de id de pelicula no es un valor numerico", async () => {
    const idPeliculaNoNumerico: string = "idPeliculaNoNumerico";
    const respuesta = await requestWithSupertest.get("/funciones" + "?" + "idPelicula=" + idPeliculaNoNumerico);
    expect(respuesta.status).toEqual(CodigosHTTP.DatosIncorrectos);
    expect(respuesta.body.idPelicula).toEqual("El id de pelicula debe ser un numero valido");
  });
});

describe("GET /salas/:id", () => {
  const idFuncion: number = 1;

  const idSala: number = 1;
  const idPelicula: number = 1;

  const capacidadSala: number = 50;
  const tituloPelicula: string = "pelicula1";
  const generoPelicula: string = "genero1";

  const creacionSalaDTO: CreacionSalaDTO = { capacidad: capacidadSala };

  const creacionPeliculaDTO: CreacionPeliculaDTO ={
    titulo: tituloPelicula,
    genero: generoPelicula,
  };

  const creacionFuncionDTO: CreacionFuncionDTO = {
    idSala: idSala,
    idPelicula: idPelicula,
  };

  let respuestaPostSala: supertest.Response;
  let respuestaPostPelicula: supertest.Response;

  test("deberia devolver un codigo 200 y la sala con ese id si existe", async () => {
    respuestaPostSala = await requestWithSupertest.post("/salas").send(creacionSalaDTO);
    respuestaPostPelicula = await requestWithSupertest.post("/peliculas").send(creacionPeliculaDTO);
    await requestWithSupertest.post("/funciones").send(creacionFuncionDTO);

    const respuesta = await requestWithSupertest.get("/funciones/" + idFuncion);
    expect(respuesta.status).toEqual(CodigosHTTP.OperacionExitosa);
    expect(respuesta.body.id).toEqual(idFuncion);
    expect(respuesta.body.sala).toEqual(respuestaPostSala.body);
    expect(respuesta.body.pelicula).toEqual(respuestaPostPelicula.body);
  });

  test.skip("deberia devolver la sala correspondiente al id pasado por parametro en cada iteracion", async () => {
    const cantidadDeFunciones: number = 5;
    const salasGeneradas: SalaDTO[] = [];
    const peliculasGeneradas: PeliculaDTO[] = [];

    for (let i = 1; i <= cantidadDeFunciones; i++) {
      const cracionSalaDTO: CreacionSalaDTO = { capacidad: i * 10 };
      const creacionPeliculaDTO: CreacionPeliculaDTO = {
        titulo: "pelicula" + i,
        genero: "genero" + i,
      };
      const creacionFuncionDTO: CreacionFuncionDTO = {
        idSala: i,
        idPelicula: i,
      };
      const respuestaPostSala = await requestWithSupertest.post("/salas").send(cracionSalaDTO);
      const respuestaPostPelicula = await requestWithSupertest.post("/peliculas").send(creacionPeliculaDTO);
      await requestWithSupertest.post("/funciones").send(creacionFuncionDTO);

      salasGeneradas.push(respuestaPostSala.body as SalaDTO);
      peliculasGeneradas.push(respuestaPostPelicula.body as PeliculaDTO);
    }

    for (let i = 1; i <= cantidadDeFunciones; i++) {
      const respuesta = await requestWithSupertest.get("/funciones/" + i);
      expect(respuesta.status).toEqual(CodigosHTTP.OperacionExitosa);
      expect(respuesta.body.id).toEqual(i);
      expect(salasGeneradas).toContainEqual(respuesta.body.sala);
      expect(peliculasGeneradas).toContainEqual(respuesta.body.pelicula);
    }
  });
});
