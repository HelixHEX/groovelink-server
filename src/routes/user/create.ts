import express from 'express'
import { StreamChat } from 'stream-chat'

const router = express.Router()

import User from '../../entities/User'

const serverClient = StreamChat.getInstance(process.env.GET_STREAM_KEY, process.env.GET_STREAM_SECRET)
router.post('/create', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { spotifyId, fName, lName, age, email, picture, city, state } = body;

    try {
        const user = await User.findOne({ where: { spotifyId } })
        if (!user) {
            await User.create({
                spotifyId,
                name: `${fName} ${lName}`,
                email,
                age,
                picture,
                city,
                state,
            }).save()
            const newUser = await User.findOne({ where: { spotifyId } })
            if (newUser) {
                await serverClient.upsertUser({
                    id: newUser.uuid,
                    spotifyId: newUser.spotifyId,
                    name: `${fName} ${lName}`,
                    email,
                    picture,
                });
                res.json({ success: true }).status(200)
            } else {
                res.json({success: false, error: 'User not created'}).status(400)
            }
        } else {
            res.json({ success: false, error: 'User exists' }).status(204)
        }
    } catch (e) {
        console.log(e)
        // if (errStr.includes("Cannot read property 'push' of undefined")) res.json({success: true}).status(200)
        res.json({ success: false, error: 'An error has occurred' }).status(400)
    }
})

module.exports = router