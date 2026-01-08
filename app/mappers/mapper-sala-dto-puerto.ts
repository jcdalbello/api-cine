import Sala from "../dominio/sala";
import CreacionSalaDTO from "../dtos/creacion-sala-dto";
import ListaSalasDTO from "../dtos/lista-salas-dto";
import SalaDTO from "../dtos/sala-dto";

export default interface MapperSalaDTOPuerto {
  DTOASalaParaGuardar(dtoSala: CreacionSalaDTO): Sala;
  SalaADTO(sala: Sala): SalaDTO;
  listaSalasADTO(salas: Sala[]): ListaSalasDTO;
}