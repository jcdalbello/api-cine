import RepositorioSala from "../dominio/puerto-repositorio-sala";
import IdDTO from "../dtos/id-dto";
import Sala from "../dominio/sala";
import SalaDTO from "../dtos/sala-dto";
import MapperSalaDTOPuerto from "../mappers/mapper-sala-dto-puerto";

export default class BuscarSalaPorIdComando {
  constructor(
    private readonly repositorioSala: RepositorioSala,
    private readonly salaMapper: MapperSalaDTOPuerto,
  ) {}

  public async ejecutar(idDTO: IdDTO): Promise<SalaDTO> {
    const salas: Sala = await this.repositorioSala.recuperar(idDTO.id);
    const salaDTO: SalaDTO = this.salaMapper.SalaADTO(salas);
    return salaDTO;
  }
}