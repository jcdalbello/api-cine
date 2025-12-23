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

  test("deberia devolver un error CampoIncorrectoPeliculaError al intentar crear una pelicula con un id vacio", () => {
    expect(() => new Pelicula("", "pelicula1", "genero1")).toThrow(CampoIncorrectoPeliculaError);
  });

  test("deberia devolver un error CampoIncorrectoPeliculaError al intentar crear una pelicula con un titulo vacio", () => {
    expect(() => new Pelicula("1", "", "genero1")).toThrow(CampoIncorrectoPeliculaError);
  });

  test("deberia devolver un error CampoIncorrectoPeliculaError al intentar crear una pelicula con un titulo mas largo de lo permitido", () => {
    const longitudMaximaCaracteres: number = 70;
    const tituloDemasiadoLargo: string = "a".repeat(longitudMaximaCaracteres + 1);
    expect(() => new Pelicula("1", tituloDemasiadoLargo, "genero1")).toThrow(CampoIncorrectoPeliculaError);
  });

  test("deberia devolver un error CampoIncorrectoPeliculaError al intentar crear una pelicula con un genero vacio", () => {
    expect(() => new Pelicula("1", "pelicula1", "")).toThrow(CampoIncorrectoPeliculaError);
  });

  test("deberia devolver un error CampoIncorrectoPeliculaError al intentar crear una pelicula con un genero mas largo de lo permitido", () => {
    const longitudMaximaCaracteres: number = 70;
    const generoDemasiadoLargo: string = "a".repeat(longitudMaximaCaracteres + 1);
    expect(() => new Pelicula("1", "pelicula1", generoDemasiadoLargo)).toThrow(CampoIncorrectoPeliculaError);
  });

  test("deberia devolver todos los mensajes de error al intentar crear una pelicula con todos los datos vacios", () => {
    try {
      new Pelicula("", "", "");
    } catch (error) {
      if (error instanceof CampoIncorrectoPeliculaError) {
        expect(error.id).toEqual("El id no puede estar vacio");
        expect(error.titulo).toEqual("El titulo no puede estar vacio");
        expect(error.genero).toEqual("El genero no puede estar vacio");
      }
    }
  });
  
  test("deberia devolver todos los mensajes de error al intentar crear una pelicula con todos los datos vacios", () => {
    const longitudMaximaCaracteres: number = 70;
    const tituloDemasiadoLargo: string = "a".repeat(longitudMaximaCaracteres + 1);
    const generoDemasiadoLargo: string = "a".repeat(longitudMaximaCaracteres + 1);

    try {
      new Pelicula("1", tituloDemasiadoLargo, generoDemasiadoLargo);
    } catch (error) {
      if (error instanceof CampoIncorrectoPeliculaError) {
        expect(error.titulo).toEqual("El titulo no puede superar el limite de caracteres");
        expect(error.genero).toEqual("El genero no puede superar el limite de caracteres");
      }
    }
  });
});
