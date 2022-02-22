

export class Mozg3D  {
    constructor(par, fun) {         
        this.type="Mozg3D";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param

        this._life = this.par._life;
        this._debug = this.par._debug;
        this._timeActiv = this.par._timeActiv;


        this.content3d=new THREE.Object3D();
        this.par.content3d.add(this.content3d);


        this.array=[]

        this.array[1]=this.m3info=new M3info(this,function(s,p,p1){
            self.fun(s,p,p1)
        })

        this.array[0]=this.idro=new Idro(this,function(s,p,p1){
            self.fun(s,p,p1)
        })

          
        this.setSob=function(s, p, p1){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].setSob!=undefined)this.array[i].setSob(s, p, p1);
            }  
        }

        this.fun_rotationZ = function (rotation) { 

            this.idro.fun_rotationZ(rotation)
        }

    }

    set life (value) {
        if(this._life !=value){
            this._life = value;
        }
    }    
    get life () { return  this._life ;} 

    set timeActiv(value) {
        if(this._timeActiv!=value){
            this._timeActiv= value;                         
        }
    }    
    get timeActiv() { return  this._timeActiv;} 


    set debug(value) {
        if(this._debug!=value){
            this._debug= value; 
            for (var i = 0; i < this.array.length; i++) {
                if( this.array[i].debug!=undefined)this.array[i].debug=this._debug;
            }                        
        }
    }    
    get debug() { return  this._debug;} 
}





export class Idro  {
    constructor(par, fun) {         
        this.type="Idro";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;

        this._debug = this.par._debug;


        this.content3d=new THREE.Object3D();
        this.par.content3d.add(this.content3d);

        this.klass=undefined;


        this.arrayC=[]
        this.array=[]
        this.clear=function(){
            for (var i = 0; i < this.arrayC.length; i++) {
                this.arrayC[i].clear()
            }
            this.array.length=0
        }


        this.start=function(klass){
            this.clear();
            this.klass=klass;
            this.sahPlus=0
            let blok=this.setKalss(klass);
            blok.start()
            blok.startVisi();
          
           // self.startDb(blok,0);

            this.fun("visi3d")
        }

        this.startDb=function(blok,sah){
            var s=""
            for (var i = 0; i < sah; i++) {
                s+="---"
            }

            s+=blok.idArr+" "+blok._width+" "+blok.x+" "+blok.y+" "+blok.klass.name//

            for (var i = 0; i < blok.klass.array.length; i++) {
                if(!blok.klass.children[i].bForst) continue                   
                this.startDb(blok.klass.children[i].klass.iBlok,sah+1)   
                //this.startDb(blok.array[i],sah+1)
            }

        }


        this.sob=function(s,p,p1){


        }

        this.setKalss=function(klass){
            
            if(this.arrayC[this.array.length]==undefined){
                this.arrayC[this.array.length]=new IBlok(this,this.sob);
                this.arrayC[this.array.length].idArr=this.array.length-1;                
            }
            let blok=this.arrayC[this.array.length]

            blok.setKalss(klass)
            this.array.push(blok);

            if(klass.children){                
                for (var i = 0; i < klass.children.length; i++) {                    
                    if(klass.children[i].bForst==true) {                        
                        this.setKalss(klass.children[i].klass);                        
                    }
                }
            }

            return blok;
        }



        this.setSob=function(s, p, p1){
            if(s=="openLoad"){
                this.start(p1)
            }         
        }

        this.fun_rotationZ = function (rotation) { 
            for (var i = 0; i < this.array.length; i++) {
                this.arrayC[i].fun_rotationZ(rotation);
            } 
        }


    }
    set debug(value) {
        if(this._debug!=value){
            this._debug= value; 
            for (var i = 0; i < this.array.length; i++) {
                this.arrayC[i].debug=this._debug;
            }                        
        }
    }    
    get debug() { return  this._debug;}
}


