import { Mock, mock } from "ts-jest-mocker";
import ObtenerSalasComando from "../../app/comandos/obtener-salas-comando";
import RepositorioSala from "../../app/dominio/puerto-repositorio-sala";
import Sala from "../../app/dominio/sala";

describe("ObtenerSalasComando", () => {
  const mockRepositorioSala: Mock<RepositorioSala> = mock<RepositorioSala>();
  const obtenerSalasComando: ObtenerSalasComando = new ObtenerSalasComando(mockRepositorioSala);
  test("deberia crear un objeto ObtenerSalasComando", () => {
    expect(obtenerSalasComando).toBeInstanceOf(ObtenerSalasComando);
  });

  test("deberia devolver una lista vacia cuando no hay salas guardadas", () => {
    mockRepositorioSala.listarSalas.mockReturnValue([]);
    const salas = obtenerSalasComando.ejectuar();
    expect(salas).toEqual([]);
  });

  test("deberia devolver una lista con una sola sala cuando hay una sola sala guardada", () => {
    const sala: Sala = new Sala(1, 50);
    mockRepositorioSala.listarSalas.mockReturnValue([sala]);
    const salas = obtenerSalasComando.ejectuar();
    expect(mockRepositorioSala.listarSalas).toHaveBeenCalled();
    expect(salas).toContain(sala);
  });
});
