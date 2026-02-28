import RepositorioPelicula from "../dominio/puerto-repositorio-pelicula";
import IdDTO from "../dtos/id-dto";

export default class EliminarPeliculaComando {
  constructor(
    private readonly repositorioPelicula: RepositorioPelicula,
  ) {}

  public async ejecutar(idDTO: IdDTO): Promise<void> {
    await this.repositorioPelicula.eliminar(idDTO.id);
  }
}
