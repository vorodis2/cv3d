
import { MVerh } from './MVerh.js';
import { MBILink } from '../../component/ui/MBILink.js';
import { MCPodskazka } from '../../component/ui/MCPodskazka.js';
import { MShtora } from './MShtora.js';

export class Menu  {
  	constructor(par, fun) {  		
  		this.type="Menu";
  		var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;

        this.dCont=new DCont(par.dCont); 
        this.array=[]


        this.init = function(){  

            window.mCPodskazka=this.array[5] =new MCPodskazka(this.dCont,function(s,p,p1){  


            })


            this.array[3]=this.mVerh=new MVerh(this,function(s,p){

            })


            this.array[0]=this.mShtora=new MShtora(this,function(s,p){

            })
            this.array[1]=this.mFolders=new MFolders(this,function(s,p){

            })
            this.array[2]=this.mVisi3d=new MVisi3d(this,function(s,p){

            })

            
            this.mVerh.setMShtora(this.mShtora)

            this.mFolders.setMSBlok(this.mShtora.array[0]);

            for (var i = 0; i < this.mShtora.array.length; i++) {
                if(this.mShtora.array[i].tipe=="din"){
                    this.mVisi3d.setMSBlok(this.mShtora.array[i]);
                    break
                }
            }    
            


            this.dCont.add(this.mVerh.dCont)

            window.mbILink= this.array[4] = new MBILink(this,function(s,p,p1){  


            })

            this.dCont.remove(mCPodskazka.dCont)
            this.dCont.add(mCPodskazka.dCont)
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
            this.mSBlok.content.add(this.dCont)
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

        
       /* this.input=new DInput(this.dCont,this.param.otstup,this.param.otstup,"../../src/xzt/Main.js",function(){

        })
        this.button=new DButton(this.dCont,this.param.otstup,this.param.otstup,"start",function(){
            
            var b = self.par.par.mozg.setJSKoren(self.input.text)
        })
        this.button.width=32*/

        this.panel=new DPanel(this.dCont,this.param.otstup,this.param.otstup)
        this.panel.height=32+this.param.otstup*2


        this.mozg=this.par.par.mozg
        this.openLoad=function(bool){            
            this.setMOZBlok(this.mozg.kBlok)
        }
/*
        setTimeout(function() {
            //self.par.par.mozg.setJSKoren(self.input.text)
        }, 10);*/
       

        


        this.threeImp=new DThree(this.dCont,this.param.otstup,this.param.otstup*4+32,function(){
        
        })  


        this.setMOZBlok=function(mzBlok){
            trace( mzBlok.name,mzBlok.uuid, mzBlok.arrImpBlok)                     
            this.setMOd(mzBlok)
            this.threeImp.setObj(mzBlok,"arrImpBlok","name")
        }

        this.setMOd=function(mzBlok){
             
            /*for (var i = 0; i < mzBlok.arrImpBlok.length; i++) {
                this.setMOd(mzBlok.arrImpBlok[i])
            }*/
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

            /*self.button.width= w/4   
            self.input.x=self.param.otstup
            self.input.y=self.param.otstup
            self.input.width=w-self.param.otstup*3-self.button.width
            self.button.y=self.param.otstup
            self.button.x=self.param.otstup*2+self.input.width
*/
            self.panel.width=w-self.param.otstup*2
            self.threeImp.width=w-self.param.otstup*2
            self.threeImp.height=h-self.threeImp.y-self.param.otstup
        }
    }
}

