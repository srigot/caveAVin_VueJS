import * as types from './mutations_types'

export default {
  [types.AJOUTER_VIN] (state, v) {
    state.items.push(v)
  },
  [types.INIT_LISTE] (state, liste) {
    state.items = liste
  },
  [types.SUPPRIMER_VIN] (state, v) {
    var lastIndex = state.items.lastIndexOf(v)
    if (lastIndex !== -1) {
      state.items.splice(lastIndex, 1)
    }
  },
  [types.TOOGLE_FILTREALL] (state) {
    state.filterAll = !state.filterAll
  },
  [types.AJOUTER_EMPLACEMENT] (state, {vin, rangee, colonne}) {
    vin.emplacement.push({rangee, colonne})
/*    // Recherche du vin
    var lastIndex = state.items.lastIndexOf(vin)
    if (lastIndex !== -1) {
      // Ajout du champ s'il n'est
      if (vin.emplacement === undefined) {
        vin = {...vin, emplacement: [{rangee, colonne}]}
        state.items[lastIndex] = vin
      } else {
        state.items[lastIndex].emplacement.push({rangee, colonne})
      }
    }
*/
  },
  [types.SUPPRIMER_EMPLACEMENT] (state, {vin, emplacement}) {
    // Recherche du vin
    var lastIndex = state.items.lastIndexOf(vin)
    if (lastIndex !== -1) {
      if (state.items[lastIndex].emplacement !== undefined) {
        var lastIndexEmplacement = state.items[lastIndex].emplacement.lastIndexOf(emplacement)
        if (lastIndexEmplacement !== -1) {
          state.items[lastIndex].emplacement.splice(lastIndexEmplacement, 1)
        }
      }
    }
  }
}
