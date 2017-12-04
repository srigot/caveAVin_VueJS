<template>
  <div class="cave">
    <rangee v-bind:nbBouteilles="8" />
    <rangee v-bind:nbBouteilles="8" />
    <clayette/>
    <rangee v-bind:nbBouteilles="8" />
    <rangee v-bind:nbBouteilles="8" />
    <clayette/>
  </div>
</template>

<script>
import rangee from '@/views/Rangee'
import clayette from '@/views/Clayette'

export default {
  name: 'cave',
  components: {
    rangee,
    clayette
  }
}
</script>
