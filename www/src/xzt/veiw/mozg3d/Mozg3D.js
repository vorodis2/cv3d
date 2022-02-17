

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

        this.array[0]=this.m3info=new M3info(this,function(s,p){

        })

        trace("!!!!!!!!!dfg!!!!!")         






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



export class M3info  {
    constructor(par, fun) {         
        this.type="M3info";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param


        this._debug = this.par._debug;
        this.content3d=new THREE.Object3D();
        this.par.content3d.add(this.content3d);

        this.sun=new THREE.Object3D();
        this.content3d.add(this.sun);
        this.axesHelper=new THREE.AxesHelper(100);
        if(this._debug){                       
            this.sun.add(this.axesHelper);
        }

        this.sun.position.y=222


    }


    set debug(value) {
        if(this._debug!=value){
            this._debug= value;
            trace("!!!!!!!",this._debug)    
            if(this._debug){
                this.sun.add(this.axesHelper);
            }   else{
                this.sun.remove(this.axesHelper); 
            }                     
        }
    }    
    get debug() { return  this._debug;} 
}