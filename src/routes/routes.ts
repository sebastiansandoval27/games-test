import { Router } from 'express'
import gameController from '../controllers/game.controller'

const api = Router().use(gameController)

export default Router().use('/api', api)
