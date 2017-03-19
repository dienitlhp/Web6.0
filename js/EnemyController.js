class EnemyController{
  constructor(x, y, spriteName, configs){
    this.sprite = Nakama.enemyGroup.create(x, y, 'assets', spriteName);
    Nakama.game.physics.arcade.enable(this.sprite);
    this.configs = configs;
    this.sprite.health = this.configs.health;
    this.sprite.collideWorldBounds = true;
    this.sprite.body.velocity.x = -EnemyController.ENEMY_SPEED;
  }


  update(){

    if (this.sprite.position.x >= 560) {
      this.sprite.body.velocity.x = -EnemyController.ENEMY_SPEED;
    }

    if (this.sprite.position.x <= 0) {
      this.sprite.body.velocity.x = EnemyController.ENEMY_SPEED;
    }
  }
}
EnemyController.ENEMY_SPEED = 300;
