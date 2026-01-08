import BuscarPeliculasComando from "../../app/comandos/buscar-peliculas-comando";
import Pelicula from "../../app/dominio/pelicula";
import { Mock, mock } from "ts-jest-mocker";
import RepositorioPelicula from "../../app/dominio/puerto-repositorio-pelicula";
import FiltrosBusquedaPeliculasDTO from "../../app/dtos/filtros-busqueda-peliculas-dto";
import ListaPeliculasDTO from "../../app/dtos/lista-peliculas-dto";
import MapperPeliculaDTOPuerto from "../../app/mappers/mapper-pelicula-dto-puerto";
import PeliculaDTO from "../../app/dtos/pelicula-dto";

describe("BuscarPeliculasComando", () => {
  const mockRepositorioPelicula: Mock<RepositorioPelicula> = mock<RepositorioPelicula>();
  const mockMapperPeliculaDTO: Mock<MapperPeliculaDTOPuerto> = mock<MapperPeliculaDTOPuerto>();
  const obtenerPeliculasComando: BuscarPeliculasComando = new BuscarPeliculasComando(
    mockRepositorioPelicula,
    mockMapperPeliculaDTO
  );

  const id: number = 1;
  const titulo: string = "pelicula1";
  const genero: string = "genero1";
  const mockPelicula: Pelicula = new Pelicula(id, titulo, genero);
  const mockPeliculaDTO: PeliculaDTO = {
    id: id,
    titulo: titulo,
    genero: genero,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deberia crear un objeto ObtenerPeliculasComando", () => {
    expect(obtenerPeliculasComando).toBeInstanceOf(BuscarPeliculasComando);
  });

  test("deberia devolver una lista vacia cuando no hay peliculas", async () => {
    mockRepositorioPelicula.listarPeliculas.mockResolvedValue([]);
    mockMapperPeliculaDTO.listaPeliculasADTO.mockReturnValue({ peliculas: [] });
    const filtros: FiltrosBusquedaPeliculasDTO = {};
    const listaPeliculas: ListaPeliculasDTO = await obtenerPeliculasComando.ejecutar(filtros);
    expect(listaPeliculas.peliculas.length).toEqual(0);
  });

  test("deberia devolver una lista con una sola pelicula cuando solo hay una pelicula guardada", async () => {
    mockRepositorioPelicula.listarPeliculas.mockResolvedValue([mockPelicula]);
    mockMapperPeliculaDTO.listaPeliculasADTO.mockReturnValue({ peliculas: [mockPeliculaDTO] });
    const filtros: FiltrosBusquedaPeliculasDTO = {};
    const listaPeliculas: ListaPeliculasDTO = await obtenerPeliculasComando.ejecutar(filtros);
    expect(listaPeliculas.peliculas.length).toEqual(1);
    expect(listaPeliculas.peliculas).toContainEqual(mockPelicula);
  });

  test("deberia devolver una lista con las peliculas que coinciden con el titulo", async () => {
    mockRepositorioPelicula.listarPeliculas.mockResolvedValue([mockPelicula]);
    mockMapperPeliculaDTO.listaPeliculasADTO.mockReturnValue({ peliculas: [mockPeliculaDTO] });
    const filtros: FiltrosBusquedaPeliculasDTO = {
      titulo: titulo,
    };
    const listaPeliculas: ListaPeliculasDTO = await obtenerPeliculasComando.ejecutar(filtros);
    expect(listaPeliculas.peliculas.length).toEqual(1);
    expect(listaPeliculas.peliculas).toContainEqual(mockPelicula);
  });

  test("deberia devolver una lista con las peliculas que coinciden con el genero", async () => {
    mockRepositorioPelicula.listarPeliculas.mockResolvedValue([mockPelicula]);
    mockMapperPeliculaDTO.listaPeliculasADTO.mockReturnValue({ peliculas: [mockPeliculaDTO] });
    const filtros: FiltrosBusquedaPeliculasDTO = {
      genero: genero,
    };
    const listaPeliculas: ListaPeliculasDTO = await obtenerPeliculasComando.ejecutar(filtros);
    expect(listaPeliculas.peliculas.length).toEqual(1);
    expect(listaPeliculas.peliculas).toContainEqual(mockPelicula);
  });

  test("deberia devolver una lista con las peliculas que tengan un titulo similar al indicado", async () => {
    const tituloSimilar: string = "pelicula";
    const mockPelicula: Pelicula = new Pelicula(1, tituloSimilar, genero);
    const mockPeliculaDTO: PeliculaDTO = {
      id: 1,
      titulo: tituloSimilar,
      genero: genero,
    };
    mockRepositorioPelicula.listarPeliculas.mockResolvedValue([mockPelicula]);
    mockMapperPeliculaDTO.listaPeliculasADTO.mockReturnValue({ peliculas: [mockPeliculaDTO] });
    const filtros: FiltrosBusquedaPeliculasDTO = {
      titulo: tituloSimilar,
    };
    const listaPeliculas: ListaPeliculasDTO = await obtenerPeliculasComando.ejecutar(filtros);
    expect(listaPeliculas.peliculas.length).toEqual(1);
    expect(listaPeliculas.peliculas).toContainEqual(mockPelicula);
  });

  test("deberia devolver una lista con las peliculas que tengan un titulo similar al indicado", async () => {
    const generoSimilar: string = "genero";
    const mockPelicula: Pelicula = new Pelicula(1, titulo, generoSimilar);
    const mockPeliculaDTO: PeliculaDTO = {
      id: 1,
      titulo: titulo,
      genero: generoSimilar,
    };
    mockRepositorioPelicula.listarPeliculas.mockResolvedValue([mockPelicula]);
    mockMapperPeliculaDTO.listaPeliculasADTO.mockReturnValue({ peliculas: [mockPeliculaDTO] });
    const filtros: FiltrosBusquedaPeliculasDTO = {
      genero: generoSimilar,
    };
    const listaPeliculas: ListaPeliculasDTO = await obtenerPeliculasComando.ejecutar(filtros);
    expect(listaPeliculas.peliculas.length).toEqual(1);
    expect(listaPeliculas.peliculas).toContainEqual(mockPelicula);
  });
});
