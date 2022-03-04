

import { LABS } from './LABS.js';
import { CTVeiw } from './CTVeiw.js';
import { CTMozg } from './CTMozg.js';
export class CTCenter  {
    constructor(par, fun) {         
        this.type="CTLeft";
        var self=this;
        this.par=par;
        this.fun=fun;
        this._active=true;
        this._width=100;
        this._height=100;
        this._x=0;

        this._active=false;

        this._pozitY=0;
        this._pozitX=0;

        this._fontSize=par._fontSize;
        this._lineHeight=par._lineHeight;
        this.otstup1=par.otstup1;
        this.otstup=par.otstup;
        this.dCont=new DCont(this.par.dCenter);
        
        this.panel=new DPanel(this.dCont,0,0);
        this.panel.width=this._width;
        //this.panel.color='#772222';

        this.dCC=new DCont(this.dCont);
        this.dCC1=new DCont(this.dCC);
      
        this.dCC.div.style.clip = "rect(0px 100px 100px 0px)"; 


        this.labS=new LABS(this.dCC1,this,this.par.mzBlok)

        this.ctEvent = new CTEvent(this,function(s,p){

        })
        this.ctMozg = new CTMozg(this,function(s,p){

        })

        this.ctVeiw = new CTVeiw(this,function(s,p){

        })

        

        this.drag=function(){
            var x=0;
            if(this.par.ctLeft.active==true)x=this.par.ctLeft.width;            
            this.x=x;
            var ww=this.par._width-x-this.otstup1*3;
            if(this.par.ctScrolText._boolText==true)ww-=this.par._width*this.par._atWPros;
            
            this.height=this.par._height;
            this.width=ww;

        }

        var kolOld=-1;
        this.dragText=function(){
            this.labS.clear()
            this.labS.drag()
        } 
    }


    set pozitY(value) {
        if (this._pozitY != value) {
            this._pozitY = value;
            this.labS.pozitY = value;
            this.ctEvent.pozitY= value; 
            this.dCC1.y=  -value; 
            this.ctVeiw.pozitY=value;                 
        }
    }
    get pozitY() {
        return this._pozitY;
    }

    set pozitX(value) {
        if (this._pozitX != value) {
            this._pozitX = value;
            this.dCC1.x=-this._pozitX  
            this.ctVeiw.pozitX=value;                
        }
    }
    get pozitX() {
        return this._pozitX;
    }





    set fontSize(value) {
        if (this._fontSize != value) {
            this._fontSize = value;            
    
        }
    }
    get fontSize() {
        return this._fontSize;
    }



    set x(value) {
        if (this._x != value) {
            this._x = value;            
            this.dCont.x=this._x       
        }
    }
    get x() {
        return this._x;
    }

    set width(value) {
        if (this._width != value) {
            this._width = value;            
            this.panel.width=this._width 
            this.dCC.div.style.clip = "rect(0px "+this._width+"px "+this._height+"px 0px)";       
            this.ctVeiw.width=this._width;
        }
    }
    get width() {
        return this._width;
    }

    set height(value) {
        if (this._height != value) {
            this._height = value;            
            this.panel.height=this._height
            this.labS.height=this._height
            this.dCC.div.style.clip = "rect(0px "+this._width+"px "+this._height+"px 0px)"; 
            this.ctVeiw.height=this._height
        }
    }
    get height() {
        return this._height;
    }    

    set active(value) {
        if (this._active != value) {
            this._active = value;         
            this.ctEvent.active= value;   
        }
    }
    get active() {
        return this._active;
    }
}






export class CTEvent  {
    constructor(par, fun) {         
        this.type="CTEvent";
        var self=this;
        this.par=par;
        this.fun=fun;
        this._active=false;
        this._pozitY = 0;
       
        this.tween=new TWEEN.Tween(this.par.par)

        

        this.dragDelta = function (delta) {            
            var p=this.par.par.pozitY+(this.par.par._fontSize*this.par.par._lineHeight)*3*delta
            if(p<0)p=0;
            var scr=this.par.par.ctScrolText.scrollHeight;
            var mm=scr.heightContent-this.par.par.ctCenter.height-scr.minus;
            if(p>mm)p=mm;
            this.par.par.pozitY=p;
        }



        // прокрутка колесом мышки        
        this.mousewheel = function (e) {
            var hhh;
            var delta=-1;
            var p=e.delta
            if(e.wheelDelta==undefined){
                p=e.wheelDelta
            }

            if(e.delta)if(e.delta<0)delta=1;
            if(e.deltaY)if(e.deltaY<0)delta=1;
            if(e.detail)if(e.detail<0)delta=1;

            
            if(e.wheelDelta!=undefined){
                if(e.wheelDelta>0)delta=-1;
                else delta=1;
            }
            self.dragDelta(delta)

        };

        var arrNa=[]
        this.keydown=function(e){

            self.par.ctMozg.keydown(e)
           
            return false
          
        }

        this.keyup=function(e){ 
            self.par.ctMozg.keyup(e)
/*
            for (var i = 0; i < arrNa.length; i++) {
                if(arrNa[i]==e.keyCode){
                    arrNa.splice(i,1)
                    i=0;
                }
            }    
              */  
            return false    
        }

      

        document.onkeydown = function(event) {
           // self.par.ctMozg.keydown(event)
           //trace(">>d>>",event.keyCode,event)
            //if (event.ctrlKey && (event.keyCode == 85) || (event.ctrlKey && event.shiftKey && (event.keyCode == 73)) || event.keyCode == 123) {
            trace(dcmParam.getFocus())    
            if(dcmParam.getFocus()==null)return false
                
            //}
        }
        
        
        this.upDate=function(){ 
            if(self._active == false)return;
            self.par.ctVeiw.upDate();   
            requestAnimationFrame(self.upDate);

        }


    }



    set active(value) {
        if (this._active != value) {
            this._active = value; 
            
            if(this._active==true){
                
                this.par.par.dCont.div.addEventListener('mousewheel', this.mousewheel);
                this.par.par.dCont.div.addEventListener("DOMMouseScroll", this.mousewheel);                
                this.par.dCont.div.addEventListener('mousedown', this.par.ctVeiw.mousedown);

                
                this.upDate();

                document.addEventListener( 'keydown', this.keydown );    
                document.addEventListener( 'keyup', this.keyup );
            } else{
           
                this.par.par.dCont.div.removeEventListener('mousewheel', this.mousewheel)
                this.par.par.dCont.div.removeEventListener('DOMMouseScroll', this.mousewheel)

                    
                this.par.dCont.div.removeEventListener('mousedown', this.par.ctVeiw.mousedown);
                
                document.removeEventListener( 'keydown', this.keydown );    
                document.removeEventListener( 'keyup', this.keyup );

              
            }         
        }
    }
    get active() {
        return this._active;
    }

    set pozitY(value) {
        if (this._pozitY != value) {
            this._pozitY = value;
                           
        }
    }
    get pozitY() {
        return this._pozitY;
    }
        
}