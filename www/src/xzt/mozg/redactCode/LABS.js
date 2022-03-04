
import { CTLabel } from './CTLabel.js';

export class LABS {
    constructor(dCont,par,mzBlok) {
        this.type = 'LABS';
        this.array=[];
        this.dCont=new DCont(dCont);
        this.par=par;
        this.mzBlok=mzBlok
        this._heightS=20
        this._height=100;
        this.fontSize=par._fontSize
        this._lineHeight=par._lineHeight
              
        this._pozitY=0;
        this.sah=(dcmParam.fontSize)*this._lineHeight;
        this._yS=0;
        this.clear=function () {
            for (var i = 0; i < this.array.length; i++) this.array[i].visible=false
        }

        this.getO=function(){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].visible==false){
                    this.array[i].visible=true
                    return this.array[i];
                }
            }

            this.array.push(new CTLabel(this.dCont,0,0,0,this))
            this.array[this.array.length-1].sahPo=0
            this.array[this.array.length-1].idArr=this.array.length-1
            this.array[this.array.length-1].width=9999
            this.array[this.array.length-1].activMouse=false
            return this.array[this.array.length-1];
        }


        this.getOPos=function(idPo){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].visible!==false){
                    if(this.array[i].idPo==idPo){
                        return this.array[i];
                    }
                }
            }
            return null;
        }

        this.getLabel=function(line){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].visible!==false){
                    if(this.array[i].idPo==line){
                        return this.array[i]
                    }

                }
            }
            return null   
        }


        this.clearLine=function(line){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].visible!==false){
                    if(this.array[i].idPo==line){
                        this.array[i].visible=false
                    }

                }
            }   
        }

        this.dragLine=function(l){
            
            var idArr=l//l.idArr
            if( typeof l =="object")idArr=l.idArr
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].visible!==false){
                    if(this.array[i].idPo==idArr){
                        let s1=this.mzBlok.mzbText.array[idArr].textSpan 
                        this.array[i].text=s1;
                    }
                }
            }
        }    


        this.drag=function(){
            var mm=this._yS+this._heightS
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].visible!==false){
                    if(this.array[i].idPo<this._yS)this.array[i].visible=false
                    if(this.array[i].idPo>mm)this.array[i].visible=false    
                }
            }

            var yS=this._yS;
            let oo
            var s1,a
            for (var i = 0; i < this._heightS; i++) {
                oo= this.getOPos(yS+i)
                if(oo==null){
                    oo=this.getO()
                    oo.idPo=yS+i;
                    oo.y=oo.idPo*this.sah;
                    oo.sahPo++
                    s1=""                    

                    if(this.mzBlok.mzbText.array[oo.idPo]){
                        s1=this.mzBlok.mzbText.array[oo.idPo].textSpan  
                    }  
                    oo.text=s1;
                }
            }
        } 
    }

   set heightS(value) {
        if (this._heightS != value) {
            this._heightS = value;
            this.drag()
             
        }
    }
    get heightS() {
        return this._heightS;
    }


    set height(value) {
        if (this._height != value) {
            this._height = value;
            var _height=Math.ceil((this._height+this.sah)/this.sah);
            this.heightS =_height;
        }
    }
        get height() {
        return this._height;
    }




    set yS(yS) {
        if (this._yS != yS) {
            this._yS = yS;
            this.drag();  
        }
    }
    get yS() {
        return this._yS;
    }

    set pozitY(pozitY) {
        if (this._pozitY != pozitY) {
            this._pozitY = pozitY;
            var yS=Math.floor(this._pozitY/this.sah)
            this.yS=yS;
        }
    }
    get pozitY() {
        return this._pozitY;
    }
}

