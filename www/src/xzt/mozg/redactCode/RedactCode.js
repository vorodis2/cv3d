
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
        this.dCont1= new DCont(this.dCont); 
        this.dCont1.x=50
        this.dCont2= new DCont(this.dCont); 
        

        this._index=-1;

        this.menuCtrF=new MenuCtrF(this,function(s,p){
            if(s=="active"){
                self.sizeWin();
                self.saveTimeLoacl();
            }
        })
        this.menuCtrF.active=true;

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
                self.sizeWin();
                self.saveTimeLoacl();
            }
            if(s=="closed"){
                self.array[p].active=false;
                self.array[p].life=false;
                for (var i = 0; i < self.array.length; i++) {
                    if(self.array[i].life!==false){
                        self.index=i;
                        self.saveTimeLoacl();
                        break
                    }
                }
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
            blok=new RDBlok(this,this.sob);
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
            this.saveTimeLoacl();
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
            localS.object["p_RedactCode.arrSave"]=o;
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


        this.mSBlok;
        this.setMSBlok = function(mSBlok){
            this.mSBlok=mSBlok;
            this.mSBlok.dCont.add(this.dCont)
            this.mSBlok.sizeWin=this.sizeWin;
            this.mSBlok.panel.color=dcmParam._color;

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
            var xx=0;
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].life) {
                    this.array[i].button.x=xx;
                    xx+= this.array[i].button.width;
                }
                

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
            this._url="";
        }


        this.button=new DBut(null,0,0,"",function(s){
            if(s=="down"){
                self.fun("index",self.idArr); 
            }
            if(s=="closed"){
                self.fun("closed",self.idArr); 
            }                    
        });

        
       
        this.mzBlok=new MZBlok(this, function(s,p,p1){
            if(s=="load"){               
                self.codeText.start(this)
                self.codeText.setObj(olCT)
                olCT=null
                return
            }
        })

        this.codeText=new CodeText(this.dCont,  0,    32,  null, function(s,p,p1){
            //trace(">>>>>",s,p,p1);
            if(s=="openF"){                
                self.fun(s,p,p1)
            }
            if(s=="saveModel"){                
                self.button.setSaveModel(p)                
            }
            if(s=="save"){
                //trace(s,p,p1)
                trace(self._url)
                var o={
                    text:p,
                    tip:"saveFile1251",
                    link:"../../"+self._url
                }

                mhbd.setPHP(o, function(date){
                    trace(date)
                })

                self.button.setSaveModel(false);                
            }

        })
        this.codeText.init();
        

        this.setUrl = function(url){
            this.url=url
            self.mzBlok.setJS("../../"+url);
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
            this.drag();         
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
                this.par.dCont2.add(this.dCont);
                this.button.color=dcmParam.color1
            }else{
                this.par.dCont2.remove(this.dCont); 
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
                this.par.dCont1.add(this.button);
                this.button.x=this.idArr*102
            }else{                
                this.par.dCont1.remove(this.button);
            }           
        }
    }    
    get life() { return  this._life;} 
}

export class DBut extends DButton {
    constructor(dCont, _x, _y, _text, _fun, _link) {
        super(dCont, _x, _y, _text, null, _link);
        this.type = 'DBut';
        var self = this;
        this.borderRadius=5;
        this.boolLine=false;
        this.y=2

        this.height= this.height+5;
        this._fun=_fun

        this.fun=function(){
            self._fun("down");
        }

        var yy=10

        this.but=new DButton(this,0,yy,"x",function(){
            self._fun("closed");
        })  
        this.but.width= this.but.height=7
        this.but.colorText=dcmParam.colorText1
        this.but.label.bold=true
        this.but.label.x-=2;
        this.but.label.y-=2;
        this.but.boolFond=false;
        this.but.borderRadius=10;
        this.but.color=dcmParam.colorText1;
        self.but.label.x=0;
        self.but.label.y=0;

        this.label.textAlign = 'left';
        this.label.y=yy;
        this.label.activMouse =false
        this.but.label.activMouse =false  
        self.but.label.y=-3;
        self.but.label.x=0;
        this.setSaveModel=function(bool){
            if(bool==true){
                self.but.text=""
                self.but.boolFond = true;                
                self.but.label.x=0;
                self.but.label.y=-3;
            }else{
                self.but.text="x"
                self.but.boolFond = false;

                self.but.label.x=0;
                self.but.label.y=-3;
            }
        }      


        this.reDrag=function(){
            this.but.x= this._width-this.but._width-10;            
            this.label.x=10;
            this.label.y=yy-2; 
            this.panel.width = this._width;
            this.panel1.width = this._width;

            this.panel.height = this._height;
            this.panel1.height = this._height;           
        } 
        

        this._simPix=this._fontSize*8.4/14;
        this.reDrag2=function(){
            var w=this._text.length*this._simPix+10+this.but._width+20;
            this._width=99999;
            this.width=w;
        }

        //this.reDrag2();
    }

    set width(value) {
        if (this._width != value) {
            this._width = value;            
            this.reDrag();
            //this.reDrag2();
        }
    }
    get width() {
        return this._width;
    }
    set text(value) {
        if (this._text != value) {
            this._text = value;
            this.label.text = this._text;
            this.reDrag2();
        }
    }
    get text() {
        return this._text;
    }
}