import Pelicula from "../../app/dominio/pelicula";
import CampoIncorrectoPeliculaError from "../../app/errores/campo-incorrecto-pelicula-error";

describe("Pelicula", () => {
  const id: number = 1;
  const titulo: string = "pelicula1";
  const genero: string = "genero1";
  const longitudMaximaCaracteres: number = 70;
  const tituloDemasiadoLargo: string = "a".repeat(longitudMaximaCaracteres + 1);
  const generoDemasiadoLargo: string = "a".repeat(longitudMaximaCaracteres + 1);

  test("deberia crear un objeto Pelicula", () => {
    const pelicula: Pelicula = new Pelicula(id, titulo, genero);
    expect(pelicula).toBeInstanceOf(Pelicula);
  });

  test("deberia crear una pelicula con los datos correctos", () => {
    const pelicula: Pelicula = new Pelicula(id, titulo, genero);
    expect(pelicula.obtenerId()).toEqual(id);
    expect(pelicula.obtenerTitulo()).toEqual(titulo);
    expect(pelicula.obtenerGenero()).toEqual(genero);
  });

  test("deberia devolver un error CampoIncorrectoPeliculaError al intentar crear una pelicula con un id invalido", () => {
    expect(() => new Pelicula(-1, titulo, genero)).toThrow(CampoIncorrectoPeliculaError);
  });

  test("deberia devolver un error CampoIncorrectoPeliculaError al intentar crear una pelicula con un titulo vacio", () => {
    expect(() => new Pelicula(id, "", genero)).toThrow(CampoIncorrectoPeliculaError);
  });

  test("deberia devolver un error CampoIncorrectoPeliculaError al intentar crear una pelicula con un titulo mas largo de lo permitido", () => {
    const tituloDemasiadoLargo: string = "a".repeat(longitudMaximaCaracteres + 1);
    expect(() => new Pelicula(id, tituloDemasiadoLargo, genero)).toThrow(CampoIncorrectoPeliculaError);
  });

  test("deberia devolver un error CampoIncorrectoPeliculaError al intentar crear una pelicula con un genero vacio", () => {
    expect(() => new Pelicula(id, titulo, "")).toThrow(CampoIncorrectoPeliculaError);
  });

  test("deberia devolver un error CampoIncorrectoPeliculaError al intentar crear una pelicula con un genero mas largo de lo permitido", () => {
    expect(() => new Pelicula(id, titulo, generoDemasiadoLargo)).toThrow(CampoIncorrectoPeliculaError);
  });

  test("deberia devolver todos los mensajes de error al intentar crear una pelicula con todos los datos vacios", () => {
    try {
      new Pelicula(-1, "", "");
    } catch (error) {
      if (error instanceof CampoIncorrectoPeliculaError) {
        expect(error.id).toEqual("El id no puede ser menor que 0");
        expect(error.titulo).toEqual("El titulo no puede estar vacio");
        expect(error.genero).toEqual("El genero no puede estar vacio");
      }
    }
  });
  
  test("deberia devolver todos los mensajes de error al intentar crear una pelicula con todos los datos vacios", () => {
    try {
      new Pelicula(id, tituloDemasiadoLargo, generoDemasiadoLargo);
    } catch (error) {
      if (error instanceof CampoIncorrectoPeliculaError) {
        expect(error.titulo).toEqual("El titulo no puede superar el limite de caracteres");
        expect(error.genero).toEqual("El genero no puede superar el limite de caracteres");
      }
    }
  });

  test("deberia devolver false con esPersistida si el id es 0", () => {
    const pelicula: Pelicula = new Pelicula(0, titulo, genero);
    expect(pelicula.tieneIdAsignado()).toBeFalsy();
  });

  test("deberia devolver true con esPersistida si el id es distinto de 0", () => {
    const pelicula: Pelicula = new Pelicula(0, titulo, genero);
    expect(pelicula.tieneIdAsignado()).toBeFalsy();
  });
});
