export default {
  listeFiltree: state => {
    return state.items.filter(item => (state.filterAll || (item.emplacement !== undefined && item.emplacement.length > 0)))
  }
}
