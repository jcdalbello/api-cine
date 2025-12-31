import Pelicula from "../dominio/pelicula";
import RepositorioPelicula from "../dominio/puerto-repositorio-pelicula";
import RepositorioSala from "../dominio/puerto-repositorio-sala";
import RepositorioFuncion from "../dominio/puerto-repositorio-funcion";
import Sala from "../dominio/sala";
import CreacionFuncionDTO from "../dtos/creacion-funcion-dto";
import FuncionDTO from "../dtos/funcion-dto";
import PeliculaDTO from "../dtos/pelicula-dto";
import SalaDTO from "../dtos/sala-dto";

export default class AgregarFuncionComando {
  constructor(
    private readonly repositorioSala: RepositorioSala,
    private readonly repositorioPelicula: RepositorioPelicula,
    private readonly repositorioFuncion: RepositorioFuncion
  ) {}

  public async ejecutar(creacionFuncionDTO: CreacionFuncionDTO): Promise<FuncionDTO> {
    const idFuncion: number = 1;

    const sala: Sala = await this.repositorioSala.recuperar(creacionFuncionDTO.idSala);
    const pelicula: Pelicula = await this.repositorioPelicula.recuperar(creacionFuncionDTO.idPelicula);

    const salaDTO: SalaDTO = {
      id: sala.obtenerId(),
      capacidad: sala.obtenerCapacidad(),
    };

    const peliculaDTO: PeliculaDTO = {
      id: pelicula.obtenerId(),
      titulo: pelicula.obtenerTitulo(),
      genero: pelicula.obtenerGenero(),
    };
  
    const funcionDTO: FuncionDTO = {
      id: idFuncion,
      sala: salaDTO,
      pelicula: peliculaDTO,
    };

    return funcionDTO;
  }
}
