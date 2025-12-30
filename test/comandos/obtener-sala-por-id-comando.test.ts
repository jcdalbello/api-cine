import ObtenerSalaPorIdComando from "../../app/comandos/obtener-sala-por-id-comando";
import Sala from "../../app/dominio/sala";

describe("ObtenerSalaPorIdComando", () => {
  const obtenerSalaPorIdComando: ObtenerSalaPorIdComando = new ObtenerSalaPorIdComando();
  test("deberia crear un objeto ObtenerSalaPorIdComando", () => {
    expect(obtenerSalaPorIdComando).toBeInstanceOf(ObtenerSalaPorIdComando);
  });

  test("deberia devolver la sala con el id pasado por parametro", () => {
    const id: number = 1;
    const capacidad: number = 50;
    const sala: Sala = new Sala(id, capacidad);

    const salaRecuperada: Sala = obtenerSalaPorIdComando.ejecutar(id);

    expect(salaRecuperada).toBeInstanceOf(Sala);
    expect(salaRecuperada.obtenerId()).toEqual(sala.obtenerId());
    expect(salaRecuperada.obtenerCapacidad()).toEqual(sala.obtenerCapacidad());
  });
});
