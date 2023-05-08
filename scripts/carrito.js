
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

const verCarrito = document.getElementById("ver-carrito"); 
const modal = document.getElementById("carrito-id"); 

const pintarCarrito = () => {
    modal.innerHTML = "";
    modal.style.display = "flex";

    const modalContainer = document.createElement("div");
    modalContainer.className = "modalContainer";
    modal.append(modalContainer);

    const modalHeader = document.createElement("div");
    modalHeader.className = "modalHeader";
    modalHeader.innerHTML = `
    <h1 class="modalHeaderTitle">Carrito</h1>
    `;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement("button");
    modalButton.className = "modalHeaderButton";
    modalButton.innerText = "❌";

    modalButton.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    })

    modalHeader.append(modalButton);

    const modalContent = document.createElement("div");
    modalContent.className = "modalContent";
    modalContainer.append(modalContent);

    carrito.forEach((comida) => {
        let modalProduct = document.createElement("div");
        modalProduct.className = "modalProduct";
        modalProduct.innerHTML = `
            <div class="modalProductImagen">
                <img src="${comida.imagen}">
            </div>
            <p class="modalProductNombre">${comida.nombre}</p>
            <p class="modalProductPrecio">$ ${comida.precio}</p>
            <div class="modalProductCantidad">
                <button class="modalProductRestar"> - </button>
                <p class="modalProductNumero">${comida.cantidad}</p>
                <button class="modalProductSumar"> + </button>
            </div>
            <div class="modalProductTotal">
                <p class="modalProductTotalPalabra">Total: </p>
                <p class="modalProductTotalNumero">$ ${comida.cantidad * comida.precio}</p>
            </div>
            <button class="modalProductBorrar"> ❌ </button>
        `;
        modalContent.append(modalProduct);


        let restar = modalProduct.querySelector(".modalProductRestar");
        let sumar = modalProduct.querySelector(".modalProductSumar");
        let eliminar = modalProduct.querySelector(".modalProductBorrar");

        restar.addEventListener("click", (event) => {
            if (comida.cantidad !== 1) {
                comida.cantidad--;
            }
            saveLocal();
            pintarCarrito();
        });

        sumar.addEventListener("click", (event) => {
            comida.cantidad++;
            saveLocal();
            pintarCarrito();
        });

        eliminar.addEventListener("click", (event) => {
            eliminarProducto(comida.id);
        });


    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const modalFooter = document.createElement("div");
    modalFooter.className = "modalFooter";
    modalFooter.innerHTML = `
    <button class="modalFooterButton">
        <p id="vaciar-carrito" class="modalFooterButtonPalabra">Vaciar carrito</p>
    </button>
    <div class="modalFooterTotal">
        <p class="modalFooterTotalPalabra">Total a pagar:</p>
        <p class="modalFooterTotalNumero">$ ${total}</p>
    </div>
    <button class="modalFooterButton">
        <p id="finalizar-compra" class="modalFooterButtonPalabra">Finalizar compra</p>
    </button>
    `;
    modalContainer.append(modalFooter);

    let vaciarCarrito = document.getElementById("vaciar-carrito")
    let finalizarCompra = document.getElementById("finalizar-compra");
    let compraCompletada = document.getElementById("compra-completada");

    vaciarCarrito.addEventListener('click', () => {
        localStorage.clear();
        eliminarTodosProductos();

        Toastify({
            text: "Carrito vacío",
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
            onClick: function () { }
        }).showToast();
    });

    finalizarCompra.addEventListener('click', () => {
        localStorage.clear();
        eliminarTodosProductos();
        Toastify({
            text: "Gracias por elegir nuestros Productos 🐱🐶 ",
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
            onClick: function () { }
        }).showToast();
    });
};

function agregarAlCarrito(comida) {

    const repetir = carrito.some((repetirProducto) => repetirProducto.id === comida.id);

    if (repetir === true) {
        carrito.map((comidaEnCarrito) => {
            if (comidaEnCarrito.id === comida.id) {
                comidaEnCarrito.cantidad++;
            }
        })
    } else {
        carrito.push({
            id: comida.id,
            nombre: comida.nombre,
            categoria: comida.categoria,
            precio: comida.precio,
            imagen: comida.imagen,
            cantidad: 1,
        });
    };
    console.log(carrito);
    console.log(carrito.length);

    carritoContador();
    saveLocal();
};


verCarrito.addEventListener('click', function () {
    pintarCarrito();

    modal.style.display = 'flex';

    document.body.style.overflow = 'hidden';
});


const eliminarProducto = (id) => {

    const idEncontrado = carrito.find((element) => element.id === id);


    carrito = carrito.filter((carritoId) => {
        return carritoId !== idEncontrado;
    });

    carritoContador();
    saveLocal();
    pintarCarrito();
};


const eliminarTodosProductos = () => {

    carrito = [];

    carritoContador();
    saveLocal();
    pintarCarrito();
};


const carritoContador = () => {
    let carrito1 = document.querySelector('.carrito1');
    let carrito2 = document.querySelector('.carrito2');
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    if (carrito.length === 0) {
        carrito1.style.display = "inline-block";
        carrito2.style.display = "none";
    } else {
        carrito1.style.display = "none";
        carrito2.style.display = "inline-block";
        carrito2.innerText = JSON.parse(localStorage.getItem("carritoLength"));
    }
};

carritoContador();


document.addEventListener("DOMContentLoaded", function () {
    modal.classList.add("hidden");
});