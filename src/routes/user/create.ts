import express from 'express'

const router = express.Router()

import User from '../../entities/User'

router.post('/create', async(req:express.Request, res:express.Response) => {
    const {body} = req;
    const {spotifyId, fName, lName, age, email, picture, city, state} = body;

    try {
        const user = await User.findOne({where: {spotifyId}})
        if (!user) {
            await User.create({
                spotifyId,
                name: `${fName} ${lName}`,
                email,
                age,
                picture,
                city,
                state
            }).save()
            res.json({success: true}).status(200)
        } else {
            res.json({success: false, error: 'User exists'}).status(204)
        }
    } catch(e) {
        console.log(e)
        res.json({success: false, error: 'An error has occurred'}).status(200)
    }
})
module.exports = router