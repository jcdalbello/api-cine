import RepositorioSala from "../dominio/puerto-repositorio-sala";
import IdDTO from "../dtos/id-dto";
import Sala from "../dominio/sala";
import SalaDTO from "../dtos/sala-dto";

export default class BuscarSalaPorIdComando {
  constructor(
    private readonly repositorioSala: RepositorioSala
  ) {}

  public async ejecutar(idDTO: IdDTO): Promise<SalaDTO> {
    const salas: Sala = await this.repositorioSala.recuperar(idDTO.id);
    const salaDTO: SalaDTO = {
      id: salas.obtenerId(),
      capacidad: salas.obtenerCapacidad(),
    };

    return salaDTO;
  }
}