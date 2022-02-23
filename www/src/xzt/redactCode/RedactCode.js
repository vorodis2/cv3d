
import { CodeText } from '../mozg/CodeText.js';

export class RedactCode  {
  	constructor(par, fun) {  		
  		this.type="RedactCode";
  		var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param 
        this.array=[];
        this.arrayCech=[]
        this.dCont=new DCont(); 

        this._index=-1

        this.sob=function(s,p,p1){

        }


        this.creat=function(){
            let blok
            if(this.arrayCech[this.array.length]==undefined){
                this.arrayCech[this.array.length]=new RDBlok(this,this.sob)
                this.arrayCech[this.array.length].idArr=this.array.length 
            }
            blok=this.arrayCech[this.array.length]
            this.array.push(blok)
            blok.sizeWin(w,h)
            return blok;
        }



        this.openLoad=function(p){
            
           /* var o={tip:"getFiles1",dir:"../../"}

            mhbd.setPHP(o,function(date){
                
                var oo=JSON.parse(date)
                trace(oo,date)
            })*/
        }

        this.openLoad2=function(p){


        }


/*
        setTimeout(function() {
            let blok=self.creat()
            blok.life=true;
            self.index=0;
            blok.setMZBlok(self.par.mozg.kBlok)
        }, 1000);*/

        




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
            trace(w)
            for (var i = 0; i < self.array.length; i++) {

                self.array[i].sizeWin(w,h)
            }
        }

       
        this.setMSBlok(par.menu.mShtora.array[1])

    }
    set index(value) {
        if(this._index!=value){
            this._index= value;            
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].idArr==value)this.array[i].active=true
                else this.array[i].active=false
            }             
        }
    }    
    get index() { return  this._index;} 
}



export class RDBlok  {
    constructor(par, fun) {         
        this.type="RedactCode";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        this.dCont=new DCont();
        this.idArr=-1;

        this._active=false;
        this._life=false;    

        this.fontSize=12;
        this.otn=50;


        this.button=new DButton(null,0,0,"",function(){

        })  

        this.codeText=new CodeText(this.dCont,  0,    32,  null, function(s,p){

        })
        this.codeText.active=true;   
      

    

        this.setMZBlok=function(mzB){
            trace(mzB)
            
            this.codeText.start(mzB)

        }





        this.pros=0.2;
        this.drag = function(){ 
            this.codeText.width=w;
            this.codeText.height=h-32;
        }


        var w,h;
        this.sizeWin = function(_w,_h){  
            if(_w){
                w= _w;
                h= _h;               
            } 
            this.drag()
         
        }

    }



    set active(value) {
        if(this._active!=value){
            this._active= value;            
                         
        }
    }    
    get active() { return  this._active;}  



    set life(value) {
        if(this._life!=value){
            this._life= value;            
            if(this._life==true){
                this.par.dCont.add(this.button);
                this.par.dCont.add(this.dCont);
            }else{
                this.par.dCont.remove(this.dCont);
                this.par.dCont.remove(this.button);
            }           
        }
    }    
    get life() { return  this._life;} 
}