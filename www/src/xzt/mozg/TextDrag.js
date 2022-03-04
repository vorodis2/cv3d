
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
        }

        this.getText=function(ctvPoint){
            var s="";          
            if(ctvPoint.isOdinak()==true)return s//not выделения            
            var o=ctvPoint.getPor();            
            if(o.l==o.l1){
                var l=this.par.array[o.l];
                var sah=l.getSah(o.s)
                var sah1=l.getSah(o.s1)
                s=l.text.substr(sah1,sah-sah1)
                
                
            }else{
                for (var i = o.l1; i <= o.l; i++) {
                    var l=this.par.array[i];
                    if(i==o.l1){
                        s+=l.text.substr(l.getSah(o.s1),99999)
                    }else{
                        if(i==o.l){                            
                            s+=l.text.substr(0,l.getSah(o.s))
                        }else{
                            s+=l.text
                        }
                    }
                }
            }  
            return s;
        }

       

        this.isStrInArr=function(str,arr){ 
            for (var i = 0; i < arr.length; i++) {
                if(arr[i]==str)return true
            }
            return false
        }

        
    }
}



