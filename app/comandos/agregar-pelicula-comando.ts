import Pelicula from "../dominio/pelicula";

export default class AgregarPeliculaComando {
  constructor() {}

  public ejecutar(titulo: string, genero: string): Pelicula {
    const id: number = parseInt(titulo.charAt(titulo.length - 1));
    const pelicula: Pelicula = new Pelicula(id, titulo, genero);
    return pelicula;
  }
}
