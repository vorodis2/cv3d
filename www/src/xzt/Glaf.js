



import { MVisi3D } from '../libMy/visi3D/MVisi3D.js';
import { PM } from '../pm/PM.js';

import { Scane3d } from './veiw/Scane3d.js';
import { Menu } from './menu/Menu.js';

import { Mozg } from './mozg/Mozg.js';

import { SceneSB } from '../libMy/visi3D/SceneSB.js'

import { RedactCode } from './redactCode/RedactCode.js'



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
        /*this.visi3D.rotationX=1.63;
        this.visi3D.rotationZ=0.5;
        this.visi3D.zume=450;*/
        this.content3d.rotation.x=Math.PI
        this.visi3D.position3d.isDragPan=true;

        this.sceneSB=new SceneSB(this.visi3D);
        var o=mhbd.getKeyId("scenes3d",2)
        var oSp=o.json

        window.pm=new PM(visi3D,null,this.param);
        

        for (var i = 0; i <  this.sceneSB.array.length; i++) {
            if (oSp.scene[this.sceneSB.array[i].name] === undefined) {
                oSp.scene[this.sceneSB.array[i].name] = {};                
            }            
            this.sceneSB.array[i].setBasa(oSp.scene[this.sceneSB.array[i].name]);
        } 

 
        this.dCont = new DCont(par.contentHTML);


        this.mozg = new Mozg(this, function(s, p, p1){
            if(s=="visi3d"){
                self.visi3D.intRend=1;
                return
            }   

            if(s=="openLoad"){
                self.menu.mFolders.openLoad(p);
                self.scane3d.setSob(s, p, p1);
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

        this.redactCode = new RedactCode(this, function(s, p){
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
                w = _w;
                h = _h;
                s = _s;   
            }

  			this.scale=s;
            this.dCont.scale=s; 
            this.scane3d.sizeWindow(w,h,s);
            this.menu.sizeWindow(w,h,s);            
  		}

        this.sfghf = function(){ 
            trace("!!!!!!",w)
        }

        

/*
        setTimeout(function() {
            trace("!!!!!!")
            eval(`var w,h,s;
            self.sizeWindow = function(_w,_h,_s){  
                if(_w){
                    w= _w;
                    h= _h;
                    s= _s;   
                }
                
                self.scale=s;
                self.dCont.scale=s;
                
                self.scane3d.sizeWindow(w,h,s);
                self.menu.sizeWindow(w,h,s);
                
            }`)
            self.sizeWindow()
            self.sfghf()
            trace(self)
        }, 3000);*/



      /* document.onkeydown = function(event) {
            trace(event.keyCode)
            if (event.ctrlKey && (event.keyCode == 85) || (event.ctrlKey && event.shiftKey && (event.keyCode == 73)) || event.keyCode == 123) {
                
            }
            return false
        }*/

     /*   this.keydown=function(e){
            if(arrNa.indexOf(e.keyCode)==-1){
                arrNa.push(e.keyCode);
            }
            //self.scane3d.sobKey("down", e, arrNa);  
            return false
        }
        this.keyup=function(e){ 
            self.scane3d.sobKey("up", e, arrNa);            
            for (var i = 0; i < arrNa.length; i++) {
                if(arrNa[i]==e.keyCode){
                    arrNa.splice(i,1)
                    i=0
                }
            }    
            return false       
        }
        window.addEventListener( 'keydown', this.keydown );    
        window.addEventListener( 'keyup', this.keyup );*/

  	}
}