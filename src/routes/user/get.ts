import express from 'express'
import { Not } from 'typeorm';

const router = express.Router()

import User from '../../entities/User'
// import checkAccess from '../../utils/middleware'
router.post('/friends', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { spotifyId } = body;
    try {
        const user = await User.findOne({ where: { spotifyId }, relations: ['following', 'followers'] })
        if (user) {
            let friends = [] as any
            user.followers.map(follower => {
                let exists = user.following.find(following => following.uuid === follower.uuid)
                if (exists) friends.push(follower)
            })
            console.log(friends.length)
            res.json({ success: true, friends }).status(200)
        } else {
            res.json({ success: false, error: 'User not found', type: 'newAccount' }).status(404)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, error: 'An error has occurred' }).status(400)
    }
})

router.post('/me', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { spotifyId } = body;

    try {
        const user = await User.findOne({ where: { spotifyId } });
        if (user) {
            res.json({ success: true, user }).status(200)
        } else {
            res.json({ success: false, error: 'User not found' }).status(404)
        }
    } catch (e) {
        console.log(e)
        res.json({success: false, error: "An error has occurred"}).status(200)
    }
})

router.post('/check-account', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { spotifyId } = body
    try {
        const user = await User.findOne({ where: { spotifyId } })
        console.log(spotifyId)
        if (user) {
            res.json({ success: true }).status(200)
        } else {
            res.json({ success: false, error: 'Create account' }).status(200)
        }
    } catch (e) {
        console.log(e)
        res.json({ error: e }).status(400)
    }
})

router.post('/discover', async (req, res) => {
    const { body } = req;
    const { spotifyId, offset } = body;
    try {
        const user = await User.findOne({ where: { spotifyId }, relations: ['following', 'followers', 'hasSkipped', 'beenSkippedBy'] })
        if (user) {
            let potential = [] as any
            const users = await User.find({take: 5, skip: offset})
            users.forEach(newUser => {
                if (newUser.spotifyId !== spotifyId && !user.following.find(following => following.spotifyId === newUser.spotifyId) && !user.hasSkipped.find(sUser => sUser.spotifyId === newUser.spotifyId) && !user.beenSkippedBy.find(bUser => bUser.spotifyId === newUser.spotifyId)) {
                    potential.push(newUser)
                }
            })
            res.json({success: true, potential }).status(200)
        } else {
            res.json({ success: false, error: 'User not found' }).status(400)
        }
    } catch (e) {
        console.log(e)
        res.json({success: false, error: 'An error has occurred'}).status(400)
     }
})

router.post('/all-users', async (req, res) => {
    try {
        const users = await User.find()
        res.json({success: true, users}).status(200)
    } catch(e) {
        console.log(e)
        res.json({success: false, error: "An error has occurred"}).status(200)
    }
})

module.exports = router