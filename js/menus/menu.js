class Menu{
    constructor(canvas,nbButton){
        this.canvas = canvas;
        this.isMenuOpened = false;
        this.nbButton = nbButton;
        this.currentButton = 1;
    }

    checkSelection(){
        if(up[1]){
            if(this.currentButton == 1){
                this.currentButton = this.nbButton;
            }else{
                this.currentButton--;
            }
            up[1] = false;
            playSFX("switchButtonMenu",1,sliderSfx.value/200);
        }
        if(down[1]){
            if(this.currentButton == this.nbButton){
                this.currentButton = 1;
            }else{
                this.currentButton++;
            }
            down[1] = false;
            playSFX("switchButtonMenu",1,sliderSfx.value/200);
        }
    }
}