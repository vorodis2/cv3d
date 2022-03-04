

import { LABS } from './LABS.js';
import { CTVeiw } from './CTVeiw.js';

export class CTMozg  {    
    constructor(par, fun) {         
        this.type="CTMozg";
        var self=this; 
        this.par=par; 
        this.fun=fun;   

        var mzBlok=this.par.par.mzBlok;
        var ctVeiw;


        this.ctMozgTuda=new CTMozgTuda(this, function(s,p){
            if(s=="saveModel"){
                self.fun(s,p)
            }
        })

        this.drag=function(){ 
            var xz1=5;
            this.xz1=5;
        }



        var asa=[]
        this.setS=function(s,p){
            if(p.isOdinak()==false)this.clearLine(p)
            asa= s.split("\n"); 
            if(asa.length==1){
                var l=mzBlok.mzbText.array[p.line];
                var sah=l.getSah(p.sah);
                var s1=l.text.substr(0,sah);            
                s1+=s;
                var posit=l.getKolSim(s1);
                s1+=l.text.substr(sah,l.text.length);
                l.text=s1;
                p.s=p.sah=posit;
                this.drLine(l);
            }else{                
                var l=mzBlok.mzbText.array[p.line];
                var posit;
                var sah=l.getSah(p.sah);
                var s1=l.text.substr(0,sah); 
                var s2=l.text.substr(sah,999999); 
                for (var i = 0; i < asa.length; i++) {
                    if(i==0){
                        l.text=s1+asa[0]+"\n";
                        l.dragText();
                    }else{
                        var l1=mzBlok.mzbText.craet(true)                        
                        
                        if(i==asa.length-1){
                            l1.text=asa[i];                        
                            var posit=l.getKolSim(l1.text);
                            l1.text+=s2;                            
                        }else{
                            l1.text=asa[i]+"\n";
                        }                       
                        l1.dragText();
                        mzBlok.mzbText.array.splice(p.line+i,0,l1);                      
                    }
                }

                p.l=p.line=p.line+asa.length-1;
                p.s=p.sah=posit;
                this.drLine()
            }            
        }



        this.drLine=function(l){ //обновляем строчку
            if(l){
               l.dragText();
                this.par.labS.dragLine(l);                 
            }else{
                for (var i = 0; i < mzBlok.mzbText.array.length; i++) {
                    mzBlok.mzbText.array[i].idArr=i;
                } 
                this.par.labS.clear()
                this.par.labS.drag()               
                var pY=this.par.par.pozitY;
                mzBlok.mzbText.dragText(true)   
                this.par.par.dtagText()
                this.par.par._pozitY=667
                this.par.par.pozitY=pY
            }
            ctVeiw.drag();
            this.ctMozgTuda.dragSave()           
        }

        this.clearLine=function(p){ //убиваем все что между
            let oo=p.getPor();
            if(oo.l==oo.l1){                
                var l=mzBlok.mzbText.array[p.l];
                var sah=l.getSah(oo.s1)
                var sah1=l.getSah(oo.s)
                l.text=l.text.substr(0,sah)+l.text.substr(sah1,l.arrTab.length)
                p.sah=oo.s1;
                p.s=p.sah;
                this.drLine(l)
            }else{                 

                let l1=mzBlok.mzbText.array[oo.l1];
                let l=mzBlok.mzbText.array[oo.l];

                let s=l1.text.substr(0,l1.getSah(oo.s1))
                s+=l.text.substr(l.getSah(oo.s),l.arrTab.length)
                l1.text=s;
                s=l.text.substr(l.getSah(oo.s),l.arrTab.length)
               
                l1.dragText(); 
                for (var i = oo.l; i >= oo.l1+1; i--) {                   
                    
                    mzBlok.mzbText.array.splice(i,1)
                } 

                p.line=oo.l1;
                p.l=p.line;
                p.sah=oo.s1;
                p.s=p.sah;

                this.drLine()
            }

        }

        this.setKE=function(e,p){ 
            var l=mzBlok.mzbText.array[p.line];
            var at=l.text.substr(0,p.sah).split("\t");
            var zdTab=at.length-1;

            var boolOdinak=p.isOdinak();            
            if(e.code=="Delete"){
                if(boolOdinak==false){
                    this.clearLine(p)
                    return
                }
                var sah=l.getSah(p.sah)
                if(sah>=l.text.length){//берем строку выше                    
                    var l1=mzBlok.mzbText.array[p.line+1]
                    if(l1!=undefined){
                        l.text=l.text.substr(0,p.sah)+l1.text;
                        this.drLine(l) 
                        mzBlok.mzbText.array.splice(p.line+1,1)
                        this.drLine()
                    }
                }else{ 
                    var s1=l.text.substr(0,sah);                    
                    s1+=l.text.substr(sah+1,l.text.length);
                    l.text=s1;                    
                    this.drLine(l) 
                }
                return;                 
            }
            if(e.key=="Tab"){
                this.setS("\t",p);               
                return; 
            }
            if(e.key=="Enter"){
                if(boolOdinak==false){ 
                    this.clearLine(p) 
                } 
                var sah=l.getSah(p.sah)
                var ss= l.text.substr(sah,l.text.length)
                var ss1= l.doStr;
                var doKol= l.doKol;                            
                l.text=l.text.substr(0,sah)+"\r";
                this.drLine(l) 
                var l1=mzBlok.mzbText.craet(true)
                l1.text=ss1+ss;
                l1.dragText();

                

                mzBlok.mzbText.array.splice(p.line+1,0,l1)

                p.l=p.line=p.line+1
                p.s=p.sah=doKol
                
                this.drLine() 

                return; 
            }

            if(e.key=="Backspace"){
                if(boolOdinak==false){
                    this.clearLine(p)
                    return
                }
                var sah=l.getSah(p.sah)
                
                if(sah==0){//берем строку выше 
                    var l1=mzBlok.mzbText.array[p.line-1]
                    if(l1){
                        var ss=l1.arrTab2.length-1;
                        l1.text=l1.text.substr(0,l1.text.length-1)+l.text;

                        p.s=p.sah=ss;
                        p.l=p.line=p.line-1;

                        this.drLine(l1) 

                        mzBlok.mzbText.array.splice(p.line+1,1);

                        this.drLine() 
                    }                   
                    /*var l1=mzBlok.mzbText.array[p.line+1]
                    if(l1!=undefined){
                        l.text=l.text.substr(0,p.sah)+l1.text;
                        this.drLine(l) 
                        mzBlok.mzbText.array.splice(p.line+1,1)
                        this.drLine()
                    }*/
                }else{ 
                    var ss=1
                    if(l.arrTab2[p.sah-1]>0)ss=l.arrTab2[p.sah-1]
                    var s1=l.text.substr(0,sah-1);                                       
                    s1+=l.text.substr(sah,l.text.length);
                    l.text=s1;

                    p.sah=p.sah-ss;
                    p.s=p.sah; 

                    this.drLine(l) 
                }


                return;                 
            }            
        }
 
        var aa
        this.setString=function(s,t){ 
            //if(!ctVeiw)ctVeiw=this.par.ctVeiw;//dsfgdsfsdfffffffffff
            aa=ctVeiw.aPosit;

            for (var i = 0; i < aa.length; i++) {
                if(t==0)this.setS(s,aa[i])
                if(t==1)this.setKE(s,aa[i])    
            }


        }






        this.boolCntr=false;
        this.keydown=function(e){           
            if(dcmParam.getFocus()!==null)return
            if(!ctVeiw)ctVeiw=this.par.ctVeiw;//dsfgdsfsdfffffffffff    
            trace(">>>",e.keyCode,"===",e)   
            
            if(e.keyCode==17)this.boolCntr=true;



            if(this.boolCntr==true){
                if(e.keyCode==70){//F открыетие нелпа
                    this.par.par.fun("openF")
                }
                if(e.keyCode==67){//ctrl+C
                    this.ctrlC()
                }
                if(e.keyCode==86){//ctrl+V
                    this.ctrlV()
                }
                if(e.keyCode==88){//ctrl+X
                   
                }
                if(e.keyCode==90){//ctrl+Z
                   
                }
                if(e.keyCode==89){//ctrl+Y
                   
                }
                if(e.keyCode==83){//ctrl+S
                    this.ctrlS();
                }
                if(e.keyCode==68){//ctrl+D
                   
                }
            }else{

                if(e.key.length==1){//просто символ
                    this.setString(e.key,0)
                }else{
                    this.setString(e,1)
                }

            }           
        }




        this.ctrlCV2 = new CtrlCV2()
        this.ctrlCV2.addFun(function(s){
            var rr=2; 
            self.setString(s,0)
        })         

        this.ctrlC=function(){            
            var s='';
            var aa=ctVeiw.aPosit;
            var p
            for (var i = 0; i < aa.length; i++) {
                s+=mzBlok.mzbText.textDrag.getText(aa[i]);
            }
            this.ctrlCV2.saveText(s); 
        }

        this.ctrlV=function(){            
            this.ctrlCV2.saveNa();            
        }

        this.ctrlS=function(){   
            var s="";
            for (var i = 0; i < mzBlok.mzbText.array.length; i++) {
                s+=mzBlok.mzbText.array[i].text+"\r";
            }
            trace(i ,">>"+mzBlok.mzbText.text)
            trace(">>>>>>>>>>>>>>>>>>>>>>")
             trace(i ,">>"+s)
            
            this.fun("save",s)
        }

        this.keyup=function(e){           
            if(e.keyCode==17)this.boolCntr=false;
        }

    }
}


