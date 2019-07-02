class enemy extends Entity{
    constructor(x, y, hitBoxSize, speed, lifePoint, deathAnimationFrame, invincibilityFrames, rateOfFire, scoreWhenKilled) {
        super(x, y, hitBoxSize, speed);
        this.lifePoint = lifePoint;
        this.getHit = false;
        this.playerProjectileTouched = null;
        this.touchedBySpecialAttack = false;
        this.isDead = false;
        this.deathAnimationFrame = deathAnimationFrame;
        this.currentDeathAnimationFrame = 0;
        this.invincibilityFrames = invincibilityFrames;
        this.currentTimeInvincible = 0
        this.scoreWhenKilled = (scoreWhenKilled + Math.round(Math.random()*(scoreWhenKilled/10)))*scaleDifficultyScore;
        this.hasDroppedItem = false;
        this.rateOfFire = rateOfFire*scaleDifficultyRateOfFire;
        this.reloadProjectile = 0;
    }

    checkCollision(){
        var enemyToCheck = this;

        projectiles.forEach(function(projectile){
            if(collisionBetween(enemyToCheck,projectile,1) && projectile.owner == "Player"){
                enemyToCheck.getHit = true;
                enemyToCheck.playerProjectileTouched = projectile;
            }
            if(collisionBetween(enemyToCheck,projectile,1) && projectile.owner == "PlayerSpecial" && !enemyToCheck.touchedBySpecialAttack){
                enemyToCheck.getHit = true;
                enemyToCheck.playerProjectileTouched = projectile;
                enemyToCheck.touchedBySpecialAttack = true;
            }
        })
    }

    update(){
        // enemy behavior
        if(!this.isDead){
            this.reachItsPoint();
            this.shoot();
        }

        // update invincibility frames
        if(this.currentTimeInvincible != 0){
            this.currentTimeInvincible--;
        }

        // enemy hit
        if(this.getHit){
            this.lifePoint = this.lifePoint - this.playerProjectileTouched.damage;
            if(this.constructor.name == "Boss"){
                if(this.lifePoint <= 0 && !this.isDead){
                    if(this.currentPhaseLeft > 0){
                        this.lifePoint = this.maxLifePoint;
                        this.currentPhaseLeft--;
                        this.currentTimeInvincible = this.invincibilityFrames;
                        this.reloadProjectile = -this.invincibilityFrames*2
                    }else{
                            this.isDead = true;
                    }
                    this.dropItem();
                } 
            }else{
                if(this.lifePoint <= 0 && !this.isDead){
                    this.isDead = true
                }
            }
            playSFX("playerHit",1,sliderSfx.value/100);
                this.getHit = false;
        }

        // enemy death
        if(this.isDead){
            if(!this.hasDroppedItem){
                score += this.scoreWhenKilled;
                this.dropItem();
                if(this.constructor.name == "Boss"){
                    playSFX("bossCollapse",1,sliderSfx.value/100);
                }else{
                    playSFX("enemyDeath",1,sliderSfx.value/100);
                }
                this.hasDroppedItem = true;
            }   
            if(this.currentDeathAnimationFrame == this.deathAnimationFrame){
                this.currentDeathAnimationFrame = 0;
                var indexOfenemyOut = enemies.indexOf(this);
                enemies.splice(indexOfenemyOut,1);  
            }else{
                this.currentDeathAnimationFrame++;
            }
        }

        // enemy out of canvas
        if(this.x < -100 || this.x > canvas.width+100 || this.y < -100 || this.y > canvas.height+100){
            this.reloadProjectile = 0;
            var indexOfenemyOut = enemies.indexOf(this);
            enemies.splice(indexOfenemyOut,1);
        } 
    }

    render(){
        if(this.isDead){
            canvas.writeText("rgba(0,0,0,"+(this.currentDeathAnimationFrame > this.deathAnimationFrame/3 ? ((this.deathAnimationFrame-this.currentDeathAnimationFrame)/(this.deathAnimationFrame/3)) : 1)+")",
                      this.currentDeathAnimationFrame*(this.hitBoxSize/4),
                      deathSprite, 
                      this.x,
                      this.y
            );
        }

        if(!this.isDead){
            if(this instanceof Skull){
                canvas.drawCircle("rgba(80,35,35,"+(this.currentChargeAnimationFrame / this.chargeAnimationFrame)+")",
                this.x, 
                this.y, 
                this.hitBoxSize*2*(this.currentChargeAnimationFrame / this.chargeAnimationFrame)
                );
            }   
            canvas.writeText("#000000",this.hitBoxSize*2,spriteEnemy(""+this.constructor.name+""), this.x, this.y);
        } 
    }

    dropItem(){
        for(var i = 0; i < this.getNumberItemDrop(); i++){
            var randomItemSpawnVarience = Math.round((Math.random()*10))-5;
            randomItemSpawnVarience += (randomItemSpawnVarience < 0 ? -(Math.round((Math.random()*5))+5) : (Math.round((Math.random()*5))+5));
            var itemDrop = new Item(this.x+randomItemSpawnVarience, this.y+randomItemSpawnVarience ,8,4,"");
            itemDrop.setRandomType();
            items.push(itemDrop);
        }
    }
}