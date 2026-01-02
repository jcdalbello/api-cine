import BuscarFuncionesComando from "../../app/comandos/buscar-funciones-comando";
import ListaFuncionesDTO from "../../app/dtos/lista-funciones-dto";

describe("BuscarFuncionesComando", () => {
  const buscarFuncionesComando: BuscarFuncionesComando = new BuscarFuncionesComando();

  test("deberia crear un objeto BuscarFuncionesComando", () => {
    expect(buscarFuncionesComando).toBeInstanceOf(BuscarFuncionesComando);
  });

  test("deberia devolver una lista vacia si no hay funciones guardadas", () => {
    const funciones: ListaFuncionesDTO = buscarFuncionesComando.ejecutar({});
    expect(funciones.funciones.length).toEqual(0);
  });
});
