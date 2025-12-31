import { mock, Mock } from "ts-jest-mocker";
import BuscarSalaPorIdComando from "../../app/comandos/buscar-sala-por-id-comando";
import RepositorioSala from "../../app/dominio/puerto-repositorio-sala";
import Sala from "../../app/dominio/sala";
import SalaNoEncontradaError from "../../app/errores/sala-no-encontrada-error";
import IdDTO from "../../app/dtos/id-dto";

describe("BuscarSalaPorIdComando", () => {
  const mockRepositorioSala: Mock<RepositorioSala> = mock<RepositorioSala>();
  const obtenerSalaPorIdComando: BuscarSalaPorIdComando = new BuscarSalaPorIdComando(mockRepositorioSala);
  test("deberia crear un objeto ObtenerSalaPorIdComando", () => {
    expect(obtenerSalaPorIdComando).toBeInstanceOf(BuscarSalaPorIdComando);
  });

  test("deberia devolver la sala con el id pasado por parametro", async () => {
    const id: number = 1;
    const capacidad: number = 50;
    const sala: Sala = new Sala(id, capacidad);

    mockRepositorioSala.recuperar.mockResolvedValue(sala);
    const idDTO: IdDTO = { id: id };

    const salaRecuperada: Sala = await obtenerSalaPorIdComando.ejecutar(idDTO);

    expect(salaRecuperada).toBeInstanceOf(Sala);
    expect(salaRecuperada.obtenerId()).toEqual(sala.obtenerId());
    expect(salaRecuperada.obtenerCapacidad()).toEqual(sala.obtenerCapacidad());
  });

  test("deberia devolver la sala correspondiente al id pasado por parametro con varias salas", async () => {
    const cantidadDeSalasAGenerar: number = 10;
    for (let i = 1; i <= cantidadDeSalasAGenerar; i++) {
      const idActual: number = i;
      const capacidadActual: number = i * 10;
      const salaActual: Sala = new Sala(idActual, capacidadActual);
      mockRepositorioSala.recuperar.mockResolvedValue(salaActual);
      const idDTO: IdDTO = { id: idActual };

      const salaRecuperada: Sala = await obtenerSalaPorIdComando.ejecutar(idDTO);

      expect(salaRecuperada).toBeInstanceOf(Sala);
      expect(salaRecuperada.obtenerId()).toEqual(salaActual.obtenerId());
      expect(salaRecuperada.obtenerCapacidad()).toEqual(salaActual.obtenerCapacidad());
    }
  });

  test("deberia devolver la un error SalaNoEncontradaError si no se encuentra ninguna sala con el id pasado por parametro", async () => {
    const idInexistente: number = 999;
    const idDTO: IdDTO = { id: idInexistente };
    mockRepositorioSala.recuperar.mockRejectedValue(new SalaNoEncontradaError());
    await expect(obtenerSalaPorIdComando.ejecutar(idDTO)).rejects.toThrow(SalaNoEncontradaError);
  });
});
