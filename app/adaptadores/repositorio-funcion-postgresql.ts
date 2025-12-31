import Funcion from "../dominio/funcion";
import RepositorioFuncion from "../dominio/puerto-repositorio-funcion";

export default class RepositorioFuncionPostgresql implements RepositorioFuncion {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async guardar(funcion: Funcion): Promise<Funcion> {
    return funcion;
  }
}
