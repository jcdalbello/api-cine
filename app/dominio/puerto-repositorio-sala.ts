import Sala from "./sala";

export default interface RepositorioSala {
  guardar(sala: Sala): Promise<Sala>;
  listarSalas(capacidad?: number): Promise<Sala[]>;
  recuperar(id: number): Promise<Sala>;
}
