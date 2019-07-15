<template>
  <div class="counter-warp">
   
  </div>
</template>

<script>
// Use Vuex
import store from './store'

export default {
  computed: {
    count () {
      return store.state.count
    }
  },
  methods: {
   
  }
}
</script>

<style>

</style>
