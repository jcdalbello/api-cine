import AgregarSalaComando from "../../app/comandos/agregar-sala-comando";
import RepositorioSala from "../../app/dominio/puerto-repositorio-sala";
import Sala from "../../app/dominio/sala";
import CampoIncorrectoSalaError from "../../app/errores/campo-incorrecto-sala-error";
import { Mock, mock } from "ts-jest-mocker";

let mockRepositorioSala: Mock<RepositorioSala>;
let agregarSalaComando: AgregarSalaComando;

describe("AgregarSalaComando", () => {
  mockRepositorioSala = mock<RepositorioSala>();
  agregarSalaComando = new AgregarSalaComando(mockRepositorioSala);

  const id: number = 1;
  const capacidad: number = 50;

  const mockSala: Sala = new Sala(id, capacidad);

  beforeEach(() => {
    jest.clearAllMocks();
    mockRepositorioSala.guardar.mockResolvedValue(mockSala);
  });

  test("deberia crear un objeto AgregarSalaComando", () => {
    expect(agregarSalaComando).toBeInstanceOf(AgregarSalaComando);
  });

  test("deberia crear correctamente una sala y devolver el resultado", async () => {
    const sala: Sala = await agregarSalaComando.ejecutar(capacidad);
    expect(sala.obtenerId()).toEqual(id);
    expect(sala.obtenerCapacidad()).toEqual(capacidad);
  });

  test("deberia crear correctamente mas de una sala y devolver el resultado de cada una", async () => {
    const sala: Sala = await agregarSalaComando.ejecutar(capacidad);
    expect(sala.obtenerId()).toEqual(id);
    expect(sala.obtenerCapacidad()).toEqual(capacidad);

    const id2: number = 2;
    const capacidad2: number = 100;
    const mockSala2: Sala = new Sala(id2, capacidad2);
    mockRepositorioSala.guardar.mockResolvedValue(mockSala2);
    const sala2: Sala = await agregarSalaComando.ejecutar(capacidad2);
    expect(sala2.obtenerId()).toEqual(id2);
    expect(sala2.obtenerCapacidad()).toEqual(capacidad2);
  });

  test("deberia devolver un error si la capacidad es igual o menor que 0", async() => {
    const capacidadIncorrecta: number = 0;
    await expect(agregarSalaComando.ejecutar(capacidadIncorrecta)).rejects.toThrow(CampoIncorrectoSalaError);
  });

  test("deberia llamar al repositorio de salas", async () => {
    await agregarSalaComando.ejecutar(capacidad);
    expect(mockRepositorioSala.guardar).toHaveBeenCalled();
  });
});
