class Entity {
    constructor(x, y, hitBoxSize, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.hitBoxSize = hitBoxSize;
        this.XtoReach = 0;
        this.YtoReach = 0;
    }
    
    reachItsPoint() {
        if(this.XtoReach != 0 && this.YtoReach != 0){
            var dx = (this.XtoReach-this.x);
            var dy = (this.YtoReach-this.y);

            if(Math.abs(Math.floor(dx)) <= 1 && Math.abs(Math.floor(dy) <= 1)){
                Math.floor(this.x);
                Math.floor(this.y);
                this.XtoReach = 0;
                this.YtoReach = 0;
            }else{
                var vx = (this.speed/25)*(dx/(Math.abs(Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2)))));
                var vy = (this.speed/25)*(dy/(Math.abs(Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2)))));
                move(this, new Vector(vx,vy));
            }
        }
    }
}