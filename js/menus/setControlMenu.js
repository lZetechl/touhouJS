class SetControlMenu extends Menu{
    constructor(canvas){
        super(canvas,1)
    }

    checkIfBackTriggered(){
        if(click[0] >= (this.canvas.width/2)-95 &&
            click[0] <= (this.canvas.width/2)+95 &&
            click[1] >= (this.canvas.height*(6/8)+37.5) &&
            click[1] <= (this.canvas.height*(6/8)+112.5)
        ){
            return true;
        }else{
            return false;
        }
    }

    setKey(key){
        if(up[0] == key){
            up[0] = getAllInputs()[0];
        } else if(down[0] == key){
            down[0] = getAllInputs()[0];
        } else if(left[0] == key){
            left[0] = getAllInputs()[0];
        } else if(right[0] == key){
            right[0] = getAllInputs()[0];
        } else if(shoot[0] == key){
            shoot[0] = getAllInputs()[0];
        } else if(slow[0] == key){
            slow[0] = getAllInputs()[0];
        } else if(special[0] == key){
            special[0] = getAllInputs()[0];
        } else if(ability[0] == key){
            ability[0] = getAllInputs()[0];
        }
    }

    setMenu(){
        if(!this.isMenuOpened){
            clearAllInputs();
        }
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
        this.canvas.writeText("#FFFFFF",60,"Press a key",(this.canvas.width/2),(this.canvas.height/2));
        
        // BACK BUTTON
        this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(6/8)+37.5),190,5);
        this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(6/8)+37.5),5,80);
        this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(6/8)+112.5),190,5);
        this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)+95,(this.canvas.height*(6/8)+37.5),5,80);
        this.canvas.writeText("#FFFFFF",30,"Back",(this.canvas.width/2),(this.canvas.height*(6/8)+75));
    }
}