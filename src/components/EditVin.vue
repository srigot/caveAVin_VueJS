<template>
  <div class="editVin">
    <div class="container">
      <form v-on:submit="submitForm">
        <b-input-group left="Nom">
          <b-form-input id="nom" v-model="vin.nom" type="text" placeholder="Nom du vin" :state="this.vin.nom.length>0?'success':'error'"></b-form-input>
          <small v-if="error.nom.length > 0">{{ error.nom }}</small>
        </b-input-group>
        <b-input-group left="Année">
          <b-form-input id="annee" v-model="vin.annee" type="number" number placeholder="Année"></b-form-input>
          <small v-if="error.annee.length > 0">{{ error.annee }}</small>
        </b-input-group>
        <div class="form-group">
          <label for="estimation">Estimation</label>
          <b-form-input id="estimation" v-model="vin.estimation" type="number" number placeholder="Estimation (€)"></b-form-input>
          <!-- <small v-if="error.estimation.length > 0">{{ error.estimation }}</small> -->
        </div>
        <div class="form-group">
          <label for="note">Note</label>
          <b-form-input id="note" v-model="vin.note" type="number" number placeholder="Note"></b-form-input>
          <!-- <small v-if="error.note.length > 0">{{ error.estimation }}</small> -->
        </div>
        <div class="form-group">
          <label for="cepage">Cepage</label>
          <b-form-input id="cepage" v-model="vin.cepage" type="text" placeholder="Cépage"></b-form-input>
          <!-- <small v-if="error.cepage.length > 0">{{ error.estimation }}</small> -->
        </div>
        <div class="form-group">
          <label for="debutBoire">Boire entre </label>
          <b-form-input id="debutBoire" v-model="vin.debutBoire" type="number" number placeholder="Année"></b-form-input>
          <b-form-input id="finBoire" v-model="vin.finBoire" type="number" number placeholder="Année"></b-form-input>
          <!-- <small v-if="error.cepage.length > 0">{{ error.estimation }}</small> -->
        </div>
        <b-button type="submit" variant="primary">Valider</b-button>
        <b-button variant="secondary" href="/">Annuler</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'editVin',
  data () {
    return {
      vin: {
        nom: '',
        annee: (new Date()).getFullYear(),
        estimation: '',
        note: '',
        cepage: '',
        taille: '',
        debutBoire: '',
        finBoire: '',
        commentaires: '',
        degre: '',
        couleur: '',
        debutTemp: '',
        finTemp: '',
        categorie: '',
        appellation: '',
        emplacements: []
      },
      error: {
        nom: '',
        annee: ''
      }
    }
  },
  watch: {
    nom: function (val) {
      if (val.length > 0) {
        this.error.nom = ''
        return true
      } else {
        this.error.nom = 'Le champ nom est obligatoire'
        return false
      }
    },
    annee: function (val) {
      if (val > 1900 && val < 3000) {
        this.error.annee = ''
        return true
      } else {
        this.error.annee = 'Veuillez saisir une année correcte'
        return false
      }
    }
  },
  methods: {
    ...mapActions(['ajouterVin']),
    okAjout () {
      this.$router.push('/v')
    },
    submitForm: function (event) {
      event.preventDefault()
      var v = this.vin
      this.ajouterVin(v).then(function () {
        this.okAjout()
      }, err => {
        console.log(err)
      })
    }
  }
}
</script>
