import express from 'express'

const router = express.Router()

import User from '../../entities/User'

router.post('/delete-user', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { spotifyId } = body
    try {
        const user = await User.findOne({ where: { spotifyId } })
        
        if (user) {
            user.remove()
            // user.save()
            // console.log(user)
            res.json({ success: true }).status(200)
        } else {
            res.json({ success: false, error: 'User not found' }).status(200)
        }
    } catch (e) {
        // console.log(e)
        res.json({ error: e }).status(400)
    }
})

module.exports = router