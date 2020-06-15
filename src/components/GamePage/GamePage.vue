<template>
  <div class="GamePage font-minecraft">
    <!-- error in case the screen is too little -->
    <div class="row swow-scrren-size-error room-gradient-bg">
      <div class="col">
        <div class="row">
          <div class="col">
            <h1>ERROR</h1>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col">
            <h3>Seems like your screen is too little to contain the greatness of this game</h3>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="row">
          <div class="col">
            <h5>try with a bigger screen....</h5>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col">
            <font-awesome-icon icon="cog" size="6x" class="slow-spin gear-icon" />
          </div>
        </div>
      </div>
    </div>
    <!-- Game page, changes the background dynamically on backgroundStatus -->
    <div
      class="row game-container swow-game"
      v-bind:style="{ 'background-image': 'linear-gradient(to right, rgb('+backgroundStatus.r+', '+backgroundStatus.g+', '+backgroundStatus.b+'), #cfcfcf)' }"
    >
      <div class="col-4">
        <div class="row">
          <div class="col gear-spinning">
            <div class="left-angular-bg-image">
              <font-awesome-icon icon="cog" size="6x" class="slow-spin gear-icon" />
            </div>
          </div>
        </div>
        <div class="row">
          <!-- Stats box -->
          <div class="col">
            <div class="row">
              <div class="col frame-bg-image"></div>
            </div>
            <div class="stats-box">
              <div class="row">
                <div class="col">
                  <span class="stats-text">Desidered pressure: {{desideredCount}}</span>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <!-- Current pressure only on EASY mode -->
                  <span
                    v-if="$store.state.gameDifficulty === DIFFICULTY_EASY || this.gameEnded"
                    class="stats-text"
                  >Current pressure: {{getGamerPoints()}}</span>
                </div>
              </div>

              <div class="row" v-if="!gameEnded">
                <div class="col">
                  <span class="stats-text" v-if="gameCounter">You only have {{gameCounter}} seconds!</span>
                </div>
              </div>

              <div class="row mt-3" v-if="gameEnded">
                <div class="col">
                  <span class="stats-text" v-if="gameIsWon()">YOU saved the WORLD!! Well done!</span>
                  <br />
                  <span
                    class="stats-text"
                    v-if="gameIsWon()"
                  >you got... {{gamePointsOutOfTen()}} / 10</span>
                  <span class="stats-text" v-else>OH NO... there is no more hope for this world....</span>
                </div>
              </div>

              <div class="row" v-if="gameEnded">
                <div class="col">
                  <button class="btn btn-primary stats-button" v-on:click="resetGame">try again</button>
                </div>
              </div>
              <div class="row mt-4" v-if="playButton">
                <div class="col">
                  <button class="btn btn-primary stats-button" v-on:click="onPlay">Start!</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Liquid boxes -->
      <div class="col">
        <div class="row ml-3 liquid-boxes-container">
          <div class="col-1 liquid-boxes-left-margin"></div>
          <!-- First box -->
          <div class="liquid-box-container-first-bg-image">
            <div class="liquid-box liquid-box-first">
              <div
                class="row non-liquid"
                v-bind:style="{ height: liquidsStatus.first.height + '%' }"
              >
                <div class="col">
                  <div class="box" v-on:click="stopLiquid('first')">
                    <span class="box-value">{{liquidsStatus.first.boxValue}}</span>
                  </div>
                </div>
              </div>

              <div class="bubble-spawn-container">
                <div
                  v-for="bubble in bubbles['first']"
                  :key="bubble.id"
                  class="water-bubble"
                  v-bind:style="{ 'margin-left': bubble.distanceToBorder + 'px', 'padding-bottom': '-' + bubble.height + 'px' }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Second Box -->
          <div class="liquid-box-container-bg-image">
            <div class="liquid-box">
              <div
                class="row non-liquid"
                v-bind:style="{ height: liquidsStatus.second.height + '%' }"
              >
                <div class="col">
                  <div class="box" v-on:click="stopLiquid('second')">
                    <span class="box-value">{{liquidsStatus.second.boxValue}}</span>
                  </div>
                </div>
              </div>
              <div class="bubble-spawn-container">
                <div
                  v-for="bubble in bubbles['second']"
                  :key="bubble.id"
                  class="water-bubble"
                  v-bind:style="{ 'margin-left': bubble.distanceToBorder + 'px', 'padding-bottom': '-' + bubble.height + 'px' }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Third box -->
          <div class="liquid-box-container-bg-image">
            <div class="liquid-box">
              <div
                class="row non-liquid"
                v-bind:style="{ height: liquidsStatus.third.height + '%' }"
              >
                <div class="col">
                  <div class="box" v-on:click="stopLiquid('third')">
                    <span class="box-value">{{liquidsStatus.third.boxValue}}</span>
                  </div>
                </div>
              </div>
              <div class="bubble-spawn-container">
                <div
                  v-for="bubble in bubbles['third']"
                  :key="bubble.id"
                  class="water-bubble"
                  v-bind:style="{ 'margin-left': bubble.distanceToBorder + 'px', 'padding-bottom': '-' + bubble.height + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col p-0">
            <div class="box-stand-bg"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./GamePage.ts">
