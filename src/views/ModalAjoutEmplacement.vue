<template>
  <div class="modalAjoutEmplacement">
    <b-modal id="modalAjoutEmpl" title="Ajouter un emplacement" @ok="submit" @shown="clear">
      <label>Vin : {{ getNom }}</label>
      <form @submit.stop.prevent="submit">
        <b-input-group left="Rangée">
          <b-form-input type="text" maxlength="2" v-model="rangee" />
        </b-input-group>
        <b-input-group left="Colonne">
          <b-form-input type="text" number maxlength="2" v-model="colonne" />
        </b-input-group>
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
      rangee: '',
      colonne: ''
    }
  },
  computed: {
    getNom () {
      return (this.item != null) ? this.item.nom : ''
    }
  },
  methods: {
    clear () {
      this.rangee = ''
      this.colonne = ''
    },
    submit (e) {
      if (!this.rangee) {
        alert('Saisir une rangée')
        return e.cancel()
      }
      if (!this.colonne) {
        alert('Saisir une colonne')
        return e.cancel()
      }
      this.$emit('okModale', {rangee: this.rangee, colonne: this.colonne})
    }
  }
}
</script>
