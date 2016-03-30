// common dependencies
var _c = console || {};

$(function(){ 
    
    _c.log("application start!!!");    

    OL.init();

});

/** olcreativa Global aplication handle 
* 
* init
* pymChild
* loader
* is_iframe
* window_width
* onResizedw
* btns_ajax_modal
* 
*/
var OL = {
    init: function () {
    
        "use strict";

        //variables
        var w = $(window).width(),
        totalDatos = 0,
        actual = 0,
        contenedor = $(".contenedor");

        //cargo la data
        $.ajax({
            type: "GET",
            url: "http://olcreativa.lanacion.com.ar/dev/get_url/?key2=1Mk8yiDcQheLgaf_kxTjhUeGwgiqSyEex9eM9N1IWGnc&output=json",
            dataType: "json",

            success: function(data) {

                armaContenido(data);
                OL.loader.hide();

            }
        });


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


        };



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

        
        
        /** if is not in iframe*/
        if(OL.is_iframe()){ 
            _c.log("You are out an iframe ;-)");
        }
        

        /** execute OL.onResizedw when size of page is changed*/
        var doit;
        window.onresize = function(d) {
          clearTimeout( doit );
          doit = setTimeout( OL.onResizedw, 200 );
        };

        /** init handle ctos modal btns */
        OL.btns_ajax_modal ();
    },

    /** ini PYM*/
    pymChild:  new pym.Child(),

    /** loder mothods */
    loader: {
        $loader: $("#loader"),
        show: function() { OL.loader.$loader.fadeIn(); },
        hide: function() { OL.loader.$loader.fadeOut("slow"); }
    },

    /** check if is an iframe */
    is_iframe: function(){
        return window === window.top;
    },

    /** actual window width*/
    window_width: $(window).width(),
    onResizedw: function () { // on resize stop event
        var w = $(window).width();
        if(OL.window_width != w){
            OL.window_width = w;
            // make changes here!!!
            // my_update()
            _c.log("window resize!!");

            setTimeout(function(){
                OL.pymChild.sendHeight(); // pym !!
            }, 1000);
        
        }
    },

    /** load modal from ".ajax_modal" btn */
    btns_ajax_modal: function (){
            $(".ajax_modal").on("click", function(){
                var $append = $("#append");
                $append.hide();
                $append.load(this.href, function(){
                    $append.fadeIn();

                    // when modal is closed cleaner append div
                    $(".cerrar_creditos", $append).on("click", function(){
                        $append.fadeOut("fast", function(){ $append.html(""); });
                        return false;
                    });
                });
                return false;
            });
        } 
};
