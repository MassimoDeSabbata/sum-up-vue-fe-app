import { Component } from 'vue-property-decorator';
import Vue from 'vue';
import { STORE_MUTATION_UPDATE_INTRO_DONE, DIFFICULTY_EASY, DIFFICULTY_HARD, STORE_MUTATION_UPDATE_DIFFICULTY } from '@/const/storeConsts';

@Component
export default class IntroPage extends Vue {
 introState = 0;
 showScientist = false;

 DIFFICULTY_EASY = DIFFICULTY_EASY;
 DIFFICULTY_HARD = DIFFICULTY_HARD;

created() {
  this.showScientist = true;
}

/**
 * Updates the store value introDone as true so that the game page gets showed.
 */
  onIntroDone() {
    this.$store.commit(STORE_MUTATION_UPDATE_INTRO_DONE, true);
  }

  /**
   * Increments by 1 the instro state to change the intro dialogues.
   */
  onNext() {
    this.introState += 1;
  }

  /**
   * Updates the game difficulty based on the user choiche. Then 
   * calls onNext.
   * @param difficulty string
   */
  chooseDifficulty(difficulty: any) {
    this.$store.commit(STORE_MUTATION_UPDATE_DIFFICULTY, difficulty);
    this.onNext();
  }
}
