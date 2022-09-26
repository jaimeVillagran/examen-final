import { cargaTendenciaGif } from "./tendencia.js";

const getViewPort = ([e]) => {
	const { isIntersecting, target } = e;

	if(isIntersecting){
		cargaTendenciaGif();
		observer.unobserve(target)
	}
}

const observer = new IntersectionObserver(getViewPort);

export const getObserver = nodeHTML => {
	observer.observe(nodeHTML);
}