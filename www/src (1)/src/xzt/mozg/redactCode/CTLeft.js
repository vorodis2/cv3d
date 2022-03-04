import { CTLabel } from './CTLabel.js';

export class CTLeft  {
    constructor(par, fun) {         
        this.type="CTLeft";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.ot=5
        this._active=true;
        this._width=50;
        this._fontSize=par._fontSize
        this._lineHeight=par._lineHeight

        this.dCont=new DCont(this.par.dCont);
        
        this.panel=new DPanel(this.dCont);
        this.panel.width=this._width-this.ot
       
        this.dCText=new DCont(this.panel);
        this.dCText1=new DCont(this.dCText);
        this.dCText.div.style.clip = "rect(0px 50px 50px 0px)";  

        this.label=new CTLabel(this.dCText1, 0,0,"AAEAAAAKAIAAAwAgT1MvMgAAAAAAAACsAAAAWGNtYXAAfda",this)
        this.label.textAlign='right';           
        this.label.width=30;
        this.label.activMouse=false;


        this.drag=function(){
            if(this._active==false)return
            if(this.panel.height!=this.par.height){
                this.panel.height=this.par.height;
                this.dCText.div.style.clip = "rect(0px "+this._width+"px "+this.par.height+"px 0px)";
            } 
        }

        var kolOld=-1;
        this.dragText=function(){
            var kk=this.par.mzBlok.mzbText.array.length

            if(kolOld==kk){
                return
            }
            kolOld=kk;
            var s=""        
            for (var i = 0; i < kk; i++) {
                s+=""+(i+1)+"\r";
            }
            
            this.label.text=s
        } 
    }

    set pozitY(value) {
        if (this._pozitY != value) {
            this._pozitY = value;
            this.dCText1.y=-value              
        }
    }
    get pozitY() {
        return this._pozitY;
    }


    set fontSize(value) {
        if (this._fontSize != value) {
            this._fontSize = value;            
            this.label.fontSize=this._fontSize       
        }
    }
    get fontSize() {
        return this._fontSize;
    }


    set width(value) {
        if (this._width != value) {
            this._width = value;            
            this.panel.width=this._width-this.ot       
        }
    }
    get width() {
        return this._width;
    }

    set active(value) {
        if (this._active != value) {
            this._active = value;         
            if(this._active==true){                
                this.par.dCont.add(this.dCont);
                this.drag()
                this.dragText()
            } else{
                this.par.dCont.remove(this.dCont);
            }         
        }
    }
    get active() {
        return this._active;
    }
}


export class CTImage2  {
    constructor(par, fun) {         
        this.type="CTImage2";
        var self=this;
        this.par=par;
        this.fun=fun;
   
        this.dCont=new DCont(this.par.dCont);
        
        this.image=new DImage(this.dCont,this.par.ctLeft.width,0,tdStyle.lineLink,function(){
            this.width=this.picWidth;
        })          

        this.image1=new DImage(this.dCont,0,1,tdStyle.lineLink1,function(){
            this.width=this.picWidth;           
            self.drag()
        })
        this.image.activMouse=false;
        this.image1.activMouse=false;

        this.image.alpha=0   
        this.image1.alpha=0   

        var x,x1;
        this.drag=function(){       
            this.image.x=this.par.ctCenter.x;          
            this.image.height= this.par._height;
            this.image1.x=this.par.ctCenter.x+this.par.ctCenter.width-this.image1.width;          
            this.image1.height= this.par._height;

        }
    }
    set pozitX(value) {
        if (this._pozitX != value) {
            this._pozitX = value;
            var aa=this._pozitX/this.image.picWidth
            if(aa>1)aa=1
            this.image.alpha=aa                               
        }
    }
    get pozitX() {
        return this._pozitX;
    }
}



