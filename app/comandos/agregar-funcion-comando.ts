import CreacionFuncionDTO from "../dtos/creacion-funcion-dto";
import FuncionDTO from "../dtos/funcion-dto";
import PeliculaDTO from "../dtos/pelicula-dto";
import SalaDTO from "../dtos/sala-dto";

export default class AgregarFuncionComando {
  constructor() {}

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
