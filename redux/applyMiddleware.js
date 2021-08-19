const compose = (array) => {
  return array.reduce(
    (acc, cur) =>
      (...args) =>
        acc(cur(...args))
  )
}


export function applyMiddleware(middlewares) {
  return (createStore) => (reducer) => {
    let store = createStore(reducer)
    let dispatch = () => {
      throw new Error("")
    }
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    }
    const chain = middlewares.map((middleware) => middleware(middlewareAPI))
    dispatch = compose(chain)(store.dispatch)
    return { ...store, dispatch }
  }
}
