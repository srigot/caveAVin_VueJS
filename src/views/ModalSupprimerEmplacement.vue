<template>
  <div class="modalSupprimerEmplacement">
    <b-modal id="modalSupprEmpl" title="Supprimer un emplacement" @ok="submit" @shown="init">
      <label>Vin : {{ getNom }}</label>
      <form @submit.stop.prevent="submit">
        <b-form-select type="text" v-model="selected" :options="options"/>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'modalAjoutEmplacement',
  props: [ 'item' ],
  data () {
    return {
      selected: null,
      options: []
    }
  },
  computed: {
    getNom () {
      return (this.item != null) ? this.item.nom : ''
    }
  },
  methods: {
    init () {
      this.options = this.item.emplacements.map(it => { return { text: it.rangee + ';' + it.colonne, value: it } })
      if (this.options.length > 0) {
        this.selected = this.options.value
      }
    },
    submit (e) {
      if (!this.selected) {
        alert('Saisir un emplacement')
        return e.cancel()
      }
      this.$emit('okModale', this.selected)
    }
  }
}
</script>
