
import { XZ } from '../XZ.js';
import { MozgClass } from './MozgClass.js';
import { AvtoObnova } from './AvtoObnova.js';

export class Mozg  {
  	constructor(par, fun) {  		
  		this.type="Mozg";
  		var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param 

        this.array=[];

        this.openLoad=false
        this.klass
        this.clear=function(s){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].life=false
            }
        }

        this.sob=function(s,p){
            if(s=="load"){
                p.startImp()
                var b=true;
                for (var i = 0; i < self.array.length; i++) {
                    if(self.array[i].life==true){
                        if(self.array[i].openLoad==false){
                          
                           b=false
                           break 
                        }
                    }
                }
                
                if(b){                    
                    

                    //Стартуем первый класс
                    var a= self.kBlok.name.split(".");
                    self.klass=self.kBlok.startClass(a[0])

                    self.openLoad=true;
                    self.fun("openLoad", true);

                }                
                return;
            }
        }    

        this.creat=function(){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].life==false){
                    this.array[i].life=true
                    return this.array[i]
                }
            }
            this.array.push(new MZBlok(this,this.sob))
            this.array[this.array.length-1].idArr=this.array.length-1

            return this.array[this.array.length-1]
        }


        this.kBlok

        this.setJSKoren=function(s){  
            this.openLoad=false          
            this.kBlok =this.creat();
            this.kBlok.setJS(s);
            this.kBlok.life=true
        }


        this.setJS=function(s){           
            var blok=this.creat();
            blok.setJS(s);
            blok.life=true
            return blok
        }
  	}
}





export class MZBlok {
    constructor(par, fun) {         
        this.type="MZBlok";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.uuid=calc.generateUUID(2)
        this._life=false;

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

        this.inLine=new MZBTLine(this,this.sob)
        this.openLoad=false

        this.arrayImport=[];
        this.arrayImportCech=[];
        this.arrImpBlok=[];

        this.arrayClass=[];
        this.objectClass={};

        this.clear=function(){
            this.arrayImport.length=0;
            this.arrImpBlok.length=0;
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

              
                sah++;
                continue
               
            }            
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



///Общее разбиение текмта и его укравление
export class MZBText  {
    constructor(par, fun) {   
        this.type="MZBText";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.arrSim=[" ","\t","\r","//","/*","*/",";","{","}"];
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

/*            if(this.status==1 && this.kontSah!=-1){                
                if(this.array[this.kontSah].indexOf("import")!=-1){


                    
                    ss=this.array[this.kontSah]
                    var aad=[ss]
              
                    this.parse(aad,["{","}"])

                    if(aad.length==1){//глюк без скобок
                        this.parse(aad,[" "]);
                    }
                    var o = this.

          

                    var aad1=[aad[2]];                   
                    this.parse(aad1,[" ",","])
                    var aad2=this.getPos(aad1,[" ",",",""],"vse")

                    var aad11,aad111,aad22;
                    aad11=ss.split("from")
                    if(aad11[1]==undefined)return //Хроень в масивах))) var aa=["import { LocalStorage } from '../component/LocalStorageE6.js'!!!!
                    aad111=[aad11[1]];
                    
                    this.parse(aad111,[" " ,"," ,"'", '"' ])
                    aad22=this.getPos(aad111,[" ",",","","'", '"'],"vse")
                    self.fun("craetImport",aad2,aad22[0])
                }
            }*/
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
                //trace("!!",l,s)
                if(oo1!=null){
                   // trace(">>>>>>>>>>>>>>>>",oo1,oo1.o1.bLine.array,oo1.o1.bLine.arrBo,oo1.o1.bLine.arrBo1,oo1.o1.bLine.arrBo0,oo1.o1);


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




        this.text="";
        var lll
        this.boolCom=1;
        this.set=function(s){
            this.text = s;
            var bool=true;
            var a=s.split("\n");
            for (var i = 0; i < a.length; i++) {                
                lll=this.craet(a[i]);
                lll.set(a[i]);

            }
            
            
        }
    }
}


export class LH{
    constructor(line,sah,bLine) { 
        this.line=line;
        this.sah=sah;
        this.bLine=bLine;
        if(this.line==undefined)this.line=-1;
        if(this.sah==undefined)this.sah=-1;

        this.set=function(line,sah,bLine){
            this.line=line;
            this.sah=sah;
            this.bLine=bLine;
        }
    }
}

export class LHInfo{
    constructor(o,o1) { 
        this.o=undefined;
        this.o1=undefined;
        this.name=undefined
        this.type=undefined
      
        if(o!=undefined) this.o= o 
        if(o1!=undefined) this.o1= o1       
    }
}



export class MZBTLine{
    constructor(par, fun) {   
        this.type="MZBText";
        var self=this;
        this.par=par;
        this.fun=fun;
        this._active=false;
        this.text="";
        this.status=0;//0неопределн 2 не активен 1 активен 3 ида и нет(сложно)
        this.array=[];
        this.arrBo=[];
        this.kontSah=-1;
        
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
            this.array.length=0
            this.array[0]=this.text;
            
            this.parse( this.array,this.arrSim );   
            

            this.kontSah=this.getPos(this.array,this.arrSim,true);
            


            this.korStatuc()
         


           

                  
        }

        this.arrBo1=[]
        this.arrBo0=[]
        var bb
        this.korStatuc=function(){
            this.arrBo.length=0;
            this.arrBo1.length=0;
            this.arrBo0.length=0;
            this.status=1;
            
            for (var i = 0; i < this.array.length; i++) {
                this.arrBo[i]=this.par.boolCom;
                this.arrBo1[i]=1;
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


