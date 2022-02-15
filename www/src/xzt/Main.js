import {Glaf } from './Glaf.js';
import { Param } from '../component/Param.js';
import { MHBDPHP } from '../component/MHBDPHP.js';
import { Calc } from '../component/Calc.js';

import { LocalStorage} from '../component/LocalStorageE6.js';
import {Languages} from '../component/Languages.js';
export class Main{
  	constructor(fun) {  		
  		this.type="Main";  		  		
  		var self=this;
		this.contentHTML= document.createElement('div');
		this.contentHTML.style.position = 'fixed';
		this.contentHTML.style.top = '0px';			
		this.contentHTML.style.left = '0px';
		document.body.appendChild(this.contentHTML);  

		//создание сцены
  		this.start = function () {	   
			var t = new PIXI.ticker.Ticker();
			t.minFPS = 50;
			t.add(this.tick, this);
			t.start();
        	dcmParam.fontFamily = "Montserrat";
        	dcmParam.fontSize = this.param.fontSize;    
        	this.fina()
		};


		this.fina = function () { 			
			self.glaf=new Glaf(this);
		    fun("init");         	
        }


		//тик размит надва
		var b=true
		this.tick = function () {				
			TWEEN.update();		
			if (self.glaf) {
				self.glaf.update();
			}			
		}


		//Маштабим окна 
		this.scale=1; var d;//890809
		var s
  		this.sizeWindow = function(w,h){  			
  			self._width=w;
			self._height=h;
			if (self._width < 800) self._width = 800;
			if (self._height < 600) self._height = 600;
			s= w/self._width;
			if(s>h/self._height)s=h/self._height;
			this.scale = s;
			if(dcmParam.isIE==true)this.scale = 1;			
			
  			if (self.glaf) { 
  				self.glaf.sizeWindow(w, h, this.scale)
  			}			
  		}
  		window.languages=new Languages([{key:"ru"},{key:"en"}])

  		window.localS=new LocalStorage(function(){},"xzt_v1")

  		window.calc=new Calc()
  		this.param = new Param().param;
   		window.mhbd=new MHBDPHP(this);
		window.mhbd.load(
			function(){
				self.start()
				
			}
		);  		
  	}
}


export class XZ1 {
  	constructor(par) {  		
  		this.type="XZ1";
  		var self=this;
    	var self=this;
    	
    	var self=this;// 
    	var self=this;
    	
    }    
}