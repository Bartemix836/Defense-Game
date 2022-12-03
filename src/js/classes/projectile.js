class Projectile extends Sprite {
    constructor ({position={x:0 ,y:0}, enemy}){
        super({position, imageSrc:'img/projectile.png'})
        this.speed ={
            x:0,
            y:0
        }    
        this.enemy = enemy
        this.radius = 10

        
    }
        update(){
            this.draw()

            const angle = Math.atan2(
                this.enemy.center.y - this.position.y,
                this.enemy.center.x - this.position.x
                )
            
                this.power = 4
                this.speed.x = Math.cos(angle) *this.power
                this.speed.y = Math.sin(angle) *this.power

                this.position.x += this.speed.x
                this.position.y += this.speed.y
                      
    }
}