/**************************************************************************/
/****************** subir palabras al rosco *******************************/
/**************************************************************************/
/**************************************************************************/
let num_segments;
let randomQuestions = [];
let abcCompleto = false;
let nComas;

function leerArchivo(e) {    
    var archivo = e.target.files[0];
    if (!archivo) {  
        return;
    }	
    var lector = new FileReader();
    lector.onload = function(e) {
        //Coteido del archivo
        var contenido = e.target.result;
        if(contenido){
            // separa el cotenido del archivo por salto de linea
            var lineas = contenido.split('\n');
            lineas.pop(); // array con las filas de textos
            cadena = lineas[0];
            var indices = [];
            for(var i = 0; i < cadena.length; i++) {
                if (cadena[i].toLowerCase() === ",") indices.push(i);
            }
            nComas = indices.length;            
            num_segments = lineas.length;
            if(num_segments == 26){
               //ABC Completo
                abcCompleto = true;
            }else{
               //ABC Incompleto
                abcCompleto = false;
            }
            for(var linea of lineas) {
                // separa por coma y elimina los espacios en blanco
                letra = linea.split(',').map(item => item.trim());
                randomQuestions.push({letter:letra[0], answer:letra[1], status: 0, question:letra[2]});
            }           
        }
    }
    lector.readAsText(archivo);  
}
fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', leerArchivo, false);