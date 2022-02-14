
import { XZ } from '../XZ.js';

export class Menu  {
  	constructor(par, fun) {  		
  		this.type="Menu";
  		var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;

        this.dCont=new DCont(par.dCont); 
        this.array=[]
        
        /*this.window=new DWindow(this.dCont,0,0,"dsgdsg");
        new DButton(this.window.content,0,0,"test",function(){
            trace("dfg",self.param);
            self.fun("test");
        });*/


        this.init = function(){  

            this.array[0]=this.mShtora=new MShtora(this,function(s,p){

            })
            this.array[1]=this.mFolders=new MFolders(this,function(s,p){

            })
            this.array[2]=this.mVisi3d=new MVisi3d(this,function(s,p){

            })

            this.mFolders.setMSBlok(this.mShtora.array[0]);

            this.mVisi3d.setMSBlok(this.mShtora.array[1]);
        }




        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            }
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].sizeWindow)this.array[i].sizeWindow(w,h,s)
            }
        }   


        this.init()
  	}
}


export class MVisi3d  {
    constructor(par, fun) {         
        this.type="MVisi3d";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        this.dCont=new DCont(); 

      

        this.dCont.div.appendChild(this.par.par.contHTML)




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




export class MFolders  {
    constructor(par, fun) {         
        this.type="MFolders";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        this.dCont=new DCont(); 

        
        this.input=new DInput(this.dCont,this.param.otstup,this.param.otstup,"../../src/xzt/Main.js",function(){

        })
        this.button=new DButton(this.dCont,this.param.otstup,this.param.otstup,"start",function(){
            
            var b = self.par.par.mozg.setJSKoren(self.input.text)

           /* var s='[{"ui":["SwitchPage.js"]'
            trace("<<s<",s);     
            var o=JSON.parse(s)
            trace("<<s<",o);*/

            /*mhbd.setPHP(
                {tip:"getFiles1",dir:self.input.text},
                function(data){ 
                    trace("<<<",data);
                    

                    var o=JSON.parse(data)
                    
                    trace("<<s<",o);
                }
            )*/
        })
        this.button.width=32

        this.mozg=this.par.par.mozg
        this.openLoad=function(bool){            
            this.setMOZBlok(this.mozg.kBlok)
        }

        setTimeout(function() {
            self.par.par.mozg.setJSKoren(self.input.text)
        }, 10);

       

        


        this.threeImp=new DThree(this.dCont,this.param.otstup,this.param.otstup*4+32,function(){
        
        })  


        this.setMOZBlok=function(mzBlok){                   
            this.setMOd(mzBlok)
            this.threeImp.setObj(mzBlok,"arrImpBlok","name")
        }

        this.setMOd=function(mzBlok){
            trace( mzBlok.name,mzBlok.uuid, mzBlok.arrImpBlok)   
            for (var i = 0; i < mzBlok.arrImpBlok.length; i++) {
                this.setMOd(mzBlok.arrImpBlok[i])
            }
        }






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
            self.button.width= w/4   
            self.input.x=self.param.otstup
            self.input.y=self.param.otstup
            self.input.width=w-self.param.otstup*3-self.button.width
            self.button.y=self.param.otstup
            self.button.x=self.param.otstup*2+self.input.width

            self.threeImp.width=w-self.param.otstup*2
            self.threeImp.height=h-self.threeImp.y-self.param.otstup
        }
    }
}




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


        this.array[0].prosent=0;
        this.array[0].prosent1=0.2;
        this.array[1].prosent=0.2;
        this.array[1].prosent1=0.8;

        this.array[2].prosent=0.8;
        this.array[2].prosent1=0.99;



        /*var www=w/s
        var ss=1/this.array.length
        for (var i = 1; i < this.array.length; i++) {
            if(i==0){
                this.array[i].prosent=i*ss;
                this.array[i].prosent1=(i+1)*ss; 
            }else{

            } 
        }*/


        this.draw=function(){
            

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
        this.array=[]

        this.prosent=0;
        this.prosent1=1;
       
        this.panel=new DPanel(this.dCont,0,0);



        this.draw=function(){
            this.panel.height=h/s-this.dCont.y-this.param.otstup
            this.panel.width=w/s*(this.prosent1-this.prosent)
            this.dCont.x=w/s*this.prosent;

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