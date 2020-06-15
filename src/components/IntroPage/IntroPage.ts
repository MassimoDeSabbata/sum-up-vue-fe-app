import { Component } from 'vue-property-decorator';
import Vue from 'vue';
import { STORE_MUTATION_UPDATE_INTRO_DONE } from '@/const/storeConsts';

@Component
export default class IntroPage extends Vue {
 introState = 1;
 showScientist = false;

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
}
