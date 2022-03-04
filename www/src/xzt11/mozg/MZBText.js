import { MZBTLine } from './MZBTLine.js';
import { LHInfo, LH } from './LHInfo.js';
import { TextDrag } from './TextDrag.js';

///Общее разбиение текмта и его укравление
export class MZBText  {
    constructor(par, fun) {   
        this.type="MZBText";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.arrSim=[" " ,"\t", "\r", "//", "/*", "*/", ";", "{", "}", "."];
        this.array=[];
        this.arrayCeh=[]; 

        

        this.clear=function(){
            for (var i = 0; i < this.arrayCeh.length; i++) {
                this.arrayCeh[i].clear();
            }
            this.array.length=0;
        }

        this.sob=function(s,p,p1){
            if(s=="craetImport"){
                self.fun("craetImport",p,p1)
                return
            }
        }   

        this.textDrag = new TextDrag(this,this.sob)   

        var line;
        this.craet=function(){
            if(this.arrayCeh[this.array.length]==undefined){
                this.arrayCeh[this.array.length]=new MZBTLine(this,this.sob) 
            }
            line=this.arrayCeh[this.array.length]
            line.idArr=this.array.length
            this.array[this.array.length]=line          
            return line;
        }

        ///cоздание импортов
        this.korImport=function(){
            var bb
            for (var i = 0; i < this.array.length; i++) {
                for (var j = 0; j < this.array[i].array.length; j++) {   
                    bb=true;
                    if(this.array[i].arrBo[j]!=0) 
                    if(this.array[i].array[j]=="import"){                        
                        var oo=this.getSkobki(i, 0, "{", "}")//ищем скобки 
                        if(oo){
                            var ac=[]//классы в импорте
                            var dd=oo.o.sah
                            if(oo.o.line!=oo.o1.line){//хз //FIXE Visi3d.js !!!rt MEffectArray from './MEffectArray.js';

                                for (var k = 0; k < this.array[i].array.length; k++) {
                                    if(this.array[i].array[k]=="from"){
                                        var oo2=this.getPusto(i,j+1)                                    
                                        ac.push(this.array[oo2.line].array[oo2.sah]);

                                        var oo3=this.getPusto(i,k+1)  
                                        var s=this.array[oo3.line].array[oo3.sah]
                                        var asd=s.split("'")
                                        var s1=s
                                        if(asd.length===3)s1=asd[1]                                   
                                        self.fun("craetImport",ac,s1)
                                    
                          

                                    }
                                }   
                                
                                continue
                                
                                
                            }


                            for (var ii = oo.o.line; ii < oo.o1.line+1; ii++) {                                
                                for (var jj = dd; jj < this.array[ii].array.length; jj++) {
                                   
                                    var b=true
                                    for (var k = 0; k < this.arrSim.length; k++) {
                                        if(this.arrSim[k]==this.array[ii].array[jj])b=false
                                        if(this.array[ii].array[jj]=='')b=false
                                    }

                                    if(b){                                       
                                        ac.push(this.array[ii].array[jj])
                                    }


                                    if(oo.o1.line==ii && oo.o1.sah==jj){
                                        ii=999999999
                                        jj=999999999
                                        break
                                    }
                                }
                                dd=0;
                            }
                            
                            if(ac.length!=0){
                                var ooo=this.getPusto(oo.o1.line,oo.o1.sah+1)
                                if(ooo){
                                    var ooo1=this.getPusto(ooo.line,ooo.sah+1)
                                    var s=ooo1.bLine.array[ooo1.sah];
                                    var asd=s.split("'")
                                    var s1=s
                                    if(asd.length===3)s1=asd[1]                                   
                                    self.fun("craetImport",ac,s1)
                           
                                }
                                
                            }

                        }                        
                    }
                }
            }
        }



        //Создание классов перебераем ищем классы
        this.getClassLine=function(){

            var arr=[];
            var sc;
            for (var i = 0; i < this.array.length; i++) {
                sc=this.array[i].getStartKlass()                
                if(sc!=null){
                    var oo=this.getPusto(sc.line,sc.sah+1)
                    var oo1=this.getSkobki(sc.line, oo.sah, "{", "}") 
                    if(oo1!=null){
                        oo1.name=sc.bLine.array[sc.sah]
                        oo1.type=0;
                        arr.push(oo1)                      
                    }
                }
            }

            //поиск старых типов
            var l=0;
            var s=0;
            var ss;
            var arr1=[];
            for (var i = 0; i < 999999; i++) {
                let lh=new LH(l,s)                
                let oo1=this.getSkobki(lh.line, lh.sah, "{", "}") 
                
                if(oo1!=null){
                   

                    l=oo1.o1.line;
                    s=oo1.o1.sah+1;

            

                    ss=this.array[oo1.o1.line].array[oo1.o1.sah];
                    arr1.push(oo1); 
                    
                               
                   
                    if(this.array[oo1.o.line].text.indexOf("function")!=-1){
                        if(this.array[oo1.o.line].text.indexOf("export")!=-1){
                            var p=this.array[oo1.o.line].getPos(this.array[oo1.o.line].array, ["function"],false)
                            var oo=this.getPusto(oo1.o.line,p+1)
                            var ss=oo.bLine.array[oo.sah]
                            oo1.type=1;//старый тип данных
                            oo1.name=ss;
                            arr.push(oo1);                           
                        }
                    }
                    if(this.array[oo1.o.line].text.indexOf("function")!=-1){

                    }

                } else{
                    break;
                }
                          
            } 


            for (var i = 0; i < arr1.length; i++) {//prototype                
                if(arr1[i].type==undefined){
                    if(this.array[arr1[i].o.line].text.indexOf("prototype")!=-1){
                        var ss=this.array[arr1[i].o.line].text                        
                        var a=ss.split("prototype")[0].split(".")[0] 
                        for (var j = 0; j < arr1.length; j++) {
                            if(arr1[j].type!==undefined){
                                if(arr1[j].name==a){
                                    arr1[j].prot=arr1[i];
                                }
                            }
                        }                        
                    }
                } 
            }            
            

            
          

            return arr;
        }



        //>> строку и символ        
        this.getSimvol=function(ii,sah,simvol){
            //let o={line:0,sah:0,bLine:null}
            let o=new LH(0,0)
            o.line=-1;
            o.sah=-1;
            var s1=sah;            
            for (var i = ii; i < this.array.length; i++) {           
                for (var j = s1; j < this.array[i].array.length; j++) {                    
                    if(this.array[i].array[j]==simvol){
                        o.line=i;
                        o.sah=j;
                        o.bLine=this.array[i]
                        return o
                    }
                }
                s1=0;
            }
            return null
        }

        ///находим что либо после кроме пустот
        this.arrPusto=[""," ","\t","\r"]
        this.getPusto=function(ii,sah){
            //let o={line:0,sah:0,bLine:null}
            let o=new LH(0,0)
            o.line=-1;
            o.sah=-1;
            var b
            var s1=sah;            
            for (var i = ii; i < this.array.length; i++) {           
                for (var j = s1; j < this.array[i].array.length; j++) {                    
                    b=true
                    for (var k= 0; k < this.arrPusto.length; k++) {  
                        if(this.array[i].array[j]==this.arrPusto[k]){
                            b=false;
                        }
                    }
                    if(b){
                        o.line=i;
                        o.sah=j;
                        o.bLine=this.array[i]
                        return o;
                    }
                }
                s1=0;
            }
            return null
        }


        ///Возврощает тело между [] {} ну или чо пошлеш null если не судьба
        this.getSkobki=function(ii,sah,_ot,_do){
            
            let o=new LH()//{line:0,sah:0,bLine:null}
            let o1=new LH()//{line:0,sah:0,bLine:null}
            //let ob={o:o,o1:o1,name:""};
            let ob =new LHInfo(o,o1)

            o.line=-1;
            o.sah=-1;
            o1.line=-1;
            o1.sah=-1;
            o.kol=0

            var s1=sah; 
            var sah=0;
            var bb=false;
            
            
            for (var i = ii; i < this.array.length; i++) { 
                for (var j = s1; j < this.array[i].array.length; j++) {   
                    
                    if(this.array[i].arrBo[j]!=0){
                        if(this.array[i].array[j]==_ot){
                            sah++ 
                            if(bb==false){
                                o.line=i
                                o.sah=j
                                o.bLine=this.array[i]
                            }                             
                            if(o.kol<sah)o.kol=sah; 
                                           
                            bb=true;
                        }
                        if(this.array[i].array[j]==_do){
                            sah--;                        
                            if(sah==0){
                                o1.line=i
                                o1.sah=j
                                o1.bLine=this.array[i]
                                i=9999999;
                                j=9999999;
                                
                                break
                            }
                            
                        }
                    }

                }
                s1=0;
            }
            if(o1.line!=-1){
                return ob
            }
            


            return null
        }


        this.maxSim=0

        this.text="";
        var lll
        this.boolCom=1;
        this.set=function(s){
            this.text = s;
            trace(s)
            var bool=true;
            var a=s.split("\n");
            this.maxSim=0
            for (var i = 0; i < a.length; i++) {                
                lll=this.craet(a[i]);
                lll.set(a[i]);
                if(this.maxSim<lll.kolSim)this.maxSim=lll.kolSim

            }
            //this.textDrag.drag();
            
        }


        this.setCopy=function(mxbText){
           
         
            this.clear();
            this.maxSim=mxbText.maxSim;
            var l;
            
            for (var i = 0; i < mxbText.array.length; i++) { 
                l=this.craet()
                l.setLine(mxbText.array[i])
                
            }
        }


    }
}



