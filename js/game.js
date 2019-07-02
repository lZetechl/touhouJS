var gameCanvas = document.getElementById("screen");
var hudCanvas = document.getElementById("hud");

var background = document.getElementById("background");

var gamebgm = document.getElementById("gamebgm");
var bossBgm = document.getElementById("bgmBossBattle");
var gameOverBgm = document.getElementById("bgmGameOver");
var mainMenuBgm = document.getElementById("bgmMainMenu");
var victoryBgm = document.getElementById("bgmVictory");

var sliderBgm = document.getElementById("volumeBgm");
var sliderSfx = document.getElementById("volumeSfx");

var jsonReader = document.getElementById("fileInput");

var debug = document.getElementById("debug");

var gameIsFinished, gameIsWin, gameIsPaused, score, gameTime, victoryDelay, levelDesignIndex, itsBossTime, scaleDifficultyScore, scaleDifficultyHealth, scaleDifficultyRateOfFire, scaleDifficultySpeed, currentBgm, player, click = [], enemies, projectiles, parallaxe, hud, menu, menuHasChanged, customStart, jsonIndex, highscore;

var canvas = new Canvas(gameCanvas);
canvas.centerText();
gameHud = new Canvas(hudCanvas);
hud = new HUD(gameHud);

var mainMenu = new MainMenu(canvas);
var difficultyMenu = new DifficultyMenu(canvas);
var characterSelectionMenu = new CharacterSelectionMenu(canvas);
var settingsMenu = new SettingsMenu(canvas);
var changeControlsMenu = new ChangeControlsMenu(canvas);
var setControlMenu = new SetControlMenu(canvas);
var howToPlayMenu = new HowToPlayMenu(canvas);

setInputs(inputs);
setMouse(click,canvas);

function loadMainMenu(){
    setJsonReader("fileInput");
    click = updateInputs(inputs)[1];
    hud.setBackgroundColor("#000000");
    hud.eraseDisplay();
    mainMenu.checkSelection();
    mainMenu.render();
    mainMenu.setMenu(jsonReader);
    if(mainMenu.checkIfStartGameTriggered()){
        customStart = false;
        mainMenu.removeMenu(jsonReader);
        playSFX("select",1,sliderSfx.value/200);
        loadDifficultyMenu();
    } else if(jsonObject != null){
        customStart = true;
        mainMenu.removeMenu(jsonReader);
        playSFX("select",1,sliderSfx.value/200);
        loadDifficultyMenu();
    } else if(mainMenu.checkIfSettingsTriggered()){
        mainMenu.removeMenu(jsonReader);
        playSFX("select",1,sliderSfx.value/200);
        loadSettingsMenu();
    } else {
        setTimeout(loadMainMenu, 1000/60);
    }
}

function loadDifficultyMenu(){
    click = updateInputs(inputs)[1];
    difficultyMenu.checkSelection();
    difficultyMenu.render();
    difficultyMenu.setMenu();
    if(difficultyMenu.checkIfEasyTriggered()){
        scaleDifficultyScore = 1;
        scaleDifficultyHealth = 1;
        scaleDifficultySpeed = 1;
        scaleDifficultyRateOfFire = 1;
        difficultyMenu.removeMenu();
        playSFX("select",1,sliderSfx.value/200);
        loadCharacterSelectionMenu();
    } else if(difficultyMenu.checkIfNormalTriggered()){
        scaleDifficultyScore = 1.17;
        scaleDifficultyHealth = 1.33;
        scaleDifficultySpeed = 1;
        scaleDifficultyRateOfFire = 0.75;
        difficultyMenu.removeMenu();
        playSFX("select",1,sliderSfx.value/200);
        loadCharacterSelectionMenu();
    } else if(difficultyMenu.checkIfHardTriggered()){
        scaleDifficultyScore = 1.33;
        scaleDifficultyHealth = 1.66;
        scaleDifficultySpeed = 1.25;
        scaleDifficultyRateOfFire = 0.75;
        difficultyMenu.removeMenu();
        playSFX("select",1,sliderSfx.value/200);
        loadCharacterSelectionMenu();
    } else if(difficultyMenu.checkIfLunaticTriggered()){
        scaleDifficultyScore = 1.5;
        scaleDifficultyHealth = 2;
        scaleDifficultySpeed = 1.5;
        scaleDifficultyRateOfFire = 0.5;
        difficultyMenu.removeMenu();
        playSFX("select",1,sliderSfx.value/200);
        loadCharacterSelectionMenu();
    } else if(difficultyMenu.checkIfBackTriggered()){
        difficultyMenu.removeMenu();
        playSFX("back",1,sliderSfx.value/200);
        jsonObject = null;
        loadMainMenu();
    } else {
        setTimeout(loadDifficultyMenu, 1000/60);
    }
}

