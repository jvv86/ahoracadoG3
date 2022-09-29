var tableroLetras = document.querySelector("#tableroGuiones");  // Los guiones se pueden generar con canvas tambien
var tableroIncorrecto = document.querySelector("#tableroLetraIncorrecta");
var adivinado = [];
var errado = [];
var estado = 0;
var anteriorImg = 0;

function crearGuion(colocarLetra) {
    var letra = document.createElement("span"); // tr
    letra.setAttribute("class", "letra");
    if (adivinado.indexOf(colocarLetra) >= 0) {
        letra.innerHTML = colocarLetra;
    } else {
        letra.innerHTML = '';
    }
    return letra;
}

function mostrarGuion(palabra) {
    var letras = tableroLetras.querySelectorAll(".letra");

    for (let letra of letras) {   // Elimina las letras anteriores
        tableroLetras.removeChild(letra);
    }

    for (let i of palabra) {  // Agrega las letras nuevas
        var guion = crearGuion(i);
        tableroLetras.appendChild(guion);
    }
}

function mostrarLetraIncorrecta() {
    tableroIncorrecto.innerHTML = '';
    for (let letra of errado) {
        let span = document.createElement('span');
        let txt = document.createTextNode(letra);
        span.setAttribute('class', 'letra-incorrecta');
        span.appendChild(txt);
        tableroIncorrecto.appendChild(span);
    }
}

function actualizarHorca() {
    if(anteriorImg != undefined){
        var img = document.getElementById('horca' + anteriorImg);
        img.classList.add('oculto'); // Oculta la imagen anterior
    }

    if(estado == "win"){
        estado = 0;
    }

    img = document.getElementById('horca' + estado);
    img.classList.remove('oculto'); // Muestra la nueva imagen
    // img.style.visibility = 'hidden';
}

function limpiar() {
    if (estado == "lost"){
        estado = 8;
    }

    var img = document.getElementById('horca' + estado);
    img.classList.add('oculto'); // Limpia la horca, ocultando la imagen actual
    adivinado = [];
    errado = [];
    anterior = estado;
    estado = 0;
}

function verificarLetra(event) {
    var teclaPresionada = event.key.toUpperCase();

    if (!(/[A-ZÑ]/i.test(teclaPresionada))) { return; }

    if (estado === "lost" || estado === "win") { return; }

    //evitar mostrar letras repetidas
    if (adivinado.indexOf(teclaPresionada) >= 0 ||
        errado.indexOf(teclaPresionada) >= 0) {
        return;
    }

    if (palabraActual.indexOf(teclaPresionada) >= 0) { // Si la letra fue adivinada
        adivinado.push(teclaPresionada);

        var ganado = true;
        //verificar si cada letra de la palabra fue adivinada
        for (let letra of palabraActual) {
            //si dicha letra no es parte del array de letras adivinadas:
            if (adivinado.indexOf(letra) < 0) {
                ganado = false;
                break;
            }
        }

        //si adivino toda, gana
        if (ganado) {
            anteriorImg = estado;
            estado = "win";

            cartelGanar.classList.remove("oculto");
        }
    }
    else if (palabraActual.indexOf(teclaPresionada) === -1) {  // Si la letra no fue adivinada
        anteriorImg = estado++;
        errado.push(teclaPresionada); // Agrega las letras incorrectas
        

        if (estado === 8) {
            setTimeout(finDelJuego, 0);
        }
    }

    actualizarHorca();
    mostrarGuion(palabraActual); // js tambien permite usar variables de otras clases de una forma mas simple
    mostrarLetraIncorrecta();
}

function finDelJuego(){
    anterior = estado;
    estado = "lost";

    cartelPerder.classList.remove("oculto");
}