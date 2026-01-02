import Funcion from "../dominio/funcion";
import RepositorioFuncion from "../dominio/puerto-repositorio-funcion";
import FiltrosBusquedaFuncionesDTO from "../dtos/filtros-busqueda-funciones-dto";
import FuncionDTO from "../dtos/funcion-dto";
import ListaFuncionesDTO from "../dtos/lista-funciones-dto";
import PeliculaDTO from "../dtos/pelicula-dto";
import SalaDTO from "../dtos/sala-dto";

export default class BuscarFuncionesComando {
  constructor(
    private readonly repositorioFuncion: RepositorioFuncion,
  ) {}

  public async ejecutar(filtros: FiltrosBusquedaFuncionesDTO): Promise<ListaFuncionesDTO> {
    const funciones: Funcion[] = await this.repositorioFuncion.buscarFunciones(filtros.idSala);
    const funcionesDTOs: FuncionDTO[] = funciones.map((funcion: Funcion) => {
      const salaDTO: SalaDTO = {
        id: funcion.sala.obtenerId(),
        capacidad: funcion.sala.obtenerCapacidad(),
      };

      const peliculaDTO: PeliculaDTO = {
        id: funcion.pelicula.obtenerId(),
        titulo: funcion.pelicula.obtenerTitulo(),
        genero: funcion.pelicula.obtenerGenero(),
      };

      return {
        id: funcion.id,
        sala: salaDTO,
        pelicula: peliculaDTO,
      };
    });

    const listaFuncionesDTO: ListaFuncionesDTO = {
      funciones: funcionesDTOs,
    };

    return listaFuncionesDTO;
  }
}
