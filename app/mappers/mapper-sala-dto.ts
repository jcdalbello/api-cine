import Sala from "../dominio/sala";
import CreacionSalaDTO from "../dtos/creacion-sala-dto";
import ListaSalasDTO from "../dtos/lista-salas-dto";
import SalaDTO from "../dtos/sala-dto";
import MapperSalaDTOPuerto from "./mapper-sala-dto-puerto";

export default class MapperSalaDTO implements MapperSalaDTOPuerto {
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

  public listaSalasADTO(salas: Sala[]): ListaSalasDTO {
    const salasComoDTOs: SalaDTO[] = salas.map((sala: Sala) => {
      return {
        id: sala.obtenerId(),
        capacidad: sala.obtenerCapacidad(),
      };
    });

    const listaSalasDTO: ListaSalasDTO = { salas: salasComoDTOs };
    
    return listaSalasDTO;
  }
}