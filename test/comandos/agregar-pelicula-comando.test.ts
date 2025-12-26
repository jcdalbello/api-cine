import AgregarPeliculaComando from "../../app/comandos/agregar-pelicula-comando";
import Pelicula from "../../app/dominio/pelicula";
import { Mock, mock } from "ts-jest-mocker";
import RepositorioPelicula from "../../app/dominio/puerto-repositorio-pelicula";
import CampoIncorrectoPeliculaError from "../../app/errores/campo-incorrecto-pelicula-error";

let mockRepositorioPelicula: Mock<RepositorioPelicula>;
let agregarPeliculaComando: AgregarPeliculaComando;

describe("AgregarPeliculaComando", () => {
  mockRepositorioPelicula = mock<RepositorioPelicula>();
  agregarPeliculaComando = new AgregarPeliculaComando(mockRepositorioPelicula);

  const id: number = 1;
  const titulo: string = "pelicula1";
  const genero: string = "genero1";

  test("deberia crear un objeto AgregarPeliculaComando", () => {
    expect(agregarPeliculaComando).toBeInstanceOf(AgregarPeliculaComando);
  });

  test("deberia crear una pelicula con los datos correctos", async () => {
    mockRepositorioPelicula.guardar.mockResolvedValue(new Pelicula(id, titulo, genero));
    const pelicula: Pelicula = await agregarPeliculaComando.ejecutar(titulo, genero);
    expect(pelicula.obtenerId()).toEqual(id);
    expect(pelicula.obtenerTitulo()).toEqual(titulo);
    expect(pelicula.obtenerGenero()).toEqual(genero);
  });

  test("deberia crear dos peliculas con los datos correctos", async () => {
    mockRepositorioPelicula.guardar.mockResolvedValue(new Pelicula(id, titulo, genero));
    const pelicula: Pelicula = await agregarPeliculaComando.ejecutar(titulo, genero);
    expect(pelicula.obtenerId()).toEqual(id);
    expect(pelicula.obtenerTitulo()).toEqual(titulo);
    expect(pelicula.obtenerGenero()).toEqual(genero);

    const id2: number = 2;
    const titulo2: string = "pelicula2";
    const genero2: string = "genero2";
    mockRepositorioPelicula.guardar.mockResolvedValue(new Pelicula(id2, titulo2, genero2));
    const pelicula2: Pelicula = await agregarPeliculaComando.ejecutar(titulo2, genero2);
    expect(pelicula2.obtenerId()).toEqual(id2);
    expect(pelicula2.obtenerTitulo()).toEqual(titulo2);
    expect(pelicula2.obtenerGenero()).toEqual(genero2);
  });

  test("deberia devolver un error al pasar un titulo demasiado largo", async () => {
    const longitudMaximaTitulo: number = 70;
    const tituloDemasiadoLargo: string = "a".repeat(longitudMaximaTitulo + 1);
    await expect(agregarPeliculaComando.ejecutar(tituloDemasiadoLargo, genero)).rejects.toThrow(CampoIncorrectoPeliculaError);
  });
  
  test("deberia devolver un error al pasar un genero demasiado largo", async () => {
    const longitudMaximaTitulo: number = 70;
    const generoDemasiadoLargo: string = "a".repeat(longitudMaximaTitulo + 1);
    await expect(agregarPeliculaComando.ejecutar(titulo, generoDemasiadoLargo)).rejects.toThrow(CampoIncorrectoPeliculaError);
  });
});
