import { sumar } from "../app/sumar";

describe("sumar", () => {
  test("debe sumar dos numeros y devolver el resultado", () => {
    expect(sumar(1, 2)).toEqual(3);
  });
});
