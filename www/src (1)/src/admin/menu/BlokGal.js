import { SwitchPage } from '../../component/ui/SwitchPage.js';

export class BlokGal  {
    constructor(c,x,y,nameType, fun) {
        this.type="BlokGal";
        var self=this

        this.c=c
        this._active=false;
        this._width=200;
        this._height=200;

        this._kolII=2;
        this._sort=null;

        this.nameType=nameType
        this.fun=fun

        this.dCont=new DCont();
        this.dCont.x=x;
        this.dCont.y=y;

        this.otstup=5;
        
        this.wh=18
        this.id=-1;
        this.comboSort=undefined;
        this.arrSort=undefined;
        this.array=undefined;
        this.gallery=undefined;
        this.obj=undefined;

        this.inKategor=undefined;

        this._koll = 24;
        this._sahpos = -1;
        this.searchId = -1;

        this.clik=function(){
            var id=self.obj.id;
            let a=window.location.href.split("?");
            history.pushState(null, null, a[0]+'?'+self.nameType+'='+id);
            self.fun("clik", self.obj.id)
            self.obj=undefined;
        }

        this.drag=function(){
            var o=self.obj;
            var l="not.png";
            if(o.icon)l=o.icon;
            o.dinamikNameType=self.nameType
            window.dragPic.start(32, l, o);
        }

        this.init=function(){
            if(this.comboSort!=undefined)return

            this.comboSort = new DComboBox(this.dCont, 0, 0, [], function() {
                self._sahpos = 0
                self.searchId = -1  
                if(self.arrSort[self.comboSort.index].id!=null)
                if(self.inKategor!=undefined){
                    self.inKategor=undefined;

                    trace('arrId, self.id', arrId, self.id)
                    if(arrId.length) {
                        for (var i = 0; i < arrId.length; i++) {
                            // arrId[i]
                            mhbd.setParam(self.nameType, arrId[i], "sort", self.arrSort[self.comboSort.index].id, function(){
                                self.sort = self.arrSort[self.comboSort.index].id
                            })
                        }
                    }
                    
                    return
                }
                self.inKategor=undefined;

                self.sort = self.arrSort[this.index].id
            });
            this.comboSort.height=this.wh+4;

            this.but=new DButton(this.dCont, 0, this.wh+this.otstup, "+", function() {
                self.creat();
                /*window.mInfo.setFunInput(
                    "Создание обьекта",
                    "Создать новый обьект",
                    "Имя",
                    function(){
                        self.creat(window.mInfo.text);
                    }
                );*/
            })
            this.but.width=this.but.height=this.wh;
            podskazka.setBuuton(this.but, {ru:"Добавить обьект",en:" "})

            this.but1=new DButton(this.dCont, this.wh+2, this.wh+this.otstup, "-", function() {
                window.mInfo.setFun(
                    "Удалите  обьекта",
                    "Уверне что надо грохнуть???",
                    function(){
                        //self.creatMatBG(self.par.mInfo.text)
                        self.delitt()
                    }
                );
            })
            this.but1.width=this.but1.height=this.wh;
            podskazka.setBuuton(this.but1, {ru:"Удалить обьект",en:" "})

            this.but2=new DButton(this.dCont, (this.wh+2)*2, this.wh+this.otstup, "/", function() {
                window.mInfo.setFun(
                    "в категорию",
                    "Как тыкнете ок, выбираем категорию, обьект туда перекинеться!!!!",
                    function(){ 
                        self.inKategor=true;
                    }
                );
            })
            this.but2.width=this.but2.height=this.wh;
            podskazka.setBuuton(this.but2, {ru:"в другю категорию",en:" "})

            this.but3=new DButton(this.dCont, (this.wh+2)*3, this.wh+this.otstup, ":", function() {
                window.mInfo.setFunInput(
                    "Создание категрии",
                    "Создадим категорию в которую можно вкладывать обьекты",
                    "Имя",
                    function(){
                        self.creatKategor(window.mInfo.text);
                    }
                );
            })
            this.but3.width=this.but3.height=this.wh;
            podskazka.setBuuton(this.but3, {ru:"Создание категрии",en:" "})


            var arrId = []
            var bbxz;
            this.gallery=new GalleryBG(this.dCont, -this.otstup, this.wh*2+this.otstup, function(s,p){
                if(s=="down"){
                    if(main.boolCTRL==true) {
                        bbxz = true;
                        for (var i = 0; i < arrId.length; i++) {
                            if(arrId[i] == this.array[p].object.id) {
                                arrId.splice(i, 1);
                                bbxz = false;
                                break
                            }
                        }
                    } else {
                        if(arrId.length) arrId.length = 0;
                    }

                    self.obj=this.array[p].object
                    arrId.push(this.array[p].object.id)
                    window.dragPic.testDrag(15,self.clik,self.drag);
                }
               // self.iiiii=ii
               // self.par.dragPic.testDrag(15,self.clik,self.drag);
            })

            this.gallery.width=this._width;
            this.gallery.kolII=this._kolII;
            this.gallery.widthPic=50;
            this.gallery.heightPic=50;
            this.gallery.boolName=true
            this.gallery.otstup=this.otstup
            this.gallery.panel.alpha=0.01

            this.swith = new SwitchPage(this.dCont, 0, function(s, p, p1){
                if(s=="sobKol"){
                    self.sahpos = p
                    self.searchId = -1
                }
                if(s=="resize"){
                    self.redragWH()
                }
                
            }, aGlaf.param)

            this.redragSort()
        }


        //Добавили сортировки в DComboBox
        this.redragSort=function(){   
            mhbd.getKeyList(self.nameType+"/sorts", function(e){
                e.unshift({id:null, name:"все"});
                var newArr=[];
                for (var i = 0; i < e.length; i++) {
                    newArr[i] = e[i].name;
                }
                self.arrSort=e;
                self.comboSort.array = newArr;
                self.comboSort.arrayBG = e;
                self.redragWH();

                if(self.id!==-1) {
                    self.redragGalleryall(self._sort)
                    self.setId(self.id)
                    
                }else{
                    self._sort= 11;
                    self.sort = null;
                }
            },true)
        }

  
        //Получили весь лист объектов
        this.redragGalleryall=function(_sort){
            
            if(self._sahpos == -1) {
                self._sahpos = 0
                return
            }
            self.inKategor=undefined;
            var ps=undefined
            var psii=0
            if(self.arrSort && _sort && self.searchId != -1){
                for (var i = self.arrSort.length - 1; i >= 0; i--) {
                    if(_sort && self.arrSort[i] && self.arrSort[i].id==_sort){
                        ps="?sort="+_sort
                        psii=i
                        break
                    }
                }
            }


            self.init();

            console.warn("~~~", _sort,  self._sahpos)

            if(mhbd.type=="MHBDPHP"){
                var ss=self._sort
                if(ss==null)ss=1
                var a=mhbd.getKeyList(self.nameType+"/sorts/"+ss)
                console.warn("~~~", _sort,  self._sahpos,a)
                self.setArrGal( a)
                return
            }


            self.getAllCount(ps, function(response){
                self.swith.kol = Math.ceil(response.count/self._koll);
                trace('self.swith.kol', self.swith.kol, response.count, response)
                self.swith._index = -1;
                self.getPage(ps, function(response1){
                    trace("xzxz ",response1)
                    self.setArrGal(response1) 
                   /* self.array=response1;
                    self.gallery.start(self.array); 

                    self.swith.index = self._sahpos;
                    var idd=-1
                    for (var i = 0; i < self.gallery.array.length; i++) {
                        if(self.gallery.array[i].object) {
                            if(self.gallery.array[i].object.id==self.id){
                                idd=i
                            } 
                        }
                    }
                    self.gallery._index=-2
                    self.gallery.index =idd*/
            
                })
            })

            if(ps){
                this.comboSort.index=psii
            }
        }

        this.setArrGal = function(response1){
            self.array=response1;
            self.gallery.start(self.array); 

            self.swith.index = self._sahpos;
            var idd=-1
            for (var i = 0; i < self.gallery.array.length; i++) {
                if(self.gallery.array[i].object) {
                    if(self.gallery.array[i].object.id==self.id){
                        idd=i
                    } 
                }
            }
            self.gallery._index=-2
            self.gallery.index =idd
        }


        var pss
        this.getAllCount = function(_ps, _fun){
            pss = _ps ? _ps + '&limit=1' : '?limit=1';

            var o={};
            o.url= mhbd.param.server+self.nameType+"/littel"+pss;
            o.type="GET";

            o.success = function (response) { 
                _fun(response)
            };
            o.error = function(gotData) {console.error("@#$", gotData); }

            if(self.token)
            o.headers = {
                'Authorization': 'Token ' + self.token
            };
            
            $.ajax(o);
        }


        // var url1

        this.getPage = function(_ps, _fun, _sah){
            var sahh = _sah || self._sahpos;
            var ps = _ps;

            var url1 = '?'
            if (ps) url1 = ps + '&'
            url1 += 'limit='+self._koll + '&'
            url1 += 'offset='+(self._koll*sahh)

            mhbd.getKeyList(this.nameType+"/littel", function(response){
                console.warn('response ', sahh, response )
                // if (response[response.length -1] == undefined) return
                if(self.searchId != -1) if(response[response.length -1] && response[response.length -1].id > self.searchId) {
                    sahh = sahh + 1
                    self.getPage(ps, _fun, sahh)
                    return
                }  
                self._sahpos = sahh;
                _fun(response);

            }, true, url1)
            trace("url1", url1)

        }


        // получаем ид из линка, если -1 то в линке нет ид
        this.setId = function(id, bool){
            trace("@#$ setId", id)
            self.id=id
            if(self.id > -1) {
                self.searchId = self.id*1
                mhbd.getKeyId(self.nameType, self.id, function(data){
                    self._sort = data.sort
                })
            }

            
            var idd=-1
            if(this.gallery==undefined) return
            for (var i = 0; i < this.gallery.array.length; i++) {
                if(this.gallery.array[i].object) {
                    if(this.gallery.array[i].object.id==id){
                        idd=i
                    } 
                }
            }
            this.gallery._index =-2
            this.gallery.index =idd
            

            //setTimeout(function() {}, 10);
        }


        this.redragWH=function(){
            if(self.arrSort==undefined){
                return
            }

            this.comboSort.width=this._width -4//-this.wh*2 -this.otstup*3 
            //this.but.x= this.comboSort.width+this.otstup;
           // this.but1.x= this.but.x+this.but.width+this.otstup;

            var ww=(this._width-this.otstup)/this._kolII-this.otstup;


            self.gallery.width=this._width
            this.swith.widthContent = this.gallery.width

            self.gallery.height=this._height-this.gallery.y-this.swith.wh-this.otstup


            this.gallery.kolII=this._kolII;
            this.gallery.widthPic=ww
            this.gallery.heightPic=ww+12
            this.gallery.scrollBarV.width=2


            self.swith.x = ((this.gallery.x+this.gallery.width)-self.swith.width)/2
            self.swith.y = this._height-self.swith.wh-this.otstup*2 // self.gallery.y+self.gallery.height+this.otstup
            trace("this._height", this._height, self.swith)
        }


//////////////////////////запросы/////////////////////////////
    
        this.creatKategor=function(str){
            var o={
                type: "POST",
                url: mhbd.param.server+this.nameType+"/sorts/",

                success: function(e) {
                
                    var o={}
                    o.type="PUT"
                    //o.type="PATCH";

                    o.url=mhbd.param.server+self.nameType+"/sorts/"+e.id+"/"
                    o.data={}
                    o.data["name"]=str;

                    if(self.token)
                    o.headers = {
                        'Authorization': 'Token ' + mhbd.param.token
                    };
                  
                    o.success= function function_name(data) {
                        trace("===",data)
                        self._sort=e.id
                        self.redragSort()
                        self.sort=e.id
                    }

                    $.ajax(o);                  
                },
                error: function(gotData) {console.error(gotData); }
            }            
            $.ajax(o); 
        }


        this.creat=function(str){
            mhbd.creat(this.nameType,function(e){
                self.fun("clik",e.id);
                self.redragGalleryall(self._sort);
            });
            
            
           /* var o={
                type: "POST",
                url: mhbd.param.server+this.nameType+"/",

                success: function(e) {
                    mhbd.setParam(self.nameType, e.id, "name", str,function(){
                        var sss=self.sort;
                        if(sss==null)sss=self.arrSort[1].id
                        mhbd.setParam(self.nameType, e.id, "sort", sss,function(){
                            self.fun("clik",e.id);
                            self.redragGalleryall(self._sort);
                        })
                    });
                },
                error: function(gotData) {console.error(gotData); }
            }            
            $.ajax(o); */
        }


        this.delitt=function(str){
            mhbd.deleteId(this.nameType,self.id,function(){
                self.redragGalleryall(self._sort);
            })   
            /*var o={
                type: "DELETE",
                url: mhbd.param.server+this.nameType+"/"+self.id,

                success: function(e) {
                    self.redragGalleryall(self._sort);

                },
                error: function(gotData) {console.error(gotData); }
            }

            $.ajax(o); */
        }    
    }

