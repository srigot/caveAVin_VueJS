<template>
  <b-list-group-item
    href="#"
    class="cardVin flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1 nom">{{ item.annee }} - {{ item.nom }}</h5>
      <b-button-group size="sm">
        <b-btn class="btnAddEmpl" v-on:click="eventAjouterEmplacement">+</b-btn>
        <b-btn class="btnRemoveEmpl" v-on:click="eventSupprimerEmplacement" v-bind:class="{ disabled: item.emplacements === undefined || item.emplacements.length==0 }">-</b-btn>
      </b-button-group>
    </div>
    <p class="mb-1">
      {{ item.region }}<span v-if="item.region !== undefined && item.region.length > 0 && item.appellation !== undefined && item.appellation.length > 0"> / </span>{{ item.appellation }}
    </p>
    <small v-if="item.emplacements !== undefined">Nombre bouteilles = {{ item.emplacements.length }}
      <span v-for="emp in item.emplacements" :item="emp">[{{ emp.rangee }};{{emp.colonne}}] </span></small>
  </b-list-group-item>
</template>

<script>
export default {
  name: 'cardVin',
  props: ['item'],
  methods: {
    eventAjouterEmplacement () {
      this.$emit('eventAjouterEmplacement', this.item)
    },
    eventSupprimerEmplacement () {
      if (this.item.emplacements !== undefined && this.item.emplacements.length > 0) {
        this.$emit('eventSupprimerEmplacement', this.item)
      }
    }
  }
}
</script>
