import { Prisma } from '@prisma/client'
import prisma from '../database/prisma'
import { GameType, GamesModel } from '../models/games.model'

export const createGame = async (
  input: Prisma.GamesCreateInput
): Promise<GamesModel> => {
  const resp = await prisma.games.create({
    data: input,
  })
  return resp as GamesModel
}

export const getGames = async (): Promise<GamesModel[]> => {
  return (await prisma.games.findMany({
    orderBy: {
      date: 'asc',
    },
  })) as GamesModel[]
}

export const getGame = async (id: number): Promise<GamesModel> => {
  return (await prisma.games.findUnique({
    where: {
      id,
    },
  })) as GamesModel
}

export type GameSearchType =
  | 'name'
  | 'city'
  | 'home'
  | 'away'
  | 'date'
  | 'gameType'

export const getGameByType = async (value: string): Promise<GamesModel[]> => {
  const value_parsed =
    value === 'regular_season' ? GameType.REGULAR_SEASON : GameType.PLAYOFF

  return (await prisma.games.findMany({
    where: {
      gameType: {
        in: [value_parsed],
      },
    },
    orderBy: {
      date: 'asc',
    },
  })) as GamesModel[]
}

export const getGameByProperty = async (
  type: GameSearchType,
  value: string
): Promise<GamesModel[]> => {
  if (!['name', 'city', 'home', 'away', 'date', 'gameType'].includes(type))
    throw new Error('Invalid search type')

  if (type === 'date')
    return (await prisma.games.findMany({
      where: {
        date: {
          gte: value,
          lte: value,
        },
      },
      orderBy: {
        date: 'asc',
      },
    })) as GamesModel[]

  return (await prisma.games.findMany({
    where: {
      [type]: {
        contains: value,
        mode: 'insensitive',
      },
    },
    orderBy: {
      date: 'asc',
    },
  })) as GamesModel[]
}

export const updateGame = async (
  id: number,
  input: Prisma.GamesUpdateInput
): Promise<GamesModel> => {
  return (await prisma.games.update({
    where: {
      id,
    },
    data: input,
  })) as GamesModel
}

export const deleteGame = async (id: number): Promise<GamesModel> => {
  return (await prisma.games.delete({
    where: {
      id,
    },
  })) as GamesModel
}

export default {
  createGame,
  getGames,
  getGame,
  updateGame,
  deleteGame,
}
