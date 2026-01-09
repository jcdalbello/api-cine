import Funcion from "../dominio/funcion";
import RepositorioFuncion from "../dominio/puerto-repositorio-funcion";
import FiltrosBusquedaFuncionesDTO from "../dtos/filtros-busqueda-funciones-dto";
import ListaFuncionesDTO from "../dtos/lista-funciones-dto";
import MapperFuncionDTOPuerto from "../mappers/mapper-funcion-dto-puerto";

export default class BuscarFuncionesComando {
  constructor(
    private readonly repositorioFuncion: RepositorioFuncion,
    private readonly mapperFuncion: MapperFuncionDTOPuerto,
  ) {}

  public async ejecutar(filtros: FiltrosBusquedaFuncionesDTO): Promise<ListaFuncionesDTO> {
    const funciones: Funcion[] = await this.repositorioFuncion.buscarFunciones(
      filtros.idSala,
      filtros.idPelicula,
    );
    const listaFuncionesDTO: ListaFuncionesDTO = this.mapperFuncion.ListaFuncionesADTO(funciones);
    return listaFuncionesDTO;
  }
}
