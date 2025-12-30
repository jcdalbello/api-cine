import RepositorioSala from "../dominio/puerto-repositorio-sala";
import Sala from "../dominio/sala";

export default class ObtenerSalasComando {
  constructor(
    private readonly repositorioSala: RepositorioSala,
  ) {}

  public async ejectuar(capacidad?: number): Promise<Sala[]> {
    return await this.repositorioSala.listarSalas(capacidad);
  }
}
