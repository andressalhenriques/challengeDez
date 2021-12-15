module.exports = async ({
  Contract,
  profileId,
  id
}) => {
  try {
		const contract = await Contract.findOne({
			where: {
				id: id,
				ClientId: profileId
			}
		})
		return contract
	} catch (error) {
		throw(error)
	}
}