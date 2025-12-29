import express, { Express, Request, Response } from 'express';
import AgregarPeliculaComando from './comandos/agregar-pelicula-comando';
import RepositorioPelicula from './dominio/puerto-repositorio-pelicula';
import RepositorioPeliculaPostgreSQL from './adaptadores/repositorio-pelicula-postgresql';
import CamposIncorrectosDePeliculaError from './errores/campo-incorrecto-pelicula-error';
import Pelicula from './dominio/pelicula';
import ObtenerPeliculasComando from './comandos/obtener-peliculas-comando';
import ObtenerPeliculaPorIdComando from './comandos/obtener-pelicula-por-id-comando';
import PeliculaNoEncontradaError from './errores/pelicula-no-encontrada-error';
import MensajesDeErrorDePelicula from './errores/i-mensajes-de-error-de-pelicula';

const app: Express = express();
const puerto: number = 3000;

app.use(express.json());

function crearRepositorioPelicula(): RepositorioPelicula {
  return new RepositorioPeliculaPostgreSQL();
}

const repositorioPelicula: RepositorioPelicula = crearRepositorioPelicula();

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
    throw new CamposIncorrectosDePeliculaError(mensajes);
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
    if (error instanceof CamposIncorrectosDePeliculaError) {
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

app.post("/salas", (req: Request, res: Response) => {
  res.status(201).send({
    id: 1,
    capacidad: 50,
  });
});

const server = app
  .listen(puerto, (): void => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
  })
  .on("error", (error): void => {
    console.log("Error: ", error.message);
  });

export { app, server };
