import * as Utils from './Modules/utilities.js';
import * as Canvas from './Modules/canvas.js';
import * as Selector from './Modules/selector.js';

Utils.popUpsFunctionality();
Utils.themeChanger();
Utils.colorPickerFunctionality();
Utils.sideBarActiveFunctionality();
Selector.SelectorFunctionality();
Canvas.setCanvasSize();
Canvas.addEventListenersToDomElements();
Canvas.refreshCanvas();
Canvas.changeTool();
Canvas.eraserFunctionality();
Canvas.saveAsPngFunctionality();
Canvas.saveAsJpegFunctionality();


