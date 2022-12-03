    const canvas=document.querySelector('canvas');
    const context = canvas.getContext('2d');

    canvas.width = 1280
    canvas.height = 768
    
    context.fillStyle = 'white';
    context.fillRect(0,0,canvas.width, canvas.height);
    
    const placementTilesData2D = []
        for(let i=0; i< placementTilesTowers.length; i +=20){
            placementTilesData2D.push(placementTilesTowers.slice(i,i+20))
        }
    console.log(placementTilesData2D)

       
        const PlacementTiles = []
    
        placementTilesData2D.forEach((row, y) => {
            row.forEach((symbol, x) => {
              if (symbol === 14) {
                // add building placement tile here
                PlacementTiles.push(
                  new PlacementTile({
                    position: {
                      x: x * 64,
                      y: y * 64
                    }
                  })
                )
              }
            })
          })
    
    const image = new Image();
    image.onload = ()=>{
        
             movement()
    }
    setTimeout(movement,7000);
    image.src='img/TowerDefensemapv1.png'

    
   
    const enemies = []

    function spawnEnemies(spawnCount){
        for (let i=1; i<spawnCount +1;i++){
            const xOffset = i *150
          enemies.push(
            new Enemy({
                position:{x:waypoints[0].x - xOffset, y:waypoints[0].y}
          })
          )  
        
        }
        
    }
  
    
    const towers = []
    let activeTile = undefined
    let enemyCount = 1
    let hearts = 10
    let coins = 100
    let score = 0
    const explosions = []
    spawnEnemies(enemyCount);
      
   
    
    function movement (){
        const movementID = requestAnimationFrame(movement)

        context.drawImage(image,0,0)
        for(let i=enemies.length - 1; i>=0;i--){
            const enemy = enemies[i]       
            enemy.update()
            
            if (enemy.position.x >canvas.width){
                hearts -= 1
                enemies.splice(i,1)
                document.querySelector('#hearts').innerHTML = hearts
                
                if(hearts < 0){
                    console.log('game over')
                    document.querySelector('#GameOver').style.display = 'flex'
                    document.querySelector('.buttons').style.display = 'flex'
                    let result1 = document.querySelector('.endresult');
                    result1.innerHTML = "Your result : " + score;
                    cancelAnimationFrame(movementID)
                }
            }
        }

        for(let i= explosions.length - 1; i>=0; i--){
            const explosion = explosions[i]
            explosion.draw()
            explosion.update()
            
            
            if(explosion.frames.currentposistion >= explosion.frames.max -1){
                explosions.splice(i, 1)
            }
        }
        
         // tracking total amount of enemies 
            if(enemies.length === 0){
                 enemyCount +=2
                 spawnEnemies(enemyCount)
        }

        PlacementTiles.forEach((tile)=>{
            tile.update(mouse)
        })

        towers.forEach((towers)=>{
            towers.update()
            towers.target = null
            const validEnemies = enemies.filter((enemy) =>{
                const XDifference = enemy.center.x - towers.center.x
                const YDifference = enemy.center.y - towers.center.y
                const distance = Math.hypot(XDifference, YDifference)
                return distance < enemy.radius + towers.radius

            })
            towers.target = validEnemies[0]
            
            
            for(let i= towers.projectiles.length - 1; i>=0;i--){
                const projectile = towers.projectiles [i]  
            
           
                projectile.update()

                const XDifference = projectile.enemy.center.x - projectile.position.x
                const YDifference = projectile.enemy.center.y - projectile.position.y
                const distance = Math.hypot(XDifference, YDifference)
                
                // hits enemy 


                if(distance<projectile.enemy.radius + projectile.radius){
                   projectile.enemy.health -= 20
                   if(projectile.enemy.health <=0){
                        const enemyIndex =enemies.findIndex((enemy)=>{
                            return projectile.enemy=== enemy
                        })
                        if (enemyIndex>-1) {
                            enemies.splice(enemyIndex,1)
                            coins += 25
                            score += 10
                            document.querySelector('#money').innerHTML = coins
                            document.querySelector('.result').innerHTML = score
                        }
                   }

                   console.log(projectile.enemy.health)
                   explosions.push(new Sprite({ 
                        position :{x:projectile.position.x, y:projectile.position.y}, 
                        imageSrc: 'img/explosion.png',
                        frames : { max:4},
                        offset : {x:0, y:0}
                }))
                   towers.projectiles.splice(i, 1)
                }
            }            
        })         
    }
    const mouse = {
        x:undefined,
        y:undefined
    }

    canvas.addEventListener('click',(event)=>{
        if(activeTile && !activeTile.isOccupied && coins - 50 >= 0){
            coins -= 50
            document.querySelector('#money').innerHTML = coins
            towers.push(
                new Towers({
                 position:{
                    x: activeTile.position.x ,
                    y: activeTile.position.y
                 }
            })
            )
            activeTile.isOccupied = true
            towers.sort((a,b)=>{
                return a.position.y - b.position.y
            })
        }
        
    } )
    
    window.addEventListener('mousemove',(event)=>
    {
        mouse.x = event.clientX
        mouse.y = event.clientY
        activeTile = null
     for(let i =0 ; i<PlacementTiles.length; i++){
        const tile= PlacementTiles [i]
        if(
            mouse.x>tile.position.x &&
            mouse.x< tile.position.x + tile.size &&
            mouse.y>tile.position.y &&
            mouse.y< tile.position.y + tile.size
            ){
            activeTile = tile  
            break
        }
     }  
        
    })   
    movement()
    // after game 
    const butExit = document.getElementById('quitgame');
    butExit.addEventListener("click", ()=> {
        if(confirm("Are sure you want to leave from the game?")){
            alert("Ok, thank you for open my game. See you soon to the next time")
            window.close()
        }
        else{
            alert("Great, so let's try to play again")
        }
    })