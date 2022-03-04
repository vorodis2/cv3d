import { MZBlok } from '../../mozg/MZBlok.js';
import { TDStyle } from '../TDStyle.js';

import { CTLeft, CTImage2, CTScrolText } from './CTLeft.js';

import { CTLabel } from './CTLabel.js';

import { CTCenter } from './CTCenter.js';



export class CodeText extends DCont {
    constructor(dCont, _x, _y, _text,_fun) {
        super();       
        this.type="CodeText";
        var self=this;       
        this.fun=_fun;
        if (dCont != undefined) if (dCont.add != undefined) dCont.add(this);
        
        if(window.tdStyle==undefined) {
            window.tdStyle=new TDStyle();
        }   
        this._active=false
        this._pozitY=0;
        this._pozitX=0;
        
        this.otstup=2;
        this.otstup1=5;
       
        this.otn=50;
        this.pros=0.1
        this.drag

        this._width = 300;
        this._height = 300;
        this.x = _x || 0;
        this.y = _y || 0; 
        this._yv=0;
        this._xv=0;
        this._fontSize=dcmParam.fontSize
        this._lineHeight=1.25
        this._boolLeft=true;
        this._boolText=true;
        this._simPix=8;
        this._atWPros=0.15;

        this.text = _text || null;    

        this.mzBlok=undefined //редактируемый
        this.mzStar=undefined //ночальный
        this.strStart=_text

        this.dCont=undefined

        this.dScrollBarH=undefined
        this.dScrollBarV=undefined


        var dCt2=undefined;
        this.getTextWidth = function(_text, _font) {
            let strBold = this.bold == true ? 'bold ' : 'normal '
            let strSize = this.fontSize+'px '
            let strFamily = this.fontFamily+''

            let text = _text || this.text
            let font = _font || strBold+strSize+strFamily+''
            if(dCt2==undefined)dCt2 = document.createElement("canvas")
            var canvas = dCt2// getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));    
            var context = canvas.getContext("2d");
            context.font = font;
            var metrics = context.measureText(text);
            return metrics.width;
        }


        this.init = function(){
            if(this.dCont!=undefined)return
            this.dCont=new DCont();


            this.panel=new DPanel(this.dCont, 0);
            this.panel.boolLine=false

           

            this.dCT=new DCont(this.panel);

           
/*
            this.dCT1=new DCont(this.dCT);            
            this.dCT.div.style.clip = "rect(0px 100px 100px 0px)";  

*/

            this.dCenter=new DCont(this.dCont);


            this.ctLeft=new CTLeft(this,function(s,p){

            })         

            setTimeout(function() {
                var www=self.ctLeft.label.getTextWidth("123456789012345678901234567890")/30;
                self.simPix=www;
            }, 1000);

            this._simPix=this._fontSize*8.4/14;

            this.mzBlok=new MZBlok(this, this.sobBlok)

            this.ctCenter=new CTCenter(this,function(s,p){
                if(s=="saveModel"){
                    self.fun(s,p)
                }
                if(s=="save"){
                    self.fun(s,p)
                }
            })           
            


            this.ctImage2=new CTImage2(this,function(s,p){

            })



            this.ctScrolText=new CTScrolText(this,function(s,p){

            })  







          /*  this.dCText=new DCont(this.panel);
            this.dCText1=new DCont(this.dCText);
            this.dCText.x= this.otn;
            this.dCText.div.style.clip = "rect(0px 100px 100px 0px)";  */

           

            

            //this.labS=new LABS(this.dCText1,this)



       
        





            
/*
           
            var pObject=new DParamObject(this.dCont,-222, 2, function(){          
                
            });
            pObject.typeNotArray =["x","y","width","height"]
            pObject.addObject(this);*/
            

            
            if(this.strStart!=null)this.setCode2()
        }


        this.dragH=function(v){//0**100
            if(v<0)v=0
            if(v>100)v=100 
           /* var www=(self.dScrollBarH.width-self.dScrollBarH.widthContent)
            var xx=www*v/100             
            self.dCText1.x= xx
            self.dScrollBarH.value=v*/



            /*var aa=1-(50+xx)/50;
            if(aa>1)aa=1            
            self.image.alpha=aa                   
            var xx1=www-xx;    
            var aa1=1-(50+xx1)/50;
                     
            self.image1.alpha=aa1;*/            
        } 

        this.dragV=function(v){//0**100
           /* if(v<0)v=0;
            if(v>100)v=100; 
            var yy=(self.dScrollBarV.height-self.dScrollBarV.heightContent)*v/100         
            self.dCText1.y= yy;
            self.dCT1.y= yy;
            self.labS.yyy=-yy
            self.dScrollBarV.value=v;*/
        }






        this.sobBlok=function(s,p,p1){
            if(s=="load"){
                self.fun(s,p,p1)
                return
            }
        }

        this.setCode = function(str){            
            this.strStart=str;
            if(this.dCont!=undefined){
                this.setCode2()
            }
        }
        this.setCode2 = function(){
            this.mzStar=new MZBlok(this, this.sobBlok)
            this.mzStar.mzbText.set(this.strStart);
            this.strStart=null;
            this.start()
            
        }


        this.start = function(mzB){
            if(mzB!==undefined)this.mzStar=mzB;
            trace(this.mzStar, this.mzBlok)
            this.mzBlok.setCopy(this.mzStar)
            this.mzBlok.mzbText.textDrag.drag();            
            dcmParam.zbrosDokument=false;
            this.dtagText()
            //this.dragV(0)
            self._xv=1
            self.xv=0
        }

        this.maxTWidth=100;
        this.maxTHeight=100;
        //изменение сцены
        this.dtagText = function(){
            this.ctLeft.dragText()
           // this.labS.clear()
           // this.labS.drag()
            
            this.maxTHeight=this.mzBlok.mzbText.array.length*this._fontSize*this._lineHeight;
            this.maxTWidth=this.mzBlok.mzbText.maxSim*this._simPix;            

            this.ctCenter.dragText()
            this.drag()
        }

        this.drag = function(){
            if(this._active==false)return               
            this.panel.width=this._width;
            this.panel.height=this._height;
            this.ctCenter.drag();
            this.ctLeft.drag();
            this.ctImage2.drag();
            this.ctScrolText.drag();
        }

    


        this.getObj = function(){ 
            var o={}
            o.yv=this.yv;
            o.xv=this.xv;
            return o;
        }

        var olCT=null//обьект с сохронениями 
        this.setObj = function(o){
            if(o==null) return;
            this.yv=o.yv;
            this.xv=o.xv; 
        }


    }






