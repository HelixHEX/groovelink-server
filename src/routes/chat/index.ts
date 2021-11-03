import express from 'express'
import User from '../../entities/User';
import { StreamChat } from 'stream-chat';

const router = express.Router()

const serverClient = new StreamChat(process.env.GET_STREAM_KEY, process.env.GET_STREAM_SECRET)

router.post('/chat-token', async (req, res) => {
    const { body } = req;
    const { id } = body;
    try {
        const token = serverClient.createToken(id)
        if (token) {
            res.json({ success: true, token }).status(200)
        } else {
            res.json({ success: false, error: 'Unable to create token' }).status(400)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, error: 'An error has occurred' }).status(400)
    }
})

router.post('/import-users', async (req, res) => {
    try {
        let users = await User.find()
        let members = [] as any
        for (var i = 0; i < users.length; i++) {
            members.push({
                id: users[i].uuid,
                name: users[i].name,
                picture: users[i].picture,
                email: users[i].email,
                spotifyId: users[i].spotifyId
            })
        }
        await serverClient.upsertUsers(members)
        res.json({ success: true, message: 'Users created' }).status(200)
    } catch (e) {
        console.log(e)
        res.json({ success: false, error: 'An error has occurred' }).status(400)
    }
})

router.post('/import-channels', async (req, res) => {
    try {
        let users = await User.find({ relations: ['following', 'followers'] })
        // console.log(users)
        for (var i = 0; i < users.length; i++) {
            const user = users[i]
            let friends = [] as any
            // const channel = serverClient.channel('messaging')
            // await channel.create()
            // await channel.addMembers([])
            if (user.following.length > 0) {
                user.followers.map(follower => {
                    let exists = user.following.find(following => following.uuid === follower.uuid)
                    if (exists) friends.push(follower)
                })
            }
            if (friends.length > 0) {
                for (var j=0; j<friends.length; j++) {
                    const channel = serverClient.channel('messaging', {
                        members: [friends[j].uuid, user.uuid],
                        created_by_id: 'helixhex'
                    })
                    await channel.create()
                }
            }
        }
        res.json({success: true, message: 'Channels imported'}).status(200)
    } catch (e) {
        console.log(e)
        res.json({ success: false, error: 'An error has occurred' }).status(400)
    }
})

module.exports = router