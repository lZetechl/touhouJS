class Squid extends enemy{
    constructor(x,y) {
        super(x,y,20,10,100*scaleDifficultyHealth,30,0,35,100);
    }

    shoot() {
        if(this.reloadProjectile < this.rateOfFire){
            this.reloadProjectile++;
        }else{
            badTargetAttack(this,9,10*scaleDifficultySpeed,4,spriteProjectile(""+this.constructor.name+""));
            playSFX("shot1",1,sliderSfx.value/100);
            this.reloadProjectile = 0;
        } 
    }

    getNumberItemDrop(){
        var extraDrop = Math.random();
        return 1+(extraDrop > 0.8 ? 1 : 0);
    }
}
