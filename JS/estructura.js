//? SE ME QUEDAN DISPAROS CONGELADOS EN EL MAPA
//? APARTIR DE LVL 4 AL FONDO DE DONDE ESTA MI NAVE APARECEN MUCHAS IMG DISPAROS
//? MOVILIDAD MEJORABLE?
//? COMO QUITAR CORAZONES CUANDO PIERDAS VIDAS E AÑADIR OBJETOS QUE DEN CORAZONES
//? QUE EL NOMBRE DE USUARIO SALGA EN PARTIDA
//? PONER LOS SONIDOS
//? PONER VIDA A LOS ENEMIGOS Y DAÑO A NUESTRO DISPARO
//? Hacer otros intervalos para mas o menos frecuencia segun el enemigo, o poner un escudo para disparos


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
//todo
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
let bossInterval = null;


let lvl = null;
let enemigoArr = []
let shotArr = []
let shotEnemyArr = []
let boss = null;










//* FUNCIONES GLOBALES DEL JUEGO
function startGame () {
    //1. Ocultar pantalla de inicio
    lvl = 1;
    score = 0;
    vidas = 3;
    boss = null;
    gameBoxNode.append(vidasNode)
    gameBoxNode.append(scoreNode)
    gameBoxNode.append(userNode)
    
    
    
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
        if(lvl=== 4){
        enemyFinalSpawn()
    }
        
    },1000)
    shotEnemyInteval = setInterval(()=>{
        shotEnemySpawn()
    },5000)
    
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
    userName = inputSaveNode
}

function gameOver(){
    if (vidas === 0){
        
        enemigoArr.forEach((cadaEnemigo)=>{
            cadaEnemigo.node.remove()
        })
        shotArr.forEach((cadaShot)=>{
            cadaShot.node.remove()
        })
        shotEnemyArr.forEach((cadaShotEnemigo)=>{
            cadaShotEnemigo.node.remove()
        })
        nave.node.remove()

        save = null;
        lvl = null;
        enemigoArr = []
        shotArr = []
        shotEnemyArr = []
       
    
    //* 1.Limpiar todos los intervalos
    clearInterval(mainIntervalId)
    clearInterval(enemyInterval)
    clearInterval(shotEnemyInteval)
    clearInterval(bossInterval)

    //* 2. Ocultar la pantalla de juego

    gameScreenNode.style.display = "none"
    //* 3. Mostrar la pantalla final
    gameOverScreenNode.style.display = "flex"

}

}




function enemySpawn(){
    let randomPositionY = Math.floor((Math.random()* (gameBoxNode.offsetHeight - 50)+10))
    let enemy = new Enemy(randomPositionY,lvl)
    enemigoArr.push(enemy)
    
}
function enemyFinalSpawn(){
    
        let randomPositionY = Math.floor((Math.random()* (gameBoxNode.offsetHeight - 50)+10))
        let enemy = new Naves4(randomPositionY)
        enemigoArr.push(enemy)
  
        
}

function bossSpawn (){
  
        let positionY = gameBoxNode.offsetHeight/2
        boss = new Boss (positionY)

        bossInterval = setInterval(()=>{
           boss.disparo()
        },7000)

        boss.movimientoBoss()
    
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
    
    if(firstShot && firstShot.x > gameBoxNode.offsetWidth){
        shotArr.shift()
        firstShot.node.remove()
    }
}
  function cheackShotEnemyDisapear(){
    let firstShotEnemy = shotEnemyArr[0]
    
    if(firstShotEnemy && firstShotEnemy.x < 0){
        shotEnemyArr.shift()
        firstShotEnemy.node.remove()
    }
}  

function shotSpawn(){
    
    let navePositionY = nave.y -5 
    let navePositionX = nave.x +60
    let shot = new Disparo(navePositionY,navePositionX)
    shotArr.push(shot)
    let shotAbajo = new Disparo(navePositionY+ 55,navePositionX)
    shotArr.push(shotAbajo)
    
   
    
}

