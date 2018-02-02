import backend from '../api/backend'
import * as types from './mutations_types'

export default {
  initListe ({commit}) {
    return new Promise((resolve, reject) => {
      backend.getListe().then(liste => {
        commit(types.INIT_LISTE, liste)
        resolve()
      }, err => {
        reject(err)
      })
    })
  },
  supprimerVin ({commit}, vin) {
    return new Promise((resolve, reject) => {
      backend.deleteVin(vin).then(result => {
        commit(types.SUPPRIMER_VIN, vin)
        resolve()
      }, err => {
        reject(err)
      })
    })
  },
  ajouterVin ({commit}, vin) {
    return new Promise((resolve, reject) => {
      backend.addVin(vin).then(result => {
        commit(types.AJOUTER_VIN, result)
        resolve()
      }, err => {
        reject(err)
      })
    })
  },
  updateVin ({commit}, vin) {
    return new Promise((resolve, reject) => {
      backend.updateVin(vin).then(result => {
        commit(types.UPDATE_VIN, result)
        resolve()
      }, err => {
        reject(err)
      })
    })
  },
  toogleFiltreAll ({commit}) {
    commit(types.TOOGLE_FILTREALL)
  },
  ajouterEmplacement ({commit}, {vin, emplacement}) {
    return new Promise((resolve, reject) => {
      backend.addEmplacement(vin, emplacement).then(result => {
        // TODO Gerer le null pointeur
        commit(types.UPDATE_VIN, result.body.vin)
        resolve()
      }, err => {
        // TODO A GERER
        reject(err)
      })
    })
  },
  supprimerEmplacement ({commit}, {vin, emplacement}) {
    return new Promise((resolve, reject) => {
      backend.deleteEmplacement(vin, emplacement).then(result => {
        commit(types.UPDATE_VIN, result.body.vin)
        resolve()
      }, err => {
        // TODO A GERER
        reject(err)
      })
    })
  }
}
