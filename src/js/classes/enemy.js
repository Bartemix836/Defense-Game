class Enemy extends Sprite {
    constructor({position = { x:0, y:0 } }){
        super({ 
            position, 
            imageSrc:'img/orc.png',
            frames:{
            max:7
                   } 
              })
        this.position = position
        this.width = 100
        this.height = 100
        this.waypointIndex = 0;
        this.center = {
            x: this.position.x + this.width/2,
            y:this.position.y + this. width/2
        }
        this.radius = 50
        this.health = 100
        this.speed = {
            x:0,
            y:0 
        }
    }
    draw(){
        super.draw()
    
        // health bar 
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y -15, this.width, 10)
        
        context.fillStyle = 'green'
        context.fillRect(
              this.position.x, 
              this.position.y -15,
             (this.width *this.health)/100, 10)
    }
    update(){
        this.draw()
        super.update()
        

        const waypoint = waypoints[this.waypointIndex]
        const Ydistance = waypoint.y - this.center.y
        const XDistance = waypoint.x - this.center.x
        const angle = Math.atan2(Ydistance, XDistance)
        
        const multipiler = 1

        this.speed.x = Math.cos(angle)*multipiler
        this.speed.y = Math.sin(angle)*multipiler

        this.position.x += this.speed.x 
        this.position.y += this.speed.y 
        this.center = {
            x: this.position.x + this.width/2,
            y:this.position.y + this. width/2
        }

        

        if (
            Math.abs(Math.round(this.center.x) - Math.round(waypoint.x )) <   
                Math.abs(this.speed.x)&& 
            Math.abs(Math.round(this.center.y) - Math.round(waypoint.y))<
             Math.abs(this.speed.y)&& 
            this.waypointIndex < waypoints.length - 1
            ){
            this.waypointIndex++
        }
    }
    
}