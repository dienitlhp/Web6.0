class HomingBulletController{
  constructor(position, direction, spriteName){
     this.sprite = Nakama.bulletGroup.create(position.x,position.y,'assets',spriteName);
     this.sprite.anchor = new Phaser.Point(0.5,0.5);
     this.sprite.body.checkWorldBounds = true;
     this.sprite.body.outOfBoundsKill = true;
     this.sprite.body.velocity = direction.setMagnitude(HomingBulletController.BULLET_SPEED);
  }

  update(){
    // Chọn mục tiêu còn sống
    this.target = Nakama.enemyGroup.getFirstAlive();
    if(this.target && this.target.alive){ // Kiểm tra mục tiêu còn sống hay không
      //Đạn bay về phía mục tiêu
      var newDirection = new Phaser.Point (this.target.x - this.sprite.position.x, this.target.y - this.sprite.position.y);
      this.sprite.body.velocity = newDirection.setMagnitude(HomingBulletController.BULLET_SPEED);
      // Quay đầu đạn về mục tiêu
      this.sprite.angle = 180*Math.atan((this.target.x - this.sprite.position.x) / -(this.target.y - this.sprite.position.y)) / Math.PI;
    }
  }
}

HomingBulletController.BULLET_SPEED = 500;
