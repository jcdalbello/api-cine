import Funcion from "../../app/dominio/funcion";
import Pelicula from "../../app/dominio/pelicula";
import Sala from "../../app/dominio/sala";

describe("Funcion", () => {
  const idSala: number = 1;
  const capacidadSala: number = 50;
  
  const idPelicula: number = 2;
  const tituloPelicula: string = "pelicula1";
  const generoPelicula: string = "genero1";

  const idFuncion: number = 3;

  let sala: Sala;
  let pelicula: Pelicula;
  let funcion: Funcion;

  beforeEach(() => {
    pelicula = new Pelicula(idPelicula, tituloPelicula, generoPelicula);
    sala = new Sala(idSala, capacidadSala);
    funcion = new Funcion(idFuncion, sala, pelicula);
  });

  test("deberia crear un objeto Funcion con los datos corrector", () => {
    expect(funcion).toBeInstanceOf(Funcion);
    expect(funcion.obtenerId()).toEqual(idFuncion);
    expect(funcion.obtenerSala()).toEqual(sala);
    expect(funcion.obtenerPelicula()).toEqual(pelicula);
  });
});
