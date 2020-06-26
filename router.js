class Router {

    //Constructor
    constructor(routes) {
        this.routes = routes;
        this._loadInitialRoute();
    }

 loadRoute(...urlSegs){

    //Buscar la ruta concidd con la url
    const matchedRoute = this._matchUrlToRoute(urlSegs);

    const url = `/${urlSegs.join('/')}`; //Juntar la url
    history.pushState({},'this works', url); //insertar el path en la navegación

    const routerOutElm = document.querySelectorAll('[data-router]')[0]; //Obtener el div que tenga data-router
    routerOutElm.innerHTML = matchedRoute.template; //insertar contenido HTMl

 }

_matchUrlToRoute(urlSegs){ //recibe la url

    const matchedRoute = this.routes.find(route => { //find en las rutas
        
        const routePathSegs = route.path.split('/').slice(1) //separa el text de la diogonal y luego obtiene la segunda posición

        if (routePathSegs.length !== urlSegs.length){ //valida que la longitud de caracteres coincida con los de la url
            return false;
        }

        return routePathSegs 
            .every((routePathSeg, i) => routePathSeg === urlSegs[i]);
            /*Nos ayudda a indentificar con una condición todos los elementos del array 
            y en caso de que todos coincidan retorna true*/
    });
    console.log(matchedRoute);
    return matchedRoute; //Retorna la ruta
}


_loadInitialRoute() {
    //Obtiene el path desde la navegación y se pasa a la función loadRoute para que modifique la data

    const pathNameSplit = window.location.pathname.split('/');
    const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.slice(1): '';

    this.loadRoute(...pathSegs);
    }
}