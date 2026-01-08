import Pelicula from "../dominio/pelicula";
import CreacionPeliculaDTO from "../dtos/creacion-pelicula-dto";
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public PeliculaADTO(pelicula: Pelicula): PeliculaDTO {
    const peliculaDTO: PeliculaDTO = {
      id: 1,
      titulo: "pelicula",
      genero: "genero",
    };
    return peliculaDTO;
  }
}
