import express, { Express, Request, Response } from 'express';
import AgregarPeliculaComando from './comandos/agregar-pelicula-comando';
import RepositorioPelicula from './dominio/puerto-repositorio-pelicula';
import RepositorioPeliculaPostgreSQL from './adaptadores/repositorio-pelicula-postgresql';
import RepositorioSalaPostgreSQL from './adaptadores/repositorio-sala-postgresql';
import CampoIncorrectoPeliculaError from './errores/campo-incorrecto-pelicula-error';
import BuscarPeliculasComando from './comandos/buscar-peliculas-comando';
import BuscarPeliculaPorIdComando from './comandos/buscar-pelicula-por-id-comando';
import PeliculaNoEncontradaError from './errores/pelicula-no-encontrada-error';
import MensajesDeErrorDePelicula from './errores/i-mensajes-de-error-de-pelicula';
import CampoIncorrectoSalaError from './errores/campo-incorrecto-sala-error';
import MensajesDeErrorDeSala from './errores/i-mensajes-de-error-de-sala';
import RepositorioSala from './dominio/puerto-repositorio-sala';
import AgregarSalaComando from './comandos/agregar-sala-comando';
import BuscarSalasComando from './comandos/buscar-salas-comando';
import BuscarSalaPorIdComando from './comandos/buscar-sala-por-id-comando';
import SalaNoEncontradaError from './errores/sala-no-encontrada-error';
import CreacionPeliculaDTO from './dtos/creacion-pelicula-dto';
import PeliculaDTO from './dtos/pelicula-dto';
import CreacionSalaDTO from './dtos/creacion-sala-dto';
import SalaDTO from './dtos/sala-dto';
import IdDTO from './dtos/id-dto';
import FiltrosBusquedaPeliculasDTO from './dtos/filtros-busqueda-peliculas-dto';
import ListaPeliculasDTO from './dtos/lista-peliculas-dto';
import FiltrosBusquedaSalasDTO from './dtos/filtros-busqueda-salas-dto';
import ListaSalasDTO from './dtos/lista-salas-dto';
import FuncionDTO from './dtos/funcion-dto';
import CreacionFuncionDTO from './dtos/creacion-funcion-dto';
import AgregarFuncionComando from './comandos/agregar-funcion-comando';
import RepositorioFuncion from './dominio/puerto-repositorio-funcion';
import RepositorioFuncionPostgreSQL from './adaptadores/repositorio-funcion-postgresql';
import MensajesDeErrorDeFuncion from './errores/i-mensajes-de-error-de-funcion';
import CampoIncorrectoFuncionError from './errores/campo-incorrecto-funcion-error';
import FiltrosBusquedaFuncionesDTO from './dtos/filtros-busqueda-funciones-dto';
import BuscarFuncionesComando from './comandos/buscar-funciones-comando';
import ListaFuncionesDTO from './dtos/lista-funciones-dto';

const app: Express = express();
const puerto: number = 3000;

app.use(express.json());

function crearRepositorioPelicula(): RepositorioPelicula {
  return new RepositorioPeliculaPostgreSQL();
}

function crearRepositorioSala(): RepositorioSala {
  return new RepositorioSalaPostgreSQL();
}

function crearRepositorioFuncion(): RepositorioFuncion {
  return new RepositorioFuncionPostgreSQL(
    crearRepositorioSala(),
    crearRepositorioPelicula(),
  );
}

const repositorioPelicula: RepositorioPelicula = crearRepositorioPelicula();
const repositorioSala: RepositorioSala = crearRepositorioSala();
const repositorioFuncion: RepositorioFuncion = crearRepositorioFuncion();

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .send("El servidor esta funcionando");
});

