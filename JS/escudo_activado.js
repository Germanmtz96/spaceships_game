class Barrera {

    constructor(positionY, positionX, usos){

        this.node = document.createElement("img")
        this.node.src = "./IMAGENES/barrera4.png"
        gameBoxNode.append(this.node)

        this.w = 100 // ancho
        this.h = 100 // alto
        this.x = positionX
        this.y = positionY

        this.node.style.position = "absolute"
        this.node.style.left = `${this.x}px`
        this.node.style.top = `${this.y}px`
        this.node.style.width = `${this.w}px` //le pone al objeto el ancho que nosotros le asignamos
        this.node.style.height = `${this.h}px`
        
        this.activarse = usos
    }



}