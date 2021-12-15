const { Op } = require('sequelize')
const { maxBy } = require('lodash')



module.exports = async ({ Job, startDate, endDate }) => {

	try {
    const profession = await Job.findAll({
			attributes: ['ContractId', 
				[Job.sequelize.fn('sum', Job.sequelize.col('price')), 'total'],
			],
			where: { 
				paid: true,
				createdAt: {
					[Op.between]: [startDate, endDate]
				}
			},
      include: [
        { association: 'Contract', where: {status: ['in_progress']}, 
          include: [
            {association: 'Client', where: {type: ['client']}},
            {association: 'Contractor', where: {type: ['contractor']}}
          ]
        },
      ],
			raw: true,
			group: ['ContractId'],
		})
        
		const bestProfession = maxBy(profession, function(o) { return o.total })
    return bestProfession
    } catch (error) {
      throw(error)
    }
}