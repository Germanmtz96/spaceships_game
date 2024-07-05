class Boss{

        constructor(){

            this.type = "boss"
            this.node = document.createElement("img")
            this.node.src = "./IMAGENES/Spaceship_02_RED.png"
            this.vida = 2000
            this.x = gameScreenNode.offsetWidth 
            this.y = gameScreenNode.offsetHeight / 2 - 130
            this.w = 250 
            this.h = 250 
            this.speed = 1
            gameBoxNode.append(this.node)
            
            this.node.style.transform = "rotate(-90deg)"

            this.node.style.position = "absolute" 
            this.node.style.left = `${this.x}px`
            this.node.style.top = `${this.y}px`
            this.node.style.width = `${this.w}px` 
            this.node.style.height = `${this.h}px`




        }


        movimientoEnemigo(){
                if(this.x + this.w > 600){
                this.x -= this.speed
                this.node.style.left = `${this.x}px`

          
            }
        }


         
    }
        

        
        


    

