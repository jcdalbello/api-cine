import RepositorioSala from "../dominio/puerto-repositorio-sala";
import Sala from "../dominio/sala";

export default class AgregarSalaComando {
  constructor(
    private readonly repositorioSala: RepositorioSala,
  ) {}

  public ejecutar(capacidad: number): Sala {
    const sala: Sala = new Sala(0, capacidad);
    const salaGuardada: Sala = this.repositorioSala.guardar(sala);
    return salaGuardada;
  }
}