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

const initState = {
    getContractsByIdRequesting: false,
    getAllContractsRequesting: false,
    getUnpaidJobsRequesting: false,
    payJobRequesting: false,
    depositMoneyRequesting: false,
    getBestProfessionRequesting: false,
    getBestClientsRequesting: false,
    success: false,
    error: '',
    dataContracts: {},
    dataJobs: {},
    dataBestProfession: {},
    dataBestClients: {},
    data: '',
}

export default function reducer(state = initState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_CONTRACTS_BY_ID_REQUESTING:
      return {
      ...state,
      getContractsByIdRequesting: true,
      success: false,
      error: '',
      dataContracts: {},
      }
    case GET_CONTRACTS_BY_ID_SUCCESS:
        return {
        ...state,
        getContractsByIdRequesting: false,
        success: true,
        error: '',
        dataContracts: payload,
        }
    case GET_CONTRACTS_BY_ID_ERROR:
        return {
        ...state,
        getContractsByIdRequesting: false,
        success: false,
        error: payload.error,
        }
    
    case GET_ALL_CONTRACTS_REQUESTING:
      return {
      ...state,
      getAllContractsRequesting: true,
      success: false,
      error: '',
      dataContracts: {},
      }
    case GET_ALL_CONTRACTS_SUCCESS:
        return {
        ...state,
        getAllContractsRequesting: false,
        success: true,
        error: '',
        dataContracts: payload,
        }
    case GET_ALL_CONTRACTS_ERROR:
        return {
        ...state,
        getAllContractsRequesting: false,
        success: false,
        error: payload.error,
        }

    case GET_UNPAID_JOBS_REQUESTING:
      return {
      ...state,
      getUnpaidJobsRequesting: true,
      success: false,
      error: '',
      dataJobs: {},
      }
    case GET_UNPAID_JOBS_SUCCESS:
        return {
        ...state,
        getUnpaidJobsRequesting: false,
        success: true,
        error: '',
        dataJobs: payload,
        }
    case GET_UNPAID_JOBS_ERROR:
        return {
        ...state,
        getUnpaidJobsRequesting: false,
        success: false,
        error: payload.error,
        }

    case PAY_JOB_REQUESTING:
      return {
      ...state,
      payJobRequesting: true,
      success: false,
      error: '',
      data: '',
      }
    case PAY_JOB_SUCCESS:
      return {
      ...state,
      payJobRequesting: false,
      success: true,
      error: '',
      data: payload,
      }
    case PAY_JOB_ERROR:
        return {
        ...state,
        payJobRequesting: false,
        success: false,
        error: payload.error,
        }

    case DEPOSIT_MONEY_REQUESTING:
      return {
      ...state,
      depositMoneyRequesting: true,
      success: false,
      error: '',
      data: '',
      }
    case DEPOSIT_MONEY_SUCCESS:
      return {
      ...state,
      depositMoneyRequesting: false,
      success: true,
      error: '',
      data: payload,
      }
    case DEPOSIT_MONEY_ERROR:
      return {
      ...state,
      depositMoneyRequesting: false,
      success: false,
      error: payload.error,
      }

    case GET_BEST_PROFESSION_REQUESTING:
      return {
      ...state,
      getBestProfessionRequesting: true,
      success: false,
      error: '',
      dataBestProfession: '',
      }
    case GET_BEST_PROFESSION_SUCCESS:
      return {
      ...state,
      getBestProfessionRequesting: false,
      success: true,
      error: '',
      dataBestProfession: payload,
      }
    case GET_BEST_PROFESSION_ERROR:
      return {
      ...state,
      getBestProfessionRequesting: false,
      success: false,
      error: payload.error,
      }

    case GET_BEST_CLIENTS_REQUESTING:
      return {
      ...state,
      getBestClientsRequesting: true,
      success: false,
      error: '',
      dataBestClients: '',
      }
    case GET_BEST_CLIENTS_SUCCESS:
      return {
      ...state,
      getBestClientsRequesting: false,
      success: true,
      error: '',
      dataBestClients: payload,
      }
    case GET_BEST_CLIENTS_ERROR:
      return {
      ...state,
      getBestClientsRequesting: false,
      success: false,
      error: payload.error,
      }

    default:
    return state
  }
}