import { getObserver } from "./observer.js";

const listOnlyImagen = document.querySelector("#contenedor_gif");

let offset = 0;
let dataAPI = [];
const BASEURL = 'https://api.giphy.com';

export const cargaTendenciaGif = async () => {
	try {
		const url = `${BASEURL}/v1/gifs/trending?api_key=ZHqZyxxt781pf5jO8gXbLZlwmGLzD8u6&limit=12&offset=${offset}`
    const getGifTen = await fetch(url);
		const { data } = await getGifTen.json();
		offset += 12;
		
		switch (getGifTen.status) {
			case 200:
				dataAPI = [...data];
      	gifTendenciaPrint();
				getObserverWithAPI();
			break;

			case 401:
				console.log("DATOS ENVIADOS INCORRECTOS");
			break;

			case 404:
				console.log("NO SE PUDO CONECTAR AL SERVIDOR - URL ERRONEA");
			break;
		
			default:
				console.log("OCURRIO UN ERROR - NO ES ERROR 401 - 404");
			break;
		}
  } catch (error) {
		console.log(error);
  }
};

const makeImg = gif => {
	const { id, images:{ downsized_medium }, title } = gif;
	
	const figureImage = document.createElement('figure');
	
	const img = document.createElement('img');
	img.id = id;
	img.src = downsized_medium.url;
	img.alt = title;
	img.title = title;

	figureImage.appendChild(img);
	return figureImage;
}


const gifTendenciaPrint = () => dataAPI.map(gif => makeImg(gif));

const getObserverWithAPI = () => {
	
	const lastArrIndex = dataAPI.pop();
	const lastImg = makeImg(lastArrIndex);
	
	listOnlyImagen.append(...gifTendenciaPrint(dataAPI))
	listOnlyImagen.append(lastImg);

	getObserver(lastImg);
}