export class CTScrolText  {
    constructor(par, fun) {         
        this.type="CTScrolText";
        var self=this;
        this.par=par;
        this.fun=fun;
        this._active=true;
        this._boolText=true;
        this._width=50;
        this._fontSize=par._fontSize
        this._lineHeight=par._lineHeight
        this.otstup1=this.par.otstup1
        this._pozitX=0;
        this._pozitY=0;
        this.dCont=new DCont(this.par.dCont);

        this.panel=new DPanel(this.dCont);
        this.panel.width=this._width
        this.panel.color='#227722';
        this.panel.visible=this._boolText;
        
        this.scrollHeight=new DScrollBarV(this.dCont,this.otstup1,this.otstup1,function(){

            self.par.pozitY=(self.scrollHeight.heightContent-self.par.ctCenter.height-self.scrollHeight.minus)*(this.value/100);


        })
        this.scrollHeight.width=this.otstup1;
        this.scrollHeight.panel.boolLine=false
        this.scrollHeight.panel.color=dcmParam._color
        this.scrollHeight.but.color=dcmParam.color2
        this.scrollHeight.panel.alpha=0.5
        this.scrollHeight.boolOf=true;
        this.scrollHeight.colorffset=dcmParam._color1
        this.scrollHeight.offsetHit=this.otstup1


   
        this.scrollWidth=new DScrollBarH(this.dCont,this.otstup1,this.otstup1,function(){

            self.par.pozitX=(self.scrollWidth.widthContent-self.par.ctCenter.width-self.scrollWidth.minus)*(this.value/100);

            
        })
        this.scrollWidth.height=this.otstup1;
        this.scrollWidth.panel.boolLine=false
        this.scrollWidth.panel.color=dcmParam._color
        this.scrollWidth.but.color=dcmParam.color2
        this.scrollWidth.boolOf=true;
        this.scrollWidth.colorffset=dcmParam._color1
        this.scrollWidth.offsetHit=this.otstup1


        this.drag=function(){
            if(this._active==false)return; 

            this.scrollHeight.x=this.par._width-  this.otstup1*2;
            this.scrollHeight.heightContent=this.par.maxTHeight+this.par._height-(this._fontSize*this.par._lineHeight)*5;
            if(this.par.ctCenter.width>this.par.maxTWidth){//контент влазит в зону
                this.scrollWidth.visible=false;

                this.scrollHeight.minus=this.otstup1*2
                this.scrollHeight.height=this.par._height-  this.otstup1*2;
                this.par.pozitX=0;

            }else{
                this.scrollWidth.visible=true;
                this.scrollWidth.width=this.par._width-  this.otstup1*4;
                this.scrollWidth.y= this.par._height- this.otstup1*2;
                
                this.scrollWidth.minus=(this.par._width-this.par.ctCenter.width-  this.otstup1*4)
                this.scrollWidth.widthContent=this.par.maxTWidth+this.scrollWidth.minus;

                this.scrollHeight.minus=this.otstup1*4
                this.scrollHeight.height=this.par._height-  this.otstup1*4;


                var ww=(self.scrollWidth.widthContent-self.par.ctCenter.width-self.scrollWidth.minus)
                if(this._pozitX>ww)this.par.pozitX=ww
                

                var aa=ww/this.par.ctImage2.image1.picWidth
                if(aa>1)aa=1
                this.par.ctImage2.image1.alpha=aa 



            }
            
            


            
            
            this.panel.width=this.par._width*this.par._atWPros;
            this.panel.x=this.scrollHeight.x-this.panel.width;



        }        
    }
    set boolText(value) {
        if (this._boolText != value) {
            this._boolText = value;         
            this.panel.visible=this._boolText;       
        }
    }
    get boolText() {
        return this._boolText;
    } 

    set pozitY(value) {
        if (this._pozitY != value) {
            this._pozitY = value;
            var pp=this.pozitY/(this.scrollHeight.heightContent-this.par.ctCenter.height-this.scrollHeight.minus)*100;
            trace((this.scrollHeight.heightContent-this.par.ctCenter.height),this.scrollHeight.heightContent,this.par.ctCenter.height,this.scrollHeight.minus)
            this.scrollHeight.value=pp;                  
        }
    }
    get pozitY() {
        return this._pozitY;
    }

    set pozitX(value) {
        if (this._pozitX != value) {
            this._pozitX = value;
            var pp=this.pozitX/(this.scrollWidth.widthContent-this.par.ctCenter.width-this.scrollWidth.minus)*100;
            this.scrollWidth.value=pp;  
            trace("!!!",this._pozitX)                          
        }
    }
    get pozitX() {
        return this._pozitX;
    }


}

