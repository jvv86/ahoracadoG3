var palabrasSecretas = ["JAVA", "PYTHON", "RUBY", "JAVASCRIPT", "ARDUINO"];
var palabraAnterior = ""; // Inicializa como vacio
var palabraActual = "";
var gameOver = false;

function agregarPalabra(palabraActual){
    palabrasSecretas.push(palabraActual);
    console.log(palabrasSecretas);
}

function sortearPalabra(){
    palabraAnterior = palabraActual;
    var posicion = Math.floor(Math.random()*palabrasSecretas.length);
    palabraActual = palabrasSecretas[posicion];

    if(palabraAnterior === palabraActual){
        sortearPalabra(); // Vuelve a sortear
    }
    else if(palabraAnterior !== palabraActual){
        palabraActual = palabrasSecretas[posicion];
    }
}