</script>

<style scoped lang="scss">
.game-container {
  min-height: 100vh;
  width: 100vw;
}

.liquid-box {
  border-style: none solid solid solid;
  height: 237px;
  margin-top: 10px;
  margin-left: 44px;
  margin-right: 16px;
  background-color: #878787;
  width: 130px;
}

.non-liquid {
  background-color: #636363;
  z-index: 120;
  width: 125px;
  margin-left: 0px;
}

.box {
  background-color: rgb(51, 51, 51);
  width: 30%;
  position: absolute;
  bottom: 0;
  margin-left: 24%;
  height: 4px;
  padding-bottom: 24%;
  cursor: pointer;
}

.water-bubble {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border-style: solid;
  z-index: 110;
}

.box-value {
  color: white;
}

.liquid-boxes-container {
  margin-top: 50px;
}

.font-minecraft {
  font-family: Minecraft;
}

.box-stand-bg {
  background-image: url("./../../assets/supporto_definitivo.png");
  background-repeat: no-repeat;
  height: 330px;
  margin-left: auto;
  width: 702px;
}

.liquid-box-container-first-bg-image {
  background-image: url("./../../assets/contenitore_con_rubinetto.png");
  background-repeat: no-repeat;
  height: 278px;
}

.liquid-box-container-bg-image {
  background-image: url("./../../assets/contenitore_con_tubo.png");
  background-repeat: no-repeat;
  height: 278px;
  width: 205px;
}

.left-angular-bg-image {
  background-image: url("./../../assets/angolare_sinistro_6.png");
  background-repeat: no-repeat;
  height: 278px;
  width: 205px;
}

.slow-spin {
  -webkit-animation: fa-spin 6s infinite linear;
  animation: fa-spin 15s infinite linear;
}

.gear-icon {
  color: black;
}

.room-gradient-bg {
  background-image: linear-gradient(to right, #969696, #cfcfcf);
}

.stats-box {
  background-color: black;
  height: 200px;
  width: 352px;
}

.stats-text {
  font-size: 20px;
  color: rgb(177, 174, 174);
}

.stats-button {
  background-color: grey;
  border-color: grey;
}

.frame-bg-image {
  background-image: url("./../../assets/cornice_6.png");
  background-repeat: no-repeat;
  height: 149px;
  width: 205px;
  margin-top: 10px;
}

.gear-spinning {
  height: 200px;
}

.liquid-boxes-left-margin {
  height: 100px;
  width: 10px;
  margin-left: auto;
}

.bubble-spawn-container {
  height: 10px;
}

.swow-scrren-size-error {
  display: none;
}

@media only screen and (max-width: 1130px) {
  .swow-game {
    display: none;
  }
  .swow-scrren-size-error {
    display: inline;
  }
}

@media only screen and (min-height: 600px) {
  .frame-bg-image {
    margin-top: 13vh;
  }

  .liquid-boxes-container {
    margin-top: 15vh;
  }
}

@media only screen and (min-height: 750px) {
  .frame-bg-image {
    margin-top: 25vh;
  }

  .liquid-boxes-container {
    margin-top: 30vh;
  }
}

@font-face {
  font-family: "Minecraft";
  src: url("./../../assets/font/Minecraft.ttf");
}
</style>
