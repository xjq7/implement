export function combineReducer(reducers) {
  return (state, action) => {
    const initialState = {}
    return Object.keys(reducers).reduce((acc, cur) => {
      acc[cur] = reducers[cur](state[cur], action)
      return acc
    }, initialState)
  }
}
