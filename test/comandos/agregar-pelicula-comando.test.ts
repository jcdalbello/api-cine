import AgregarPeliculaComando from "../../app/comandos/agregar-pelicula-comando";
import Pelicula from "../../app/dominio/pelicula";
import { Mock, mock } from "ts-jest-mocker";
import RepositorioPelicula from "../../app/dominio/puerto-repositorio-pelicula";

let mockRepositorioPelicula: Mock<RepositorioPelicula>;
let agregarPeliculaComando: AgregarPeliculaComando;

describe("AgregarPeliculaComando", () => {
  mockRepositorioPelicula = mock<RepositorioPelicula>();
  agregarPeliculaComando = new AgregarPeliculaComando(mockRepositorioPelicula);

  const id: number = 1;
  const titulo: string = "pelicula1";
  const genero: string = "genero1";

  test("deberia crear un objeto AgregarPeliculaComando", () => {
    expect(agregarPeliculaComando).toBeInstanceOf(AgregarPeliculaComando);
  });

  test("deberia crear una pelicula con los datos correctos", async () => {
    mockRepositorioPelicula.guardar.mockResolvedValue(new Pelicula(id, titulo, genero));
    const pelicula: Pelicula = await agregarPeliculaComando.ejecutar(titulo, genero);
    expect(pelicula.obtenerId()).toEqual(id);
    expect(pelicula.obtenerTitulo()).toEqual(titulo);
    expect(pelicula.obtenerGenero()).toEqual(genero);
  });

  test("deberia crear dos peliculas con los datos correctos", async () => {
    mockRepositorioPelicula.guardar.mockResolvedValue(new Pelicula(id, titulo, genero));
    const pelicula: Pelicula = await agregarPeliculaComando.ejecutar(titulo, genero);
    expect(pelicula.obtenerId()).toEqual(id);
    expect(pelicula.obtenerTitulo()).toEqual(titulo);
    expect(pelicula.obtenerGenero()).toEqual(genero);

    const id2: number = 2;
    const titulo2: string = "pelicula2";
    const genero2: string = "genero2";
    mockRepositorioPelicula.guardar.mockResolvedValue(new Pelicula(id2, titulo2, genero2));
    const pelicula2: Pelicula = await agregarPeliculaComando.ejecutar(titulo2, genero2);
    expect(pelicula2.obtenerId()).toEqual(id2);
    expect(pelicula2.obtenerTitulo()).toEqual(titulo2);
    expect(pelicula2.obtenerGenero()).toEqual(genero2);
  });
});
