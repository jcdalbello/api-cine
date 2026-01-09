import Funcion from "../dominio/funcion";
import FuncionDTO from "../dtos/funcion-dto";
import ListaFuncionesDTO from "../dtos/lista-funciones-dto";

export default interface MapperFuncionDTOPuerto {
  FuncionADTO(funcion: Funcion): FuncionDTO;
  ListaFuncionesADTO(funciones: Funcion[]): ListaFuncionesDTO;
}
