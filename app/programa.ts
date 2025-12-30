import express, { Express, Request, Response } from 'express';
import AgregarPeliculaComando from './comandos/agregar-pelicula-comando';
import RepositorioPelicula from './dominio/puerto-repositorio-pelicula';
import RepositorioPeliculaPostgreSQL from './adaptadores/repositorio-pelicula-postgresql';
import RepositorioSalaPostgreSQL from './adaptadores/repositorio-sala-postgresql';
import CampoIncorrectoPeliculaError from './errores/campo-incorrecto-pelicula-error';
import Pelicula from './dominio/pelicula';
import ObtenerPeliculasComando from './comandos/obtener-peliculas-comando';
import ObtenerPeliculaPorIdComando from './comandos/obtener-pelicula-por-id-comando';
import PeliculaNoEncontradaError from './errores/pelicula-no-encontrada-error';
import MensajesDeErrorDePelicula from './errores/i-mensajes-de-error-de-pelicula';
import CampoIncorrectoSalaError from './errores/campo-incorrecto-sala-error';
import Sala from './dominio/sala';
import MensajesDeErrorDeSala from './errores/i-mensajes-de-error-de-sala';
import RepositorioSala from './dominio/puerto-repositorio-sala';
import AgregarSalaComando from './comandos/agregar-sala-comando';
import ObtenerSalasComando from './comandos/obtener-salas-comando';
import ObtenerSalaPorIdComando from './comandos/obtener-sala-por-id-comando';

const app: Express = express();
const puerto: number = 3000;

app.use(express.json());

function crearRepositorioPelicula(): RepositorioPelicula {
  return new RepositorioPeliculaPostgreSQL();
}

function crearRepositorioSala(): RepositorioSala {
  return new RepositorioSalaPostgreSQL();
}

const repositorioPelicula: RepositorioPelicula = crearRepositorioPelicula();
const repositorioSala: RepositorioSala = crearRepositorioSala();

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .send("El servidor esta funcionando");
});

app.get("/peliculas", async (req: Request, res: Response) => {
  const titulo = req.query.titulo as string | undefined;
  const genero = req.query.genero as string | undefined;
  const obtenerPeliculas: ObtenerPeliculasComando = new ObtenerPeliculasComando(repositorioPelicula);
  const peliculas: Pelicula[] = await obtenerPeliculas.ejecutar(titulo, genero);
  res.status(200).send(peliculas);
});

function validarDatosVaciosDePelicula(titulo: string | undefined, genero: string | undefined): void {
  const mensajes: MensajesDeErrorDePelicula = {};
  if (titulo === undefined) {
    mensajes.titulo = "El titulo es un campo obligatorio";
  }
  if (genero === undefined) {
    mensajes.genero = "El genero es un campo obligatorio";
  }

  if (Object.keys(mensajes).length > 0) {
    throw new CampoIncorrectoPeliculaError(mensajes);
  }
}

app.post("/peliculas", async (req: Request, res: Response) => {
  const titulo: string | undefined = req.body.titulo;
  const genero: string | undefined = req.body.genero;
  try { 
    validarDatosVaciosDePelicula(titulo, genero);
    const agregarPeliculaComando: AgregarPeliculaComando = new AgregarPeliculaComando(repositorioPelicula);
    const pelicula = await agregarPeliculaComando.ejecutar(titulo!, genero!);
    res.status(201).send({
      id: pelicula.obtenerId(),
      titulo: pelicula.obtenerTitulo(),
      genero: pelicula.obtenerGenero(),
    });
  } catch (error) {
    if (error instanceof CampoIncorrectoPeliculaError) {
      const mensajesDeError: MensajesDeErrorDePelicula = {
        id: error.id!,
        titulo: error.titulo!,
        genero: error.genero!,
      }
      res.status(400).send(mensajesDeError);
    }
  }
});

app.get("/peliculas/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id!);
    const obtenerPeliculaPorIdComando: ObtenerPeliculaPorIdComando = new ObtenerPeliculaPorIdComando(repositorioPelicula);
    const pelicula: Pelicula = await obtenerPeliculaPorIdComando.ejecutar(id);
    res.status(200).send(pelicula);
  } catch (error) {
    if (error instanceof PeliculaNoEncontradaError) {
      res.status(404).json(error);
    }
  }
});

function validadDatosVaciosDePelicula(capacidad: number | undefined): void {
  const mensajes: MensajesDeErrorDeSala = {};
  if (capacidad === undefined) {
    mensajes.capacidad = "La capacidad es un campo obligatorio";
  }

  if (Object.keys(mensajes).length > 0) {
    throw new CampoIncorrectoSalaError(mensajes);
  }
}

app.post("/salas", async (req: Request, res: Response) => {
  const capacidad = req.body.capacidad as number;
  try {
    validadDatosVaciosDePelicula(capacidad);
    const agregarSalaComando: AgregarSalaComando = new AgregarSalaComando(repositorioSala);
    const sala: Sala = await agregarSalaComando.ejecutar(capacidad);
    res.status(201).json(sala);
  } catch (error) {
    if (error instanceof CampoIncorrectoSalaError) {
      res.status(400).json(error);
    }
  }
});

app.get("/salas", async (req: Request, res: Response) => {
  const capacidadComoString = req.query.capacidad as string | undefined;
  let capacidad: number | undefined = undefined;
  if (capacidadComoString !== undefined) {
    capacidad = parseInt(capacidadComoString);
  }
  try {
    const obtenerSalasComando: ObtenerSalasComando = new ObtenerSalasComando(repositorioSala);
    const salas: Sala[] = await obtenerSalasComando.ejectuar(capacidad);
    res.status(200).json(salas);
  } catch(error) {
    if (error instanceof CampoIncorrectoSalaError) {
      res.status(400).json(error);
    }
  }
});

app.get("/salas/:id", (req: Request, res: Response) => {
  const obtenerSalaPorIdComando: ObtenerSalaPorIdComando = new ObtenerSalaPorIdComando();
  const sala: Sala = obtenerSalaPorIdComando.ejecutar(parseInt(req.params.id!));
  // const sala: Sala = new Sala(1, 50);
  res.status(200).json(sala);
});

const server = app
  .listen(puerto, (): void => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
  })
  .on("error", (error): void => {
    console.log("Error: ", error.message);
  });

export { app, server };
