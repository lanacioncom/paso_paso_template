window.onload=inicio;

var w = $(window).width(),
    totalDatos = 0,
    actual = 0,
    contenedor = $(".contenedor");


function inicio(){


				$.ajax({
     			  type: "GET",
				  url: "http://olcreativa.lanacion.com.ar/dev/get_url/?key2=1Mk8yiDcQheLgaf_kxTjhUeGwgiqSyEex9eM9N1IWGnc&output=json",
				  dataType: "json",

				  success: function(data) {

                        armaContenido(data);

				  }
				});


}// TERMINA INICIO


function armaContenido(data){

    totalDatos = data.length;
    var i = 0;
    var contenidos = "";
    var dots = "";
      

    for (i = 0; i < totalDatos; i++) {
        
        contenidos += "<div class='ficha'>"+i+"</div>"
        dots += "<div class='dot' id=d"+i+">"+i+"</div>"

    };

   contenedor.html(contenidos);
   $(".dots").html(dots);

   contenedor.css("width", w * totalDatos);
   $(".ficha").css("width", w);
   $("#galeria").css("height", $(".ficha").height() )


   $("#mas").on("click", function(){

        if(actual < totalDatos-1){
            actual++
            mueve(actual);
        }

   });

   $("#menos").on("click", function(){

        if(actual > 0){
            actual--
            mueve(actual);
        }

   });

   $(".dot").on("click", function(){

        var ide = $(this).attr("id");
        var id = ide.split("d");

        actual = +id[1];
        mueve(actual);
        console.log(ide)

   });


    /*-- hammerjs --*/
    var myElement = document.getElementById('galeria');  //hammer.js to swipe swithcer
    var mc = new Hammer(myElement);
    mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
        // listen to events...
    var lado = "";
    mc.on("panleft panright panend", function(ev) {
    //myElement.textContent = ev.type +" gesture detected.";
    //console.log(ev.type)
    
    if(ev.type == "panright" || ev.type == "panleft"){
        lado = ev.type; 
    }else if(ev.type == "panend"){
        if(lado == "panright"){
            if(actual > 0){
                actual--
                mueve(actual);
            }
        }else if(lado == "panleft"){
            if(actual < totalDatos){
                actual++
                mueve(actual);
            }
        }

            lado = "";
        };

    });

   mueve(actual);


}



function mueve(actual){
    //console.log(actual)
    contenedor.animate({"left": actual * -w}, 200);

    $(".dot").removeClass("active");
    $("#d"+actual).addClass("active");
}



$( window ).resize(function() {
    w = $(window).width();
    $(".ficha").css("width", w);
    contenedor.css("width", w * totalDatos);
    contenedor.animate({"left": actual * -w}, 1);

});