function shotEnemySpawn(){
    if(lvl === 4 || lvl === 2){
    enemigoArr.forEach((cadaShotEnemigo)=>{
         
        let enemyPositionY = cadaShotEnemigo.y +12
        let enemyPositionX = cadaShotEnemigo.x +12
        let shotEnemy = new DisparoEnemigo(enemyPositionY,enemyPositionX)
        shotEnemyArr.push(shotEnemy)
        let shotEnemyAbajo = new DisparoEnemigo(enemyPositionY+ 30,enemyPositionX)
        shotEnemyArr.push(shotEnemyAbajo)
    })
}
}
function colisionShot(){
    shotArr.forEach((cadaDisparo,indexShot)=>{

        enemigoArr.forEach((cadaEnemigo, indexEnemy)=>{

        if (
            cadaDisparo.x < cadaEnemigo.x + cadaEnemigo.w &&
            cadaDisparo.x + cadaDisparo.w > cadaEnemigo.x &&
            cadaDisparo.y < cadaEnemigo.y + cadaEnemigo.h &&
            cadaDisparo.y + cadaDisparo.h > cadaEnemigo.y)
            {
                enemigoArr.splice(indexEnemy,1)
          cadaEnemigo.node.remove()
          shotArr.splice(indexShot,1)
          cadaDisparo.node.remove()
          score +=10
          if(score === 200){
            lvl = 2
          }else if(score === 400){
            lvl = 3
          }else if(score === 600){
            lvl = 4
          }else if(score === 1000){
            lvl = 5
            clearInterval(enemyInterval)
            clearInterval(shotEnemyInteval)
            bossSpawn ()
          }
        }

    })
  
    })


}
function colisionNave(){

    enemigoArr.forEach((cadaEnemigo,index)=>{

        if (
            cadaEnemigo.x < nave.x + nave.w &&
            cadaEnemigo.x + cadaEnemigo.w > nave.x &&
            cadaEnemigo.y < nave.y + nave.h &&
            cadaEnemigo.y + cadaEnemigo.h > nave.y
          ) {
            vidas-=1
            enemigoArr.splice(index,1)
            cadaEnemigo.node.remove()
           // console.log("la nave se estampo")
          }
          
    })
    shotEnemyArr.forEach((cadaDisparo,index)=>{

        if (
            cadaDisparo.x < nave.x + nave.w &&
            cadaDisparo.x + cadaDisparo.w > nave.x &&
            cadaDisparo.y < nave.y + nave.h &&
            cadaDisparo.y + cadaDisparo.h > nave.y
          ) {
            vidas-=1
            shotEnemyArr.splice(index,1)
            cadaDisparo.node.remove()
            //console.log("disparo certero")
          }


    })




}

function saludNave(){

    if (vidas === 3){
    vidasNode.innerText = `VIDAS: ❤️❤️❤️`
}else if(vidas === 2){
    vidasNode.innerText = `VIDAS: ❤️❤️`
}else if(vidas === 1){
    vidasNode.innerText = `VIDAS: ❤️`
}
}

function sumandoScore(){
   scoreNode.innerText = `SCORE: ${score}`
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


saludNave()
sumandoScore()
gameOver()
colisionShot()
colisionNave()
cheackShotDisapear()
cheackEnemyDisapear()
 cheackShotEnemyDisapear()  
sumandoScore()
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
 playBtnNode.addEventListener("click",()=>{
    startGame()
       //todo sonidoBoton.play()
    });

gameBoxNode.addEventListener("click",()=>{
    shotSpawn()
})    
instruccionesBtnNode.addEventListener("click",()=>{
    instrucciones()
    sonidoBoton.play();
})
tryAgainBtnNode.addEventListener("click",()=>{
    startGame ()
})
saveBtnNode.addEventListener("click",()=>{
    
})
