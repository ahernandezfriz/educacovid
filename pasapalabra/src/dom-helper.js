//Acceso al DOM con jQuery
const container = $('#container')
const containerWin = $('#container-right-win')
const containerCancelGame = $('#container-right-cancelGame')
const containerGame = $('#container-right-game')
const containerRules = $('#container-right-rules')
const containerRanking = $('#container-right-ranking')

const generalDiv = $('div')
const generalInput = $('input')
const generalButton = $('button')

const inputName = $('#name')
const msnRequerido = $("#msn-requerido");
//msnRequerido.hide();

const fileInput = $("#file-input");


const question = $('#question')
const inputAnswer = $('#answer')
const nameShownInDOM = $('h1:nth-child(2)')
const circle = $('.circle')

const radioAvatarMan = $('#radio-avatar-man')
const radioAvatarWoman = $('#radio-avatar-woman')
const imageAvatarMan = $('#image-avatar-man')
const imageAvatarWoman = $('#image-avatar-woman')

const playGameButton = $('#play-game-button') //Boton Guardar todo el abecedario y comenzar el rosco
const submitButton = $('#submit-button'); // Boton de responder
const nextButton = $('#next-button')
const rankingButton = $('#ranking-button')
const endButton = $('#end-button')
const playAgainButton = $('.play-again-button')

const pausa = $("#pausa")

const suceessSound = $('.audio')[0]
const failSound = $('.audio')[1]
const cancelGameSound = $('.audio')[2]
const finishGameSound = $('.audio')[3]
$('.low').prop("volume", 0.5); //set volume to audios

const score = $('#score')
const timer = $('#timer')

const guessedWords = $('.guessed-words')
const failedWords = $('.failed-words')
const finalScore = $('.final-score')

const rankingName = $('.ranking-name')
const rankingPoints = $('.ranking-points')


// al iniciar el juego, el campo de introducir nombre debe estar en focus
inputName.focus()


// función que recoge el nombre introducido pòr el usuario y lo introduce en el DOM, 
// dentro del rosco en mayúsculas. En caso de que no introduzca nombre, aparecerá anonymous.
/*
function setUserName() {
  name = inputName.val();
  if(name === "") {
    name = "Anonymous";
  }
  name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  nameShownInDOM.text(name);
}
*/


// función que muestra por pantalla, un avatar de hombre o de mujer, dependiendo de la selección del usuario.
/*
function setAvatar() {
  radioAvatarMan.prop( "checked" ) ? imageAvatarMan.show()
                                   : imageAvatarWoman.show();
}
*/

// funciones que cambian el comportamiento visual
// Agrega sonido de correcto 
// Cambia la letra a verde
function answerIsCorrectDom(i) {
  suceessSound.play(); // sonido de acierto
  $('#' + randomQuestions[i].letter).addClass('green'); //cambia color a verde
  console.log("letter: " + randomQuestions[i].letter)
}


function answerIsWrongDom(i) {
  failSound.play(); // sonido de fallo
  $('#' + randomQuestions[i].letter).addClass('red'); // cambia color a rojo
}

//funciones que actualizan por pantalla los puntos y el timer.
function showPointsDom(points) {
  score.text(points);
}

function showTimerInDom(seconds) {
  timer.text(seconds);
}




// función que hace parpadear la letra en el rosco

function toggleLetter(i) {
  console.log(window.randomQuestions); // Verifica su contenido en la consola
  if (!window.randomQuestions || window.randomQuestions.length === 0) {
    console.error("randomQuestions no está definido o está vacío");
    return;
  }


  if(i < 26) { // evita error de i undefined cuando el usuario pulsa más enter más veces que letras hay
    $('#' + window.randomQuestions[i].letter).fadeToggle('slow', function() {
      toggleLetter(i);
    })
  }
}


// Función mejorada para hacer parpadear la letra
/*function toggleLetter(i) {
  
  console.log("letra id: "+ window.randomQuestions[i].letter);
  // Verificaciones adicionales
  if (!window.randomQuestions || !window.randomQuestions[i] || !window.randomQuestions[i].letter) {
    console.error("Datos de pregunta no válidos para índice", i);
    return;
  }

  // Normaliza a minúsculas y elimina espacios
  const letterId = window.randomQuestions[i].letter.toString().trim().toLowerCase();

  // Selección con jQuery (ahora en minúsculas)
  const letterElement = $('#' + letterId);
  console.log("id: " + letterElement);
  
  if (letterElement.length) { // Si el elemento existe
    letterElement.fadeToggle('slow', function() {
      toggleLetter(i); // Recursividad para efecto continuo
    });
  } else {
    console.error("Elemento no encontrado para la letra:", window.randomQuestions[i].letter);
  }
}
*/


// función que para el parpadeo de la letra
function distoggleLetter(i) {
  if(i < 26) { // evita error de i undefined cuando el usuario pulsa más enter más veces que letras hay
    $('#' + randomQuestions[i].letter).stop().css('opacity', '1');
  }
}


