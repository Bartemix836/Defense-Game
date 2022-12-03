class Towers extends Sprite {
    constructor ({position = {x:0 , y:0}}){
        super({
            position,
            imageSrc: 'img/tower.png',
            frames:{
                max:19
            },
            offset:{
                x:0,
                y:-80
            }
        })
        
        // this.position = position
        this.width = 64*2
        this.height = 64
        this.center = {
            x: this.position.x + this.width/2,
            y:this.position.y + this. height/2
        }
        this.projectiles = []
        this.radius = 250 
        this.target 
        // this.elapsedSpawntime = 0
    }

    draw(){
        super.draw()       
    }

    update(){
         this.draw()
         if(this.target || (!this.target && this.frames.currentposistion !==0))
         super.update()
         
         if(this.target && this.frames.currentposistion === 6 && 
            this.frames.elapsed % this.frames.hold === 0) 
            this.shoot()
    }
    shoot(){
        this.projectiles.push(
            new Projectile({
                position:{
                    x:this.center.x -20,
                    y:this.center.y - 110
                },
                enemy: this.target
            })
        )
    }
}