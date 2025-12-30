import RepositorioSala from "../dominio/puerto-repositorio-sala";
import Sala from "../dominio/sala";
import CampoIncorrectoSalaError from "../errores/campo-incorrecto-sala-error";
import MensajesDeErrorDeSala from "../errores/i-mensajes-de-error-de-sala";

export default class ObtenerSalasComando {
  constructor(
    private readonly repositorioSala: RepositorioSala,
  ) {}

  public async ejectuar(capacidad?: number): Promise<Sala[]> {
    if (capacidad !== undefined && capacidad <= 0) {
      const mensajes: MensajesDeErrorDeSala = { capacidad: "No se pueden buscar salas por capacidad menor a 0" };
      throw new CampoIncorrectoSalaError(mensajes);
    }

    return await this.repositorioSala.listarSalas(capacidad);
  }
}
