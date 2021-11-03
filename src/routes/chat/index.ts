import express from 'express'
import User from '../../entities/User';
import { StreamChat } from 'stream-chat';

const router = express.Router()

const serverClient = StreamChat.getInstance(process.env.GET_STREAM_KEY, process.env.GET_STREAM_SECRET)

router.post('/chat-token', async (req, res) => {
    const {body} = req;
    const { id } = body;
    try {
        const token = serverClient.createToken(id)
        if (token) {
            res.json({success: true, token}).status(200)
        } else {
            res.json({success: false, error: 'Unable to create token'}).status(400)
        }
    } catch(e) {
        console.log(e)
        res.json({success: false, error: 'An error has occurred'}).status(400)
    }
})

router.post('/import-users', async (req, res) => {
    try  {
        let users = await User.find()
        let members = [] as any
        for (var i=0; i<users.length; i++) {
            members.push({
                id: users[i].uuid,
                name: users[i].name,
                picture: users[i].picture,
                email: users[i].email,
                spotifyId: users[i].spotifyId
            })
        }
        await serverClient.upsertUsers(members)
        res.json({success: true, message: 'Users created'}).status(200)
    } catch(e) {
        console.log(e)
        res.json({success: false, error: 'An error has occurred'}).status(400)
    }
})

module.exports = router