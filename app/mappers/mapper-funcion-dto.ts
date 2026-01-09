import Funcion from "../dominio/funcion";
import FuncionDTO from "../dtos/funcion-dto";
import PeliculaDTO from "../dtos/pelicula-dto";
import SalaDTO from "../dtos/sala-dto";
import MapperFuncionDTOPuerto from "./mapper-funcion-dto-puerto";
import MapperPeliculaDTOPuerto from "./mapper-pelicula-dto-puerto";
import MapperSalaDTOPuerto from "./mapper-sala-dto-puerto";

export default class MapperFuncionDTO implements MapperFuncionDTOPuerto {
  constructor(
    private readonly mapperSala: MapperSalaDTOPuerto,
    private readonly mapperPelicula: MapperPeliculaDTOPuerto,
  ) {}
  public FuncionADTO(funcion: Funcion): FuncionDTO {
    const salaDTO: SalaDTO = this.mapperSala.SalaADTO(funcion.obtenerSala());
    const peliculaDTO: PeliculaDTO = this.mapperPelicula.PeliculaADTO(funcion.obtenerPelicula());
    const funcionDTO: FuncionDTO = {
      id: funcion.obtenerId(),
      sala: salaDTO,
      pelicula: peliculaDTO,
    };

    return funcionDTO;
  }
}
