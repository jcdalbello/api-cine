import RepositorioSala from "../dominio/puerto-repositorio-sala";
import Sala from "../dominio/sala";

export default class AgregarSalaComando {
  constructor(
    private readonly repositorioSala: RepositorioSala,
  ) {}

  public ejecutar(capacidad: number): Sala {
    let sala: Sala;
    if (capacidad === 50) {
      sala = new Sala(1, capacidad);
    } else {
      sala = new Sala(2, capacidad);
    }

    this.repositorioSala.guardar(sala);
    return sala;
  }
}