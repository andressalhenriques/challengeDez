import {
  GET_CONTRACTS_BY_ID_REQUESTING,
  GET_ALL_CONTRACTS_REQUESTING, 
  GET_UNPAID_JOBS_REQUESTING,
  PAY_JOB_REQUESTING,
  DEPOSIT_MONEY_REQUESTING,
  GET_BEST_PROFESSION_REQUESTING,
  GET_BEST_CLIENTS_REQUESTING,
} from './constants'

export function getContractsByIdRequest(payload) {
  return {
    type: GET_CONTRACTS_BY_ID_REQUESTING,
    payload,
  }
}

export function getAllContractsRequest(payload) {
  return {
    type: GET_ALL_CONTRACTS_REQUESTING,
    payload,
  }
}

export function getUnpaidJobsRequest(payload) {
  return {
    type: GET_UNPAID_JOBS_REQUESTING,
    payload,
  }
}

export function payJobRequest(payload) {
  return {
    type: PAY_JOB_REQUESTING,
    payload,
  }
}

export function depositMoneyRequest(payload) {
  return {
    type: DEPOSIT_MONEY_REQUESTING,
    payload,
  }
}

export function getBestProfessionRequest(payload) {
  return {
    type: GET_BEST_PROFESSION_REQUESTING,
    payload,
  }
}

export function getBestClientsRequest(payload) {
  return {
    type: GET_BEST_CLIENTS_REQUESTING,
    payload,
  }
}

