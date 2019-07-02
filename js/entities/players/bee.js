class Bee extends Player{
    constructor(x, y) {
        super(x, y, 8, 7, 3, 5, 20, 50, 5, 30, 120, 3, 6);
    }

    control() {
        if (slow[1]) {
            player.speed = player.slowSpeed;
        }
        else {
            player.speed = player.initialSpeed;
        }
        if (left[1] && player.x > player.hitBoxSize / 2) {
            move(this, new Vector((shooters.length == 0 ? -1 : -0.5), 0));
        }
        if (up[1] && player.y > player.hitBoxSize / 2) {
            move(this, new Vector(0, (shooters.length == 0 ? -1 : -0.5)));
        }
        if (right[1] && player.x < canvas.width - player.hitBoxSize / 2) {
            move(this, new Vector((shooters.length == 0 ? 1 : 0.5), 0));
        }
        if (down[1] && player.y < canvas.height - player.hitBoxSize / 2) {
            move(this, new Vector(0, (shooters.length == 0 ? 1 : 0.5)));
        }
        if (shoot[1]) {
            if (this.reloadProjectile < this.rateOfFire) {
                this.reloadProjectile++;
            }else {
                if(shooters != []){
                    if(this.levelPower == 1){
                        var newProjectile = new Projectile(this.x, this.y-(this.hitBoxSize), 9, 20, new Vector(0, -1),"Player",spriteProjectile("Bee"),this.damages);
                        projectiles.push(newProjectile);
                        playSFX("shotPlayer",1,sliderSfx.value/50);
                    }else if(this.levelPower == 2){
                        var newProjectile = new Projectile(this.x-(this.hitBoxSize*(slow[1] ? 1.5 : 3)), this.y, 9, 20, new Vector(0, -1),"Player",spriteProjectile("Bee"),(slow[1] ? this.damages*0.66 : this.damages));
                        projectiles.push(newProjectile);
                        playSFX("shotPlayer",1,sliderSfx.value/50);
                        var newProjectile = new Projectile(this.x+(this.hitBoxSize*(slow[1] ? 1.5 : 3)), this.y, 9, 20, new Vector(0, -1),"Player",spriteProjectile("Bee"),(slow[1] ? this.damages*0.66 : this.damages));
                        projectiles.push(newProjectile);
                        playSFX("shotPlayer",1,sliderSfx.value/50);
                    }else if(this.levelPower == 3){
                        var newProjectile = new Projectile(this.x-(this.hitBoxSize*(slow[1] ? 2 : 3)), this.y, 9, 20, new Vector((slow[1] ? 0 : -0.25), -1),"Player",spriteProjectile("Bee"),(slow[1] ? this.damages*0.5 : this.damages));
                        projectiles.push(newProjectile);
                        playSFX("shotPlayer",1,sliderSfx.value/50);
                        var newProjectile = new Projectile(this.x, this.y-(this.hitBoxSize), 9, 20, new Vector(0, -1),"Player",spriteProjectile("Bee"),this.damages*0.5);
                        projectiles.push(newProjectile);
                        playSFX("shotPlayer",1,sliderSfx.value/50);
                        var newProjectile = new Projectile(this.x+(this.hitBoxSize*(slow[1] ? 2 : 3)), this.y, 9, 20, new Vector((slow[1] ? 0 : 0.25), -1),"Player",spriteProjectile("Bee"),(slow[1] ? this.damages*0.5 : this.damages));
                        projectiles.push(newProjectile);
                        playSFX("shotPlayer",1,sliderSfx.value/50);
                    }else if(this.levelPower >= 4){
                        var newProjectile = new Projectile(this.x-(this.hitBoxSize*(slow[1] ? 2 : 3)), this.y, 9, 20, new Vector((slow[1] ? 0 : -0.25), -1),"Player",spriteProjectile("Bee"),(slow[1] ? this.damages*0.415 : this.damages));
                        projectiles.push(newProjectile);
                        playSFX("shotPlayer",1,sliderSfx.value/50);
                        var newProjectile = new Projectile(this.x-(this.hitBoxSize*(slow[1] ? 1 : 2)), this.y-(this.hitBoxSize), 9, 20, new Vector(0, -1),"Player",spriteProjectile("Bee"),(slow[1] ? this.damages*0.415 : this.damages*0.75));
                        projectiles.push(newProjectile);
                        playSFX("shotPlayer",1,sliderSfx.value/50);
                        var newProjectile = new Projectile(this.x+(this.hitBoxSize*(slow[1] ? 1 : 2)), this.y-(this.hitBoxSize), 9, 20, new Vector(0, -1),"Player",spriteProjectile("Bee"),(slow[1] ? this.damages*0.415 : this.damages*0.75));
                        projectiles.push(newProjectile);
                        playSFX("shotPlayer",1,sliderSfx.value/50);
                        var newProjectile = new Projectile(this.x+(this.hitBoxSize)*(slow[1] ? 2 : 3), this.y, 9, 20, new Vector((slow[1] ? 0 : 0.25), -1),"Player",spriteProjectile("Bee"),(slow[1] ? this.damages*0.415 : this.damages));
                        projectiles.push(newProjectile);
                        playSFX("shotPlayer",1,sliderSfx.value/50);
                    }
                }
                this.reloadProjectile = 0;
            }
        }
        if(special[1]){
            if (!this.specialUsed && this.specialAttackStocked >= 1) {
                this.specialUsed = true;
                this.specialAttackStocked--;
                this.currentTimeInvincible = 200;
                var specialShooter = new Shooter(this.x,this.y,this.initialSpeed*2,50,20,150,20,"BeeSpecial");
                shooters.push(specialShooter);
                enemies.forEach(function(enemy){
                    enemy.touchedBySpecialAttack = false;
                })
                playSFX("specialAttack",1,sliderSfx.value/100);
                playSFX("hyperBeam",1,sliderSfx.value/100);
            }
        }else{
            this.specialUsed = false;
        }
        if(ability[1]){
            if (!this.abilityUsed && this.levelPower >= 4 && this.specialAttackStocked < this.maxSpecialAttackStocked) {
                this.abilityUsed = true;
                this.specialAttackStocked++;
                this.power -= (this.levelUpStep*3);
                this.setLevelPower();
                playSFX("itemSpecial",1,sliderSfx.value/100);
            }
        }else{
            this.abilityUsed = false;
        }
    }
}