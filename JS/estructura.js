//? despues de morir nivel 4 se quedan enemigos al empezar a veces?
//? APARTIR DE LVL 4 AL FONDO DE DONDE ESTA MI NAVE APARECEN MUCHAS IMG DISPAROS
//? QUE EL NOMBRE DE USUARIO SALGA EN PARTIDA
//? PONER LOS SONIDOS
//? PONER VIDA A LOS ENEMIGOS Y DAÑO A NUESTRO DISPARO
//? Hacer otros intervalos para mas o menos frecuencia segun el enemigo, o poner un escudo para disparos

//* ELEMENTOS PRINCIPALES DEL DOM
// pantallas
const inicioScreenNode = document.querySelector("#pantalla-inicio");
const gameScreenNode = document.querySelector("#pantalla-juego");
const gameOverScreenNode = document.querySelector("#pantalla-game-over");
// botones
const inputSaveNode = document.querySelector("#name");
const saveBtnNode = document.querySelector("#save-btn");
const playBtnNode = document.querySelector("#play-btn");
const instruccionesBtnNode = document.querySelector("#instrucciones-btn");
const tryAgainBtnNode = document.querySelector("#try-again-btn");
//textos
const message = document.querySelector("#message");
const userNode = document.querySelector("#user");
//todo user
const vidasNode = document.querySelector("#vidas");
const scoreNode = document.querySelector("#score");

const instruccionesNode = document.querySelector("#instrucciones");
//game box
const gameBoxNode = document.querySelector("#game-box");

//* VARIABLES GLOBALES DEL JUEGO
let userName = null;
let instruccion = true;
let otraPartida = true;
let disparos = false;
let score = null;
let vidas = null;
let escudo = null;

let mainIntervalId = null;
let enemyInterval = null;
let shotEnemyInteval = null;
let bossInterval = null;
let escudoInterval = null;

let lvl = null;
let enemigoArr = [];
let shotArr = [];
let shotEnemyArr = [];
let escudoArr = [];

sonidoMusicaGame.loop = true;
sonidoIntro.loop = true;

//todo no funciona sonido
//sonidoIntro.play()

//* FUNCIONES GLOBALES DEL JUEGO
function startGame() {
  //todo no funciona sonido
  //sonidoMusicaGame.play()
  //1. Ocultar pantalla de inicio
  lvl = 1;
  score = 0;
  vidas = 3;
  escudo = 0;

  disparos = false;
  message.innerText = `Level ${lvl}`;
  message.classList.remove("txt-lvl");
  setTimeout(function () {
    message.classList.add("txt-lvl");
  }, 2500);
  gameBoxNode.append(vidasNode);
  gameBoxNode.append(scoreNode);
  gameBoxNode.append(userNode);

  gameOverScreenNode.style.display = "none";
  inicioScreenNode.style.display = "none";
  //2. Mostrar pantalla del juego
  gameScreenNode.style.display = "flex";
  gameBoxNode.style.display = "flex";
  //3. Añadir todos los elementos iniciales del juego
  nave = new MiNave(
    gameScreenNode.offsetWidth / 10,
    gameScreenNode.offsetHeight / 2 - 30
  );

  //4.Iniciar el intervalo inicial del juego (gameLoop)
  mainIntervalId = setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60));
  //5. Iniciamos otros intervalos que determinan la frecuencia con la que aparecen los elementos (tuberias) del juego
  enemyInterval = setInterval(() => {
    enemySpawn();
  }, 1000);

  shotEnemyInteval = setInterval(() => {
    shotEnemySpawn();
  }, 5000);

  escudoInterval = setInterval(() => {
    escudoSpawn();
  }, 1000);

  bossInterval = setInterval(() => {
    //*DISPARO QUE HAGA EL BOSS
  }, 7000);
}

function instrucciones() {
  if (instruccion === true) {
    instruccionesNode.style.display = "flex";
    instruccion = false;
  } else {
    instruccionesNode.style.display = "none";
    instruccion = true;
  }
}

function saveUser() {
  //todo mirar a ver como ponerlo en el game box
  userName = inputSaveNode.value;
}

function gameOver() {
  if (vidas === 0) {
    sonidoGameover.play();

    enemigoArr.forEach((cadaEnemigo) => {
      cadaEnemigo.node.remove();
    });
    shotArr.forEach((cadaShot) => {
      cadaShot.node.remove();
    });
    shotEnemyArr.forEach((cadaShotEnemigo) => {
      cadaShotEnemigo.node.remove();
    });
    nave.node.remove();

    save = null;
    lvl = null;
    enemigoArr = [];
    shotArr = [];
    shotEnemyArr = [];

    //* 1.Limpiar todos los intervalos
    clearInterval(mainIntervalId);
    clearInterval(enemyInterval);
    clearInterval(shotEnemyInteval);
    clearInterval(bossInterval);
    clearInterval(escudoInterval);
    //* 2. Ocultar la pantalla de juego

    gameScreenNode.style.display = "none";
    //* 3. Mostrar la pantalla final
    gameOverScreenNode.style.display = "flex";
  }
}

