/**
 * Array global que almacena las preguntas/respuestas del rosco.
 * Se guarda en `window` para ser accesible desde otros archivos JS.
 */
window.randomQuestions = [];
/**
 * Bandera para verificar si el abecedario está completo.
 */
let abcCompleto = true;
/**
 * Contador de segmentos (letras) completados.
 */
let num_segments = 0;

document.addEventListener('DOMContentLoaded', function() {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

    const lettersContainer = document.getElementById('lettersContainer');// COntenedor
    //const saveAllBtn = document.getElementById('play-game-button'); // Boton guardar
    
    // Generar filas para cada letra
    letters.forEach(letter => {
        const row = document.createElement('div');
        row.className = 'letter-row';
        row.innerHTML = `
            <div class="letter-label">${letter}</div>
            <input type="text" class="word-input" id="word-${letter}" placeholder="Palabra" />
            <textarea class="question-input" id="question-${letter}" placeholder="Pregunta"></textarea>
        `;
        lettersContainer.appendChild(row);
    });
    
    // Carga datos guardados (si existen)
    loadSavedData();
    
    





    /**
    * Carga datos guardados desde localStorage y los muestra en los inputs.
    */
   function loadSavedData() {
        const savedData = localStorage.getItem('roscoGameData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            
            parsedData.forEach(item => {
                if (item.letter) {
                    document.getElementById(`word-${item.letter}`).value = item.answer || '';
                    document.getElementById(`question-${item.letter}`).value =item.question || '';
                }
            });
            console.log('Datos cargados desde localStorage.');
        }
    }





});