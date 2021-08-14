import * as Canvas from './canvas.js';

let app = document.querySelector('div#app');

let popUpsFunctionality = function(){
    let togglers =  document.querySelectorAll('#hasPopUp');

    togglers.forEach(toggler => {
        let togglee = document.querySelector(toggler.getAttribute('data-target'));

        toggler.addEventListener('click', function(){
            togglee.classList.toggle('d-none');
        });

        document.addEventListener('mousedown', (e) => {
            if(e.target == Canvas.canvas){
                togglee.classList.add('d-none');
            }
        }) 
    })
}

let themeChanger =  function(){
    let toggler =  document.querySelector('#theme-changer');
    let dark =  false;

    toggler.addEventListener('click', function(){
        app.classList.toggle('dark');

        if(dark == false){
            toggler.innerHTML = '<i class="fas fa-sun"></i>';
        }else if(dark == true){
            toggler.innerHTML  = '<i class="fas fa-moon"></i>';
        }

        dark = !dark;
    });
}



let colorPickerFunctionality =  function(){
    let input =  document.querySelector('input.color-picker');

    input.addEventListener('input', (e) => {
        Canvas.canvasProperties['color'] = input.value;
        input.style.backgroundColor = input.value;
    })
}

let sideBarActiveFunctionality =  function(){
    let items = document.querySelectorAll('.tools');

    let clearActives = function(target){
        items.forEach(item => {
            if(item != target){
                item.classList.remove('active');
            }
        })
    }

    items.forEach(item => {
        item.addEventListener('click',  (e) => {
            item.classList.add('active');
            clearActives(item);
        });
    });
}

export {popUpsFunctionality, themeChanger, colorPickerFunctionality, sideBarActiveFunctionality};