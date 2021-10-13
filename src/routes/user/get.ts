import express from 'express'

const router = express.Router()

import User from '../../entities/User'
// import checkAccess from '../../utils/middleware'
router.post('/friends', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { spotifyId, accessToken } = body;
    try {
        const user = await User.findOne({ where: { spotifyId }, relations: ['friends']})
        if (user) {
            // const friendsUnfiltered = user.friends.splice(0, 5);
            res.json({success: true, friends: user.friends}).status(200)
        } else {
            res.json({ success: false, error: 'User not found' }).status(404)
        }
    } catch(e) {
        console.log(e)
        res.json({success: false, error: 'An error has occurred'}).status(400)
    }
})

// router.post('/me', checkAccess(), )

module.exports = router