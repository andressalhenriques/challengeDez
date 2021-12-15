const { Op } = require('sequelize')

module.exports = async ({ Job, startDate, endDate, limit }) => {
	try {
    const bestClient = await Job.findAll({
			attributes: ['ContractId', 'price'],
			where: { 
				createdAt: {
					[Op.between]: [startDate, endDate]
				}
			},
			order: [['price', 'DESC']],
			include: [
				{ association: 'Contract', where: {status: ['in_progress']}, 
					include: [
						{association: 'Client', where: {type: ['client']}},
					]
				},
			],
			limit: limit,
		})
    return bestClient
    } catch (error) {
      throw(error)
    }
}