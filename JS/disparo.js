class Disparo {

    constructor(positionY, positionX){

        this.node = document.createElement("img")
        this.node.src = "./IMAGENES/Flame_02.png"
        gameBoxNode.append(this.node)

        this.x = positionX
        this.y = positionY
        this.w = 5 // ancho
        this.h = 15 // alto
        this.node.style.transform = "rotate(90deg)"

        this.node.style.position = "absolute" //para poder usar las propiedades top y left(si no las ignora)
        this.node.style.left = `${this.x}px`
        this.node.style.top = `${this.y}px`
        this.node.style.width = `${this.w}px` //le pone al objeto el ancho que nosotros le asignamos
        this.node.style.height = `${this.h}px`

        this.speed = 4
        this.damage = 20

    }



    movimientoDisparo(){
        //console.log("disparo moviendose")
        this.x += this.speed
        this.node.style.left = `${this.x}px`

    }


   




}