function loadCharacterSelectionMenu(){
    click = updateInputs(inputs)[1];
    characterSelectionMenu.checkSelection();
    characterSelectionMenu.checkHorizontalSelection()
    characterSelectionMenu.render();
    characterSelectionMenu.setMenu();
    if(characterSelectionMenu.checkIfCharacter1Triggered()){
        characterSelectionMenu.removeMenu();
        playSFX("start",1,sliderSfx.value/100);
        player = new Ladybug((canvas.width/2)-4,(canvas.height*(7/8))-4);
        startGame();
    } else if(characterSelectionMenu.checkIfCharacter2Triggered()){
        characterSelectionMenu.removeMenu();
        player = new Bee((canvas.width/2)-4,(canvas.height*(7/8))-4);
        playSFX("start",1,sliderSfx.value/100);
        startGame();
    } else if(characterSelectionMenu.checkIfBackTriggered()){
        characterSelectionMenu.removeMenu();
        playSFX("back",1,sliderSfx.value/200);
        loadDifficultyMenu();
    } else{
        setTimeout(loadCharacterSelectionMenu, 1000/60);
    }
}

function loadSettingsMenu(){
    click = updateInputs(inputs)[1];
    settingsMenu.checkSelection();
    settingsMenu.checkIfVolumeBgmChanged();
    settingsMenu.checkIfVolumeSfxChanged();
    settingsMenu.render();
    settingsMenu.setMenu();
    if(settingsMenu.checkIfControlsTriggered()){
        settingsMenu.removeMenu();
        playSFX("select",1,sliderSfx.value/200);
        loadChangeControlsMenu();
    }else if(settingsMenu.checkIfHowToPlayTriggered()){
        settingsMenu.removeMenu();
        playSFX("select",1,sliderSfx.value/200);
        loadHowToPlayMenu();
    } else if(settingsMenu.checkIfBackTriggered()){
        settingsMenu.removeMenu();
        playSFX("back",1,sliderSfx.value/200);
        jsonObject = null;
        loadMainMenu();
    } else {
        setTimeout(loadSettingsMenu, 1000/60);
    }
}

function loadChangeControlsMenu(){
    click = updateInputs(inputs)[1];
    changeControlsMenu.checkSelection();
    changeControlsMenu.render();
    changeControlsMenu.setMenu();
    if(changeControlsMenu.checkIfUpTriggered()){
        changeControlsMenu.removeMenu();
        playSFX("select",1,sliderSfx.value/200);
        loadSetControlMenu(up[0]);
    } else if(changeControlsMenu.checkIfDownTriggered()){
        changeControlsMenu.removeMenu();
        playSFX("select",1,sliderSfx.value/200);
        loadSetControlMenu(down[0]);
    } else if(changeControlsMenu.checkIfLeftTriggered()){
        changeControlsMenu.removeMenu();
        playSFX("select",1,sliderSfx.value/200);
        loadSetControlMenu(left[0]);
    } else if(changeControlsMenu.checkIfRightTriggered()){
        changeControlsMenu.removeMenu();
        playSFX("select",1,sliderSfx.value/200);
        loadSetControlMenu(right[0]);
    } else if(changeControlsMenu.checkIfShootTriggered()){
        changeControlsMenu.removeMenu();
        playSFX("select",1,sliderSfx.value/200);
        loadSetControlMenu(shoot[0]);
    } else if(changeControlsMenu.checkIfSlowTriggered()){
        changeControlsMenu.removeMenu();
        playSFX("select",1,sliderSfx.value/200);
        loadSetControlMenu(slow[0]);
    } else if(changeControlsMenu.checkIfSpecialTriggered()){
        changeControlsMenu.removeMenu();
        playSFX("select",1,sliderSfx.value/200);
        loadSetControlMenu(special[0]);
    } else if(changeControlsMenu.checkIfAbilityTriggered()){
        changeControlsMenu.removeMenu();
        playSFX("select",1,sliderSfx.value/200);
        loadSetControlMenu(ability[0]);
    } else if(changeControlsMenu.checkIfBackTriggered()){
        changeControlsMenu.removeMenu();
        playSFX("back",1,sliderSfx.value/200);
        loadSettingsMenu();
    } else {
        setTimeout(loadChangeControlsMenu, 1000/60);
    }
}

