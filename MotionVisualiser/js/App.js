var CANVAS_VISUALISER = true;

var audioSource, visualiser;
var tempoSource;
var debugElement, audioElement;
var fixturesFront, fixturesSide;

var updateIntervalId = -1;

document.addEventListener("DOMContentLoaded", function() {

    // Sets up the soundcloud loader, player

    debugElement = document.getElementById("debugOutput");
 

    // this is the number of lights we have to play with on both sides.
    // small, I know.
    var harpaLts = {
        front : {
            width : 37,
            height : 13
        },
        side : {
            width : 39,
            height : 9
        }
    };

    visualiser = new HarpaTestVisualiser();

    // init with the light dimensions
    visualiser.init(harpaLts.front.width, harpaLts.front.height, harpaLts.side.width, harpaLts.side.height);
    //
    document.getElementById("sideTextureContainer").appendChild(visualiser.faces.side);
    document.getElementById("frontTextureContainer").appendChild(visualiser.faces.front);

    if (!CANVAS_VISUALISER) {
        // setup SVG Fixture visualiser
        // Front
        fixturesFront = new HarpaSVGFixtureView();
        fixturesFront.init(harpaLts.front.width, harpaLts.front.height, document.getElementById("svg_template_front").innerHTML);
        document.getElementById("frontContainer").appendChild(fixturesFront.element);

        // Side
        fixturesSide = new HarpaSVGFixtureView();
        fixturesSide.init(harpaLts.side.width, harpaLts.side.height, document.getElementById("svg_template_side").innerHTML, true);
        document.getElementById("sideContainer").appendChild(fixturesSide.element);
    } else {
        fixturesFront = new HarpaCanvasFixtureView();
        fixturesFront.init(harpaLts.front.width, harpaLts.front.height);
        document.getElementById("frontContainer").appendChild(fixturesFront.element);

        fixturesSide = new HarpaCanvasFixtureView();
        fixturesSide.init(harpaLts.side.width, harpaLts.side.height);
        document.getElementById("sideContainer").appendChild(fixturesSide.element);
    }

    // disable fixtures on side panel to match shape of building

    
    for (var i=0; i < harpaLts.side.width; i++){
        for (var j = 0; j < harpaLts.side.height; j++){
            if (j > (2 + Math.floor(i / (i == 1 ? 5 : 6)))){
                fixturesSide.disableFixture(i,j);
            }

        }
    }
  
    fileInput = document.body.querySelector("#videoSelector");
    fileInput.addEventListener("change", function() {
        try {
            var file = fileInput.files[0];
            var fileURL = URL.createObjectURL(file);
            var videoElement = document.body.querySelector("video");
            videoElement.setAttribute("src", fileURL);
        } catch(e){
            console.error(e);
        }
        

    });




    // start render cycle (every browser frame)
    window.requestAnimationFrame(render);

     // start update cycle - this is less frequent, every 50ms
    clearInterval(updateIntervalId);
    setInterval(update, 50);


});


function render() {

    // calls the canvases to render

    window.requestAnimationFrame(render);

    visualiser.render();

    fixturesFront.render(visualiser.frontCtx);
    fixturesSide.render(visualiser.sideCtx);

};

function update() {

   

};

function debugWrite(msg) {

    debugElement.innerHTML = debugElement.innerHTML += "<br/>" + msg;
}
