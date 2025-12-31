import RepositorioPelicula from "../dominio/puerto-repositorio-pelicula";
import IdDTO from "../dtos/id-dto";
import PeliculaDTO from "../dtos/pelicula-dto";
import Pelicula from "../dominio/pelicula";

export default class BuscarPeliculaPorIdComando {
  constructor(
    private readonly repositorioPelicula: RepositorioPelicula,
  ) {}

  public async ejecutar(idDTO: IdDTO): Promise<PeliculaDTO> {
    const pelicula: Pelicula = await this.repositorioPelicula.recuperar(idDTO.id);
    const peliculaDTO: PeliculaDTO = {
      id: pelicula.obtenerId(),
      titulo: pelicula.obtenerTitulo(),
      genero: pelicula.obtenerGenero(),
    };
    return peliculaDTO;
  }
}