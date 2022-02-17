
import { Mozg3D } from './mozg3d/Mozg3D.js';


export class Scane3d  {
  	constructor(par, fun) {  		
  		this.type="Scane3d";
  		var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param


        this._life = true;//Общая работа компонета
        if(localS.object["p_Scane3d_life"]==undefined)localS.object["p_Scane3d_life"]=this._life
        this._life=localS.object["p_Scane3d_life"];


        this._debug = false;
        if(localS.object["p_Scane3d_debug"]==undefined)localS.object["p_Scane3d_debug"]=this._debug
        this._debug=localS.object["p_Scane3d_debug"];

        this._timeActiv = 500;
        if(localS.object["p_Scane3d_timeActiv"]==undefined)localS.object["p_Scane3d_timeActiv"]=this._timeActiv
        this._timeActiv=localS.object["p_Scane3d_timeActiv"];



        this.array=[]

        this.content3d=new THREE.Object3D()
        this.par.content3d.add(this.content3d)
       


        

        this.array[0]=this.mozg3D=new Mozg3D(this,function(s,p){

        })

        this.array[1]=this.m3Yzel=new M3Yzel(this,function(s,p){

        })





        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            }            
        }

  	}

    set life(value) {
        if(this._life!=value){
            this._life= value;
            for (var i = 0; i < this.array.length; i++) {
                if( this.array[i].life!=undefined)this.array[i].life=this._life;
            }  
            localS.object["p_Scane3d_life"]=value;
            localS.save();             
        }
    }    
    get life() { return  this._life;}

    set debug(value) {
        if(this._debug!=value){
            this._debug= value;
            for (var i = 0; i < this.array.length; i++) {
                if( this.array[i].debug!=undefined)this.array[i].debug=this._debug;
            }  
            localS.object["p_Scane3d_debug"]=value;
            localS.save(); 
            this.fun("visi3d")            
        }
    }    
    get debug() { return  this._debug;}


    set timeActiv(value) {
        if(this._timeActiv!=value){
            this._timeActiv= value; 
            for (var i = 0; i < this.array.length; i++) {
                if( this.array[i].timeActiv!=undefined)this.array[i].timeActiv=this._timeActiv;
            }  
            localS.object["p_Scane3d_timeActiv"]=value;
            localS.save();                        
        }
    }    
    get timeActiv() { return  this._timeActiv;} 

}




export class M3Yzel  {
    constructor(par, fun) {         
        this.type="M3Yzel";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param

        this.content3d=new THREE.Object3D();
        this.par.content3d.add(this.content3d);

        this.array=[]

        this.array[0]=this.m3YNiz=new M3YNiz(this,function(s,p){

        })

        this.array[1]=this.m3Position=new M3Position(this,function(s,p){

        })

        visi3D.fun_rotationZ = function () { 
            trace("99");           
            for (var i = 0; i < self.array.length; i++) {
                if(self.array[i].fun_rotationZ){
                    self.array[i].fun_rotationZ(visi3D.rotationZ)
                }
            }
            
        } 


    }
}

export class M3Position  {
    constructor(par, fun) {         
        this.type="M3Position";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;

        this.mouseup = function (e) {

            
            if (self.mobile == false) {
                document.removeEventListener('mouseup', self.mouseup);
            } else {
                document.removeEventListener('touchend', self.mouseup);
            }
            self.bool=false

            trace("!!!!!!!!!!!!!!!!!!!!!!!!!!")
        };



        this.bool=false
        this.start=function(){
            if(this.bool==true)return
            this.bool=true;
            
            if (dcmParam.mobile == false) {
                document.addEventListener('mouseup', self.mouseup);
            } else {
                document.addEventListener('mouseup', self.mouseup);
            }    
        }  


        this.fun_rotationZ = function (rotation) { 
            this.start()            
        }
    }
}




export class M3YNiz  {
    constructor(par, fun) {         
        this.type="M3YNiz";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param

        this.radius=500;
        this.segments=64;
        this.otstup=this.param.otstup
        this.content3d=new THREE.Object3D();
        this.par.content3d.add(this.content3d);



        const geometry = new THREE.CircleGeometry( this.radius, 64,0, Math.PI );
        this.mesh=new THREE.Mesh(geometry,pm.mat.getIdmhbd(1));
        this.content3d.add(this.mesh)
        this.mesh.rotation.y=Math.PI

        this.mesh1=new THREE.Mesh(geometry,pm.mat.getIdmhbd(1));
        this.mesh1.position.z=this.otstup
        this.content3d.add(this.mesh1)

        const geometry1 = new THREE.PlaneGeometry( this.radius*2, this.otstup );
        this.mesh2=new THREE.Mesh(geometry1,pm.mat.getIdmhbd(2));
        this.mesh2.rotation.x=Math.PI/2
        this.content3d.add(this.mesh2)
        this.mesh2.position.z=this.otstup/2  

        const geometry3 = new THREE.CylinderGeometry( this.radius, this.radius, this.otstup, this.segments,1,true,0, Math.PI/2  );
        this.mesh3=new THREE.Mesh(geometry3,pm.mat.getIdmhbd(2));
        this.mesh3.rotation.x=-Math.PI/2
        this.mesh3.position.z=this.otstup/2 
        this.content3d.add(this.mesh3)

        this.mesh3=new THREE.Mesh(geometry3,pm.mat.getIdmhbd(2));
        this.mesh3.rotation.x=-Math.PI/2
        this.mesh3.position.z=this.otstup/2 
        this.mesh3.rotation.z=Math.PI
        this.content3d.add(this.mesh3)



        this.fun_rotationZ = function (rotation) { 
            // this.content3d.rotation.z=rotation-Math.PI
        }

    }
}