class EnemyController{
  constructor(x, y, spriteName, configs){
    this.sprite = Nakama.enemyGroup.create(x, y, 'assets', spriteName);
    this.sprite.body.collideWorldBounds = true;
    this.configs = configs;
    this.sprite.health = this.configs.health;
    this.sprite.body.velocity.x = this.configs.speed;
  }

  update(){
    if(this.sprite.body.blocked.left){
      this.sprite.body.velocity.x = this.configs.speed;
    }
    else if(this.sprite.body.blocked.right){
      this.sprite.body.velocity.x = -this.configs.speed;
    }
  }
}
