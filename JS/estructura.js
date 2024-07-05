


const inicioScreenNode = document.querySelector("#pantalla-inicio");
const gameScreenNode = document.querySelector("#pantalla-juego");
const gameOverScreenNode = document.querySelector("#pantalla-game-over");
const gameWinNode = document.querySelector("#pantalla-win")

const musicaIntroNode = document.querySelector("#startMusicBtn");
const inputSaveNode = document.querySelector("#name");
const saveBtnNode = document.querySelector("#save-btn");
const playBtnNode = document.querySelector("#play-btn");
const instruccionesBtnNode = document.querySelector("#instrucciones-btn");
const tryAgainBtnNode = document.querySelector("#try-again-btn");
const restartBtnNode = document.querySelector("#restart-btn")

const saludoUserNode = document.querySelector("#saludoUser");
const message = document.querySelector("#message");
const userNode = document.querySelector("#user");

const escudoNode = document.querySelector("#escudos");
const vidasNode = document.querySelector("#vidas");
const scoreNode = document.querySelector("#score");

const instruccionesNode = document.querySelector("#instrucciones");

const gameBoxNode = document.querySelector("#game-box");


let userName = null;
let instruccion = true;
let otraPartida = true;
let disparos = false;
let score = null;
let vidas = null;
let proteccion = null;
let escudo = null;
let estaEscudoActivado = false;

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



musicaIntroNode.addEventListener("click", () => {
  sonidoIntro.loop = true;
  sonidoIntro.volume = 0.05;
  sonidoIntro.play();
  musicaIntroNode.style.display = "none";
});


