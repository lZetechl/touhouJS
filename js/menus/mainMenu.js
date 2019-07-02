class MainMenu extends Menu{
    constructor(canvas){
        super(canvas,3)
    }

    checkIfStartGameTriggered(){
        if((click[0] >= (this.canvas.width/2)-95 &&
           click[0] <= (this.canvas.width/2)+95 &&
           click[1] >= (this.canvas.height*(4/8)+37.5) &&
           click[1] <= (this.canvas.height*(4/8)+152.5)
        )
        || (shoot[1] && this.isMenuOpened && this.currentButton == 1)
        ){
            return true;
        }else{
            return false;
        }
    }

    checkIfCustomStartTriggered(){
        if((click[0] >= (this.canvas.width/2)-95 &&
           click[0] <= (this.canvas.width/2)+95 &&
           click[1] >= (this.canvas.height*(5/8)+37.5) &&
           click[1] <= (this.canvas.height*(5/8)+112.5)
        )
        || (shoot[1] && this.isMenuOpened && this.currentButton == 2)
        ){
            return true;
        }else{
            return false;
        }
    }

    checkIfSettingsTriggered(){
        if((click[0] >= (this.canvas.width/2)-95 &&
           click[0] <= (this.canvas.width/2)+95 &&
           click[1] >= (this.canvas.height*(6/8)+37.5) &&
           click[1] <= (this.canvas.height*(6/8)+112.5)
        )
        || (shoot[1] && this.isMenuOpened && this.currentButton == 3)
        ){
            return true;
        }else{
            return false;
        }
    }

    clickOnInput(input){
        if(this.checkIfCustomStartTriggered()){
            input.click();
        }
    }

    setMenu(input){
        document.addEventListener("click",this.clickOnInput(input))
        currentBgm = mainMenuBgm;
        playBgm(currentBgm,sliderBgm.value/100);
        this.isMenuOpened = true;
    }

    removeMenu(input){
        pauseBgm(currentBgm);
        document.removeEventListener("click",this.clickOnInput(input));
        click[0] = 0;
        click[1] = 0;
        pause[1] = false;
        shoot[1] = false;
        special[1] = false;
        this.isMenuOpened = false;
        menuHasChanged = false;
    }

    render(){
        this.canvas.drawRect("#222222",0,0,this.canvas.width,this.canvas.height);
        this.canvas.writeText("#FFFFFF",80,"Touhou JS",(this.canvas.width/2),(this.canvas.height/3));

        if(this.currentButton == 1){
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(4/8)+37.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(4/8)+37.5),5,80);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(4/8)+112.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)+95,(this.canvas.height*(4/8)+37.5),5,80);
        }
        this.canvas.writeText("#FFFFFF",30,"Start Game",(this.canvas.width/2),(this.canvas.height*(2/4)+75))

        if(this.currentButton == 2){
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(5/8)+37.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(5/8)+37.5),5,80);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(5/8)+112.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)+95,(this.canvas.height*(5/8)+37.5),5,80);
        }
        this.canvas.writeText("#FFFFFF",30,"Custom Start",(this.canvas.width/2),(this.canvas.height*(5/8)+75))

        if(this.currentButton == 3){
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(6/8)+37.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(6/8)+37.5),5,80);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(6/8)+112.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)+95,(this.canvas.height*(6/8)+37.5),5,80);
        }
        this.canvas.writeText("#FFFFFF",30,"Settings",(this.canvas.width/2),(this.canvas.height*(6/8)+75))
    }
}