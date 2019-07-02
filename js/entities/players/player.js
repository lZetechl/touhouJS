class Player extends Entity{
    constructor(x, y, hitBoxSize, speed, startingLifePoint, maxLifePoint, damages, maxPower, maxSpecialAttackStocked, deathAnimationFrame, invincibilityFrames, slowSpeed, rateOfFire) {
        super(x, y, hitBoxSize, speed);
        this.lifePoint = startingLifePoint;
        this.maxLifePoint = maxLifePoint;
        this.damages = damages
        this.power = 0;
        this.maxPower = maxPower
        this.levelUpStep = this.maxPower/5
        this.levelPower = 1;
        this.soundPowerUpIsPlayed = true
        this.specialAttackStocked = Math.floor(maxSpecialAttackStocked/2)+1;
        this.maxSpecialAttackStocked = maxSpecialAttackStocked;
        this.specialUsed = false;
        this.abilityUsed = false;
        this.getHit = false;
        this.isDead = false;
        this.deathAnimationFrame = deathAnimationFrame;
        this.currentDeathAnimationFrame = 0;
        this.invincibilityFrames = invincibilityFrames;
        this.currentTimeInvincible = 0
        this.hasDroppedItem = false;
        this.initialSpeed = speed;
        this.slowSpeed = slowSpeed;
        this.rateOfFire = rateOfFire;
        this.reloadProjectile = this.rateOfFire;
        this.isControllable = true;
        this.xRespawn = x;
        this.yRespawn = y;
    }

    checkCollision(){
        var playerToCheck = this;

        // enemy projectiles
        projectiles.forEach(function(projectile){
            if(collisionBetween(playerToCheck,projectile,1) && (playerToCheck.currentTimeInvincible == 0 && projectile.owner != "Player" && projectile.owner != "PlayerSpecial")){
                playerToCheck.getHit = true; 
            }
        })
        // enemy
        enemies.forEach(function(enemy){
            if(collisionBetween(playerToCheck,enemy,1) && (playerToCheck.currentTimeInvincible == 0)){
                playerToCheck.getHit = true; 
            }
        })
    }

    update(){
        // sound level up step passed
        if(this.power%player.levelUpStep == 0 && this.power != 0 && player.soundPowerUpIsPlayed == false){
            this.soundPowerUpIsPlayed = true;
            playSFX("powerLevel",1,sliderSfx.value/100);
        }
        // update invincibility frames
        if(this.currentTimeInvincible != 0 && this.isControllable){
            this.currentTimeInvincible--;
        }

        // player behavior
        if(this.isControllable){
            this.control();
        }else{
            if(!this.isDead){
                if(this.y <= this.yRespawn){
                    this.speed = this.initialSpeed;
                    this.isControllable = true;
                }else{
                    this.speed = this.initialSpeed*2;
                    move(this, new Vector(0,-1));
                }
            } 
        }

        // player hit
        if(this.getHit){
            this.lifePoint--;
            this.isDead = true;
            this.isControllable = false;
            this.currentTimeInvincible = this.invincibilityFrames; 
            if(this.lifePoint > 0){
                this.dropPower();
                this.power = Math.floor(this.power/2);
            }
            items.forEach(function(item){
                item.isCaught = false;
                item.speed = item.initialSpeed;
            })
            playSFX("playerDeath",1,sliderSfx.value/100);
            this.getHit = false;
        }

        // player death
        if(this.isDead){
            items.forEach(function(item){
                item.isCaught = false;
                item.speed = item.initialSpeed;
            })
            if(this.currentDeathAnimationFrame == this.deathAnimationFrame){
                if(this.lifePoint == 0){
                    gameIsFinished = true;
                }else{   
                    teleport(this, this.xRespawn, canvas.height+75);
                    items.forEach(function(item){
                        item.isCaught = false;
                        item.speed = item.initialSpeed;
                    })
                    this.isDead = false;
                }   
                this.currentDeathAnimationFrame = 0;
            }else{
                this.currentDeathAnimationFrame++;
            }
        }
    }

    render(){
        if(this.isDead){
            // player death Animation
            canvas.writeText("rgba(0,0,0,"+(
                this.currentDeathAnimationFrame > this.deathAnimationFrame/3 ? ((this.deathAnimationFrame-this.currentDeathAnimationFrame)/(this.deathAnimationFrame/3)) : 1)+")",
                this.currentDeathAnimationFrame*(this.hitBoxSize),
                deathSprite, 
                this.x, 
                this.y
            );
        }else{
            // player sprite
            canvas.writeText("#000000",this.hitBoxSize*5,spritePlayer(""+this.constructor.name+""), this.x, this.y);
            if (slow[1]) {
                canvas.drawCircle("rgba(220,0,0,0.5)",this.x, this.y, this.hitBoxSize);
                canvas.drawCircle("rgba(255,255,255,0.5)",this.x, this.y, this.hitBoxSize/2);
            }
        }

    }

    setLevelPower(){
        for(var i = 0; i < this.maxPower/this.levelUpStep;i++){
            if(this.power >= this.maxPower-(((this.maxPower/this.levelUpStep)-i)*this.levelUpStep)){
                this.levelPower = i+1;
            }
        }
    }

    dropPower(){
        for(var i = 0; i < Math.floor(this.power/2); i++){
            var itemDrop = new Item(this.x, this.y, 8, 4, "power");
            var randomVectorX = (Math.floor(((Math.random()/2)-0.25)*100))/100;
            itemDrop.randomVectorDropPlayer = new Vector(randomVectorX,-1)
            itemDrop.currentTimeDropPlayer = itemDrop.timeDropPlayer;
            itemDrop.speed = 40;
            itemDrop.playerDrop = true;
            items.push(itemDrop);
        }
    }
}