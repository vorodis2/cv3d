

import { LABS } from './LABS.js';
import { CTVeiw } from './CTVeiw.js';

export class CTMozg  {
    constructor(par, fun) {         
        this.type="CTMozg";
        var self=this; 
        this.par=par; 
        this.fun=fun;   

        var mzBlok=this.par.par.mzBlok;
        var ctVeiw=this.par.ctVeiw;


        this.drag=function(){ 
            var xz1=5;
            this.xz1=5;
        }



        
        this.setS=function(s,p){
            var l=mzBlok.mzbText.array[p.line];
            var s1=l.text.substr(0,p.sah)
            s1+=s+l.text.substr(p.sah,l.text.length)
            l.text=s1;            
            p.sah+=s.length;
        }

        this.setKE=function(e,p){ 
            var l=mzBlok.mzbText.array[p.line];
            var at=l.text.substr(0,p.sah).split("\t");
            var zdTab=at.length-1;

            
            if(e.code=="Delete"){
                
                if(p.sah>=l.text.length){//берем строку выше
                    var l1=mzBlok.mzbText.array[p.line+1]
                    if(l1!=undefined){
                        mzBlok.mzbText.array.splice(p.line+1,1)
                        l.text=l.text.substr(0,p.sah)+l1.text;
                    }
                }else{
                    var s1=l.text.substr(0,p.sah);
                    s1+=l.text.substr(p.sah+1,l.text.length);
                    l.text=s1; 
                }
                return;                 
            }
            if(e.key=="Tab"){
                var t=l.text.substr(0,p.sah)
                
                l.text=l.text.substr(0,p.sah)+'\t'+l.text.substr(p.sah,l.text.length);
                p.sah+=4;
                trace("!!",zdTab,p.sah+"!!"+t+"!!"+l.text)

                return; 
            }

            if(e.key=="Backspace"){
                trace(p.sah,l.text.length);
                return;                 
            }
            
        }
 
        var aa
        this.setString=function(s,t){ 
            if(!ctVeiw)ctVeiw=this.par.ctVeiw;//dsfgdsfsdfffffffffff
            aa=ctVeiw.aPosit;

            for (var i = 0; i < aa.length; i++) {
                if(t==0)this.setS(s,aa[i])
                if(t==1)this.setKE(s,aa[i])    
            }
            mzBlok.mzbText.dragText()
            this.par.labS.clear()
            this.par.labS.drag()
            ctVeiw.drag();
            trace(aa);
        }






        this.boolCntr=false;
        this.keydown=function(e){           
            if(dcmParam.getFocus()!==null)return
            trace(">>>",e.keyCode,"===",e)   
            
            if(e.keyCode==17)this.boolCntr=true;



            if(this.boolCntr==true){
                if(e.keyCode==70){//F открыетие нелпа
                    this.par.par.fun("openF")
                }
            }else{
                
                trace(e.key.length)
                if(e.key.length==1){//просто символ
                    this.setString(e.key,0)
                }else{
                    this.setString(e,1)
                }
                
            }

           /* XZ1.prototype.ff=5
            // XZ1.prototype.drag.ff1=5
            trace(XZ1.ff)
            trace( XZ1.drag)
            var xz=new XZ1()

            trace(this.drag)
            this.drag["xz"]=5
            this.drag.prototype.xz2=5
            this.drag.prototype.constructor.xz2=5
            trace(this.drag)*/
        }
        this.keyup=function(e){ 
            //trace(">>keyup>",e.keyCode,e)
            if(e.keyCode==17)this.boolCntr=false;
        }

    }
}

export class XZ1 {
    constructor(par) {

        trace("@@@@@@@@@@@",this.ff)

        this.drag=function(){ 
            var xz1=5
            this.xz1=5

            trace("@@@@@@@@1@@@",this.ff1)
        }
    }    
}