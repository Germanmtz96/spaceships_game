class DisparoEnemigo {
  constructor(positionY, positionX, type) {
    this.node = document.createElement("img");
    this.node.src = "./IMAGENES/Flame_01.png";
    gameBoxNode.append(this.node);

    this.type = type;
    this.x = positionX;
    this.y = positionY;
    this.node.style.transform = "rotate(-90deg)";

    if (type === "enemy") {
      this.w = 5; // ancho
      this.h = 15; // alto
      this.speed = 4;
    } else if (type === "boss") {
      this.w = 30; // ancho
      this.h = 90; // alto
      this.speed = 6;
    }
    
    this.node.style.position = "absolute"; //para poder usar las propiedades top y left(si no las ignora)
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
    this.node.style.width = `${this.w}px`; //le pone al objeto el ancho que nosotros le asignamos
    this.node.style.height = `${this.h}px`;
  }

  movimientoDisparoEnemigo() {
    this.x -= this.speed;
    this.node.style.left = `${this.x}px`;
  }
}
