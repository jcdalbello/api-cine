import RepositorioPelicula from "../dominio/puerto-repositorio-pelicula";
import FiltrosBusquedaPeliculasDTO from "../dominio/filtros-busqueda-peliculas-dto";
import Pelicula from "../dominio/pelicula";

export default class BuscarPeliculasComando {
  constructor(
    private readonly repositorioPelicula: RepositorioPelicula,
  ) {}
  
  public async ejecutar(filtros: FiltrosBusquedaPeliculasDTO): Promise<Pelicula[]> {
    return this.repositorioPelicula.listarPeliculas(filtros.titulo, filtros.genero);
  }
}
