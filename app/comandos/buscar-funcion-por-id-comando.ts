import Funcion from "../dominio/funcion";
import RepositorioFuncion from "../dominio/puerto-repositorio-funcion";
import FuncionDTO from "../dtos/funcion-dto";
import IdDTO from "../dtos/id-dto";
import MapperFuncionDTOPuerto from "../mappers/mapper-funcion-dto-puerto";

export default class BuscarFuncionPorIdComando {
  constructor(
    private readonly repositorioFuncion: RepositorioFuncion,
    private readonly mapperFuncion: MapperFuncionDTOPuerto,
  ) {}

  public async ejecutar(idDTO: IdDTO): Promise<FuncionDTO> {
    const funcionRecuperada: Funcion = await this.repositorioFuncion.recuperar(idDTO.id);
    const funcionDTO: FuncionDTO = this.mapperFuncion.FuncionADTO(funcionRecuperada);
    return funcionDTO;
  }
}
