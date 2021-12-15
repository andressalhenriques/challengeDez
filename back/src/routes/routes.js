const express = require('express')
const { Op } = require('sequelize')
const {getProfile} = require('../middleware/getProfile')
const getAllContracts = require('../controllers/getAllContracts')
const getContractsById = require('../controllers/getContractsById')
const getUnpaidJobs = require('../controllers/getUnpaidJobs')
const payJob = require('../controllers/payJob')
const depositMoney = require('../controllers/depositMoney')
const getBestProfession = require('../controllers/getBestProfession')
const getBestClients = require('../controllers/getBestClients')

const router = express.Router()

router.get('/contracts/:id', getProfile ,async (req, res) =>{
	const { Contract } = req.app.get('models')

	const id  = req.params.id
	const profileId = req.profile.dataValues.id

	const contract = await getContractsById({Contract, id, profileId})
	res.json(contract)
})

router.get('/contracts', getProfile, async (req, res) =>{
	const { Contract } = req.app.get('models')
	const profileId = req.profile.dataValues.id

	try {
		const contract = await getAllContracts({Contract, profileId})
		return res.status(200).json(contract)
	} catch (error) {
		return res.status(500).json(error.message)
	}
})

router.get('/jobs/unpaid', async (req, res) =>{
	const {  Job } = req.app.get('models')

	try {
		const jobs = await getUnpaidJobs({ Job })
		return res.status(200).json(jobs)
	} catch (error) {
		return res.status(500).json(error.message)
	}

})

router.post('/jobs/:job_id/pay', async (req, res) =>{

	const { Job, Profile } = req.app.get('models')
	const jobId  = req.params.job_id

	try {
		const job = await payJob({ Job, Profile, jobId })
		return res.status(200).json(job)
	} catch (error) {
		return res.status(500).json(error.message)
	}
})

router.post('/balances/deposit/:userId', async (req, res) =>{
	const { Job, Profile } = req.app.get('models')
	const userId  = req.params.userId
	const depositValue = req.get('depositValue')

	try {
		const deposit = await depositMoney({ Job, Profile, userId, depositValue })
		return res.status(200).json(deposit)
	} catch (error) {
		return res.status(500).json(error.message)
	}
})

router.get('/admin/best-profession', async (req, res) =>{
	const startDate = req.query.start
	const endDate = req.query.end
	const { Job } = req.app.get('models')

	try {
		const bestProfession = await getBestProfession({ Job, startDate, endDate })
		return res.status(200).json(bestProfession)
	} catch (error) {
		return res.status(500).json(error.message)
	}
})

router.get('/admin/best-clients', async (req, res) =>{
	const startDate = req.query.start
	const endDate = req.query.end
	const limit = req.query.limit

	const { Job } = req.app.get('models')

	try {
		const clients = await getBestClients({ Job, startDate, endDate, limit })
		return res.status(200).json(clients)
	} catch (error) {
		return res.status(500).json(error.message)
	}
})

module.exports = router