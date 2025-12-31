import BuscarFuncionesComando from "../../app/comandos/buscar-funciones-comando";

describe("BuscarFuncionesComando", () => {
  const buscarFuncionesComando: BuscarFuncionesComando = new BuscarFuncionesComando();

  test("deberia crear un objeto BuscarFuncionesComando", () => {
    expect(buscarFuncionesComando).toBeInstanceOf(BuscarFuncionesComando);
  });
});
