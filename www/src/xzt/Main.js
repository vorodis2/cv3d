import {Glaf } from './Glaf.js';
import { Param } from '../component/Param.js';
import { MHBDPHP } from '../component/MHBDPHP.js';
import { Calc } from '../component/Calc.js';


import { LocalStorage} from '../component/LocalStorageE6.js';
import {Languages} from '../component/Languages.js';
import { TStyle } from '../t3d/TStyle.js';

//xz
/*sdf			f
sdfsf	
*/
export class Main{
 constructor(fun) {
	this.type="Main";	//4444 	 	
 	this.type="Main";	//0333 	
  	this.type="Main";	//0022
   	this.type="Main";	//0001 
	var f="555		55555555555555555555555555550123456789_012345655555555555555555555555555550123456789_012345655555555555555555555555555550123456789_012345655555555555555555555555555550123456789_012345655555555555555555555555555550123456789_0123456789_0123456789_";  	

  	var f="111111111111111111111111111111111111111111111111111111111111111111";  
  	var a=[
  			"s"
  	]

    var self=this;
  	this.contentHTML= document.createElement(
			'div'
		);// dsds
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
			if (self._width < 100) self._width = 100;
			if (self._height < 100) self._height = 100;
			s= w/self._width;
			if(s>h/self._height)s=h/self._height;
			this.scale = s;
			//if(dcmParam.isIE==true)
				this.scale = 1;			
			
  			if (self.glaf) { 
  				self.glaf.sizeWindow(w, h, this.scale)
  			}			
  		}
  		this.ddd = new XZ1(this);

  		window.languages=new Languages([{key:"ru"},{key:"en"}])

  		window.localS=new LocalStorage(function(){},"xzt_v1")

  		window.calc=new Calc()
  		this.param = new Param().param;

  		this.param.wh=32;;
  		this.param.fontSize=12;
  		//dcmParam.zbrosDokument=true
  		dcmParam.fontSize=this.param.fontSize
  		dcmParam.color="#777777";
  		dcmParam.color1="#303841"
  		dcmParam.color2="#ffffff"
  		dcmParam.fontFamily = "PT Mono"
  		//dcmParam.fontFamily = "Montserrat";
        	 
  		//this.param.colorFont="#303841"

  		window.tStyle= new TStyle();
  		document.body.style.backgroundColor = "#303841"
  		window.tStyle._gage=0.1

   		window.mhbd=new MHBDPHP(this);
		window.mhbd.load(
			function(){
				var loader = new THREE.FontLoader();
				loader.load( 'resources/font/helvetiker_bold.typeface.json', 
					function ( font ) {
					tStyle._fontSize=self.param.fontSizeLittel 

					tStyle.addFont(font);
					self.start()
				})				
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