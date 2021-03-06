import express from 'express'

const router = express.Router()

import User from '../../entities/User'

// router.post('/add-friend', async (req: express.Request, res: express.Response) => {
//     const { body } = req;
//     const { spotifyId, otheruserId } = body
//     try {
//         const user = await User.findOne({ where: { spotifyId }, relations: ['friends'] })
//         if (user) {
//             const friendUser = await User.findOne({ where: { spotifyId: otheruserId }, relations: ['friends'] })
//             if (friendUser) {
//                 user.friends.push(friendUser)
//                 user.save()
//                 friendUser.friends.push(user)
//                 friendUser.save()
//                 console.log({ user, friendUser })
//                 res.json({ success: true }).status(200)
//             } else {
//                 res.json({ success: false, error: 'Other user not found' }).status(404)
//             }
//         } else {
//             res.json({ success: false, error: 'User not found' }).status(404)
//         }
//     } catch (e) {
//         console.log(e)
//         res.json({ success: false, error: e }).status(400)
//     }
// })

router.post('/add-song-to-profile', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { songId, accessToken, spotifyId, name, artists } = body
    try {
        const user = await User.findOne({ where: { spotifyId } })
        if (user) {
            console.log(user.highlightedsongs)
            if (user.highlightedsongs.length < 3) {
                user.highlightedsongs.push({
                    name,
                    spotifyId: songId,
                    artists
                })
                user.save()
                res.json({ success: true }).status(200)
            } else {
                res.json({ success: false, error: 'Maximum number of songs reached' }).status(204)
            }
        } else {
            res.json({ success: false, error: 'User not found' }).status(404)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, error: 'An error has occurred' }).status(400)
    }
})

router.post('/remove-song-from-profile', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { index, spotifyId, songId } = body;
    try {
        const user = await User.findOne({ where: { spotifyId } })
        if (user) {
            if (songId) {
                console.log(spotifyId)
                user.highlightedsongs = user.highlightedsongs.filter(song => song.spotifyId !== songId)
                user.save()
                console.log(user.highlightedsongs)
                res.json({ success: true }).status(200)
            } else if (user.highlightedsongs.length === 1) {
                user.highlightedsongs = []
                user.save()
                res.json({ success: true }).status(200)
            } else {
                console.log('Invalid id', songId)
                res.json({ success: false, error: 'An error has occurred' }).status(400)
            }
        } else {
            res.json({ success: false, error: 'User not found' }).status(404)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, error: 'User not found' }).status(404)
    }
})

router.post('/add-friend', async (req, res) => {
    const { body } = req;
    const { spotifyId, userId } = body;
    try {
        const user = await User.findOne({ where: { spotifyId }, relations: ['following', 'followers'] })
        if (user) {
            if (!user.following.find(following => following.spotifyId === userId)) {
                if (user.following.find(following => following.spotifyId === userId)) {
                    res.json({ success: false, error: 'Already following' }).status(400)
                } else {
                    const otherUser = await User.findOne({ where: { spotifyId: userId }, relations: ['following', 'followers'] })
                    if (otherUser) {
                        if (otherUser.following.find(oUser => oUser.spotifyId === user.spotifyId)) {
                            console.log('already following')
                            user.following.push(otherUser)
                            user.followers.push(otherUser)
                            user.save()
                            res.json({ success: true }).status(200)
                        } else {
                            user.following.push(otherUser)
                            user.save()
                            res.json({ success: true }).status(200)
                        }
                    } else {
                        res.json({ success: false, error: "Other user not found" }).status(404)
                    }
                }
            } else {
                res.json({ success: false, error: 'Already following' }).status(204)
            }
        } else {
            res.json({ success: false, error: 'User not found' }).status(404)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, error: 'An error has occurred' }).status(400)
    }
})

router.post('/skip-user', async (req, res) => {
    const { body } = req;
    const { spotifyId, userId } = body
    try {
        const user = await User.findOne({ where: { spotifyId }, relations: ['hasSkipped'] })
        if (user) {
            const otheruser = await User.findOne({ where: { spotifyId: userId }, relations: ['beenSkippedBy'] })
            if (otheruser) {
                if (!user.hasSkipped.find(sUser => sUser.spotifyId === userId)) {
                    user.hasSkipped.push(otheruser)
                    user.save()

                    // otheruser.beenSkippedBy.push(user)
                    // otheruser.save()

                    res.json({ success: true }).status(200)
                } else {
                    res.json({ success: false, error: 'User already skipped' }).status(400)
                }
            } else {
                res.json({ success: false, error: "Other user not found" }).status(404)
            }
        } else {
            res.json({ success: false, error: 'User not found' }).status(404)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, error: 'An error has occurred' }).status(400)
    }
})

router.post('/update-info', async (req, res) => {
    const { body } = req;
    const { fName, lName, email, age, city, state, spotifyId } = body;
    try {
        const user = await User.findOne({ where: { spotifyId } })
        if (user) {
            user.name = `${fName} ${lName}`
            user.email = email;
            user.age = age;
            user.city = city;
            user.state = state
            user.save()
            res.json({ success: true })
        } else {
            res.json({ success: false, error: 'User not found' }).status(404)
        }
    } catch (e) {
        console.log(e);
        res.json({ success: false, error: 'An error has occurred' }).status(400)
    }
})


router.post('/remove-friend', async (req, res) => {
    const { body } = req;
    const { spotifyId, userId } = body;
    try {
        const user = await User.findOne({ where: { spotifyId }, relations: ['following', 'followers', 'hasSkipped', 'beenSkippedBy'] })
        if (user) {
            const otherUser = await User.findOne({ where: { spotifyId: userId }, relations: ['following', 'followers', 'hasSkipped', 'beenSkippedBy'] })
            if (otherUser) {
                user.following = user.following.filter(following => following.uuid !== otherUser.uuid)
                user.followers = user.followers.filter(follower => follower.uuid !== otherUser.uuid)
                user.hasSkipped.push(otherUser)
                user.save()
                console.log(user)
                res.json({success: true}).status(200)
            } else {
                res.json({ success: false, error: 'Other user not found' }).status(400)
            }
        } else {
            res.json({ success: false, error: 'User not found' }).status(404)
        }
    } catch (e) {
        console.log(e);
        res.json({ success: false, error: 'An error has occurred' }).status(400)
    }
})

module.exports = router