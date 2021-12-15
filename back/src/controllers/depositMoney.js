const { Op } = require('sequelize')

module.exports = async ({ Job, Profile, userId, depositValue }) => {
	try {
    const amountToPay = await Job.findAll({ 
      attributes: [[Job.sequelize.fn('sum', Job.sequelize.col('price')), 'total']],
        where: {
          paid: {[Op.eq]: null}
        },                                                 
        include: [
          { attributes: [], association: 'Contract', where: {ClientId: userId} },
        ],
        raw: true,
    })
    if(amountToPay[0].total === null) return res.json('There are no jobs to be paid')
    
    if(depositValue < amountToPay[0].total + (0.25 * amountToPay[0].total))  {
      await Profile.increment(
        { balance: depositValue },                                              
        { where: { id: userId } },
      )
      return 'Deposit success!'
    } return 'Deposit value is more than 25% of jobs to pay!'      
    } catch (error) {
      throw(error)
    }
}