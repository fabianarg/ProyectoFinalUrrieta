let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos();
    });

function cargarProductos() {
    const totalProductos = document.querySelector('.contenedor-items');
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <div class="item">
                <img class="img-item" src="${producto.imagen}" alt="${producto.nombre}" width="300px" height="376px">
                <figcaption class="titulo-item">Modelo "${producto.nombre}"</figcaption>
                <figcaption class="precio-item">Precio: $${producto.precio} USD</figcaption>
                <button class="btn-item" id="${producto.id}">Agregar al carrito</button>
            </div>
        `;

        totalProductos.appendChild(div);
    });

    traerBotones();
}

function traerBotones() {
    const botonesCarrito = document.querySelectorAll('.btn-item');
    botonesCarrito.forEach(boton => {
        boton.addEventListener("click", function() {
            agregarItemAlCarrito(productos.find(producto => producto.id === boton.id));
        });
    });
}
  
  let carritoVisible = false;
  
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', cargar);
  } else {
      cargar();
  }
  
  function cargar() {
      const botonesEliminar = document.querySelectorAll('.btn-eliminar');
      botonesEliminar.forEach(button => {
          button.addEventListener('click', eliminarItemCarrito);
      });
  
      const botonesSumar = document.querySelectorAll('.sumar-cantidad');
      botonesSumar.forEach(button => {
          button.addEventListener('click', sumarCantidad);
      });
  
      const botonesRestar = document.querySelectorAll('.restar-cantidad');
      botonesRestar.forEach(button => {
          button.addEventListener('click', restarCantidad);
      });
  
      document.querySelector('.btn-pagar').addEventListener('click', pagarFinalizado);
  }
  
  function pagarFinalizado() {
      const carritoItems = document.querySelector('.carrito-items');
      while (carritoItems.firstChild) {
          carritoItems.removeChild(carritoItems.firstChild);
      }
      Swal.fire({
        title: '¿Confirmas la compra?',
        text: "El pedido se alistará una vez que confirmes el pago",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Pago confirmado',
            'Pronto recibirás tu pedido',
            'success'
          )
        }else if(result.isCanceled){
            return buttonClicked;
        }
      })
      ocultarCarrito();
  }
  
  function hacerVisibleCarrito() {
      carritoVisible = true;
      const carrito = document.querySelector('.carrito');
      carrito.style.marginRight = '0';
      carrito.style.opacity = '1';
  
      const items = document.querySelector('.contenedor-items');
      items.style.width = '60%';
  }
  
  function agregarItemAlCarrito(producto) {
    console.log('Agregando producto al carrito:', producto);

    const item = document.createElement('div');
    const itemsCarrito = document.querySelector('.carrito-items');
  
    const titulo = producto.nombre;
    const precio = `Precio: ${producto.precio}`;
    const imagenSrc = producto.imagen;
  
    const nombresItemsCarrito = itemsCarrito.querySelectorAll('.carrito-item-titulo');
    console.log('Nombres de productos en el carrito:', nombresItemsCarrito);
    
    for (let i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText === titulo) {
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }
  
      const itemCarritoContenido = `
          <div class="carrito-item">
              <img src="${imagenSrc}" width="80px" alt="">
              <div class="carrito-item-detalles">
                  <span class="carrito-item-titulo">${titulo}</span>
                  <div class="selector-cantidad">
                      <i class="fa-solid fa-minus restar-cantidad"></i>
                      <input type="text" value="1" class="carrito-item-cantidad" disabled>
                      <i class="fa-solid fa-plus sumar-cantidad"></i>
                  </div>
                  <span class="carrito-item-precio">${precio}</span>
              </div>
              <button class="btn-eliminar">
                  <i class="fa-solid fa-trash"></i>
              </button>
          </div>
      `;
      item.innerHTML = itemCarritoContenido;
      itemsCarrito.appendChild(item);
  
      item.querySelector('.btn-eliminar').addEventListener('click', eliminarItemCarrito);
  
      const botonRestar = item.querySelector('.restar-cantidad');
      botonRestar.addEventListener('click', restarCantidad);
  
      const botonSumar = item.querySelector('.sumar-cantidad');
      botonSumar.addEventListener('click', sumarCantidad);
  
      actualizarTotalCarrito();
      hacerVisibleCarrito();
  }

  function sumarCantidad(event) {
      const buttonClicked = event.target;
      const selector = buttonClicked.parentElement;
      const cantidadActual = parseInt(selector.querySelector('.carrito-item-cantidad').value);
      selector.querySelector('.carrito-item-cantidad').value = cantidadActual + 1;
      actualizarTotalCarrito();
  }
  
  function restarCantidad(event) {
      const buttonClicked = event.target;
      const selector = buttonClicked.parentElement;
      const cantidadActual = parseInt(selector.querySelector('.carrito-item-cantidad').value);
      if (cantidadActual >= 2) {
          selector.querySelector('.carrito-item-cantidad').value = cantidadActual - 1;
          actualizarTotalCarrito();
      }
  }
  
  function eliminarItemCarrito(event) {
      const buttonClicked = event.target;
      buttonClicked.parentElement.parentElement.remove();
      Swal.fire({
        title: '¿Deseas eliminar?',
        text: "Se removerá tu selección",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado',
            'Se eliminó el producto exitosamente',
            'success'
          )
        }else if(result.isCanceled){
            return buttonClicked;
        }
      })
      actualizarTotalCarrito();
      ocultarCarrito();
  }
  
  function ocultarCarrito() {
      const carritoItems = document.querySelector('.carrito-items');
      if (carritoItems.childElementCount === 0) {
          const carrito = document.querySelector('.carrito');
          carrito.style.marginRight = '-100%';
          carrito.style.opacity = '0';
          carritoVisible = false;
  
          const items = document.querySelector('.contenedor-items');
          items.style.width = '100%';
      }
  }
  
  function actualizarTotalCarrito() {
    const carritoItems = document.querySelectorAll('.carrito-item');
    let total = 0;

    carritoItems.forEach(item => {
        const precioElemento = item.querySelector('.carrito-item-precio');
        const precio = parseFloat(precioElemento.innerText.replace('Precio: ', ''));

        const cantidadItem = item.querySelector('.carrito-item-cantidad');
        const cantidad = parseInt(cantidadItem.value);

        total += precio * cantidad;
    });

    total = Math.round(total * 100) / 100;

    const totalElement = document.querySelector('.carrito-precio-total');
    totalElement.innerText = `$${total.toLocaleString("es")}`;
}
