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
  [types.UPDATE_VIN] (state, v) {
    var index = state.items.findIndex(item => {
      return (item._id === v._id)
    })
    state.items.splice(index, 1, v)
  },
  [types.TOOGLE_FILTREALL] (state) {
    state.filterAll = !state.filterAll
  }
}
