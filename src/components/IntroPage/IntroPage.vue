<template>
  <div class="IntroPage font-minecraft">
     <div class="row room-gradient-bg swow-scrren-size-error">
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
    <div class="row game-container room-gradient-bg swow-game">
      <div class="col">
        <div class="row first-half-display">
          <div class="col-12">
            <div class="row">
              <div class="col-6">
                <div class="scienziato-bg-image"></div>
              </div>
              <div class="col-6">
                <div v-if="introState >= 2" class="human-bg-image"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="row second-half-display">
          <div class="col-12 dialog-box">
            <div class="row">
              <div class="col-10 dialogue-line">
                <span
                  v-if="introState === 1"
                  class="dialog-text"
                >DOC: Quick John, We have to save the world!!!!!!!!</span>
                <span
                  v-if="introState === 2"
                  class="dialog-text"
                >JOHN: What DOC?? What are you saying??</span>
                <span
                  v-if="introState === 3"
                  class="dialog-text"
                >DOC: There are three boxes in those containers down there...</span>
                <span
                  v-if="introState === 4"
                  class="dialog-text"
                >DOC: ...The more the container fills with liquid, the more pressure on the boxes...</span>
                <span
                  v-if="introState === 5"
                  class="dialog-text"
                >DOC: ...There is a precise ammount of pressure to reach summing up the boxes...</span>
                <span
                  v-if="introState === 6"
                  class="dialog-text"
                >DOC: ...If we exceed that pressure or if it is more then 3 bar less then the expected...</span>
                <span v-if="introState === 7" class="dialog-text">DOC: ...WE ARE FU***D!!!!</span>
                <span
                  v-if="introState === 8"
                  class="dialog-text"
                >JOHN: But DOC, how is it possible that the world depends on this????</span>
                <span
                  v-if="introState === 9"
                  class="dialog-text"
                >DOC: JOHN, There is no time to explain, to stop the liquid on a container click on the box!!</span>
                <span v-if="introState === 10" class="dialog-text">JOHN: Roger, DOC, i will do it!!</span>
                <span v-if="introState === 11" class="dialog-text">DOC: Ther world counts on YOU!</span>
              </div>
              <div class="col-2">
                <button
                  v-on:click="onNext"
                  v-if="introState <= 10"
                  class="btn btn-primary next-button mt-5"
                >Next</button>
                <button
                  v-on:click="onIntroDone"
                  v-if="introState === 11"
                  class="btn btn-primary next-button mt-5"
                >Play</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./IntroPage.ts">
</script>

<style scoped lang="scss">
.game-container {
  min-height: 100vh;
  width: 100vw;
}

.first-half-display {
  height: 70vh;
}

.second-half-display {
  height: 30vh;
}

.font-minecraft {
  font-family: Minecraft;
}

.room-gradient-bg {
  background-image: linear-gradient(to right, #969696, #cfcfcf);
}

.dialog-box {
  background-color: black;
}

.dialog-text {
  font-size: 20px;
  color: white;
}

.scienziato-bg-image {
  background-image: url("./../../assets/scienziato.png");
  background-repeat: no-repeat;
  height: 400px;
  width: 480px;
}

.human-bg-image {
  background-image: url("./../../assets/omino_2.png");
  background-repeat: no-repeat;
  height: 400px;
  width: 480px;
  margin-top: 166px;
}

.next-button {
  background-color: grey;
  border-color: grey;
}

.dialogue-line {
  margin-top: 40px;
}

.slow-spin {
  -webkit-animation: fa-spin 6s infinite linear;
  animation: fa-spin 15s infinite linear;
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

@font-face {
  font-family: "Minecraft";
  src: url("./../../assets/font/Minecraft.ttf");
}
</style>
