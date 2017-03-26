class ShipType1Controller extends ShipController{
  constructor(configs){
    super(
      Nakama.configs.PLAYER1_POS.x,
      Nakama.configs.PLAYER1_POS.y,
      ShipType1Controller.SPRITE_NAME,
      {
        up    : Phaser.Keyboard.W,
        down  : Phaser.Keyboard.S,
        left  : Phaser.Keyboard.A,
        right : Phaser.Keyboard.D,
        fire  : Phaser.Keyboard.F,
        cooldown: configs.cooldown
      }
    );
    this.sprite.health = configs.health;

  }

  createBullet(direction){
    new BulletType2Controller(
      this.sprite.position,
      direction
    )
  }
}

ShipType1Controller.SHIP_SPEED = 1000;
ShipType1Controller.SPRITE_NAME = "Spaceship1-Player.png";
