


export class MozgClass  {
  	constructor(par, fun) {  		
  		this.type="MozgClass";
  		var self=this;
        this.par=par;
        this.fun=fun;
        this.name=""//сверху задаються

        this.mzbText=this.par.mzbText;
        this.line=null;
        this.line1=null;
        this.active=false;

        
        this.children=[];
        this.array=this.children;
        this._parent=undefined;
        this.tipe=-1;
        this.boolLoad=0;

        this.objectKlass={}


        this.kolStrok=0//количество строк
        this.iBlok=undefined//мозговой блок

        this.clear=function(){            
            this.active=false
            this.array.length=0;
        }

        this.lhInfo
        this.setLines=function(lhInfo){ 
            this.lhInfo=lhInfo
            this.tipe=lhInfo.type;

            this.line=lhInfo.o;
            this.line1=lhInfo.o1;

            this.kolStrok=this.line1.line-this.line.line//количество строк
            this.boolLoad=1            
        }



        this.sob=function(s,p){
        }



        this.poiskInClass=function(){//this.mzbText.array.length            
            if(this.boolLoad>=2)return
            this.boolLoad=2             
            for (var i = this.line.line; i <= this.line1.line; i++) {                
                if(this.mzbText.array[i].text.indexOf("new")!=-1){                    
                    this.pIC(this.mzbText.array[i]);
                    this.pFun(this.mzbText.array[i]);
                }
            }            
            this.boolLoad=3; 
          
        }



        this.pFun=function(line){//Ищем функции 
            for (var i = 0; i < line.array.length; i++) {
                if(line.array[i].indexOf("function")!=-1){
                    
                    let p=new MHronParam(this,this.sob)
                    p.setLines("xz1", "fun", null)
                    this.add(p);
                }
            }
        }



        this.pIC = function(line){//this.mzbText.array.length       
            var nameC="";
            for (var i = 0; i < line.array.length; i++) {
                if(line.arrBo[i]!=0)
                if(line.array[i].indexOf("new")!=-1){
                    var oo=this.mzbText.getPusto(line.idArr, i+1)
                    var s=this.mzbText.array[oo.line].array[oo.sah]
                    nameC=s.split("(")[0];
                    break                    
                }
            }
            if(nameC=="")return            
               
            if(nameC==this.name)return// FIXE хзthis.name=Position //this.copy = function () {return new Position(this._x, this._y, this._z);
            

            if(this.par.objectClass[nameC]!=undefined){//клас в нутри                
                let p=new MHronParam(this,this.sob)                                
                if(this.objectKlass[nameC]==undefined)this.objectKlass[nameC]=this.par.startClass(nameC)            
                p.setLines("xz1", "klass", null)                                
                this.add(p, this.objectKlass[nameC]);

                

                return
            } 

            
            for (var i = 0; i < this.par.arrayImport.length; i++) {

                for (var j = 0; j < this.par.arrayImport[i].aClass.length; j++) { 

                    if(nameC==this.par.arrayImport[i].aClass[j]){

                        

                        if(this.par.arrayImport[i].blok){
                            let klass = this.par.arrayImport[i].blok.startClass(nameC)
                            if(klass!=null){

                                let p=new MHronParam(this,this.sob)                                
                                if(this.objectKlass[nameC]==undefined)this.objectKlass[nameC]=klass           
                                p.setLines("xz1", "klass", null)                                
                                this.add(p, this.objectKlass[nameC]);
                                

                                
                                return
                            }
                        }
                    }                    
                }                
            } /**/  
            


        }

        this.start=function(){
            this.active=true
        
            this.poiskInClass();
        }


        
        this.add=function(hron, klass){
            //if(klass.parent!=undefined)klass.parent.remove(klass)
            
            if(klass){
                hron.klass=klass
                hron.bForst=true                
                for (var i = 0; i < this.children.length; i++) {
                    if(this.children[i].klass && this.children[i].klass.name == klass.name){
                        hron.bForst=false       
                    }
                }
                
            } 
          
            this.children.push(hron);
            hron.parent=this;
        }
        this.remove=function(klass){
           /* var p=-1;
            for (var i = 0; i < this.children.length; i++) {
                if(this.children[i].uuid==klass.uuid){
                    p= i
                    break
                }
            }
            if(p==-1){
                return
            }
            this.children.splice(p,1)
            klass.parent=undefined; */          
        }
  	}

    set parent(value) {
        if(this._parent!=value){
            if(this._parent!==undefined && value!==undefined){
                if(this._parent.uuid!==value){
                    this._parent= value; 
                    return
                }
            }
            if(this._parent==undefined || value==undefined){
                this._parent= value;  
                return 
            }
            

        }
    }    
    get parent() { return  this._parent;}
}



export class MHronParam  {
    constructor(par, fun) {         
        this.type="MozgFun";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.name="хз"//сверху задаються
        this.tipe="tipe";

        this.lhInfo
        this.setLines=function(name, tipe, lhInfo){ 
            this.name=name;
            this.tipe=tipe;

            if(!lhInfo)return
            this.lhInfo=lhInfo
            this.tipe=lhInfo.type;

            this.line=lhInfo.o;
            this.line1=lhInfo.o1;

            this.kolStrok=this.line1.line-this.line.line//количество строк
            this.boolLoad=1            
        }
    }
}
