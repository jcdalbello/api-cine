import RepositorioPelicula from "../dominio/puerto-repositorio-pelicula";
import FiltrosBusquedaPeliculasDTO from "../dtos/filtros-busqueda-peliculas-dto";
import Pelicula from "../dominio/pelicula";
import ListaPeliculasDTO from "../dtos/lista-peliculas-dto";
import MapperPeliculaDTOPuerto from "../mappers/mapper-pelicula-dto-puerto";

export default class BuscarPeliculasComando {
  constructor(
    private readonly repositorioPelicula: RepositorioPelicula,
    private readonly mapperPeliculas: MapperPeliculaDTOPuerto,
  ) {}
  
  public async ejecutar(filtros: FiltrosBusquedaPeliculasDTO): Promise<ListaPeliculasDTO> {
    const peliculas: Pelicula[] = await this.repositorioPelicula.listarPeliculas(filtros.titulo, filtros.genero);
    const listaPeliculasDTO: ListaPeliculasDTO = this.mapperPeliculas.listaPeliculasADTO(peliculas);
    return listaPeliculasDTO;
  }
}