    set active(value) {
        if(this._active!=value){
            this._active= value;   
            if(this._active) {
                this.c.add(this.dCont)
                this.init()
            }else{
                this.c.remove(this.dCont)
            }
        }
    }    
    get active() { return  this._active;}



    set width(value) {
        if(this._width!=value){
            this._width= value; 
            this.redragWH()        
        }
    }    
    get width() { return  this._width;}

    set kolII(value) {
        if(this._kolII!=value){
            this._kolII= value; 

            this.redragWH()        
        }
    }    
    get kolII() { return  this._kolII;}


    set sahpos(value) {
        if (this._sahpos != value) {
            this._sahpos = value;
            if(value < 0) return
            this.redragGalleryall(this._sort)
        }             
    }
    get sahpos() { return this._sahpos; }


    set height(value) {
        if(this._height!=value){
            this._height= value; 
            this.redragWH()        
        }
    }    
    get height() { return  this._height;}   


    set sort(value) {
        if(this._sort!=value){
            this._sort= value; 
            this.redragGalleryall(this._sort);
        }
    }    
    get sort() { return  this._sort;} 
}






////////////////////////////////Галерея/////////////////////////////////




export function GalleryBG(dCont, _x, _y, _fun) {
    DGallery.call(this, dCont, _x, _y, _fun);
    var self=this             
    this.type="GalleryBG";   
    this.boolName=false
    this.downBtn = function () {
       

      /*  self.index = this.idArr;
        self.obj = self.array[this.idArr].object;*/

        if (self.fun) self.fun("down",this.idArr);
    };


    

    this.bmd=false
    this.scrollBarV.offsetHit=10
    
    this.createZamen=function(){
        var r=new BoxBG(this.content, 0, 0, this.downBtn, this);
        return r;
    }

    this.postDraw=function(){  
        self.scrollBarV.x=self._width-2
    }


    this.dragColorGal=function(){
        for (var i = 0; i < this.array.length; i++) {
            this.array[i].dragColorGal()
        }
    }    
}