    set boolText(value) {
        if (this._boolText != value) {
            this._boolText = value;
            this.ctScrolText.boolText= value;
            this.drag();                 
        }
    }
    get boolText() {
        return this._boolText;
    }  

    set boolLeft(value) {
        if (this._boolLeft != value) {
            this._boolLeft = value;
            this.ctLeft.active= value;
            this.drag()                 
        }
    }
    get boolLeft() {
        return this._boolLeft;
    }  



    set simPix(value) {
        if (this._simPix != value) {
            this._simPix = value;
            this.ctCenter.ctVeiw._simPix= value;
            this.ctCenter.ctVeiw.drag()                  
        }
    }
    get simPix() {
        return this._simPix;
    }


    set pozitY(value) {
        var yy=value
        if(yy<0)yy=0;
        if(yy>this.ctScrolText.scrollHeight.heightContent-this._height)yy=this.ctScrolText.scrollHeight.heightContent-this._height
       
        if (this._pozitY != yy) {
            this._pozitY = yy;
            this.ctCenter.pozitY= yy;
            this.ctScrolText.pozitY= yy;  
            this.ctLeft.pozitY= yy;                   
        }
    }
    get pozitY() {
        return this._pozitY;
    }
  
            
    set pozitX(value) {
        var xx=value
        if(xx<0)xx=0;
        //if(xx>this.ctScrolText.scrollHeight.heightContent-this._height)xx=this.ctScrolText.scrollHeight.heightContent-this._height
       

        if (this._pozitX != xx) {
            this._pozitX = xx;
            this.ctCenter.pozitX= xx;
            this.ctScrolText.pozitX= xx;
            this.ctImage2.pozitX= xx;                      
        }
    }
    get pozitX() {
        return this._pozitX;
    }


