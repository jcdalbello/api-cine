import Funcion from "./funcion";

export default interface RepositorioFuncion {
  guardar(funcion: Funcion): Promise<Funcion>;
  buscarFunciones(idSala?: number, idPelicula?: number): Promise<Funcion[]>;
  recuperar(id: number): Promise<Funcion>;
}
