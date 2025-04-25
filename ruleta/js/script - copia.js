$(function() { 

        let ranking = [];

        const color = ["#a91111","#8a5926","#688a26","#8a263d","#8a2682","#3f268a","#26408a","#26738a","#91ff77", "#23ff00","#91ff00", "#9954f0", "#5544f0", "#989833", "#e40b0b", "#ffa500", "#3cb878","#a186be","#00e7ff"];

        	$( "#listado-preguntas" ).hide();
        	$("#container-resultados").hide();
        	$("#resetWheel").hide();

      
        	$("#btn-resultados").click(function(e){
        		e.preventDefault();
        		$("#container-preguntas").hide();
        		$("#spin_button").prop("disabled", true);
        		$("#container-resultados").show();


            ranking=[];
            $('.input_val').each(function(){
              //console.log($(this).attr("name"));
              ranking.push($(this).attr("name"));
            });

        		var g1 = $("#g1").val();
        		var g2 = $("#g2").val();
        		var g3 = $("#g3").val();
        		var g4 = $("#g4").val();
        		var g5 = $("#g5").val();
        		var g6 = $("#g6").val();

            var name_g1 = $("#g1").attr("name");
            var name_g2 = $("#g2").attr("name");
            var name_g3 = $("#g3").attr("name");
            var name_g4 = $("#g4").attr("name");
            var name_g5 = $("#g5").attr("name");
            var name_g6 = $("#g6").attr("name");


         

        		//ranking=[];

        		//ranking.push(g1, g2, g3, g4, g5, g6);
				    //console.log("array: "+ranking)
        		
        		//console.log("array oedeado: "+ranking.sort((a, b) => b-a));
        		ranking.sort((a, b) => b-a)

        		/*ranking.forEach(item => console.log(item));
				    ranking.forEach(function(pt) {
					     console.log("PT: "+pt);
                
				    });*/
            console.log(ranking);

            for(var i=0; i < ranking.length; i++) {
              var pos = i+1
              console.log(ranking[i]);
             $(".table").append("<tr><td>"+pos+"</td><td></td><td>"+ranking[i]+"</td></tr>");
            }

            /*for(var linea of ranking) {
              $(".table").append("<tr><td></td><td>"+linea+"</td><td></td></tr>");

            }*/

             
           
        		
        	})


        	// Boton volver a jugar
        	$("#volver-juego").click(function(e){
        		
        		$("#container-resultados").hide();
        		$("#resetWheel").hide();
        		
        		$("#container-preguntas").show();
        		$(".input_val").val(0);
        		
        		$("#file-input").val("");
        		$("#file-input").prop("disabled", false);
        		
        		$("#ulListado").html("");
        		$(".power_controls" ).show();
        		
        		deleteSegment();

        	})
        	


        	$("#salir-ruleta").click(function(e){
        		location.href="../index.html";
        	})
			

			  let intentos = 0;
    		function leerArchivo(e) {



        		var archivo = e.target.files[0];
        		if (!archivo) {
          			return;
        		}

        		var lector = new FileReader();

        		lector.onload = function(e) {
        			
        			var num_segments;

        			//Coteido del archivo
          			var contenido = e.target.result;

          			if(contenido){
          				intentos++;
          				console.log(intentos);


					// separa el cotenido del archivo por salto de linea
					var lineas = contenido.split('\n');
           			
           			//console.log("lineas "+lineas)
           			//console.log("N° lineas "+lineas.length);

           			num_segments = lineas.length;
           			console.log("N° lineas "+num_segments);

           			// Se crea una cookie con el numero de lineas que contiene el archivo
           			//document.cookie = "num_preguntas="+num_segments+";path=/;"; 

           			
          			if(num_segments <= 10 ){
          				var i=0;

            			for(var linea of lineas) {
            				i++;
              				$("#ulListado").append("<li class='preg pre_"+i+"'>"+linea+"</li>");
            			}
          			}else{
            			$("#ulListado").append("<li>Hay más de 10 pregutas e el archivo .txt</li>");
          			}
          			
          			

          			addSegment(num_segments, intentos);
          			}else{

          			}
					
          			
				};

				$("#listado-preguntas" ).show();
				$("#resetWheel").show();
				$("#file-input").prop("disabled", true);
				$("#spin_button").prop("disabled", false);
				$(".power_controls" ).hide();
				
        		lector.readAsText(archivo);
        		
      		}
      		document.getElementById('file-input').addEventListener('change', leerArchivo, false);

      
           


           	// Libreria ruleta
      		 let theWheel = new Winwheel({
                'outerRadius'     : 145,        // Set outer radius so wheel fits inside the background.
                'innerRadius'     : 45,         // Make wheel hollow so segments dont go all way to center.
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


            function addSegment(num_segments, intentos){
            	console.log("intentos: "+intentos);
 
              	if (intentos > 1) {

              		for(var i=1;i <= num_segments;i++){

	              		
	              		const random = Math.floor(Math.random() * color.length);
	              		              		
		              	theWheel.addSegment({
		                  'text' : ""+i+"",
		                  'fillStyle' : color[random]
		              	}, 1);

		              	console.log("add: "+i);
              		}
              		console.log("intentos (IF) ahora se elimina el primero: "+intentos);
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

		              	console.log("add: "+i);
              		}
              		console.log("intentos (IF ELSE): "+intentos);
              		
              	}
				theWheel.draw();
            }


            function deleteSegment()
		    {
		    	 
		        // Call function to remove a segment from the wheel, by default the last one will be
		        // removed; you can pass in the number of the segment to delete if desired.
		        for(var i=20;i >= 0;i--){
		        	//console.log(i);
		        	theWheel.deleteSegment();
		    	}	
		    	theWheel.clearCanvas();
		 
		        // The draw method of the wheel object must be called to render the changes.
		        //theWheel.draw();
		       
		        //theWheel.draw();
		        //console.log(theWheel)
		    }
 
         

            $("#spin_button").click(function(e){
        		e.preventDefault();
        		 
        		theWheel.animation.spins = 6;
                
                // Begin the spin animation by calling startAnimation on the wheel object.
                theWheel.startAnimation();
                
                // Set to true so that power can't be changed and spin button re-enabled during
                // the current animation. The user will have to reset before spinning again.
                wheelSpinning = true;
        	})




            // -------------------------------------------------------
            // Function for reset button.
            // -------------------------------------------------------
            //function resetWheel(){
             $("#resetWheel").click(function(e){
        		e.preventDefault();
                theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
                theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
                theWheel.draw();                // Call draw to render changes to the wheel.

                //document.getElementById('pw1').className = "";  // Remove all colours from the power level indicators.
                //document.getElementById('pw2').className = "";
                //document.getElementById('pw3').className = "";

                wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
            })

            // -------------------------------------------------------
            // Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters.
            // -------------------------------------------------------
            function alertPrize(indicatedSegment){
            	console.log(indicatedSegment)

            	$( ".preg" ).removeClass( "active" );

            	$( ".pre_"+indicatedSegment.text+"" ).addClass( "myClass active" );
            }


        });
        