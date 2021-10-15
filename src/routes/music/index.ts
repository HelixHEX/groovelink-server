import express from "express";

const update = require('./update')
const deleteP = require('./delete')
const create = require('./create')
const get = require('./get')

const router = express.Router();

// router.use(update)
// router.use(deleteP)
// router.use(create)
router.use(get)

module.exports = router;
