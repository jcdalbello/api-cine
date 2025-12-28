import ObtenerPeliculasComando from "../../app/comandos/obtener-peliculas-comando";
import Pelicula from "../../app/dominio/pelicula";
import { Mock, mock } from "ts-jest-mocker";
import RepositorioPelicula from "../../app/dominio/puerto-repositorio-pelicula";

let mockRepositorioPelicula: Mock<RepositorioPelicula>;
let obtenerPeliculasComando: ObtenerPeliculasComando;

describe("ObtenerPeliculasComando", () => {
  mockRepositorioPelicula = mock<RepositorioPelicula>();
  obtenerPeliculasComando = new ObtenerPeliculasComando(mockRepositorioPelicula);

  test("deberia crear un objeto ObtenerPeliculasComando", () => {
    expect(obtenerPeliculasComando).toBeInstanceOf(ObtenerPeliculasComando);
  });

  test("deberia devolver una lista vacia cuando no hay peliculas", async () => {
    mockRepositorioPelicula.listarPeliculas.mockResolvedValue([]);
    const peliculas: Pelicula[] = await obtenerPeliculasComando.ejecutar();
    expect(peliculas.length).toEqual(0);
  });

  test("deberia devolver una lista con una sola pelicula cuando solo hay una pelicula guardada", async () => {
    const pelicula: Pelicula = new Pelicula(1, "pelicula1", "genero1");
    mockRepositorioPelicula.listarPeliculas.mockResolvedValue([pelicula]);
    const peliculas: Pelicula[] = await obtenerPeliculasComando.ejecutar();
    expect(peliculas.length).toEqual(1);
    expect(peliculas).toContain(pelicula);
  });

  test("deberia devolver una lista con las peliculas que coinciden con el titulo", async () => {
    const titulo: string = "pelicula1";
    const pelicula: Pelicula = new Pelicula(1, titulo, "genero1");
    mockRepositorioPelicula.listarPeliculas.mockResolvedValue([pelicula]);
    const peliculas: Pelicula[] = await obtenerPeliculasComando.ejecutar(titulo);
    expect(peliculas.length).toEqual(1);
    expect(peliculas).toContain(pelicula);
  });

  test("deberia devolver una lista con las peliculas que coinciden con el genero", async () => {
    const genero: string = "genero1";
    const pelicula: Pelicula = new Pelicula(1, "pelicula", genero);
    mockRepositorioPelicula.listarPeliculas.mockResolvedValue([pelicula]);
    const peliculas: Pelicula[] = await obtenerPeliculasComando.ejecutar(genero);
    expect(peliculas.length).toEqual(1);
    expect(peliculas).toContain(pelicula);
  });
});
