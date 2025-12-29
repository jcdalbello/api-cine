import Sala from "../../app/dominio/sala";

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
});