export class IBlok  {
    constructor(par, fun) {         
        this.type="IBlok";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;

        this._debug = this.par._debug;
        this._width = 30;
        this.x = 0;
        this.y = 0;
        this.idArrIn=0

        this.content3d=new THREE.Object3D();
       // 



        this.ibVisi=new IBVisi(this,function(s,p,p1){

        })



/*
        this.axesHelper=new THREE.AxesHelper(10);
        this.axesHelper1=new THREE.AxesHelper(20);

        if(this._debug){ 
            this.content3d.add(this.axesHelper);
            this.content3d.add(this.axesHelper1);
        }*/

        this.thick=5;//;жирность класса
        this.distance=0;


        this.rotationZ=0;
        this.rotationX=0;
        this.redius=0;



        this.clear=function(){

        }

        this.klass=undefined;
        this.setKalss=function(klass){     
            this.klass=klass;
            this.klass.iBlok=this;
        }

        this.wwww=0
        this.start=function(){

           
            if(this.klass.parent==undefined){
                this.par.content3d.add(this.content3d)

            }
            else{
                this.klass.parent.iBlok.content3d.add(this.content3d)
            }
            let kol;
            

            this.par.sahPlus++;

            this.kolStrokAll=this.klass.kolStrok;                
            this.kolStrokStart=this.klass.kolStrok;
            this.kolStrok =this.klass.kolStrok;

            this.distance=(this.klass.array.length+1)*10//this.kolStrok; 



            for (var i = 0; i < kol; i++) {
                if(this.klass.children[i].bForst) continue
                k=this.klass.array[i].iBlok.start(); 
                kk+=this.klass.array[i].iBlok.kolStrokAll
            }


            
            this.wwww = this._width
            var kk=0;
            let k;
            var kkmm=0;

          
            var sah=this._width
            for (var i = this.klass.array.length - 1; i >= 0; i--) {               
                if(!this.klass.children[i].bForst) continue 
                k=this.klass.array[i].klass.iBlok.start(); 
                
                k.x=sah
                sah+=k._width;   
                           
                kk+=this.klass.array[i].klass.iBlok.kolStrokAll
                if(kkmm<this.klass.array[i].klass.iBlok.kolStrok)kkmm=this.klass.array[i].klass.iBlok.kolStrok
            }

            this._width=sah
            this.wwww = this._width
           


            this.kolStrokAll+=kk
            this.thick=(5+this.kolStrokAll/500)/4
            
            
            return this;
        }

      /*  var ang,dis
        var point={x:0,y:0}
        var point1={x:0,y:0}
        var pointNull={x:0,y:0}
        var vect=new THREE.Vector3()
        var vect1=new THREE.Vector3()
        var vectNull=new THREE.Vector3()*/
        
        this.startVisi=function(){            


            var xxx=0;    
            for (var i = this.klass.array.length - 1; i >= 0; i--) {                  
                
                if(this.klass.children[i].bForst==true){
                   
                    

                    let k=this.klass.array[i].klass.iBlok

                    k.y=-(i+1)*13 

                    
                    k.x=xxx+k._width;
                 
                    xxx+=k._width;
                    k.startVisi(); 

                } 
                               
            }

            

           /* calc.getVector(this.kolStrok,this.rotationX,point1);
            calc.getVector(point1.x,this.rotationZ,vect1);
            vect1.z=point1.y
            this.content3d.position.set(vect1.x,vect1.y,vect1.z);*/
            if(this.x==0)this.x=0.001
            
            
            this.content3d.position.x=this.x
            this.content3d.position.z=this.y
        
           // if(this.klass.linePosit)this.content3d.position.z=-(this.idArrIn+1)*10//this.klass.linePosit//line.line
            

    

            this.ibVisi.draw()
            return this;
        }


        this.fun_rotationZ = function (rotation) { 
            this.ibVisi.fun_rotationZ(rotation)
            
        }

    }

    set debug(value) {
        if(this._debug!=value){
            this._debug= value;
          /*  if(this._debug){
                this.content3d.add(this.axesHelper);
                this.content3d.add(this.axesHelper1);
            }   else{
                this.content3d.remove(this.axesHelper); 
                this.content3d.remove(this.axesHelper1);
            }  */                                 
        }
    }    
    get debug() { return  this._debug;}
}

import { TLabel } from '../../../t3d/TStyle.js';

