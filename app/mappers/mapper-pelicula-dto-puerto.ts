import Pelicula from "../dominio/pelicula";
import CreacionPeliculaDTO from "../dtos/creacion-pelicula-dto";

export default interface MapperPeliculaDTOPuerto {
  DTOAPeliculaParaGuardar(dto: CreacionPeliculaDTO): Pelicula;
}
