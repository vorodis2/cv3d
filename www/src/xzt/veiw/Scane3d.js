
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

sdfsf
мост иницилизация основ, глобал дополнение, грабли на мобильники
*/


export class Scane3d  {
  	constructor(par, fun) {  		
  		this.type="Scane3d";
  		var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param

        this.array=[]

		
        this.content3d=new THREE.Object3D()
        this.par.content3d.add(this.content3d)


        this.geometry = new THREE.BoxGeometry( 10, 10, 10 );
        this.material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );



        var s=444
        for (var i = 0; i < 222; i++) {
            var cube = new THREE.Mesh( this.geometry, this.material );
            cube.position.set(s*Math.random()-s/2,s*Math.random()-s/2,s*Math.random()-s/2)
            cube.scale.set(0.1+Math.random(),0.1+Math.random(),0.1+Math.random())
            this.content3d.add( cube );  
        } 

        ///trace(this.par.menu) 

        this.par.visi3D.addEvent("down",function(e){          
            trace('eeeee')
        })

        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            }
            
        }   

  	}
}
