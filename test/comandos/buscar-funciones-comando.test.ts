import { Mock, mock } from "ts-jest-mocker";
import BuscarFuncionesComando from "../../app/comandos/buscar-funciones-comando";
import ListaFuncionesDTO from "../../app/dtos/lista-funciones-dto";
import RepositorioFuncion from "../../app/dominio/puerto-repositorio-funcion";
import Sala from "../../app/dominio/sala";
import Pelicula from "../../app/dominio/pelicula";
import Funcion from "../../app/dominio/funcion";
import FiltrosBusquedaFuncionesDTO from "../../app/dtos/filtros-busqueda-funciones-dto";

describe("BuscarFuncionesComando", () => {
  const mockRepositorioFunciones: Mock<RepositorioFuncion> = mock<RepositorioFuncion>();
  const buscarFuncionesComando: BuscarFuncionesComando = new BuscarFuncionesComando(mockRepositorioFunciones);

  const idSala: number = 1;
  const capacidadSala: number = 50;

  const idPelicula: number = 2;
  const tituloPelicula: string = "pelicula1";
  const generoPelicula: string = "genero1";

  const idFuncion: number = 3;

  let sala: Sala;
  let pelicula: Pelicula;
  let funcion: Funcion;

  beforeEach(() => {
    jest.clearAllMocks();

    pelicula = new Pelicula(idPelicula, tituloPelicula, generoPelicula);
    sala = new Sala(idSala, capacidadSala);
    funcion = new Funcion(idFuncion, sala, pelicula);

    mockRepositorioFunciones.buscarFunciones.mockResolvedValue([funcion]);
  });

  test("deberia crear un objeto BuscarFuncionesComando", () => {
    expect(buscarFuncionesComando).toBeInstanceOf(BuscarFuncionesComando);
  });

  test("deberia devolver una lista vacia si no hay funciones guardadas", async () => {
    mockRepositorioFunciones.buscarFunciones.mockResolvedValue([]);
    const funciones: ListaFuncionesDTO = await buscarFuncionesComando.ejecutar({});
    expect(funciones.funciones.length).toEqual(0);
  });

  test("deberia devolver una lista con la unica funcion guardada sin pasar ningun parametro de busqueda", async () => {
    
    const funciones: ListaFuncionesDTO = await buscarFuncionesComando.ejecutar({});
    expect(funciones.funciones).toContainEqual(funcion);
    expect(mockRepositorioFunciones.buscarFunciones).toHaveBeenCalled();    
  });

  test("deberia devolver una lista con todas las funciones si no se pasar ningun parametro de busqueda", async () => {
    const funcion2: Funcion = new Funcion(4, sala, pelicula);
    mockRepositorioFunciones.buscarFunciones.mockResolvedValue([funcion, funcion2]);
    const funciones: ListaFuncionesDTO = await buscarFuncionesComando.ejecutar({});
    expect(funciones.funciones).toContainEqual(funcion);
    expect(funciones.funciones).toContainEqual(funcion2);
    expect(mockRepositorioFunciones.buscarFunciones).toHaveBeenCalled();    
  });

  test("deberia devolver una lista con todas las funciones que cumplan con el parametro de busqueda por id de sala", async () => {
    const sala2: Sala = new Sala(2, capacidadSala);
    const funcion2: Funcion = new Funcion(4, sala2, pelicula);

    const filtros: FiltrosBusquedaFuncionesDTO = {
      idSala: sala.obtenerId(),
    };
    const funciones: ListaFuncionesDTO = await buscarFuncionesComando.ejecutar(filtros);
    expect(funciones.funciones).toContainEqual(funcion);
    expect(funciones.funciones).not.toContainEqual(funcion2);
    expect(mockRepositorioFunciones.buscarFunciones).toHaveBeenCalled();    
  });

  test("deberia devolver una lista con todas las funciones que cumplan con el parametro de busqueda por id de pelicula", async () => {
    const pelicula2: Pelicula = new Pelicula(2, tituloPelicula + 2, generoPelicula + 2);
    const funcion2: Funcion = new Funcion(4, sala, pelicula2);

    const filtros: FiltrosBusquedaFuncionesDTO = {
      idPelicula: pelicula.obtenerId(),
    };
    const funciones: ListaFuncionesDTO = await buscarFuncionesComando.ejecutar(filtros);
    expect(funciones.funciones).toContainEqual(funcion);
    expect(funciones.funciones).not.toContainEqual(funcion2);
    expect(mockRepositorioFunciones.buscarFunciones).toHaveBeenCalled();    
  });
});
