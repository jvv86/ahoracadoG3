// Vistas
var vistaInicio = document.querySelector("main")
var vistaAhorcado = document.querySelector("#seccion-ahorcado");
var vistaAgregar = document.querySelector("#seccion-agregar");

// Botones
var btnIniciar = document.querySelector("#btnIniciarJuego");
var btnAgregarPalabra = document.querySelector("#boton-agregar");
var btnNuevoJuego = document.querySelector("#botonNuevoJuego");
var btnDesistir = document.querySelector("#botonDesistir");
var btnGuardarEmpezar = document.querySelector("#botonGuardarEmpezar");
var btnCancelar = document.querySelector("#botonCancelar");

// Campos de textos
var inputAgregar = document.querySelector("#textarea-palabra");

var cartelGuardar = document.querySelector("#cartelGuardar");
var cartelGanar = document.querySelector("#cartelGanar");
var cartelPerder = document.querySelector("#cartelPerder");

// Evento del boton "Iniciar juego"
btnIniciar.addEventListener("click", function() {
    vistaInicio.classList.add("oculto");
    vistaAhorcado.classList.remove("oculto");
    sortearPalabra();
    mostrarGuion(palabraActual);
    mostrarLetraIncorrecta();
    actualizarHorca();
    window.onkeypress = verificarLetra; //Agrega el evento de teclado y llama esa funcion
});

// Evento del boton "Nuevo juego"
btnNuevoJuego.addEventListener("click", function() {
    sortearPalabra();
    mostrarGuion(palabraActual);
    mostrarLetraIncorrecta();
    limpiar();
    actualizarHorca();

    cartelGanar.classList.add("oculto");
    cartelPerder.classList.add("oculto");

    window.onkeypress = verificarLetra;

});

// Evento del boton "Desistir"
btnDesistir.addEventListener("click", function() {
    vistaAhorcado.classList.add("oculto");
    vistaInicio.classList.remove("oculto");
    limpiar();
    actualizarHorca();

    cartelGanar.classList.add("oculto");
    cartelPerder.classList.add("oculto");

    window.onkeypress = undefined; // O null
});

// Evento del boton "Agregar nueva palabra"
btnAgregarPalabra.addEventListener("click", function() {
    //window.location.href = "./agregarPalabra.html";
    vistaInicio.classList.add("oculto");
    vistaAgregar.classList.remove("oculto");
});

// Evento del boton "Guardar y empezar"
btnGuardarEmpezar.addEventListener("click", function(){
    cartelGuardar.classList.remove("oculto");

    setTimeout(function(){  // Despues de 800ms se ejecuta la funcion
        cartelGuardar.classList.add("oculto");
        vistaAgregar.classList.add("oculto");
        vistaAhorcado.classList.remove("oculto");

        agregarPalabra(inputAgregar.value); // js permite llamar facilmente funciones en otro archivo
        inputAgregar.value = "";

        sortearPalabra();
        mostrarGuion(palabraActual);
        mostrarLetraIncorrecta();

        window.onkeypress = verificarLetra;
    }, 800);

    /*inputAgregar.focus();
    btnGuardar.setAttribute("disabled", "disabled");
    btnJugar.removeAttribute("disabled", "disabled");
    btnJugar.classList.remove("btn-disabled");*/
});

// Evento del boton "Cancelar"
btnCancelar.addEventListener("click", function(){
    vistaAgregar.classList.add("oculto");
    vistaInicio.classList.remove("oculto");
});

// Para verificar el input de la palabra
inputAgregar.addEventListener("input", function(){
    inputAgregar.value = inputAgregar.value.toUpperCase();

    // Cuando es vacio el input
    if(/[0-9]/.test(inputAgregar.value) || /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~´]/.test(inputAgregar.value) || /[äÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]/.test(inputAgregar.value) || /\s/.test(inputAgregar.value) || inputAgregar.value === ''){
        btnGuardarEmpezar.classList.add("deshabilitado");
    }else{  // Cuando no es vacio el input
        btnGuardarEmpezar.classList.remove("deshabilitado");
    }
});

// const btnNuevoJuego = document.createElement("button"); // Crea un elemento desde js
//  btnNuevoJuego.innerHTML = "Nuevo juego"; // Agrega texto al boton, tambien se puede agregar un listener... y asi
// document.body.appendChild(btnNuevoJuego); // Agrega el boton a la pagina con todas las propiedades