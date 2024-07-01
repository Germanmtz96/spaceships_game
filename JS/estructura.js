//* ELEMENTOS PRINCIPALES DEL DOM
// pantallas
const inicioScreenNode = document.querySelector("#pantalla-inicio")
const gameScreenNode = document.querySelector("#pantalla-juego")
const gameOverScreenNode = document.querySelector("#pantalla-game-over")
// botones
const playBtnNode = document.querySelector("#play-btn")
const instruccionesBtnNode = document.querySelector("#instrucciones-btn")
const tryAgainBtnNode = document.querySelector("#try-again-btn")
//textos
const instruccionesNode = document.querySelector("#instrucciones")
//game box
const gameBoxNode = document.querySelector("#game-box")

//* VARIABLES GLOBALES DEL JUEGO
 let mainIntervalId = null;  
 let nave = null;
 let instruccion = true;
 let enemigoArr = []












//* FUNCIONES GLOBALES DEL JUEGO
function startGame () {
    //1. Ocultar pantalla de inicio
    inicioScreenNode.style.display = "none"
    //2. Mostrar pantalla del juego
    gameScreenNode.style.display = "flex"
    gameBoxNode.style.display = "flex"
    //3. Añadir todos los elementos iniciales del juego
    nave = new MiNave()
    //4.Iniciar el intervalo inicial del juego (gameLoop)
    mainIntervalId =  setInterval(()=>{
        gameLoop()
    }, Math.round(1000/60))
    //5. Iniciamos otros intervalos que determinan la frecuencia con la que aparecen los elementos (tuberias) del juego


}
function instrucciones(){
    if(instruccion === true){
    instruccionesNode.style.display = "flex"
    instruccion = false}else{
    instruccionesNode.style.display = "none"
    instruccion = true
}
}
function gameOver(){

    //* 1.Limpiar todos los intervalos
   

    //* 2. Ocultar la pantalla de juego
    gameScreenNode.style.display = "none"
    gameOverScreenNode.style.display = "flex"

    //* 3. Mostrar la pantalla final



}

function enemySpawn(){
    let randomPositionY = Math.floor(Math.random()* -100)
    let enemy = new Enemy(randomPositionY)
    enemigoArrArr.push(enemy)
}

function cheackEnemyDisapear(){
let firstEnemy = enemigoArr[0]
if( firstEnemy && firstEnemy.x <= -firstEnemy.w){
    enemigoArr.shift()
    firstEnemy.node.remove()
}
}

function gameLoop () {
 //console.log("juego andando a 60fps")
 enemigoArr.forEach((cadaEnemigo)=>{
    cadaEnemigo.enemySpawn()
 })
 cheackEnemyDisapear()
 movimientoEnemigo()
}










//* EVENT LISTENERS

window.addEventListener("keydown", (event) =>{ 
    if(event.key === "w"){
        nave.arriba()
    }
})

window.addEventListener("keydown", (event) =>{ 
    if(event.key === "a"){
        nave.izquierda()
    }
})

window.addEventListener("keydown", (event) =>{ 
    if(event.key === "s"){
        nave.abajo()
    }
})

window.addEventListener("keydown", (event) =>{ 
    if(event.key === "d"){
        nave.derecha()
    }
}) 
//click
 playBtnNode.addEventListener("click", ()=>{
    startGame()
    })

gameBoxNode.addEventListener("click",()=>{
    
})    
instruccionesBtnNode.addEventListener("click",()=>{
    instrucciones()
})
