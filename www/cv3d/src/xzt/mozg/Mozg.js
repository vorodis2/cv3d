
import { XZ } from '../XZ.js';



import { MZBlok } from './MZBlok.js';


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
                    self.fun("openLoad", true, self.klass);

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

