import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducer from './redux/reducers'
import { Map as map } from 'immutable'

export const makeStore = () => {
  return createStore(
    reducer,
    map({}),
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}