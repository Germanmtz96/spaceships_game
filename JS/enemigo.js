class Enemy {

    constructor(positionY, type){

        this.node = document.createElement("img")
        if(type === 1){
        this.node.src = "./IMAGENES/Spaceship_03_RED.png"
        this.vida = 20
        }
        else if(type === 2){
            this.node.src = "./IMAGENES/Spaceship_04_RED.png"
            this.vida = 30
        }
        else if(type === 3){
            this.node.src = "./IMAGENES/Spaceship_06_RED.png"
            this.vida = 50
        }
        else if(type === 4){
            this.node.src = "./IMAGENES/Spaceship_01_RED.png"
            this.vida = 40
            //!quiero que dispare
        }
        else if(type === 5){
            this.node.src = "./IMAGENES/Spaceship_02_RED.png"
            this.vida = 2000
            //!quiero que dispare y no se mueva del sitio
            //? igual seria mejor en otra clase
        }



            gameBoxNode.append(this.node)

            this.x = gameScreenNode.offsetWidth // posicion eje X
            this.y = positionY
            this.w = 70 // ancho
            this.h = 70 // alto
            this.node.style.transform = "rotate(-90deg)"

            this.node.style.position = "absolute" //para poder usar las propiedades top y left(si no las ignora)
            this.node.style.left = `${this.x}px`
            this.node.style.top = `${this.y}px`
            this.node.style.width = `${this.w}px` //le pone al objeto el ancho que nosotros le asignamos
            this.node.style.height = `${this.h}px`

            this.speed = 1
    }


    movimientoEnemigo(){
        this.x -= this.speed
        this.node.style.left = `${this.x}px`

    }





}