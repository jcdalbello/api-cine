import RepositorioSala from "../dominio/puerto-repositorio-sala";
import CreacionSalaDTO from "../dtos/creacion-sala-dto";
import SalaDTO from "../dtos/sala-dto";
import Sala from "../dominio/sala";
import SalaMapper from "../mappers/sala-mapper";

export default class AgregarSalaComando {
  constructor(
    private readonly repositorioSala: RepositorioSala,
  ) {}

  public async ejecutar(creacionSalaDTO: CreacionSalaDTO): Promise<SalaDTO> {
    const salaMapper: SalaMapper = new SalaMapper();
    const salaSinGuardar: Sala = salaMapper.DTOASalaParaGuardar(creacionSalaDTO);
    const salaGuardada: Sala = await this.repositorioSala.guardar(salaSinGuardar);
    const salaDTO: SalaDTO = {
      id: salaGuardada.obtenerId(),
      capacidad: salaGuardada.obtenerCapacidad(),
    };
    return salaDTO;
  }
}