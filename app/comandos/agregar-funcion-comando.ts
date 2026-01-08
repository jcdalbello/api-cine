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

export default class AgregarFuncionComando {
  constructor(
    private readonly repositorioSala: RepositorioSala,
    private readonly repositorioPelicula: RepositorioPelicula,
    private readonly repositorioFuncion: RepositorioFuncion,
    private readonly mapperSala: MapperSalaDTOPuerto,
    private readonly mapperPelicula: MapperPeliculaDTOPuerto,
  ) {}

  public async ejecutar(creacionFuncionDTO: CreacionFuncionDTO): Promise<FuncionDTO> {
    const sala: Sala = await this.repositorioSala.recuperar(creacionFuncionDTO.idSala);
    const pelicula: Pelicula = await this.repositorioPelicula.recuperar(creacionFuncionDTO.idPelicula);
    const salaDTO: SalaDTO = this.mapperSala.SalaADTO(sala);

    /*
    const peliculaDTO: PeliculaDTO = {
      id: pelicula.obtenerId(),
      titulo: pelicula.obtenerTitulo(),
      genero: pelicula.obtenerGenero(),
    };
    */
    const peliculaDTO: PeliculaDTO = this.mapperPelicula.PeliculaADTO(pelicula);

    const funcion: Funcion = await this.repositorioFuncion.guardar(new Funcion(0, sala, pelicula));
  
    const funcionDTO: FuncionDTO = {
      id: funcion.obtenerId(),
      sala: salaDTO,
      pelicula: peliculaDTO,
    };

    return funcionDTO;
  }
}
