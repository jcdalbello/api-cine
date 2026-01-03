import { mock, Mock } from "ts-jest-mocker";
import BuscarFuncionPorIdComando from "../../app/comandos/buscar-funcion-por-id-comando";
import Funcion from "../../app/dominio/funcion";
import Pelicula from "../../app/dominio/pelicula";
import RepositorioFuncion from "../../app/dominio/puerto-repositorio-funcion";
import Sala from "../../app/dominio/sala";
import FuncionDTO from "../../app/dtos/funcion-dto";
import IdDTO from "../../app/dtos/id-dto";

describe("BuscarFuncionPorIdComando", () => {
  const mockRepositorioFuncion: Mock<RepositorioFuncion> = mock<RepositorioFuncion>();
  const buscarFuncionPorIdComando: BuscarFuncionPorIdComando = new BuscarFuncionPorIdComando(mockRepositorioFuncion);
  test("deberia crear un objeto BuscarFuncionPorIdComando", () => {
    expect(buscarFuncionPorIdComando).toBeInstanceOf(BuscarFuncionPorIdComando);
  });

  test("deberia devolver la funcion que corresponda con el id pasado si existe", async () => {
    const idFuncion: number = 1;
    
    const idSala: number = 1;
    const idPelicula: number = 1;
  
    const capacidadSala: number = 50;
    const tituloPelicula: string = "pelicula1";
    const generoPelicula: string = "genero1";

    const sala: Sala = new Sala(idSala, capacidadSala);
    const pelicula: Pelicula = new Pelicula(idPelicula, tituloPelicula, generoPelicula);
    const funcion: Funcion = new Funcion(idFuncion, sala, pelicula);

    mockRepositorioFuncion.recuperar.mockResolvedValue(funcion);
    
    const idDTO: IdDTO = {
      id: idFuncion,
    };

    // eslint-disable-next-line @typescript-eslint/await-thenable
    const funcionDTO: FuncionDTO = await buscarFuncionPorIdComando.ejecutar(idDTO);
    expect(funcionDTO.id).toEqual(idFuncion);
    expect(funcionDTO.sala).toEqual(sala);
    expect(funcionDTO.pelicula).toEqual(pelicula);
  });
});
