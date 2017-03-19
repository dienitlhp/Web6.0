class ShipController{
  constructor(x,y,spriteName,configs){
    this.sprite = Nakama.playerGroup.create(x,y,'assets',spriteName);
    this.sprite.anchor = new Phaser.Point(0.5,0.5);
    this.sprite.body.collideWorldBounds = true;
    this.configs = configs;
    this.timeSinceLastFire = 0;
    this.timeSinceLastFireHomingBullet = 0;
    this.bullets = [];
  }
  update(){
    if(Nakama.keyboard.isDown(this.configs.up)){
      this.sprite.body.velocity.y = -ShipController.SHIP_SPEED;
    }
   else if(Nakama.keyboard.isDown(this.configs.down)) {
      this.sprite.body.velocity.y = ShipController.SHIP_SPEED;
    }
    else{
      this.sprite.body.velocity.y=0;
    }

    if(Nakama.keyboard.isDown(this.configs.left)){
      this.sprite.body.velocity.x = -ShipController.SHIP_SPEED;
    }
    else if(Nakama.keyboard.isDown(this.configs.right)) {
      this.sprite.body.velocity.x = ShipController.SHIP_SPEED;
    }
    else{
      this.sprite.body.velocity.x=0;
    }

    this.timeSinceLastFire += Nakama.game.time.physicsElapsed;
    if(Nakama.keyboard.isDown(this.configs.fire)){
      this.tryfire();
    }

    this.timeSinceLastFireHomingBullet += Nakama.game.time.physicsElapsed;
    if(Nakama.keyboard.isDown(this.configs.ult)){
      this.tryFireHomingBullet();
    }
    this.bulletHoming();
  }

  // Tạo đạn thường
  tryfire(){
    if(this.timeSinceLastFire >= this.configs.cooldown){
      this.fire();
      this.timeSinceLastFire = 0;
    }
  }
  fire(){
    this.createBullet(new Phaser.Point(0,-1));
    this.createBullet(new Phaser.Point(1,-5));
    this.createBullet(new Phaser.Point(-1,-5));
    this.createBullet(new Phaser.Point(1,-2));
    this.createBullet(new Phaser.Point(-1,-2));
  }
  createBullet(direction){
    new BulletController(
      this.sprite.position,
      direction,
      "BulletType1.png"
    )
  }

  // Tạo đạn đuổi
  tryFireHomingBullet(){
    if(this.timeSinceLastFireHomingBullet >= this.configs.cooldownHomingBullet){
      this.fireHomingBullet();
      this.timeSinceLastFireHomingBullet = 0;
    }
  }
  fireHomingBullet(){
    this.creatHomingBullet(new Phaser.Point(0, -1));
  }
  creatHomingBullet(direction){
    this.bullets.push(
      new HomingBulletController(
        this.sprite.position,
        direction,
        "Spaceship2-Partner.png" // :)))))
      )
    );
  }

  bulletHoming(){
    this.bullets.forEach(function(bullet){
      bullet.update();
    });
  }
}
ShipController.SHIP_SPEED = 1000;
