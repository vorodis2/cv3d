
export class AvtoObnova  {
  	constructor(par, fun) {  		
  		this.type="AvtoObnova";
  		var self=this;
        this.par=par;
        this.fun=fun;        
        this.param=this.par.param;
        this._life=false
        this.time=""

        this.start=function(){
            var link=this.par.link;
            trace(link)
            mhbd.setPHP({tip:"getTimeFile",dir:link},  function(data){                 
                 
                self.time= data
                self._life=self.par._life                        
            })
        }
        
        let timerId = setInterval(() =>{
            if(self._life==false)return
            mhbd.setPHP({tip:"getTimeFile",dir:self.par.link},  function(data){   
                if(self.time!==data){
                    self.fun("upLoad")
                }
            })        
        }, 1000);



    }  
    set life(value) {
        if(this._life!=value){
            this._life= value;            
                     
        }
    }    
    get life() { return  this._life;}   
}



