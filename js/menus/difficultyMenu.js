class DifficultyMenu extends Menu{
    constructor(canvas){
        super(canvas,5)
    }

    checkIfEasyTriggered(){
        if((click[0] >= (this.canvas.width/2)-95 &&
           click[0] <= (this.canvas.width/2)+95 &&
           click[1] >= (this.canvas.height*(2/8)+37.5) &&
           click[1] <= (this.canvas.height*(2/8)+112.5)
        )
        || (pause[1] && this.isMenuOpened)
        || (shoot[1] && this.isMenuOpened && this.currentButton == 1)
        ){
            return true;
        }else{
            return false;
        }
    }

    checkIfNormalTriggered(){
        if((click[0] >= (this.canvas.width/2)-95 &&
           click[0] <= (this.canvas.width/2)+95 &&
           click[1] >= (this.canvas.height*(3/8)+37.5) &&
           click[1] <= (this.canvas.height*(3/8)+112.5)
        )
        || (pause[1] && this.isMenuOpened)
        || (shoot[1] && this.isMenuOpened && this.currentButton == 2)
        ){
            return true;
        }else{
            return false;
        }
    }

    checkIfHardTriggered(){
        if((click[0] >= (this.canvas.width/2)-95 &&
           click[0] <= (this.canvas.width/2)+95 &&
           click[1] >= (this.canvas.height*(4/8)+37.5) &&
           click[1] <= (this.canvas.height*(4/8)+112.5)
        )
        || (pause[1] && this.isMenuOpened)
        || (shoot[1] && this.isMenuOpened && this.currentButton == 3)
        ){
            return true;
        }else{
            return false;
        }
    }

    checkIfLunaticTriggered(){
        if((click[0] >= (this.canvas.width/2)-95 &&
           click[0] <= (this.canvas.width/2)+95 &&
           click[1] >= (this.canvas.height*(5/8)+37.5) &&
           click[1] <= (this.canvas.height*(5/8)+112.5)
        )
        || (pause[1] && this.isMenuOpened)
        || (shoot[1] && this.isMenuOpened && this.currentButton == 4)
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
        || (shoot[1] && this.isMenuOpened && this.currentButton == 5)
        || (special[1] && this.isMenuOpened)
        ){
            return true;
        }else{
            return false;
        }
    }

    setMenu(){
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
        this.isMenuOpened = false;
        menuHasChanged = false;
        pauseBgm(currentBgm);
    }

    render(){
        this.canvas.drawRect("#222222",0,0,this.canvas.width,this.canvas.height);
        this.canvas.writeText("#FFFFFF",45,"Choose a difficulty",(this.canvas.width/2),(this.canvas.height*(3/16)));

        if(this.currentButton == 1){
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(2/8)+37.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(2/8)+37.5),5,80);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(2/8)+112.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)+95,(this.canvas.height*(2/8)+37.5),5,80);
        }
        this.canvas.writeText("#00FF55",30,"Easy",(this.canvas.width/2),(this.canvas.height*(2/8)+75))

        if(this.currentButton == 2){
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(3/8)+37.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(3/8)+37.5),5,80);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(3/8)+112.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)+95,(this.canvas.height*(3/8)+37.5),5,80);
        }
        this.canvas.writeText("#FFBB00",30,"Normal",(this.canvas.width/2),(this.canvas.height*(3/8)+75))

        if(this.currentButton == 3){
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(4/8)+37.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(4/8)+37.5),5,80);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(4/8)+112.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)+95,(this.canvas.height*(4/8)+37.5),5,80);
        }
        this.canvas.writeText("#FF2200",30,"Hard",(this.canvas.width/2),(this.canvas.height*(4/8)+75))

        if(this.currentButton == 4){
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(5/8)+37.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(5/8)+37.5),5,80);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(5/8)+112.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)+95,(this.canvas.height*(5/8)+37.5),5,80);
        }
        this.canvas.writeText("#7700FF",30,"Lunatic",(this.canvas.width/2),(this.canvas.height*(5/8)+75))

        if(this.currentButton == 5){
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(6/8)+37.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(6/8)+37.5),5,80);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(6/8)+112.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)+95,(this.canvas.height*(6/8)+37.5),5,80);
        }
        this.canvas.writeText("#FFFFFF",30,"Back",(this.canvas.width/2),(this.canvas.height*(6/8)+75))
    }
}