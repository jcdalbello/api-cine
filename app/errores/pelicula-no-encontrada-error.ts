export default class PeliculaNoEncontradaError extends Error {
  constructor() {
    super();
    this.message = "no se encontró ninguna pelicula con el id indicado";
  }
}
