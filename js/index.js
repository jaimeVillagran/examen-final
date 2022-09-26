import { cargaTendenciaGif } from "./tendencia.js";
import { getHistory } from "./buscador.js";
import { cargaGif } from "./buscador.js";


getHistory();
 
  const btnTextPadre = document.querySelector("#history_busqueda");

  btnTextPadre.addEventListener('click', (elemento) => {
    const re_busqueda = elemento.target.outerText
    cargaGif(re_busqueda)
  }) 

	document.addEventListener('DOMContentLoaded', cargaTendenciaGif);

