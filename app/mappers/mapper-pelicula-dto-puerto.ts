import Pelicula from "../dominio/pelicula";
import CreacionPeliculaDTO from "../dtos/creacion-pelicula-dto";
import PeliculaDTO from "../dtos/pelicula-dto";

export default interface MapperPeliculaDTOPuerto {
  DTOAPeliculaParaGuardar(dto: CreacionPeliculaDTO): Pelicula;
  PeliculaADTO(pelicula: Pelicula): PeliculaDTO;
}
