import PeliculaDTO from "./pelicula-dto";
import SalaDTO from "./sala-dto";

export default interface FuncionDTO {
  id: number;
  sala: SalaDTO;
  pelicula: PeliculaDTO;
}
