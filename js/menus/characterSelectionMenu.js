class CharacterSelectionMenu extends Menu{
    constructor(canvas){
        super(canvas,2)
        this.currentButtonInSameLine = 1;
    }

    checkIfCharacter1Triggered(){
        if((click[0] >= (this.canvas.width/4)-40 &&
           click[0] <= (this.canvas.width/4)+40 &&
           click[1] >= (this.canvas.height*(3/8)+37.5) &&
           click[1] <= (this.canvas.height*(3/8)+112.5)
        )
        || (shoot[1] && this.isMenuOpened && this.currentButton == 1 && this.currentButtonInSameLine == 1)
        ){
            return true;
        }else{
            return false;
        }
    }

    checkIfCharacter2Triggered(){
        if((click[0] >= (this.canvas.width*(3/4))-40 &&
           click[0] <= (this.canvas.width*(3/4))+40 &&
           click[1] >= (this.canvas.height*(3/8)+37.5) &&
           click[1] <= (this.canvas.height*(3/8)+112.5)
        )
        || (shoot[1] && this.isMenuOpened && this.currentButton == 1 && this.currentButtonInSameLine == 2)
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
        || (shoot[1] && this.isMenuOpened && this.currentButton == 2)
        || (special[1] && this.isMenuOpened)
        ){
            return true;
        }else{
            return false;
        }
    }

    checkHorizontalSelection(){
        if(left[1]){
            if(this.currentButtonInSameLine == 1){
                this.currentButtonInSameLine = 2;
            }else{
                this.currentButtonInSameLine--;
            }
            left[1] = false;
            playSFX("switchButtonMenu",1,sliderSfx.value/200);
        }
        if(right[1]){
            if(this.currentButtonInSameLine == 2){
                this.currentButtonInSameLine = 1;
            }else{
                this.currentButtonInSameLine++;
            }
            right[1] = false;
            playSFX("switchButtonMenu",1,sliderSfx.value/200);
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
        this.canvas.writeText("#FFFFFF",45,"Choose your bug",(this.canvas.width/2),(this.canvas.height*(2/8)));

        if(this.currentButton == 1 && this.currentButtonInSameLine == 1){
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/4)-40,(this.canvas.height*(3/8)+37.5),80,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/4)-40,(this.canvas.height*(3/8)+37.5),5,80);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/4)-40,(this.canvas.height*(3/8)+112.5),80,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/4)+40,(this.canvas.height*(3/8)+37.5),5,80);
        }
        this.canvas.writeText("#FFFFFF",30,spritePlayer("Ladybug"),(this.canvas.width*(65/256)),(this.canvas.height*(29/61)));
        this.canvas.writeText("#FFFFFF",20,"Stable speed",(this.canvas.width/4),(this.canvas.height*(5/8)-40));
        this.canvas.writeText("#FFFFFF",20,"Average damages",(this.canvas.width/4),(this.canvas.height*(5/8)));
        this.canvas.writeText("#FFFFFF",15,"Special: Sparks Splash",(this.canvas.width/4),(this.canvas.height*(5/8)+40));

        if(this.currentButton == 1 && this.currentButtonInSameLine == 2){
            this.canvas.drawRect("#FFFFFF",(this.canvas.width*(3/4))-40,(this.canvas.height*(3/8)+37.5),80,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width*(3/4))-40,(this.canvas.height*(3/8)+37.5),5,80);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width*(3/4))-40,(this.canvas.height*(3/8)+112.5),80,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width*(3/4))+40,(this.canvas.height*(3/8)+37.5),5,80);
        }
        this.canvas.writeText("#FFFFFF",30,spritePlayer("Bee"),(this.canvas.width*(194/256)),(this.canvas.height*(29/61)));
        this.canvas.writeText("#FFFFFF",20,"High speed",(this.canvas.width*(3/4)),(this.canvas.height*(5/8)-40));
        this.canvas.writeText("#FFFFFF",20,"High damages",(this.canvas.width*(3/4)),(this.canvas.height*(5/8)));
        this.canvas.writeText("#FFFFFF",15,"Special: Hyper Beam",(this.canvas.width*(3/4)),(this.canvas.height*(5/8)+40));

        if(this.currentButton == 2){
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(6/8)+37.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(6/8)+37.5),5,80);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(6/8)+112.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)+95,(this.canvas.height*(6/8)+37.5),5,80);
        }
        this.canvas.writeText("#FFFFFF",30,"Back",(this.canvas.width/2),(this.canvas.height*(6/8)+75))
    }
}