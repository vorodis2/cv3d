
import { MozgClass } from './MozgClass.js';
import { MZBText } from './MZBText.js';
import { AvtoObnova } from './AvtoObnova.js';
export class MZBlok {
    constructor(par, fun) {         
        this.type="MZBlok";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.uuid=calc.generateUUID(2)
        this._life=false;
        this.parent=undefined

        this.name="";
        this.avtoObnova=new AvtoObnova(this,function(s,p,p1){
            if(s=="upLoad"){
                /*
                this.life=false;
                 self.upLoad() */
            }
        });


        this.mzbText=new MZBText(this,function(s,p,p1){
            if(s=="craetImport"){
                self.craetImport(p,p1)

            }
        })

        this.text="";
        this.link=""
        this.arrStrok=[];
        this.kolStrok=0;


        this.openLoad=false

        this.arrayImport=[];
        this.arrayImportCech=[];
        this.arrImpBlok=[];

        this.arrayClass=[];
        this.objectClass={};

        this.clear=function(){
            this.arrayImport.length=0;
            this.arrImpBlok.length=0;

            for (var i = this.children.length - 1; i >= 0; i--) {
                this.remove(this.children[i])
            }
        } 

        var imp
        this.craetImport=function(a,s){             
            if(this.arrayImportCech[this.arrayImport.length]==undefined){
                this.arrayImportCech[this.arrayImport.length]=new ImpHromn(this,this.sob)
                this.arrayImportCech[this.arrayImport.length].idArr=this.arrayImport.length
            }
            imp=this.arrayImportCech[this.arrayImport.length]
            this.arrayImport.push(imp)
            imp.set(a,s)
        }




        this.sob=function(s,p){

        }


        this.setJS=function(s){  
            trace(s)         
            this.clear();
            self.avtoObnova.life=false
            this.link=s;
            this.openLoad=false;
            this.upLoad()    
        }

        this.upLoad  =function(){   
            mhbd.setPHP({tip:"getText",dir:this.link},  function(data){                 
                //self.avtoObnova.start();
                self.text=data; 
                self.parsing(data);                             
            })
        }

        var a
        this.parsing=function(data){
            this.aLint= this.link.split("/");
            this.name=this.aLint[this.aLint.length-1]
            self.mzbText.set(data);          
            this.openLoad=true;           
            this.fun("load",this);      
        }

        this.sobClass=function(s,p){

        }

        //Создание классов 
        this.creatClass=function(){     
            var arr=self.mzbText.getClassLine();          
            for (var s in this.objectClass) {
                this.objectClass[s].clear()
            }
            for (var i = 0; i < arr.length; i++) {
                if(this.objectClass[arr[i].name]==undefined){
                    this.objectClass[arr[i].name]=new MozgClass(this,this.sobClass)
                    this.objectClass[arr[i].name].name=arr[i].name
                }
                this.objectClass[arr[i].name].setLines(arr[i]);                
            }            
        }



        this.startClass=function(str){ 
            if(this.objectClass[str]){
                this.objectClass[str].start();
                return this.objectClass[str];
            }
            return null;           
        }    


        ///Пускаем дальше на поиск от
        this.startImp=function(){  
            self.mzbText.korImport()       
            this.creatClass();         
            //return
            var aa,aa1;
            var sah=0;
            for (var i = 0; i < this.arrayImport.length; i++) {
                aa=this.arrayImport[i].sPatch.split("./")
                aa1=this.arrayImport[i].sPatch.split("../")               
                
                var ss=""
                if(aa.length==2){//В этой же деректории
                    
                    if(aa[0]==""){
                        var s=this.link;
                        var ss=s.replace(this.aLint[this.aLint.length-1],aa[aa.length-1]);                      
                    }
                }

                if(aa1.length>=2){//Есть опуски
                    var s="";
                    for (var j = 0; j < this.aLint.length-aa1.length; j++) {
                        s+=this.aLint[j]+"/"
                    }
                    s+=aa1[aa1.length-1]

                    ss=s
                }
                if(ss=='') continue
                if(ss.indexOf("shaders")!=-1)continue;
                
                
                this.arrayImport[i].blok = this.par.setJS(ss);  
                this.arrImpBlok[sah] = this.arrayImport[i].blok;
                this.add(this.arrayImport[i].blok);
              
                sah++;
                continue
               
            } 
        }
        this.children=[];
        this.add=function(blok){
            if(blok.parent!=undefined)blok.parent.remove(blok)
            this.children.push(blok);
            blok.parent=this;
        }
        this.remove=function(blok){
            var p=-1;
            for (var i = 0; i < this.children.length; i++) {
                if(this.children[i].uuid==blok.uuid){
                    p= i
                    break
                }
            }
            if(p==-1){
                return
            }
            this.children.splice(p,1)
            blok.parent=undefined;           
        }



        //Сопирует ресурсы в blok
        this.setCopy=function(_blok){
            trace("@@",this)
            this.clear()
            this.mzbText.setCopy(_blok.mzbText)
        }




    }
    set life(value) {
        if(this._life!=value){
            this._life= value;            
            if(this._life==false){
                this.avtoObnova.life=false
            }              
        }
    }    
    get life() { return  this._life;} 
}



///Хрон импортов для этого js
export class ImpHromn  {
    constructor(par, fun) {   
        this.type="MZBText";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.blok=undefined

        this.aClass="null";
        this.sPatch="null";  
        this.set=function(aClass, sPatch){
            this.aClass=aClass;
            this.sPatch= sPatch; 

        }

    }
}

