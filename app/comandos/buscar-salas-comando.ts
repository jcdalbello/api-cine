import RepositorioSala from "../dominio/puerto-repositorio-sala";
import Sala from "../dominio/sala";
import CampoIncorrectoSalaError from "../errores/campo-incorrecto-sala-error";
import MensajesDeErrorDeSala from "../errores/i-mensajes-de-error-de-sala";
import FiltrosBusquedaSalasDTO from "../dtos/filtros-busqueda-salas-dto";
import ListaSalasDTO from "../dtos/lista-salas-dto";
import MapperSalaDTOPuerto from "../mappers/mapper-sala-dto-puerto";

export default class BuscarSalasComando {
  constructor(
    private readonly repositorioSala: RepositorioSala,
    private readonly salaMapper: MapperSalaDTOPuerto,
  ) {}

  public async ejectuar(filtros: FiltrosBusquedaSalasDTO): Promise<ListaSalasDTO> {
    if (filtros.capacidad !== undefined && filtros.capacidad <= 0) {
      const mensajes: MensajesDeErrorDeSala = { capacidad: "No se pueden buscar salas por capacidad menor a 0" };
      throw new CampoIncorrectoSalaError(mensajes);
    }

    const salas: Sala[] = await this.repositorioSala.listarSalas(filtros.capacidad);

    /*
    const salasComoDTOs: SalaDTO[] = salas.map((sala: Sala) => {
      return {
        id: sala.obtenerId(),
        capacidad: sala.obtenerCapacidad(),
      };
    });

    const listaSalasDTO: ListaSalasDTO = { salas: salasComoDTOs };
    */
    const listaSalasDTO: ListaSalasDTO = this.salaMapper.listaSalasADTO(salas);

    return listaSalasDTO;
  }
}
