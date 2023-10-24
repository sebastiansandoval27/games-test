import { Prisma } from '@prisma/client'
import prisma from '../database/prisma'
import { GamesModel } from '../models/games.model'

export const createGame = async (
  input: Prisma.GamesCreateInput
): Promise<GamesModel> => {
  const resp = await prisma.games.create({
    data: input,
  })
  return resp as GamesModel
}

export const getGames = async (): Promise<GamesModel[]> => {
  return (await prisma.games.findMany()) as GamesModel[]
}

export const getGame = async (id: number): Promise<GamesModel> => {
  return (await prisma.games.findUnique({
    where: {
      id,
    },
  })) as GamesModel
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
