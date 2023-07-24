//Acceso a los elementos html
const elegirTalle = document.querySelector('#talla');
const elegirModelo = document.querySelector('#modelo');
const botonGuardar = document.querySelector('#guardarBtn');

function listarTallas() {
    if (tallas.length > 0) {
        tallas.forEach((talla)=> {
            elegirTalle.innerHTML += `<option value="${talla.id}">${talla.nombre}</option>`
        })
    }
}

function listarModelos() {
    if (modelos.length > 0) {
        modelos.forEach((modelo)=> {
            elegirModelo.innerHTML += `<option value="${modelo.id}">${modelo.nombre} - ${modelo.estampado}</option>`
        })
    }
}

elegirTalle.addEventListener('change', function() {
    habilitarBoton();
  });

elegirModelo.addEventListener('change', function() {
    habilitarBoton();
});

function habilitarBoton() {
  let tallaSeleccionada = elegirTalle.value;
  let modeloSeleccionado = elegirModelo.value;
  if (tallaSeleccionada && modeloSeleccionado) {
    guardarBtn.disabled = false;
  } else {
    guardarBtn.disabled = true;
  }
}

function mostrarMensaje() {
    let mensajeContacto = document.querySelector('#mensaje');
    let tallaSeleccionada = elegirTalle.options[elegirTalle.selectedIndex].textContent;
    let modeloSeleccionado = elegirModelo.options[elegirModelo.selectedIndex].textContent;
    let mensaje = `Tu orden de traje de baño talla ${tallaSeleccionada} y modelo ${modeloSeleccionado}, está en proceso. 
    Se comunicarán contigo a la brevedad.`;
    mensajeContacto.textContent = mensaje;
    //Guardar selección en localStorage
    localStorage.setItem('ordenSeleccionada', JSON.stringify(mensaje));
}

function obtenerOrden() {
  var ordenSeleccionadaJSON = localStorage.getItem('ordenSeleccionada');
  return JSON.parse(ordenSeleccionadaJSON);
}

listarTallas();
listarModelos();
habilitarBoton();