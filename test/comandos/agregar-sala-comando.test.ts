import AgregarSalaComando from "../../app/comandos/agregar-sala-comando";

let agregarSalaComando: AgregarSalaComando;

describe("AgregarSalaComando", () => {
  agregarSalaComando = new AgregarSalaComando();

  test("deberia crear un objeto AgregarSalaComando", () => {
    expect(agregarSalaComando).toBeInstanceOf(AgregarSalaComando);
  });
});
