$(function() { 

	let ranking = [];
	let intentos = 0;
	const color = ["#555E7B", "#00b88f","#f84b25", "#00376","#B576AD","#FDE47F","#7CCCE5","#005F6B","#f8b214","#D95B43", "#DFBA69", "#f65694","#596fb5","#E9E9E9", "#E08E79", "#E1F5C4", "#351330","#E04644","#F27435", "#BF4D28","#B7D968"];
	let num_segments;
        
        
	// Acceso al DOM
	const containerPreguntas =  $("#container-preguntas");
	const listadoPreguntas = $("#listado-preguntas");
	const containerResultados = $("#container-resultados");
	const btnResultados = $("#btn-resultados");
	const btnVolverJuego = $("#volver-juego");
	const btnGirarRuleta = $("#spin_button");
	const controles = $(".power_controls");
	const inputFile = $("#file-input");
	const inputGrup = $(".input_val");
	const btnSalirRuleta = $("#salir-ruleta");
	const btnExportar = $("#btnExportar");
	const contBtnGirar = $("#cont-btn-girar");
	const contBtnFinalizar = $("#cont-btn-finalizar");
	const containerGrupos = $("#container-grupos");
	const containerCrearGrupos = $("#container-crear-grupos");


	setInicioDOM();

	/*
		Setiamos el DOM para el inicio del juego 
	----------------------------------------------------------------------------*/
	function setInicioDOM(){
	
		listadoPreguntas.hide();     // Lista de pregutas
		containerResultados.hide();  // Coteedor para mostrar el rakig
		containerGrupos.hide();      // COteedor que muestra los grupos creados
		containerCrearGrupos.show(); // Seccion para crear grupos
		$("#input_crear_grupo").val(2);

		containerPreguntas.show();
		inputGrup.val(0);
		
		inputFile.val("");
		inputFile.prop("disabled", true);
		
		$("#ulListado-op").html("");
		$("#ulListado").html("");
		controles.show();

		contBtnGirar.show();
		contBtnFinalizar.show();

		btnGirarRuleta.prop("disabled", true); // Deshabilitado hasta cargar archivo
		btnResultados.prop("disabled", true);  // Deshabilitado hasta cargar archivo
	}


	/*
		Crear grupos
	----------------------------------------------------------------------*/ 
	$("#btn-crear-grupos").click(function(e){
		e.preventDefault();
		inputFile.prop("disabled", false);
		containerGrupos.show(); // Mostrar Listado de grupos
		containerCrearGrupos.hide(); // Ocultar boton para crear grupos
		$("#tabla-grupos").html("");
		$nGrupos = $("#input_crear_grupo").val();
		//console.log("nGrupos: "+$nGrupos);
		var $table_header;
		var $table_body;
		
		for(var i=0; i < $nGrupos; i++) {
			var pos = i+1;
			//console.log(pos);
			$table_header += "<td>G "+pos+"</td>";
			$table_body += "<td><input name='G"+pos+"' class='input_val' type='number' min='0' max='10' value='0' id='g"+pos+"' /></td>"
		}
		var $output_header ="<tr>"+$table_header+"</tr>";
		var $output_body = "<tr>"+$table_body+"</tr>";
		$("#tabla-grupos").append($output_header+$output_body);
	})

      
	/*
		Mostrar resultados en tabla de Ranking
	----------------------------------------------------------------------*/
	btnResultados.click(function(e){
		e.preventDefault();
		ranking=[];
		containerPreguntas.hide();
		containerResultados.show();
		containerGrupos.hide();
		contBtnGirar.hide();
		contBtnFinalizar.hide();
	
		$(".input_val").each(function(){
			ranking.push({'name': $(this).attr("name"), 'point':$(this).val() });
		});

		ranking.sort((a, b) => b.point-a.point)

		for(var i=0; i < ranking.length; i++) {
			var pos = i+1
			$(".table-ranking").append("<tr><td>"+pos+"</td><td>"+ranking[i].name+"</td><td>"+ranking[i].point+"</td></tr>");
		}
	})



        

	/*
		Subir y leer archivo .txt
	-----------------------------------------------------------------------------*/
	function leerArchivo(e) {
		var archivo = e.target.files[0];
		if (!archivo) {
			return;
		}
		
		var lector = new FileReader();
		lector.onload = function(e) {

			//Conteido del archivo
			var contenido = e.target.result;

			if(contenido){
				intentos++;

				// separa el cotenido del archivo por salto de linea
				var lineas = contenido.split('\n');
						
				num_segments = lineas.length;
										
				if(num_segments <= 15 ){
					var i=0;
					for(var linea of lineas) {
						i++;
						$("#ulListado-op").append("<li class='disc disc_"+i+"'>"+	i +"</li>");
						$("#ulListado").append("<li class='preg pre_"+i+"'>"+linea+"</li>");
					}
				}else{
					$("#ulListado").append("<li>Hay más de 10 pregutas e el archivo .txt</li>");
				}
					
				addSegment(num_segments, intentos);
			}else{
				listadoPreguntas.append("Archivo sin preguntas, vualva a subir un archivo .txt");
				controles.show();
				inputFile.prop("disabled", false);
			}		
		};// onload

		listadoPreguntas.show();
		//resetWheel.show();
		inputFile.prop("disabled", true);
		btnGirarRuleta.prop("disabled", false);
		btnResultados.prop("disabled", false);
		//btnGirarRuleta.show();
		controles.hide();
		//btnResultados.show();

		contBtnGirar.show();
		contBtnFinalizar.show();
				
		lector.readAsText(archivo);  		
	}
	var fileInput = document.getElementById('file-input');
	fileInput.addEventListener('change', leerArchivo, false);

      
           


	// Libreria ruleta
	let theWheel = new Winwheel({
		'outerRadius'     : 115,        // Set outer radius so wheel fits inside the background.
		'innerRadius'     : 8,         // Make wheel hollow so segments dont go all way to center.
		'textFontSize'    : 18,         // Set default font size for the segments.
		//'textOrientation' : 'vertical', // Make text vertial so goes down from the outside of wheel.
		'textAlignment'   : 'center',    // Align text to outside of wheel.
		'numSegments'     : 0,         // Specify number  of segments.
		'segments'        :             // Define segments including colour and text.
		[                               // font size and text colour overridden on backrupt segments
			
			{'fillStyle' : '#a186be', 'text' : '1'},
			{'fillStyle' : '#fff200', 'text' : '2'},
			{'fillStyle' : '#00ae44', 'text' : '3'},
			{'fillStyle' : '#00aef0', 'text' : '4'},
			{'fillStyle' : '#22aef0', 'text' : '5'},
			{'fillStyle' : '#99aef0', 'text' : '6'},
			{'fillStyle' : '#32aef0', 'text' : '7'},
			{'fillStyle' : '#49aef0', 'text' : '8'},
			{'fillStyle' : '#00ae22', 'text' : '9'},
			{'fillStyle' : '#00ae12', 'text' : '10'},
			
		],
		'animation' :           // Specify the animation to use.
		{
			'type'     : 'spinToStop',
			'duration' : 10,
			'spins'    : 3,
			'callbackFinished' : alertPrize,  // Función para llamar cuando la ruleta se ha detenido.
			'callbackSound'    : playSound,   // Se llama cuando se va a reproducir el sonido del tic.
			'soundTrigger'     : 'pin'        // Especifique que los pines son para activar el sonido.
		},
		'pins' :                // Turn pins on.
		{
			'number'     : 0,
			'fillStyle'  : 'silver',
			'outerRadius': 4
		}
	});

	// Loads the tick audio sound in to an audio object.
	let audio = new Audio('tick.mp3');

	// This function is called when the sound is to be played.
	function playSound(){
		// Stop and rewind the sound if it already happens to be playing.
		audio.pause();
		audio.currentTime = 0;

		// Play the sound.
		audio.play();
	}


	/*
		Crea la ruleta con la cantidad de segmentos, igual a la cantidad de preguntas que tiene el archivo
	--------------------------------------------------------------------------------------------------------------*/
	function addSegment(num_segments, intentos){
		//console.log("intentos: "+intentos);

		if (intentos > 1) {
			for(var i=1;i <= num_segments;i++){
				const random = Math.floor(Math.random() * color.length);			
				theWheel.addSegment({
					'text' : ""+i+"",
					'fillStyle' : color[random]
				}, 1);

				//console.log("add: "+i);
			}
			//console.log("intentos (IF) ahora se elimina el primero: "+intentos);
			//theWheel.deleteSegment(1);
			theWheel.deleteSegment(num_segments+1);
			//theWheel.draw();
		}else{
			for(var i=1;i <= num_segments;i++){
				//const color = ["#91ff77", "#23ff00","#91ff00", "#91ff00", "#9954f0", "#5544f0", "#989833", "#e40b0b", "#ffa500", "#3cb878","#a186be","#00e7ff"];
				const random = Math.floor(Math.random() * color.length);				
				theWheel.addSegment({
					'text' : ""+i+"",
					'fillStyle' : color[random]
				}, 1);

				//console.log("add: "+i);
			}
			//console.log("intentos (IF ELSE): "+intentos);
		}
		theWheel.draw();
	}


	
	/* 
		Se eliomina los segmentos de atras ahacia adelante
	------------------------------------------------------------------------------------*/
	function deleteSegment(){
		// Call function to remove a segment from the wheel, by default the last one will be
		// removed; you can pass in the number of the segment to delete if desired.
		for(var i=20;i >= 0;i--){
			//console.log(i);
			theWheel.deleteSegment();
		}	
		theWheel.clearCanvas();
	}
 
         
	$("#spin_button").click(function(e){
		e.preventDefault();
		resetRuleta();
		theWheel.animation.spins = 6;
		// Begin the spin animation by calling startAnimation on the wheel object.
		theWheel.startAnimation();
		// Set to true so that power can't be changed and spin button re-enabled during
		// the current animation. The user will have to reset before spinning again.
		wheelSpinning = false;
	})


	function resetRuleta(){
		theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
		theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
		theWheel.draw();                // Call draw to render changes to the wheel.
		wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.	
	}

	// -------------------------------------------------------
	// Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters.
	// -------------------------------------------------------
	function alertPrize(indicatedSegment){
		//console.log(indicatedSegment)
		$( ".preg" ).removeClass( "active" );
		$( ".disc" ).removeClass( "active-disc" );
		$( ".pre_"+indicatedSegment.text+"" ).addClass( "myClass active" );
		$( ".disc_"+indicatedSegment.text+"" ).addClass( "myClass2 active-disc" );
		//$( ".pre_"+indicatedSegment.text+"" ).prepend( "<span>"+indicatedSegment.text+".- </span>" );
		
		let segmentNumber = theWheel.getIndicatedSegmentNumber();
		//console.log("segmentNumber"+segmentNumber);
		//console.log("Número de segmentos: "+num_segments)
		//console.log("Termina de girar: "+indicatedSegment.text);


		/*
			Cantidad de segmentos que hay en la ruleta
		--------------------------------------------------------------------*/
		//console.log("numSegments: "+theWheel.numSegments);

		theWheel.deleteSegment(segmentNumber);
		theWheel.clearCanvas();
		resetRuleta();
		
		var si=0;
		$(".preg").each(function(index){
			if($(this).hasClass("myClass")){ // si giro la ruleta al menos una vez
				console.log("Si Existe myClass");
				si++;
				if(si == num_segments){
					btnGirarRuleta.prop("disabled", true); // Deshabilitado hasta cargar archivo
					//console.log("Desactiva BTN Finalizar: "+si+" "+num_segments);
					//btnResultados.prop("disabled", false);  // Deshabilitado hasta cargar archivo
				}
				//console.log(index+": si: "+ si + "de: "+num_segments);
			}else{ // No se a girado ninguna vez la ruleta
				//btnResultados.prop("disabled", true);  // Deshabilitado hasta cargar archivo
				console.log("No existe myClass");
			}
		});
	}


		/*
        	Salir de Ruleta y volver a página principal
        ----------------------------------------------------------------------------------*/
		function salirRuleta(){
			location.href="../index.html";
		}

		/* 
            Boton volver a jugar
        ----------------------------------------------------------------------------------*/
		function volverJuego(){
			$(".table-ranking tr").remove();
			setInicioDOM();
			deleteSegment();
		}

		/*
			Exportar cvs xls txt
		----------------------------------------------------------------------------------*/
		function exportarRuleta(){
			$("#tabla-ranking").tableExport();
		}

		btnExportar.click(exportarRuleta)
		btnVolverJuego.click(volverJuego);
		btnSalirRuleta.click(salirRuleta);
});
