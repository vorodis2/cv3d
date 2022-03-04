


export class CTLabel extends DLabel {
    constructor(dCont, _x, _y, _text, par) {
        super(dCont, _x, _y, _text);
        this.type = 'CTLabel';
        this.par=par;
        this.fontSize=par._fontSize
        this._lineHeight=par._lineHeight

        this.dCT.div.style.display="inline";
        this.dCT.div.style.whiteSpace="pre-wrap";
        this.dCT.div.style.lineHeight= this._lineHeight;
        
        
    }
     set text(value) {
        if (this._text != value) {
            this._text = value;
            this._value = value;
        
            this.dCT.div.innerHTML = this._text;
            if (this.dCT1) this.dCT1.div.innerHTML = this._text;
        }
    }
    get text() {
        return this._text;
    }
    set value(value) {
        if (this._value != value) {
            this._value = value;
            this.text = value;
        }
    }
    get value() {
        return this._text;
    }
}

