

export class MZBTLine{
    constructor(par, fun) {   
        this.type="MZBText";
        var self=this;
        this.par=par;
        this.fun=fun;
        this._active=false;
        this.text="";
        this.textSpan="";
        this.status=0;//0неопределн 2 не активен 1 активен 3 ида и нет(сложно)
        this.array=[];
        this.arrBo=[];
        this.kontSah=-1;
        this.kolSim=0
        this.arrSim=this.par.arrSim;

        this.arrImp=[];

        this.clear=function(){
            this.active=false;
            this.text="";
            this.status=0;
            this.array.length=0
            this.kontSah=-1;
        }



        var n,n1,ss
        this.set=function(s){
            this.active=true;
            trace(this.active," ",s)
           // 
            this.text=s;
            this.array.length=0
            this.array[0]=this.text;            
            this.parse( this.array,this.arrSim ); 
            
            this.kontSah=this.getPos(this.array,this.arrSim,true); 
            this.korStatuc()
         


           

                  
        }

        this.arrBo1=[]
       
        var bb
        this.korStatuc=function(){
            this.arrBo.length=0;
            this.arrBo1.length=0;

            this.kolSim=0;
            this.status=1;
            
            for (var i = 0; i < this.array.length; i++) {
                this.arrBo[i]=this.par.boolCom;
                this.arrBo1[i]=1;

                if(this.array[i]=="\t"){
                    this.kolSim+=4;
                }else{
                    this.kolSim+=this.array[i].length
                }
            }

            //Коментарий через слешы
           /* n=this.getPos(this.array,["//"],false);
            if(n!=-1){
                for (var i = 0; i < this.array.length; i++) {
                    if(i>=n){
                        this.arrBo[i]=0;
                    }else{                        
                        if(n<this.kontSah)this.status=2;
                    }
                }
            }*/
            




            bb=this.par.boolCom;
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i]=="/*"){ 
                    bb=0;
                    this.par.boolCom=0;
                }
                this.arrBo[i]=bb;
                if(this.array[i]=="*/"){
                    bb=1;
                    this.par.boolCom=1;
                }
            }

            var b=1
            for (var i = 0; i < this.array.length; i++) {
                if(this.arrBo[i]==1){
                    if(this.array[i]=="//"){
                        b=0;
                        this.status=2;
                    }
                } 
                if(b==0 && this.arrBo[i]==1)this.arrBo[i]=b;                
            }

        }



        this.getStartKlass=function(){
            if(this.text.indexOf("class")!=-1){
              
                var oo
                for (var i = 0; i < this.array.length; i++) {
                    if(this.arrBo[1]!=0)
                    if(this.array[i].indexOf("class")!=-1){                        
                        oo=this.par.getPusto(this.idArr,i+1)
                        
                        if(oo){
                            
                            return oo;
                        }
                        

                    }
                }
            }


            return null;
        }

        this.drag=function(){
        
        } 

        this.getPos=function(arr,arr1,type){            
            var p=-1
            var bb
            let aaaa=[]

            for (var i = 0; i < arr.length; i++) {
                
                if(type===true){//не равно элементу
                    bb=true;
                    for (var j = 0; j < arr1.length; j++) {
                        if(arr[i]==arr1[j]){
                            bb=false;
                        }
                    }
                    if(bb)return i
                }

                if(type===false){//один из списка
                    for (var j = 0; j < arr1.length; j++) {
                        if(arr[i]==arr1[j]){
                            return i
                        }
                    }
                }

                if(type==="vse"){//все кроме
                    bb=true;                    
                    for (var j = 0; j < arr1.length; j++) {
                        if(arr[i]==arr1[j]){
                            bb=false;
                        }
                    }
                    if(bb)aaaa.push(arr[i])
                }
               
            }
            if(type==="vse")return aaaa;
            return p
        }


        this.parse=function(a,a1){            
            for (var i = 0; i < a1.length; i++) {
                this.parse1(a,a1[i]);
            }            
        } 


        var aa=[];
        var aa1=[];
        this.parse1=function(a,s1){  
            for (var i = a.length-1; i >=0 ; i--) {                
                aa=a[i].split(s1);
                if(aa.length<=1){//нет символов

                }else{                    
                    a.splice(i,1);
                    for (var j = aa.length - 1; j >= 0; j--) {
                     
                        if(j==0){
                            a.splice(i,0,aa[j])
                        }else{
                            a.splice(i,0,s1,aa[j])
                        }
                    }
                }
            } 
        }




        

        this.setLine=function(line){
            this.clear()
            this.active=line.active;
            this.text=line.text;
            for (var i = 0; i < line.array.length; i++) {
                this.array[i]=line.array[i];
                this.arrBo[i]=line.arrBo[i];
                this.arrBo1[i]=line.arrBo1[i];                
            }
            this.kolSim=line.kolSim;

          /*  line.clear()
            line.active=true;
           // 
            line.text=s;
            line.array.length=0
            for (var i = 0; i < this.array.length; i++) {
                line.array[i]=this.array[i]
                line.arrBo[i]=this.arrBo[i]
                line.arrBo1[i]=this.arrBo1[i]
            }*/


        }
    }


    set active(value) {
        if (this._active != value) {
            this._active = value;           
        }
    }
    get active() {
        return this._active;
    }
}


