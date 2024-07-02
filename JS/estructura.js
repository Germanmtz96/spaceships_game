//* ELEMENTOS PRINCIPALES DEL DOM
// pantallas
const inicioScreenNode = document.querySelector("#pantalla-inicio")
const gameScreenNode = document.querySelector("#pantalla-juego")
const gameOverScreenNode = document.querySelector("#pantalla-game-over")
// botones
const inputSaveNode = document.querySelector("#name")
const saveBtnNode = document.querySelector("#save-btn")
const playBtnNode = document.querySelector("#play-btn")
const instruccionesBtnNode = document.querySelector("#instrucciones-btn")
const tryAgainBtnNode = document.querySelector("#try-again-btn")
//textos
const userNode = document.querySelector("#user") 
//todo se tiene que pintar el user
const vidasNode = document.querySelector("#vidas")
//todo se tiene que pintar las vidas
const scoreNode = document.querySelector("#score")
//todo se tiene que pintar el score
const instruccionesNode = document.querySelector("#instrucciones")
//game box
const gameBoxNode = document.querySelector("#game-box")

//* VARIABLES GLOBALES DEL JUEGO
 let userName = null;
 let instruccion = true;
 let otraPartida = true;
 let score = null;
 let vidas = null;

 let mainIntervalId = null;  
 let enemyInterval = null;
 let shotEnemyInteval = null;

 let save = null;
 let lvl = null;
 let enemigoArr = []
 let shotArr = []
 let shotEnemyArr = []



 





 


//* FUNCIONES GLOBALES DEL JUEGO
function startGame () {
    //1. Ocultar pantalla de inicio
    lvl = 1;
    score = 0;
    vidas = 3;
    gameOverScreenNode.style.display="none"
    inicioScreenNode.style.display = "none"
    //2. Mostrar pantalla del juego
    gameScreenNode.style.display = "flex"
    gameBoxNode.style.display = "flex"
    //3. Añadir todos los elementos iniciales del juego
    nave = new MiNave((gameScreenNode.offsetWidth/10),(gameScreenNode.offsetHeight/2-30))
    
    //4.Iniciar el intervalo inicial del juego (gameLoop)
    mainIntervalId =  setInterval(()=>{
        gameLoop()
    }, Math.round(1000/60))
    //5. Iniciamos otros intervalos que determinan la frecuencia con la que aparecen los elementos (tuberias) del juego
    enemyInterval = setInterval(()=>{
        enemySpawn()
        
    },2500)
    shotEnemyInteval = setInterval(()=>{
        shotEnemySpawn()
    },4000)

}


function instrucciones(){
    if(instruccion === true){
    instruccionesNode.style.display = "flex"
    instruccion = false}else{
    instruccionesNode.style.display = "none"
    instruccion = true
}
}
function saveUser(){
    //todo mirar a ver como ponerlo en el game box
   save = inputSaveNode
}

function gameOver(){
    if (vidas === 0){

    
    //* 1.Limpiar todos los intervalos
    clearInterval(mainIntervalId)
    clearInterval(enemyInterval)
    clearInterval(shotEnemyInteval)

    //* 2. Ocultar la pantalla de juego

    gameScreenNode.style.display = "none"
    //* 3. Mostrar la pantalla final
    gameOverScreenNode.style.display = "flex"

}


}

function enemySpawn(){
    let randomPositionY = Math.floor((Math.random()* (gameBoxNode.offsetHeight - 50)+10))
    let enemy = new Enemy(randomPositionY,4)
    enemigoArr.push(enemy)
    console.log(enemigoArr)
}

function cheackEnemyDisapear(){
let firstEnemy = enemigoArr[0]
if( firstEnemy && firstEnemy.x <= -firstEnemy.w){
    enemigoArr.shift()
    firstEnemy.node.remove()
}
}
function cheackShotDisapear(){
    let firstShot = shotArr[0]
    
    if(firstShot && firstShot.x > gameScreenNode.offsetWidth){
        shotArr.shift()
        firstShot.node.remove()
    }
}
function shotSpawn(){
    let navePositionY = nave.y -5 
    let navePositionX = nave.x +60
    let shot = new Disparo(navePositionY,navePositionX)
    shotArr.push(shot)
    let shotAbajo = new Disparo(navePositionY+ 55,navePositionX)
    shotArr.push(shotAbajo)
    console.log(shotArr)
    

}
function shotEnemySpawn(){
    enemigoArr.forEach((cadaShotEnemigo)=>{
         
        let enemyPositionY = cadaShotEnemigo.y +12
        let enemyPositionX = cadaShotEnemigo.x +12
        let shotEnemy = new DisparoEnemigo(enemyPositionY,enemyPositionX)
        shotEnemyArr.push(shotEnemy)
        let shotEnemyAbajo = new DisparoEnemigo(enemyPositionY+ 30,enemyPositionX)
        shotEnemyArr.push(shotEnemyAbajo)
    })
    
}
function colisionNave(){

    enemigoArr.forEach((cadaEnemigo)=>{

        if (
            cadaEnemigo.x < nave.x + nave.w &&
            cadaEnemigo.x + cadaEnemigo.w > nave.x &&
            cadaEnemigo.y < nave.y + nave.h &&
            cadaEnemigo.y + cadaEnemigo.h > nave.y
          ) {
            vidas-=1
            cadaEnemigo.shift()
            cadaEnemigo.node.remove()
           // console.log("la nave se estampo")
          }
          
    })
    shotEnemyArr.forEach((cadaDisparo)=>{

        if (
            cadaDisparo.x < nave.x + nave.w &&
            cadaDisparo.x + cadaDisparo.w > nave.x &&
            cadaDisparo.y < nave.y + nave.h &&
            cadaDisparo.y + cadaDisparo.h > nave.y
          ) {
            vidas-=1
            cadaDisparo.shift()
            cadaDisparo.node.remove()
            //console.log("disparo certero")
          }


    })




}



function sumandoScore(){
   


}

function gameLoop () {
 //console.log("juego andando a 60fps")
 enemigoArr.forEach((cadaEnemigo)=>{
     cadaEnemigo.movimientoEnemigo()  
})

shotArr.forEach((cadaShot) =>{
    cadaShot.movimientoDisparo()
    
})
shotEnemyArr.forEach((cadaShotEnemy)=>{
    cadaShotEnemy.movimientoDisparoEnemigo()
})

console.log(vidas)
gameOver()
colisionNave()
cheackShotDisapear()
cheackEnemyDisapear()
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
    shotSpawn()
})    
instruccionesBtnNode.addEventListener("click",()=>{
    instrucciones()
})
tryAgainBtnNode.addEventListener("click",()=>{

})
saveBtnNode.addEventListener("click",()=>{
    startGame ()
})