function loadHowToPlayMenu(){
    click = updateInputs(inputs)[1];
    howToPlayMenu.render();
    howToPlayMenu.setMenu();
    if(howToPlayMenu.checkIfBackTriggered()){
        howToPlayMenu.removeMenu();
        playSFX("back",1,sliderSfx.value/200);
        loadSettingsMenu();
    } else {
        setTimeout(function(){loadHowToPlayMenu()}, 1000/60);
    }
}

function loadSetControlMenu(key){
    click = updateInputs(inputs)[1];
    setControlMenu.render();
    setControlMenu.setMenu();
    if(getAllInputs().length > 0){
        setControlMenu.setKey(key)
        setControlMenu.removeMenu();
        playSFX("select",1,sliderSfx.value/200);
        loadChangeControlsMenu();
    } else if(setControlMenu.checkIfBackTriggered()){
        setControlMenu.removeMenu();
        playSFX("back",1,sliderSfx.value/200);
        loadChangeControlsMenu();
    } else {
        setTimeout(function(){loadSetControlMenu(key)}, 1000/60);
    }
}

function startGame(){
    gameIsFinished = false;
    gameIsWin = false;
    gameIsPaused = false;
    score = 0;
    gameTime = 0;
    victoryDelay = 0;
    itsBossTime = false;
    levelDesignIndex = 0;
    jsonIndex = 0;

    parallaxe = new Parallaxe(canvas,background,0,0,background.width,background.height,1);
    stopBgm(currentBgm);
    currentBgm = gamebgm;
    stopBgm(currentBgm);

    pauseMenu = new PauseMenu(canvas);
    gameOverMenu = new GameOverMenu(canvas);
    victoryMenu = new VictoryMenu(canvas);

    enemies = [];
    projectiles = [];
    items = [];
    shooters = [];
    
    gameLoop();
}

