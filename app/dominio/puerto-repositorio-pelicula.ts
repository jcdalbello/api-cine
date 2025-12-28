import Pelicula from "./pelicula";

export default interface RepositorioPelicula {
  guardar(pelicula: Pelicula): Promise<Pelicula>;
  listarPeliculas(): Promise<Pelicula[]>;
  recuperar(id: number): Promise<Pelicula>;
}
