import { Input } from 'antd'
import _isEmpty from 'lodash/isEmpty'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  getContractsByIdRequest,
  getAllContractsRequest,
  getUnpaidJobsRequest,
  payJobRequest,
  depositMoneyRequest,
  getBestProfessionRequest,
  getBestClientsRequest,
} from './actions'
import feedbackMessage from '../Feedback/Message'
import ListContracts from '../Contract/ListContracts'

import './home.styles.scss'

import ListUnpaidJobs from '../Jobs/ListUnpaidJobs'
import RenderDatePicker from './RenderDatePicker'
import ListBestProfession from '../ListBestProfession'
import ListBestClients from '../ListBestClients'

export class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      contractId: '',
      profileId: '',
      jobId: '',
      userId: '',
      depositValue: '',
      startDate: null, 
      endDate: null,
      endOpen: false,
      limit: 2,
    }
  }

  componentDidUpdate(prevProps) {
    const {
      getContractsByIdRequesting,
      getAllContractsRequesting,
      getUnpaidJobsRequesting,
      payJobRequesting,
      depositMoneyRequesting,
      getBestProfessionRequesting,
      getBestClientsRequesting,
      data,
      error,
      success,
    } = this.props.reducer

    
    const {
      getContractsByIdRequesting: prevGetContractsByIdRequesting,
      getAllContractsRequesting: prevGetAllContractsRequesting,
      getUnpaidJobsRequesting: prevGetUnpaidJobsRequesting,
      payJobRequesting: prevPayJobRequesting,
      depositMoneyRequesting: prevDepositMoneyRequesting,
      getBestProfessionRequesting: prevGetBestProfessionRequesting,
      getBestClientsRequesting: prevGetBestClientsRequesting,

    } = prevProps.reducer

    if (!prevGetContractsByIdRequesting && getContractsByIdRequesting && !success) {
      feedbackMessage(error)
    }

    if (!getAllContractsRequesting && prevGetAllContractsRequesting && !success) {
      feedbackMessage(error)
    }

    if (!getUnpaidJobsRequesting && prevGetUnpaidJobsRequesting && !success) {
      feedbackMessage(error)
    }

    if (!payJobRequesting && prevPayJobRequesting) {
      if(success) {
        feedbackMessage(data)
      } 
      if(error) {
        feedbackMessage(error)
      }
    }

    if (!depositMoneyRequesting && prevDepositMoneyRequesting) {
      if(success) {
        feedbackMessage(data)
      } 
      if(error) {
        feedbackMessage(error)
      }
    }

    if (!getBestProfessionRequesting && prevGetBestProfessionRequesting && !success) {
      feedbackMessage(error)
    }

    if (!getBestClientsRequesting && prevGetBestClientsRequesting && !success) {
      feedbackMessage(error)
    }
  }

  cleanInputs = () => {
    this.setState({ 
      contractId: '',
      profileId: '',
      jobId: '',
      userId: '',
      depositValue: '',
      startDate: null, 
      endDate: null,
      endOpen: false,
      limit: 2,
     })
  }

  getContractsById = () => {
    const { contractId, profileId } = this.state
    this.props.getContractsById({ contractId, profileId })
    this.cleanInputs()
  }

  getAllContracts = () => {
    const { profileId } = this.state
    this.props.getAllContracts({ profileId })
    this.cleanInputs()
  }

  depositMoney = () => {
    const { userId, depositValue } = this.state
    this.props.depositMoney({ userId, depositValue })
    this.cleanInputs()
  }

  getUnpaidJobs = () => {
    this.props.getUnpaidJobs()
    this.cleanInputs()
  }

  payJob = () => {
    const { jobId } = this.state
    this.props.payJob({ jobId })
    this.cleanInputs()
  }

  getBestProfession = () => {
    const { startDate, endDate } = this.state
    this.props.getBestProfession({ startDate: startDate.toISOString(), endDate: endDate.toISOString() })
    this.cleanInputs()
  }

  getBestClients = () => {
    const { startDate, endDate, limit } = this.state
    this.props.getBestClients({ startDate: startDate.toISOString(), endDate: endDate.toISOString(), limit })
    this.cleanInputs()
  }

  handleInputChange = (value, type) => {
    this.setState({ [type]: value })
  }

  disabledStartDate = (startDate) => {
    const endDate = this.state.endDate;
    if (!startDate || !endDate) {
      return false;
    }
    return startDate.valueOf() > endDate.valueOf();
  }

  disabledEndDate = (endDate) => {
    const startDate = this.state.startDate;
    if (!endDate || !startDate) {
      return false;
    }
    return endDate.valueOf() <= startDate.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
    
  }

  onStartChange = (value) => {
    this.onChange('startDate', value);
  }

  onEndChange = (value) => {
    this.onChange('endDate', value);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }else{
      setTimeout(()=>setTimeout(() => {
        var inputs = document.getElementsByClassName("ant-calendar-input");
        if (inputs.length > 0 && inputs[0]) {
          inputs[0].blur();
        }
      }));
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }

  render() {
    const {
      profileId,
      contractId,
      jobId,
      userId,
      depositValue,
      startDate,
      endDate,
      endOpen,
      limit,
    } = this.state
    
    const {
      dataContracts,
      dataJobs,
      dataBestProfession,
      dataBestClients,
    } = this.props.reducer
    
    return (
      <div className="container-Form">
        <div className="form-Home">
          <h2>Get contracts by Id</h2>
          <div className="formInput">
            <Input
              key={'contractId'}
              value={contractId}
              placeholder='ContractId'
              onChange={(pickedValue) => this.handleInputChange(pickedValue.target.value, 'contractId')}
            />
            <Input
              key={'profileId'}
              value={profileId}
              placeholder='ProfileId'
              onChange={(pickedValue) => this.handleInputChange(pickedValue.target.value, 'profileId')}
            />
          <button
            disabled={_isEmpty(contractId)}
            type='primary'
            onClick={() => { this.getContractsById(contractId)}}
          >
            Search
          </button>
          </div>
        </div>

        <div className="form-Home">
          <h2>Get all contracts by ProfileId</h2>
          <div className="formInput">
            <Input
              key={'profileId'}
              value={profileId}
              placeholder='ProfileId'
              onChange={(pickedValue) => this.handleInputChange(pickedValue.target.value, 'profileId')}
            />
          <button
            type='primary'
            disabled={_isEmpty(profileId)}
            onClick={() => { this.getAllContracts(contractId)}}
          >
            Search
          </button>
          </div>
        </div>

        <div className="form-Home">
          <h2>Get unpaid jobs</h2>
          <div className="formInput">
          <button
            type='primary'
            onClick={() => { this.getUnpaidJobs()}}
          >
            Search
          </button>
          </div>
        </div>

        <div className="form-Home">
          <h2>Pay a job</h2>
          <div className="formInput">
          <Input
              key={'jobId'}
              value={jobId}
              placeholder='JobId'
              onChange={(pickedValue) => this.handleInputChange(pickedValue.target.value, 'jobId')}
            />
          <button
            type='primary'
            disabled={_isEmpty(jobId)}
            onClick={() => { this.payJob()}}
          >
            Do payment
          </button>
          </div>
        </div>

        <div className="form-Home">
          <h2>Deposit Mmoney</h2>
          <div className="formInput">
          <Input
              key={'userId'}
              value={userId}
              placeholder='UserId'
              onChange={(pickedValue) => this.handleInputChange(pickedValue.target.value, 'userId')}
            />
          <Input
              key={'depositValue'}
              value={depositValue}
              placeholder='DepositValue'
              onChange={(pickedValue) => this.handleInputChange(pickedValue.target.value, 'depositValue')}
            />
          <button
            type='primary'
            disabled={_isEmpty(depositValue) || _isEmpty(userId)}
            onClick={() => { this.depositMoney()}}
          >
            Do Deposit
          </button>
          </div>
        </div>

        <div >
          <h2>Find the best profession</h2>
        <div className="formInput">
          <RenderDatePicker
            disabledStartDate={this.disabledStartDate}
            startDate={startDate}
            onStartChange={this.onStartChange}
            handleStartOpenChange={this.handleStartOpenChange}
            disabledEndDate={this.disabledEndDate}
            onEndChange={this.onEndChange}
            endDate={endDate}
            endOpen={endOpen}
            onOpenChange={this.onOpenChange}
          />
          <button
            type='primary'
            disabled={_isEmpty(startDate) || _isEmpty(endDate)}
            onClick={() => { this.getBestProfession()}}
          >
            Search
          </button>          
        </div>
        </div>

        <div >
          <h2>Find the best clients</h2>
          <div className="formInput">
            <RenderDatePicker
              disabledStartDate={this.disabledStartDate}
              startDate={startDate}
              onStartChange={this.onStartChange}
              handleStartOpenChange={this.handleStartOpenChange}
              disabledEndDate={this.disabledEndDate}
              onEndChange={this.onEndChange}
              endDate={endDate}
              endOpen={endOpen}
              onOpenChange={this.onOpenChange}
            />
            <Input
              key={'limit'}
              value={limit}
              placeholder='limit'
              onChange={(pickedValue) => this.handleInputChange(pickedValue.target.value, 'limit')}
            />
            <button
              type='primary'
              disabled={_isEmpty(startDate) || _isEmpty(endDate)}
              onClick={() => { this.getBestClients()}}
            >
              Search
            </button>            
          </div>
        </div>
  
      <div>
        {!_isEmpty(dataContracts) && <ListContracts 
          data={dataContracts} > 
        </ListContracts>}

        {!_isEmpty(dataJobs) && <ListUnpaidJobs 
          data={dataJobs} > 
        </ListUnpaidJobs>}

        {!_isEmpty(dataBestProfession) && <ListBestProfession data={dataBestProfession} /> }

        {!_isEmpty(dataBestClients) && <ListBestClients data={dataBestClients} /> }

      </div>
      </div>
    )
  }
}


const mapStateToProps = ({ home }) => ({ reducer: home })

const mapDispatchToProps = {
  getContractsById: (payload) => getContractsByIdRequest(payload),
  getAllContracts: (payload) => getAllContractsRequest(payload),
  getUnpaidJobs: (payload) => getUnpaidJobsRequest(payload),
  payJob: (payload) => payJobRequest(payload),
  depositMoney: (payload) => depositMoneyRequest(payload),
  getBestProfession: (payload) => getBestProfessionRequest(payload),
  getBestClients: (payload) => getBestClientsRequest(payload),

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