function startGame() {
  sonidoIntro.pause();

  
  lvl = 1;
  score = 0;
  vidas = 3;
  escudo = 1;
  

  disparos = false;
  message.innerText = `Level ${lvl}`;
  message.classList.remove("txt-lvl");
  setTimeout(function () {
    message.classList.add("txt-lvl");
  }, 2500);

  gameOverScreenNode.style.display = "none";
  inicioScreenNode.style.display = "none";

  gameScreenNode.style.display = "flex";
  gameBoxNode.style.display = "flex";

  nave = new MiNave(
    gameScreenNode.offsetWidth / 10,
    gameScreenNode.offsetHeight / 2 - 30
  );

  
  mainIntervalId = setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60));
 
  enemyInterval = setInterval(() => {
    enemySpawn();
  }, 1000);

  shotEnemyInteval = setInterval(() => {
    shotEnemySpawn();
  }, 5000);

  escudoInterval = setInterval(() => {
    escudoSpawn();
  }, 7000);
  
  bossInterval = setInterval(() => {
    shotEnemySpawn();
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
  userName = inputSaveNode.value;
  userNode.innerText = `${userName}`;
  saludoUserNode.style.display = "flex";
  saludoUserNode.innerText = `¿Estas preparado para jugar ${userName}?`;
}

function gameOver() {
  if (vidas === 0) {
    sonidoMusicaGame.pause();
    sonidoGameover.play();
    sonidoGameover.volume = 0.2;

    enemigoArr.forEach((cadaEnemigo) => {
      cadaEnemigo.node.remove();
    });
    shotArr.forEach((cadaShot) => {
      cadaShot.node.remove();
    });
    shotEnemyArr.forEach((cadaShotEnemigo) => {
      cadaShotEnemigo.node.remove();
    });
    escudoArr.forEach((cadaEscudo) => {
      cadaEscudo.node.remove();
    });
    nave.node.remove();

    save = null;
    lvl = null;
    enemigoArr = [];
    shotArr = [];
    shotEnemyArr = [];
    escudoArr = [];

  
    clearInterval(mainIntervalId);
    clearInterval(enemyInterval);
    clearInterval(shotEnemyInteval);
    clearInterval(bossInterval);
    clearInterval(escudoInterval);
   

    gameScreenNode.style.display = "none";
   
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
  } else if (lvl === 5) {
    disparos = true;
  } else {
    enemy = new Enemy(randomPositionY, lvl);
  }
  enemigoArr.push(enemy);
 
}

function bossSpawn() {
  disparos = true;
  let boss = new Boss();
  enemigoArr.forEach((cadaEnemigo4) => {
    cadaEnemigo4.node.remove();
  });
  enemigoArr = [];
  enemigoArr.push(boss);

}

function actualizarMovimientoEscudo() {
  if (estaEscudoActivado === true) {
    proteccion.x = nave.x - 10;
    proteccion.y = nave.y - 22;
    proteccion.node.style.left = `${proteccion.x}px`;
    proteccion.node.style.top = `${proteccion.y}px`;
  }
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

  if(!disparos) {
    return
  }

  sonidoshot1.pause();
  sonidoshot1.currentTime = 0;
  sonidoshot1.volume = 0.05;
  sonidoshot1.play();
  enemigoArr.forEach((cadaEnemigo) => {
    let enemyPositionX;
    let enemyPositionY;
    let type;
    let distanciaY;

    if (cadaEnemigo.type === "boss") {
      console.log("disparo jefe")
      enemyPositionY = cadaEnemigo.y + 5;
      enemyPositionX = cadaEnemigo.x - 20;
      type = "boss";
      distanciaY = 150
    } else if(cadaEnemigo.type === "enemy"){
      enemyPositionY = cadaEnemigo.y + 12;
      enemyPositionX = cadaEnemigo.x + 12;
      type = "enemy";
      distanciaY = 30
    }

    let shotEnemy = new DisparoEnemigo(
      enemyPositionY, 
      enemyPositionX, 
      type
    );
    shotEnemyArr.push(shotEnemy);
    let shotEnemyAbajo = new DisparoEnemigo(
      enemyPositionY + distanciaY,
      enemyPositionX,
      type
    );
    shotEnemyArr.push(shotEnemyAbajo);
    if (cadaEnemigo.type === "boss") {
      console.log(shotEnemy)
      console.log(shotEnemyAbajo)
    }
  });

}

function juegoCompletado() {
  sonidoMusicaGame.pause();
  sonidoVictoria.play();
  sonidoVictoria.volume = 0.2;
  gameScreenNode.style.display = "none";
  gameWinNode.style.display = "flex";

  enemigoArr.forEach((cadaEnemigo) => {
    cadaEnemigo.node.remove();
  });
  shotArr.forEach((cadaShot) => {
    cadaShot.node.remove();
  });
  shotEnemyArr.forEach((cadaShotEnemigo) => {
    cadaShotEnemigo.node.remove();
  });
  escudoArr.forEach((cadaEscudo) => {
    cadaEscudo.node.remove();
  });
  nave.node.remove();
  if (escudo) {
     escudo.node.remove();
  }

  save = null;
  lvl = null;
  enemigoArr = [];
  shotArr = [];
  shotEnemyArr = [];
  escudoArr = [];

 
  clearInterval(mainIntervalId);
  clearInterval(enemyInterval);
  clearInterval(shotEnemyInteval);
  clearInterval(bossInterval);
  clearInterval(escudoInterval);
  

  
}

function muerteEnemigo(cadaEnemigo, cadaDisparo, indexEnemy, indexShot) {
  if (cadaEnemigo.vida > 0) {
    golpeoEnemigo.pause();
    golpeoEnemigo.currentTime = 0;
    golpeoEnemigo.volume = 0.05;
    golpeoEnemigo.play();

    cadaEnemigo.vida -= cadaDisparo.damage;
   
  }
  if (cadaEnemigo.vida <= 0) {
    sonidoExplosion.pause();
    sonidoExplosion.currentTime = 0;
    sonidoExplosion.volume = 0.05;
    sonidoExplosion.play();

    enemigoArr.splice(indexEnemy, 1);
    cadaEnemigo.node.remove();
    score += 10;
    
    if (cadaEnemigo.type === "boss") {
      sonidoVictoria.play();
      juegoCompletado()
    }
    
  }
  
  shotArr.splice(indexShot, 1);
  cadaDisparo.node.remove();
    

}

function colisionEscudo() {
  if (estaEscudoActivado === true) {
    enemigoArr.forEach((cadaEnemigo, indexEnemy) => {
      if (
        proteccion.x < cadaEnemigo.x + cadaEnemigo.w &&
        proteccion.x + proteccion.w > cadaEnemigo.x &&
        proteccion.y < cadaEnemigo.y + cadaEnemigo.h &&
        proteccion.y + proteccion.h > cadaEnemigo.y
      ) {
        sonidoExplosion.pause();
        sonidoExplosion.currentTime = 0;
        sonidoExplosion.volume = 0.05;
        sonidoExplosion.play();

        enemigoArr.splice(indexEnemy, 1);
        cadaEnemigo.node.remove();
      }
    });
  }
  if (estaEscudoActivado === true) {
    shotEnemyArr.forEach((cadaDisparo, index) => {
      if (
        proteccion.x < cadaDisparo.x + cadaDisparo.w &&
        proteccion.x + proteccion.w > cadaDisparo.x &&
        proteccion.y < cadaDisparo.y + cadaDisparo.h &&
        proteccion.y + proteccion.h > cadaDisparo.y
      ) {
        sonidoParasConEscudo.pause();
        sonidoParasConEscudo.currentTime = 0;
        sonidoParasConEscudo.volume = 0.05;
        sonidoParasConEscudo.play();
        shotEnemyArr.splice(index, 1);
        cadaDisparo.node.remove();
      }
    });
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
        checkeoPasarDeNivel();
        muerteEnemigo(cadaEnemigo, cadaDisparo, indexEnemy, indexShot);
      }
    });
  });
}

