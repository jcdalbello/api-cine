import { mock, Mock } from "ts-jest-mocker";
import ObtenerSalaPorIdComando from "../../app/comandos/obtener-sala-por-id-comando";
import RepositorioSala from "../../app/dominio/puerto-repositorio-sala";
import Sala from "../../app/dominio/sala";

describe("ObtenerSalaPorIdComando", () => {
  const mockRepositorioSala: Mock<RepositorioSala> = mock<RepositorioSala>();
  const obtenerSalaPorIdComando: ObtenerSalaPorIdComando = new ObtenerSalaPorIdComando(mockRepositorioSala);
  test("deberia crear un objeto ObtenerSalaPorIdComando", () => {
    expect(obtenerSalaPorIdComando).toBeInstanceOf(ObtenerSalaPorIdComando);
  });

  test("deberia devolver la sala con el id pasado por parametro", async () => {
    const id: number = 1;
    const capacidad: number = 50;
    const sala: Sala = new Sala(id, capacidad);

    mockRepositorioSala.recuperar.mockResolvedValue(sala);
    const salaRecuperada: Sala = await obtenerSalaPorIdComando.ejecutar(id);

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
        const salaRecuperada: Sala = await obtenerSalaPorIdComando.ejecutar(idActual);

        expect(salaRecuperada).toBeInstanceOf(Sala);
        expect(salaRecuperada.obtenerId()).toEqual(salaActual.obtenerId());
        expect(salaRecuperada.obtenerCapacidad()).toEqual(salaActual.obtenerCapacidad());
      }
    });
});
