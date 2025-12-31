import AgregarFuncionComando from "../../app/comandos/agregar-funcion-comando";

describe("AgregarFuncionComando", () => {
  const agregarFuncionComando: AgregarFuncionComando = new AgregarFuncionComando();

  test("deberia crear un objeto AgregarFuncionComando", () => {
    expect(agregarFuncionComando).toBeInstanceOf(AgregarFuncionComando);
  });
});
