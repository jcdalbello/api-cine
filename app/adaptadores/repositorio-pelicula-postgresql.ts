import RepositorioPelicula from "../dominio/puerto-repositorio-pelicula";
import Pelicula from "../dominio/pelicula";

export default class RepositorioPeliculaPostgreSQL implements RepositorioPelicula {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async guardar(pelicula: Pelicula): Promise<Pelicula> {
    return new Pelicula(1, pelicula.obtenerTitulo(), pelicula.obtenerGenero());
  }
}