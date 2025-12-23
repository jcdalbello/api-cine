import Pelicula from "../../app/dominio/pelicula";
import CampoIncorrectoPeliculaError from "../../app/errores/campo-incorrecto-pelicula-error";

describe("Pelicula", () => {
  test("deberia crear un objeto Pelicula", () => {
    const pelicula: Pelicula = new Pelicula("1", "pelicula1", "genero1");
    expect(pelicula).toBeInstanceOf(Pelicula);
  });

  test("deberia crear una pelicula con los datos correctos", () => {
    const pelicula: Pelicula = new Pelicula("1", "pelicula1", "genero1");
    expect(pelicula.obtenerId()).toEqual("1");
    expect(pelicula.obtenerTitulo()).toEqual("pelicula1");
    expect(pelicula.obtenerGenero()).toEqual("genero1");
  });

  test("deberia devolver un error al intentar crear una pelicula con un id vacio", () => {
    expect(() => new Pelicula("", "pelicula1", "genero1")).toThrow(CampoIncorrectoPeliculaError);
  });

  test("deberia devolver un error al intentar crear una pelicula con un titulo vacio", () => {
    expect(() => new Pelicula("1", "", "genero1")).toThrow(CampoIncorrectoPeliculaError);
  });
});
