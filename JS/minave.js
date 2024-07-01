class MiNave {

    constructor(){

        this.node = document.createElement("img")
        this.node.src = "./IMAGENES/Spaceship_BLUE.png"
        gameBoxNode.append(this.node)

            this.x = 570 // posicion eje X
            this.y = 100 // posicion eje Y
            this.w = 60 // ancho
            this.h = 60 // alto
            this.node.style.transform = "rotate(90deg)"

            //configuracion inicial de el elemento
            this.node.style.position = "absolute" //para poder usar las propiedades top y left(si no las ignora)
            this.node.style.left = `${this.x}px`
            this.node.style.top = `${this.y}px`
            this.node.style.width = `${this.w}px` //le pone al objeto el ancho que nosotros le asignamos
            this.node.style.height = `${this.h}px`

            this.desplazamiento = 8
    }
    derecha(){
        if(this.x + this.w < (gameBoxNode.offsetWidth)){
        this.x += this.desplazamiento
            this.node.style.left = `${this.x}px`}
    }
    izquierda(){
        if(this.x  >= 550 ){ 
            this.x -= this.desplazamiento
            this.node.style.left = `${this.x}px`}
    }
    abajo(){
        if(this.y + this.h < gameBoxNode.offsetHeight){
        this.y += this.desplazamiento
            this.node.style.top = `${this.y}px`}
    }
    arriba(){

      if(this.y >= 10) 
        {this.y -= this.desplazamiento
            this.node.style.top = `${this.y}px`}

        
        
    }



}