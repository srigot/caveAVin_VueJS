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
  name: 'modalSupprimerEmplacement',
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
      if (this.item !== null) {
        this.options = this.item.emplacements.map(it => { return { text: it.rangee + ';' + it.colonne, value: it } })
      } else {
        this.options = []
      }
      this.selected = null
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
