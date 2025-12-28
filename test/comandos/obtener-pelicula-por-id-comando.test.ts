import ObtenerPeliculaPorIdComando from "../../app/comandos/obtener-pelicula-por-id-comando";

let obtenerPeliculaPorIdComando: ObtenerPeliculaPorIdComando;

describe("ObtenerPeliculaPorIdComando", () => {
  obtenerPeliculaPorIdComando = new ObtenerPeliculaPorIdComando();

  test("debe crear un objeto ObtenerPeliculaPorIdComando", () => {
    expect(obtenerPeliculaPorIdComando).toBeInstanceOf(ObtenerPeliculaPorIdComando);
  });
});
