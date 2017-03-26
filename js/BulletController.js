class BulletController{
  constructor(position, direction, spriteName){
    this.sprite = Nakama.bulletGroup.create(position.x, position.y, 'assets', spriteName);

    this.sprite.angle = Math.atan2(direction.x, -direction.y) * (180/Math.PI);
    this.sprite.anchor = new Phaser.Point(0.5,0.5);
    this.sprite.checkWorldBounds = true;
    this.sprite.outOfBoundsKill = true;
    this.sprite.body.velocity = direction.setMagnitude(BulletController.BULLET_SPEED);

    Nakama.bullets.push(this);
  }

  update(){
    if(!this.sprite.alive){
      var index = Nakama.bullets.indexOf(this);
      if(index != -1) Nakama.bullets.splice(index, 1);
    }
  }
}

BulletController.BULLET_SPEED = 1500;
