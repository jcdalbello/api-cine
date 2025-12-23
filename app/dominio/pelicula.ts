export default class Pelicula {
  constructor(
    private id: string,
    private titulo: string,
    private genero: string
  ) { }

  public obtenerId(): string {
    return this.id;
  }

  public obtenerTitulo(): string {
    return this.titulo;
  }

  public obtenerGenero(): string {
    return this.genero;
  }
}