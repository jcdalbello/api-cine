import CampoIncorrectoSalaError from "../errores/campo-incorrecto-sala-error";
import MensajesDeErrorDeSala from "../errores/i-mensajes-de-error-de-sala";

const MINIMA_CAPACIDAD: number = 1;

export default class Sala {
  private id: number;
  private capacidad: number;

  constructor(id: number, capacidad: number) {
    const errores: MensajesDeErrorDeSala = {};
    try {
      this.establecerCapacidad(capacidad);
    } catch (error) {
      if (error instanceof CampoIncorrectoSalaError) {
        errores.capacidad = error.capacidad!;
      }
    }

    if (Object.keys(errores).length > 0) {
      throw new CampoIncorrectoSalaError(errores);
    }

    this.id = id;
  }

  public obtenerId(): number {
    return this.id;
  }

  public obtenerCapacidad(): number {
    return this.capacidad;
  }

  public establecerCapacidad(capacidad: number): void {
    this.validarCapacidad(capacidad);
    this.capacidad = capacidad;
  }

  public tieneIdAsignado(): boolean {
    return this.id !== 0;
  }

  private validarCapacidad(capacidad: number): void {
    if (capacidad < MINIMA_CAPACIDAD) {
      throw new CampoIncorrectoSalaError({
        capacidad: "La capacidad de la sala debe ser mayor a 0",
      });
    }
  }
}