function checkeoPasarDeNivel() {
  if (score === 100) {
    lvl = 2;
    sonidoLevelUp.play();
    sonidoLevelUp.volume = 0.1;
    message.innerText = `Level ${lvl}`;
    message.classList.remove("txt-lvl");
    setTimeout(function () {
      message.classList.add("txt-lvl");
    }, 4000);
  } else if (score === 200) {
    lvl = 3;
    sonidoLevelUp.play();
    sonidoLevelUp.volume = 0.1;
    message.innerText = `Level ${lvl}`;
    message.classList.remove("txt-lvl");
    setTimeout(function () {
      message.classList.add("txt-lvl");
    }, 4000);
  } else if (score === 300) {
    lvl = 4;
    sonidoLevelUp.play();
    sonidoLevelUp.volume = 0.1;
    message.innerText = `Level ${lvl}`;
    message.classList.remove("txt-lvl");
    setTimeout(function () {
      message.classList.add("txt-lvl");
    }, 4000);
  } else if (!enemigoArr.some((eachEnemy) => eachEnemy.type === "boss") && score === 50) {
    lvl = 5;
    sonidointerferencia.play();
    sonidointerferencia.volume = 0.1;
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

function escudoActivado() {
  escudo -= 1;
  let navePositionY = nave.y;
  let navePositionX = nave.x;
  proteccion = new Barrera(navePositionY, navePositionX);

  setTimeout(() => {
    estaEscudoActivado = false;
    proteccion.node.remove();
  }, 4200);
}

function colisionNave() {
  enemigoArr.forEach((cadaEnemigo, index) => {
    if (
      cadaEnemigo.x < nave.x + nave.w &&
      cadaEnemigo.x + cadaEnemigo.w > nave.x &&
      cadaEnemigo.y < nave.y + nave.h &&
      cadaEnemigo.y + cadaEnemigo.h > nave.y
    ) {
      sonidoExplosion.pause();
      sonidoExplosion.currentTime = 0;
      sonidoExplosion.volume = 0.05;
      sonidoExplosion.play();

      sonidointerferencia2.pause();
      sonidointerferencia2.currentTime = 0;
      sonidointerferencia2.volume = 0.05;
      sonidointerferencia2.play();
      vidas -= 1;
      enemigoArr.splice(index, 1);
      cadaEnemigo.node.remove();

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
      sonidointerferencia2.pause();
      sonidointerferencia2.currentTime = 0;
      sonidointerferencia2.volume = 0.05;
      sonidointerferencia2.play();
      vidas -= 1;
      shotEnemyArr.splice(index, 1);
      cadaDisparo.node.remove();
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
      sonidoBoton.volume = 0.05;
      escudo += 1;
      escudoArr.splice(index, 1);
      cadaEscudo.node.remove();
    }
  });
}
function escudosNave() {
  if (escudo === 6) {
    escudoNode.innerText = `ESCUDOS 🛡️🛡️🛡️🛡️🛡️🛡️`;
  } else if (escudo === 5) {
    escudoNode.innerText = `ESCUDOS 🛡️🛡️🛡️🛡️🛡️`;
  } else if (escudo === 4) {
    escudoNode.innerText = `ESCUDOS 🛡️🛡️🛡️🛡️`;
  } else if (escudo === 3) {
    escudoNode.innerText = `ESCUDOS 🛡️🛡️🛡️`;
  } else if (escudo === 2) {
    escudoNode.innerText = `ESCUDOS 🛡️🛡️`;
  } else if (escudo === 1) {
    escudoNode.innerText = `ESCUDOS 🛡️`;
  } else if (escudo === 0) {
    escudoNode.innerText = `ESCUDOS `;
  }
}

function saludNave() {
  if (vidas === 3) {
    vidasNode.innerText = `VIDAS ❤️❤️❤️`;
  } else if (vidas === 2) {
    vidasNode.innerText = `VIDAS ❤️❤️`;
  } else if (vidas === 1) {
    vidasNode.innerText = `VIDAS ❤️`;
  }
}

function sumandoScore() {
  scoreNode.innerText = `SCORE: ${score}`;
}

function gameLoop() {
  enemigoArr.forEach((cadaEnemigo) => {
    cadaEnemigo.movimientoEnemigo();
  });

  shotArr.forEach((cadaShot) => {
    cadaShot.movimientoDisparo();
  });
  shotEnemyArr.forEach((cadaShotEnemy) => {
    cadaShotEnemy.movimientoDisparoEnemigo();
  });

  escudoArr.forEach((cadaEscudo) => {
    cadaEscudo.movimientoEscudo();
  });
  actualizarMovimientoEscudo();

  escudosNave();
  saludNave();
  sumandoScore();

  gameOver();

  colisionEscudo();
  colisionShot();
  colisionNave();
  cheackShotDisapear();
  cheackEnemyDisapear();
  cheackShotEnemyDisapear();
}



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

playBtnNode.addEventListener("click", () => {
  startGame();
  sonidoBoton.play();
  setTimeout(() => {
    sonidoMusicaGame.loop = true;
    sonidoMusicaGame.currentTime = 0;
    sonidoMusicaGame.volume = 0.05;
    sonidoMusicaGame.play();
  }, 1200);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "e" && escudo > 0) {
    estaEscudoActivado = true;
    escudoActivado();
    sonidoEscudoLaser.play();
    console.log("escudo activado");
  }
});

gameBoxNode.addEventListener("click", () => {
  shotSpawn();
  sonidoshot2.pause();
  sonidoshot2.currentTime = 0;
  sonidoshot2.volume = 0.05;
  sonidoshot2.play();
});
instruccionesBtnNode.addEventListener("click", () => {
  instrucciones();
  sonidoBoton.pause();
  sonidoBoton.currentTime = 0;
  sonidoBoton.play();
});
tryAgainBtnNode.addEventListener("click", () => {
  startGame();
  sonidoBoton.play();
  setTimeout(() => {
    sonidoMusicaGame.loop = true;
    sonidoMusicaGame.currentTime = 0;
    sonidoMusicaGame.volume = 0.05;
    sonidoMusicaGame.play();
  }, 1200);
});
restartBtnNode.addEventListener("click", () => {
  startGame();
  sonidoBoton.play();
  setTimeout(() => {
    sonidoMusicaGame.loop = true;
    sonidoMusicaGame.currentTime = 0;
    sonidoMusicaGame.volume = 0.05;
    sonidoMusicaGame.play();
  }, 1200);
})


saveBtnNode.addEventListener("click", () => {
  sonidoBoton.pause();
  sonidoBoton.currentTime = 0;
  sonidoBoton.play();
  saveUser();
});
