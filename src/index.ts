import 'dotenv-safe/config'
import "reflect-metadata"

import express from 'express';

// @ts-ignore
const cors = require('cors')

import morgan from 'morgan'

// @ts-ignore
import { createConnection } from 'typeorm';

//routes
const user = require('./routes/user')
const music = require('./routes/music')
const chat = require('./routes/chat')
import { checkAccess } from './utils/middleware'

const main = async () => {
    const app = express();

    //typeorm
    await createConnection()

    // @ts-ignore
    morgan.token('body', (req, res) => JSON.stringify(req.body));
    app.use(morgan(":remote-user [:date[clf]] ':method :status :url HTTP/:http-version' :body ':user-agent' - :response-time ms"));

    app.use(express.json());

    //cors 
    app.use(cors({ origin: ['http://localhost:3000', 'https://www.groovelynk.com', 'https://groovelynk.com', '*'] }))

    //routes
    app.get("/", (_, res: express.Response) => {
        res.send("Hello world");
    });

    //middleware
    const validateUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        let check = await checkAccess(req, res)
        if (check === 'User logged in')
            next()
        else
            res.json({success: false, error: 'User not logged in', type: 'accessToken'})
    }
    // app.use(validateUser)

    app.use('/api/v1/user', user)
    app.use('/api/v1/music', music)
    app.use('/api/v1/chat', chat)

    app.use((_, res: express.Response) => {
        res.status(404).json({ status: "404" });
    });

    app.listen(process.env.PORT | 5000, () => {
        console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
    });
}

main()