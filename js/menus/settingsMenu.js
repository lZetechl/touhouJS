class SettingsMenu extends Menu{
    constructor(canvas){
        super(canvas,4)
    }

    checkIfVolumeBgmChanged(){
        if(this.currentButton == 1 && left[1]){
            if(sliderBgm.value < 10){
                sliderBgm.value = 0;
            }else{
                sliderBgm.value -= 10;
            }
            left[1] = false;
        } else if(this.currentButton == 1 && right[1]){
            if(sliderBgm.value > 90){
                sliderBgm.value = 100;
            }else{
                sliderBgm.value += 10;
            }
            right[1] = false;
        }
    }

    checkIfVolumeSfxChanged(){
        if(this.currentButton == 2 && left[1]){
            if(sliderSfx.value < 10){
                sliderSfx.value = 0;
            }else{
                sliderSfx.value -= 10;
            }
            left[1] = false;
        } else if(this.currentButton == 2 && right[1]){
            if(sliderSfx.value > 90){
                sliderSfx.value = 100;
            }else{
                sliderSfx.value += 10;
            }
            right[1] = false;
        }
    }

    checkIfHowToPlayTriggered(){
        if((click[0] >= (this.canvas.width/2)-95 &&
           click[0] <= (this.canvas.width/2)+95 &&
           click[1] >= (this.canvas.height*(5/8)+37.5) &&
           click[1] <= (this.canvas.height*(5/8)+112.5)
        )
        || (shoot[1] && this.isMenuOpened && this.currentButton == 4)
        ){
            return true;
        }else{
            return false;
        }
    }

    checkIfControlsTriggered(){
        if((click[0] >= (this.canvas.width/2)-95 &&
           click[0] <= (this.canvas.width/2)+95 &&
           click[1] >= (this.canvas.height*(4/8)+37.5) &&
           click[1] <= (this.canvas.height*(4/8)+112.5)
        )
        || (shoot[1] && this.isMenuOpened && this.currentButton == 5)
        ){
            return true;
        }else{
            return false;
        }
    }

    checkIfBackTriggered(){
        if((click[0] >= (this.canvas.width/2)-95 &&
           click[0] <= (this.canvas.width/2)+95 &&
           click[1] >= (this.canvas.height*(6/8)+37.5) &&
           click[1] <= (this.canvas.height*(6/8)+112.5)
        )
        || (pause[1] && this.isMenuOpened)
        || (shoot[1] && this.isMenuOpened && this.currentButton == 4)
        || (special[1] && this.isMenuOpened)
        ){
            return true;
        }else{
            return false;
        }
    }

    setMenu(){
        sliderBgm.style.visibility = "visible";
        sliderSfx.style.visibility = "visible";
        currentBgm = mainMenuBgm;
        playBgm(currentBgm,sliderBgm.value/100);
        this.isMenuOpened = true;
    }

    removeMenu(){
        click[0] = 0;
        click[1] = 0;
        pause[1] = false;
        shoot[1] = false;
        special[1] = false;
        pauseBgm(currentBgm);
        sliderBgm.style.visibility = "hidden";
        sliderSfx.style.visibility = "hidden";
        this.isMenuOpened = false;
    }

    render(){
        this.canvas.drawRect("#222222",0,0,this.canvas.width,this.canvas.height);
        this.canvas.writeText("#FFFFFF",60,"Settings",(this.canvas.width/2),(this.canvas.height*(2/8)));

        if(this.currentButton == 1){
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/4)-95,(this.canvas.height*(2/8)+30),380,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/4)-95,(this.canvas.height*(2/8)+30),5,80);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/4)-95,(this.canvas.height*(2/8)+105),380,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/4)+285,(this.canvas.height*(2/8)+30),5,80);
        }
        this.canvas.writeText("#FFFFFF",30,"Music volume:",(this.canvas.width/4)+20,(this.canvas.height*(3/8))-30);

        if(this.currentButton == 2){
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/4)-95,(this.canvas.height*(3/8)+20),380,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/4)-95,(this.canvas.height*(3/8)+20),5,80);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/4)-95,(this.canvas.height*(3/8)+95),380,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/4)+285,(this.canvas.height*(3/8)+20),5,80);
        }
        this.canvas.writeText("#FFFFFF",30,"Sfx volume:",(this.canvas.width/4)+20,(this.canvas.height*(3/8))+60);

        if(this.currentButton == 3){
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(4/8)+37.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(4/8)+37.5),5,80);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(4/8)+112.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)+95,(this.canvas.height*(4/8)+37.5),5,80);
        }
        this.canvas.writeText("#FFFFFF",30,"Controls",(this.canvas.width/2),(this.canvas.height*(4/8)+75))

        if(this.currentButton == 4){
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(5/8)+37.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(5/8)+37.5),5,80);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(5/8)+112.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)+95,(this.canvas.height*(5/8)+37.5),5,80);
        }
        this.canvas.writeText("#FFFFFF",30,"How to play",(this.canvas.width/2),(this.canvas.height*(5/8)+75))

        if(this.currentButton == 5){
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(6/8)+37.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(6/8)+37.5),5,80);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(6/8)+112.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)+95,(this.canvas.height*(6/8)+37.5),5,80);
        }
        this.canvas.writeText("#FFFFFF",30,"Back",(this.canvas.width/2),(this.canvas.height*(6/8)+75))
    }
}