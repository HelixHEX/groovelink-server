import express from 'express'

const router = express.Router()

import User from '../../entities/User'

router.post('/check-account', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { spotifyId, name, picture, email } = body
    try {
        const user = await User.findOne({ where: { spotifyId } })
        if (user) {
            console.log({ user })
            res.json({ success: true }).status(200)
        } else {
            await User.create({
                name,
                spotifyId,
                picture,
                email
            }).save()
            res.json({ success: true }).status(200)
        }
    } catch (e) {
        console.log(e)
        res.json({ error: e }).status(400)
    }
})

module.exports = router