const { Op } = require('sequelize')

module.exports = async ({ Job }) => {
	try {
    const unpaidJobs = await Job.findAll({ 
      where: {
        paid: {[Op.eq]: null}
      },
      include: [
        { association: 'Contract', where: {status: ['in_progress']}, 
          include: [
            {association: 'Client', where: {type: ['client']}},
            {association: 'Contractor', where: {type: ['contractor']}}
          ]
        },
      ],
      })
      return unpaidJobs
    } catch (error) {
      throw(error)
    }
}