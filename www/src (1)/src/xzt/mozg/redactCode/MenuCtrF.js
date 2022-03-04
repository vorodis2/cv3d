

export class MenuCtrF  {
    constructor(par, fun) {         
        this.type="MenuCtrF";
        var self=this;
        this.par=par;
        this.fun=fun;
        this._active=true;
        this._width = 100;
        this._height = 32;
       

        this._active=false;

        this._fontSize=dcmParam.fontSize
        this._lineHeight=par._lineHeight;
        this.otstup1=par.otstup1;
        this.otstup=2;

        this.dCont1=new DCont(this.par.dCont);
        this.dCont=new DCont();
        
        this.panel=new DPanel(this.dCont,0,0);
        this.panel.width=this._width;
        this.panel.height=this._height;
        //this.panel.color=dcmParam.color1

        this.sob=function(s,p){
            if(this.idArr==4){
                self.active=false
                self.fun("active");
            }
        }    

        this.arrComp=[]
        this.arrComp[0]=new DButton(this.panel,this.otstup,this.otstup,"",this.sob);
        this.arrComp[1]=new DInput(this.panel, this.otstup*2+28, this.otstup, "",this.sob);
        this.arrComp[1].timeFun=1;
        this.arrComp[1].textAlign="left"
        this.arrComp[1].color1=dcmParam.color2
        this.arrComp[2]=new DButton(this.panel,this.otstup,this.otstup,"",this.sob);
        this.arrComp[3]=new DButton(this.panel,this.otstup,this.otstup,"",this.sob);
        this.arrComp[4]=new DButton(this.panel,this.otstup,this.otstup,"",this.sob);


        for (var i = 0; i < this.arrComp.length; i++) {
            this.arrComp[i].width=this.arrComp[i].height=28
            if(i==4)this.arrComp[i].width=this.arrComp[i].height=22
            this.arrComp[i].idArr=i

            //this.panel.addD(this.arrComp[i],2)
        }

        

        var xx,xx1
        this.drag=function(){           
            this.arrComp[4].x=this._width-this.arrComp[4].width-this.otstup
            this.arrComp[3].x=this.arrComp[4].x-this.arrComp[3].width-this.otstup
            this.arrComp[2].x=this.arrComp[3].x-this.arrComp[2].width-this.otstup
            this.arrComp[1].width=(this.arrComp[2].x-this.otstup)-this.arrComp[1].x
        }


        this.getObj = function(){ 
            var o={}
            o.active=this.active
            return o;
        }

        var olCT=null//обьект с сохронениями 
        this.setObj = function(o){ 
            if(!o)return
            this.active=o.active;            
        }


       
    }











    set width(value) {
        if (this._width != value) {
            this._width = value;            
            this.panel.width=this._width 
            this.drag()          
        }
    }
    get width() {
        return this._width;
    }

    set height(value) {
        if (this._height != value) {
            this._height = value;            
            this.panel.height=this._height           
        }
    }
    get height() {
        return this._height;
    }    

    set active(value) {
        if (this._active != value) {
            this._active = value;  
            if(value){
                this.dCont1.add(this.dCont)
        
            }   else{
                this.dCont1.remove(this.dCont)
            }    
              
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
                return false
            //}
        }
       

    }


    set active(value) {
        if (this._active != value) {
            this._active = value; 
            
            if(this._active==true){
          
                this.par.par.dCont.div.addEventListener('mousewheel', this.mousewheel)
                this.par.par.dCont.div.addEventListener("DOMMouseScroll", this.mousewheel);
                
                this.par.dCont.div.addEventListener('mousedown', this.par.ctVeiw.mousedown);

                
               

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