class BulletType2Controller extends BulletController{
  constructor(position, direction){
    super(position, direction, BulletType2Controller.SPRITE_NAME);
    this.sprite.body.velocity = this.sprite.body.velocity.setMagnitude(BulletType2Controller.BULLET_SPEED);
    this.sprite.damage = BulletType2Controller.DAMAGE;
  }

  update(){
    // Call update of parent class
    super.update();

    // 1. Get a target if doesn't have target
    if(!this.target || !this.target.alive){
      this.getNewTarget();
    }

    // 2. If no target is available keep on going straight
    if(!this.target) return;

    // 3. Get direction toward target
    var direction = Phaser.Point.subtract(this.target.position, this.sprite.position);

    // 4. Turn slowly if the angle is too large
    var currentAngle = Nakama.game.math.radToDeg(
      Nakama.game.math.angleBetween(
        0,
        0,
        this.sprite.body.velocity.x,
        this.sprite.body.velocity.y
      )
    );

    var directionAngle = Nakama.game.math.radToDeg(
      Nakama.game.math.angleBetween(
        0,
        0,
        direction.x,
        direction.y
      )
    );

    var deltaAngle = directionAngle - currentAngle;
    // Ensure deltaAngle is between -180 & 180
    if(deltaAngle > 180) deltaAngle -= 360;
    if(deltaAngle < -180) deltaAngle += 360;

    var maxDelta = BulletType2Controller.TURN_RATE * Nakama.game.time.physicsElapsed;
    if(deltaAngle > maxDelta) deltaAngle = maxDelta;
    if(deltaAngle < -maxDelta) deltaAngle = -maxDelta;

    var newAngle = currentAngle + deltaAngle;
    var newDirection = new Phaser.Point(
      Math.cos(Nakama.game.math.degToRad(newAngle)),
      Math.sin(Nakama.game.math.degToRad(newAngle))
    )
    // 5. Set new velocity
    this.sprite.body.velocity = newDirection.setMagnitude(BulletType2Controller.BULLET_SPEED);
    this.sprite.angle = Math.atan2(newDirection.x, -newDirection.y) * (180/Math.PI);
  }

  getNewTarget(){
    this.target = Nakama.enemyGroup.getFirstAlive();
  }
}
BulletType2Controller.TURN_RATE = 60;
BulletType2Controller.BULLET_SPEED = 500;
BulletType2Controller.SPRITE_NAME = "BulletType1Upgraded.png";
BulletType2Controller.DAMAGE = 3;
