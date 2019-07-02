var up = [getKeyCode("up"),false]
var right = [getKeyCode("right"),false]
var down = [getKeyCode("down"),false]
var left = [getKeyCode("left"),false]
var slow = [getKeyCode("slow"),false]
var shoot = [getKeyCode("shoot"),false]
var special = [getKeyCode("special"),false]
var ability = [getKeyCode("ability"),false]
var pause = [getKeyCode("pause"),false]

var inputs = [up,right,down,left,slow,shoot,special,ability,pause];
var click = [0,0]

function getKeyCode(key){
    var keys = {
        "slow": 16,
        "pause": 27,
        "left": 37,
        "up": 38,
        "right": 39,
        "down": 40,
        "ability": 67,
        "shoot": 87,
        "special": 88,
    }
    return keys[key];
}