
import { CodeText } from './CodeText.js';

import { MenuCtrF } from './MenuCtrF.js';

export class RedactCode  {
  	constructor(par, fun) {  		
  		this.type="RedactCode";
  		var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param 
        this.array=[];
        
        this.dCont=new DCont(); 

        this._index=-1;


        this.menuCtrF=new MenuCtrF(this,function(s,p){
            if(s=="active"){
                self.sizeWin()
                self.saveTimeLoacl()
            }
        })
        this.menuCtrF.active=true

        //события из блока хронения
        this.sob=function(s,p,p1){
            if(s=="saveTimeLoacl"){
                self.saveTimeLoacl()
            }
            if(s=="index"){
                self.index=p
                self.saveTimeLoacl()
            }
            if(s=="openF"){
                trace("fgdfg")
                self.menuCtrF.active=true;
                self.sizeWin()
                self.saveTimeLoacl()
            }
        }


        //создоем блок текста
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

    
        //соб от родителя
        this.setSob = function(s,p,p1){            
            for (var i = 0; i < this.array.length; i++) {//урла уже открыта                
                if(this.array[i].life==true){                    
                    if(this.array[i].url==p){ 
                        this.index=this.array[i].idArr
                        return;                       
                    }
                }                
            }

            let blok=self.creat();
            self.index=blok.idArr;
            blok.setUrl(p);
            this.saveTimeLoacl()
        }

        //запоминаем открытые файлы и их состояние
        this.saveTimeLoacl= function(){
            var o={
                index:this.index,
                menuCtrF:this.menuCtrF.getObj(),
                array:[]
            }
            for (var i = 0; i < this.array.length; i++) {                
                if(this.array[i].life==true){  
                    o.array.push(this.array[i].getObj())
                }
            }
            localS.object["p_RedactCode.arrSave"]=o
            localS.save()
        }

        //открываем открытые файлы
        if(localS.object["p_RedactCode.arrSave"]!=undefined){
            var o=localS.object["p_RedactCode.arrSave"];
            for (var i = 0; i < o.array.length; i++) {                
                let blok=self.creat();
                blok.setObj(o.array[i])
            }
            this.index=o.index
            this.menuCtrF.setObj(o.menuCtrF)
        }


        this.mSBlok
        this.setMSBlok = function(mSBlok){
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
            var hh=h;
            if(self.menuCtrF.active==true){
                hh-=self.menuCtrF.height;
                self.menuCtrF.dCont.y=hh;
                self.menuCtrF.width=w
            }


            for (var i = 0; i < self.array.length; i++) {
                self.array[i].sizeWin(w,hh)
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




import { MZBlok } from '../../mozg/MZBlok.js';
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
            self.fun("index",self.idArr)
         
        })  

       
        this.mzBlok=new MZBlok(this, function(s,p,p1){
            if(s=="load"){               
                self.codeText.start(this)
                self.codeText.setObj(olCT)
                olCT=null
                return
            }
        })

        this.codeText=new CodeText(this.dCont,  0,    32,  null, function(s,p,p1){
            if(s=="openF"){
                trace("fgsdfsdfsdfsdfdfg")
                self.fun(s,p,p1)
            }
        })
        this.codeText.init()
         




        this.setUrl = function(url){
            this.url=url
            self.mzBlok.setJS("../../"+url) 
        } 
      

    

        this.setMZBlok=function(mzB){ 
            this.codeText.start(mzB)
        }


        this.getObj = function(){ 
            var o={}
            o.url=this.url;
            o.codeText=this.codeText.getObj()
            return o;
        }

        var olCT=null//обьект с сохронениями 
        this.setObj = function(o){ 
            olCT=o.codeText
            this.setUrl(o.url); 
        }



        this.pros=0.2;
        this.drag = function(){ 
            if(w==undefined)return
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
            trace(this.idArr+" this._active @@"+this._active) 
            if(this._active==true){                
                this.par.dCont.add(this.dCont);
                this.button.color=dcmParam.color1
            }else{
                this.par.dCont.remove(this.dCont); 
                this.button.color=dcmParam.color             
            } 
            this.codeText.active=value;               
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