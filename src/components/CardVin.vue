<template>
  <b-card
    class="cardVin mt-3"
    show-header
    show-footer>
    <div slot="header" class="d-flex justify-content-between align-items-center">
      {{ item.nom }}
      <b-button-group size="sm">
        <b-btn class="btnAddEmpl" v-on:click="eventAjouterEmplacement">+</b-btn>
        <b-btn class="btnRemoveEmpl" v-on:click="eventSupprimerEmplacement" v-bind:class="{ disabled: item.emplacements.length==0 }">-</b-btn>
      </b-button-group>
    </div>
    <div slot="footer">
      <small>Nombre bouteilles = {{ item.emplacements.length }}
        <span v-for="emp in item.emplacements" :item="emp">[{{ emp.rangee }};{{emp.colonne}}] </span></small>
    </div>
  </b-card>
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
      if (this.item.emplacements.length > 0) {
        this.$emit('eventSupprimerEmplacement', this.item)
      }
    }
  }
}
</script>
