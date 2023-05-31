//Evento para el scroll
window.addEventListener("scroll", function () {
    let header = document.querySelector("header");
    header.classList.toggle("abajo", window.scrollY > 0);
})

//Animación para la frase de frozono


//Código para el filtro del buscador:
//Obtener elementos del DOM
const categoriaSelect = document.getElementById('categoria');
const ordenarSelect = document.getElementById('ordenar');
const precioSelect = document.getElementById('precio');
const buscarInput = document.getElementById('buscar');

//Asignar eventos a los elementos del DOM
categoriaSelect.addEventListener('change', filtrarComidas);
ordenarSelect.addEventListener('change', filtrarComidas);
precioSelect.addEventListener('change', filtrarComidas);
buscarInput.addEventListener('input', filtrarComidas);

//Función para filtrar comidas
function filtrarComidas() {
    const categoria = categoriaSelect.value;
    const orden = ordenarSelect.value;
    const precio = precioSelect.value;
    const buscar = buscarInput.value.toLowerCase();
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            //Filtrar comidas
            const resultados = data.comidas.filter((comida) => {
                //Filtrar por categoría
                if (categoria !== "Todo" && comida.categoria !== categoria) {
                    return false;
                }

                //Filtrar por precio
                let listaOriginal = comidas.slice(0); // Crear una copia de la lista original
                
                if (precio === "Todos") {
                    listaFiltrada = listaOriginal;
                } else if (precio === "Menor a mayor") {
                    listaFiltrada = comidas.sort((a, b) => a.precio - b.precio);
                } else if (precio === "Mayor a menor") {
                    listaFiltrada = comidas.sort((a, b) => b.precio - a.precio);
                }

                //Filtrar por búsqueda
                if (buscar !== "" && !comida.nombre.toLowerCase().includes(buscar)) {
                    return false;
                }

                return true;
            });

            //Ordenar resultados
            if (orden === "A - Z") {
                resultados.sort((a, b) => a.nombre.localeCompare(b.nombre));
            } else if (orden === "Z - A") {
                resultados.sort((a, b) => b.nombre.localeCompare(a.nombre));
            }

            //Mostrar resultados en el HTML
            mostrarResultados(resultados);
        });
}

//Función para mostrar los resultados en el HTML
const tienda = document.getElementById("seccion-productos");

function mostrarResultados(resultados) {
    tienda.innerHTML = '';

    if (resultados.length === 0) {
        tienda.innerHTML = `
        <p class="resultadosNoEncontrados">No se encontraron resultados</p>
        `;
        return;
    }

    //Asegurarse de que resultados sea un array, sino esto me va a traer problemas en el .forEach
    if (!Array.isArray(resultados)) {
        resultados = [resultados]; //Convertir a un array
    }

    resultados.forEach(comida => {
        const cardProducto = document.createElement("div");
        cardProducto.className = "card";
        cardProducto.innerHTML = `
        <div class="cardImagen">
        <img src="${comida.imagen}" alt="">
        </div>
        <div class="capa"> ${comida.nombre}</div>
        <div class="descrip"> ${comida.descipcion}</div>
        <div class="cardFooter">
        <div class="precio">$ ${comida.precio}</div>
        <button id="${comida.id}" class="botonComprar">
            <img class="cardFooterImagen" src="https://i.ibb.co/cvDqBbf/bolsa-de-la-compra.png" alt="">
        </button>
        </div>`;

        //Agregar la cardProducto al contenedor de la tienda
        tienda.append(cardProducto);

        //Función para el botón comprar.
        let botonComprar = cardProducto.querySelector(".botonComprar");

        botonComprar.addEventListener("click", () => {
            agregarAlCarrito(comida);
            //Pongo el mensaje del tostify
            Toastify({
                text: "Agregado al carrito",
                duration: 2000,
                close: false,
                gravity: "bottom",
                position: "center",
                stopOnFocus: true,
                style: {
                    background: '#b191dc',
                    color: '#ffffff',
                    fontFamily: 'Carter One, cursive',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '1.1rem',
                    paddingTop: '0.5em',
                    paddingBottom: '0.5em',
                    paddingLeft: '1.5em',
                    paddingRight: '1.5em',
                    borderTopRightRadius: '1em',
                    borderBottomLeftRadius: '1em'
                },
                onClick: function () {}
            }).showToast();
        });
    });
}





//Fetch con promesas: async y await
const url = '../scripts/data.json';
let comidas = [];

async function obtenerDatosJson() {
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        console.log(data);
        mostrarResultados(data.comidas);
    } catch (error) {
        console.error("Error al obtener datos JSON:", error);
    }
}

obtenerDatosJson();


//Mostrar los comidas filtradose
filtrarComidas();