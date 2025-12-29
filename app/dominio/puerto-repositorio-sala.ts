import Sala from "./sala";

export default interface RepositorioSala {
  guardar(sala: Sala): Sala;
}