function gameLoop(){
    updateInputs(inputs);
    score = Math.round(score);

    if(victoryMenu.checkIfMenuTriggered()){
        victoryMenu.checkSelection();
        if(!victoryMenu.isMenuOpened){
            localStorage['highscore'] = localStorage['highscore'].replace('[','');
            localStorage['highscore'] = localStorage['highscore'].replace(']','');
            if(localStorage['highscore']){
                localStorage['highscore'] = "["+localStorage['highscore']+","+score+"]";
            } else {
                localStorage['highscore'] = "["+score+"]";
            }
            stopBgm(currentBgm);
        }
        gameDisplay();
        items.forEach(function(item){
            item.render();
        })
        player.render();
        projectiles.forEach(function(projectile){
            projectile.render();
        })
        victoryMenu.render();
        victoryMenu.setMenu();
        if(victoryMenu.checkIfMainMenuTriggered()){
            victoryMenu.removeMenu();
            playSFX("select",1,sliderSfx.value/200);
            menuHasChanged = true;
            jsonObject = null;
            loadMainMenu();
        }
    } else if(gameOverMenu.checkIfMenuTriggered()){
        gameOverMenu.checkSelection();
        if(!gameOverMenu.isMenuOpened){
            localStorage['highscore'] = localStorage['highscore'].replace('[','');
            localStorage['highscore'] = localStorage['highscore'].replace(']','');
            if(localStorage['highscore']){
                localStorage['highscore'] = "["+localStorage['highscore']+","+score+"]";
            } else {
                localStorage['highscore'] = "["+score+"]";
            }
            stopBgm(currentBgm);
        }
        gameDisplay();
        items.forEach(function(item){
                item.render();
        })
        player.render();
        enemies.forEach(function(enemy){
            enemy.render();
        })
        projectiles.forEach(function(projectile){
            projectile.render();
        })
        gameOverMenu.render();
        gameOverMenu.setMenu();
        if(gameOverMenu.checkIfRetryTriggered()){
            gameOverMenu.removeMenu();
            playSFX("start",1,sliderSfx.value/100);
            resetGame();
        }
        if(gameOverMenu.checkIfMainMenuTriggered()){
            gameOverMenu.removeMenu();
            playSFX("select",1,sliderSfx.value/200);
            menuHasChanged = true;
            jsonObject = null;
            loadMainMenu();
        }
    } else if(pauseMenu.checkIfMenuTriggered() || pauseMenu.isMenuOpened){
        if(!pauseMenu.isMenuOpened){
            playSFX("pause",1,sliderSfx.value/200);
        }
        pauseMenu.checkIfVolumeBgmChanged();
        pauseMenu.checkIfVolumeSfxChanged();
        pauseMenu.checkSelection();
        gameDisplay();
        items.forEach(function(item){
            item.render();
        })
        player.render();
        enemies.forEach(function(enemy){
            enemy.render();
        })
        projectiles.forEach(function(projectile){
            projectile.render();
        })
        pauseMenu.render();
        pauseMenu.setMenu();
        if(pauseMenu.checkIfResumeTriggered()){
            pauseMenu.removeMenu();
        } else if(pauseMenu.checkIfRetryTriggered()){
            pauseMenu.removeMenu();
            playSFX("start",1,sliderSfx.value/100);
            resetGame();
        } else if(pauseMenu.checkIfMainMenuTriggered()){
            pauseMenu.removeMenu();
            playSFX("select",1,sliderSfx.value/200);
            menuHasChanged = true;
            jsonObject = null;
            loadMainMenu();
        }
    }else{
        playBgm(currentBgm,sliderBgm.value/100);
        gameDisplay();
        checkEventTimeline(); 
    
        items.forEach(function(item){
            item.checkCollision();
            item.update();
            item.render();
        })
    
        player.update();
        player.checkCollision();
        player.render();
    
        enemies.forEach(function(enemy){
            enemy.checkCollision();
            enemy.update();
            enemy.render();
        })
    
        projectiles.forEach(function(projectile){
            projectile.checkCollision();
            projectile.update();
            projectile.render();
        })
    
        shooters.forEach(function(shooter){
            shooter.update();
        })
    
        if(itsBossTime){
            stopBgm(gamebgm);
            currentBgm = bossBgm;
            playBgm(bossBgm,sliderBgm.value/100);
            canvas.drawRect("rgba(0,0,0,0.3)",0,0,canvas.width,canvas.height/8);
            canvas.writeText("#FFFFFF",30,"Oni",(canvas.width/2),(canvas.height/16));
            canvas.drawRect("rgba(0,0,0,0.6)",canvas.width/8,canvas.height/12,canvas.width*(3/4),canvas.height/64);
            if(enemies[enemies.length-1] != undefined){
                canvas.drawRect("#DD0000",canvas.width/8,canvas.height/12,(!enemies[enemies.length-1].isDead ? (canvas.width*(3/4)*(enemies[enemies.length-1].lifePoint/enemies[enemies.length-1].maxLifePoint)) : 0),canvas.height/64);
            }else{
                stopBgm(bossBgm);
                currentBgm = gamebgm;
                playBgm(gamebgm,sliderBgm.value/100);
                itsBossTime = false;
            }
        }
    }

    if(!menuHasChanged){
        setTimeout(gameLoop, 1000/60);
    }
}

function resetGame(){
    click[0] = 0;
    click[1] = 0;

    gameIsFinished = false;
    gameIsWin = false;
    score = 0;
    gameTime = 0;
    victoryDelay = 0;
    itsBossTime = false;
    levelDesignIndex = 0;
    jsonIndex = 0;
    currentBgm = gamebgm;

    player.power = 0;
    player.levelPower = 1;
    player.lifePoint = 3;
    player.specialAttackStocked = Math.floor(player.maxSpecialAttackStocked/2)+1;
    player.isDead = false;
    teleport(player,(this.canvas.width/2)-4,(this.canvas.height*(3/4)));

    enemies = [];
    projectiles = [];
    items = [];
    shooters = [];

    stopBgm(currentBgm);
    playBgm(currentBgm,sliderBgm.value/100);
}

