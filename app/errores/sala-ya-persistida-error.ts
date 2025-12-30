export default class SalaYaPersistidaError extends Error {
  constructor() {
    super();
    this.message = "Las salas con id distinto de 0 indican que ya fueron persistidas";
  }
}
