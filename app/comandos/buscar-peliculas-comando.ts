import RepositorioPelicula from "../dominio/puerto-repositorio-pelicula";
import FiltrosBusquedaPeliculasDTO from "../dtos/filtros-busqueda-peliculas-dto";
import Pelicula from "../dominio/pelicula";
import PeliculaDTO from "../dtos/pelicula-dto";
import ListaPeliculasDTO from "../dtos/lista-peliculas-dto";

export default class BuscarPeliculasComando {
  constructor(
    private readonly repositorioPelicula: RepositorioPelicula,
  ) {}
  
  public async ejecutar(filtros: FiltrosBusquedaPeliculasDTO): Promise<ListaPeliculasDTO> {
    const peliculas: Pelicula[] = await this.repositorioPelicula.listarPeliculas(filtros.titulo, filtros.genero);
    const listaPeliculas: PeliculaDTO[] = peliculas.map((pelicula: Pelicula) => {
      return {
        id: pelicula.obtenerId(),
        titulo: pelicula.obtenerTitulo(),
        genero: pelicula.obtenerGenero(),
      };
    });

    const listaPeliculasDTO: ListaPeliculasDTO = {
      peliculas: listaPeliculas,
    };

    return listaPeliculasDTO;
  }
}