app.get("/peliculas", async (req: Request, res: Response) => {
  const titulo = req.query.titulo as string | undefined;
  const genero = req.query.genero as string | undefined;
  const filtros: FiltrosBusquedaPeliculasDTO = {
    titulo: titulo!,
    genero: genero!,
  };
  const obtenerPeliculas: BuscarPeliculasComando = new BuscarPeliculasComando(repositorioPelicula);
  const listaPeliculas: ListaPeliculasDTO = await obtenerPeliculas.ejecutar(filtros);
  res.status(200).send(listaPeliculas.peliculas);
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
    const creacionPeliculaDTO: CreacionPeliculaDTO = {
      titulo: titulo!,
      genero: genero!,
    };
    const agregarPeliculaComando: AgregarPeliculaComando = new AgregarPeliculaComando(repositorioPelicula);
    const pelicula: PeliculaDTO = await agregarPeliculaComando.ejecutar(creacionPeliculaDTO);
    res.status(201).json(pelicula);
  } catch (error) {
    if (error instanceof CampoIncorrectoPeliculaError) {
      res.status(400).json(error);
    }
  }
});

app.get("/peliculas/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id!);
    const idDTO: IdDTO = {
      id: id,
    };
    const obtenerPeliculaPorIdComando: BuscarPeliculaPorIdComando = new BuscarPeliculaPorIdComando(repositorioPelicula);
    const pelicula: PeliculaDTO = await obtenerPeliculaPorIdComando.ejecutar(idDTO);
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
    const creacionSalaDTO: CreacionSalaDTO = {
      capacidad: capacidad,
    };
    const agregarSalaComando: AgregarSalaComando = new AgregarSalaComando(repositorioSala);
    const sala: SalaDTO = await agregarSalaComando.ejecutar(creacionSalaDTO);
    res.status(201).json(sala);
  } catch (error) {
    if (error instanceof CampoIncorrectoSalaError) {
      res.status(400).json(error);
    }
  }
});

function validarDatosDeBusquedaDeSalaPorFiltros(capacidad: number | undefined): void {
  const mensajes: MensajesDeErrorDeSala = {};

  if (capacidad !== undefined && Number.isNaN(capacidad)) {
    mensajes.capacidad = "La capacidad debe ser un numero valido";
  }

  if (Object.keys(mensajes).length > 0) {
    throw new CampoIncorrectoSalaError(mensajes);
  }
}

app.get("/salas", async (req: Request, res: Response) => {
  const capacidadComoString = req.query.capacidad as string | undefined;
  const capacidad: number | undefined = capacidadComoString !== undefined ? parseInt(capacidadComoString) : undefined;
  try {
    validarDatosDeBusquedaDeSalaPorFiltros(capacidad);
    const filtros: FiltrosBusquedaSalasDTO = {
      capacidad: capacidad!,
    };
    const obtenerSalasComando: BuscarSalasComando = new BuscarSalasComando(repositorioSala);
    const salas: ListaSalasDTO = await obtenerSalasComando.ejectuar(filtros);
    res.status(200).json(salas.salas);
  } catch(error) {
    if (error instanceof CampoIncorrectoSalaError) {
      res.status(400).json(error);
    }
  }
});

function validarDatosDeBusquedaDeSalaPorId(idComoString: string | undefined): void {
  const mensajes: MensajesDeErrorDeSala = {};

  const idParseado: number = Number(idComoString);
  if (Number.isNaN(idParseado)) {
    mensajes.id = "El id debe ser un numero valido";
  }

  if (Object.keys(mensajes).length > 0) {
    throw new CampoIncorrectoSalaError(mensajes);
  }
}

app.get("/salas/:id", async (req: Request, res: Response) => {
  try {
    validarDatosDeBusquedaDeSalaPorId(req.params.id);
    const idDTO: IdDTO = {
      id: parseInt(req.params.id!),
    };
    const obtenerSalaPorIdComando: BuscarSalaPorIdComando = new BuscarSalaPorIdComando(repositorioSala);
    const sala: SalaDTO = await obtenerSalaPorIdComando.ejecutar(idDTO);
    res.status(200).json(sala);
  } catch (error) {
    if (error instanceof CampoIncorrectoSalaError) {
      res.status(400).json(error);
    }
    if (error instanceof SalaNoEncontradaError) {
      res.status(404).json(error);
    }
  }
});

