# SPACESHIPS GAME
---
![Spaceship_05_BLUE](https://github.com/Germanmtz96/spaceships_game/assets/167866753/f657a2f8-19f1-4923-ae1c-14256fbabfe6) [¡JUGAR!](https://germanmtz96.github.io/spaceships_game/)
<a href="https://germanmtz96.github.io/spaceships_game/"></a>
---
## DESCRIPCION

En este juego tendrás que manejar una nave espacial para proteger la galaxia de enemigos de otros planetas.
Habrá 5 tipos de enemigos distintos y te aparecerán según en el nivel que te encuentres en ese momento, completando el nivel 5 habrás defendido la galaxia con éxito.


---
## FUNCIONALIDADES PRINCIPALES
- La nave que manejas se puede mover por la mitad de la parte izquierda de la pantalla en las 4 direcciones.
- Los enemigos salen en el alto de la pantalla de juego aleatoriamente cada segundo de juego.
- Los enemigos van cambiando según el nivel a otros modelos de enemigos con distinta vida y velocidad
- Tanto los disparos de tu nave como los del enemigo salen de las coordenadas de los nodos en el momento en que se inicia el disparo.
---
## TECNOLOGÍAS UTILIZADAS
- HTML
- CSS
- JavaScript
- Manipulación del DOM
- Clases JS
- Almacenamiento local
- JS Audio() y JS Image()
---
## ESTADOS
- Pantalla de inicio
- Pantalla del juego
- Pantalla de Derrota o Victoria
---
## ESTRUCTURA DEL PROYECTO

#### estructura.js
#
- startGame()
- instrucciones()
- saveUser()
- gameOver()
- escudoSpawn()
- enemySpawn()
- bossSpawn()
- actualizarMovimientoEscudo()
- cheackEnemyDisapear()
- cheackShotDisapear()
- cheackShotEnemyDisapear()
- shotSpawn()
- shotEnemySpawn()
- juegoCompletado()
- muerteEnemigo()
- colisionEscudo()
- colisionShot()
- checkeoPasarDeNivel()
- escudoActivado()
- colisionNave()
- escudosNave()
- saludNave() 
- sumandoScore()
- gameLoop()
#### minave.js
#
- MiNave()
  - this.node
  - this.node.src
  - this.x
  - this.y
  - this.w
  - this.h
  - this.desplazamiento
  - this.escudoActivado
- derecha()
- izquierda()
- abajo()
- arriba()
#### enemigo.js
#
- Enemy()
  - this.node
  - this.node.src
  - this.x
  - this.y
  - this.w
  - this.h
  - this.vida
  - this.speed
-  movimientoEnemigo()
#### disparo.js
#
- Disparo()
  - this.node
  - this.node.src
  - this.x
  - this.y
  - this.w
  - this.h
  - this.speed
  - this.damage
- movimientoDisparo()
#### disparo_enemigo.js
#
- DisparoEnemigo()
  - this.node
  - this.node.src
  - this.x
  - this.y
  - this.w
  - this.h
  - this.speed
  - this.damage
- movimientoDisparoEnemigo()
#### boss.js
#
- Boss()
  - this.node
  - this.node.src
  - this.x
  - this.y
  - this.w
  - this.h
  - this.vida
  - this.speed
-  movimientoEnemigo()
### enemigo_que_dispara.js
#
- Naves4()
  - this.node
  - this.node.src
  - this.x
  - this.y
  - this.w
  - this.h
  - this.vida
  - this.speed
-  movimientoEnemigo()
### escudo_activado.js
#
- Barrera()
  - this.node
  - this.node.src
  - this.x
  - this.y
  - this.w
  - this.h
  - this.activarse
### escudo.js
#
- Escudo()
  - this.node
  - this.node.src
  - this.x
  - this.y
  - this.w
  - this.h
  - this.speed
- movimientoEscudo()
### sonidos.js
#
- sonidoBoton
- sonidoExplosion
- sonidoGameover
- sonidointerferencia
- sonidointerferencia2
- sonidoIntro
- sonidoMusicaGame
- sonidoshot1
- sonidoshot2
- sonidoshot3
- sonidoEscudoLaser
- sonidoLevelUp
- sonidoParasConEscudo
- sonidoShotBoss
- sonidoVictoria
- golpeoEnemigo
## ENLACES ADICIONALES
### Diapositivas
[Enlace](https://www.canva.com/design/DAGKDypZ0rs/0nUyKWVlwNtx0QQjlRbX4A/edit?utm_content=DAGKDypZ0rs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton) <a href="https://www.canva.com/design/DAGKDypZ0rs/0nUyKWVlwNtx0QQjlRbX4A/edit?utm_content=DAGKDypZ0rs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"></a>
