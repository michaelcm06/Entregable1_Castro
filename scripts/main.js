let carrito = [];
let total = 0;

function agregarAlCarrito(precio) {
  carrito.push(precio);
  total += precio;
  actualizarCarrito();
  actualizarTotal();
}

function actualizarCarrito() {
  let carritoElement = document.getElementById('carrito');
  carritoElement.innerHTML = '';

  for (let i = 0; i < carrito.length; i++) {
    let item = document.createElement('li');
    item.innerText = 'Producto ' + (i + 1) + ' - $' + carrito[i];
    carritoElement.appendChild(item);
  }
}

function actualizarTotal() {
  document.getElementById('total').innerText = total;
}

var cajaCompras = document.getElementById('caja-compras');

const openPopupBtn = document.getElementById('open-popup');
const popup = document.querySelector('.popup');

openPopupBtn.addEventListener('click', function () {
  popup.classList.toggle('active');
});