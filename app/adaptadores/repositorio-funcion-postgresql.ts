import Funcion from "../dominio/funcion";
import RepositorioFuncion from "../dominio/puerto-repositorio-funcion";

export default class RepositorioFuncionPostgreSQL implements RepositorioFuncion {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async guardar(funcion: Funcion): Promise<Funcion> {
    const funcionGuardada: Funcion = new Funcion(1, funcion.obtenerSala(), funcion.obtenerPelicula());
    return funcionGuardada;
  }
}
