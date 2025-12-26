import Pelicula from "../dominio/pelicula";
import RepositorioPelicula from "../dominio/puerto-repositorio-pelicula";

export default class ObtenerPeliculasComando {
  constructor(
    private readonly repositorioPelicula: RepositorioPelicula,
  ) {}
  
  public async ejecutar(): Promise<Pelicula[]> {
    return this.repositorioPelicula.listarPeliculas();
  }
}
