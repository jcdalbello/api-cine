import RepositorioSala from "../dominio/puerto-repositorio-sala";
import Sala from "../dominio/sala";

export default class RepositorioSalaPostgreSQL implements RepositorioSala {
  constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public guardar(sala: Sala): Sala {
    return new Sala(1, 50);
  }
}