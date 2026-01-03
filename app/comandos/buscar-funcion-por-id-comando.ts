import Funcion from "../dominio/funcion";
import Pelicula from "../dominio/pelicula";
import RepositorioFuncion from "../dominio/puerto-repositorio-funcion";
import Sala from "../dominio/sala";
import FuncionDTO from "../dtos/funcion-dto";
import IdDTO from "../dtos/id-dto";
import PeliculaDTO from "../dtos/pelicula-dto";
import SalaDTO from "../dtos/sala-dto";

export default class BuscarFuncionPorIdComando {
  constructor(
    private readonly repositorioFuncion: RepositorioFuncion,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async ejecutar(idDTO: IdDTO): Promise<FuncionDTO> {
    const funcionRecuperada: Funcion = await this.repositorioFuncion.recuperar(idDTO.id);
    const sala: Sala = funcionRecuperada.obtenerSala();
    const pelicula: Pelicula = funcionRecuperada.obtenerPelicula();

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
      id: funcionRecuperada.obtenerId(),
      sala: salaDTO,
      pelicula: peliculaDTO,
    };
    
    return funcionDTO;
  }
}