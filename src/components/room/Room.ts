import { Component,  Vue } from 'vue-property-decorator';
import router from '@/router';
import GamePage from '@/components/GamePage/GamePage.vue';
import IntroPage from '@/components/IntroPage/IntroPage.vue';

@Component({
  components: {
    GamePage  ,
    IntroPage
  },
})
export default class Room extends Vue {
  introDone = false;  
}