GalleryBG.prototype = Object.create(DGallery.prototype);
GalleryBG.prototype.constructor = GalleryBG;

Object.defineProperties(GalleryBG.prototype, {

    index: {// Активный элемент
        set: function (value) {
            
            if (this.array[value] != undefined) {
                this.korektPoIndex(value);
            }
            
            this._index = value;
           
            if(main.boolCTRL == false) {
                for (var i = 0; i < this.array.length; i++) {
                    if (this._index == i) this.array[i].activ = true;
                    else this.array[i].activ = false;
                }
            } else {
                for (var i = 0; i < this.array.length; i++) {
                    if (this._index == i) this.array[i].activ = !this.array[i].activ;
                }
            }

        },
        get: function () {
            return this._index;
        }
    },
})







function BoxBG(dCont, _x, _y, _fun, par) {
    DBox.call(this, dCont, _x, _y, _fun);
    this.type = 'BoxBG';
    var self=this
    this.par = par;


    this.label.activMouse=false
    this.image.activMouse=false

   // this.label.dCT.div.style.userSelect="none"

    this.dragColorGal=function(){
        if(this.object.c!=undefined){
            
            if(this._color1 != this.object.c){
                this._color1 = this.object.c;
                this.panel.color1=this._color1;
                this.draw()
            }
        }else{
         
            if(this._color1 != this.par._color1){
                this._color1 = this.par._color1;
                this.panel.color1=this._color1;
                this.draw();
            }
        }
    }
    this.butBG=undefined

    this.startLoad = function (_obj) {
        this.object = _obj;       
        
       
        var link="favicon.ico";


        if(_obj.icon){
            link=mhbd.getLink(_obj.icon);
        }

        
        this.dragColorGal();

       
        if(_obj.id!=undefined){
            this.label.visible=true


            var s=_obj.id
            if(this.par.boolName){
                s+=" "+_obj.name
                s=s.substr(0, Math.round(this.width/4))
            }


            this.label.text=s
            this.label.div.style.pointerEvents="none";
            this.label.fontSize=10;
        }
        
        
        this.image.visible = true;
        
        this.image.link = link;
        
        self.funLoad();
        this.draw();
    };

    this.draw = function () {
        var ss = (this._width - this._otstup * 2) / this.image.picWidth;
        if (ss > (this._height - this._otstup * 2) / this.image.picHeight)ss = (this._height - this._otstup * 2) / this.image.picHeight;
        this.image.x = 0;
        this.image.width=this.image.picWidth*ss;
        this.image.height=this.image.picHeight*ss;

        this.image.x = 2;
        this.image.y = 2;

        this.label.x = 2//(this._width - this.label.curW) / 2;
        this.label.y = this._height - this.label._fontSize-2;
        /*
        if(this.butBG){
            this.butBG.x = this._width-this.butBG.width-2
            this.butBG.y = this.label.y
        }*/

        if (this.postDraw) this.postDraw();
    };

}
BoxBG.prototype = Object.create(DBox.prototype);
BoxBG.prototype.constructor = BoxBG;


