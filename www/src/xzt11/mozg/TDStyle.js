
export class TDStyle  {
    constructor() {
        this.type="TDStyle";
        var self=this; 


        this.bitmapData=new DBitmapData(10,1);
        var aa=[0,0,0,0]
        for (var i = 0; i < this.bitmapData.width; i++) {
            for (var j = 0; j < this.bitmapData.height; j++) {
                this.bitmapData.setPixel(i,j,[0,0,0,i/(this.bitmapData.width-1)*50])
            }
        }
        this.bitmapData.upDate()
        this.lineLink1=this.bitmapData.getData()

        for (var i = 0; i < this.bitmapData.width; i++) {
            for (var j = 0; j < this.bitmapData.height; j++) {
                this.bitmapData.setPixel(i,j,[0,0,0,(1-i/(this.bitmapData.width-1))*50])
            }
        }
        this.bitmapData.upDate()
        this.lineLink=this.bitmapData.getData()


        this.arrStyle=[
            {color:"#67777c",key:"s1"},
            {color:"#aa8196",key:"s2"},
            {color:"#c3cbbf",key:"s3"},
            {color:"#ff0000",key:"s4"},
            {color:"#00ff00",key:"s5"}
        ]

        this.objStyle={}
        for (var i = 0; i < this.arrStyle.length; i++) {
            this.objStyle[this.arrStyle[i].key]=this.arrStyle[i]
        }


        this.getSpan=function(key){
            var s='<span style="color:'+this.objStyle[key].color+'">';

            return s
        }
        
/*

.s1 {
    color: #67777c 
}
.s2 {
    color: #aa8196 
}
.s3 {
    color: #c3cbbf 
}
.s4 {
    color: #ff0000
}
.s5 {
    color: #00ff00
}



        var style = document.createElement("SPAN");
        //style.type = 'text/css';
        style.type = `..s1 {
            color: #00ff00
        }
        .s2 {
            color: #0000ff
        }`;        
        document.getElementsByTagName('head')[0].appendChild(style);
        trace("##############")*/


       //   /* Function to add style */
       //  function addStyle(styles) {
       //       trace("!!!!",styles)
       //      /* Create style element */
       //      var css = document.createElement('style');
       //      css.type = 'text/css';
      
       //      if (css.styleSheet)
       //          css.styleSheet.cssText = styles;
       //      else
       //          css.appendChild(document.createTextNode(styles));
             
       //      /* Append style to the head element */
       //      document.getElementsByTagName("head")[0].appendChild(css);
       //  }
         
       
       // /* var styles = 'h1 { color: white }';
       //  styles += ' body { text-align: center }';
       //  styles += ' #header { height: 50px; background: green }';*/
       //  var styles=''
       //  styles += ' s1 { color: #67777c }';
       //  styles += ' s2 { color: #67007c }'; 
        
       //  trace("!dd!!!",styles)
       // // window.onload = function() { 
       //      addStyle(styles) 
       // // };
/*
       .s1 {
            color: #67777c //коменты
        }
        .s2 {
            color: #aa8196 // итп спец символы
        }
        .s3 {
            color: #c3cbbf //все что не определены
        }
        .s4 {
            color: #ff0000 //красное this undefined true
        }

       
        */

    }
}




