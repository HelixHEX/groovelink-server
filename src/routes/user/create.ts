import express from 'express'

const router = express.Router()

import User from '../../entities/User'

router.post('/create', async(req:express.Request, res:express.Response) => {
    const {body} = req;
    const {spotifyId, fName, lName, age, email, picture, city, state} = body;

    try {
        const user = await User.findOne({where: {spotifyId}})
        if (!user) {
            let elias = await User.findOne({where: {spotifyId: 'eliwam21'}, relations: ['following', 'followers']});
            if (elias) {
                const newUser = await User.create({
                    spotifyId,
                    name: `${fName} ${lName}`,
                    email,
                    age,
                    picture,
                    city,
                    state,
                    followers: [elias],
                    following: [elias],
                }).save()
                if (newUser) {
                    elias.following.push(newUser)
                    elias.followers.push(newUser)
                }
                elias.save()
            }
            res.json({success: true}).status(200)
        } else {
            res.json({success: false, error: 'User exists'}).status(204)
        }
    } catch(e) {
        console.log(e)
        const errStr = e.toString()
        // if (errStr.includes("Cannot read property 'push' of undefined")) res.json({success: true}).status(200)
        res.json({success: false, error: 'An error has occurred'}).status(400)
    }
})

router.post('/add-friend', async (req, res) => {
    const {body} = req;
    const {spotifyId, userId} = body;
    try {
        const user = await User.findOne({where: {spotifyId}, relations: ['following']})
        if (user) {
            const otherUser = await User.findOne({where: {spotifyId: userId}})
            if (otherUser) {
                user.following.push(otherUser)
            } else {
                res.json({success: false, error: "Other user not found"}).status(404)
            }
        } else {
            res.json({success: false, error: 'User not found'}).status(404)
        }
    } catch(e) {
        console.log(e)
        res.json({success: false, error: 'An error has occurred'}).status(400)
    }
})
module.exports = router