class Skull extends enemy{
    constructor(x,y) {
        super(x,y,30,10,250*scaleDifficultyHealth,30,0,100,300);
        this.chargeAnimationFrame = this.rateOfFire/2;
        this.currentChargeAnimationFrame = 0;
        this.sfxChargeIsPlayer = false
    }

    shoot() {
        if(this.reloadProjectile < this.rateOfFire){
            this.reloadProjectile++;
        }else{
            if(this.currentChargeAnimationFrame < this.chargeAnimationFrame){
                if(!this.sfxChargeIsPlayer){
                    playSFX("chargedAttack",1.5,sliderSfx.value/100);
                    this.sfxChargeIsPlayer = true;
                }
                this.currentChargeAnimationFrame++;
            }else{
                targetAttack(this,14,20*scaleDifficultySpeed,spriteProjectile(""+this.constructor.name+""));
                playSFX("shot3",1,sliderSfx.value/50);
                this.currentChargeAnimationFrame = 0;
                this.reloadProjectile = 0;
                this.sfxChargeIsPlayer = false;
            } 
        } 
    }

    getNumberItemDrop(){
        var extraDrop = Math.random();
        return 2+(extraDrop > 0.8 ? 1 : 0);
    }
}