export function CtrlCV2(cont) {
    var self = this;

    this.textArea = document.createElement('textarea');
    this.textArea.value = 'текст';
    document.body.appendChild(this.textArea);
    this.textArea.fokk = true;

    this.textArea.style.zIndex = -100;
    this.textArea.style.position = 'absolute';
    this.textArea.style.top = '-100px';
    this.textArea.style.visibility = 'hidden';

    this.boolCntr = false;
    this.boolC = false;
    this.boolV = false;

    this.array = [];
    this.addFun = function (_fun) {
        this.array.push(_fun);
    };

    this.str = null;
    this.zapros = function (_s) {
        var i = 0;
        if (_s === undefined) {
            this.str = null;
            for (i = 0; i < this.array.length; i++) {
                this.str = this.array[i]();
                if (this.str != null) {
                    this.textArea.value = this.str;
                    break;
                }
            }
        } else {
            for (i = 0; i < this.array.length; i++) {
                this.array[i](_s);
            }
        }
    };

    this.saveText = function (s) {
        this.str = s;
        this.textArea.value = this.str;
        this.save();
        try {
            document.execCommand('copy');
        } catch (err) {}
    };

    this.save = function (s) {
        if (this.str != null) {
            if (this.getFokus() === true) {
                this.textArea.style.visibility = 'visible';
                this.textArea.focus();
                this.textArea.select();

                setTimeout(function () {
                    // self.zapros(self.textArea.value)
                    self.textArea.style.visibility = 'hidden';
                }, 1);
            }
        }
    };

    this.getFokus = function () {
        /*var ii = $('*:focus');
        if (ii) {
            if (ii.length !== undefined) {
                if (ii.length !== 0) {
                    if (ii[0].fokk === undefined) {
                        return false;
                    }
                }
            }
        }*/
        return true;
    };

    this.saveNa = function () {
        if (this.array.length == 0) return;

        //if (document.activeElement.children != undefined) return;

        if (this.getFokus() === true) {
            this.textArea.style.visibility = 'visible';
            this.textArea.focus();
            this.textArea.select();

            setTimeout(function () {
                self.zapros(self.textArea.value);
                self.textArea.style.visibility = 'hidden';
            }, 1);
        }
    };
}


export class CTMozgTuda  {    
    constructor(par, fun) {         
        this.type="CTMozgTuda";
        var self=this; 
        this.par=par; 
        this.fun=fun; 

        this.dragSave= function () {            
            this.fun("saveModel",true);
        }
    }
}