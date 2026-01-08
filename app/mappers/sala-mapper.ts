import Sala from "../dominio/sala";
import CreacionSalaDTO from "../dtos/creacion-sala-dto";
import SalaDTO from "../dtos/sala-dto";

export default class SalaMapper {
  constructor() {}

  public DTOASalaParaGuardar(dtoSala: CreacionSalaDTO): Sala {
    const salaParaGuardar: Sala = new Sala(0, dtoSala.capacidad);
    return salaParaGuardar;
  }

  public SalaADTO(sala: Sala): SalaDTO {
    const salaDTO: SalaDTO = {
      id: sala.obtenerId(),
      capacidad: sala.obtenerCapacidad(),
    };

    return salaDTO;
  }
}