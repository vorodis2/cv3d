

export class MZBTLine{
    constructor(par, fun) {   
        this.type="MZBText";
        var self=this;
        this.uuid=dcmParam.generateRendom(2)   
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
           
           // 
            this.text=s;
            

        }    
        this.dragText=function(){
            this.array.length=0
            this.array[0]=this.text;
            this.parse( this.array,this.arrSim );             
            this.kontSah=this.getPos(this.array,this.arrSim,true); 
            this.korStatuc(); 
            this.korTab();
            this.dLine();
        }

        this.arrBo1=[]
       
        var bb
        this.korStatuc=function(){
            this.arrBo.length=0;
            this.arrBo1.length=0;

            this.kolSim=0;
            this.status=1;

            var k=this.text.length;
            var a=this.text.split("\t")
            k+=(a.length-1)*3
            this.kolSim=k

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

        this.arrTab=[]
        this.arrTab2=[]
        this.arrS=[];
        this.doStr=''
        this.doKol=0
        this.korTab=function(){
            this.arrTab.length=0;
            this.arrTab2.length=0;
            this.arrS.length=0;
            let sah = 0;
            var kkk
            var ks=0
            this.doStr=''
            this.doKol=0
            var dob=true
            this.kolSim=0;
            for (var i = 0; i < this.text.length; i++) { 
                if(this.text[i]=="\t" || this.text[i]==" "){

                }else{
                    if(dob==true)this.doKol=sah
                    dob=false
                } 
                if(dob==true)this.doStr+=this.text[i];    

                if(this.text[i]=="\t"){                   
                    kkk=4-sah%4;
                    for (var j = 0; j < kkk; j++) {
                        this.arrTab[sah]=ks//kkk
                        this.arrTab2[sah]=kkk
                        this.arrS.push(this.text[i])
                        sah++;

                    }
                    ks++
                    //sah--;
                    continue
                    
                }else{
                    
                    

                    this.arrTab[sah]=-1
                    this.arrTab2[sah]=-1
                    if(this.text[i]!==" "){
                        this.arrTab[sah]=-2
                        this.arrTab2[sah]=-2
                    }
                    this.arrS.push(this.text[i])
                }
                sah++;
                
            }
            this.kolSim=this.arrTab.length;
            var ss=''
            for (var i = 0; i < this.arrTab.length; i++) {
                ss+=i+" "+this.arrTab[i]+" "+this.arrTab2[i]+" "+this.arrS[i]+";"
            }

            trace(">"+this.idArr+">>",this.doKol,this.arrTab)
            //trace(ss)
        }

        this.getKolSim=function(str){ 
            var kkk=0;
            var sah=0
            for (var i = 0; i < str.length; i++) {
                if(str[i]=="\t"){                   
                    kkk=4-sah%4;
                    sah+=kkk
                    continue                    
                }else{                 
                    
                }
                sah++;
                
            }
            

            return sah;
        }


        this.dLine=function(){            
            this.textSpan='<span style="tab-size: 4; '+tdStyle.getSpanColor("s2")+'">';            
            for (var j = 0; j < this.array.length; j++) {                               
                if(this.arrBo[j]==0){
                    this.textSpan+='<span class="s1">'+this.array[j]+'</span>';
                }else{
                    if(this.isStrInArr(this.array[j],this.par.textDrag.arr_s2)==true){
                        this.textSpan+=tdStyle.getSpan("s2")+this.array[j]+'</span>';
                        continue
                    }
                    if(this.isStrInArr(this.array[j],this.par.textDrag.arr_s4)==true){
                        this.textSpan+=tdStyle.getSpan("s4")+this.array[j]+'</span>';
                        continue
                    }
                    if(this.isStrInArr(this.array[j],this.par.textDrag.arr_s5)==true){
                        this.textSpan+=tdStyle.getSpan("s5")+this.array[j]+'</span>';
                        continue
                    }
                    this.textSpan+='<span class="s3">'+this.array[j]+'</span>';
                }
            }  
            this.textSpan+='</span>'         
        }

        this.isStrInArr=function(str,arr){ 
            for (var i = 0; i < arr.length; i++) {
                if(arr[i]==str)return true
            }
            return false
        }

        this.getSah=function(_sah){
            var sah=_sah
            var si=-1
            var sk=0
            for (var i = 0; i < _sah; i++) {
                if(this.arrTab[i]>=0){
                    if(this.arrTab[i]==si)sk++
                    si= this.arrTab[i]   
                }
            }
            sah-=sk
            return sah;
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
            this.doStr=line.doStr;
            this.doKol=line.doKol;
            for (var i = 0; i < line.array.length; i++) {
                this.array[i]=line.array[i];
                this.arrBo[i]=line.arrBo[i];
                this.arrBo1[i]=line.arrBo1[i];                
            }

            for (var i = 0; i < line.arrTab.length; i++) {
                this.arrTab[i]=line.arrTab[i];
                this.arrTab2[i]=line.arrTab2[i];
                               
            }
           
            this.kolSim=line.kolSim;
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