// función que muestra cada pregunta y hace parpadear la letra vigente a la que está vinculada.
function showQuestion(i) {
  toggleLetter(i);
  question.text(randomQuestions[i].question);
}

// comportamiento si la partida continúa
function continuePlayingDom(i) {
  inputAnswer.val('');
  showQuestion(i);
}


// funciones que cambian el aspecto visual del juego en diferentes situaciones (al iniciar el juego, al volver a jugar, al ganar, al cancelar, etc)
function startGameDom() {
  containerRules.hide();
  containerGame.attr('style', 'display : flex');
  inputAnswer.focus(); // el input siempre está en focus para escribir rápido
}

function endGameDom() {
  containerGame.hide();
  containerWin.attr('style', 'display : flex');
  finalScore.text(points);
  failedWords.text(26-points);
  guessedWords.text(points);
  generalButton.focus();
  distoggleLetter(i);
  finishGameSound.play()
}

function resetDom() {
  generalDiv.removeClass("red");
  generalDiv.removeClass("green");
  generalInput.val('');
  inputName.text('');
  score.text(points);
  timer.text(seconds);
  nameShownInDOM.text(name);
  imageAvatarMan.hide();
  imageAvatarWoman.hide();
}

function playAgainDom() {
  containerWin.hide();
  containerGame.hide();
  containerCancelGame.hide();
  containerRanking.hide();
  containerRules.show();
  container.show();
  inputName.focus();
}

function cancelGameDom() {
  cancelGameSound.play()
  gameIsCancelled = true;
  containerGame.hide();
  containerCancelGame.attr('style', 'display : flex');
  finalScore.text(points);
  failedWords.text(26-points);
  guessedWords.text(points);
  distoggleLetter(i);
  generalInput.focus();
}

function showRankingDom() {
  containerWin.hide();
  containerRanking.attr('style', 'display : flex');
  for(let i in ranking) {
    rankingName[i].textContent = ranking[i].name;
    rankingPoints[i].textContent = ranking[i].points;
  };
  generalButton.focus();
}


// función que recoge la respuesta introducida por el usuario en el DOM.
function getInputAnswerDom() {
  return inputAnswer.val()
}


//Dom events que dependen de funciones de index.js

function playGameDomEvent(cb) {
  playGameButton.click(function(e){
    e.preventDefault(); // Evita recargar la página si el botón es type="submit"
    saveQuestions(); // Guarda las preguntas primero

     // Verifica que randomQuestions tenga datos antes de continuar
     if (!window.randomQuestions || window.randomQuestions.length === 0) {
      alert("¡Debes ingresar todas las preguntas antes de jugar!");
      return;
    }
    
    cb(); // Llama a startGame() después de guardar

  });

  /*
  inputName.keypress(function(e) {
    if(e.which == 13) {
      cb(); // También guarda al presionar Enter
    }
  })*/
}

function validateInputDomEvent(cb) {
  inputAnswer.keypress(function(e) {
    if(e.which == 13) {
      cb();
    }
  })
  submitButton.click(function(e) {
    cb();
    inputAnswer.focus();
  })
}

function nextButtonDomEvent(cb) {
  nextButton.click(cb);
  
}

function playAgainDomEvent(cb) {
  playAgainButton.click(cb)
}

function endDomEvent(cb) {
  endButton.click(cb)
}

function rankingDomEvent(cb) {
  rankingButton.click(cb)
}

    /**
 * Guarda todas las preguntas/respuestas en `window.randomQuestions` y localStorage.
 * - Valida que cada letra tenga palabra y pregunta.
 * - Muestra errores en consola si faltan datos.
 */
    function saveQuestions(){

      window.randomQuestions = []; // Reinicia el array
      abcCompleto = true;
      num_segments = 0;
  
      const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
         
      letters.forEach(letter => {
          let word = document.getElementById(`word-${letter}`).value.trim();
          let question = document.getElementById(`question-${letter}`).value.trim();
  
          // Verificar si la letra y pregunta tienen contenido
          if (word && question) {
              num_segments++;
              window.randomQuestions.push({
                  letter: letter,
                  answer: word,
                  status: 0, // 0 = no respondida, 1 = acertada, 2 = fallada
                  question: question
              });
          } else {
              abcCompleto = false;
              console.error(`Faltan datos para la letra ${letter}`);
          }
          
          
      });
      // Guarda en localStorage y muestra resultados en consola
      // Guardar en LocalStorage
      localStorage.setItem('roscoGameData', JSON.stringify(randomQuestions));
      console.log('Todo el abecedario ha sido guardado correctamente');
      console.log("Es un " + typeof(randomQuestions));
      console.log(randomQuestions);
      /*console.log("letter[0].letter: "+randomQuestions[0].letter);
      console.log("letter[0].answer: "+randomQuestions[0].answer);
      console.log("letter[0].question: "+randomQuestions[0].question);*/
  }
      