function escudoSpawn() {
  let randomPositionY = Math.floor(
    Math.random() * (gameBoxNode.offsetHeight - 50) + 10
  );
  let escudos = new Escudo(randomPositionY);
  escudoArr.push(escudos);
}

function enemySpawn() {
  let randomPositionY = Math.floor(
    Math.random() * (gameBoxNode.offsetHeight - 50) + 10
  );
  let enemy;
  if (lvl === 4) {
    disparos = true;
    enemy = new Naves4(randomPositionY);
  } else {
    enemy = new Enemy(randomPositionY, lvl);
  }
  enemigoArr.push(enemy);
  //console.log(enemigoArr.length);
}

function bossSpawn() {
  disparos = true;
  sonidointerferencia.play();

  let position = gameBoxNode.offsetHeight / 2;
  let enemy = new Boss(position);
  enemigoArr.push(enemy);
}

function cheackEnemyDisapear() {
  let firstEnemy = enemigoArr[0];
  if (firstEnemy && firstEnemy.x + firstEnemy.w <= 0) {
    vidas -= 1;
    enemigoArr.shift();
    firstEnemy.node.remove();
  }
}

function cheackShotDisapear() {
  let firstShot = shotArr[0];

  if (firstShot && firstShot.x > gameBoxNode.offsetWidth) {
    shotArr.shift();
    firstShot.node.remove();
  }
}

function cheackShotEnemyDisapear() {
  let firstShotEnemy = shotEnemyArr[0];

  if (firstShotEnemy && firstShotEnemy.x + firstShotEnemy.w < 0) {
    shotEnemyArr.shift();
    firstShotEnemy.node.remove();
  }
}

function shotSpawn() {
  let navePositionY = nave.y - 5;
  let navePositionX = nave.x + 60;
  let shot = new Disparo(navePositionY, navePositionX);
  shotArr.push(shot);
  let shotAbajo = new Disparo(navePositionY + 55, navePositionX);
  shotArr.push(shotAbajo);
}

function shotEnemySpawn() {
  if (disparos) {
    sonidoshot1.play();
    enemigoArr.forEach((cadaShotEnemigo) => {
      let enemyPositionY = cadaShotEnemigo.y + 12;
      let enemyPositionX = cadaShotEnemigo.x + 12;
      let shotEnemy = new DisparoEnemigo(enemyPositionY, enemyPositionX);
      shotEnemyArr.push(shotEnemy);
      let shotEnemyAbajo = new DisparoEnemigo(
        enemyPositionY + 30,
        enemyPositionX
      );
      shotEnemyArr.push(shotEnemyAbajo);
    });
  }
}
function muerteEnemigo(){
    if(cadaEnemigo.vida <= 0){

        sonidoExplosion.play();

        enemigoArr.splice(indexEnemy, 1);
        cadaEnemigo.node.remove();
        shotArr.splice(indexShot, 1);
        cadaDisparo.node.remove();
        score += 10;}else{
            cadaEnemigo.vida -= cadaDisparo.damage
        }

}
function colisionShot() {
  shotArr.forEach((cadaDisparo, indexShot) => {
    enemigoArr.forEach((cadaEnemigo, indexEnemy) => {
      if (
        cadaDisparo.x < cadaEnemigo.x + cadaEnemigo.w &&
        cadaDisparo.x + cadaDisparo.w > cadaEnemigo.x &&
        cadaDisparo.y < cadaEnemigo.y + cadaEnemigo.h &&
        cadaDisparo.y + cadaDisparo.h > cadaEnemigo.y
      ) {
        /* if(indexEnemy.vida <= 0){

            sonidoExplosion.play();
    
            enemigoArr.splice(indexEnemy, 1);
            cadaEnemigo.node.remove();
            shotArr.splice(indexShot, 1);
            cadaDisparo.node.remove();
            score += 10;}else{
                indexEnemy.vida -= indexShot.damage
            } */
       // muerteEnemigo()

        sonidoExplosion.play();

         enemigoArr.splice(indexEnemy, 1);
        cadaEnemigo.node.remove();
        shotArr.splice(indexShot, 1);
        cadaDisparo.node.remove();
        score += 10; 

        checkeoPasarDeNivel();
      }
    });
  });
}

