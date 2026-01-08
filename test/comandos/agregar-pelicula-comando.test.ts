import AgregarPeliculaComando from "../../app/comandos/agregar-pelicula-comando";
import Pelicula from "../../app/dominio/pelicula";
import { Mock, mock } from "ts-jest-mocker";
import RepositorioPelicula from "../../app/dominio/puerto-repositorio-pelicula";
import CampoIncorrectoPeliculaError from "../../app/errores/campo-incorrecto-pelicula-error";
import CreacionPeliculaDTO from "../../app/dtos/creacion-pelicula-dto";
import PeliculaDTO from "../../app/dtos/pelicula-dto";

let mockRepositorioPelicula: Mock<RepositorioPelicula>;
let agregarPeliculaComando: AgregarPeliculaComando;

describe("AgregarPeliculaComando", () => {
  mockRepositorioPelicula = mock<RepositorioPelicula>();
  agregarPeliculaComando = new AgregarPeliculaComando(mockRepositorioPelicula);

  const id: number = 1;
  const titulo: string = "pelicula1";
  const genero: string = "genero1";
  const creacionPeliculaDTO: CreacionPeliculaDTO = {
    titulo: titulo,
    genero: genero,
  };
  const mockPelicula: Pelicula = new Pelicula(id, titulo, genero);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deberia crear un objeto AgregarPeliculaComando", () => {
    expect(agregarPeliculaComando).toBeInstanceOf(AgregarPeliculaComando);
  });

  test("deberia crear una pelicula con los datos correctos", async () => {
    mockRepositorioPelicula.guardar.mockResolvedValue(mockPelicula);
    const pelicula: PeliculaDTO = await agregarPeliculaComando.ejecutar(creacionPeliculaDTO);
    expect(pelicula.id).toEqual(id);
    expect(pelicula.titulo).toEqual(titulo);
    expect(pelicula.genero).toEqual(genero);
  });

  test("deberia crear dos peliculas con los datos correctos", async () => {
    mockRepositorioPelicula.guardar.mockResolvedValue(mockPelicula);
    const pelicula: PeliculaDTO = await agregarPeliculaComando.ejecutar(creacionPeliculaDTO);
    expect(pelicula.id).toEqual(id);
    expect(pelicula.titulo).toEqual(titulo);
    expect(pelicula.genero).toEqual(genero);

    const id2: number = 2;
    const titulo2: string = "pelicula2";
    const genero2: string = "genero2";
    mockRepositorioPelicula.guardar.mockResolvedValue(new Pelicula(id2, titulo2, genero2));
    const pelicula2: PeliculaDTO = await agregarPeliculaComando.ejecutar(creacionPeliculaDTO);
    expect(pelicula2.id).toEqual(id2);
    expect(pelicula2.titulo).toEqual(titulo2);
    expect(pelicula2.genero).toEqual(genero2);
  });

  test("deberia devolver un error al pasar un titulo demasiado largo", async () => {
    const longitudMaximaTitulo: number = 70;
    const tituloDemasiadoLargo: string = "a".repeat(longitudMaximaTitulo + 1);
    const creacionPeliculaDTOTituloDemasiadoLargo: CreacionPeliculaDTO = {
      ...creacionPeliculaDTO,
      titulo: tituloDemasiadoLargo,
    };
    await expect(agregarPeliculaComando.ejecutar(creacionPeliculaDTOTituloDemasiadoLargo)).rejects.toThrow(CampoIncorrectoPeliculaError);
  });
  
  test("deberia devolver un error al pasar un genero demasiado largo", async () => {
    const longitudMaximaGenero: number = 70;
    const generoDemasiadoLargo: string = "a".repeat(longitudMaximaGenero + 1);
    const creacionPeliculaDTOTituloDemasiadoLargo: CreacionPeliculaDTO = {
      ...creacionPeliculaDTO,
      genero: generoDemasiadoLargo,
    };
    await expect(agregarPeliculaComando.ejecutar(creacionPeliculaDTOTituloDemasiadoLargo)).rejects.toThrow(CampoIncorrectoPeliculaError);
  });
});
