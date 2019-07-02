class Item extends Entity{
    constructor(x,y,hitBoxSize,speed,type){
        super(x,y,hitBoxSize,speed);
        this.type = type;
        this.isCaught = false;
        this.initialSpeed = this.speed;
        this.playerDrop = false;
        this.randomVectorDropPlayer = new Vector(0,0);
        this.currentTimeDropPlayer = 0;
        this.timeDropPlayer = 60
    }

    checkCollision(){
        var itemToCheck = this;

        // player
        if(collisionBetween(itemToCheck,player,(slow[1] ? 8 : 4)) && !this.playerDrop){
            if(collisionBetween(itemToCheck,player,(1/2))){
                itemToCheck.addBonus(); 
            }else{
                itemToCheck.getCaught()
            }
        }
    }

    update(){
        // item behavior
        if(this.isCaught){
            this.XtoReach = player.x;
            this.YtoReach = player.y;
            this.reachItsPoint();
        }else{
            if(this.playerDrop){
                if(this.currentTimeDropPlayer != 0){
                    move(this, this.randomVectorDropPlayer);
                    this.currentTimeDropPlayer--;
                }else{
                    this.speed = this.initialSpeed;
                    this.playerDrop = false;
                }       
            }else{
                move(this, new Vector(0,1));
            }
        }

        // item out of canvas
        if(this.x < -100 || this.x > canvas.width+100 || this.y < -100 || this.y > canvas.height+100){
            var indexOfItemOut = items.indexOf(this);
            items.splice(indexOfItemOut,1);
        } 
    }

    render(){
        // items sprite
        canvas.writeText("#DD0000",this.hitBoxSize*3,spriteItem(this.type), this.x, this.y);
    }

    setRandomType(){
        var randomNumber = Math.random();
        var types = {
            0: "score",
            1: "power",
            2: "specialLadybug",
            3: "specialBee",
            4: "lifePoint"
        }
        this.type = types[(randomNumber > 0.66 ? (randomNumber > 0.98 ? (randomNumber > 0.99 ? 4 : (player instanceof Ladybug ? 2 : 3)) : 1) : 0)];
    }

    getCaught(){
        this.speed = player.initialSpeed*2.5;
        this.isCaught = true;
    }

    addBonus(){
        if(this.type == "score"){
            score += (10 + Math.round(Math.random()*10))*scaleDifficultyScore;
            playSFX("itemScore",1,sliderSfx.value/50);
        }
        if(this.type == "power"){
            if(player.power < player.maxPower){
                player.soundPowerUpIsPlayed = false;
                player.power += 1;
            }
            player.setLevelPower();
            playSFX("itemPower",1,sliderSfx.value/100);
        } 
        if(this.type == "specialLadybug" || this.type == "specialBee"){
            player.specialAttackStocked++;
            playSFX("itemSpecial",1,sliderSfx.value/100);
        }
        if(this.type == "lifePoint"){
            player.lifePoint++;
            playSFX("itemLifePoint",1,sliderSfx.value/100);
        } 
        var indexOfItemOut = items.indexOf(this);
        items.splice(indexOfItemOut,1);
    }
}