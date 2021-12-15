import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import rootSaga from './sagas'

const history = createBrowserHistory({ forceRefresh: true })
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const routeMiddleware = routerMiddleware(history)

const middlewares = [thunk, sagaMiddleware, routeMiddleware]

const store = createStore(
  combineReducers({
    ...reducers,
    router: connectRouter(history),
  }),
  composeEnhancers(applyMiddleware(...middlewares)),
)
sagaMiddleware.run(rootSaga)

export default store