export class IBVisi  {
    constructor(par, fun) {         
        this.type="IBVisi";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        this._debug = this.par._debug;
        this.content3d=new THREE.Object3D();   
        this.par.content3d.add(this.content3d);
        
        this.mesh=new THREE.Mesh(this.par.par.par.m3info.geometrySphere,pm.mat.getIdmhbd(1));
        this.content3d.add(this.mesh) 
       

       
        this.mesh1=new THREE.Mesh(this.par.par.par.m3info.geometryCylinder,pm.mat.getIdmhbd(3));
        this.content3d.add(this.mesh1)
        this.mesh1.rotation.x=Math.PI/2;

        this.mesh2=new THREE.Mesh(this.par.par.par.m3info.geometryCylinder,pm.mat.getIdmhbd(3));
        this.content3d.add(this.mesh2)
        this.mesh2.rotation.z=Math.PI/2;

        this.cont2=new THREE.Object3D(); 
        this.content3d.add(this.cont2);
        this.fs=self.param.fontSizeLittel/2
        this.tLabel=new TLabel(this.cont2,0,0,"")
        this.tLabel.fontSize=this.fs;
        this.tLabel.material=pm.mat.getIdmhbd(4);


    

        this.tLabel.cont3d.position.y=this.fs/2

        

        this.draw=function(){  
            this.mesh.scale.set(this.par.thick*1.1,this.par.thick*1.1,this.par.thick*1.1) 
            this.mesh1.scale.set(1,this.par.distance,1);
            
            this.mesh2.scale.set(1,this.par.content3d.position.x,1);
            this.mesh2.position.x=-this.par.content3d.position.x/2

            
            this.tLabel.cont3d.position.x=this.par.thick+this.fs;

            



           /* this.cont3d.position.x=-this.par.content3d.position.x/2;
            this.cont3d.position.y=-this.par.content3d.position.y/2;*/
            this.mesh1.position.z=-this.par.distance/2//-this.par.content3d.position.z/2;

            this.tLabel.text=this.par.klass.name

            this.fun_rotationZ()

            /*this.mesh.scale.set(this.par.thick*1.1,this.par.thick*1.1,this.par.thick*1.1) 
            this.mesh1.scale.set(this.par.thick,this.par.kolStrok,this.par.thick);
            
            this.cont3d.rotation.z=this.par.rotationZ-Math.PI/2;
            this.mesh1.rotation.x=this.par.rotationX;
            this.tLabel.cont3d.position.x=this.par.thick+this.fs



            this.cont3d.position.x=-this.par.content3d.position.x/2;
            this.cont3d.position.y=-this.par.content3d.position.y/2;
            this.cont3d.position.z=-this.par.content3d.position.z/2;
            this.tLabel.text=this.par.klass.name

            this.fun_rotationZ()*/

        }  

        this.fun_rotationZ = function (rotation) { 
            this.cont2.rotation.z=-visi3D.rotationZ
            this.tLabel.object3d.rotation.x=visi3D.rotationX
            
           
            
        }
    }
}




export class M3info  {
    constructor(par, fun) {         
        this.type="M3info";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;


        this.geometryBox = new THREE.BoxGeometry( 1,1,1 );
        this.geometryCone = new THREE.ConeGeometry( 1, 1, 32 );  
        this.geometryCylinder = new THREE.CylinderGeometry( 1, 1, 1, 32 );
        this.geometrySphere = new THREE.SphereGeometry( 1, 32, 32 );



        this._debug = this.par._debug;
        this.content3d=new THREE.Object3D();
        this.par.content3d.add(this.content3d);

        this.sun=new THREE.Object3D();//Kонтейнер с позицией солнца
        this.point=new THREE.Object3D();//Kонтейнер с ночальной позицией дерева

        this.content3d.add(this.sun);
        this.content3d.add(this.point);


        this.axesHelper=new THREE.AxesHelper(50);
        this.axesHelper1=new THREE.AxesHelper(100);
        if(this._debug){ 

            this.sun.add(this.axesHelper);
            this.point.add(this.axesHelper1);
        }

        this.sun.position.z=222


    }


    set debug(value) {
        if(this._debug!=value){
            this._debug= value;
              
            if(this._debug){
                this.sun.add(this.axesHelper);
                this.point.add(this.axesHelper1);
            }   else{
                this.sun.remove(this.axesHelper); 
                this.point.remove(this.axesHelper1);
            }                     
        }
    }    
    get debug() { return  this._debug;} 
}