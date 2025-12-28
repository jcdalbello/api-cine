export default class PeliculaNoEncontradaError extends Error {
  public readonly id: string;

  constructor() {
    super();
    this.id = "no se encontro ninguna pelicula con el id indicado";
  }
}
