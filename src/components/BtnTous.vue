<template>
  <b-btn class="btnTous" v-bind:class="{ active: filterAll}" aria-pressed="true" size="sm" variant="success" data-toggle="button" v-on:click="toogleFiltreAll">Tous</b-btn>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'btnTous',
  computed: mapState(['filterAll']),
  methods: mapActions(['toogleFiltreAll'])
}
</script>
