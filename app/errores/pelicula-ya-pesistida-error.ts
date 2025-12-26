export default class PeliculaYaPersistidaError extends Error {
  constructor() {
    super();
    this.message = "Las peliculas con id distinto de 0 indican que ya fueron persistidas";
  }
}
