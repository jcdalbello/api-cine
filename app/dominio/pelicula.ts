import CampoIncorrectoPeliculaError from "../errores/campo-incorrecto-pelicula-error";
import MensajesDeErrorDePelicula from "../errores/i-mensajes-de-error-de-pelicula";

const MINIMO_ID_VALIDO: number = 0;
const LONGITUD_MINIMA_CARACTERES: number = 1;
const LONGITUD_MAXIMA_CARACTERES: number = 70;

export default class Pelicula {
  private id: number;
  private titulo: string;
  private genero: string;

  constructor(
    id: number,
    titulo: string,
    genero: string
  ) {
    const errores: MensajesDeErrorDePelicula = {};
    try {
      this.establecerId(id);
    } catch (error) {
      if (error instanceof CampoIncorrectoPeliculaError) { errores.id = error.id!; }
    }
    
    try {
      this.establecerTitulo(titulo);
    } catch (error) {
      if (error instanceof CampoIncorrectoPeliculaError) { errores.titulo = error.titulo!; }
    }

    try {
      this.establecerGenero(genero);
    } catch (error) {
      if (error instanceof CampoIncorrectoPeliculaError) { errores.genero = error.genero!; }
    }

    if (Object.keys(errores).length > 0) {
      throw new CampoIncorrectoPeliculaError(errores);
    }
  }

  public obtenerId(): number {
    return this.id;
  }

  public obtenerTitulo(): string {
    return this.titulo;
  }

  public obtenerGenero(): string {
    return this.genero;
  }

  public establecerId(id: number): void {
    this.validarId(id);
    this.id = id;
  }

  public establecerTitulo(titulo: string): void {
    this.validarTitulo(titulo);
    this.titulo = titulo;
  }

  public establecerGenero(genero: string): void {
    this.validadGenero(genero);
    this.genero = genero;
  }

  public esPersistida(): boolean {
    return this.id !== MINIMO_ID_VALIDO;
  }

  private validarId(id: number): void {
    if (id < MINIMO_ID_VALIDO) {
      throw new CampoIncorrectoPeliculaError({
        id: "El id no puede ser menor que 0",
      });
    }
  }

  private validarTitulo(titulo: string): void {
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
  }

  private validadGenero(genero: string): void {
    if (genero.length < LONGITUD_MINIMA_CARACTERES) {
      throw new CampoIncorrectoPeliculaError({
        genero: "El genero no puede estar vacio",
      });
    }

    if (genero.length > LONGITUD_MAXIMA_CARACTERES) {
      throw new CampoIncorrectoPeliculaError({
        genero: "El genero no puede superar el limite de caracteres",
      });
    }
  }
}