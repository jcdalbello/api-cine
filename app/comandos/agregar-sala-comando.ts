import RepositorioSala from "../dominio/puerto-repositorio-sala";
import Sala from "../dominio/sala";

export default class AgregarSalaComando {
  constructor(
    private readonly repositorioSala: RepositorioSala,
  ) {}

  public async ejecutar(capacidad: number): Promise<Sala> {
    const salaSinGuardar: Sala = new Sala(0, capacidad);
    const salaGuardada: Sala = await this.repositorioSala.guardar(salaSinGuardar);
    return salaGuardada;
  }
}