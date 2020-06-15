<template>
  <div class="Room">
     <intro-page v-if="!$store.state.introDone">
     </intro-page>
     <game-page v-if="$store.state.introDone">
     </game-page>
  </div>
</template>

<script lang="ts" src="./Room.ts">
</script>

<style scoped lang="scss">

</style>
