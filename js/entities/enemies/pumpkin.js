class Pumpkin extends enemy{
    constructor(x,y) {
        super(x,y,60,5,500*scaleDifficultyHealth,30,0,60,175);
        this.alternedShotAngle = false;
    }

    shoot() {
        if(this.reloadProjectile < this.rateOfFire){
            this.reloadProjectile++;
        }else{
            if(this.alternedShotAngle){
                circleAttack(this,9,5*scaleDifficultySpeed,0,15,spriteProjectile(""+this.constructor.name+""));
                playSFX("shot2",1,sliderSfx.value/100);
                this.alternedShotAngle = false;
            }else{
                circleAttack(this,9,5*scaleDifficultySpeed,7.5,15,spriteProjectile(""+this.constructor.name+""));
                playSFX("shot2",1,sliderSfx.value/100);
                this.alternedShotAngle = true;
            }
            this.reloadProjectile = 0;
        } 
    }

    getNumberItemDrop(){
        var extraDrop = Math.random();
        return 4+(extraDrop > 0.8 ? 1 : 0);
    }
}