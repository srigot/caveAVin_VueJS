<template>
  <div class="listeVins container">
    <cardVin
      v-for="item in listeFiltree" :key="item._id" :item="item"
      v-on:eventAjouterEmplacement="showModalAjouterEmpl"
      v-on:eventSupprimerEmplacement="showModalSupprEmpl">
    </cardVin>

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
      current: null
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
      })
    },
    validerSupprimerEmplacement (emplacement) {
      this.supprimerEmplacement({vin: this.current, emplacement}).then((result) => {
        this.$root.$emit('show::hide', 'modalSupprEmpl')
      })
    }
  }
}
</script>