function validarDatosNumericosDeCreacionDeFuncion(
  idSalaComoString: string | undefined,
  idPeliculaComoString: string | undefined
): void {
  const mensajes: MensajesDeErrorDeFuncion = {};

  const idSalaParseado: number = Number(idSalaComoString);
  if (Number.isNaN(idSalaParseado)) {
    mensajes.idSala = "El id de sala debe ser un numero valido";
  }

  const idPeliculaParseado: number = Number(idPeliculaComoString);
  if (Number.isNaN(idPeliculaParseado)) {
    mensajes.idSala = "El id de pelicula debe ser un numero valido";
  }

  if (Object.keys(mensajes).length > 0) {
    throw new CampoIncorrectoFuncionError(mensajes);
  }
}

app.post("/funciones", async (req: Request, res: Response) => {
  const idSalaComoString = req.body.idSala as string | undefined;
  const idPeliculaComoString = req.body.idPelicula as string | undefined;

  try {
    validarDatosNumericosDeCreacionDeFuncion(idSalaComoString, idPeliculaComoString);
    const creacionFuncionDTO: CreacionFuncionDTO = {
      idSala: parseInt(idSalaComoString!),
      idPelicula: parseInt(idPeliculaComoString!),
    };
    const agregarFuncionComando: AgregarFuncionComando = new AgregarFuncionComando(
      repositorioSala,
      repositorioPelicula,
      repositorioFuncion
    );
    const funcion: FuncionDTO = await agregarFuncionComando.ejecutar(creacionFuncionDTO);
    res.status(201).json(funcion);
  } catch (error) {
    if (error instanceof CampoIncorrectoFuncionError) {
      res.status(400).json(error);
    }
    if (error instanceof SalaNoEncontradaError) {
      const mensajes: MensajesDeErrorDeFuncion = {
        idSala: error.id,
      };
      res.status(404).json(mensajes);
    }
    if (error instanceof PeliculaNoEncontradaError) {
      const mensajes: MensajesDeErrorDeFuncion = {
        idPelicula: error.id,
      };
      res.status(404).json(mensajes);
    }
  }
});

function validarDatosDeBusquedaDeFuncionesPorFiltros(
  idSala: number | undefined,
  idPelicula: number | undefined
): void {
  const mensajesSala: MensajesDeErrorDeSala = {};
  const mensajesPelicula: MensajesDeErrorDePelicula = {};

  if (idSala !== undefined && Number.isNaN(idSala)) {
    mensajesSala.id = "El id de sala debe ser un numero valido";
  }

  if (idPelicula !== undefined && Number.isNaN(idPelicula)) {
    mensajesPelicula.id = "El id de pelicula debe ser un numero valido";
  }

  if (Object.keys(mensajesSala).length > 0) {
    throw new CampoIncorrectoSalaError(mensajesSala);
  }

  if (Object.keys(mensajesPelicula).length > 0) {
    throw new CampoIncorrectoPeliculaError(mensajesPelicula);
  }
}

app.get("/funciones", async (req: Request, res: Response) => {
  const idSalaComoString = req.query.idSala as string | undefined;
  const idPeliculaComoString = req.query.idPelicula as string | undefined;

  const idSala: number | undefined = idSalaComoString !== undefined ? parseInt(idSalaComoString) : undefined;
  const idPelicula: number | undefined = idPeliculaComoString !== undefined ? parseInt(idPeliculaComoString) : undefined;

  try {
    validarDatosDeBusquedaDeFuncionesPorFiltros(idSala, idPelicula);
    const filtros: FiltrosBusquedaFuncionesDTO = {
      idSala: idSala!,
      idPelicula: idPelicula!,
    };
    const buscarFuncionesComando: BuscarFuncionesComando = new BuscarFuncionesComando(repositorioFuncion);
    const funciones: ListaFuncionesDTO = await buscarFuncionesComando.ejecutar(filtros);
    res.status(200).json(funciones.funciones);
  } catch (error) {
    if (error instanceof CampoIncorrectoSalaError) {
      const mensajes: MensajesDeErrorDeFuncion = {
        idSala: error.id!,
      };
      res.status(400).json(mensajes);
    }
    if (error instanceof CampoIncorrectoPeliculaError) {
      const mensajes: MensajesDeErrorDeFuncion = {
        idPelicula: error.id!,
      };
      res.status(400).json(mensajes);
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
