import { mock, Mock } from "ts-jest-mocker";
import AgregarFuncionComando from "../../app/comandos/agregar-funcion-comando";
import RepositorioSala from "../../app/dominio/puerto-repositorio-sala";
import RepositorioFuncion from "../../app/dominio/puerto-repositorio-funcion";
import RepositorioPelicula from "../../app/dominio/puerto-repositorio-pelicula";
import Sala from "../../app/dominio/sala";
import Pelicula from "../../app/dominio/pelicula";
import Funcion from "../../app/dominio/funcion";
import FuncionDTO from "../../app/dtos/funcion-dto";
import CreacionFuncionDTO from "../../app/dtos/creacion-funcion-dto";
import SalaNoEncontradaError from "../../app/errores/sala-no-encontrada-error";
import PeliculaNoEncontradaError from "../../app/errores/pelicula-no-encontrada-error";
import MapperSalaDTO from "../../app/mappers/mapper-sala-dto";
import SalaDTO from "../../app/dtos/sala-dto";

describe("AgregarFuncionComando", () => {
  const mockRepositorioSala: Mock<RepositorioSala> = mock<RepositorioSala>();
  const mockRepositorioPelicula: Mock<RepositorioPelicula> = mock<RepositorioPelicula>();
  const mockRepositorioFuncion: Mock<RepositorioFuncion> = mock<RepositorioFuncion>();
  const mockMapperSala: Mock<MapperSalaDTO> = mock<MapperSalaDTO>();
  const agregarFuncionComando: AgregarFuncionComando = new AgregarFuncionComando(
    mockRepositorioSala,
    mockRepositorioPelicula,
    mockRepositorioFuncion,
    mockMapperSala,
  );

  const idSala: number = 1;
  const capacidadSala: number = 50;
  const idPelicula: number = 1;
  const tituloPelicula: string = "pelicula";
  const generoPelicula: string = "genero";
  const creacionFuncionDTO = {
    idSala: idSala,
    idPelicula: idPelicula
  };

  const salaDTO: SalaDTO = {
    id: idSala,
    capacidad: capacidadSala
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deberia crear un objeto AgregarFuncionComando", () => {
    expect(agregarFuncionComando).toBeInstanceOf(AgregarFuncionComando);
  });

  test("deberia crear una funcion con los datos correctos", async () => {   
    const mockSala: Sala = new Sala(idSala, capacidadSala);
    const mockPelicula: Pelicula = new Pelicula(idPelicula, tituloPelicula, generoPelicula);
    
    const idFuncion: number = 1;
    const mockFuncion: Funcion = new Funcion(idFuncion, mockSala, mockPelicula);

    mockRepositorioSala.recuperar.mockResolvedValue(mockSala);
    mockRepositorioPelicula.recuperar.mockResolvedValue(mockPelicula);
    mockRepositorioFuncion.guardar.mockResolvedValue(mockFuncion);
    mockMapperSala.SalaADTO.mockReturnValue(salaDTO);
    
    const funcionDTO: FuncionDTO = await agregarFuncionComando.ejecutar(creacionFuncionDTO);

    expect(funcionDTO.id).toEqual(idFuncion);
    expect(funcionDTO.sala).toEqual(mockSala);
    expect(funcionDTO.pelicula).toEqual(mockPelicula);
  });

  test("deberia crear multiples funciones con los datos correctos", async () => {
    const cantidadDeFuncionesAGenerar: number = 5;
    
    for (let i = 1; i <= cantidadDeFuncionesAGenerar; i++) {
      const idSalaActual: number = i;
      const capacidadSalaActual: number = i * 10;
      const salaActual: Sala = new Sala(idSalaActual, capacidadSalaActual);
      const salaDTOActual: SalaDTO = {
        id: idSalaActual,
        capacidad: capacidadSalaActual,
      };

      const idPeliculaActual: number = i;
      const tituloPeliculaActual: string = "pelicula" + i;
      const generoPeliculaActual: string = "genero" + i;
      const peliculaActual: Pelicula = new Pelicula(idPeliculaActual, tituloPeliculaActual, generoPeliculaActual);

      const idFuncionActual: number = 1;
      const funcionActual: Funcion = new Funcion(idFuncionActual, salaActual, peliculaActual);

      mockRepositorioSala.recuperar.mockResolvedValue(salaActual);
      mockRepositorioPelicula.recuperar.mockResolvedValue(peliculaActual);
      mockRepositorioFuncion.guardar.mockResolvedValue(funcionActual);
      mockMapperSala.SalaADTO.mockReturnValue(salaDTOActual);

      const creacionFuncionActualDTO: CreacionFuncionDTO = {
        idSala: idSalaActual,
        idPelicula: idPeliculaActual,
      };

      const funcionActualDTO: FuncionDTO = await agregarFuncionComando.ejecutar(creacionFuncionActualDTO);

      expect(funcionActualDTO.id).toEqual(idFuncionActual);
      expect(funcionActualDTO.sala).toEqual(salaActual);
      expect(funcionActualDTO.pelicula).toEqual(peliculaActual);
    }
  });

  test("deberia devolver un error SalaNoEncontradaError si no se encuentra la sala con el id pasado por parametro", async () => {
    const idSalaInexistente: number = 99999;
    const creacionFuncionSalaInexistenteDTO: CreacionFuncionDTO = {
      ...creacionFuncionDTO,
      idSala: idSalaInexistente,
    };
    mockRepositorioSala.recuperar.mockRejectedValue(new SalaNoEncontradaError());
    mockRepositorioPelicula.recuperar.mockResolvedValue(new Pelicula(1, tituloPelicula, generoPelicula));
    await expect(agregarFuncionComando.ejecutar(creacionFuncionSalaInexistenteDTO)).rejects.toThrow(SalaNoEncontradaError);
  });

  test("deberia devolver un error PeliculaNoEncontradaError si no se encuentra la pelicula con el id pasado por parametro", async () => {
    const idPeliculaInexistente: number = 99999;
    
    const capacidadSala: number = 50;
    const creacionFuncionPeliculaInexistenteDTO: CreacionFuncionDTO = {
      ...creacionFuncionDTO,
      idPelicula: idPeliculaInexistente,
    };
    mockRepositorioSala.recuperar.mockResolvedValue(new Sala(idSala, capacidadSala));
    mockRepositorioPelicula.recuperar.mockRejectedValue(new PeliculaNoEncontradaError());
    await expect(agregarFuncionComando.ejecutar(creacionFuncionPeliculaInexistenteDTO)).rejects.toThrow(PeliculaNoEncontradaError);
  });
});
