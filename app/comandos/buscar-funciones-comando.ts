import FiltrosBusquedaFuncionesDTO from "../dtos/filtros-busqueda-funciones-dto";
import ListaFuncionesDTO from "../dtos/lista-funciones-dto";

export default class BuscarFuncionesComando {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ejecutar(filtros: FiltrosBusquedaFuncionesDTO): ListaFuncionesDTO {
    const funcioens: ListaFuncionesDTO = {
      funciones: [],
    };

    return funcioens;
  }
}
