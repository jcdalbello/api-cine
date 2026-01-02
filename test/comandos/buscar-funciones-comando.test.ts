import { Mock, mock } from "ts-jest-mocker";
import BuscarFuncionesComando from "../../app/comandos/buscar-funciones-comando";
import ListaFuncionesDTO from "../../app/dtos/lista-funciones-dto";
import RepositorioFuncion from "../../app/dominio/puerto-repositorio-funcion";
import Sala from "../../app/dominio/sala";
import Pelicula from "../../app/dominio/pelicula";
import Funcion from "../../app/dominio/funcion";

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
    pelicula = new Pelicula(idPelicula, tituloPelicula, generoPelicula);
    sala = new Sala(idSala, capacidadSala);
    funcion = new Funcion(idFuncion, sala, pelicula);
  });

  test("deberia crear un objeto BuscarFuncionesComando", () => {
    expect(buscarFuncionesComando).toBeInstanceOf(BuscarFuncionesComando);
  });

  test("deberia devolver una lista vacia si no hay funciones guardadas", () => {
    mockRepositorioFunciones.buscarFunciones.mockReturnValue([]);
    const funciones: ListaFuncionesDTO = buscarFuncionesComando.ejecutar({});
    expect(funciones.funciones.length).toEqual(0);
  });

  test("deberia devolver una lista con la unica funcion guardada sin pasar ningun parametro de busqueda", () => {
    mockRepositorioFunciones.buscarFunciones.mockReturnValue([funcion]);
    const funciones: ListaFuncionesDTO = buscarFuncionesComando.ejecutar({});
    expect(funciones.funciones).toContainEqual(funcion);
    expect(mockRepositorioFunciones.buscarFunciones).toHaveBeenCalled();    
  });

  test("deberia devolver una lista con todas las funciones si no se pasar ningun parametro de busqueda", () => {
    const funcion2: Funcion = new Funcion(4, sala, pelicula);
    mockRepositorioFunciones.buscarFunciones.mockReturnValue([funcion, funcion2]);
    const funciones: ListaFuncionesDTO = buscarFuncionesComando.ejecutar({});
    expect(funciones.funciones).toContainEqual(funcion);
    expect(funciones.funciones).toContainEqual(funcion2);
    expect(mockRepositorioFunciones.buscarFunciones).toHaveBeenCalled();    
  });
});
