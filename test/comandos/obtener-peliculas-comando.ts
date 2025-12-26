import ObtenerPeliculasComando from "../../app/comandos/obtener-peliculas-comando";
import Pelicula from "../../app/dominio/pelicula";

let obtenerPeliculasComando: ObtenerPeliculasComando;

describe("ObtenerPeliculasComando", () => {
  obtenerPeliculasComando = new ObtenerPeliculasComando();

  test("deberia crear un objeto ObtenerPeliculasComando", () => {
    expect(obtenerPeliculasComando).toBeInstanceOf(ObtenerPeliculasComando);
  });

  test("deberia devolver una lista vacia cuando no hay peliculas", () => {
    const peliculas: Pelicula[] = obtenerPeliculasComando.ejecutar();
    expect(peliculas.length).toEqual(0);
  });
});
