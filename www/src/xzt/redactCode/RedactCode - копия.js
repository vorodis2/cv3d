
import { CodeText } from '../mozg/CodeText.js';

export class RedactCode  {
  	constructor(par, fun) {  		
  		this.type="RedactCode";
  		var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param 
        this.array=[];
        
        this.dCont=new DCont(); 

        this._index=-1

        this.sob=function(s,p,p1){

        }


        this.creat=function(){ 
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].life==false){
                    this.array[i].life=true;
                    return this.array[i]
                }
            }
            let blok;
            blok=new RDBlok(this,this.sob)
            blok.idArr=this.array.length;
            blok.life=true;
            this.array.push(blok);
            blok.sizeWin(w,h);
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
            let blok=self.creat();
            blok.life=true;
            self.index=0;
            blok.setMZBlok(self.par.mozg.kBlok)
        }, 1000);*/

        

        this.setSob = function(s,p,p1){              
            let blok=self.creat();
            self.index=blok.idArr;
            blok.setUrl(p)

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
                if(this.array[i].idArr==value)this.array[i].active=true;
                else this.array[i].active=false;
            }             
        }
    }    
    get index() { return  this._index;} 
}




import { MZBlok } from '../mozg/MZBlok.js';
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

        this._url=""; 
        this.name="";    

        this.fontSize=12;
        this.otn=50;
        this.idArr=-1


        this.clear=function(){
            this._url=""
        }


        this.button=new DButton(null,0,0,"",function(){
            self.par.index=self.idArr;
        })  

       
        this.mzBlok=new MZBlok(this, function(s,p,p1){
            if(s=="load"){
               
                self.codeText.start(this)
                return
            }
        })

        this.codeText=new CodeText(this.dCont,  0,    32,  null, function(s,p,p1){
            
        })
        this.codeText.active=true; 




        this.setUrl = function(url){
            this.url=url
            self.mzBlok.setJS("../../"+url) 

            /*mhbd.setPHP({tip:"getText",dir:"../../"+url},  function(data){
                trace(data)
                                
                //self.avtoObnova.start();
                // self.text=data; 
                //self.parsing(data);                             
            })*/

            trace(this.url);
        } 
      

    

        this.setMZBlok=function(mzB){ 

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


    set url(value) {
        if(this._url!=value){
            this._url= value;
            var a=this._url.split("/");
            this.name  =a[a.length-1];
            this.button.text=this.name;             
        }
    }    
    get url() { return  this._url;}  


    set active(value) {
        if(this._active!=value){
            this._active= value;

            if(this._active==true){                
                this.par.dCont.add(this.dCont);
                this.button.color=dcmParam.color1
            }else{
                this.par.dCont.remove(this.dCont); 
                this.button.color=dcmParam.color             
            }                
        }
    }    
    get active() { return  this._active;}  



    set life(value) {
        if(this._life!=value){
            this._life= value;            
            if(this._life==true){
                this.par.dCont.add(this.button);
                this.button.x=this.idArr*102
            }else{                
                this.par.dCont.remove(this.button);
            }           
        }
    }    
    get life() { return  this._life;} 
}