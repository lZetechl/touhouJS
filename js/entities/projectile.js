class Projectile extends Entity{
    constructor(x, y, hitBoxSize, speed, vector, owner, sprite, damage) {
        super(x, y, hitBoxSize, speed);
        this.vector = new Vector(vector.dx, vector.dy);
        this.owner = owner;
        this.sprite = sprite;
        this.damage = damage;
    }

    checkCollision(){
        var projectileToCheck = this;
        
        // player
        if(collisionBetween(projectileToCheck,player,1) && player.currentTimeInvincible == 0 &&projectileToCheck.owner != "Player" && projectileToCheck.owner != "PlayerSpecial"){
            projectileToCheck.remove();
        }

        // enemy
        enemies.forEach(function(enemy){
            if(collisionBetween(projectileToCheck,enemy,1) && (projectileToCheck.owner == "Player" || projectileToCheck.owner == "PlayerSpecial")){
                if(projectileToCheck.owner != "PlayerSpecial"){
                    projectileToCheck.remove();
                }
            }   
        });

        // player special projectile
        projectiles.forEach(function(anotherProjectile){
            if(anotherProjectile != projectileToCheck){
                if(collisionBetween(projectileToCheck,anotherProjectile,1) && projectileToCheck.owner != "PlayerSpecial" && anotherProjectile.owner == "PlayerSpecial"){
                    projectileToCheck.remove();
                }
            }
        }); 
    }

    update(){
        // projectile behavior
        move(this, this.vector);

        // projectile out of canvas
        if(this.x < -100 || this.x > canvas.width+100 || this.y < -100 || this.y > canvas.height+100){
            var indexOfProjectileOut = projectiles.indexOf(this);
            projectiles.splice(indexOfProjectileOut,1);
        }
    }

    render(){
        // projectiles sprite
        if(this.owner == "Skull"){
            canvas.drawCircle("rgba(255,255,255,0.25)",this.x, this.y, this.hitBoxSize*1.65);
        }
        canvas.writeText("#000000",this.hitBoxSize*3,this.sprite, this.x, this.y);
    }

    remove(){
        var indexOfProjectileOut = projectiles.indexOf(this);
        projectiles.splice(indexOfProjectileOut,1);
    }
}