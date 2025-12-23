import AgregarPeliculaComando from "../../app/comandos/agregar-pelicula-comando";
import Pelicula from "../../app/dominio/pelicula";

const agregarPeliculaComando: AgregarPeliculaComando = new AgregarPeliculaComando();

describe("AgregarPeliculaComando", () => {
  const id: string = "1";
  const titulo: string = "pelicula1";
  const genero: string = "genero1";

  test("deberia crear un objeto AgregarPeliculaComando", () => {
    expect(agregarPeliculaComando).toBeInstanceOf(AgregarPeliculaComando);
  });

  test("deberia crear una pelicula con los datos correctos", () => {
    const pelicula: Pelicula = agregarPeliculaComando.ejecutar(titulo, genero);
    expect(pelicula.obtenerId()).toEqual(id);
    expect(pelicula.obtenerTitulo()).toEqual(titulo);
    expect(pelicula.obtenerGenero()).toEqual(genero);
  });

  test("deberia crear dos peliculas con los datos correctos", () => {
    const pelicula: Pelicula = agregarPeliculaComando.ejecutar(titulo, genero);
    expect(pelicula.obtenerId()).toEqual(id);
    expect(pelicula.obtenerTitulo()).toEqual(titulo);
    expect(pelicula.obtenerGenero()).toEqual(genero);

    const id2: string = "2";
    const titulo2: string = "pelicula2";
    const genero2: string = "genero2";
    const pelicula2: Pelicula = agregarPeliculaComando.ejecutar(titulo2, genero2);
    expect(pelicula2.obtenerId()).toEqual(id2);
    expect(pelicula2.obtenerTitulo()).toEqual(titulo2);
    expect(pelicula2.obtenerGenero()).toEqual(genero2);
  });
});
