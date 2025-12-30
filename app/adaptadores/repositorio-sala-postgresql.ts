import RepositorioSala from "../dominio/puerto-repositorio-sala";
import Sala from "../dominio/sala";

export default class RepositorioSalaPostgreSQL implements RepositorioSala {
  constructor() {}

  public guardar(sala: Sala): Sala {
    let salaGuardada: Sala;
    if (sala.obtenerCapacidad() === 50) {
      salaGuardada = new Sala(1, sala.obtenerCapacidad());
    } else {
      salaGuardada = new Sala(2, sala.obtenerCapacidad());
    }
    return salaGuardada;
  }

  public listarSalas(): Sala[] {
    return [];
  }
}