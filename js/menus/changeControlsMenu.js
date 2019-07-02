class ChangeControlsMenu extends Menu{
    constructor(canvas){
        super(canvas,9)
    }

    checkIfUpTriggered(){
        if((click[0] >= (this.canvas.width*(13/16))-45 &&
           click[0] <= (this.canvas.width*(13/16))+45 &&
           click[1] >= (this.canvas.height*(3/16))+51 &&
           click[1] <= (this.canvas.height*(3/16))+86
        )
        || (shoot[1] && this.isMenuOpened && this.currentButton == 1)
        ){
            return true;
        }else{
            return false;
        }
    }

    checkIfDownTriggered(){
        if((click[0] >= (this.canvas.width*(13/16))-45 &&
           click[0] <= (this.canvas.width*(13/16))+45 &&
           click[1] >= (this.canvas.height*(4/16))+51 &&
           click[1] <= (this.canvas.height*(4/16))+86
        )
        || (shoot[1] && this.isMenuOpened && this.currentButton == 2)
        ){
            return true;
        }else{
            return false;
        }
    }

    checkIfLeftTriggered(){
        if((click[0] >= (this.canvas.width*(13/16))-45 &&
           click[0] <= (this.canvas.width*(13/16))+45 &&
           click[1] >= (this.canvas.height*(5/16))+51 &&
           click[1] <= (this.canvas.height*(5/16))+86
        )
        || (shoot[1] && this.isMenuOpened && this.currentButton == 3)
        ){
            return true;
        }else{
            return false;
        }
    }

    checkIfRightTriggered(){
        if((click[0] >= (this.canvas.width*(13/16))-45 &&
           click[0] <= (this.canvas.width*(13/16))+45 &&
           click[1] >= (this.canvas.height*(6/16))+51 &&
           click[1] <= (this.canvas.height*(6/16))+86
        )
        || (shoot[1] && this.isMenuOpened && this.currentButton == 4)
        ){
            return true;
        }else{
            return false;
        }
    }

    checkIfShootTriggered(){
        if((click[0] >= (this.canvas.width*(13/16))-45 &&
           click[0] <= (this.canvas.width*(13/16))+45 &&
           click[1] >= (this.canvas.height*(7/16))+51 &&
           click[1] <= (this.canvas.height*(7/16))+86
        )
        || (shoot[1] && this.isMenuOpened && this.currentButton == 5)
        ){
            return true;
        }else{
            return false;
        }
    }

    checkIfSlowTriggered(){
        if((click[0] >= (this.canvas.width*(13/16))-45 &&
           click[0] <= (this.canvas.width*(13/16))+45 &&
           click[1] >= (this.canvas.height*(8/16))+51 &&
           click[1] <= (this.canvas.height*(8/16))+86
        )
        || (shoot[1] && this.isMenuOpened && this.currentButton == 6)
        ){
            return true;
        }else{
            return false;
        }
    }

    checkIfSpecialTriggered(){
        if((click[0] >= (this.canvas.width*(13/16))-45 &&
           click[0] <= (this.canvas.width*(13/16))+45 &&
           click[1] >= (this.canvas.height*(9/16))+51 &&
           click[1] <= (this.canvas.height*(9/16))+86
        )
        || (shoot[1] && this.isMenuOpened && this.currentButton == 7)
        ){
            return true;
        }else{
            return false;
        }
    }

    checkIfAbilityTriggered(){
        if((click[0] >= (this.canvas.width*(13/16))-45 &&
           click[0] <= (this.canvas.width*(13/16))+45 &&
           click[1] >= (this.canvas.height*(10/16))+51 &&
           click[1] <= (this.canvas.height*(10/16))+86
        )
        || (shoot[1] && this.isMenuOpened && this.currentButton == 8)
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
        || (shoot[1] && this.isMenuOpened && this.currentButton == 9)
        || (special[1] && this.isMenuOpened)
        ){
            return true;
        }else{
            return false;
        }
    }

    setMenu(){
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
        this.isMenuOpened = false;
    }

    render(){
        this.canvas.drawRect("#222222",0,0,this.canvas.width,this.canvas.height);
        this.canvas.writeText("#FFFFFF",60,"Settings",(this.canvas.width/2),(this.canvas.height*(1/8)));
        this.canvas.writeText("#FFFFFF",30,"Change Controls",(this.canvas.width/2),(this.canvas.height*(5/24)));
        this.canvas.leftAlignText();

        // UP
        this.canvas.writeText("#FFFFFF",20,"Up: "+getKeyName(up[0]),(this.canvas.width*(1/16)),(this.canvas.height*(3/16)+75));

        // DOWN
        this.canvas.writeText("#FFFFFF",20,"Down: "+getKeyName(down[0]),(this.canvas.width*(1/16)),(this.canvas.height*(4/16)+75));

        // LEFT
        this.canvas.writeText("#FFFFFF",20,"Left: "+getKeyName(left[0]),(this.canvas.width*(1/16)),(this.canvas.height*(5/16)+75));

        // RIGHT
        this.canvas.writeText("#FFFFFF",20,"Right: "+getKeyName(right[0]),(this.canvas.width*(1/16)),(this.canvas.height*(6/16)+75));

        // SHOOT
        this.canvas.writeText("#FFFFFF",20,"Shoot: "+getKeyName(shoot[0]),(this.canvas.width*(1/16)),(this.canvas.height*(7/16)+75));

        // SLOW
        this.canvas.writeText("#FFFFFF",20,"Slow: "+getKeyName(slow[0]),(this.canvas.width*(1/16)),(this.canvas.height*(8/16)+75));

        // SPECIAL
        this.canvas.writeText("#FFFFFF",20,"Special: "+getKeyName(special[0]),(this.canvas.width*(1/16)),(this.canvas.height*(9/16)+75));

        // ABILITY
        this.canvas.writeText("#FFFFFF",20,"Ability: "+getKeyName(ability[0]),(this.canvas.width*(1/16)),(this.canvas.height*(10/16)+75));

        this.canvas.centerText();
        for(var i = 3; i < 11; i++){
            if(this.currentButton == i-2 && i < 11){
                this.canvas.drawRect("#FFFFFF",(this.canvas.width*(13/16))-45,(this.canvas.height*(i/16)+51),80,5);
                this.canvas.drawRect("#FFFFFF",(this.canvas.width*(13/16))-45,(this.canvas.height*(i/16)+51),5,40);
                this.canvas.drawRect("#FFFFFF",(this.canvas.width*(13/16))-45,(this.canvas.height*(i/16)+86),80,5);
                this.canvas.drawRect("#FFFFFF",(this.canvas.width*(13/16))+35,(this.canvas.height*(i/16)+51),5,40);
            }
            this.canvas.writeText("#FFFFFF",15,"Change",(this.canvas.width*(13/16))-3,(this.canvas.height*(i/16)+72.5));
        }
        
        // BACK BUTTON
        if(this.currentButton == 9){
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(6/8)+37.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(6/8)+37.5),5,80);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(6/8)+112.5),190,5);
            this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)+95,(this.canvas.height*(6/8)+37.5),5,80);
        }
        this.canvas.writeText("#FFFFFF",30,"Back",(this.canvas.width/2),(this.canvas.height*(6/8)+75));
    }
}