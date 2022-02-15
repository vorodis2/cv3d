export class MShtora  {
    constructor(par, fun) {         
        this.type="MShtora";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;

        this.dCont=new DCont(par.dCont); 

        this.array=[]

        this.sob=function(s,p){

        }


        this.plus=function(type, key, id, widthProsent){
            this.array.push(new MSBlok(this,this.sob,type, key, id, widthProsent)); 
            this.array[this.array.length-1].active=true
            this.array[this.array.length-1].idArr=this.array[this.array.length-1];
        }

        this.plus("xz","key",1, 200);   //дерево 
       // this.plus("xz","key",1, 200);   //код 
        this.plus("din","key",1);       //3д 
        this.plus("static","key",1, 300)   //интерфейс

        //for (var i = 0; i < this.array.length-1; i++) {  //делаю прозрачными кнопки
            //this.array[i].button.alpha=0.5
            //this.array[i].button.boolFond=false
        //}

        //this.array[this.array.length-1].button.visible=false  //делаю нивидимой последнюю кнопку-полосу


        this.draw=function(idBlok){

            var ww=w/s-this.param.otstup;
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].active==true){
                    ww-=this.param.otstup;
                    if(this.array[i].tipe=="xz" || this.array[i].tipe=="static"){
                        ww-=this.array[i].width;
                    }
                }
            }
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].active==true){
                    if(this.array[i].tipe=="din"){
                        this.array[i].width=ww
                    }
                }
            }


            var xx=this.param.otstup;
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].x=xx;
                xx+=this.array[i].width+this.param.otstup;
            }
        }

        

        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            } 
            this.draw() 
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].sizeWindow)this.array[i].sizeWindow(w,h,s)
            }           
        } 
        
    }
}

export class MSBlok  {
    constructor(par, fun, tipe, key, id, widthProsent) {         
        this.type="MShtora";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;

        this.tipe=tipe
        this.key=key
        this.id=id
        this.widthProsent=widthProsent

        this._x=0;
        
        this._width=200;
        if(tipe=="static")
            this._width=widthProsent;
        this._active=false;

        this.dCont=new DCont(); 

        this.dCont.y=30+this.param.otstup*4
        

       

        this.panel=new DPanel(this.dCont,this.param.otstup,0);
        this.content=new DCont(this.dCont);
        this.button=new DButton(this.dCont,this._width,0);
        this.button.width=this.param.otstup*2

        this.chek=new DCheckBox(this.dCont,20,200,"test",function(){
            self.active = this.value
            self.par.draw()
        })

        var xxx=0
        var x, x1
        var sp=undefined;

        this.mousemove=function(e){
            if(dcmParam.mobile==false){
                if(sp==undefined){
                    sp={                    
                        x:e.clientX,
                        width:self.width,
                        prosent1:self.prosent1,
                        prosentW:self.prosentW 
                    };
                }  
                sp.xs=e.clientX         
            }else{
                if(sp==undefined){
                    sp={                    
                        x:e.targetTouches[0].clientX,
                        width:self.width,
                        prosent1:self.prosent1,
                        prosentW:self.prosentW 
                    };
                }
                sp.xs=e.targetTouches[0].clientX
            }
            sp.xxx=(sp.x-sp.xs); 
            self.drag();
        }

        this.mouseup = function(){
            window.removeEventListener("mouseup", self.mouseup);
            dcmParam.removeFunMove(self.mousemove) 
        }

        this.button.fun_mousedown = function(){
            dcmParam.addFunMove(self.mousemove)
            window.addEventListener("mouseup", self.mouseup);
           
        };

        this.button.fun_mouseover = function(){          
            self.button.panel1.div.style.cursor = 'ew-resize';
        };


        this.button.width=this.param.otstup;

        this.drag=function(){

            var pp=sp.width-sp.xxx
            this.width=pp

            this.par.draw(this.idArr)
        }

        this.draw=function(){
            var xx=this.param.otstup
            this.panel.height=h/s-this.dCont.y-this.param.otstup
            this.panel.width=this._width;
            this.button.x=this._width;   

        

            this.button.height=this.panel.height

            
            


            if(this.sizeWin)this.sizeWin(this.panel.width,this.panel.height)

        }
        this.sizeWin = undefined

        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            }  
            this.draw()
        }  
    }

    set active(value) {
        if (this._active != value) {
            this._active = value;
            if(this._active==true){
                this.par.dCont.add(this.dCont)
            }else{
                this.par.dCont.remove(this.dCont)
            }

            this.draw()    
        }
    }
    get active() {
        return this._active;
    }

    set width(value) {
        if (this._width != value) {
            this._width = value; 
            this.draw()    
        }
    }
    get width() {
        return this._width;
    }

    set x(value) {
        if (this._x != value) {
            this._x = value; 
            this.dCont.x =this._x;         
        }
    }
    get x() {
        return this._x;
    }
}