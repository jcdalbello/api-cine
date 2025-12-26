import express, { Express, Request, Response } from 'express';
import AgregarPeliculaComando from './comandos/agregar-pelicula-comando';
import RepositorioPelicula from './dominio/puerto-repositorio-pelicula';
import RepositorioPeliculaPostgreSQL from './adaptadores/repositorio-pelicula-postgresql';
import CampoIncorrectoPeliculaError from './errores/campo-incorrecto-pelicula-error';

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

app.get("/peliculas", (req: Request, res: Response) => {
  res.status(200).send();
});

app.post("/peliculas", async (req: Request, res: Response) => {
  const titulo: string = req.body.titulo;
  const genero: string = req.body.genero;
  try { 
    const agregarPeliculaComando: AgregarPeliculaComando = new AgregarPeliculaComando(repositorioPelicula);
    const pelicula = await agregarPeliculaComando.ejecutar(titulo, genero);
    res.status(201).send({
      id: pelicula.obtenerId(),
      titulo: pelicula.obtenerTitulo(),
      genero: pelicula.obtenerGenero(),
    });
  } catch (error) {
    if (error instanceof CampoIncorrectoPeliculaError) {
      res.status(400).send({
        id: error.id,
        titulo: error.titulo,
        genero: error.genero,
      });
    }
  }
});

const server = app
  .listen(puerto, (): void => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
  })
  .on("error", (error): void => {
    console.log("Error: ", error.message);
  });

export { app, server };
