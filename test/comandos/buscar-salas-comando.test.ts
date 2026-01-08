import { Mock, mock } from "ts-jest-mocker";
import BuscarSalasComando from "../../app/comandos/buscar-salas-comando";
import RepositorioSala from "../../app/dominio/puerto-repositorio-sala";
import Sala from "../../app/dominio/sala";
import CampoIncorrectoSalaError from "../../app/errores/campo-incorrecto-sala-error";
import FiltrosBusquedaSalasDTO from "../../app/dtos/filtros-busqueda-salas-dto";
import ListaSalasDTO from "../../app/dtos/lista-salas-dto";
import MapperSalaDTOPuerto from "../../app/mappers/mapper-sala-dto-puerto";
import SalaDTO from "../../app/dtos/sala-dto";

describe("BuscarSalasComando", () => {
  const mockRepositorioSala: Mock<RepositorioSala> = mock<RepositorioSala>();
  const mockMapperSalaDTOPuerto: Mock<MapperSalaDTOPuerto> = mock<MapperSalaDTOPuerto>();
  const obtenerSalasComando: BuscarSalasComando = new BuscarSalasComando(
    mockRepositorioSala,
    mockMapperSalaDTOPuerto,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deberia crear un objeto ObtenerSalasComando", () => {
    expect(obtenerSalasComando).toBeInstanceOf(BuscarSalasComando);
  });

  test("deberia devolver una lista vacia cuando no hay salas guardadas", async () => {
    const listaVacia: Sala[] = [];
    const listaVaciaDTO: ListaSalasDTO = { salas: [] };

    mockRepositorioSala.listarSalas.mockResolvedValue(listaVacia);
    mockMapperSalaDTOPuerto.listaSalasADTO.mockReturnValue(listaVaciaDTO);
    const filtros: FiltrosBusquedaSalasDTO = {};
    const listaSalas: ListaSalasDTO = await obtenerSalasComando.ejectuar(filtros);
    expect(listaSalas.salas).toEqual([]);
  });

  test("deberia devolver una lista con una sola sala cuando hay una sola sala guardada", async () => {
    const sala: Sala = new Sala(1, 50);
    const salas: Sala[] = [sala];
    const salaDTO: SalaDTO = {
      id: sala.obtenerId(),
      capacidad: sala.obtenerCapacidad(),
    };
    const listaSalasDTO: ListaSalasDTO = { salas: [salaDTO] };

    mockRepositorioSala.listarSalas.mockResolvedValue(salas);
    mockMapperSalaDTOPuerto.listaSalasADTO.mockReturnValue(listaSalasDTO);

    const filtros: FiltrosBusquedaSalasDTO = {};
    const listaSalas: ListaSalasDTO = await obtenerSalasComando.ejectuar(filtros);
    expect(mockRepositorioSala.listarSalas).toHaveBeenCalled();
    expect(listaSalas.salas).toContainEqual(salas[0]);
  });

  test("deberia devolver una lista con todas las salas guardadas", async () => {
    const salas: Sala[] = [];
    const cantidadDeSalas: number = 3;
    for (let i = 1; i <= cantidadDeSalas; i++) {
      const sala: Sala = new Sala(i, i * 10);
      salas.push(sala);
    }

    const listaSalasDTO: SalaDTO[] = [];
    for (let i = 1; i <= cantidadDeSalas; i++) {
      const sala: Sala = new Sala(i, i * 10);
      const salaDTO: SalaDTO = {
        id: sala.obtenerId(),
        capacidad: sala.obtenerCapacidad(),
      };
      listaSalasDTO.push(salaDTO);
    }
    
    mockRepositorioSala.listarSalas.mockResolvedValue(salas);
    mockMapperSalaDTOPuerto.listaSalasADTO.mockReturnValue({ salas: listaSalasDTO });
    
    const filtros: FiltrosBusquedaSalasDTO = {};
    const listaSalas: ListaSalasDTO = await obtenerSalasComando.ejectuar(filtros);
    expect(mockRepositorioSala.listarSalas).toHaveBeenCalled();
    expect(listaSalas.salas).toContainEqual(salas[0]);
    expect(listaSalas.salas).toContainEqual(salas[1]);
    expect(listaSalas.salas).toContainEqual(salas[2]);
  });

  test("deberia devolver una lista con todas las salas que tengan una capacidad mayor o igual a la pasada por parametro", async () => {
    const capacidadMinima: number = 50;
    const sala1: Sala = new Sala(1, capacidadMinima - 1);
    const sala2: Sala = new Sala(2, capacidadMinima);
    const sala3: Sala = new Sala(3, capacidadMinima + 1);

    const salaDTO2: SalaDTO = {
      id: sala2.obtenerId(),
      capacidad: sala2.obtenerCapacidad(),
    };

    const salaDTO3: SalaDTO = {
      id: sala3.obtenerId(),
      capacidad: sala3.obtenerCapacidad(),
    };

    mockRepositorioSala.listarSalas.mockResolvedValue([sala2, sala3]);
    mockMapperSalaDTOPuerto.listaSalasADTO.mockReturnValue({salas: [salaDTO2, salaDTO3]});

    const filtros: FiltrosBusquedaSalasDTO = {
      capacidad: capacidadMinima,
    };
    const listaSalas: ListaSalasDTO = await obtenerSalasComando.ejectuar(filtros);
    expect(mockRepositorioSala.listarSalas).toHaveBeenCalled();
    expect(listaSalas.salas).toContainEqual(sala2);
    expect(listaSalas.salas).toContainEqual(sala3);
    expect(listaSalas.salas).not.toContainEqual(sala1);
  });

  test("deberia devolver un error CampoIncorrectoSalaError si la capacidad pasada por parametro es menor o igual a 0", async () => {
    const capacidadInvalida: number = 0;
    const filtros: FiltrosBusquedaSalasDTO = {
      capacidad: capacidadInvalida,
    };
    await expect(obtenerSalasComando.ejectuar(filtros)).rejects.toThrow(CampoIncorrectoSalaError);
  });
});
