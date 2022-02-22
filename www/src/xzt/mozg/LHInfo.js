


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




