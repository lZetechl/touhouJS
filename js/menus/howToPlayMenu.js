class HowToPlayMenu extends Menu{
    constructor(canvas){
        super(canvas,1)
    }

    checkIfBackTriggered(){
        if((click[0] >= (this.canvas.width/2)-95 &&
            click[0] <= (this.canvas.width/2)+95 &&
            click[1] >= (this.canvas.height*(6/8)+37.5) &&
            click[1] <= (this.canvas.height*(6/8)+112.5)
        )
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
        this.canvas.writeText("#FFFFFF",40,"How to play",(this.canvas.width/2),(this.canvas.height*(3/16)+25));

        this.canvas.writeText("#FFFFFF",20,"Shoot all enemies on the screen !",(this.canvas.width/2),(this.canvas.height*(5/16)));
        this.canvas.writeText("#FFFFFF",20,"Dodge enemy's bullets : be careful.",(this.canvas.width/2),(this.canvas.height*(6/16)));
        this.canvas.writeText("#FFFFFF",20,"Collect items to increase",(this.canvas.width/2),(this.canvas.height*(7/16)));
        this.canvas.writeText("#FFFFFF",20,"your score and your power.",(this.canvas.width/2),(this.canvas.height*(7/16)+25));
        this.canvas.writeText("#FFFFFF",20,"Use your special attack",(this.canvas.width/2),(this.canvas.height*(9/16)));
        this.canvas.writeText("#FFFFFF",20,"to clear enemies and bullets.",(this.canvas.width/2),(this.canvas.height*(9/16)+25));
        this.canvas.writeText("#FFFFFF",20,"Too much power ?",(this.canvas.width/2),(this.canvas.height*(11/16)));
        this.canvas.writeText("#FFFFFF",20,"Use your ability to swap power",(this.canvas.width/2),(this.canvas.height*(11/16)+25));
        this.canvas.writeText("#FFFFFF",20,"into special attack.",(this.canvas.width/2),(this.canvas.height*(11/16)+50));
        
        // BACK BUTTON
        this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(6/8)+37.5),190,5);
        this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(6/8)+37.5),5,80);
        this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(6/8)+112.5),190,5);
        this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)+95,(this.canvas.height*(6/8)+37.5),5,80);
        this.canvas.writeText("#FFFFFF",30,"Back",(this.canvas.width/2),(this.canvas.height*(6/8)+75));
    }
}