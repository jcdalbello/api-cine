import BuscarPeliculaPorIdComando from "../../app/comandos/buscar-pelicula-por-id-comando";
import Pelicula from "../../app/dominio/pelicula";
import RepositorioPelicula from "../../app/dominio/puerto-repositorio-pelicula";
import { mock, Mock } from "ts-jest-mocker";
import PeliculaNoEncontradaError from "../../app/errores/pelicula-no-encontrada-error";
import IdDTO from "../../app/dtos/id-dto";
import PeliculaDTO from "../../app/dtos/pelicula-dto";

let mockRepositorioPeliculas: Mock<RepositorioPelicula>;
let obtenerPeliculaPorIdComando: BuscarPeliculaPorIdComando;

describe("BuscarPeliculaPorIdComando", () => {
  mockRepositorioPeliculas = mock<RepositorioPelicula>();
  obtenerPeliculaPorIdComando = new BuscarPeliculaPorIdComando(mockRepositorioPeliculas);

  test("deberia crear un objeto ObtenerPeliculaPorIdComando", () => {
    expect(obtenerPeliculaPorIdComando).toBeInstanceOf(BuscarPeliculaPorIdComando);
  });

  test("deberia devolver la unica pelicula guardada en la base de datos", async () => {
    const id: number = 1;
    const titulo: string = "pelicula1";
    const genero: string = "genero1";
    const pelicula: Pelicula = new Pelicula(id, titulo, genero);
    mockRepositorioPeliculas.recuperar.mockResolvedValue(pelicula);
    const idDTO: IdDTO = {
      id: id,
    };
    const peliculaRecuperada: PeliculaDTO = await obtenerPeliculaPorIdComando.ejecutar(idDTO);
    expect(peliculaRecuperada.id).toEqual(id);
    expect(peliculaRecuperada.titulo).toEqual(titulo);
    expect(peliculaRecuperada.genero).toEqual(genero);
  });

  test("deberia devolver cada pelicula correspondiente al id", async () => {
    for (let i = 1; i <= 10; i++) {
      const idActual: number = i;
      const tituloActual: string = "pelicula" + i;
      const generoActual: string = "genero" + i;
      const pelicula: Pelicula = new Pelicula(idActual, tituloActual, generoActual);
      mockRepositorioPeliculas.recuperar.mockResolvedValue(pelicula);
      const idDTO: IdDTO = {
        id: idActual,
      };
      const peliculaRecuperada: PeliculaDTO = await obtenerPeliculaPorIdComando.ejecutar(idDTO);
      expect(peliculaRecuperada.id).toEqual(idActual);
      expect(peliculaRecuperada.titulo).toEqual(tituloActual);
      expect(peliculaRecuperada.genero).toEqual(generoActual);
    }
  });

  test("deberia devolver un error PeliculaNoEncontradaError al no encontrar ninguna pelicula con el id indicado cuando no hay peliculas", async () => {
    const id: number = 1;
    const idDTO: IdDTO = {
      id: id,
    };
    mockRepositorioPeliculas.recuperar.mockRejectedValue(new PeliculaNoEncontradaError());
    await expect(obtenerPeliculaPorIdComando.ejecutar(idDTO)).rejects.toThrow(PeliculaNoEncontradaError);
  });
});
