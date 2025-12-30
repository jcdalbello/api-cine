import ObtenerSalasComando from "../../app/comandos/obtener-salas-comando";

describe("ObtenerSalasComando", () => {
  const obtenerSalasComando: ObtenerSalasComando = new ObtenerSalasComando();
  test("deberia crear un objeto ObtenerSalasComando", () => {
    expect(obtenerSalasComando).toBeInstanceOf(ObtenerSalasComando);
  });
});
