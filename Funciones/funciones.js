var filasOColumnas = 4;
var resultadoCantidadCuadradosTotales = 30;

var calcularCantidadCuadrados = function(){
    // LA FORMULA QUE UTILIZO PARA CALCULAR LA CANTIDAD TOTAL DE CUADRADOS SON:
    // n = cantidad de filas o columnas
    // 1 * 1 + 2 * 2 + 3 * 3 + 4 * 4 + 5 * 5 + ... + n * n = Cantidad de cuadrados totales
    // SAQUÉ ESTA FORMULA TOMANDO COMO 1 EL CUADRADO MÁS GRANDE DEL DIBUJO, DESPUES TOMAMOS CUADRADOS DE TAMAÑO n-1, HACIENDO QUE TENGAMOS 2 * 2 CUADRADOS, TENIENDO UN TOTAL DE 4 CUADRADOS CON TAMAÑO n-1. LUEGO, TOMO LOS CUADRADOS n-2, TENIENDO 3 * 3 CUADRADOS, CON UN TOTAL DE 9 CUADRADOS n-2, Y ASÍ SUCESICAMENTE HASTA LLEGAR A LOS CUADRADOS QUE TIENEN TAMAÑO 1 * 1, QUE EN TOTAL SERÍAN n*n CUADRADOS. AL FINAL LO QUE HACEMOS ES SUMAR TODAS ESAS CANTIDADES DE CUADRADOS, QUEDANDO: 1 + 4 + 9 + ... + n * n = Cantidad de cuadrados totales.
    // OTRA FORMULA QUE SE PODRÍA USAR PARA ESTE CASO ES: 1^2 + 2^2 + 3^2 + 4^2 + ... + n^2 = Cantidad de cuadrados totales.
    // var filasOColumnas = $("#cantFilasColumnas").val();
    if(filasOColumnas == 0) {
        filasOColumnas = 4;
    }
    var resultado = 0;
    for (let i = filasOColumnas; i > 0 ; i--) {
        resultado = resultado + (i*i);
        resultadoCantidadCuadradosTotales = resultado;

    }
    $("#resultadoCantidadCuadrados").html("Resultado: " + resultado);
    $("#resultadoCantidadCuadrados").addClass("alert alert-warning border border-warning");
    return resultado;
}

// $("#botonParaCalcular").click(calcularCantidadCuadrados);
$("#botonParaCalcular").click(function(){
    if(confirm("¿Está seguro que quiere saber el resultado?. Si no pudo averiguar el resultado, se pierde la gracia del juego")){
        calcularCantidadCuadrados();
    } else {
        alert("Excelente elección, sigue así y encontrarás el resultado (si todavía no lo ha hecho)")
    }
});


// CON ESTA FUNCIÓN ESTOY CREANDO EL DIBUJO DE LOS CUADRADOS
var funcionCuadrados = function(cantFilasColumnas){
    var cantidadCeldasTotales = cantFilasColumnas * cantFilasColumnas;
    $("#dibujo").empty();
        for (var i = 0; i < cantidadCeldasTotales; i++) {
        $("#dibujo").append("<div class='celda' draggable></div>"); // LO QUE SE HACE ES AGRECAR LA CANTIDAD DE n*n DIV'S DENTRO DE NUESTRO CONTENEDOR CON id = dibujo, CADA DIV REPRESENTA CADA CUADRADITO DEL DIBUJO
    }
    anchoDibujo = $("#dibujo").css("width");
    altoDibujo = $("#dibujo").css("height");
    var anchoDeCell = parseInt(anchoDibujo,10) / cantFilasColumnas; // COMO anchoDibujo NOS TRAE EL ANCHO DE LA CELDA CON SU UNIDAD, DE POR SI SOLO NO SE PUEDE DIVIDIR, CON parseInt LO QUE HACEMOS ES QUITAR LA UNIDAD. LO MISMO PASA CON EL ALTO. EL 10 INDICA QUE ES UN NUMERO DECIMAL
    var largoDeCell = parseInt(altoDibujo,10) / cantFilasColumnas;

    $(".celda").css({"width": anchoDeCell + "px", 
        "height": largoDeCell + "px", 
        "background-color": "#ecf0f1"
    });
    resultadoCantidadCuadradosTotales = calcularCantidadCuadrados();
    console.log(resultadoCantidadCuadradosTotales);
    $("#resultadoCantidadCuadrados").html("");
    $("#resultadoCantidadCuadrados").removeClass();
    $("#aviso").html("");
    $("#aviso").removeClass();
}


$(document).ready(function(){
    funcionCuadrados(4);

    // CUANDO SE QUIERA CAMBIAR EL TAMAÑO DEL DIBUJO, SE EJECUTA ESTA FUNCIÓN
    $("#cambiarDibujo").click(function(){
        var nuevoTamaño = $("#cantFilasColumnas").val();
        filasOColumnas = $("#cantFilasColumnas").val();
        if (nuevoTamaño == 0 || nuevoTamaño > 10) {
            nuevoTamaño = 4;
            alert("Tiene que ser un numero mayor a 0 y menor o igual a 10");
        }
        funcionCuadrados(nuevoTamaño);
    });

    // ACÁ LO QUE VAMOS A HACER ES VERIFICAR SI LA RESPUESTA DEL USUARIO CON RESPECTO A LA CANTIDAD DE CUANDRADOS EXISTENTES ES CORRECTA
    $("#verificarResultado").click(function(){
        var resultadoUsuario = $("#resultadoDelUsuario").val();
        console.log(resultadoCantidadCuadradosTotales);
        if(resultadoUsuario == resultadoCantidadCuadradosTotales) {
            $("#aviso").html("Es Correcto");
            $("#aviso").removeClass();
            $("#aviso").addClass("alert alert-success border border-success");
            setTimeout(function() {
				$('#aviso').addClass('run-animacion');
			},10);

        } else {
            $("#aviso").html("Es Incorrecto");
            $("#aviso").removeClass();
            $("#aviso").addClass("alert alert-danger  border border-danger");
            setTimeout(function() {
				$('#aviso').addClass('run-animacion');
			},10);
        }

    });
});