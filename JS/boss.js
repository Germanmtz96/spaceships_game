class Boss{

        constructor(positionY){

            this.node = document.createElement("img")
            this.node.src = "./IMAGENES/Spaceship_02_RED.png"
            this.vida = 2000
            this.x = gameScreenNode.offsetWidth // posicion eje X
            this.y = positionY
            this.w = 150 // ancho
            this.h = 150 // alto
            this.speed = 1
            gameBoxNode.append(this.node)
            
            this.node.style.transform = "rotate(-90deg)"

            this.node.style.position = "absolute" //para poder usar las propiedades top y left(si no las ignora)
            this.node.style.left = `${this.x}px`
            this.node.style.top = `${this.y}px`
            this.node.style.width = `${this.w}px` //le pone al objeto el ancho que nosotros le asignamos
            this.node.style.height = `${this.h}px`




        }


        movimientoBoss(){
            if(this.x<= (gameScreenNode.offsetWidth /2))
                this.x -= this.speed
                this.node.style.left = `${this.x}px`
        }
        
        
}