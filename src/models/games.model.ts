import Joi from 'joi'

export enum GameType {
  REGULAR_SEASON = 'REGULAR_SEASON',
  PLAYOFF = 'PLAYOFF',
}

export interface GamesModel {
  id: number
  name: string
  date: Date
  city: string
  home: string
  away: string
  createdAt: Date
  updatedAt: Date
  gameType: GameType
}

export const gamesSchema = Joi.object().keys({
  name: Joi.string().required(),
  date: Joi.date().required(),
  city: Joi.string().required(),
  home: Joi.string().required(),
  away: Joi.string().required(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
  gameType: Joi.string()
    .valid(GameType.REGULAR_SEASON, GameType.PLAYOFF)
    .required(),
})