    set yv(value) {
        if (this._yv != value) {
            this._yv = value;
            //this.dragH(this._yv)                      
        }
    }
    get yv() {
        return this._yv;
    }

    set xv(value) {
        if (this._xv != value) {
            this._xv = value;                              
        }
    }
    get xv() {
        return this._xv;
    }

    set x(value) {this.position.x = value;  }
    get x() { return this.position.x; }
    set y(value) {this.position.y = value; }
    get y() {return this.position.y; }

    set active(value) {
        if (this._active != value) {
            this._active = value;
            trace(this.idArr+" this._active "+this._active)            
            if(this._active==true){
                this.init();
                this.drag();
                this.add(this.dCont);
               // this.div.addEventListener('mousewheel', this.mousewheel)
               // this.div.addEventListener("DOMMouseScroll", this.mousewheel);
            } else{
                this.remove(this.dCont);
               // this.div.removeEventListener('mousewheel', this.mousewheel)
                //this.div.removeEventListener('DOMMouseScroll', this.mousewheel)
            } 
            this.ctCenter.active= value;       
        }
    }
    get active() {
        return this._active;
    }


    set height(value) {
        if (this._height != value) {
            this._height = value;
            this.drag();           
        }
    }
    get height() {
        return this._height;
    }

    set width(value) {
        if (this._width != value) {
           
            this._width = value;
            this.drag();
        }
    }
    get width() {
        return this._width;
    }
}












export class CTSctolText  {
    constructor(par, fun) {         
        this.type="CTSctolText";
        var self=this;
        this.par=par;
        this.fun=fun;




            
           

            /* this.dCText2=new DCont();

            this.dCText2_1=new DCont(this.dCText2);
            this.divLit= document.createElement('div');
            this.divLit.style.position = 'fixed';
            this.divLit.style.top = '0px';
            this.divLit.style.left = '0px';
            this.divLit.style.width="300px"
            this.divLit.style.height="300px"        
            this.divLit.style.padding="8px"        
            //this.divLit.contentEditable =  "true";
            this.divLit.style.fontSize =  '2px';
            this.divLit.style.fontFamily = "Montserrat";
            this.divLit.style.display="inline";
            this.divLit.style.whiteSpace="pre-wrap"
            this.divLit.style.pointerEvents = 'none';


            this.dCText2_1.div.appendChild(this.divLit);
            this.dCText2.div.style.clip = "rect(0px 100px 100px 0px)";
            this.dScrollBarV.panel.add(this.dCText2);

    this.dScrollBarV=new DScrollBarV(this.dCont,0,0,function(){
               // self.dragV(this.value)
                self.xv=this.value
            })
          
            this.dScrollBarV.panel.boolLine=false
            this.dScrollBarV.startAlpha=0.25;
            this.dScrollBarV.sahAlpha=0.25;
            this.dScrollBarV.but.alpha=this.dScrollBarV.startAlph




var kk=this.mzBlok.mzbText.array.length*(this.fontSize+3);

            this.dScrollBarV.heightContent=kk+this._height-(this.fontSize+3)*5; 

            var hh=this.mzBlok.mzbText.array.length*(5)
            var s=hh/this.dScrollBarV.heightContent;
            this.dCText2_1.scale=s

           // this.dText.style.width=this.mzBlok.mzbText.maxSim*this.fontSize*0.8+"px";
          //  this.dText.style.height=this.panel.height+"px"



 this.dCText2.div.style.clip = "rect(0px "+(this.dScrollBarV.width-this.otstup)+"px "+hhh+"px 0px)";
            //this.dT.style.height=this.mzBlok.mzbText.array.length*this.fontSize+"px"






            */

      

    }
}