
const tienda = document.getElementById("seccion-productosp");

comidasp.forEach((comidap) => {
    const cardProducto = document.createElement("div");
    cardProducto.className = "card";
    cardProducto.innerHTML = `
        <div class="cardImagen">
            <img src="${comidap.imagen}" alt="">
        </div>
        <div class="capa"> ${comidap.nombre}</div>
        <div class="descrip"> ${comidap.descipcion}</div>
        <div class="cardFooter">
            <div class="precio">$ ${comidap.precio}</div>
            <button id="${comidap.id}" class="botonComprar">
                <img class="cardFooterImagen" src="https://i.ibb.co/cvDqBbf/bolsa-de-la-compra.png" alt="">
            </button>
        </div>
        `;
    tienda.append(cardProducto);
    let botonComprar = cardProducto.querySelector(".botonComprar");

    botonComprar.addEventListener("click", () => {
        agregarAlCarrito(comidap);
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
            onClick: function(){}
        }).showToast();
    });
});
