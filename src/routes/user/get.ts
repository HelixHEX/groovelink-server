import express from 'express'

const router = express.Router()

import User from '../../entities/User'
// import checkAccess from '../../utils/middleware'
router.post('/friends', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { spotifyId } = body;
    try {
        const user = await User.findOne({ where: { spotifyId }, relations: ['friends']})
        if (user) {
            // const friendsUnfiltered = user.friends.splice(0, 5);
            console.log(user)
            res.json({success: true, friends: user.friends}).status(200)
        } else {
            res.json({ success: false, error: 'User not found', type: 'newAccount' }).status(404)
        }
    } catch(e) {
        console.log(e)
        res.json({success: false, error: 'An error has occurred'}).status(400)
    }
})

router.post('/me', async (req: express.Request, res: express.Response) => {
    const {body} = req;
    const {spotifyId} = body;

    try {
        const user = await User.findOne({where: {spotifyId}});
        if (user) {
            res.json({ success: true, user }).status(200)
        } else {
            res.json({ success: false, error: 'User not found' }).status(404)
        }
    } catch(e) {

    }
})

router.post('/check-account', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { spotifyId } = body
    try {
        const user = await User.findOne({ where: { spotifyId } })
        console.log(spotifyId)
        if (user) {
            console.log({ user })
            res.json({ success: true }).status(200)
        } else {
            res.json({ success: false, error: 'Create account' }).status(200)
        }
    } catch (e) {
        console.log(e)
        res.json({ error: e }).status(400)
    }
})


module.exports = router