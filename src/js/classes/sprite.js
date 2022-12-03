class Sprite {
    constructor({ 
        position = {x:0, y:0}, 
        imageSrc, 
        frames = { max:1},
        offset = {x:0, y:0}
    }){
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
        this.frames ={
            max:frames.max,
            currentposistion:0,
            elapsed : 0,
            hold: 8
        }
        this.offset = offset
    }
    draw(){
        const cropwidth = this.image.width /this.frames.max
        const crop = {
            position:{
                x: cropwidth* this.frames.currentposistion,
                y:0
            },
            width: cropwidth,
            height: this.image.height     
        }
        context.drawImage(
            this.image, 
            crop.position.x, 
            crop.position.y, 
            crop.width, 
            crop.height,
            this.position.x +this.offset.x,
            this.position.y + this.offset.y,
            crop.width,
            crop.height
            )        
    }

    update(){
        //monster's animation
        this.frames.elapsed++
        if(this.frames.elapsed % this.frames.hold === 0){
           this.frames.currentposistion++
            if(this.frames.currentposistion >=this.frames.max){
                this.frames.currentposistion = 0
            } 
        }
    }
}