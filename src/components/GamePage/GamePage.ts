import { Component } from 'vue-property-decorator';
import Vue from 'vue';
import { LiquidsStatus, BubblesStatus } from '@/models/LiquidsStatusModel';

@Component
export default class GamePage extends Vue {
  liquidsStatus: any = JSON.parse(JSON.stringify(LiquidsStatus));
  desideredCount: any = 56;
  gameEnded: any = false;
  playButton = true;

  bubbles: any = { ...BubblesStatus };
  bubbleIndex = 0;

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
    this.liquidsStatus.first.boxValue = this.generateRandomBetween(1, 8);
    this.liquidsStatus.second.boxValue = this.generateRandomBetween(1, 8);
    this.liquidsStatus.third.boxValue = this.generateRandomBetween(1, 8);
    this.desideredCount = this.generateRandomBetween(70, 100);
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
      await this.delay(10);
    }
  }

  /**
   * Given a box container (first, second, third), if it has not been stopped:
   *    - Decresed the "non liquid" <div> height giving the impression that the liquid is growing
   *    - Increses the pressure oh the box (boxValue) with a chanche of 2%
   *    - If the the "non liquid" <div> height is less then 0, stops the box.
   * @param box string
   */
  decreaseLiquidOnBox(box: string) {
    if (!this.liquidsStatus[box].stopped) {
      this.liquidsStatus[box].height -= 0.1;
      const diceRoll = this.generateRandomBetween(1, 100);
      if (diceRoll > 97) {
        this.liquidsStatus[box].boxValue += 2;
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
      this.gameEnded = true;
      return;
    }
    if (this.gameCounter === 0) {
      this.gameEnded = true;
      return;
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
   * This function resets and starts the game counter, used adds count-down.
   */
  async startCounter() {
    this.gameCounter = 11;
    while (this.gameCounter > 0 && !this.gameEnded) {
      this.gameCounter -= 1;
      await this.delay(1000);
    }
  }

  /**
   * When the game ends checks if the game is won, so if the sum of the box values is
   * NOT greater the the desidere one and is NOT more then 3 points less then the desidered one.
   */
  gameIsWon() {
    if (this.desideredCount - this.getGamerPoints() < 3 && this.desideredCount - this.getGamerPoints() >= 0) {
      return true;
    }
    return false;
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
