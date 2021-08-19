export function createStore(reducer, enhance) {
  let state = {}

  if (typeof enhance === "function") {
    return enhance(createStore)(reducer)
  }

  function getState() {
    return state
  }

  function dispatch(action) {
    console.log("dispatch is call and action is ", action)
    try {
      state = reducer(state, action)
    } catch (error) {
      console.log("dispatch error = ", error)
    }
    return action
  }

  dispatch({ type: "@type/init" })
  return {
    getState,
    dispatch,
  }
}