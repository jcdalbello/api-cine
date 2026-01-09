import { mock, Mock } from "ts-jest-mocker";
import BuscarFuncionPorIdComando from "../../app/comandos/buscar-funcion-por-id-comando";
import Funcion from "../../app/dominio/funcion";
import Pelicula from "../../app/dominio/pelicula";
import RepositorioFuncion from "../../app/dominio/puerto-repositorio-funcion";
import Sala from "../../app/dominio/sala";
import FuncionDTO from "../../app/dtos/funcion-dto";
import IdDTO from "../../app/dtos/id-dto";
import FuncionNoEncontradaError from "../../app/errores/funcion-no-encontrada-error";
import MapperFuncionDTOPuerto from "../../app/mappers/mapper-funcion-dto-puerto";
import SalaDTO from "../../app/dtos/sala-dto";
import PeliculaDTO from "../../app/dtos/pelicula-dto";

describe("BuscarFuncionPorIdComando", () => {
  const mockRepositorioFuncion: Mock<RepositorioFuncion> = mock<RepositorioFuncion>();
  const mockMapperFuncion: Mock<MapperFuncionDTOPuerto> = mock<MapperFuncionDTOPuerto>();
  const buscarFuncionPorIdComando: BuscarFuncionPorIdComando = new BuscarFuncionPorIdComando(
    mockRepositorioFuncion,
    mockMapperFuncion,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deberia crear un objeto BuscarFuncionPorIdComando", () => {
    expect(buscarFuncionPorIdComando).toBeInstanceOf(BuscarFuncionPorIdComando);
  });

  test("deberia devolver la funcion que corresponda con el id pasado si existe", async () => {
    const idFuncion: number = 1;
    
    const idSala: number = 1;
    const idPelicula: number = 1;
  
    const capacidadSala: number = 50;
    const tituloPelicula: string = "pelicula1";
    const generoPelicula: string = "genero1";

    const sala: Sala = new Sala(idSala, capacidadSala);
    const salaDTO: SalaDTO = {
      id: idSala,
      capacidad: capacidadSala
    };
    const pelicula: Pelicula = new Pelicula(idPelicula, tituloPelicula, generoPelicula);
    const peliculaDTO: PeliculaDTO = {
      id: idPelicula,
      titulo: tituloPelicula,
      genero: generoPelicula
    };
    const funcion: Funcion = new Funcion(idFuncion, sala, pelicula);
    const funcionDTORecuperada: FuncionDTO = {
      id: idFuncion,
      sala: salaDTO,
      pelicula: peliculaDTO
    };

    mockRepositorioFuncion.recuperar.mockResolvedValue(funcion);
    mockMapperFuncion.FuncionADTO.mockReturnValue(funcionDTORecuperada);
    
    const idDTO: IdDTO = {
      id: idFuncion,
    };

    const funcionDTO: FuncionDTO = await buscarFuncionPorIdComando.ejecutar(idDTO);
    expect(funcionDTO.id).toEqual(idFuncion);
    expect(funcionDTO.sala).toEqual(sala);
    expect(funcionDTO.pelicula).toEqual(pelicula);
  });

  test("deberia devolver la funcion correspondiente al id pasado por parametro con varias funciones", async () => {
    const cantidadDeFuncionesAGenerar: number = 5;
    for (let i = 1; i <= cantidadDeFuncionesAGenerar; i++) {
      const idActual: number = i;
      const salaActual: Sala = new Sala(idActual, i * 10);
      const SalaDTOActual: SalaDTO = {
        id: idActual,
        capacidad: i * 10,
      };
      const peliculaActual: Pelicula = new Pelicula(idActual, "pelicula" + idActual, "genero" + idActual);
      const peliculaDTOActual: PeliculaDTO = {
        id: idActual,
        titulo: "pelicula" + idActual,
        genero: "genero" + idActual,
      };
      const funcionActual: Funcion = new Funcion(idActual, salaActual, peliculaActual);
      const funcionDTOActual: FuncionDTO = {
        id: idActual,
        sala: SalaDTOActual,
        pelicula: peliculaDTOActual,
      };

      const idDTO: IdDTO = { id: idActual };

      mockRepositorioFuncion.recuperar.mockResolvedValue(funcionActual);
      mockMapperFuncion.FuncionADTO.mockReturnValue(funcionDTOActual);
      const funcionRecuperada: FuncionDTO = await buscarFuncionPorIdComando.ejecutar(idDTO);

      expect(funcionRecuperada.id).toEqual(funcionActual.obtenerId());
      expect(funcionRecuperada.sala).toEqual(funcionActual.obtenerSala());
      expect(funcionRecuperada.pelicula).toEqual(funcionActual.obtenerPelicula());
    }
  });

  test("deberia devolver un error FuncionNoEncontradaError si no existe ninguna funcion con el id indicado", async () => {
    const idDesconocido: number = 99999;
    const idDTO: IdDTO = { id: idDesconocido };
    mockRepositorioFuncion.recuperar.mockRejectedValue(new FuncionNoEncontradaError());
    await expect(buscarFuncionPorIdComando.ejecutar(idDTO)).rejects.toThrow(FuncionNoEncontradaError);
  });
});
