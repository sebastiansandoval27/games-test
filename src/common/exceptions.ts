import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

interface Props {
  schema: Joi.ObjectSchema
}
export const validationMiddleware = ({ schema }: Props) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)
    const valid = error == null

    if (valid) {
      next()
    } else {
      const { details } = error
      const message = details.map(i => i.message).join(',')

      console.log('error', message)
      res.status(422).json({ error: message })
    }
  }
}
