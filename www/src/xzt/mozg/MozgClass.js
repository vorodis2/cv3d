


export class MozgClass  {
  	constructor(par, fun) {  		
  		this.type="MozgClass";
  		var self=this;
        this.par=par;
        this.fun=fun;
        this.name=""

        this.mzbText=this.par.mzbText;
        this.line=null;
        this.line1=null

        this.setLines=function(l,l1){
            
            this.line=l;
            this.line1=l1
            this.poiskInClass()
        }


        this.poiskInClass=function(){//this.mzbText.array.length
            for (var i = this.line.line; i <= this.line1.line; i++) {
                
                if(this.mzbText.array[i].text.indexOf("new")!=-1){
                    trace(i,this.mzbText.array[i].text)
                }

            }
        }
  	}
}




