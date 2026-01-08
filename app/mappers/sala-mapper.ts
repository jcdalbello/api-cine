import Sala from "../dominio/sala";
import CreacionSalaDTO from "../dtos/creacion-sala-dto";

export default class SalaMapper {
  constructor() {}

  public DTOASalaParaGuardar(dtoSala: CreacionSalaDTO): Sala {
    const salaParaGuardar: Sala = new Sala(0, dtoSala.capacidad);
    return salaParaGuardar;
  }
}