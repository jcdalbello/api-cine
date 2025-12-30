import Sala from "../../app/dominio/sala";
import CampoIncorrectoSalaError from "../../app/errores/campo-incorrecto-sala-error";

describe("Sala", () => {
  const id: number = 1;
  const capacidad: number = 50;
  const sala: Sala = new Sala(id, capacidad);

  test("deberia crear un objeto Sala", () => {
    expect(sala).toBeInstanceOf(Sala);
  });

  test("deberia devolver sus datos correctamente", () => {
    expect(sala.obtenerId()).toEqual(id);
    expect(sala.obtenerCapacidad()).toEqual(capacidad);
  });

  test("deberia devolver un error CampoInvalidoDeSala al intentar crear una sala con una capacidad igual o menor a 0", () => {
    expect(() => {new Sala(id, 0)}).toThrow(CampoIncorrectoSalaError);
  });

  test("deberia devolver true con el metodo tieneIdAsignado() si la sala tiene un id diferente de 0", () => {
    expect(sala.tieneIdAsignado()).toEqual(true);
  });

  test("deberia devolver false con el metodo tieneIdAsignado() si la sala tiene un id igual a 0", () => {
    const salaSinIdAsignado: Sala = new Sala(0, capacidad);
    expect(salaSinIdAsignado.tieneIdAsignado()).toEqual(false);
  });
});
