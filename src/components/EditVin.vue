<template>
  <div class="editVin">
    <div class="container">
      <form v-on:submit="submitForm">
        <div class="form-group">
          <b-input-group left="Nom">
            <b-form-input id="nom" v-model="vin.nom" type="text" placeholder="Nom du vin"></b-form-input>
          </b-input-group>
          <small v-if="error.nom.length > 0">{{ error.nom }}</small>
        </div>
        <div class="form-group">
          <b-input-group left="Année">
            <b-form-input id="annee" v-model="vin.annee" type="number" number placeholder="Année"></b-form-input>
          </b-input-group>
          <small v-if="error.annee.length > 0">{{ error.annee }}</small>
        </div>
        <div class="form-group">
          <b-input-group left="Estimation" right="€">
            <b-form-input id="estimation" v-model="vin.estimation" type="number" number placeholder="Estimation"></b-form-input>
            <!-- <small v-if="error.estimation.length > 0">{{ error.estimation }}</small> -->
          </b-input-group>
        </div>
        <div class="form-group">
          <b-input-group left="Note">
            <b-form-input id="note" v-model="vin.note" type="number" number placeholder="Note"></b-form-input>
            <!-- <small v-if="error.note.length > 0">{{ error.estimation }}</small> -->
          </b-input-group>
        </div>
        <div class="form-group">
          <b-input-group left="Région">
            <b-form-select id="region" :options="listeRegions" v-model="regionSelectionnee" @input="updateAppellations" placeholder="Région"></b-form-select>
            <!-- <small v-if="error.cepage.length > 0">{{ error.estimation }}</small> -->
          </b-input-group>
        </div>
        <div class="form-group">
          <b-input-group left="Cépage">
            <b-form-select id="cepage" v-model="vin.cepage" :options="listeAppellations" placeholder="Cépage"></b-form-select>
            <!-- <small v-if="error.cepage.length > 0">{{ error.estimation }}</small> -->
          </b-input-group>
        </div>
        <div class="form-group row">
          <div class="col-auto">
            <b-input-group left="Boire entre">
              <b-form-input id="debutBoire" v-model="vin.debutBoire" type="number" number placeholder="Année"></b-form-input>
            </b-input-group>
          </div>
          <div class="col-auto">
            <b-input-group left="et">
              <b-form-input id="finBoire" v-model="vin.finBoire" type="number" number placeholder="Année"></b-form-input>
              <!-- <small v-if="error.cepage.length > 0">{{ error.estimation }}</small> -->
            </b-input-group>
          </div>
        </div>
        <b-button type="submit" variant="primary">Valider</b-button>
        <b-button variant="secondary" href="/">Annuler</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import liste from '@/ref/cepage.json'

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
      },
      listeRegions: liste.map(elem => elem.region),
      listeAppellations: [],
      regionSelectionnee: null
    }
  },
  watch: {
    'vin.nom': function (val) {
      if (val.length > 0) {
        this.error.nom = ''
        return true
      } else {
        this.error.nom = 'Le champ nom est obligatoire'
        return false
      }
    },
    'vin.annee': function (val) {
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
      this.$router.push('/')
    },
    submitForm: function (event) {
      event.preventDefault()
      var v = this.vin
      this.ajouterVin(v).then(this.okAjout, err => {
        console.log(err)
      })
    },
    updateAppellations: function () {
      var l = liste.filter(elem => this.regionSelectionnee === elem.region)
      if (l.length > 0) {
        this.listeAppellations = l[0].appellation
      } else {
        this.listeAppellations = []
      }
    }
  }
}
</script>
