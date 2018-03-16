<template>
  <div class="listeVins container">
    <b-alert variant="danger" dismissible :show="showAlerte">Erreur lors de la mise a jour : {{msgAlerte}}</b-alert>
    <b-list-group>
      <cardVin
        v-for="item in listeFiltree" :key="item._id" :item="item"
        v-on:eventAjouterEmplacement="showModalAjouterEmpl"
        v-on:eventSupprimerEmplacement="showModalSupprEmpl">
      </cardVin>
    </b-list-group>

      Nb = {{ listeFiltree.length }}

      <modalAjoutEmplacement v-bind:item="current" v-on:okModale="validerAjoutEmplacement"/>
      <modalSupprimerEmplacement v-bind:item="current" v-on:okModale="validerSupprimerEmplacement"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import cardVin from '@/components/CardVin'
import modalAjoutEmplacement from '@/views/ModalAjoutEmplacement'
import modalSupprimerEmplacement from '@/views/ModalSupprimerEmplacement'

export default {
  name: 'listeVins',
  components: {
    cardVin,
    modalAjoutEmplacement,
    modalSupprimerEmplacement
  },
  data () {
    return {
      current: null,
      showAlerte: false,
      msgAlerte: ''
    }
  },
  computed: mapGetters(['listeFiltree']),
  methods: {
    ...mapActions(['ajouterEmplacement', 'supprimerEmplacement']),
    showModalAjouterEmpl (item) {
      this.current = item
      this.$root.$emit('show::modal', 'modalAjoutEmpl')
    },
    showModalSupprEmpl (item) {
      this.current = item
      this.$root.$emit('show::modal', 'modalSupprEmpl')
    },
    validerAjoutEmplacement (emplacement) {
      this.ajouterEmplacement({vin: this.current, emplacement}).then((result) => {
        this.$root.$emit('show::hide', 'modalAjoutEmpl')
      }).catch(err => {
        this.msgAlerte = err.statusText
        this.showAlerte = true
      })
    },
    validerSupprimerEmplacement (emplacement) {
      this.supprimerEmplacement({vin: this.current, emplacement}).then((result) => {
        this.$root.$emit('show::hide', 'modalSupprEmpl')
      }).catch(err => {
        this.msgAlerte = err.statusText
        this.showAlerte = true
      })
    }
  }
}
</script>
