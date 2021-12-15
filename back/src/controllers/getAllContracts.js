module.exports = async ({
  Contract,
  profileId,
}) => {
  try {
		const contract = await Contract.findAll({ 
			where : {
				status: ['new','in_progress'],
				ClientId: profileId,
			}
		})
		return contract
	} catch (error) {
		throw(error)
	}
}