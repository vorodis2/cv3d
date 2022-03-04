

export class CTVeiw  {
    constructor(par, fun) { 


        this.type="CTVeiw";
        var self=this;
        this.par=par;
        this.fun=fun;
        this._active=true;
        this._width=100;
        this._height=100;
        this._x=0;
        this.ot=20

        this.mzBlok=this.par.par.mzBlok;
        var ctMozg=this.par.ctMozg

        this._pozitY=0;
        this._pozitX=0;

        this._fontSize=par._fontSize;
        this._lineHeight=par._lineHeight;
        this._simPix=par.par._simPix;

        this.fsl=this._fontSize*this._lineHeight;

        this.otstup1=par.otstup1;
        this.otstup=par.otstup;
        this.dCont=new DCont(this.par.dCont);
        
        /*this.panel=new DPanel(this.dCont,0,0);
        this.panel.color='#772222';*/


        this.canvas = document.createElement('canvas'); // канвас для картинки
        this.ctx = this.canvas.getContext('2d'); // контекст картинки
        this.dCont.div.appendChild(this.canvas);
        this.dCont.x=-this.ot

        this.canvas.width=this._width+this.ot*2;
        this.canvas.height=this._height;


        this.arrayPosit=[];
        this.aPosit=[];
        this.sobPoint=function(s,p){
        }
        this.getPoint=function(){
            for (var i = 0; i < this.arrayPosit.length; i++) {
                if(this.arrayPosit[i].active==false){
                    this.arrayPosit[i].active=true
                    this.aPosit.push(this.arrayPosit[i])
                    return this.arrayPosit[i]
                }
            }
            this.arrayPosit.push(new CTVPoint(this,this.sobPoint));
            this.arrayPosit[this.arrayPosit.length-1].idArr=this.arrayPosit.length-1;
            this.arrayPosit[this.arrayPosit.length-1].active=true;
            this.aPosit.push(this.arrayPosit[this.arrayPosit.length-1]);
            return this.arrayPosit[this.arrayPosit.length-1];
        }

        var p=this.getPoint()   
        





        
        //dcmParam.addFunMove(this.par.ctVeiw.mousemove);
        //dcmParam.removeFunMove(this.par.ctVeiw.mousemove);


        this.clear = function () {
            for (var i = 0; i < this.arrayPosit.length; i++) {
                this.arrayPosit[i].active=false
            }
            this.aPosit.length=0
        }

        var pp,pp1,bbb,yy,xx,ppy,ppx,lll
        this.upDate=function(){ 
            
            if(self.rect){
               if(sp){
                    bbb = false
                    ppx=sp.x-this.rect.x;
                    ppy=sp.y-this.rect.y;
                    if(ppy<0){//увели в верх
                        pp1=self.par._pozitY+ppy/2
                        if(pp1<0)pp1=0;
                        self.par.par.pozitY=pp1;
                        var ppyy=Math.ceil(ppy/this.fsl+1)*this.fsl
                        ppy=ppyy
                        bbb=true;
                    }
                    if(ppy>this._height){//увели в низ
                        trace(ppx,ppy)
                        pp1=self.par._pozitY+(ppy-this._height)/2
                        //if(pp1<0)pp1=0;
                        self.par.par.pozitY=pp1;
                        var ppyy=Math.ceil(ppy/this.fsl+1)*this.fsl
                        ppy=ppyy
                        bbb=true;
                    }



                    if(ppx<0){//увели в лево
                       
                        
                        var xx=(ppx-this._width)/2
               
                        pp1=self.par._pozitX+(ppx)/2
                        self.par.par.pozitX=pp1;
                        //if(pp1<0)pp1=0;
                      
                        bbb=true;
                    }

                     if(ppx>this._width){//увели в лево
                        var po=(ppx-this._width)/2
                        pp1=self.par._pozitX+po                        
                        var y=Math.floor((ppy+self._pozitY)/self.fsl)
                        lll = self.mzBlok.mzbText.array[y];
                        if(lll){
                            var rr= lll.kolSim*this._simPix-self.par._pozitX+this._simPix*3;                           
                            if(ppx>rr){                                
                                pp1=(lll.kolSim*this._simPix)-rr+this._simPix*3;                              
                                bbb=true;
                            }
                        }                        
                        self.par.par.pozitX=pp1;
                        bbb=true;                        
                    }


                    

                    if(bbb){
                        self.setPos(ppx, ppy)
                    }
                }
            }           
        }
        var xzx
        this.setPos = function (_x,_y) {
            xx=Math.round((_x+self._pozitX)/self._simPix)
            yy=Math.floor((_y+self._pozitY)/self.fsl)
            if(yy>=self.mzBlok.mzbText.array.length-1)yy=self.mzBlok.mzbText.array.length-1
            var l=self.mzBlok.mzbText.array[yy]
            if(l){
                if(xx>l.kolSim-1)xx=l.kolSim-1;                
            }else{
                xx=0;
            }                        
            if(yy<0)yy=0;
            if(xx<0)xx=0;

            xzx=xx*self._simPix
            if(xzx<self._pozitX){
                self.par.pozitX=xzx
            }           


            if(self.line.line!==yy||self.line.sah!==xx){
                self.line.line=yy;
                self.line.sah=xx;
                self.drag()
            } 
        }

        this.line
        this.posit={x:0,y:0}
        this.rect = null
        this.mousedown = function (e) {           
            self.rect = self.dCont.div.getBoundingClientRect(); 
            if(!ctMozg.boolCntr)self.clear();        
            
           

            var y=Math.floor((e.offsetY+self._pozitY)/self.fsl)
            var x=Math.round((e.offsetX-self.ot+self._pozitX)/self._simPix)
            var l=self.mzBlok.mzbText.array[y]
            if(l){
                if(x>l.kolSim-1)x=l.kolSim-1;                
            }else{
                x=0;
            }
            var p = self.getPoint() 

            //self.setPos(x, y) 
            p.line=y;
            p.sah =x;

            p.l=y;
            p.s=x;
            self.line=p
           
            dcmParam.addFunMove(self.mousemove)
            //document.addEventListener('mousemove', this.mousemove);
            document.addEventListener('mouseup', self.mouseup);
                
               

                 
            
              
            self.drag()
        }

        var ss, sss,sp;
        this.mousemove = function (e) {
            
            if(sp==undefined){
                sp={}
                sp.x1= e.clientX;
                sp.y1= e.clientY;
            }
            sp.x= e.clientX;
            sp.y= e.clientY; 

            
            
            xx=e.pageX-self.rect.x
            yy=e.pageY-self.rect.y
           
            self.setPos(xx-self.ot, yy)
            
            
        }
        this.mouseup = function (e) {
            sp=undefined
            self.rect = null;
            dcmParam.removeFunMove(self.mousemove)
            //document.removeEventListener('mousemove', self.mousemove);
            document.removeEventListener('mouseup', self.mouseup);
            dcmParam.input.focus();
        }


        this.drag=function(){
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

            this.dragPoint()
        }


        this.dragPoint=function(){
            this.ctx.beginPath();
            
            
            for (var i = 0; i <  this.aPosit.length; i++) { 
                this.dPoint(this.aPosit[i])
               

            }

        }
        
        var _x,_y,_x1,_y1
        this.dPoint=function(point){
            var xx,yy, l,l1, s,s1;



            this.ctx.lineWidth="1";
            this.ctx.strokeStyle=tdStyle.objStyle["can1"].color
            this.ctx.globalAlpha = 1;
            xx=Math.round(point.sah*this._simPix-self._pozitX)
            yy=point.line*this.fsl-self._pozitY;

            this.ctx.rect(
                xx+this.ot,
                yy,
                1,
                this.fsl);

            this.ctx.rect(
                xx+this.ot,
                yy,
                1,
                this.fsl);
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.closePath();
            
            if(point.s!=point.sah || point.l!=point.line){
                if(point.line>point.l){
                    l=point.line
                    s=point.sah
                    l1=point.l
                    s1=point.s
                }
                if(point.line<point.l){
                    l1=point.line
                    s1=point.sah
                    l=point.l
                    s=point.s
                }
                if(point.line==point.l){
                    if(point.sah>point.s){
                        l=point.line
                        s=point.sah
                        l1=point.l
                        s1=point.s
                    }else{
                        l1=point.line
                        s1=point.sah
                        l=point.l
                        s=point.s
                    }                    
                }
                this.dP1(l,l1,s,s1,"#ffffff","#cccccc")
            }
        }

        this.dPTab=function(l,s,s1,c){
            this.ctx.beginPath();
            this.ctx.lineWidth="1";
            this.ctx.strokeStyle=c;
            ll=self.mzBlok.mzbText.array[l]

            _x=Math.round(s*this._simPix-self._pozitX)
            _x1=Math.round(s1*this._simPix-self._pozitX)
            _y=Math.round(l*this.fsl-self._pozitY);

            ll.korTab()
           /* trace(ll.idArr+'='+ll.text)
            for (var i = 0; i < ll.text.length; i++) {
                trace(i,"="+ll.text[i]+"=")
            }*/

            this.ctx.moveTo(_x+this.ot, _y);
            this.ctx.lineTo(_x1+this.ot, _y)

            this.ctx.stroke();
            this.ctx.fill();
        }

        var ll,xxd
        this.dP1=function(l,l1,s,s1,c,c1){
            this.ctx.beginPath();
            this.ctx.lineWidth="1";
            this.ctx.strokeStyle=c 
            this.ctx.fillStyle = c1;
            this.ctx.globalAlpha = 0.25;
            
            
            if(l==l1){// в одной строчке
                this.dPTab(l,s,s1,c)
                _x=Math.round(s*this._simPix-self._pozitX)
                _x1=Math.round(s1*this._simPix-self._pozitX)
                _y=Math.round(l*this.fsl-self._pozitY); 
                _y1=Math.round((l+1)*this.fsl-self._pozitY); 
                this.ctx.moveTo(_x+this.ot, _y);
                this.ctx.lineTo(_x1+this.ot, _y); 
                this.ctx.lineTo(_x1+this.ot, _y1);
                this.ctx.lineTo(_x+this.ot, _y1);
                this.ctx.lineTo(_x+this.ot, _y);
            } else{// в нескольких строчках

                for (var i = l1; i <= l; i++) {
                    ll=self.mzBlok.mzbText.array[i]
                    _x=Math.round(ll.kolSim*this._simPix-self._pozitX)
                    _y=Math.round(i*this.fsl-self._pozitY); 
                    _y1=Math.round((i+1)*this.fsl-self._pozitY); 
                    
                    if(i==l){

                        _x=Math.round(s*this._simPix-self._pozitX)
                    }
                    
                    if(i==l1){
                        this.ctx.moveTo(_x+this.ot, _y);
                        xxd=_x
                    }
                    else this.ctx.lineTo(_x+this.ot, _y);
                    this.ctx.lineTo(_x+this.ot, _y1);
                }

                for (var i = l; i >= l1; i--) {
                    _x=Math.round(0)//self._pozitX)
                    _y=Math.round(i*this.fsl-self._pozitY); 
                    _y1=Math.round((i+1)*this.fsl-self._pozitY);

                    if(i==l1){

                        _x=Math.round(s1*this._simPix-self._pozitX)
                    }
                    this.ctx.lineTo(_x+this.ot, _y1);
                    this.ctx.lineTo(_x+this.ot, _y);
                }
                this.ctx.lineTo(xxd+this.ot, _y);
            }        
            this.ctx.stroke();
            this.ctx.fill();
            
        }

    }


    set pozitY(value) {
        if (this._pozitY != value) {
            this._pozitY = value;
            this.drag()        
        }
    }
    get pozitY() {
        return this._pozitY;
    }

    set pozitX(value) {
        if (this._pozitX != value) {
            this._pozitX = value;
            this.drag()
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



    set width(value) {
        if (this._width != value) {
            this._width = value;
            this.canvas.width = value+this.ot*2;;
            this.drag()
        }
    }
    get width() {
        return this._width;
    }

    set height(value) {
        if (this._height != value) {
            this._height = value; 
            this.canvas.height  = value;
            this.drag()          
           // this.panel.height=this._height
        }
    }
    get height() {
        return this._height;
    }    

    set active(value) {
        if (this._active != value) {
            this._active = value;         
        }
    }
    get active() {
        return this._active;
    }
}

export class CTVPoint  {
    constructor(par, fun) {         
        this.type="CTVPoint";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.active=false;


        this.line=0;
        this.sah=0;
        this.sOld=0;

        this.l=0;
        this.s=0;

    }
}


