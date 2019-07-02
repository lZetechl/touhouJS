class Shooter extends Entity{
    constructor(x,y,speed,hitBoxSizeProjectiles,shootingSpeed,numberOfProjectiles,rateOfFire,type){
        super(x,y,0,speed);
        this.hitBoxSizeProjectiles = hitBoxSizeProjectiles;
        this.shootingSpeed = shootingSpeed;
        this.reloadProjectile = 0;
        this.rateOfFire = rateOfFire;
        this.numberOfProjectiles = numberOfProjectiles;
        this.currentNumberOfProjectiles = 0
        this.type = type;
    }

    update(){
        if(this.type == "BeeSpecial"){
            this.XtoReach = player.x;
            this.YtoReach = player.y-(this.hitBoxSizeProjectiles);
            this.reachItsPoint()
        }
        this.shoot();
    }

    shoot(){
        if(this.type == "LadybugSpecial"){
            shooterLadybugSpecial(this,this.type);
        } else if(this.type == "BeeSpecial"){
            shooterBeeSpecial(this,this.type);
        }
    }
}