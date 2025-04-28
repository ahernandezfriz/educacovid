// declaración de variables globales
let ranking = [];
let name = '';
let points = 0;
let totalWords = 26;
let i = 0;
let seconds = 180;
let gameIsCancelled = false;
let click = false;



/**
 *  función que cambia de pantalla al pulsar el botón de Play Game, 
 * para empezar el juego y prepara el juego para jugar, 
 * mostrando las preguntas, timer, nombre de usuario. */
function startGame() {
  /*if(inputName.val().length == 0){
    $("#msn-requerido").html("Ingrese su nombre");
    return;
  }
  else if(inputName.val().length <= 3){
    $("#msn-requerido").html("");
    $("#msn-text-min").html("Ingrese minimo 3 letras");
    return;
  }

  if(fileInput.val().length == 0){
    // archivo esta vacio
    $("#msn-text-min").html("");
    $("#msn-file").html("Seleccione un archivo");
    return;
  }
  else if(abcCompleto === false){
    $("#msn-file").html("Revise su archivo, puede estar incompleto");
    return;
  }else if(nComas != 2){
    $("#msn-file").html("Revise su archivo, puede estar mal configurado");
    return;
  }*/

  if (!window.randomQuestions || window.randomQuestions.length !== 26) {
    alert("Debes completar las 26 letras antes de empezar.");
    return;
  }

  startGameDom();
  //setUserName();
  //setAvatar();
  setTimer();
  //setRandomArray();
  showQuestion(i);
}

function validarCamposInicio(){
  console.log("hola");
}



// función que guarda todas las respuestas del usuario en el array general donde están almacenadas las preguntas.
// cada vez que el usuario inserte su respuesta y presione enter o pulse el botón, 
// se comprobará si la respuesta es correcta, la letra actual dejará de parpadear y se mostrará la siguiente pregunta.
function validateInput() {
  if(i < 26) {
    randomQuestions[i].userAnswer = getInputAnswerDom(); //recoge valor de respuesta ingresada por el jugador
    distoggleLetter(i);
    checkAnswer(i);
    i++;
    continuePlaying(i);
  }
}


/* 
  Checkear Respuesta
-------------------------------------------------------------------- */
// función que comprueba si la respuesta es correcta, 
// cambiando la letra del rosco de color rojo si es incorrecta y reproduciendo un sonido de fallo, 
// de color verde si es correcta y reproduciendo un sonido de acierto, o dejándola igual si se pasa a la siguiente.
function checkAnswer(i) {
  if(randomQuestions[i].userAnswer.toUpperCase() === randomQuestions[i].answer.toUpperCase()) {
    randomQuestions[i].status = true; // marca pregunta como acertada
    totalWords--; // disminuye las letras pendientes de jugar
    answerIsCorrectDom(i);
    setPoints(); //actualiza puntos por pantalla
  } else { // si falla
    randomQuestions[i].status = false; // marca pregunta como fallida
    totalWords--; // disminuye las letras pendientes de jugar
    answerIsWrongDom(i)
  }
}


// función que actualiza puntos por pantalla
function setPoints() {
  points += 1;
  showPointsDom(points)
}


// función que elimina la pregunta actual de la posición vigente del array donde está almacenado y la añade al final.
function moveToNextQuestion(i) {
  let cutNextQuestion = randomQuestions.splice(i, 1)[0];
  randomQuestions.push(cutNextQuestion);
}


// función que sigue mostrando preguntas mientras haya palabras disponibles por mostrar, reseteando el input a valor vacío.
function continuePlaying(i) {
  if(totalWords !== 0) {
    continuePlayingDom(i)
  } else {
    //endGameDom();
    //setRanking()
  }
}


//cuando se pulsa el botón "next", la letra actual deja de parpadear, se pasa a la siguiente y se comprueba si se sigue jugando.
function nextButtonBehavior() {
  distoggleLetter(i);
  moveToNextQuestion(i);
  continuePlaying(i);
  inputAnswer.focus();
}

pausa.click(pausar);
function pausar(){
  if(click === true){
    // Reiniciar
    $(this).removeClass("pausar");
    $(this).addClass("reiniciar");
    $(this).html("<i class='bi bi-pause-btn'></i> PAUSAR");
    $(this).prop('title', 'Pausar');
    $("#submit-button").prop("disabled", false);
    $("#next-button").prop("disabled", false);
    $("#end-button").prop("disabled", false);
    $("#answer").prop("disabled", false);
    $("#answer").focus();
    click = false;
    setTimer();
  }else{
     // Pausar
    $(this).removeClass("reiniciar");
    $(this).addClass("pausar");
    $(this).html("<i class='bi bi-play-btn-fill'></i> REINICIAR");
    $(this).prop('title', 'Reiniciar');
    $("#submit-button").prop("disabled", true); 
    $("#next-button").prop("disabled", true);
    $("#end-button").prop("disabled", true);
    $("#answer").prop("disabled", true);
    click = true;
  } 
}


// función que establece un timer que se actualiza en el DOM a cada segundo. Termina cuando se acaban los segundos (180) 
// o cuando se agotan las definiciones disponibles. Contempla también la posibilidad de cancelar anticipadamente el juego, 
// momento en que el tiempo se para.
function setTimer() {
  var callbackFunction = function () {
    if(click === false){
      timeoutId = setTimeout(callbackFunction, 1000);
      seconds -= 1;
      showTimerInDom(seconds)
      if(gameIsCancelled) {
        seconds = 0;
        clearTimeout(timeoutId);
        cancelGameDom();
      } else if (seconds <= 0 || totalWords === 0) {
        clearTimeout(timeoutId);
        endGameDom();
        setRanking();
      }
    }
    else{
      clearInterval(timeoutId);
    }
  }
  var timeoutId = setTimeout(callbackFunction);
}



// función que inicializa las variables para ponerlas a 0 y poder volver a iniciar el juego.
function initializeVariables() {
  randomQuestions = [];
  name = "";
  points = 0;
  totalWords = 26;
  i = 0;
  seconds = 150;
  gameIsCancelled = false;
  resetDom()
}


// función que cambia el aspecto de la pantallla cuando se presiona el botón de play again, se ocultan los elementos actuales y se muestra de nuevo la pantalla inicial con las instrucciones y con los valores reseteados.
function playAgain() {
  initializeVariables();
  playAgainDom()
  fileInput.val("");
}


// función que establece un ranking, almacenando nombre y puntuación en un array, ordenado de más a menos puntuación. Únicamente se guardan las 10 mejores puntuaciones.
function setRanking(){
  ranking.push({'name': name, 'points': points});
  ranking.sort((a, b) => b.points - a.points);
  if(ranking.length > 10) {
    ranking.pop()
  }
}


playGameDomEvent(startGame) //cuando se pulsa enter o se presiona el botón.

validateInputDomEvent(validateInput) //cuando se pulsa enter o presiona botón.

nextButtonDomEvent(nextButtonBehavior) // cuando se pulsa el botón

playAgainDomEvent(playAgain) // cuando se pulsa el botón

endDomEvent(cancelGameDom) // cuando se pulsa el botón

rankingDomEvent(showRankingDom) // al pulsar el botón


$(function() { 
  $("#btnExportar").click(function(){
    $("#ranking-table").tableExport();
  })
});


