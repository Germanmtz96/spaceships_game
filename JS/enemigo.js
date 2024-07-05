class Enemy {

    constructor(positionY, type){

        this.node = document.createElement("img")
        if(type === 1){
        this.node.src = "./IMAGENES/Spaceship_03_RED.png"
        this.vida = 40
        this.w = 50 // ancho
        this.h = 50 // alto
        this.speed = 3
        }
        else if(type === 2){
            this.node.src = "./IMAGENES/Spaceship_04_RED.png"
            this.vida = 20
            this.w = 60 // ancho
            this.h = 60 // alto
            this.speed = 5
        }
        else if(type === 3){
            this.node.src = "./IMAGENES/Spaceship_06_RED.png"
            this.vida = 200
            this.w = 80 // ancho
            this.h = 80 // alto
            this.speed = 2
        }
        
        



            gameBoxNode.append(this.node)

            this.x = gameBoxNode.offsetWidth // posicion eje X
            this.y = positionY
            
            this.node.style.transform = "rotate(-90deg)"

            this.node.style.position = "absolute" //para poder usar las propiedades top y left(si no las ignora)
            this.node.style.left = `${this.x}px`
            this.node.style.top = `${this.y}px`
            this.node.style.width = `${this.w}px` //le pone al objeto el ancho que nosotros le asignamos
            this.node.style.height = `${this.h}px`

           
    }


    movimientoEnemigo(){
        this.x -= this.speed
        this.node.style.left = `${this.x}px`

    }





}