class VictoryMenu extends Menu{
    constructor(canvas){
        super(canvas,1);
        this.firstScore = 0;
        this.secondScore = 0;
        this.thirdScore = 0;
    }

    checkIfMenuTriggered(){
        if(gameIsFinished && gameIsWin){
            return true;
        }
        else{
            return false;
        }
    }

    checkIfMainMenuTriggered(){
        if((click[0] >= (this.canvas.width/2)-95 &&
           click[0] <= (this.canvas.width/2)+95 &&
           click[1] >= (this.canvas.height*(6/8)+37.5) &&
           click[1] <= (this.canvas.height*(6/8)+112.5)
        ) 
        || (shoot[1] && this.isMenuOpened)
        ){
            return true;
        }else{
            return false;
        }
    }

    getHighScore(){
        if(!this.isMenuOpened){
            var scores = JSON.parse(localStorage['highscore']);
            return scores;
        }       
    }

    sortHighscores(){
        if(!this.isMenuOpened){
            var highscores = this.getHighScore();
            highscores.sort(function(a, b) {
                if (a < b) {
                    return -1;
                } else if (a > b) {
                    return 1;
                } else {
                    return 0;
                }
            });
            return highscores;
        }
    }

    setMenu(){
        if(!this.isMenuOpened){
            click[0] = 0;
            click[1] = 0;
            pause[1] = false;
            shoot[1] = false;
            special[1] = false;
            this.firstScore = this.sortHighscores()[this.getHighScore().length-1];
            this.secondScore = (this.sortHighscores().length > 2 ? this.sortHighscores()[this.getHighScore().length-2] : 0);
            this.thirdScore = (this.sortHighscores().length > 3 ? this.sortHighscores()[this.getHighScore().length-3] : 0);
        }
        currentBgm = victoryBgm;
        playBgm(currentBgm,sliderBgm.value/100)
        this.isMenuOpened = true;
    }

    removeMenu(){
        click[0] = 0;
        click[1] = 0;
        pause[1] = false;
        shoot[1] = false;
        special[1] = false;
        this.isMenuOpened = false;
        stopBgm(currentBgm);
    }

    render(){
        this.canvas.drawRect("rgba(0,0,0,0.8)",0,0,this.canvas.width,this.canvas.height);
        this.canvas.writeText("#FFFFFF",60,"Victory !",(this.canvas.width/2),(this.canvas.height*(2/8)));

        this.canvas.leftAlignText();
        this.canvas.writeText("#FFFFFF",20,"#1:",(this.canvas.width/4),(this.canvas.height*(4/8)-70));
        this.canvas.writeText("#FFFFFF",20,"#2:",(this.canvas.width/4),(this.canvas.height*(4/8))-20);
        this.canvas.writeText("#FFFFFF",20,"#3:",(this.canvas.width/4),(this.canvas.height*(4/8)+30));
        this.canvas.writeText("#FFFFFF",20,"You",(this.canvas.width/4),(this.canvas.height*(4/8)+100));

        this.canvas.rightAlignText();
        if(!this.isMenuOpened){
            this.canvas.writeText("#FFFFFF",20,""+this.sortHighscores()[this.getHighScore().length-1]+"",(this.canvas.width*(3/4)),(this.canvas.height*(4/8)-70));
            this.canvas.writeText("#FFFFFF",20,""+(this.sortHighscores().length > 2 ? this.sortHighscores()[this.getHighScore().length-2] : 0)+"",(this.canvas.width*(3/4)),(this.canvas.height*(4/8))-20);
            this.canvas.writeText("#FFFFFF",20,""+(this.sortHighscores().length > 3 ? this.sortHighscores()[this.getHighScore().length-3] : 0)+"",(this.canvas.width*(3/4)),(this.canvas.height*(4/8)+30));
            this.canvas.writeText("#FFFFFF",20,score,(this.canvas.width*(3/4)),(this.canvas.height*(4/8)+100));
        }else{
            this.canvas.writeText("#FFFFFF",20,""+this.firstScore+"",(this.canvas.width*(3/4)),(this.canvas.height*(4/8)-70));
            this.canvas.writeText("#FFFFFF",20,""+this.secondScore+"",(this.canvas.width*(3/4)),(this.canvas.height*(4/8))-20);
            this.canvas.writeText("#FFFFFF",20,""+this.thirdScore+"",(this.canvas.width*(3/4)),(this.canvas.height*(4/8)+30));
            this.canvas.writeText("#FFFFFF",20,score,(this.canvas.width*(3/4)),(this.canvas.height*(4/8)+100));
        }

        this.canvas.centerText();
        this.canvas.writeText("#FFFFFF",30,"Try a higher difficulty ?",(this.canvas.width/2),(this.canvas.height*(5/8)+75))

        this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(6/8)+37.5),190,5);
        this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(6/8)+37.5),5,80);
        this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)-95,(this.canvas.height*(6/8)+112.5),190,5);
        this.canvas.drawRect("#FFFFFF",(this.canvas.width/2)+95,(this.canvas.height*(6/8)+37.5),5,80);
        this.canvas.writeText("#FFFFFF",30,"Main menu",(this.canvas.width/2),(this.canvas.height*(6/8)+75))
    }
}