
import { TDStyle } from './TDStyle.js';


export class TextDrag  {
    constructor(par, fun) {



        this.type="TextDrag";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.text=""; 

        this.arr_s2=["import","from", "export", "class","var","if","continue","if","new"]
        this.arr_s4=["this","undefined","true","false"]
        this.arr_s5=["function","window","document",]
        
        if(window.tdStyle==undefined) {
            window.tdStyle=new TDStyle();
        }     
        


        this.drag=function(){
            this.text=""
            //this.text='<color:red>+</span>7 <span class="s1">(</span>900<span>)</span> 800 <span class="s2">30 50</span>'
            for (var i = 0; i < this.par.array.length; i++) {
                this.dLine(this.par.array[i]);
                this.text+=this.par.array[i].textSpan
                             
            }
        }

        this.dLine=function(line){
            line.textSpan=''//<span class="s2">'+line.text+'</span>';  
            line.textSpan='<span style="tab-size: 4; '+tdStyle.getSpanColor("s2")+'">';  
            
           


           for (var j = 0; j < line.array.length; j++) {                               
                if(line.arrBo[j]==0){
                    line.textSpan+='<span class="s1">'+line.array[j]+'</span>';
                }else{
                    if(this.isStrInArr(line.array[j],this.arr_s2)==true){
                        line.textSpan+=tdStyle.getSpan("s2")+line.array[j]+'</span>';
                        continue
                    }
                    if(this.isStrInArr(line.array[j],this.arr_s4)==true){
                        line.textSpan+=tdStyle.getSpan("s4")+line.array[j]+'</span>';
                        continue
                    }
                    if(this.isStrInArr(line.array[j],this.arr_s5)==true){
                        line.textSpan+=tdStyle.getSpan("s5")+line.array[j]+'</span>';
                        continue
                    }
                    


                    line.textSpan+='<span class="s3">'+line.array[j]+'</span>';
                    
                }
            }  
            line.textSpan+='</span>' 
           // line.textSpan+='<br>'             
        }

        this.isStrInArr=function(str,arr){ 
            for (var i = 0; i < arr.length; i++) {
                if(arr[i]==str)return true
            }
            return false
        }

        
    }
}



