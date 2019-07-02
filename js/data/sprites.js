function spritePlayer(player){
    var allPlayerSprites = {
        "Ladybug": "🐞",
        "Bee": "🐝"
    };
    return allPlayerSprites[player];
}

function spriteEnemy(enemy){
    var allEnemySprites = {
        "Squid": "🐙",
        "Pumpkin": "🎃",
        "Skull": "💀",
        "Boss": "👹"
    };
    return allEnemySprites[enemy];
}

function spriteProjectile(owner){
    var allProjectileSprites = {
        "Ladybug": "🍁",
        "Bee": "🍯",
        "LadybugSpecial": "✨",
        "BeeSpecial": "🌰",
        "Squid": "💧",
        "Pumpkin": "🔥",
        "Skull": "💣",
        "Boss1": "🏮",
        "Boss2": "🍥"
    };
    return allProjectileSprites[owner];
}

function spriteItem(type){
    var allItemSprites = {
        "score": "🌸",
        "power": "🍋",
        "specialLadybug": "✨",
        "specialBee": "🌰",
        "lifePoint": "❤"
    }
    return allItemSprites[type];
}

var deathSprite = "💥";

function spriteHud(data){
    var allHudSprites = {
        "health": "❤",
        "specialAttackLadybug": "✨",
        "specialAttackBee": "🌰",
        "dot": "•"
    }
    return allHudSprites[data];
}