import RepositorioPelicula from "../dominio/puerto-repositorio-pelicula";
import IdDTO from "../dtos/id-dto";
import Pelicula from "../dominio/pelicula";

export default class BuscarPeliculaPorIdComando {
  constructor(
    private readonly repositorioPelicula: RepositorioPelicula,
  ) {}

  public async ejecutar(idDTO: IdDTO): Promise<Pelicula> {
    return this.repositorioPelicula.recuperar(idDTO.id);
  }
}