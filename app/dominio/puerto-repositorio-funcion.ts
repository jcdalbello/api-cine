import Funcion from "./funcion";

export default interface RepositorioFuncion {
  guardar(funcion: Funcion): Promise<Funcion>;
  buscarFunciones(idSala?: number): Promise<Funcion[]>;
}
