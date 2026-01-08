import Pelicula from "../dominio/pelicula";
import CreacionPeliculaDTO from "../dtos/creacion-pelicula-dto";
import ListaPeliculasDTO from "../dtos/lista-peliculas-dto";
import PeliculaDTO from "../dtos/pelicula-dto";
import MapperPeliculaDTOPuerto from "./mapper-pelicula-dto-puerto";

export default class MapperPeliculaDTO implements MapperPeliculaDTOPuerto {
  public DTOAPeliculaParaGuardar(creacionPeliculaDTO: CreacionPeliculaDTO): Pelicula {
    const peliculaParaGuardar: Pelicula = new Pelicula(
      0,
      creacionPeliculaDTO.titulo,
      creacionPeliculaDTO.genero
    );
    return peliculaParaGuardar;
  }

  public PeliculaADTO(pelicula: Pelicula): PeliculaDTO {
    const peliculaDTO: PeliculaDTO = {
      id: pelicula.obtenerId(),
      titulo: pelicula.obtenerTitulo(),
      genero: pelicula.obtenerGenero(),
    };

    return peliculaDTO;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public listaPeliculasADTO(peliculas: Pelicula[]): ListaPeliculasDTO {
    const listaPeliculasDTO: ListaPeliculasDTO = {
      peliculas: [],
    };
    return listaPeliculasDTO;
  }
}
