import RepositorioSala from "../dominio/puerto-repositorio-sala";
import IdDTO from "../dtos/id-dto";
import Sala from "../dominio/sala";

export default class BuscarSalaPorIdComando {
  constructor(
    private readonly repositorioSala: RepositorioSala
  ) {}

  public ejecutar(idDTO: IdDTO): Promise<Sala> {
    return this.repositorioSala.recuperar(idDTO.id);
  }
}