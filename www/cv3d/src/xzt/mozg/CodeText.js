import { MZBlok } from '../mozg/MZBlok.js';
import { TDStyle } from './TDStyle.js';
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
        

        
        this.otstup=2;
        this.otstup1=5;
        this.fontSize=12
        this.otn=50;
        this.pros=0.1

        this._width = 300;
        this._height = 300;
        this.x = _x || 0;
        this.y = _y || 0; 
        this.text = _text || null;    

        this.mzBlok=undefined //редактируемый
        this.mzStar=undefined //ночальный
        this.strStart=_text

        this.dCont=undefined

        this.dScrollBarH=undefined
        this.dScrollBarV=undefined

        this.init = function(){
            if(this.dCont!=undefined)return
            this.dCont=new DCont(); 

            this.panel=new DPanel(this.dCont, 0);
            this.panel.boolLine=false



            this.dCT=new DCont(this.panel);
            this.dCT1=new DCont(this.dCT);            
            this.dCT.div.style.clip = "rect(0px 100px 100px 0px)";  



            this.lNum=new CTLabel(this.dCT1)
            this.lNum.textAlign='right';           
            this.lNum.width=(this.otn-20);
            this.lNum.activMouse=false;




            


            









            this.dCText=new DCont(this.panel);
            this.dCText1=new DCont(this.dCText);
            this.dCText.x= this.otn;
            this.dCText.div.style.clip = "rect(0px 100px 100px 0px)";  

           

            this.mzBlok=new MZBlok(this, this.sobBlok)
            this.labS=new LABS(this.dCText1,this)


           /* this.dText= document.createElement('div');

            this.dText.style.position = 'fixed';
            this.dText.style.top = '0px';
            this.dText.style.left = '0px';
            this.dText.style.width="300px"
            this.dText.style.height="300px"        
            this.dText.style.padding="0px"  

            this.dText.contentEditable =  "true";

            this.dText.style.fontSize =  this.fontSize+'px';
            this.dText.style.fontFamily = "Montserrat";
            //this.dText.style.display="inline";
            this.dText.style.whiteSpace="pre-wrap";


            this.dCText1.div.appendChild(this.dText);*/
        



            this.dScrollBarV=new DScrollBarV(this.dCont,0,0,function(){
                self.dragV(this.value)
            })
          
            this.dScrollBarV.panel.boolLine=false
            this.dScrollBarV.startAlpha=0.25;
            this.dScrollBarV.sahAlpha=0.25;
            this.dScrollBarV.but.alpha=this.dScrollBarV.startAlpha;
       
            this.dScrollBarH=new DScrollBarH(this.dCont,this.otstup1,0,function(){
                self.dragH(this.value)
            })
            this.dScrollBarH.height=this.otstup1;
            this.dScrollBarH.panel.boolLine=false
            this.dScrollBarH.panel.color=dcmParam._color
            this.dScrollBarH.panel.alpha=0.5

            this.dScrollBarH.boolOf=true;
            this.dScrollBarH.colorffset=dcmParam._color1
            this.dScrollBarH.offsetHit=this.otstup1//this.otstup


            
           

             this.dCText2=new DCont();

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

      






            this.image=new DImage(this.dCText,0,0,tdStyle.lineLink,function(){
                this.width=this.picWidth;
            })
          

            this.image1=new DImage(this.dScrollBarV.panel,0,0,tdStyle.lineLink1,function(){
                this.width=this.picWidth;
                this.x=-this.picWidth
            })
           


            
            if(this.strStart!=null)this.setCode2()
        }


        this.dragH=function(v){//0**100
            if(v<0)v=0
            if(v>100)v=100   

            var www=(self.dScrollBarH.width-self.dScrollBarH.widthContent)
            var xx=www*v/100             
            self.dCText1.x= xx
            self.dScrollBarH.value=v
            var aa=1-(50+xx)/50;
            if(aa>1)aa=1            
            self.image.alpha=aa
                   
            var xx1=www-xx;    
            var aa1=1-(50+xx1)/50;
           // if(aa>1)aa=1            
            self.image1.alpha=aa1;            
        } 

        this.dragV=function(v){//0**100
            if(v<0)v=0;
            if(v>100)v=100; 
            

            var yy=(self.dScrollBarV.height-self.dScrollBarV.heightContent)*v/100         
            self.dCText1.y= yy;
            self.dCT1.y= yy;
            self.labS.yyy=-yy
            self.dScrollBarV.value=v;
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
            this.mzBlok.setCopy(this.mzStar)
            this.mzBlok.mzbText.textDrag.drag();            
            dcmParam.zbrosDokument=false;
            this.dtagText()
            this.dragV(0)
        }


        this.dtagText = function(){
           // this.dText.innerHTML = this.mzBlok.mzbText.textDrag.text;
            this.divLit.innerHTML = this.mzBlok.mzbText.textDrag.text; 

            trace(this.mzBlok.mzbText.array)        

   
            var kk=this.mzBlok.mzbText.array.length
            var s=""        
            for (var i = 0; i < kk; i++) {
                s+=""+(i+1)+"\r";
            }
            
            this.lNum.text=s
            //this.dT.innerHTML=s

            this.labS.clear()
            this.labS.drag()

            this.dtagText2();
            this.dragH(0) 

            


        } 



        this.dtagText2 = function(){

            if(this.mzBlok==undefined)return
            this.image.height= this._height;   

            this.dScrollBarV.width=this._width*this.pros;
            this.dScrollBarV.x=this._width-this.dScrollBarV.width;
            
            var kk=this.mzBlok.mzbText.array.length*(this.fontSize+3);

            this.dScrollBarV.heightContent=kk+this._height-(this.fontSize+3)*5; 

            var hh=this.mzBlok.mzbText.array.length*(5)
            var s=hh/this.dScrollBarV.heightContent;
           // this.dCText2_1.scale=s

           // this.dText.style.width=this.mzBlok.mzbText.maxSim*this.fontSize*0.8+"px";
          //  this.dText.style.height=this.panel.height+"px"

            var ww=this._width*(1-this.pros)-this.otn;
            var hh=this._height-this.otstup
            this.dCText.div.style.clip = "rect(-30px "+ww+"px "+(hh+60)+"px 0px)";


            this.dScrollBarH.y=this._height-this.otstup1*2//-this.otstup;
            this.dScrollBarH.width=this._width-this.otstup1*2;
            this.dScrollBarH.widthContent=this.mzBlok.mzbText.maxSim*this.fontSize*0.56+ this.dScrollBarV.width+ this.otn 

            if(this.dScrollBarH.width>this.dScrollBarH.widthContent){
                this.dScrollBarH.visible=false
            }else{
                this.dScrollBarH.visible=true
            }

            var hhh=this._height-this.otstup1-this.otstup
            if(this.dScrollBarH.visible==true){                  
            }else{
                hhh=this._height;               
            }

            this.dScrollBarV.height=this._height      
            this.image1.height= this._height; 


            this.dCText2.div.style.clip = "rect(0px "+(this.dScrollBarV.width-this.otstup)+"px "+hhh+"px 0px)";
            //this.dT.style.height=this.mzBlok.mzbText.array.length*this.fontSize+"px"
            this.dCT.div.style.clip = "rect(0px "+(this.otn)+"px "+hhh+"px 0px)";
            

            this.labS.height=this._height 

           // this.dCText2.div.style.clip = "rect(0px "+(ww/2)+"px "+hhh+"px 0px)";              
        }

        this.drag = function(){
            if(this._active==false)return               
            this.panel.width=this._width;
            this.panel.height=this._height;
            this.dtagText2();
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
            p=delta;
            var hh=self.dScrollBarV.value+p

            self.dragV(hh)
        };

    }

    set x(value) {this.position.x = value;  }
    get x() { return this.position.x; }
    set y(value) {this.position.y = value; }
    get y() {return this.position.y; }

    set active(value) {
        if (this._active != value) {
            this._active = value;
            if(this._active==true){
                this.init();
                this.drag();
                this.add(this.dCont);
                this.div.addEventListener('mousewheel', this.mousewheel)
                this.div.addEventListener("DOMMouseScroll", this.mousewheel);
            } else{
                this.ramove(this.dCont);
                this.div.removeEventListener('mousewheel', this.mousewheel)
                this.div.removeEventListener('DOMMouseScroll', this.mousewheel)
            }         
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

export class CTLabel extends DLabel {
    constructor(dCont, _x, _y, _text) {
        super(dCont, _x, _y, _text);
        this.type = 'CTLabel';//qwertyuiop[]asdfghjkl;'zxcvbnm,./йцукенгшщзфывапролджЙЦУКЕНГШЩЗ'
        this.dCT.div.style.display="inline";
        this.dCT.div.style.whiteSpace="pre-wrap"
        //this.dCT.div.style.fontFamily="Titillium Web"
    }
     set text(value) {
        if (this._text != value) {
            this._text = value;
            this._value = value;
        
            this.dCT.div.innerHTML = this._text;
            if (this.dCT1) this.dCT1.div.innerHTML = this._text;
        }
    }
    get text() {
        return this._text;
    }
    set value(value) {
        if (this._value != value) {
            this._value = value;
            this.text = value;
        }
    }
    get value() {
        return this._text;
    }
}




export class LABS {
    constructor(dCont,par) {
        this.type = 'LABS';
        this.array=[];
        this.dCont=new DCont(dCont);
        this.par=par;
        this._heightS=20
        this._height=100;
              
        this._yyy=0;
        this.sah=15;
        this._yS=0;
        this.clear=function () {
            for (var i = 0; i < this.array.length; i++) this.array[i].visible=false
        }

        this.getO=function(){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].visible==false){
                    this.array[i].visible=true
                    return this.array[i];
                }
            }

            this.array.push(new CTLabel(this.dCont))
            this.array[this.array.length-1].sahPo=0
            this.array[this.array.length-1].idArr=this.array.length-1
            this.array[this.array.length-1].width=9999
            this.array[this.array.length-1].activMouse=false
            return this.array[this.array.length-1];
        }


        this.getOPos=function(idPo){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].visible!==false){
                    if(this.array[i].idPo==idPo){
                        return this.array[i];
                    }
                }
            }
            return null;
        }

        this.drag=function(){
            var mm=this._yS+this._heightS
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].visible!==false){
                    if(this.array[i].idPo<this._yS)this.array[i].visible=false
                    if(this.array[i].idPo>mm)this.array[i].visible=false    
                }
            }

            var yS=this._yS;
            let oo
            var s1,a
            for (var i = 0; i < this._heightS; i++) {
                oo= this.getOPos(yS+i)
                if(oo==null){
                    oo=this.getO()
                    oo.idPo=yS+i;
                    oo.y=oo.idPo*this.sah;
                    oo.sahPo++
                    s1=""                    

                    if(this.par.mzBlok.mzbText.array[oo.idPo]){
                        s1=this.par.mzBlok.mzbText.array[oo.idPo].text  
                        trace(">>>"+oo.idPo+" "+s1+" ",this.par.mzBlok.mzbText.array[oo.idPo].array,this.par.mzBlok.mzbText.array[oo.idPo].text)                      
                    }
                    
                    
                    oo.text=s1//(oo.idPo)+" "+oo.idArr+" "+ oo.sahPo+" + "+this.array.length//++"        "+

                }
            }
        } 
    }

   set heightS(value) {
        if (this._heightS != value) {
            this._heightS = value;
            this.drag()
             
        }
    }
    get heightS() {
        return this._heightS;
    }


    set height(value) {
        if (this._height != value) {
            this._height = value;
            var _height=Math.ceil((this._height+this.sah)/this.sah)
            this.heightS =_height
        }
    }
        get height() {
        return this._height;
    }




    set yS(yS) {
        if (this._yS != yS) {
            this._yS = yS;
            this.drag();  
        }
    }
    get yS() {
        return this._yS;
    }

    set yyy(yyy) {
        if (this._yyy != yyy) {
            this._yyy = yyy;
            var yS=Math.floor(this._yyy/this.sah)
            this.yS=yS;
        }
    }
    get yyy() {
        return this._yyy;
    }
}

