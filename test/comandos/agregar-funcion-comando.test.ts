import { mock, Mock } from "ts-jest-mocker";
import AgregarFuncionComando from "../../app/comandos/agregar-funcion-comando";
import RepositorioSala from "../../app/dominio/puerto-repositorio-sala";
import RepositorioFuncion from "../../app/dominio/purto-repositorio-funcion";
import RepositorioPelicula from "../../app/dominio/puerto-repositorio-pelicula";
import Sala from "../../app/dominio/sala";
import Pelicula from "../../app/dominio/pelicula";
import Funcion from "../../app/dominio/funcion";
import FuncionDTO from "../../app/dtos/funcion-dto";
import CreacionFuncionDTO from "../../app/dtos/creacion-funcion-dto";

describe("AgregarFuncionComando", () => {
  const mockRepositorioSala: Mock<RepositorioSala> = mock<RepositorioSala>();
  const mockRepositorioPelicula: Mock<RepositorioPelicula> = mock<RepositorioPelicula>();
  const mockRepositorioFuncion: Mock<RepositorioFuncion> = mock<RepositorioFuncion>();
  const agregarFuncionComando: AgregarFuncionComando = new AgregarFuncionComando(
    mockRepositorioSala,
    mockRepositorioPelicula,
    mockRepositorioFuncion
  );

  test("deberia crear un objeto AgregarFuncionComando", () => {
    expect(agregarFuncionComando).toBeInstanceOf(AgregarFuncionComando);
  });

  test("deberia crear una funcion con los datos correctos", async () => {
    const idSala: number = 1;
    const capacidadSala: number = 50;
    const mockSala: Sala = new Sala(idSala, capacidadSala);

    const idPelicula: number = 1;
    const tituloPelicula: string = "pelicula1";
    const generoPelicula: string = "genero1";
    const mockPelicula: Pelicula = new Pelicula(idPelicula, tituloPelicula, generoPelicula);
    
    const idFuncion: number = 1;
    const mockFuncion: Funcion = new Funcion(idFuncion, mockSala, mockPelicula);

    mockRepositorioSala.recuperar.mockResolvedValue(mockSala);
    mockRepositorioPelicula.recuperar.mockResolvedValue(mockPelicula);
    mockRepositorioFuncion.guardar.mockResolvedValue(mockFuncion);

    const creacionFuncionDTO: CreacionFuncionDTO = {
      idSala: idSala,
      idPelicula: idPelicula,
    };
    
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const funcionDTO: FuncionDTO = await agregarFuncionComando.ejecutar(creacionFuncionDTO);

    expect(funcionDTO.id).toEqual(idFuncion);
    expect(funcionDTO.sala).toEqual(mockSala);
    expect(funcionDTO.pelicula).toEqual(mockPelicula);
  });
});
