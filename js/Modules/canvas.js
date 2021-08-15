let canvas  = document.querySelector('canvas#board');
let ctx = canvas.getContext('2d');
let drawing;
let erasing = false;

const canvasProperties = {
    color: '#000000',
    size: 5,
    opacity: 1,
    type: 'round'
}

let  setColor = function(){
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        } : null;
    }
    
    canvasProperties.updatedColor = `rgba(${hexToRgb(canvasProperties.color).r}, ${hexToRgb(canvasProperties.color).g}, ${hexToRgb(canvasProperties.color).b}, ${canvasProperties['opacity']})`;        
    
}


let setCanvasSize = function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


function getMousePoint(ex, ey){

    var px = 0, py = 0;
    var el = document.getElementById('board');
    while (el) {
         px += el.offsetLeft;
         py += el.offsetTop;
         el = el.offsetParent;
     }

    return {x: ex-px ,y: ey-py};
}


let keydown = function(e){
    drawing = true;
    paintOnCanvas(e);
}

let keyUp = function(){
    drawing = false;
    ctx.beginPath();
}

function paintOnCanvas (e){
    if(drawing === true && erasing === false){
        setColor();
        ctx.globalCompositeOperation="source-over";
        ctx.lineWidth = canvasProperties.size;
        ctx.lineCap = canvasProperties.type;
        ctx.strokeStyle = canvasProperties.updatedColor;
        

        if(e.type == 'touchmove'){
            ctx.lineTo(getMousePoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY).x, getMousePoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY).y);
            ctx.stroke(); 
            
            ctx.beginPath();
            ctx.moveTo(getMousePoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY).x, getMousePoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY).y);  
        }else{
            ctx.lineTo(getMousePoint(e.clientX, e.clientY).x, getMousePoint(e.clientX, e.clientY).y);
            ctx.stroke(); 
            
            ctx.beginPath();
            ctx.moveTo(getMousePoint(e.clientX, e.clientY).x, getMousePoint(e.clientX, e.clientY).y);              
        }
     
    }
    else if(drawing === true && erasing === true){
        ctx.globalCompositeOperation="destination-out";

        if(e.type == 'touchmove'){
            ctx.lineTo(getMousePoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY).x, getMousePoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY).y);            
        }else{
            ctx.lineTo(getMousePoint(e.clientX, e.clientY).x, getMousePoint(e.clientX, e.clientY).y);
        }

        ctx.stroke();
    }
}

let addEventListenersToDomElements =  function(){
    canvas.addEventListener('mousedown', (e) => {
        keydown(e);
    });
    canvas.addEventListener('mouseup', keyUp);
    canvas.addEventListener('mousemove',  (e) => {
        paintOnCanvas(e);
    });

    canvas.addEventListener('touchstart', (e) => {
        keydown(e);
    });
    canvas.addEventListener('touchend', keyUp);
    canvas.addEventListener('touchmove',  (e) => {
        paintOnCanvas(e);
    });
}

let refreshCanvas =  function(){
    let button =  document.querySelector('div#refresh');

    button.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    })
}

let changeTool = function(){
    let tools =  document.querySelectorAll('div#tool');

    tools.forEach( tool => {
        tool.addEventListener('click', (e) => {
            canvasProperties.type = tool.getAttribute('data-tool');
            canvas.setAttribute('class', 'active');
            erasing = false;
        });
    })
}


let eraserFunctionality =  function(){
    let eraser = document.querySelector('div#eraser');

    eraser.addEventListener('click', (e) => {
        canvas.setAttribute('class', 'eraser')
        erasing = true;
    })
}

let saveAsPngFunctionality = function(){
    let saveAsImage = document.querySelector('#save-as-png');
    

    saveAsImage.addEventListener('mousedown', () => {
        const url = canvas.toDataURL();
        saveAsImage.href = url;
        saveAsImage.download = 'viceo.png';
    })

    saveAsImage.addEventListener('touchstart', () => {
        const url = canvas.toDataURL();
        saveAsImage.href = url;
        saveAsImage.download = 'viceo.png';
    })
}

let saveAsJpegFunctionality = function(){
    let saveAsImage = document.querySelector('#save-as-jpeg');
    

    saveAsImage.addEventListener('mousedown', () => {
        const url = canvas.toDataURL();
        saveAsImage.href = url;
        saveAsImage.download = 'viceo.jpeg';
    })

    saveAsImage.addEventListener('touchstart', () => {
        const url = canvas.toDataURL();
        saveAsImage.href = url;
        saveAsImage.download = 'viceo.jpeg';
    })
}

export {canvas, canvasProperties, setCanvasSize, addEventListenersToDomElements, refreshCanvas, changeTool, eraserFunctionality, saveAsPngFunctionality, saveAsJpegFunctionality};