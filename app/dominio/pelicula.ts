import CampoIncorrectoPeliculaError from "../errores/campo-incorrecto-pelicula-error";

const LONGITUD_MINIMA_CARACTERES: number = 1;
const LONGITUD_MAXIMA_CARACTERES: number = 70;

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
    this.establecerTitulo(titulo);
    this.establecerGenero(genero);
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

  public establecerTitulo(titulo: string): void {
    if (titulo.length < LONGITUD_MINIMA_CARACTERES) {
      throw new CampoIncorrectoPeliculaError({
        titulo: "El titulo no puede estar vacio",
      });
    }

    if (titulo.length > LONGITUD_MAXIMA_CARACTERES) {
      throw new CampoIncorrectoPeliculaError({
        titulo: "El titulo no puede superar el limite de caracteres",
      });
    }

    this.titulo = titulo;
  }

  public establecerGenero(genero: string): void {
    if (genero.length < LONGITUD_MINIMA_CARACTERES) {
      throw new CampoIncorrectoPeliculaError({
        genero: "El genero no puede estar vacio",
      });
    }

    this.genero = genero;
  }
}