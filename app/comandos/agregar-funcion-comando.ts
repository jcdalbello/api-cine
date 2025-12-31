import RepositorioPelicula from "../dominio/puerto-repositorio-pelicula";
import RepositorioSala from "../dominio/puerto-repositorio-sala";
import RepositorioFuncion from "../dominio/purto-repositorio-funcion";
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ejecutar(creacionFuncionDTO: CreacionFuncionDTO): FuncionDTO {
    const idFuncion: number = 1;
      
    const salaDTO: SalaDTO = {
      id: 1,
      capacidad: 50,
    };
  
    const peliculaDTO: PeliculaDTO = {
      id: 1,
      titulo: "pelicula1",
      genero: "genero1",
    };
  
    const funcionDTO: FuncionDTO = {
      id: idFuncion,
      sala: salaDTO,
      pelicula: peliculaDTO,
    };

    return funcionDTO;
  }
}
