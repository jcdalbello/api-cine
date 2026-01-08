import RepositorioPelicula from "../dominio/puerto-repositorio-pelicula";
import IdDTO from "../dtos/id-dto";
import PeliculaDTO from "../dtos/pelicula-dto";
import Pelicula from "../dominio/pelicula";
import MapperPeliculaDTOPuerto from "../mappers/mapper-pelicula-dto-puerto";

export default class BuscarPeliculaPorIdComando {
  constructor(
    private readonly repositorioPelicula: RepositorioPelicula,
    private readonly mapperPelicula: MapperPeliculaDTOPuerto,
  ) {}

  public async ejecutar(idDTO: IdDTO): Promise<PeliculaDTO> {
    const pelicula: Pelicula = await this.repositorioPelicula.recuperar(idDTO.id);
    /*
    const peliculaDTO: PeliculaDTO = {
      id: pelicula.obtenerId(),
      titulo: pelicula.obtenerTitulo(),
      genero: pelicula.obtenerGenero(),
    };
    */
    const peliculaDTO: PeliculaDTO = this.mapperPelicula.PeliculaADTO(pelicula);
    return peliculaDTO;
  }
}