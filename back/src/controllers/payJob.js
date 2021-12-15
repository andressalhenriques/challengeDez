const { Op } = require('sequelize')
const {sequelize } = require('../model')

module.exports = async ({ Job, Profile, jobId }) => {
	try {
    const job = await Job.findOne({ 
      where: {
        id: jobId,
        paid: {[Op.eq]: null}
      },
      include: [
        { attributes: ['ContractorId', 'ClientId'], association: 'Contract',
          include: [
            {attributes: ['balance', 'id'], association: 'Contractor', where: {type: ['contractor']}}
          ]
        },
      ],
      })
      if(!job) return 'Job not found or already paid!'
  
      if(job) {
        const { ClientId } = job.Contract
        const {balance: balanceClient, id: ContractId} = job.Contract.Contractor

        if(balanceClient >= job.price) {
            sequelize.transaction(async transaction => {
              const updateContractor = await Profile.increment(
                { balance: job.price},
                { where: {id: ContractId} },
                { transaction: transaction }
              )
  
              const updateJob = await Job.update(
                { paid: true, paymentDate: new Date()},
                {where: {id: jobId}}
              )
  
              const updateClient = await Profile.decrement(
                { balance: job.price},
                {where: {id: ClientId}},
                { transaction: transaction }
              )
            })
            return 'Job paid!'
        } return 'Balance is not enough.'
      }
    } catch (error) {
      throw(error)
    }
}