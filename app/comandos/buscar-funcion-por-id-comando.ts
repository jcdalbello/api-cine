import RepositorioFuncion from "../dominio/puerto-repositorio-funcion";
import FuncionDTO from "../dtos/funcion-dto";
import IdDTO from "../dtos/id-dto";
import PeliculaDTO from "../dtos/pelicula-dto";
import SalaDTO from "../dtos/sala-dto";

export default class BuscarFuncionPorIdComando {
  constructor(
    private readonly repositorioFuncion: RepositorioFuncion,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ejecutar(idDTO: IdDTO): FuncionDTO {
    const idFuncion: number = 1;
    
    const idSala: number = 1;
    const idPelicula: number = 1;
  
    const capacidadSala: number = 50;
    const tituloPelicula: string = "pelicula1";
    const generoPelicula: string = "genero1";

    const salaDTO: SalaDTO = {
      id: idSala,
      capacidad: capacidadSala,
    };
    
    const peliculaDTO: PeliculaDTO = {
      id: idPelicula,
      titulo: tituloPelicula,
      genero: generoPelicula,
    };

    const funcionDTO: FuncionDTO = {
      id: idFuncion,
      sala: salaDTO,
      pelicula: peliculaDTO,
    };
    
    return funcionDTO;
  }
}