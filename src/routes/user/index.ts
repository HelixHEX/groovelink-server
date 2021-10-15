import express from "express";

const update = require('./update')
const deleteM = require('./delete')
const create = require('./create')
const get = require('./get')

const router = express.Router();

router.use(update)
router.use(deleteM)
router.use(create)
router.use(get)

module.exports = router;
