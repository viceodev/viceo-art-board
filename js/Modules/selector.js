import * as Canvas from './canvas.js';

let percentage;
let opacity;

let calculateSizeAndOpacity =  function (){
    Canvas.canvasProperties['size'] = Math.floor(percentage / 2);
    Canvas.canvasProperties['opacity'] = opacity / 100;
}



function SelectorFunctionality (){
    let progressBars =  document.querySelectorAll('#progress');
    let status = false;
    

    progressBars.forEach(progressBar => {
        let ball = progressBar.querySelector('.ball');
        let way = progressBar.querySelector('.progress-container');
        let color =  progressBar.querySelector('.color');

        let setControlInitials =  function(){
            if(way.id == 'opacity-control-container'){
                color.style.width = '100%';
                ball.style.left = '100%';
            }

            if(way.id == 'size-control-container'){
                color.style.width = '5%';
                ball.style.left = '5%';
            }
        }

        setControlInitials();
        
        let moduleMoveDueToWay =  function(e){
            if(e.target == way || e.target == color){
                percentage = Math.floor((e.offsetX * 100) / way.getBoundingClientRect().width) ;
                color.style.width = `${percentage}%`;
                ball.style.left = `${e.offsetX}px`;

                if(e.target.id == 'opacity-control-container'){
                    opacity = parseInt(percentage);
                    percentage = Canvas.canvasProperties['size'] * 2;
                }else if(e.target.id == 'size-control-container'){
                    opacity = Canvas.canvasProperties['opacity'] * 100;
                }

                calculateSizeAndOpacity();
            }else if(e.target == ball){
                status = true;
            }        
        }

        let moduleMoveDueToBall =  function(e){
            if(e.target == way || e.target == color){
                if(status != true ) return;
                percentage = Math.floor((e.offsetX * 100) / way.getBoundingClientRect().width) ;
                color.style.width = `${percentage}%`;
                ball.style.left = `${e.offsetX}px`;

                if(e.target.id == 'opacity-control-container'){
                    opacity = percentage;
                    percentage = Canvas.canvasProperties['size'] * 2;
                }else if(e.target.id == 'size-control-container'){
                    opacity = Canvas.canvasProperties['opacity'] * 100;
                }
                calculateSizeAndOpacity();
            }
        }

        let moduleMoveDueToBallForMobile =  function(e){

            let offset = (e.changedTouches[0].pageX - way.getBoundingClientRect().x);

            if(e.target == ball){
                if(status != true ) return;
                percentage = Math.floor((offset * 100) / way.getBoundingClientRect().width) ;
                color.style.width = `${percentage}%`;
                ball.style.left = `${offset}px`;

                if(e.target.parentNode.classList.contains('opacity-control-container')){
                    opacity = percentage;
                    percentage = Canvas.canvasProperties['size'] * 2;
                }else if(e.target.parentNode.classList.contains('size-control-container')){
                    opacity = Canvas.canvasProperties['opacity'] * 100;
                }
                calculateSizeAndOpacity();
            }
        }

        document.addEventListener('mousedown', (e) => {moduleMoveDueToWay(e)});

        document.addEventListener('touchstart', (e) => {moduleMoveDueToWay(e)});

        document.addEventListener('mousemove', (e) => {moduleMoveDueToBall(e)})

        document.addEventListener('touchmove', (e) => {moduleMoveDueToBallForMobile(e)})

        document.addEventListener('mouseup', () => {
            status = false;
        });

        document.addEventListener('touchend', () => {
            status = false;
        });
        
    });
}




export {SelectorFunctionality};