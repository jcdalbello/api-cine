import { Mock, mock } from "ts-jest-mocker";
import BuscarSalasComando from "../../app/comandos/buscar-salas-comando";
import RepositorioSala from "../../app/dominio/puerto-repositorio-sala";
import Sala from "../../app/dominio/sala";
import CampoIncorrectoSalaError from "../../app/errores/campo-incorrecto-sala-error";

describe("BuscarSalasComando", () => {
  const mockRepositorioSala: Mock<RepositorioSala> = mock<RepositorioSala>();
  const obtenerSalasComando: BuscarSalasComando = new BuscarSalasComando(mockRepositorioSala);
  test("deberia crear un objeto ObtenerSalasComando", () => {
    expect(obtenerSalasComando).toBeInstanceOf(BuscarSalasComando);
  });

  test("deberia devolver una lista vacia cuando no hay salas guardadas", async () => {
    mockRepositorioSala.listarSalas.mockResolvedValue([]);
    const salas: Sala[] = await obtenerSalasComando.ejectuar();
    expect(salas).toEqual([]);
  });

  test("deberia devolver una lista con una sola sala cuando hay una sola sala guardada", async () => {
    const sala: Sala = new Sala(1, 50);
    mockRepositorioSala.listarSalas.mockResolvedValue([sala]);
    const salas: Sala[] = await obtenerSalasComando.ejectuar();
    expect(mockRepositorioSala.listarSalas).toHaveBeenCalled();
    expect(salas).toContain(sala);
  });

  test("deberia devolver una lista con todas las salas guardadas", async () => {
    const sala1: Sala = new Sala(1, 50);
    const sala2: Sala = new Sala(2, 100);
    const sala3: Sala = new Sala(3, 150);
    mockRepositorioSala.listarSalas.mockResolvedValue([sala1, sala2, sala3]);
    const salas: Sala[] = await obtenerSalasComando.ejectuar();
    expect(mockRepositorioSala.listarSalas).toHaveBeenCalled();
    expect(salas).toContain(sala1);
    expect(salas).toContain(sala2);
    expect(salas).toContain(sala3);
  });

  test("deberia devolver una lista con todas las salas que tengan una capacidad mayor o igual a la pasada por parametro", async () => {
    const capacidadMinima: number = 50;
    mockRepositorioSala.listarSalas.mockResolvedValue([]);
    const sala1: Sala = new Sala(1, capacidadMinima - 1);
    const sala2: Sala = new Sala(2, capacidadMinima);
    const sala3: Sala = new Sala(3, capacidadMinima + 1);
    mockRepositorioSala.listarSalas.mockResolvedValue([sala2, sala3]);
    const salas: Sala[] = await obtenerSalasComando.ejectuar(capacidadMinima);
    expect(mockRepositorioSala.listarSalas).toHaveBeenCalled();
    expect(salas).toContainEqual(sala2);
    expect(salas).toContainEqual(sala3);
    expect(salas).not.toContainEqual(sala1);
  });

  test("deberia devolver un error CampoIncorrectoSalaError si la capacidad pasada por parametro es menor o igual a 0", async () => {
    const capacidadInvalida: number = 0;
    await expect(obtenerSalasComando.ejectuar(capacidadInvalida)).rejects.toThrow(CampoIncorrectoSalaError);
  });
});
