
import { MVerh } from './MVerh.js';
import { MBILink } from '../../component/ui/MBILink.js';
import { MCPodskazka } from '../../component/ui/MCPodskazka.js';

import { MVisi3d } from './MVisi3d.js';

import { MShtora } from './MShtora.js';
import { MHelp } from './MHelp.js';

import { MFolders } from './MFolders.js';


export class Menu  {
  	constructor(par, fun) {  		
  		this.type="Menu";
  		var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;

        this.dCont=new DCont(par.dCont); 
        this.array=[]


        this.init = function(){  

            window.mCPodskazka=this.array[5] =new MCPodskazka(this.dCont,function(s,p,p1){  


            })


            this.array[3]=this.mVerh=new MVerh(this,function(s,p){

            })


            this.array[0]=this.mShtora=new MShtora(this,function(s,p){

            })
            this.array[1]=this.mFolders=new MFolders(this,function(s,p){

            })
            this.array[2]=this.mVisi3d=new MVisi3d(this,function(s,p){

            })


            this.array[6]=this.mHelp=new MHelp(this,function(s,p){

            })

/*
            
            this.array[6].width=999
            this.array[6].height=399
            this.array[6].setPage([
                {type:"pic", ru:{key:"info", id:2}, en:{key:"info", id:4},x:60,y:0,w:100,h:100}
                ])
           this.array[6].setPage([
                {type:"text", key:"info", id:3, x:-100,y:0,w:100,h:324},
                {type:"pic", ru:{key:"info", id:3}, en:{key:"info", id:1},x:60,y:0,w:300,h:34}
            ])


this.array[6].active=true*/
           



            this.mFolders.setMSBlok(this.mShtora.array[0]);

            for (var i = 0; i < this.mShtora.array.length; i++) {
                if(this.mShtora.array[i].tipe=="din"){
                    this.mVisi3d.setMSBlok(this.mShtora.array[i]);
                    break
                }
            }
            


            this.mVerh.setMShtora(this.mShtora)


            this.dCont.add(this.mVerh.dCont)

            this.dCont.add(this.mHelp.dCont)

            window.mbILink= this.array[4] = new MBILink(this,function(s,p,p1){  


            })

            this.dCont.remove(mCPodskazka.dCont)
            this.dCont.add(mCPodskazka.dCont)


        }




        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            }
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].sizeWindow)this.array[i].sizeWindow(w,h,s)
            }
        }   


        this.init()
  	}
}














