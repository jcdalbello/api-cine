import BuscarPeliculasComando from "../../app/comandos/buscar-peliculas-comando";
import Pelicula from "../../app/dominio/pelicula";
import { Mock, mock } from "ts-jest-mocker";
import RepositorioPelicula from "../../app/dominio/puerto-repositorio-pelicula";

let mockRepositorioPelicula: Mock<RepositorioPelicula>;
let obtenerPeliculasComando: BuscarPeliculasComando;

describe("BuscarPeliculasComando", () => {
  mockRepositorioPelicula = mock<RepositorioPelicula>();
  obtenerPeliculasComando = new BuscarPeliculasComando(mockRepositorioPelicula);

  const id: number = 1;
  const titulo: string = "pelicula1";
  const genero: string = "genero1";
  const mockPelicula: Pelicula = new Pelicula(id, titulo, genero);

  test("deberia crear un objeto ObtenerPeliculasComando", () => {
    expect(obtenerPeliculasComando).toBeInstanceOf(BuscarPeliculasComando);
  });

  test("deberia devolver una lista vacia cuando no hay peliculas", async () => {
    mockRepositorioPelicula.listarPeliculas.mockResolvedValue([]);
    const peliculas: Pelicula[] = await obtenerPeliculasComando.ejecutar();
    expect(peliculas.length).toEqual(0);
  });

  test("deberia devolver una lista con una sola pelicula cuando solo hay una pelicula guardada", async () => {
    mockRepositorioPelicula.listarPeliculas.mockResolvedValue([mockPelicula]);
    const peliculas: Pelicula[] = await obtenerPeliculasComando.ejecutar();
    expect(peliculas.length).toEqual(1);
    expect(peliculas).toContain(mockPelicula);
  });

  test("deberia devolver una lista con las peliculas que coinciden con el titulo", async () => {
    mockRepositorioPelicula.listarPeliculas.mockResolvedValue([mockPelicula]);
    const peliculas: Pelicula[] = await obtenerPeliculasComando.ejecutar(titulo);
    expect(peliculas.length).toEqual(1);
    expect(peliculas).toContain(mockPelicula);
  });

  test("deberia devolver una lista con las peliculas que coinciden con el genero", async () => {
    mockRepositorioPelicula.listarPeliculas.mockResolvedValue([mockPelicula]);
    const peliculas: Pelicula[] = await obtenerPeliculasComando.ejecutar(genero);
    expect(peliculas.length).toEqual(1);
    expect(peliculas).toContain(mockPelicula);
  });

  test("deberia devolver una lista con las peliculas que tengan un titulo similar al indicado", async () => {
    const tituloSimilar: string = "pelicula";
    const mockPelicula: Pelicula = new Pelicula(1, tituloSimilar, genero);
    mockRepositorioPelicula.listarPeliculas.mockResolvedValue([mockPelicula]);
    const peliculas: Pelicula[] = await obtenerPeliculasComando.ejecutar(tituloSimilar);
    expect(peliculas.length).toEqual(1);
    expect(peliculas).toContain(mockPelicula);
  });

  test("deberia devolver una lista con las peliculas que tengan un titulo similar al indicado", async () => {
    const generoSimilar: string = "genero";
    const mockPelicula: Pelicula = new Pelicula(1, titulo, generoSimilar);
    mockRepositorioPelicula.listarPeliculas.mockResolvedValue([mockPelicula]);
    const peliculas: Pelicula[] = await obtenerPeliculasComando.ejecutar(generoSimilar);
    expect(peliculas.length).toEqual(1);
    expect(peliculas).toContain(mockPelicula);
  });
});
