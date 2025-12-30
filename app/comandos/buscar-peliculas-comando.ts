import Pelicula from "../dominio/pelicula";
import RepositorioPelicula from "../dominio/puerto-repositorio-pelicula";

export default class BuscarPeliculasComando {
  constructor(
    private readonly repositorioPelicula: RepositorioPelicula,
  ) {}
  
  public async ejecutar(titulo?: string, genero?: string): Promise<Pelicula[]> {
    return this.repositorioPelicula.listarPeliculas(titulo, genero);
  }
}
