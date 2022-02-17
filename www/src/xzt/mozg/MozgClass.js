


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

        this.array=[];

        this.tipe=-1;

        this.boolLoad=0;

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
            this.boolLoad=1            
        }




        this.poiskInClass=function(){//this.mzbText.array.length
            trace("@@@@@@@@@@@@@@@@@@@@@@",this.lhInfo)
            if(this.boolLoad>=2)return
            this.boolLoad=2             
            for (var i = this.line.line; i <= this.line1.line; i++) {                
                if(this.mzbText.array[i].text.indexOf("new")!=-1){                    
                    this.pIC(this.mzbText.array[i]);
                }
            }            
            this.boolLoad=3; 
        }

        this.pIC=function(line){//this.mzbText.array.length
            //trace(this.lhInfo,line)
            
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
            trace(nameC+"=="+this.name)
               
            if(nameC==this.name)return// FIXE хзthis.name=Position //this.copy = function () {return new Position(this._x, this._y, this._z);
            

            if(this.par.objectClass[nameC]!=undefined){//клас в нутри
                //trace(this.name,"!!!!!!!!",nameC)
                //trace(this.name,"!!!!!!!!",nameC,this.par.objectClass[nameC].boolLoad,line)
                //trace(this.name,"!!!!!!!!",nameC,this.par.objectClass[nameC].boolLoad)
                let klass = this.par.startClass(nameC)                
                this.array.push(klass)
                return
            } 

            
            for (var i = 0; i < this.par.arrayImport.length; i++) {

                for (var j = 0; j < this.par.arrayImport[i].aClass.length; j++) { 

                    if(nameC==this.par.arrayImport[i].aClass[j]){

                        

                        if(this.par.arrayImport[i].blok){
                            let klass = this.par.arrayImport[i].blok.startClass(nameC)
                            if(klass!=null){
                                this.array.push(klass)
                                return
                            }
                        }
                    }                    
                }                
            } /**/  
            


        }

        this.start=function(){
            this.active=true
            //trace("@@@@@@@@@@@@@@@@@@@poiskInClass@@@@@",this.name,this.line,this.line1)
            this.poiskInClass();
        }

  	}
}




