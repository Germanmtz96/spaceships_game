class Enemy {

    constructor(positionY, type){

        this.node = document.createElement("img")
        this.node.src = "./IMAGENES/Spaceship_03_RED.png"
        gameBoxNode.append(this.node)

            this.x = 1400 // posicion eje X
            this.y = randomPositionY
            this.w = 60 // ancho
            this.h = 60 // alto
            this.node.style.transform = "rotate(-90deg)"

            this.node.style.position = "absolute" //para poder usar las propiedades top y left(si no las ignora)
            this.node.style.left = `${this.x}px`
            this.node.style.top = `${this.y}px`
            this.node.style.width = `${this.w}px` //le pone al objeto el ancho que nosotros le asignamos
            this.node.style.height = `${this.h}px`

            this.speed = 2
    }


    movimientoEnemigo(){
        this.x -= this.speed
        this.node.style.left = `${this.x}px`

    }





}