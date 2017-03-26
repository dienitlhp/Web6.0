var Nakama = {};
Nakama.configs = {
  GAME_WIDTH  : 640,
  GAME_HEIGHT : 960,
  MIN_WIDTH   : 320,
  MIN_HEIGHT  : 480,
  MAX_WIDTH   : 640,
  MAX_HEIGHT  : 960,
  PLAYER1_POS : {
    x: 200,
    y: 200
  },
  PLAYER2_POS : {
    x: 400,
    y: 200
  }
};

window.onload = function(){
  Nakama.game = new Phaser.Game(
    Nakama.configs.GAME_WIDTH,
    Nakama.configs.GAME_HEIGHT,
    Phaser.AUTO,
    '',
    {
      preload: preload,
      create: create,
      update: update,
      render: render
    }, false, false
  );
}

// preparations before game starts
var preload = function(){
  Nakama.game.scale.minWidth = Nakama.configs.MIN_WIDTH;
  Nakama.game.scale.minHeight = Nakama.configs.MIN_HEIGHT;
  Nakama.game.scale.maxWidth = Nakama.configs.MAX_WIDTH;
  Nakama.game.scale.maxHeight = Nakama.configs.MAX_HEIGHT;
  Nakama.game.scale.pageAlignHorizontally = true;
  Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  Nakama.game.time.advancedTiming = true;

  Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
  Nakama.game.load.image('background', 'Assets/Map1.png');
}

// initialize the game
var create = function(){
  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
  Nakama.keyboard = Nakama.game.input.keyboard;

  Nakama.game.add.sprite(0, 0, 'background');
  Nakama.bulletGroup = Nakama.game.add.physicsGroup();
  Nakama.enemyGroup = Nakama.game.add.physicsGroup();
  Nakama.playerGroup = Nakama.game.add.physicsGroup();

  Nakama.players = [];
  Nakama.players.push(
    new ShipType1Controller(
      {
        cooldown: 0.1,
        health  : 100
      }
    )
  );

  Nakama.enemies = [];
  Nakama.enemies.push(
    new EnemyController(
      300,
      100,
      "EnemyType1.png",
      {
        speed : 500,
        health: 50
      }
    )
  );

  Nakama.bullets = [];

  setInterval(function(){
    Nakama.enemies.push(
      new EnemyController(
        300,
        250,
        "EnemyType1.png",
        {
          speed : 500,
          health: 150
        }
      )
    );
  }, 1000);
}

// update game state each frame
var update = function(){
  Nakama.players.forEach(function(ship){
    ship.update();
  });

  Nakama.enemies.forEach(function(enemy){
    enemy.update();
  });

  Nakama.bullets.forEach(function(bullet){
    if(bullet.update && typeof bullet.update == "function"){
      bullet.update();
    }
  });

  Nakama.game.physics.arcade.overlap(
    Nakama.bulletGroup,
    Nakama.enemyGroup,
    onBulletHitEnemy
  );
}

var onBulletHitEnemy = function(bulletSprite, enemySprite){
  enemySprite.damage(bulletSprite.damage);
  bulletSprite.kill();
}

// before camera render (mostly for debug)
var render = function(){}
