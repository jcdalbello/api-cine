import RepositorioSala from "../dominio/puerto-repositorio-sala";
import CreacionSalaDTO from "../dtos/creacion-sala-dto";
import SalaDTO from "../dtos/sala-dto";
import Sala from "../dominio/sala";
import MapperSalaDTOPuerto from "../mappers/mapper-sala-dto-puerto";

export default class AgregarSalaComando {
  constructor(
    private readonly repositorioSala: RepositorioSala,
    private readonly salaMapper: MapperSalaDTOPuerto,
  ) {}

  public async ejecutar(creacionSalaDTO: CreacionSalaDTO): Promise<SalaDTO> {
    const salaSinGuardar: Sala = this.salaMapper.DTOASalaParaGuardar(creacionSalaDTO);
    const salaGuardada: Sala = await this.repositorioSala.guardar(salaSinGuardar);
    const salaDTO: SalaDTO = this.salaMapper.SalaADTO(salaGuardada);
    return salaDTO;
  }
}