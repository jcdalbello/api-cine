import RepositorioSala from "../dominio/puerto-repositorio-sala";
import CreacionSalaDTO from "../dtos/creacion-sala-dto";
import Sala from "../dominio/sala";

export default class AgregarSalaComando {
  constructor(
    private readonly repositorioSala: RepositorioSala,
  ) {}

  public async ejecutar(creacionSalaDTO: CreacionSalaDTO): Promise<Sala> {
    const salaSinGuardar: Sala = new Sala(0, creacionSalaDTO.capacidad);
    const salaGuardada: Sala = await this.repositorioSala.guardar(salaSinGuardar);
    return salaGuardada;
  }
}