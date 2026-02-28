import Pelicula from "./pelicula";

export default interface RepositorioPelicula {
  guardar(pelicula: Pelicula): Promise<Pelicula>;
  listarPeliculas(titulo?: string, genero?: string): Promise<Pelicula[]>;
  recuperar(id: number): Promise<Pelicula>;
  eliminar(id: number): Promise<void>;
}
