import {
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects'

import {
  GET_CONTRACTS_BY_ID_REQUESTING,
  GET_CONTRACTS_BY_ID_ERROR,
  GET_CONTRACTS_BY_ID_SUCCESS,
  GET_ALL_CONTRACTS_REQUESTING,
  GET_ALL_CONTRACTS_ERROR,
  GET_ALL_CONTRACTS_SUCCESS,
  GET_UNPAID_JOBS_REQUESTING,
  GET_UNPAID_JOBS_ERROR,
  GET_UNPAID_JOBS_SUCCESS,
  PAY_JOB_REQUESTING,
  PAY_JOB_ERROR,
  PAY_JOB_SUCCESS,
  DEPOSIT_MONEY_REQUESTING,
  DEPOSIT_MONEY_ERROR,
  DEPOSIT_MONEY_SUCCESS,
  GET_BEST_PROFESSION_REQUESTING,
  GET_BEST_PROFESSION_ERROR,
  GET_BEST_PROFESSION_SUCCESS,
  GET_BEST_CLIENTS_REQUESTING,
  GET_BEST_CLIENTS_ERROR,
  GET_BEST_CLIENTS_SUCCESS
} from './constants'


function* getContractsByIdFlow({ payload }) {
  try {
    const response = yield call(getContractsByIdApi, payload)
    yield put({ type: GET_CONTRACTS_BY_ID_SUCCESS, payload: response })
  } catch (error) {
    yield put({ type: GET_CONTRACTS_BY_ID_ERROR, payload: error })
  }
}

async function getContractsByIdApi({ contractId, profileId }) {
  const response = await fetch(`http://localhost:3001/contracts/${contractId}` , {
    method: "GET",
    headers: {
      'Content-type': 'application/json',
      'profile_id': profileId,
    },
    params: JSON.stringify({contractId})
  })
  .then(response => response.json())
  return response
}

function* getAllContractsFlow({ payload }) {
  try {
    const response = yield call(getAllContractsApi, payload)
    yield put({ type: GET_ALL_CONTRACTS_SUCCESS, payload: response })
  } catch (error) {
    yield put({ type: GET_ALL_CONTRACTS_ERROR, payload: error })
  }
}

async function getAllContractsApi({ contractId, profileId }) {
  const response = await fetch(`http://localhost:3001/contracts` , {
    method: "GET",
    headers: {
      'profile_id': profileId,
      'Content-Type': 'application/json',
    },
    params: JSON.stringify({contractId})
  })
  .then(response => response.json())
  return response
}

function* getUnpaidJobsFlow() {
  try {
    const response = yield call(getUnpaidJobsApi)
    yield put({ type: GET_UNPAID_JOBS_SUCCESS, payload: response })
  } catch (error) {
    yield put({ type: GET_UNPAID_JOBS_ERROR, payload: error })
  }
}

async function getUnpaidJobsApi() {
  const response = await fetch(`http://localhost:3001/jobs/unpaid` , {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  return response
}

function* payJobFlow({ payload }) {
  try {
    const response = yield call(payJobApi, payload)
    yield put({ type: PAY_JOB_SUCCESS, payload: response })
  } catch (error) {
    yield put({ type: PAY_JOB_ERROR, payload: error })
  }
}

async function payJobApi({ jobId }) {
  const response = await fetch(`http://localhost:3001/jobs/${jobId}/pay` , {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    params: {job_id: jobId}
  })
  .then(response => response.json())
  return response
}

function* depositMoneyFlow({ payload }) {
  try {
    const response = yield call(depositMoneyApi, payload)
    yield put({ type: DEPOSIT_MONEY_SUCCESS, payload: response })
  } catch (error) {
    yield put({ type: DEPOSIT_MONEY_ERROR, payload: error })
  }
}

async function depositMoneyApi({ userId, depositValue }) {
  const response = await fetch(`http://localhost:3001/balances/deposit/${userId}` , {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'depositValue': depositValue,
    },
    params: {depositValue}
  })
  .then(response => response.json())
  return response
}

function* getBestProfessionFlow({ payload }) {
  try {
    const response = yield call(getBestProfessionApi, payload)
    yield put({ type: GET_BEST_PROFESSION_SUCCESS, payload: response })
  } catch (error) {
    yield put({ type: GET_BEST_PROFESSION_ERROR, payload: error })
  }
}

async function getBestProfessionApi({ startDate, endDate }) {
  const response = await fetch(`http://localhost:3001/admin/best-profession/?start=${startDate}&end=${endDate}` , {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  return response
}

function* getBestClientsFlow({ payload }) {
  try {
    const response = yield call(getBestClientsApi, payload)

    yield put({ type: GET_BEST_CLIENTS_SUCCESS, payload: response })
  } catch (error) {
    yield put({ type: GET_BEST_CLIENTS_ERROR, payload: error })
  }
}

async function getBestClientsApi({ startDate, endDate, limit }) {
  const response = await fetch(`http://localhost:3001/admin/best-clients/?start=${startDate}&end=${endDate}&limit=${limit}` , {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  return response
}


export default function* rootSaga() {
  yield all([
    takeLatest(GET_CONTRACTS_BY_ID_REQUESTING, getContractsByIdFlow),
    takeLatest(GET_ALL_CONTRACTS_REQUESTING, getAllContractsFlow),
    takeLatest(GET_UNPAID_JOBS_REQUESTING, getUnpaidJobsFlow),
    takeLatest(PAY_JOB_REQUESTING, payJobFlow),
    takeLatest(DEPOSIT_MONEY_REQUESTING, depositMoneyFlow),
    takeLatest(GET_BEST_PROFESSION_REQUESTING, getBestProfessionFlow), 
    takeLatest(GET_BEST_CLIENTS_REQUESTING, getBestClientsFlow), 
  ])
}