function checkEventTimeline(){
    var allEnemies = {
        "Squid": Squid,
        "Pumpkin": Pumpkin,
        "Skull": Skull,
        "Boss": Boss
    };

    if(!customStart){
        if(levelDesignIndex == levelDesign.length-1 && enemies.length == 0){
            if(victoryDelay < 120){
                victoryDelay++;
            }else{
                gameIsFinished = true;
                gameIsWin = true;
            }
        }else{
            var event = JSON.parse(levelDesign[levelDesignIndex]);
            if(gameTime == event.timer){
                if(allEnemies[event.enemy] == Boss){
                    var newEnemy = new allEnemies[event.enemy](event.x,event.y,event.phase);
                    newEnemy.reloadProjectile = -150+newEnemy.speed;
                    itsBossTime = true;
                }else{
                    var newEnemy = new allEnemies[event.enemy](event.x,event.y);
                    newEnemy.reloadProjectile = -75+newEnemy.speed;
                }
                newEnemy.XtoReach = event.XtoReach;
                newEnemy.YtoReach = event.YtoReach;
                enemies.push(newEnemy); 
                if(levelDesignIndex < levelDesign.length-1){
                    levelDesignIndex++;
                }
            }
            gameTime++;
        }
    }else{
        if(jsonIndex == jsonObject.length-1 && enemies.length == 0){
            if(victoryDelay < 120){
                victoryDelay++;
            }else{
                gameIsFinished = true;
                gameIsWin = true;
            }
        }else{
            if(gameTime == jsonObject[jsonIndex].timer){
                if(allEnemies[jsonObject[jsonIndex].enemy] == Boss){
                    var newEnemy = new allEnemies[jsonObject[jsonIndex].enemy](jsonObject[jsonIndex].x,jsonObject[jsonIndex].y,jsonObject[jsonIndex].phase);
                    newEnemy.reloadProjectile = -150+newEnemy.speed;
                    itsBossTime = true;
                }else{
                    var newEnemy = new allEnemies[jsonObject[jsonIndex].enemy](jsonObject[jsonIndex].x,jsonObject[jsonIndex].y);
                    newEnemy.reloadProjectile = -75+newEnemy.speed;
                }
                newEnemy.XtoReach = jsonObject[jsonIndex].XtoReach;
                newEnemy.YtoReach = jsonObject[jsonIndex].YtoReach;
                newEnemy.reloadProjectile = -100+newEnemy.speed;
                enemies.push(newEnemy); 
                if(jsonIndex < jsonObject.length-1){
                    jsonIndex++
                }
            }
            gameTime++;
        }
    } 
}

function gameDisplay(){
    canvas.clearCanvas();
    if(!pauseMenu.isMenuOpened && !gameOverMenu.isMenuOpened){
        parallaxe.scrollVerticalDown();
    }
    parallaxe.render();
    canvas.drawRect("rgba("+(itsBossTime ? 200 : 0)+",0,0,0.3)",0,0,canvas.width,canvas.height);

    hud.removeData("lifePoint");
    hud.removeData("power");
    hud.removeData("specialAttack");
    hud.removeData("score");

    hud.setBackgroundColor("#111111");

    var healthToDisplay = "";
    for(var i = 0; i < player.lifePoint;i++){
        healthToDisplay += spriteHud("health")+" ";
    }
    for(var i = 0; i < (player.maxLifePoint-player.lifePoint);i++){
        healthToDisplay += " "+spriteHud("dot")+" ";
    }

    var specialAttackChargeToDisplay = "";
    for(var i = 0; i < player.specialAttackStocked;i++){
        if(player instanceof Ladybug){
            specialAttackChargeToDisplay += spriteHud("specialAttackLadybug")+" ";
        }
        if(player instanceof Bee){
            specialAttackChargeToDisplay += spriteHud("specialAttackBee")+" ";
        } 
    }
    for(var i = 0; i < (player.maxSpecialAttackStocked-player.specialAttackStocked);i++){
        specialAttackChargeToDisplay += " "+spriteHud("dot")+" ";
    }
    
    hud.addData("score","Score : "+score,"#FFFFFF",30,"left",25,100);
    hud.frameData("score","#FFFFFF",5);
    hud.addData("lifePoint",healthToDisplay,"#DD0000",30,"left",25,200);
    hud.addData("power","Power : "+player.power+"/"+player.maxPower,"#FFFFFF",30,"left",25,300);
    hud.addData("specialAttack",specialAttackChargeToDisplay,"#FFFFFF",30,"left",25,400);

    hud.displayData()
}