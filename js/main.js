const URL_BASE = "https://www.dnd5eapi.co";

const nombreElemento = document.getElementById("monstruo-nombre");
const imagenElemento = document.getElementById("monstruo-img");
const datosElemento = document.getElementById("monstruo-datos");
const botonNuevo = document.getElementById("btn-nuevo");

async function obtenerMonstruo() {

    nombreElemento.innerHTML = "Buscando monstruo...";
    datosElemento.innerHTML = "";

    try {
       
        const respuestaLista = await fetch(URL_BASE + "/api/2014/monsters");
        const lista = await respuestaLista.json();
        
        const posicion = Math.floor(Math.random() * lista.results.length);
        const elegido = lista.results[posicion];

        const respuesta = await fetch(URL_BASE + elegido.url);
        const monstruo = await respuesta.json();

        nombreElemento.innerHTML = monstruo.name;
        if (monstruo.image) {
            imagenElemento.src = URL_BASE + monstruo.image;
        } else {
            imagenElemento.src = "https://placehold.co/300x300?text=Sin+imagen";
        }

        const armadura = monstruo.armor_class[1].value;

        datosElemento.innerHTML =
            "<li><b>Tipo:</b> " + monstruo.type + "</li>" +
            "<li><b>Tamaño:</b> " + monstruo.size + "</li>" +
            "<li><b>Alineamiento:</b> " + monstruo.alignment + "</li>" +
            "<li><b>Puntos de vida:</b> " + monstruo.hit_points + "</li>" +
            "<li><b>Armadura:</b> " + armadura + "</li>" +
            "<li><b>Desafío:</b> " + monstruo.challenge_rating + "</li>";

    } catch {
        nombreElemento.innerHTML = "No se encontró";
    }
}

obtenerMonstruo();

botonNuevo.addEventListener("click", obtenerMonstruo);