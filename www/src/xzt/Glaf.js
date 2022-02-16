



import { MVisi3D } from '../libMy/visi3D/MVisi3D.js';

import { Scane3d } from './veiw/Scane3d.js';
import { Menu } from './menu/Menu.js';

import { Mozg } from './mozg/Mozg.js';

import { SceneSB } from '../libMy/visi3D/SceneSB.js'
export class Glaf  {
  	constructor(par) {  		
  		this.type="Glaf";
  		var self=this;



        
        this.scale=1;
		
        this.content3d=new THREE.Object3D()

        this.par=par;
        this.param=this.par.param 
     
        this.contHTML= document.createElement('div');
        this.contHTML.style.position = 'fixed';
        this.contHTML.style.top = '0px';         //drflgkjdflg  dasdasdf dasgfadsgf ads z dasgfda            fgh
        this.contHTML.style.left = '0px';
     


        //порезаный от пикси вювер        
		this.visi3D = new MVisi3D(this.contHTML, null, dcmParam.mobile, true, true, true, true);		
	 	this.visi3D.yes3d = true;       	
		this.visi3D.groupObject.add(this.content3d);
        window.visi3D=this.visi3D
        this.visi3D.rotationX=1.63;
        this.visi3D.rotationZ=0.5;
        this.visi3D.zume=450;
        this.visi3D.position3d.isDragPan=true;

        this.sceneSB=new SceneSB(this.visi3D);
        var o=mhbd.getKeyId("scenes3d",2)
        var oSp=o.json

       

        for (var i = 0; i <  this.sceneSB.array.length; i++) {
            if (oSp.scene[this.sceneSB.array[i].name] === undefined) {
                oSp.scene[this.sceneSB.array[i].name] = {};                
            }            
            this.sceneSB.array[i].setBasa(oSp.scene[this.sceneSB.array[i].name]);
        } 

 
        this.dCont = new DCont(par.contentHTML);


        this.mozg = new Mozg(this, function(s, p){
            if(s=="visi3d"){
                self.visi3D.intRend=1;
                return
            }   

            if(s=="openLoad"){
                self.menu.mFolders.openLoad(p);
            }                            
        }) 



       
        this.scane3d = new Scane3d(this, function(s, p){
            if(s=="visi3d"){
                self.visi3D.intRend=1;  

                return
            }                               
        }) 

        this.menu = new Menu(this, function(s, p){
            if(s=="visi3d"){
                self.visi3D.intRend=1;
                return
            } 
            if(s=="test"){                
                self.scane3d.test();
                return
            } 

        }) 


		this.update = function () {
			this.visi3D.upDate()	
		}

        //расчет окна
        var w,h,s;
  		this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            }

  			this.scale=s;
            this.dCont.scale=s;
            
            this.scane3d.sizeWindow(w,h,s);
            this.menu.sizeWindow(w,h,s);
  		}
  	}
}