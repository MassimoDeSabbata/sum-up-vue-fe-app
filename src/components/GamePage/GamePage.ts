import { Component } from 'vue-property-decorator';
import Vue from 'vue';
import { LiquidsStatus, BubblesStatus } from '@/models/LiquidsStatusModel';
import { BackgroundStatus, OPERATION_SUM, OPERATION_SUB } from '@/models/BackgroundStatus';
import { DIFFICULTY_EASY, DIFFICULTY_HARD } from '@/const/storeConsts';

@Component
export default class GamePage extends Vue {
  liquidsStatus: any = JSON.parse(JSON.stringify(LiquidsStatus));
  desideredCount: any = 0;
  gameEnded: any = false;
  playButton = true;
  backgroundStatus: any = { ...BackgroundStatus };

  liquidDelay = 10;
  boxMinIncrease = 3;
  gameCounterInitValue = 11;

  bubbles: any = { ...BubblesStatus };
  bubbleIndex = 0;

  DIFFICULTY_EASY = DIFFICULTY_EASY;
  DIFFICULTY_HARD = DIFFICULTY_HARD;

  gameCounter: any = null;

  created() {
    this.gameInit();
  }

  /**
   * This function is called when the user first enter the game
   * and it has never been played and he press play.
   */
  onPlay() {
    this.playButton = false;
    this.startSession();
    this.startBubbles();
    this.startCounter();
  }

  /**
   * Given a box stops the "non liquid" <div> height to be decreased.
   * @param liquidBox string
   */
  stopLiquid(liquidBox: string) {
    console.log(this.liquidsStatus);
    this.liquidsStatus[liquidBox].stopped = true;
  }

  /**
   * This function initializaes the game variables e.g. the random value of
   * pressure
   */
  gameInit() {
    this.liquidsStatus.first.boxValue = this.generateRandomBetween(8, 10);
    this.liquidsStatus.second.boxValue = this.generateRandomBetween(18, 22);
    this.liquidsStatus.third.boxValue = this.generateRandomBetween(20, 35);

    // Changes the settings based on the difficulty
    if (this.$store.state.gameDifficulty === DIFFICULTY_HARD) {
      this.liquidDelay = 2;
      this.boxMinIncrease = 2;
      this.gameCounterInitValue = 6;
      this.desideredCount = this.generateRandomBetween(90, 110);
    }
    if (this.$store.state.gameDifficulty === DIFFICULTY_EASY) {
      this.desideredCount = this.generateRandomBetween(120, 140);
    }
  }

  /**
   * Reset the liquid boxes as empty
   */
  resetLiquid() {
    this.liquidsStatus = JSON.parse(JSON.stringify(LiquidsStatus));
  }

  /**
   * Resets the bubbles as empty
   */
  resetBubbles() {
    this.bubbles = { ...BubblesStatus };
  }

  /**
   * Resets the game to the default status and starts it again.
   */
  resetGame() {
    this.gameInit();
    this.gameEnded = false;
    this.resetLiquid();
    this.resetBubbles();
    this.startCounter();
    this.startSession();
  }

  /**
   * This async function starts a loop that goes on until the game is ended.
   * On every loop each box container is filled with more liquid, then checks if
   * the game is ended.
   */
  async startSession() {
    while (!this.gameEnded) {
      this.decreaseLiquidOnBox('first');
      this.decreaseLiquidOnBox('second');
      this.decreaseLiquidOnBox('third');
      this.checkGameEnded();
      await this.delay(this.liquidDelay);
    }
  }

  /**
   * Given a box container (first, second, third), if it has not been stopped:
   *    - Decresed the "non liquid" <div> height giving the impression that the liquid is growing
   *    - Increses the pressure oh the box (boxValue) with a chanche of 3%
   *    - If the the "non liquid" <div> height is less then 0, stops the box.
   * @param box string
   */
  decreaseLiquidOnBox(box: string) {
    if (!this.liquidsStatus[box].stopped) {
      this.liquidsStatus[box].height -= 0.1;
      const diceRoll = this.generateRandomBetween(1, 100);
      if (diceRoll > 97) {
        this.liquidsStatus[box].boxValue += this.generateRandomBetween(this.boxMinIncrease, this.boxMinIncrease + 1);
      }
      if (this.liquidsStatus[box].height <= 0) {
        this.liquidsStatus[box].stopped = true;
      }
    }
  }

  /**
   * Sets the game as ended if every box is stopped or if the game counter is 0.
   */
  checkGameEnded() {
    if (this.liquidsStatus.first.stopped && this.liquidsStatus.second.stopped && this.liquidsStatus.third.stopped) {
      this.endGame();
      return;
    }
    if (this.gameCounter === 0) {
      this.endGame();
      return;
    }
  }

  /**
   * Stops the hame and starts the transition of the background to red if the game is lost
   * ot transition to blue if the game is won.
   */
  endGame() {
    this.gameEnded = true;
    if (this.gameIsWon()) {
      this.TransitBgToBlue();
    } else {
      this.TransitBgToRed();
    }
  }

  /**
   * Returns the sum of the current box values
   */
  getGamerPoints() {
    return this.liquidsStatus.first.boxValue + this.liquidsStatus.second.boxValue + this.liquidsStatus.third.boxValue;
  }

  /**
   * This async function generates the animation of the bubbles on the liquid.
   * It has an infinite loop (this.bubbleIndex is always > 1) in witch a bubble is added to the
   * box liquid and then every pre-existing bubble is shifted up one position.
   * Every Liquid box (there are three) has its own bubble configuration, that
   * consists of an array in witch every element rappresents a bubble that has an id,
   * an height that will change every loop and a margin-left from the liquid box border
   */
  async startBubbles() {
    while (this.bubbleIndex > -1) {
      this.addBubble('first');
      this.addBubble('second');
      this.addBubble('third');
      this.addHeigthToAll('first');
      this.addHeigthToAll('second');
      this.addHeigthToAll('third');
      await this.delay(100);
    }
  }

