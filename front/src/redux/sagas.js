import { all } from 'redux-saga/effects'

import home from '../containers/Home/saga'

export default function* rootSaga() {
  yield all([
    home(),
  ])
}