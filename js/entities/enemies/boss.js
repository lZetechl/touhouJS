class Boss extends enemy{
    constructor(x,y,numberOfPhase){
        super(x,y,80,7,3000,90,50,3,3500);
        this.currentPhaseLeft = numberOfPhase
        this.maxLifePoint = this.lifePoint;
        this.attackVariable = 0;
        this.attackSwitch = false;
    }

    shoot() {
        if(this.reloadProjectile < this.rateOfFire){
            this.reloadProjectile++;
        }else{
            if(this.currentPhaseLeft == 2){
                circleAttack(this,9,7*scaleDifficultySpeed,this.attackVariable%360,45,spriteProjectile(""+this.constructor.name+"1"));
                if(this.attackVariable%3 == 0){
                    playSFX("shot2",1,sliderSfx.value/200);
                    playSFX("shot2",1,0.25);
                }
                if(this.attackVariable%90 == 0){
                    targetAttack(this,17,13*scaleDifficultySpeed,spriteProjectile(""+this.constructor.name+"2"));
                    playSFX("shot3",1,sliderSfx.value/50);
                }
                this.attackVariable += 10;
                this.reloadProjectile = 0;
            } else if(this.currentPhaseLeft == 1){
                badTargetAttack(this,15,14*scaleDifficultySpeed,6,spriteProjectile(""+this.constructor.name+"2"));
                this.reloadProjectile = 0;
            } else if(this.currentPhaseLeft == 0){
                if(!this.attackSwitch){
                    this.reloadProjectile = -50;
                    this.rateOfFire = 7
                    this.attackSwitch = true;
                }else{
                    circleAttack(this,9,7*scaleDifficultySpeed,this.attackVariable%360,45,spriteProjectile(""+this.constructor.name+"1"));
                    playSFX("shot2",1,sliderSfx.value/200);
                    playSFX("shot2",1,sliderSfx.value/200);
                    this.reloadProjectile = 0;
                }
            }
        } 
        if(this.currentPhaseLeft == 0){
            if(this.attackSwitch){
                var radianValue = this.attackVariable*(Math.PI/180);
                this.XtoReach = this.x-Math.cos(radianValue)*10;
                this.YtoReach = this.y+Math.sin(radianValue)*10;
                this.attackVariable++;
            }  
        }
    }

    getNumberItemDrop(){
        var extraDrop = Math.random();
        if(this.currentPhaseLeft == 0){
            return 25+(extraDrop > 0.8 ? 5 : 0);
        }else{
            return 10+(extraDrop > 0.8 ? 2 : 0);
        }
    }
}
