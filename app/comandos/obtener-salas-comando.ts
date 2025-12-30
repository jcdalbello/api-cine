import RepositorioSala from "../dominio/puerto-repositorio-sala";
import Sala from "../dominio/sala";

export default class ObtenerSalasComando {
  constructor(
    private readonly repositorioSala: RepositorioSala,
  ) {}

  public ejectuar(): Sala[] {
    return this.repositorioSala.listarSalas();
  }
}