function checkeoPasarDeNivel() {
  if (score === 100) {
    lvl = 2;
    message.innerText = `Level ${lvl}`;
    message.classList.remove("txt-lvl");
    setTimeout(function () {
      message.classList.add("txt-lvl");
    }, 4000);
  } else if (score === 200) {
    lvl = 3;
    message.innerText = `Level ${lvl}`;
    message.classList.remove("txt-lvl");
    setTimeout(function () {
      message.classList.add("txt-lvl");
    }, 4000);
  } else if (score === 300) {
    lvl = 4;
    message.innerText = `Level ${lvl}`;
    message.classList.remove("txt-lvl");
    setTimeout(function () {
      message.classList.add("txt-lvl");
    }, 4000);
  } else if (score === 500) {
    lvl = 5;
    message.innerText = `Level ${lvl}`;
    message.classList.remove("txt-lvl");
    setTimeout(function () {
      message.classList.add("txt-lvl");
    }, 4000);
    clearInterval(enemyInterval);
    clearInterval(shotEnemyInteval);
    clearInterval(escudoInterval);
    bossSpawn();
  }
}

function colisionNave() {
  enemigoArr.forEach((cadaEnemigo, index) => {
    if (
      cadaEnemigo.x < nave.x + nave.w &&
      cadaEnemigo.x + cadaEnemigo.w > nave.x &&
      cadaEnemigo.y < nave.y + nave.h &&
      cadaEnemigo.y + cadaEnemigo.h > nave.y
    ) {
      sonidoExplosion.play();
      sonidointerferencia2.play();
      vidas -= 1;
      enemigoArr.splice(index, 1);
      cadaEnemigo.node.remove();
      // console.log("la nave se estampo")
      nave.node.remove();
      if (vidas >= 1) {
        setTimeout(() => {
          gameBoxNode.append(nave.node);
        }, 200);
      }
    }
  });

  shotEnemyArr.forEach((cadaDisparo, index) => {
    if (
      cadaDisparo.x < nave.x + nave.w &&
      cadaDisparo.x + cadaDisparo.w > nave.x &&
      cadaDisparo.y < nave.y + nave.h &&
      cadaDisparo.y + cadaDisparo.h > nave.y
    ) {
      sonidointerferencia2.play();
      vidas -= 1;
      shotEnemyArr.splice(index, 1);
      cadaDisparo.node.remove();
      //console.log("disparo certero")
      nave.node.remove();
      if (vidas >= 1) {
        setTimeout(() => {
          gameBoxNode.append(nave.node);
        }, 200);
      }
    }
  });

  escudoArr.forEach((cadaEscudo, index) => {
    if (
      cadaEscudo.x < nave.x + nave.w &&
      cadaEscudo.x + cadaEscudo.w > nave.x &&
      cadaEscudo.y < nave.y + nave.h &&
      cadaEscudo.y + cadaEscudo.h > nave.y
    ) {
      sonidoBoton.play();
      escudo += 1;
      escudoArr.splice(index, 1);
      cadaEscudo.node.remove();
      //todo volverlo de otro color
      //console.log("disparo certero")
      /* nave.node.remove()
            setTimeout(()=>{
             gameBoxNode.append(nave.node)
            },200) 
        }*/
    }
  });
}

function saludNave() {
  if (vidas === 3) {
    vidasNode.innerText = `VIDAS: ❤️❤️❤️`;
  } else if (vidas === 2) {
    vidasNode.innerText = `VIDAS: ❤️❤️`;
  } else if (vidas === 1) {
    vidasNode.innerText = `VIDAS: ❤️`;
  }
}

function sumandoScore() {
  scoreNode.innerText = `SCORE: ${score}`;
}

function gameLoop() {
  //console.log("juego andando a 60fps")
  enemigoArr.forEach((cadaEnemigo) => {
    cadaEnemigo.movimientoEnemigo();
  });

  shotArr.forEach((cadaShot) => {
    cadaShot.movimientoDisparo();
  });
  shotEnemyArr.forEach((cadaShotEnemy) => {
    cadaShotEnemy.movimientoDisparoEnemigo();
  });

  /* if(lvl === 5){
     boss.movimientoBoss()
} */

  saludNave();
  sumandoScore();

  gameOver();

  colisionShot();
  colisionNave();
  cheackShotDisapear();
  cheackEnemyDisapear();
  cheackShotEnemyDisapear();
}

//* EVENT LISTENERS

window.addEventListener("keydown", (event) => {
  if (event.key === "w") {
    nave.arriba();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "a") {
    nave.izquierda();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "s") {
    nave.abajo();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "d") {
    nave.derecha();
  }
});
//click
playBtnNode.addEventListener("click", () => {
  startGame();
  sonidoBoton.play();
});

gameBoxNode.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  escudoActivado();
  sonidoEscudoLaser.play();
});

gameBoxNode.addEventListener("click", () => {
  shotSpawn();
  sonidoshot2.play();
});
instruccionesBtnNode.addEventListener("click", () => {
  instrucciones();
  sonidoBoton.play();
});
tryAgainBtnNode.addEventListener("click", () => {
  startGame();
  sonidoBoton.play();
});
saveBtnNode.addEventListener("click", () => {
  sonidoBoton.play();
  saveUser();
});
