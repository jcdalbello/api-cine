import RepositorioSala from "../dominio/puerto-repositorio-sala";
import Sala from "../dominio/sala";

export default class BuscarSalaPorIdComando {
  constructor(
    private readonly repositorioSala: RepositorioSala
  ) {}

  public ejecutar(id: number): Promise<Sala> {
    return this.repositorioSala.recuperar(id);
  }
}