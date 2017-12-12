export default {
  listeFiltree: state => {
    return state.items.filter(item => (state.filterAll || (item.emplacements !== undefined && item.emplacements.length > 0)))
  }
}
