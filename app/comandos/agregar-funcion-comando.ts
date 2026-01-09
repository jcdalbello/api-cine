import Pelicula from "../dominio/pelicula";
import RepositorioPelicula from "../dominio/puerto-repositorio-pelicula";
import RepositorioSala from "../dominio/puerto-repositorio-sala";
import RepositorioFuncion from "../dominio/puerto-repositorio-funcion";
import Sala from "../dominio/sala";
import CreacionFuncionDTO from "../dtos/creacion-funcion-dto";
import FuncionDTO from "../dtos/funcion-dto";
import PeliculaDTO from "../dtos/pelicula-dto";
import SalaDTO from "../dtos/sala-dto";
import Funcion from "../dominio/funcion";
import MapperSalaDTOPuerto from "../mappers/mapper-sala-dto-puerto";
import MapperPeliculaDTOPuerto from "../mappers/mapper-pelicula-dto-puerto";
import MapperFuncionDTOPuerto from "../mappers/mapper-funcion-dto-puerto";

export default class AgregarFuncionComando {
  constructor(
    private readonly repositorioSala: RepositorioSala,
    private readonly repositorioPelicula: RepositorioPelicula,
    private readonly repositorioFuncion: RepositorioFuncion,
    private readonly mapperSala: MapperSalaDTOPuerto,
    private readonly mapperPelicula: MapperPeliculaDTOPuerto,
    private readonly mapperFuncion: MapperFuncionDTOPuerto,
  ) {}

  public async ejecutar(creacionFuncionDTO: CreacionFuncionDTO): Promise<FuncionDTO> {
    const sala: Sala = await this.repositorioSala.recuperar(creacionFuncionDTO.idSala);
    const pelicula: Pelicula = await this.repositorioPelicula.recuperar(creacionFuncionDTO.idPelicula);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const salaDTO: SalaDTO = this.mapperSala.SalaADTO(sala);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const peliculaDTO: PeliculaDTO = this.mapperPelicula.PeliculaADTO(pelicula);

    const funcion: Funcion = await this.repositorioFuncion.guardar(new Funcion(0, sala, pelicula));
  
    const funcionDTO: FuncionDTO = this.mapperFuncion.FuncionADTO(funcion);

    return funcionDTO;
  }
}
