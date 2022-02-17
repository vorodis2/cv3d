

export class MVisi3d  {
    constructor(par, fun) {         
        this.type="MVisi3d";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        this.dCont=new DCont();
        this._life = this.par._life;
      

        this.dCont.div.appendChild(this.par.par.contHTML)
        this.scane3d=this.par.par.scane3d

        this.array=[]

        this.array[0]=this.mvLeft=new MVLeft(this,function(s,p){

        })




        this.mSBlok
        this.setMSBlok=function(mSBlok){
            this.mSBlok=mSBlok;
            this.mSBlok.dCont.add(this.dCont)
            this.mSBlok.sizeWin=this.sizeWin;            

        }
        var w,h;
        this.sizeWin = function(_w,_h){  
            if(_w){
                w= _w;
                h= _h;               
            } 

            visi3D.sizeWindow(0,0,w,h); 
        }
    }
}




export class MVLeft  {
    constructor(par, fun) {         
        this.type="MVLeft";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        
        this.array=[]

        this.dragBuuton=function(){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].active){
                    this.array[i].color=dcmParam.colorActive
                }else{
                    this.array[i].color=dcmParam.color
                }
            }
        }



        this.init=function(){
            if(this.dCont!=undefined)return;
            this.dCont=new DCont(this.par.dCont); 
           
            
            trace(this.par.scane3d)


            //this.scane3d

            this.array[0]=new DButton(this.dCont,0,0," ",function(){
                this.active=!this.active;
                self.par.scane3d.life=this.active;
                self.dragBuuton()
            })
            this.array[0].active=this.par.scane3d.life;



            this.array[1]=new DButton(this.dCont,0,0," ",function(){
                this.active=!this.active;
                self.par.scane3d.debug=this.active;
                self.dragBuuton()
            })
            this.array[1].active=this.par.scane3d.debug



            this.array[2]=new DButton(this.dCont,0,0," ",function(){ 
                if(this.active==0){
                    this.active=500
                }else{
                    this.active=0
                }  
                self.par.scane3d.timeActiv=this.active;
                self.dragBuuton()
            })
            this.array[2].active=this.par.scane3d.timeActiv


            var wh=this.param.wh;
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].x=this.param.otstup
                this.array[i].y=this.param.otstup+i*(wh+this.param.otstup);
                this.array[i].width=this.array[i].height=wh;
                this.array[i].scalePic=1;

                
                let ii=this.array[i]
                mhbd.getKeyId("info",21+i,function(e){
                    if(e!=null){
                        ii.link=mhbd.getLink(e.icon)
                        mCPodskazka.setBuuton(ii,e)  
                    }                                    
                })
            }
            self.dragBuuton()

        }


        this.init()
    }
}
