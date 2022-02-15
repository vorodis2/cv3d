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
            this.array.push(new MSBlok(this,this.sob));
            this.array[this.array.length-1].idArr=this.array[this.array.length-1];
        }

        this.plus("xz","key",1, 0.2);    
        this.plus("xz","key",1, 0.6);   
        this.plus("xz","key",1, 0.2);


        
        this.array[0].prosentW=0.2;        
        this.array[1].prosentW=0.6;
        this.array[2].prosentW=0.2;
        


        


        this.draw=function(idBlok){
            if(w==undefined)return
            var www=w/s
            var ss=1/this.array.length
            this.array[0].prosent=0;
            this.array[0].prosent1=this.array[0].prosentW;

            for (var i = 1; i < this.array.length; i++) {
                this.array[i].prosent=this.array[i-1].prosent1;
                this.array[i].prosent1=this.array[i].prosent+this.array[i].prosentW;
                for (var j = 1; j < this.array.length; j++) {
                    if (j!==i) {
                        var s=(1-this.array[i-1].prosent)/(this.array.length-1)                        
                        this.array[j].prosent=this.array[j-1].prosent1;
                        this.array[j].prosent1=this.array[j].prosent+this.array[j].prosentW*s+ss;
                    }
                }
            }

            this.array[this.array.length-1].prosent=1-this.array[this.array.length-1].prosentW*s+ss;
            this.array[this.array.length-1].prosent1=1;

            for (var i = 0; i < this.array.length; i++) {
                this.array[i].draw()
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
    constructor(par, fun) {         
        this.type="MShtora";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;

        this.dCont=new DCont(par.dCont); 

        this.dCont.y=30+this.param.otstup*4
        this.prosentW =0.2 

        this.prosent=0;
        this.prosent1=1;

        this.panel=new DPanel(this.dCont,0,0);
        this.content=new DCont(this.dCont); 

        this.button=new DButton(this.dCont,0,0);


        var xxx=0
        var x, x1
        var sp=undefined;

        this.mousemove=function(e){
            if(dcmParam.mobile==false){
                if(sp==undefined){
                    sp={                    
                        x:e.clientX,
                        prosent:self.prosent,
                        prosent1:self.prosent1,
                        prosentW:self.prosentW 
                    };
                }  
                sp.xs=e.clientX         
            }else{
                if(sp==undefined){
                    sp={                    
                        x:e.targetTouches[0].clientX,
                        prosent:self.prosent,
                        prosent1:self.prosent1,
                        prosentW:self.prosentW 
                    };
                }
                sp.xs=e.targetTouches[0].clientX
            }
            sp.xxx=(sp.x-sp.xs); 


            self.drag()
        }

        this.mouseup = function(){
            window.removeEventListener("mouseup", self.mouseup);
            dcmParam.removeFunMove(self.mousemove) 
        }

        this.button.fun_mousedown = function(){
            dcmParam.addFunMove(self.mousemove)
            window.addEventListener("mouseup", self.mouseup);
            trace('fun_mousedown')
        };

        this.button.fun_mouseover = function(){
            trace('fun_mouseover')
            self.button.panel1.div.style.cursor = 'ew-resize';
        };


        this.button.width=this.param.otstup;

        this.drag=function(){

            var pp=sp.prosentW-sp.xxx/(w)
            this.prosentW=pp

            this.par.draw(this.idArr)
        }

        this.draw=function(){
            this.panel.height=h/s-this.dCont.y-this.param.otstup
            this.panel.width=w/s*(this.prosent1-this.prosent)
            this.dCont.x=w/s*this.prosent;

            this.button.height=this.panel.height
            this.button.x=this.panel.width-this.param.otstup


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
}