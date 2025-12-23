import Pelicula from "../dominio/pelicula";

export default class AgregarPeliculaComando {
  constructor() {}

  public ejecutar(titulo: string, genero: string): Pelicula {
    const pelicula: Pelicula = new Pelicula("1", titulo, genero);
    return pelicula;
  }
}