  /**
   * Given a box this function adds a bubble to its bubble configuration.
   * Every Liquid box (there are three) has its own bubble configuration, that
   * consists of an array in witch every element rappresents a bubble that has an id,
   * an height that will change every loop and a margin-left from the liquid box border, this
   * last param is randomly generated to create the sens of a unique pattern.
   * @param box string
   */
  addBubble(box: any) {
    this.bubbles[box].push({
      id: this.bubbleIndex,
      height: 0,
      distanceToBorder: this.generateRandomBetween(2, 100),
    });
    this.bubbleIndex += 1;
  }

  /**
   * Given a box this function creates a new bubble configuration for the box
   * that is the same as the existing one but in witch every bubble have 1 heigth more.
   * Also its does NOT copy a bubble if it is heigher the 25 (the max height of the liquid) or
   * if it is heigher then the result of calculateHightLimitForBubble that rappresents the current
   * height of the liquid if it is not full.
   * @param box string
   */
  addHeigthToAll(box: any) {
    const newBubbleArray: Array<any> = new Array<any>();
    for (let bubbleindex = 0; bubbleindex < this.bubbles[box].length; bubbleindex++) {
      this.bubbles[box][bubbleindex].height += 1;
      if (this.bubbles[box][bubbleindex].height < 25 && this.bubbles[box][bubbleindex].height < this.calculateHightLimitForBubble(box)) {
        newBubbleArray.push(this.bubbles[box][bubbleindex]);
      }
    }

    this.bubbles[box] = newBubbleArray;
  }

  /**
   * Given a box it takes the "non liquid" <div> height that is 0 to 100, and returns the
   * proportion of the value for a 0-25 scale for the bubble hight
   * @param box string
   */
  calculateHightLimitForBubble(box: any) {
    return (25 * (100 - this.liquidsStatus[box].height)) / 100 - 1;
  }

  /**
   * This function resets and starts the game counter, used as count-down.
   */
  async startCounter() {
    this.gameCounter = this.gameCounterInitValue;
    while (this.gameCounter > 0 && !this.gameEnded) {
      this.gameCounter -= 1;
      await this.delay(1000);
    }
  }

  /**
   * When the game ends checks if the game is won, so if the sum of the box values is
   * NOT greater the the desidere one and is NOT more then (10% of desidered count) points
   * less then the desidered one.
   */
  gameIsWon() {
    if (this.desideredCount - this.getGamerPoints() <= this.getTenPercentOfTotal() && this.desideredCount - this.getGamerPoints() >= 0) {
      return true;
    }
    return false;
  }

  /**
   * When the game is won this function give a rate to the user perfonmance form 0 to 10.
   * The rate is a proportion on bas 10 of how much is the result different from the
   * desidered count.
   */
  gamePointsOutOfTen() {
    return 10 - Math.floor(((this.desideredCount - this.getGamerPoints()) * 10) / this.getTenPercentOfTotal());
  }

  /**
   * Returns the 10% of the desidered count.
   */
  getTenPercentOfTotal() {
    return (this.desideredCount / 100) * 10;
  }

  /**
   * Make the background transit to red, waits 2 seconds then get
   * the background back to normal grey
   */
  async TransitBgToRed() {
    for (let index = 0; index < 50; index++) {
      this.trnasitRgbByOne(OPERATION_SUM, OPERATION_SUB, OPERATION_SUB);
      await this.delay(10);
    }
    await this.delay(2000);
    for (let index = 0; index < 50; index++) {
      this.trnasitRgbByOne(OPERATION_SUB, OPERATION_SUM, OPERATION_SUM);
      await this.delay(10);
    }
  }

  /**
   * Make the background transit to blue, waits 2 seconds then get
   * the background back to normal grey
   */
  async TransitBgToBlue() {
    for (let index = 0; index < 50; index++) {
      this.trnasitRgbByOne(OPERATION_SUB, null, OPERATION_SUM);
      await this.delay(10);
    }
    await this.delay(2000);
    for (let index = 0; index < 50; index++) {
      this.trnasitRgbByOne(OPERATION_SUM, null, OPERATION_SUB);
      await this.delay(10);
    }
  }

  /**
   * Given an operation (Sum or Decrease) for every color of rgb operates a transition of one
   * to every one of them, one more if sum, one less if decrease.
   * @param rOperation string
   * @param gOperation string
   * @param bOperation string
   */
  trnasitRgbByOne(rOperation: any, gOperation: any, bOperation: any) {
    this.transitSingleColorByOne('r', rOperation);
    this.transitSingleColorByOne('g', gOperation);
    this.transitSingleColorByOne('b', bOperation);
  }

  /**
   * Given an operation (Sum or Decrease) and a color of rgb operates a transition of one
   * to it, one more if sum, one less if decrease.
   * @param color string
   * @param operation string
   */
  transitSingleColorByOne(color: string, operation: any) {
    if (operation === OPERATION_SUM) {
      this.backgroundStatus[color] += 1;
    }
    if (operation === OPERATION_SUB) {
      this.backgroundStatus[color] -= 1;
    }
  }

  /**
   * Wait ms milliseconds then resolve the promise.
   * @param ms milliseconds to wait
   */
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Generates a random number between the max and the min one.
   * @param min number
   * @param max number
   */
  generateRandomBetween(min: any, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
