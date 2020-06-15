<template>
  <div class="Game">
    <Room />
  </div>
</template>

<script>
// @ is an alias to /src
import Room from '@/components/room/Room.vue'

export default {
  name: 'Game',
  components: {
    Room
  },
   sockets: {
    },
    methods: {
        
    }
}
</script>