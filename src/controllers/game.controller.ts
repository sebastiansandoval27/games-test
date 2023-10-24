import { Router } from 'express'
import {
  getGames,
  getGame,
  createGame,
  updateGame,
  deleteGame,
} from '../services/games.service'
import { validationMiddleware } from '../common/exceptions'
import { gamesSchema } from '../models/games.model'

const router = Router()

/**
 * Get Games
 * @route {GET} /games
 * @returns {object} 200 - An array of games
 */

router.get('/games', async (req, res, next) => {
  try {
    const games = await getGames()
    res.json({ games })
  } catch (error) {
    next(error)
  }
})

/*
 * Get Game
 * @route {GET} /games/:id
 * @param {number} id.path.required - game id
 * @returns {object} 200 - A game
 */

router.get('/games/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id) || 0
    const games = await getGame(id)
    res.json({ games })
  } catch (error) {
    next(error)
  }
})

/*
 * Create Game
 * @route {POST} /games
 * @param {string} name.body.required - game name
 * @param {string} city.body.required - game city
 * @returns {object} 200 - A game
 */

router.post(
  '/games',
  validationMiddleware({ schema: gamesSchema }),
  async (req, res, next) => {
    try {
      const games = await createGame(req.body)
      res.json({ games })
    } catch (error) {
      next(error)
    }
  }
)

/*
 * Update Game
 * @route {PUT} /games/:id
 * @param {number} id.path.required - game id
 * @param {string} name.body - game name
 * @param {string} city.body - game city
 * @returns {object} 200 - A game
 */

router.put('/games/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id) || 0
    const games = await updateGame(id, req.body)
    res.json({ games })
  } catch (error) {
    next(error)
  }
})

/*
 * Delete Game
 * @route {DELETE} /games/:id
 * @param {number} id.path.required - game id
 * @returns {object} 200 - A game
 */

router.delete('/games/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id) || 0
    const games = await deleteGame(id)
    res.json({ games })
  } catch (error) {
    next(error)
  }
})

export default router
