class Escudo {

    constructor(positionY){
        this.node = document.createElement("img")
        this.node.src = "./IMAGENES/escudo.png"
        gameBoxNode.append(this.node)
        this.w = 50 // ancho
        this.h = 50 // alto
        this.x = gameScreenNode.offsetWidth // posicion eje X
        this.y = positionY
        this.speed = 1

        //this.node.style.transform = "rotate(-90deg)"

        this.node.style.position = "absolute" //para poder usar las propiedades top y left(si no las ignora)
        this.node.style.left = `${this.x}px`
        this.node.style.top = `${this.y}px`
        this.node.style.width = `${this.w}px` //le pone al objeto el ancho que nosotros le asignamos
        this.node.style.height = `${this.h}px`




    }

    movimientoEscudo(){
        this.x -= this.speed
        this.node.style.left = `${this.x}px`

    }

}