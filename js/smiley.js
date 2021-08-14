const canvas =  document.querySelector('canvas#board');
const ctx = canvas.getContext('2d');

function draw (){
    ctx.beginPath();


    const middleX = canvas.width / 2;
    const middleY =  canvas.height / 2;

    // Head
    ctx.arc(middleX, middleY, 150, 0, Math.PI * 2, true);

    // MOUTH
    ctx.moveTo(middleX + 100, middleY)
    ctx.arc(middleX, middleY, 100, 0, Math.PI, false);

    ctx.moveTo(middleX + 30, middleY);
    ctx.arc(middleX, middleY, 30, 0 , Math.PI * 2, true);

    // LEFT EYE
    ctx.moveTo(middleX - 40, middleY - 60);
    ctx.arc(middleX - 60, middleY - 60, 20, 0, Math.PI * 2, true);

    // RIGHT EYE
    ctx.moveTo(middleX + 80, middleY - 60);
    ctx.arc(middleX + 60, middleY - 60, 20, 0, Math.PI * 2,true);
    ctx.stroke();  

   
}


draw();


