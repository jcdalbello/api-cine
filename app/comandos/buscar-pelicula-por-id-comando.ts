import Pelicula from "../dominio/pelicula";
import RepositorioPelicula from "../dominio/puerto-repositorio-pelicula";

export default class BuscarPeliculaPorIdComando {
  constructor(
    private readonly repositorioPelicula: RepositorioPelicula,
  ) {}

  public async ejecutar(id: number): Promise<Pelicula> {
    return this.repositorioPelicula.recuperar(id);
  }
}