import CampoIncorrectoPeliculaError from "../errores/campo-incorrecto-pelicula-error";

const LONGITUD_MINIMA_CARACTERES: number = 1;

export default class Pelicula {
  private id: string;
  private titulo: string;
  private genero: string;

  constructor(
    id: string,
    titulo: string,
    genero: string
  ) {
    this.establecerId(id);
    this.titulo = titulo;
    this.genero = genero;
  }

  public obtenerId(): string {
    return this.id;
  }

  public obtenerTitulo(): string {
    return this.titulo;
  }

  public obtenerGenero(): string {
    return this.genero;
  }

  public establecerId(id: string): void {
    if (id.length < LONGITUD_MINIMA_CARACTERES) {
      throw new CampoIncorrectoPeliculaError({
        id: "El id no puede estar vacio",
      });
    }

    this.id = id;
  }
}