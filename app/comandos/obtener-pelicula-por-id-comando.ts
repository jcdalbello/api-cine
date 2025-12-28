import Pelicula from "../dominio/pelicula";

export default class ObtenerPeliculaPorIdComando {
  constructor() {}

  public ejecutar(id: number): Pelicula {
    let pelicula: Pelicula;
    if (id == 1) {
      pelicula = new Pelicula(1, "pelicula1", "genero1");
    } else {
      pelicula = new Pelicula(2, "pelicula2", "genero2");
    }
    
    return pelicula
  }
}