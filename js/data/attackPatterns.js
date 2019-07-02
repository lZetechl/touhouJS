function badTargetAttack(enemy,hitBoxSize,shootingSpeed,variance,sprite){
    var dy = player.y-enemy.y;
    var randomVarianceX = Math.floor(((Math.random()*2)-1))*Math.abs(dy/variance);
    var dx = player.x-enemy.x+randomVarianceX;
    var distance = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
    var vectorProjectile = new Vector((dx/distance),(dy/distance));
    var newProjectile = new Projectile(enemy.x, enemy.y, hitBoxSize, shootingSpeed, vectorProjectile,""+enemy.constructor.name+"",sprite,1);
    projectiles.push(newProjectile);
}

function targetAttack(enemy,hitBoxSize,shootingSpeed,sprite){
    var dx = (player.x-enemy.x);
    var dy = (player.y-enemy.y);
    var distance = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
    var vectorProjectile = new Vector((dx/distance),(dy/distance));
    var newProjectile = new Projectile(enemy.x, enemy.y, hitBoxSize, shootingSpeed, vectorProjectile,""+enemy.constructor.name+"",sprite,1);
    projectiles.push(newProjectile);
}

function circleAttack(enemy,hitBoxSize,shootingSpeed,startAngle,angleBetweenTwoProjectiles,sprite){
    var angleOfProjectiles = [];
    for(var i = 0; i < ((360)/(angleBetweenTwoProjectiles > 0 ? angleBetweenTwoProjectiles : 1)); i++){
        if(i == 0){
            angleOfProjectiles.push(startAngle);
        }else{
            angleOfProjectiles.push(angleOfProjectiles[i-1]+angleBetweenTwoProjectiles);
        }  
    }
    for(var i = 0; i < angleOfProjectiles.length; i++){
        var radianValue = angleOfProjectiles[i]*(Math.PI/180);
        var cosinus = Math.cos(radianValue);
        var sinus = Math.sin(radianValue)
        var speedSlow = Math.sqrt(Math.pow(cosinus,2)+Math.pow(sinus,2));
        var newProjectile = new Projectile(enemy.x, enemy.y, hitBoxSize, shootingSpeed*speedSlow, new Vector(cosinus,sinus),""+enemy.constructor.name+"",sprite,1);
        projectiles.push(newProjectile);
    }
}

function shooterLadybugSpecial(shooter,sprite){
    if(shooter.currentNumberOfProjectiles != shooter.numberOfProjectiles){
        if(shooter.reloadProjectile == shooter.rateOfFire){
            var randomVector = new Vector(((Math.random()*2)-1),-((Math.random()*1.25)-0.25));
            var newProjectile = new Projectile(shooter.x, shooter.y, shooter.hitBoxSizeProjectiles, shooter.shootingSpeed, randomVector,"PlayerSpecial",spriteProjectile(sprite),200);
            projectiles.push(newProjectile);
            shooter.currentNumberOfProjectiles++;
        }else{
            shooter.reloadProjectile++;
        }
    }else{
        var shooterToRemove = shooters.indexOf(shooter);
        shooters.splice(shooterToRemove,1);
    }
}

function shooterBeeSpecial(shooter,sprite){
    if(shooter.currentNumberOfProjectiles != shooter.numberOfProjectiles){
        if(shooter.reloadProjectile == shooter.rateOfFire){
            var newProjectile = new Projectile(shooter.x, shooter.y, shooter.hitBoxSizeProjectiles, shooter.shootingSpeed, new Vector(0,-1),"PlayerSpecial",spriteProjectile(sprite),100);
            projectiles.push(newProjectile);
            shooter.currentNumberOfProjectiles++;
        }else{
            shooter.reloadProjectile++;
        }
        if(shooter.currentNumberOfProjectiles%(shooter.numberOfProjectiles/3) == 0 && shooter.currentNumberOfProjectiles != 0){
            enemies.forEach(function(enemy){
                enemy.touchedBySpecialAttack = false;
            })
        }
    }else{
        var shooterToRemove = shooters.indexOf(shooter);
        shooters.splice(shooterToRemove,1);
    }
}