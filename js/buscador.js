const botonBuscar = document.querySelector(".btn-primario");
const inputBuscar = document.querySelector(".input_buscar");
const textTitulo = document.querySelector(".titulo");

const cargaGif = async (inputBuscar) => {
    try {
      const getGif = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=ZHqZyxxt781pf5jO8gXbLZlwmGLzD8u6&limit=12&q=${inputBuscar}`
      );
      if (getGif.status === 200) {
        const getGifjs = await getGif.json();
        gifPrint(getGifjs);
        cambiaTitulo(textTitulo, inputBuscar);
        registraLocalStorage(inputBuscar) 
        getHistory() 
      } else if (getGif.status === 401) {
        console.log("datos incorrectos");
      } else if (getGif.status === 404) {
        console.log("no se pudo conectar al server");
      } else {
        console.log("ocurrio un error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  botonBuscar.addEventListener("click", (event) => {
    event.preventDefault();
    cargaGif(inputBuscar.value)    
  });


  function gifPrint(getGifjs) {
    console.log(getGifjs.data);
    const array = getGifjs.data;
    const arrayHtml = [];
  
    array.map((gif) => {
      arrayHtml.push({
        id: gif.id,
        title: gif.title,
        url: gif.images.downsized_medium.url,
      });
    });

    cargaGifHtml(arrayHtml)
  }
  
  const cargaGifHtml = async (arrayHtml) => {
    let agregadosHtml = "";
    arrayHtml.forEach( gifH => {
      agregadosHtml += `<img src=${gifH.url} class="img-gif" alt="...">`;
    });
    document.getElementById("contenedor_gif").innerHTML = agregadosHtml;

  };
  
  function cambiaTitulo(textTitulo, inputBuscar ){
 
    textTitulo.innerHTML = `<div class="titulo">Gif ${inputBuscar} </div>`

  }

  function registraLocalStorage(inputBuscar){

    const resultado = localStorage.getItem("historial")

    if (resultado === null){
      const registroLocal =  [
        { resgistro: inputBuscar }
      ]
      localStorage.setItem( "historial" , JSON.stringify(registroLocal) );

    }else{

    const jsonResult = JSON.parse(resultado)   

    jsonResult.push({
      resgistro: inputBuscar
    })

    localStorage.setItem( "historial" , JSON.stringify(jsonResult) );
    }
    
  }

  export function getHistory(){
    const resulHistory = localStorage.getItem("historial")
    const resulHistoryJs = JSON.parse(resulHistory)   


    let largo = resulHistoryJs.length;

    const resultHtml = resulHistoryJs.slice(-3 , largo)
     
    cargaHistorial(resultHtml) 

  }

  const cargaHistorial = async (resultHtml) => {

    let agregadosHtml = '';
    let contador = 0
    resultHtml.forEach(historial => {
      contador ++
      agregadosHtml += `<li class="history_unitario" id="history_unitario${contador}">${historial.resgistro}</li>`;
     });
    document.getElementById('history_busqueda').innerHTML = agregadosHtml;
  }



export {cargaGif}


