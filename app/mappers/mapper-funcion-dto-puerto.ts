import Funcion from "../dominio/funcion";
import FuncionDTO from "../dtos/funcion-dto";

export default interface MapperFuncionDTOPuerto {
  FuncionADTO(funcion: Funcion): FuncionDTO;
}
